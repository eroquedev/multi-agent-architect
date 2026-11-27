# 🧩 `multi-agent-architect`

🌐 **English** | [Español](./README.es.md)

[![skills.sh](https://skills.sh/b/eroquedev/multi-agent-architect)](https://skills.sh/eroquedev/multi-agent-architect)
[![Validate Skill](https://github.com/eroquedev/multi-agent-architect/actions/workflows/validate-skill.yml/badge.svg)](https://github.com/eroquedev/multi-agent-architect/actions/workflows/validate-skill.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

An autonomous **Multi-Agent Orchestration**, **Dynamic 4-Tier Model Routing**, and **Double-Layer Memory** Agent Skill for AI coding assistants (**Gemini CLI / Antigravity**, **Claude Code**, **Cursor**, **Codex**, **OpenCode**, **Windsurf**).

---

## 📦 Installation

```bash
# Install into the current project
npx skills add eroquedev/multi-agent-architect

# Or with pnpm / globally (-g)
pnpm dlx skills add eroquedev/multi-agent-architect -g
```

Or simply ask your AI coding assistant directly in chat:
> *"Install the skill from `https://github.com/eroquedev/multi-agent-architect` into this project."*

---

## ⚡ Usage & Actions

Invoke the exact action you need via short command or natural language (the skill adapts automatically to your conversation language):

| Action | Natural Language Example | What It Does |
| :--- | :--- | :--- |
| `/multi-agent-architect init`<br>*(default)* | *"Use `multi-agent-architect` to configure this project"* | **Single-pass zero-friction setup:** detects your active provider/models, respects your existing stack and secrets hygiene (`.env`), merges safely with existing configs, and enables background context auto-sync. |
| `/multi-agent-architect models` | *"Use `multi-agent-architect` to update my agent models"* | Queries your provider's live models, evaluates improvements per cognitive tier, updates only where beneficial, and explains every change. |
| `/multi-agent-architect stack` | *"Use `multi-agent-architect` to suggest stack improvements"* | Presents a comparison table (*Current Stack vs. Suggested Improvements*) and applies changes only upon your approval. |
| `/multi-agent-architect skills` | *"Use `multi-agent-architect` to recommend skills for this project"* | Hybrid recommendations: pairs curated universal engineering skills with live ecosystem search tailored to your stack and verified links. |

---

## 🏗️ Generated Project Architecture

```text
your-project/
├── AGENTS.md                      # Single source of truth (Full-Delegation + Auto-Sync)
├── GEMINI.md / CLAUDE.md          # Thin provider adapter pointing to AGENTS.md
├── context/
│   ├── architecture.md            # Permanent Layer (modules, schemas, contracts, env names)
│   └── status-and-plan.md         # Ephemeral Layer (max 60 lines: progress, commit & backlog)
└── .agents/
    ├── agents/                    # Specialist subagents with model & fallback_model
    └── skills/                    # Project-specific domain skills distilled from your codebase
```

---

## 📂 Repository Structure

```text
multi-agent-architect/
├── .github/
│   ├── workflows/
│   │   ├── validate-skill.yml              # CI validation for frontmatter, links & scripts
│   │   └── skills-maintenance.yml          # Weekly automated audit of core skills health
│   └── scripts/
├── LICENSE                                 # MIT License
├── README.md                               # English documentation
├── README.es.md                            # Documentación en español
└── skills/
    └── multi-agent-architect/
        ├── SKILL.md                        # Skill specification & 4-action workflow (v1.0.0)
        └── references/
            ├── dynamic-routing.md          # 4-Tier cognitive routing & rebalancing rules
            ├── core-skills.md              # Curated universal engineering skills catalog
            └── orchestration-templates.md  # Double-Layer memory, monorepo & greenfield templates
```

---

## 📄 License

[MIT](./LICENSE)
