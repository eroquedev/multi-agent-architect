/**
 * Auditor automático semanal para `core-skills.md`.
 * - Verifica mediante la API de GitHub que cada repositorio y ruta de skill siga activo (no 404, no archivado, actividad reciente).
 * - Revisa commits recientes (últimos 14 días) en los directorios de skills de repositorios oficiales monitoreados.
 * - Sanitiza cualquier texto externo antes de insertarlo en el reporte Markdown.
 */

import fs from "node:fs";
import path from "node:path";

const SKILLS_FILE = path.resolve(
  "skills/multi-agent-architect/references/core-skills.md"
);
const REPORT_FILE = path.resolve("maintenance-report.md");
const STALE_DAYS_THRESHOLD = 365;
const RECENT_UPDATES_DAYS = 14;

const MONITORED_OFFICIAL_REPOS = [
  { owner: "anthropics", repo: "skills", skillsPath: "skills" },
  { owner: "vercel-labs", repo: "agent-skills", skillsPath: "skills" },
  { owner: "obra", repo: "superpowers", skillsPath: "skills" },
  { owner: "semgrep", repo: "skills", skillsPath: "skills" },
  { owner: "trailofbits", repo: "skills", skillsPath: "plugins" },
];

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "multi-agent-architect-vault-check",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

function sanitizeMd(input) {
  return String(input || "")
    .replace(/[\r\n]+/g, " ")
    .replace(/[<>`[\]\\]/g, "")
    .trim()
    .slice(0, 140);
}

async function ghFetch(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    return { ok: false, status: res.status, data: null };
  }
  return { ok: true, status: res.status, data: await res.json() };
}

function extractGitHubUrls(markdown) {
  const regex =
    /https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?:\/tree\/[^/]+\/([^\s)]+))?/g;
  const seen = new Map();
  for (const match of markdown.matchAll(regex)) {
    const [fullUrl, owner, repo, subpath] = match;
    if (!seen.has(fullUrl)) {
      seen.set(fullUrl, { fullUrl, owner, repo, subpath: subpath || null });
    }
  }
  return [...seen.values()];
}

async function checkReferencedLinks(entries) {
  const broken = [];
  const stale = [];
  const healthy = [];
  const repoCache = new Map();

  for (const entry of entries) {
    const repoKey = `${entry.owner}/${entry.repo}`;
    if (!repoCache.has(repoKey)) {
      repoCache.set(repoKey, await ghFetch(`https://api.github.com/repos/${repoKey}`));
    }
    const repoRes = repoCache.get(repoKey);

    if (!repoRes.ok || !repoRes.data) {
      broken.push({ ...entry, reason: `HTTP ${repoRes.status} querying repository` });
      continue;
    }

    if (repoRes.data.archived || repoRes.data.disabled) {
      broken.push({ ...entry, reason: "Repository archived or disabled" });
      continue;
    }

    if (entry.subpath) {
      const pathRes = await ghFetch(
        `https://api.github.com/repos/${repoKey}/contents/${entry.subpath}`
      );
      if (!pathRes.ok) {
        broken.push({
          ...entry,
          reason: `Subpath not found (HTTP ${pathRes.status}): ${entry.subpath}`,
        });
        continue;
      }
    }

    const pushedAt = new Date(repoRes.data.pushed_at);
    const daysSincePush = Math.floor((Date.now() - pushedAt.getTime()) / (1000 * 60 * 60 * 24));
    const item = {
      ...entry,
      stars: repoRes.data.stargazers_count,
      daysSincePush,
      pushedAt: repoRes.data.pushed_at.slice(0, 10),
    };

    if (daysSincePush > STALE_DAYS_THRESHOLD) {
      stale.push(item);
    } else {
      healthy.push(item);
    }
  }

  return { broken, stale, healthy };
}

