# Curated Core Standardized Skills (`core-skills.md`)

> **Hybrid Strategy (`skills` action):**
> This catalog intentionally stores **only universal, high-signal engineering skills** applicable across almost any project (security, TDD, systematic debugging, code review, planning, web E2E/UI, and document workflows).
> When `/multi-agent-architect skills` runs, the agent pairs **2–3 core skills from this file** with a **live ecosystem search (`skills.sh`, `npx skills find`, GitHub)** tailored to the project's specific languages and frameworks. External skills are never installed without explicit user confirmation.

---

## 1. Universal Software Engineering Core

| Category | Official Package / Skill | Universal Value | Official Link | Base Install Command |
| :--- | :--- | :--- | :--- | :--- |
| **Security & OWASP** | **`semgrep/skills`** | Secure coding rules (OWASP Top 10) across 15+ languages, injection prevention, secrets hygiene, and infra security. | [github.com/semgrep/skills](https://github.com/semgrep/skills) | `npx skills add semgrep/skills` |
| **Static Analysis & Auditing** | **`trailofbits/skills`** | Security auditing, Semgrep-backed static analysis, and systematic vulnerability detection prior to release. | [github.com/trailofbits/skills](https://github.com/trailofbits/skills) | `npx skills add trailofbits/skills` |
| **Testing & TDD** | **`obra/superpowers`** (`test-driven-development`) | Language-agnostic TDD workflow (red-green-refactor discipline before writing production code). | [github.com/obra/superpowers/tree/main/skills/test-driven-development](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | `npx skills add obra/superpowers --skill test-driven-development` |
| **Systematic Debugging** | **`obra/superpowers`** (`systematic-debugging`) | Structured root-cause diagnosis: reproduction, log inspection, isolation, and regression checks. | [github.com/obra/superpowers/tree/main/skills/systematic-debugging](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | `npx skills add obra/superpowers --skill systematic-debugging` |
| **Code Review** | **`obra/superpowers`** (`requesting-code-review`) | Structured pre-merge review covering architecture boundaries, edge cases, security, and test quality. | [github.com/obra/superpowers/tree/main/skills/requesting-code-review](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review) | `npx skills add obra/superpowers --skill requesting-code-review` |
| **Planning & Specs** | **`obra/superpowers`** (`brainstorming` & `executing-plans`) | Collaborative requirement scoping and step-by-step execution plans before editing files. | [github.com/obra/superpowers/tree/main/skills](https://github.com/obra/superpowers/tree/main/skills) | `npx skills add obra/superpowers` |

---

## 2. Cross-Cutting UI, E2E & Document Workflows

| Category | Official Package / Skill | When to Recommend | Official Link | Base Install Command |
| :--- | :--- | :--- | :--- | :--- |
| **Web E2E Testing** | **`anthropics/skills`** (`webapp-testing`) | Web frontend/fullstack apps (Playwright E2E automation, DOM inspection, and visual verification). | [github.com/anthropics/skills/tree/main/skills/webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | `npx skills add anthropics/skills --skill webapp-testing` |
| **UI/UX Design** | **`anthropics/skills`** (`frontend-design`) | Projects with visual interfaces (modern typography, cohesive layouts, and non-generic components). | [github.com/anthropics/skills/tree/main/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | `npx skills add anthropics/skills --skill frontend-design` |
| **Web Accessibility** | **`vercel-labs/agent-skills`** (`web-design-guidelines`) | Frontend projects (a11y audits, keyboard navigation, form states, and responsive design). | [github.com/vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| **Technical Specs & Docs** | **`anthropics/skills`** (`doc-coauthoring`) | Projects authoring PRDs, RFCs, architectural specs, and structured technical documentation. | [github.com/anthropics/skills/tree/main/skills/doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | `npx skills add anthropics/skills --skill doc-coauthoring` |
| **Office & Reports** | **`anthropics/skills`** (`pdf`, `pptx`, `docx`, `xlsx`) | Document automation pipelines generating PDFs, PowerPoint decks, Word docs, or Excel spreadsheets. | [github.com/anthropics/skills/tree/main/skills](https://github.com/anthropics/skills/tree/main/skills) | `npx skills add anthropics/skills --skill pdf` *(or `pptx`/`docx`/`xlsx`)* |
