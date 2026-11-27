/**
 * Auditor automático semanal para `skills-estandar.md`.
 * - Verifica mediante la API de GitHub que cada repositorio y ruta de skill siga activo (no 404, no archivado, actividad reciente).
 * - Revisa commits recientes (últimos 14 días) en los directorios de skills de repositorios oficiales monitoreados para detectar novedades sin generar ruido histórico.
 * - Consulta señales públicas del ecosistema (skillleaderboard.com) como referencia opcional.
 * - Genera `maintenance-report.md` y expone `GITHUB_OUTPUT` (`should_notify=true|false`).
 */

import fs from "node:fs";
import path from "node:path";

const SKILLS_FILE = path.resolve(
  "skills/multi-agent-architect/references/skills-estandar.md"
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

async function ghFetch(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    return { ok: false, status: res.status, data: null };
  }
  return { ok: true, status: res.status, data: await res.json() };
}

function extractGitHubUrls(markdown) {
  const regex = /https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?:\/tree\/[^/]+\/([^\s)]+))?/g;
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
      broken.push({ ...entry, reason: `HTTP ${repoRes.status} al consultar repositorio` });
      continue;
    }

    if (repoRes.data.archived || repoRes.data.disabled) {
      broken.push({ ...entry, reason: "Repositorio archivado o deshabilitado" });
      continue;
    }

    if (entry.subpath) {
      const pathRes = await ghFetch(
        `https://api.github.com/repos/${repoKey}/contents/${entry.subpath}`
      );
      if (!pathRes.ok) {
        broken.push({
          ...entry,
          reason: `Ruta interna no encontrada (HTTP ${pathRes.status}): ${entry.subpath}`,
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
      const title = (commit?.commit?.message || "").split("\n")[0];
      if (!title) continue;
      updates.push({
        repo: `${target.owner}/${target.repo}`,
        date: (commit?.commit?.author?.date || "").slice(0, 10),
        title,
        url: commit.html_url,
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
        if (s?.name) {
          highlights.push({
            category: query,
            name: s.name,
            repo: s.repository || s.repo || s.source || "N/A",
          });
        }
      }
    } catch {
      // Silenciar fallos externos opcionales para no bloquear el workflow
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

  // Notificar con Issue cuando haya enlaces rotos/obsoletos (o siempre si se ejecuta manualmente)
  const isManual = process.env.GITHUB_EVENT_NAME === "workflow_dispatch";
  const shouldNotify = broken.length > 0 || stale.length > 0 || isManual;

  const lines = [
    `# Reporte de Mantenimiento — \`skills-estandar.md\``,
    "",
    `- **Fecha de ejecución:** ${new Date().toISOString().slice(0, 10)}`,
    `- **Enlaces verificados:** ${links.length} (${healthy.length} saludables, ${stale.length} inactivos >${STALE_DAYS_THRESHOLD}d, ${broken.length} caídos/archivados)`,
    "",
  ];

  if (broken.length > 0) {
    lines.push("## ❌ Enlaces Caídos, Archivados o Rutas Inválidas (Requiere reemplazo)");
    for (const b of broken) {
      lines.push(`- ${b.fullUrl} — **Motivo:** ${b.reason}`);
    }
    lines.push("");
  }

  if (stale.length > 0) {
    lines.push(`## ⚠️ Repositorios sin actividad reciente (>${STALE_DAYS_THRESHOLD} días)`);
    for (const s of stale) {
      lines.push(`- ${s.fullUrl} — Último push: \`${s.pushedAt}\` (⭐ ${s.stars})`);
    }
    lines.push("");
  }

  if (healthy.length > 0) {
    lines.push("## ✅ Skills Saludables Verificadas");
    for (const h of healthy) {
      lines.push(`- ${h.fullUrl} — ⭐ ${h.stars} | Último push: \`${h.pushedAt}\``);
    }
    lines.push("");
  }

  if (recentUpdates.length > 0) {
    lines.push(`## 🆕 Actividad Reciente en Repositorios Oficiales (Últimos ${RECENT_UPDATES_DAYS} días)`);
    for (const u of recentUpdates) {
      lines.push(`- [\`${u.repo}\`] (${u.date}) [${u.title}](${u.url})`);
    }
    lines.push("");
  }

  if (leaderboard.length > 0) {
    lines.push("## 📊 Referencia del Ecosistema (Top por categoría transversal)");
    for (const l of leaderboard) {
      lines.push(`- [${l.category}] **${l.name}** (${l.repo})`);
    }
    lines.push("");
  }

  fs.writeFileSync(REPORT_FILE, lines.join("\n"), "utf8");
  console.log(lines.join("\n"));

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `should_notify=${shouldNotify}\n`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
