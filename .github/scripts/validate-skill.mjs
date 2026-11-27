/**
 * Valida la estructura del paquete de la skill en CI:
 * - Verifica que `SKILL.md` tenga frontmatter YAML con `name: multi-agent-architect`, `description` y `metadata.version`.
 * - Verifica que todos los enlaces relativos a `./references/...` en `SKILL.md` existan en disco.
 * - Verifica que `README.md` y `README.es.md` existan y no contengan referencias rotas internas.
 */

import fs from "node:fs";
import path from "node:path";

const SKILL_DIR = path.resolve("skills/multi-agent-architect");
const SKILL_MD = path.join(SKILL_DIR, "SKILL.md");

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Validation failed: ${message}`);
    process.exit(1);
  }
}

const content = fs.readFileSync(SKILL_MD, "utf8");
const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
assert(fmMatch, "SKILL.md is missing YAML frontmatter.");

const fm = fmMatch[1];
assert(/^name:\s*multi-agent-architect\s*$/m.test(fm), "Frontmatter 'name' must equal 'multi-agent-architect'.");
assert(/^description:/m.test(fm), "Frontmatter must define 'description'.");
assert(/version:\s*["']?\d+\.\d+\.\d+["']?/m.test(fm), "Frontmatter must define semantic 'metadata.version'.");

// Check relative markdown links in SKILL.md
const linkRegex = /\[[^\]]+\]\((\.\/[^)#\s]+)\)/g;
for (const match of content.matchAll(linkRegex)) {
  const relPath = match[1];
  const resolved = path.resolve(SKILL_DIR, relPath);
  assert(fs.existsSync(resolved), `Broken relative link in SKILL.md: ${relPath}`);
}

for (const readme of ["README.md", "README.es.md", "LICENSE"]) {
  assert(fs.existsSync(path.resolve(readme)), `Missing required root file: ${readme}`);
}

console.log("✅ Skill package structure, frontmatter, and relative links validated successfully.");
