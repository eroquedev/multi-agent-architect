# Catálogo Curado de Skills Públicas Verificadas (`boveda-skills.md`)

> **Política de Uso (Acción `skills`):**
> 1. **Invocación Bajo Demanda:** Este catálogo se consulta cuando el desarrollador ejecuta `/multi-agent-architect skills` (o solicita recomendaciones de skills para su proyecto).
> 2. **Adaptación al Gestor del Proyecto:** Ajusta el prefijo del comando de instalación al gestor que utilice el proyecto del desarrollador (`npx skills add ...`, `pnpm dlx skills add ...` o `bunx skills add ...`). Ninguna skill externa se instala sin confirmación explícita del usuario.

---

## 1. Frontend, Frameworks Web y Diseño UI/UX

| Skill / Identificador | Tecnologías / Caso de Uso | Enlace Oficial | Comando Base de Instalación |
| :--- | :--- | :--- | :--- |
| **`frontend-design`** *(Anthropic Official)* | Diseño UI/UX moderno, tipografía, sistemas de layout y componentes visuales de alto estándar para Astro, Next.js, React y Vue. | [github.com/anthropics/skills/tree/main/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) \| [skills.sh](https://skills.sh) | `npx skills add anthropics/skills --skill frontend-design` |
| **`vercel-react-best-practices`** *(Vercel Labs)* | Reglas de rendimiento para React y Next.js App Router (SSR, Server Components, Server Actions, optimización de bundles). | [github.com/vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) \| [skills.sh/vercel-labs/agent-skills](https://skills.sh/vercel-labs/agent-skills) | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` |
| **`web-design-guidelines`** *(Vercel Labs)* | Estándares de accesibilidad (a11y), navegación por teclado, estados interactivos, formularios y diseño responsivo. | [github.com/vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| **`astro-specialist` / `astro-docs`** | Arquitectura de islas en Astro, Content Collections, SSR/SSG, View Transitions, SEO técnico y optimización de assets. | [skills.sh/?q=astro](https://skills.sh/?q=astro) \| [docs.astro.build](https://docs.astro.build) | `npx skills find astro` |
| **`tailwind-design-system`** | Arquitectura de estilos con Tailwind CSS v3/v4, tokens de diseño, `shadcn/ui`, variantes con CVA y soporte de temas. | [skills.sh/?q=tailwind](https://skills.sh/?q=tailwind) \| [agenticskills.io](https://agenticskills.io) | `npx skills find tailwind` |

---

## 2. Backend, APIs, Seguridad y Bases de Datos

| Skill / Identificador | Tecnologías / Caso de Uso | Enlace Oficial | Comando Base de Instalación |
| :--- | :--- | :--- | :--- |
| **`security-owasp-audit`** | Seguridad en aplicaciones y APIs: mitigación de SQLi, XSS, CSRF, SSRF, autenticación JWT/OAuth2, rate limiting y protección de secretos. | [skills.sh/?q=security](https://skills.sh/?q=security) \| [github.com/obra/superpowers](https://github.com/obra/superpowers) | `npx skills find security` |
| **`supabase-postgres-best-practices`** *(Supabase Official)* | Modelado en PostgreSQL, índices, Row Level Security (RLS), optimización de consultas, transacciones y migraciones seguras. | [github.com/supabase/agent-skills](https://github.com/supabase/agent-skills) \| [skills.sh](https://skills.sh) | `npx skills add supabase/agent-skills` |
| **`prisma-drizzle-orm`** | Acceso a datos tipado en TypeScript, prevención de consultas N+1, gestión de esquemas, migraciones y seeds reproducibles. | [skills.sh/?q=prisma](https://skills.sh/?q=prisma) \| [skills.sh/?q=drizzle](https://skills.sh/?q=drizzle) | `npx skills find prisma` / `npx skills find drizzle` |
| **`api-architecture-rest-graphql`** | Diseño de contratos OpenAPI/Swagger, validación de esquemas con Zod, manejo estandarizado de errores (RFC 7807) e idempotencia. | [skills.sh/?q=api](https://skills.sh/?q=api) \| [skillsdirectory.com](https://skillsdirectory.com) | `npx skills find api` |

---

## 3. Lenguajes, Monorepos, Builders y Runtimes (TypeScript, Rust, Python, Go, Turbo, Vite, Bun)

| Skill / Identificador | Tecnologías / Caso de Uso | Enlace Oficial | Comando Base de Instalación |
| :--- | :--- | :--- | :--- |
| **`typescript-strict-patterns`** | Tipado estricto sin `any`, inferencia avanzada, patrones con Zod, módulos ESM y configuración óptima de `tsconfig.json`. | [skills.sh/?q=typescript](https://skills.sh/?q=typescript) | `npx skills find typescript` |
| **`turborepo-workspaces`** | Arquitectura de monorepos con Turborepo, caché de compilación, partición de paquetes (`apps/*`, `packages/*`) y pipelines. | [skills.sh/?q=turborepo](https://skills.sh/?q=turborepo) | `npx skills find turborepo` |
| **`vite-bun-tooling`** | Configuración avanzada de Vite, optimización de builds, suites de pruebas con Vitest y runtimes modernos. | [skills.sh/?q=vite](https://skills.sh/?q=vite) | `npx skills find vite` |
| **`rust-systems-engineering`** | Patrones idiomáticos de ownership/borrowing, programación asíncrona con `tokio`, manejo de errores (`thiserror`/`anyhow`) y Cargo workspaces. | [skills.sh/?q=rust](https://skills.sh/?q=rust) | `npx skills find rust` |
| **`python-modern-uv-fastapi`** | Desarrollo moderno en Python tipado (`mypy`/`pyright`), gestión con `uv`, servicios con FastAPI, Pydantic v2 y pruebas con `pytest`. | [skills.sh/?q=python](https://skills.sh/?q=python) \| [skills.sh/?q=fastapi](https://skills.sh/?q=fastapi) | `npx skills find fastapi` |

---

## 4. Disciplina de Ingeniería, Testing QA, DevOps y Servidores MCP

| Skill / Identificador | Tecnologías / Caso de Uso | Enlace Oficial | Comando Base de Instalación |
| :--- | :--- | :--- | :--- |
| **`superpowers` (TDD, Debugging & Planning)** *(Obra)* | Flujos estructurados de Test-Driven Development (TDD), depuración sistemática, revisión de código y diseño basado en especificaciones. | [github.com/obra/superpowers](https://github.com/obra/superpowers) \| [skills.sh](https://skills.sh) | `npx skills add obra/superpowers` |
| **`webapp-testing`** *(Anthropic Official)* | Pruebas End-to-End (E2E) automatizadas con Playwright, verificación de flujos de usuario e inspección del DOM. | [github.com/anthropics/skills/tree/main/skills/webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | `npx skills add anthropics/skills --skill webapp-testing` |
| **`mcp-builder`** *(Anthropic Official)* | Diseño, implementación y empaquetado de servidores MCP (Model Context Protocol) en TypeScript o Python. | [github.com/anthropics/skills/tree/main/skills/mcp-builder](https://github.com/anthropics/skills/tree/main/skills/mcp-builder) | `npx skills add anthropics/skills --skill mcp-builder` |
| **`docker-coolify-deployment`** | Creación de Dockerfiles multi-stage optimizados, `docker-compose`, healthchecks, despliegue en Coolify y pipelines CI/CD. | [skills.sh/?q=docker](https://skills.sh/?q=docker) | `npx skills find docker` |

---

## 5. Automatización Documental, Presentaciones (Slides), PDF, Word y Hojas de Cálculo

| Skill / Identificador | Dominio / Caso de Uso | Enlace Oficial | Comando Base de Instalación |
| :--- | :--- | :--- | :--- |
| **`pdf`** *(Anthropic Official Document Skill)* | Procesamiento, extracción de tablas/texto, combinación, llenado de formularios y generación programática de documentos **PDF**. | [github.com/anthropics/skills/tree/main/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) | `npx skills add anthropics/skills --skill pdf` |
| **`pptx`** *(Anthropic Official Slides Skill)* | Diseño y generación automatizada de **presentaciones y diapositivas PowerPoint (`.pptx`)** a partir de estructuras o plantillas. | [github.com/anthropics/skills/tree/main/skills/pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) | `npx skills add anthropics/skills --skill pptx` |
| **`docx`** *(Anthropic Official Word Skill)* | Creación, edición estructurada, aplicación de estilos corporativos y procesamiento de documentos **Word (`.docx`)**. | [github.com/anthropics/skills/tree/main/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx) | `npx skills add anthropics/skills --skill docx` |
| **`xlsx`** *(Anthropic Official Spreadsheet Skill)* | Construcción y análisis de hojas de cálculo **Excel (`.xlsx`)**, modelado tabular, fórmulas dinámicas y validación de datos. | [github.com/anthropics/skills/tree/main/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) | `npx skills add anthropics/skills --skill xlsx` |
| **`doc-coauthoring` & `internal-comms`** *(Anthropic Official)* | Redacción estructurada de especificaciones técnicas (PRDs), RFCs, documentación de arquitectura y comunicados técnicos. | [github.com/anthropics/skills/tree/main/skills/doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | `npx skills add anthropics/skills --skill doc-coauthoring` |
| **`skill-creator`** *(Anthropic Official)* | Guía oficial para diseñar, estructurar y empaquetar nuevas skills personalizadas. | [github.com/anthropics/skills/tree/main/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | `npx skills add anthropics/skills --skill skill-creator` |
