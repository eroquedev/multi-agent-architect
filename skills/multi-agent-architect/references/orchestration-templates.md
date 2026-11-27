# Orchestration Templates, Double-Layer Memory & Monorepo Scaling

This reference defines the structural templates applied during `/multi-agent-architect init`. Always generate project files in the developer's conversation language.

---

## 1. Single-Source `AGENTS.md` + Thin Provider Adapters (Zero Token Duplication)

To avoid loading identical instructions twice when an IDE/CLI reads both `AGENTS.md` and `GEMINI.md` / `CLAUDE.md`:
- **`AGENTS.md` (Single Source of Truth):** Holds the project's orchestration overview, subagent routing table, secret-hygiene rule, and the **3 Autonomous Directives**:
  1. **Transparent Context Recovery:** *"At task start or whenever long chat history compacts, silently read `context/status-and-plan.md` and `context/architecture.md` (or localized equivalents) before planning."*
  2. **Post-Task Auto-Sync:** *"Upon completing any relevant task, automatically delegate to `@code-explorer` (Tier 4) to update the Permanent Layer (when structure, schemas, endpoints, dependencies, skills, or subagents change) and the Ephemeral Layer (recording progress, recommended commit, and next backlog items)."*
  3. **Automatic Quota Failover:** *"Each subagent declares `model:` and `fallback_model:`. On quota exhaustion, seamlessly fall back to `fallback_model:`."*
- **`GEMINI.md` / `CLAUDE.md` (Thin 5–8 Line Adapter):** Points to `AGENTS.md` and `context/` plus any provider-specific directive only.

---

## 2. Ephemeral Layer Template (`context/status-and-plan.md` — Max 60 Lines)

```markdown
## Recommended Commit
`feat(<scope>): <conventional commit message for the latest completed work>`

## Current Operational Status
- **Active Provider:** `<Detected AI provider>`
- **Stack & Package Manager:** `<Project stack and current package manager>`
- **Health:** `<Build/test status and active branch>`

## Latest Completed Progress
- `<Concise summary of the latest implemented feature, fix, skill, or config>`

## Active Task & Next Backlog Items
1. `<Immediate next priority 1>`
2. `<Immediate next priority 2>`
3. `<Immediate next priority 3>`
```

---

## 3. Subagent Profile Template (`.agents/agents/<role>.md`)

```markdown
---
name: <subagent-name>
description: <clear delegation trigger for the Orchestrator>
model: <detected-primary-model>
fallback_model: <detected-tier-4-fallback-model>
skills:
  - <domain-skill-1>
  - <domain-skill-2>
---

# Role: `@<subagent-name>`

<Responsibilities tailored to the project's actual stack, boundaries, and quality checks>.
```

> **`@code-explorer` Responsibility:** Handles fast searches (`grep`, `find`, `git diff`) to protect the Orchestrator's Exploration Budget and performs background **Post-Task Auto-Sync** on `context/`.

---

## 4. Monorepo Scaling Pattern (`apps/*`, `packages/*`)

When `init` detects a monorepo (Turborepo, Nx, `pnpm` workspaces, Cargo workspaces):
1. Keep **one shared `AGENTS.md`** and **one `context/architecture.md`** at the repository root mapping workspace boundaries and shared packages.
2. Only add lightweight package-level `AGENTS.md` files inside `apps/<name>/` when individual apps use **divergent stacks** (e.g., `apps/web` in Astro vs. `apps/api` in Rust/Python), linking back to the root context rather than duplicating global rules.

---

## 5. Greenfield 2-Phase Protocol (Empty Directory / New Project Only)

When invoked in an empty directory to start a brand-new project:
1. **Phase 1 — Interactive Consulting (No files created yet):**
   - Ask at most **5 targeted questions** (goals, architecture/stack for software or document pipelines, data model, deployment).
   - Propose the recommended architecture, environment variable blueprint (`.env.example` + `.env` in `.gitignore`), and subagent matrix populated with live detected models.
   - Pause and ask for approval before scaffolding.
2. **Phase 2 — Full Scaffolding (Upon Approval):**
   - Create the project skeleton (including `.env.example` and `.gitignore` with `.env`), `context/`, `.agents/skills/`, `.agents/agents/`, `AGENTS.md`, and thin provider adapter(s), then list the optional follow-up actions (`models`, `stack`, `skills`).
