# Skills Estandarizadas Universales (`skills-estandar.md`)

> **Enfoque Híbrido (Acción `skills`):**
> Este archivo contiene únicamente las **skills transversales y estandarizadas** que aportan valor a prácticamente cualquier proyecto (seguridad, testing, debugging, revisión de código, planificación y documentación/UI).
> - Al ejecutar `/multi-agent-architect skills`, el agente combina **2–3 skills base de este catálogo** con una **búsqueda en tiempo real en internet (`skills find` / `skills.sh` / GitHub)** para cubrir las tecnologías específicas del proyecto (ej. Astro, Rust, Laravel, Flutter, Supabase, etc.).
> - Ninguna skill externa se instala automáticamente sin confirmación explícita del desarrollador.

---

## 1. Núcleo Universal de Ingeniería (Todo Proyecto de Software)

| Categoría | Skill / Paquete Oficial | Propósito Universal | Enlace Oficial | Comando Base |
| :--- | :--- | :--- | :--- | :--- |
| **Seguridad & OWASP** | **`semgrep/skills`** | Reglas de codificación segura (OWASP Top 10) en +15 lenguajes, prevención de inyecciones, manejo de secretos y seguridad en infraestructura. | [github.com/semgrep/skills](https://github.com/semgrep/skills) | `npx skills add semgrep/skills` |
| **Auditoría & Análisis Estático** | **`trailofbits/skills`** | Auditoría de seguridad, análisis estático con Semgrep y detección sistemática de vulnerabilidades antes de producción. | [github.com/trailofbits/skills](https://github.com/trailofbits/skills) | `npx skills add trailofbits/skills` |
| **Testing & TDD** | **`obra/superpowers`** (`test-driven-development`) | Disciplina TDD agnóstica de lenguaje (test que falla primero, implementación mínima y refactorización segura). | [github.com/obra/superpowers/tree/main/skills/test-driven-development](https://github.com/obra/superpowers/tree/main/skills/test-driven-development) | `npx skills add obra/superpowers --skill test-driven-development` |
| **Debugging Sistemático** | **`obra/superpowers`** (`systematic-debugging`) | Diagnóstico metódico paso a paso: reproducción, aislamiento de causa raíz y verificación de regresiones. | [github.com/obra/superpowers/tree/main/skills/systematic-debugging](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging) | `npx skills add obra/superpowers --skill systematic-debugging` |
| **Code Review** | **`obra/superpowers`** (`requesting-code-review`) | Revisión estructurada de calidad, arquitectura, seguridad y pruebas antes de integrar cambios. | [github.com/obra/superpowers/tree/main/skills/requesting-code-review](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review) | `npx skills add obra/superpowers --skill requesting-code-review` |
| **Planificación & Diseño** | **`obra/superpowers`** (`brainstorming` & `executing-plans`) | Especificación de requerimientos y descomposición de planes ejecutables antes de escribir código. | [github.com/obra/superpowers/tree/main/skills](https://github.com/obra/superpowers/tree/main/skills) | `npx skills add obra/superpowers` |

---

## 2. Núcleo Transversal (Frontend, E2E y Flujos Documentales)

| Categoría | Skill / Paquete Oficial | Cuándo Recomendarla | Enlace Oficial | Comando Base |
| :--- | :--- | :--- | :--- | :--- |
| **Testing E2E Web** | **`anthropics/skills`** (`webapp-testing`) | Proyectos con interfaz web (automatización de pruebas E2E con Playwright e inspección de DOM). | [github.com/anthropics/skills/tree/main/skills/webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | `npx skills add anthropics/skills --skill webapp-testing` |
| **Diseño UI/UX** | **`anthropics/skills`** (`frontend-design`) | Proyectos con interfaz visual (sistemas de layout, tipografía y componentes modernos evitando estilos genéricos). | [github.com/anthropics/skills/tree/main/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | `npx skills add anthropics/skills --skill frontend-design` |
| **Accesibilidad Web** | **`vercel-labs/agent-skills`** (`web-design-guidelines`) | Proyectos frontend (auditoría de accesibilidad a11y, navegación por teclado, formularios y responsividad). | [github.com/vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| **Documentación & Specs** | **`anthropics/skills`** (`doc-coauthoring`) | Proyectos que requieran PRDs, RFCs, especificaciones técnicas o documentación colaborativa. | [github.com/anthropics/skills/tree/main/skills/doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | `npx skills add anthropics/skills --skill doc-coauthoring` |
| **Documentos & Reportes** | **`anthropics/skills`** (`pdf`, `pptx`, `docx`, `xlsx`) | Flujos de automatización documental, generación de PDFs, presentaciones PowerPoint, Word o Excel. | [github.com/anthropics/skills/tree/main/skills](https://github.com/anthropics/skills/tree/main/skills) | `npx skills add anthropics/skills --skill pdf` *(o `pptx`/`docx`/`xlsx`)* |