async function checkRecentOfficialActivity() {
  const since = new Date(Date.now() - RECENT_UPDATES_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const updates = [];

  for (const target of MONITORED_OFFICIAL_REPOS) {
    const url = `https://api.github.com/repos/${target.owner}/${target.repo}/commits?path=${encodeURIComponent(
      target.skillsPath
    )}&since=${encodeURIComponent(since)}&per_page=5`;
    const res = await ghFetch(url);
    if (!res.ok || !Array.isArray(res.data)) continue;

    for (const commit of res.data) {
      const rawTitle = (commit?.commit?.message || "").split("\n")[0];
      const title = sanitizeMd(rawTitle);
      if (!title) continue;
      updates.push({
        repo: `${target.owner}/${target.repo}`,
        date: sanitizeMd((commit?.commit?.author?.date || "").slice(0, 10)),
        title,
        url: String(commit.html_url || "").startsWith("https://github.com/")
          ? commit.html_url
          : "",
      });
    }
  }
  return updates;
}

async function fetchLeaderboardHighlights() {
  const highlights = [];
  for (const query of ["security", "testing", "debugging"]) {
    try {
      const res = await fetch(
        `https://www.skillleaderboard.com/api/v1/skills?q=${encodeURIComponent(query)}&limit=3`
      );
      if (!res.ok) continue;
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
      for (const s of items.slice(0, 3)) {
        const name = sanitizeMd(s?.name);
        const repo = sanitizeMd(s?.repository || s?.repo || s?.source || "N/A");
        if (name) {
          highlights.push({ category: query, name, repo });
        }
      }
    } catch {
      // Ignore optional third-party API failures
    }
  }
  return highlights;
}

async function main() {
  const markdown = fs.readFileSync(SKILLS_FILE, "utf8");
  const links = extractGitHubUrls(markdown);
  const { broken, stale, healthy } = await checkReferencedLinks(links);
  const recentUpdates = await checkRecentOfficialActivity();
  const leaderboard = await fetchLeaderboardHighlights();

  const isManual = process.env.GITHUB_EVENT_NAME === "workflow_dispatch";
  const shouldNotify = broken.length > 0 || stale.length > 0 || isManual;

  const lines = [
    `# Core Skills Maintenance Report — \`core-skills.md\``,
    "",
    `- **Run date:** ${new Date().toISOString().slice(0, 10)}`,
    `- **Checked links:** ${links.length} (${healthy.length} healthy, ${stale.length} stale >${STALE_DAYS_THRESHOLD}d, ${broken.length} broken/archived)`,
    "",
  ];

  if (broken.length > 0) {
    lines.push("## ❌ Broken, Archived, or Missing Links (Action Required)");
    for (const b of broken) {
      lines.push(`- ${b.fullUrl} — **Reason:** ${sanitizeMd(b.reason)}`);
    }
    lines.push("");
  }

  if (stale.length > 0) {
    lines.push(`## ⚠️ Stale Repositories (>${STALE_DAYS_THRESHOLD} days without push)`);
    for (const s of stale) {
      lines.push(`- ${s.fullUrl} — Last push: \`${s.pushedAt}\` (⭐ ${s.stars})`);
    }
    lines.push("");
  }

  if (healthy.length > 0) {
    lines.push("## ✅ Healthy Verified Skills");
    for (const h of healthy) {
      lines.push(`- ${h.fullUrl} — ⭐ ${h.stars} | Last push: \`${h.pushedAt}\``);
    }
    lines.push("");
  }

  if (recentUpdates.length > 0) {
    lines.push(`## 🆕 Recent Activity in Monitored Official Repos (Last ${RECENT_UPDATES_DAYS} days)`);
    for (const u of recentUpdates) {
      const linkPart = u.url ? `[${u.title}](${u.url})` : u.title;
      lines.push(`- [\`${u.repo}\`] (${u.date}) ${linkPart}`);
    }
    lines.push("");
  }

  if (leaderboard.length > 0) {
    lines.push("## 📊 Ecosystem Reference (Top by Cross-Cutting Category)");
    for (const l of leaderboard) {
      lines.push(`- [${l.category}] **${l.name}** (\`${l.repo}\`)`);
    }
    lines.push("");
  }

  fs.writeFileSync(REPORT_FILE, lines.join("\n"), "utf8");
  console.log(lines.join("\n"));

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `should_notify=${shouldNotify}\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
