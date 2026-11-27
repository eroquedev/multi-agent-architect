# Dynamic 4-Tier Cognitive Routing & Model Rebalancing Rules

> **Core Principle:** `multi-agent-architect` never relies on hardcoded static model lists. It inspects the live models available in the developer's active provider during `init`, and re-evaluates them on demand during `models`.

---

## 1. Autonomous Provider & Catalog Discovery

A lightweight Tier 4 explorer (or concise direct check) determines the provider and available models without interrupting the developer:
1. **Environment Detection:** Identifies the active client/provider (**Gemini / Antigravity**, **Claude Code**, **Cursor**, **Codex**, **OpenCode**, **Windsurf**), unless the user explicitly specified another target provider.
2. **Live Catalog Inspection:** When supported by the CLI, queries available models directly (e.g., `agy models` for Gemini/Antigravity, `ollama list` for local models).

---

## 2. 4-Tier Cognitive Classification

Detected models are dynamically mapped across **4 Cognitive Tiers**:

| Cognitive Tier | Selection Criteria in Live Catalog | Assigned Roles | Operational Rule & Token Governance |
| :--- | :--- | :--- | :--- |
| **TIER 1: Frontier & Pure Orchestration** | Highest-reasoning or dedicated orchestrator models (`orchestrator`, `opus`, `xhigh`, `pro`, `o3`, or top provider family). | **Orchestrator** (`AGENTS.md` / root adapter) & **`@system-architect`**. | **Full-Delegation Pattern:** Focuses exclusively on planning, architecture, contract design, and verification. Never burns output tokens on repetitive boilerplate or blind repo scans (*Exploration Budget*: max 4 direct lookups). |
| **TIER 2: Core Engineering** | High/medium reasoning models optimized for backend logic, data, and systems (`neon-high`, `hydrogen-medium`, `argon-high`, `carbon-high`, `sonnet`, `gpt-5` / `codex`). | **`@backend-specialist`**, **`@data-specialist`**, **`@platform-specialist`**. | Implements APIs, business logic, SQL/NoSQL schemas, migrations, critical refactors, CI/tooling, and document pipelines (PDF/PPTX/DOCX/XLSX). |
| **TIER 3: Visual Speed & QA** | Fast, high-precision models (`flash-high`, `flash-medium`, `neon-medium`, `sonnet-medium`). | **`@ui-ux-specialist`** & **`@qa-auditor`**. | Frontend/mobile UI (Astro, Next.js, React), design systems, accessibility, unit/E2E tests, and linting/type-check verification. |
| **TIER 4: Low-Cost Exploration, Auto-Sync & `fallback_model`** | Most economical, lowest-latency models (`flash-low`, `haiku`, `mini`, `low`, `orchestrator-argon`). | **`@code-explorer`** (primary) & **`fallback_model:`** across all agents. | 1) Executes codebase searches (`grep`, `find`, `git diff`); 2) **Runs background Post-Task Auto-Sync on `context/`**; 3) Serves as automatic quota failover when any higher-tier model hits limits. |

---

## 3. Provider-Specific Optimization Patterns

### A. Gemini / Antigravity (`agy`) & Hybrid Quotas
- Combines high-availability native Gemini families (`orchestrator-neon`, `neon`, `hydrogen`, `argon`, `carbon`, `flash`) with surgical allocation of limited-quota models (`opus`, `sonnet`) on high-leverage orchestration or complex debugging roles—falling back seamlessly to Gemini 4 and `low`/`flash-low` tiers.
- **Root Setup:** Full rules in `AGENTS.md` + lightweight `GEMINI.md` pointer.

### B. Claude Code (Rolling Quota Windows)
- **Orchestrator & `@system-architect`:** `Opus` (pure planning & contracts, zero repetitive coding).
- **Core Specialists:** `Sonnet`.
- **`@code-explorer` (Exploration + Auto-Sync) & `fallback_model`:** `Haiku`.
- **Root Setup:** Full rules in `AGENTS.md` + lightweight `CLAUDE.md` pointer.

### C. Codex / Cursor / OpenCode / Windsurf / Local Models
- Applies the identical **4-Tier Cognitive Matrix** to detected models and writes **`AGENTS.md`** as the universal standard.

---

## 4. Rebalancing Algorithm for `/multi-agent-architect models`

1. **Tier-by-Tier Comparison:** Compare each agent's current `model:` and `fallback_model:` against live models available in the same Cognitive Tier.
2. **Real-Benefit Threshold:** Replace a model only if a newer generation offers materially stronger reasoning, better token/speed efficiency in Tier 3–4, or replaces a deprecated model. Do not needlessly upgrade Tier 3/4 agents to expensive heavy models.
3. **Stability Principle:** If the current assignment remains optimal, leave it untouched.
4. **Transparent Diff:** Always report previous vs. updated models and the rationale for every change.
