---
name: multi-agent-architect
description: >-
  Use this skill to initialize, manage, or upgrade multi-agent orchestration,
  dynamic 4-tier model routing, and Double-Layer Memory (AGENTS.md, GEMINI.md,
  CLAUDE.md, context/, .agents/) in any project. Supports 4 independent actions:
  (1) 'init' for uninterrupted single-pass setup respecting the current stack
  and secret hygiene, (2) 'models' to audit and rebalance agent models when
  newer models become available, (3) 'stack' to compare the current stack
  against optional improvements, and (4) 'skills' for hybrid recommendations
  combining curated core engineering skills with live ecosystem search.
license: MIT
metadata:
  author: eroquedev
  version: "1.0.0"
---

# `multi-agent-architect` — Autonomous Multi-Agent Orchestration & Context Engineering

This skill configures and maintains a clean, token-efficient **Multi-Agent Orchestration** and **Double-Layer Memory** architecture inside any codebase or document/productivity workflow.

> **Language Rule:** Always communicate with the developer and generate project documentation (`AGENTS.md`, `context/`, `.agents/`) in the **same language the user used to invoke this skill** (e.g., English if prompted in English, Spanish if prompted in Spanish).

## Actions & Invocation

Identify the requested action (via slash-style command or natural language) and execute **only** that workflow:

| Action | Short Command | Natural Language Trigger | Purpose |
| :--- | :--- | :--- | :--- |
| **`init`** *(Default)* | `/multi-agent-architect` or `/multi-agent-architect init` | *"Configure / initialize multi-agent orchestration for this project"* | Full single-pass setup without intermediate pauses, strictly respecting the project's existing stack. |
| **`models`** | `/multi-agent-architect models` | *"Update / rebalance my agent models"* | Re-queries the provider's live catalog, evaluates model improvements per tier, and updates only where beneficial. |
| **`stack`** | `/multi-agent-architect stack` | *"Analyze or suggest improvements for my project stack"* | Presents a comparative table (*Current Stack vs. Suggested Improvements*) and applies changes only upon approval. |
| **`skills`** | `/multi-agent-architect skills` | *"Recommend useful skills for this project"* | Combines universal core skills with live ecosystem search for the project's specific stack and provides verified links. |

---

## ACTION 1: `init` — Single-Pass Zero-Friction Setup (Default)

> **Non-Intrusive Rules:**
> - **Respect the existing stack:** Never force package manager migrations (`npm`, `pnpm`, `yarn`, `bun`, `cargo`, `uv`, etc.) or remove existing `docs/` files during `init`.
> - **Safe Idempotent Merge:** If `AGENTS.md`, `GEMINI.md`, `CLAUDE.md`, `context/`, or `.agents/` already exist, preserve and merge the user's custom rules, skills, and `resources/*` instead of overwriting them blindly.
> - **Strict Secret Hygiene:** **NEVER** read `.env`, `.env.local`, `.pem`, `.key`, or credential files. Discover environment variable names strictly from `.env.example` / `.env.template` or by scanning code references (`process.env.*`, `import.meta.env.*`, `os.environ`, `std::env`). Verify `.env` is listed in `.gitignore`.
> - *(Exception: If the working directory is empty for a brand-new Greenfield project, run Phase 1 interactive consulting from [`./references/orchestration-templates.md`](./references/orchestration-templates.md) first.)*

### Execution Steps (`init`):
1. **Layered Project Audit & Provider Detection (Economical Model First):**
   - If your environment supports subagents, delegate this discovery step to a lightweight/economical subagent (Tier 4); otherwise run a concise direct inspection:
     - Detect the active AI provider and live available models (e.g., `agy models` for Gemini/Antigravity, Claude Code catalog, Codex, Cursor, OpenCode, or `ollama list`).
     - Perform a **layered codebase audit** (never read hundreds of files): inspect the folder tree (ignoring `node_modules`, `.git`, `dist`, `.next`, `target`), key manifests (`package.json`, `Cargo.toml`, `pyproject.toml`, etc.), schemas, `.env.example` (or env variable names in code), `docs/`, and 1–2 representative source files.
2. **Double-Layer Memory in `context/`:**
   - Using [`./references/orchestration-templates.md`](./references/orchestration-templates.md), create or merge:
     - `context/architecture.md` (or `context/arquitectura.md` if Spanish): **Permanent Layer** — stack/versions, module map, monorepo structure (if applicable), data schemas, API contracts, official commands using the project's current tooling, environment variable *names* (zero values), and technical knowledge distilled from `docs/`.
     - `context/status-and-plan.md` (or `context/estado-y-plan.md` if Spanish): **Ephemeral Layer (MAX 60 LINES)** — operational status, recent progress, `## Recommended Commit` (*Conventional Commits*), and active backlog.
3. **Domain Skills in `.agents/skills/`:**
   - Create 2–5 project-specific internal skills (`.agents/skills/<domain>/SKILL.md`) capturing real codebase conventions, validation patterns, and business rules. Preserve any existing `resources/*` folders.
   - Do **not** auto-install external community skills during `init`.
4. **Subagents (`.agents/agents/`) & Single-Source Root Orchestration:**
   - Classify the live provider models into **4 Cognitive Tiers** per [`./references/dynamic-routing.md`](./references/dynamic-routing.md) and create only the needed specialist subagents (`system-architect`, `backend-specialist`, `data-specialist`, `platform-specialist`, `ui-ux-specialist`, `qa-auditor`, plus **`code-explorer`** on the lightest Tier 4 model), each declaring `model:` and `fallback_model:`.
   - **Avoid Double Token Loading:** Write the complete orchestration rules, subagent matrix, and the **3 Autonomous Directives** inside **`AGENTS.md`** as the single source of truth, and keep **`GEMINI.md` / `CLAUDE.md`** as lightweight 5–8 line adapters pointing to `AGENTS.md` and `context/`:
     1. *Full-Delegation Orchestration* (Orchestrator plans/designs and delegates exploration to `@code-explorer` under a strict Exploration Budget).
     2. *Silent Context Recovery* (Orchestrator silently reads `context/` at task start or after chat history compaction).
     3. *Post-Task Auto-Sync* (`@code-explorer` automatically updates the Permanent Layer on structural/skill/agent changes and the Ephemeral Layer after each completed task).
5. **Clean Summary:**
   - Display the created/merged file tree and conclude with a brief 4-line note listing the optional follow-up actions: `/multi-agent-architect models`, `/multi-agent-architect stack`, and `/multi-agent-architect skills`.

---

## ACTION 2: `models` — Intelligent Model Audit & Rebalancing

When the user invokes `/multi-agent-architect models`:
1. **Read Current Assignments:** Inspect `model:` and `fallback_model:` across `AGENTS.md`, `GEMINI.md` / `CLAUDE.md`, and `.agents/agents/*.md`.
2. **Fetch Live Provider Catalog:** Query the active provider's currently available models.
3. **Cognitive Tier Rebalancing:** Using [`./references/dynamic-routing.md`](./references/dynamic-routing.md), evaluate each tier for newly released superior models, better reasoning/cost efficiency, or deprecated models. Keep unchanged any role whose current model remains optimal. Update modified `.md` files and sync `context/`.
4. **Change Report:** Present a table listing **Agent / File**, **Previous ➔ Updated Model** *(or Unchanged)*, and **Technical Rationale**.

---

## ACTION 3: `stack` — Optional Stack Improvement Consulting

When the user invokes `/multi-agent-architect stack`:
1. **Comparative Diagnosis (Read-Only):** Analyze current tooling (package manager e.g. `npm` vs `pnpm`, type-checking strictness, linters, test runner, build scripts, security posture) and present a 3-column table: **Current Stack | Suggested Improvement | Technical Rationale**.
2. **User Confirmation:** Ask whether to apply any suggested improvement or keep the current stack. Apply changes and sync `context/` **only** for explicitly approved items.

---

## ACTION 4: `skills` — Hybrid Skill Recommendations

When the user invokes `/multi-agent-architect skills`:
1. **Layer 1 — Universal Core Skills:** Select 2–3 relevant cross-cutting skills from [`./references/core-skills.md`](./references/core-skills.md) (security/OWASP, TDD/debugging/review, E2E testing, UI/a11y, or docs/office workflows).
2. **Layer 2 — Live Stack-Specific Search:** Search the ecosystem (`skills.sh`, `npx skills find <tech>`, GitHub) for 2–3 active, well-adopted skills tailored to the project's specific frameworks/languages. Verify repository legitimacy, recent commits, and adoption signals before recommending.
3. **Structured Presentation:** Present both lists clearly with **Skill Name**, **Value for this Project**, **Official URL**, and **Install Command** adapted to the project's actual package manager (`npx`, `pnpm dlx`, or `bunx`).
4. **Install Only on Confirmation:** Install external skills only after explicit user selection and record them in the Permanent Layer (`context/`).
