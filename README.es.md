# 🧩 `multi-agent-architect`

🌐 [English](./README.md) | **Español**

[![skills.sh](https://skills.sh/b/eroquedev/multi-agent-architect)](https://skills.sh/eroquedev/multi-agent-architect)
[![Validate Skill](https://github.com/eroquedev/multi-agent-architect/actions/workflows/validate-skill.yml/badge.svg)](https://github.com/eroquedev/multi-agent-architect/actions/workflows/validate-skill.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Skill autónoma de **Orquestación Multiagente**, **Enrutamiento Dinámico en 4 Niveles** y **Memoria de Doble Capa** para asistentes de desarrollo con IA (**Gemini CLI / Antigravity**, **Claude Code**, **Cursor**, **Codex**, **OpenCode**, **Windsurf**).

---

## 📦 Instalación

```bash
# Instalar en el proyecto actual
npx skills add eroquedev/multi-agent-architect

# O con pnpm / instalación global (-g)
pnpm dlx skills add eroquedev/multi-agent-architect -g
```

También puedes pedírselo directamente a tu agente en el chat:
> *"Instala la skill de `https://github.com/eroquedev/multi-agent-architect` en este proyecto."*

---

## ⚡ Uso y Acciones

Invoca la acción que necesites mediante comando corto o lenguaje natural (la skill responde y genera la documentación en el idioma de tu conversación):

| Comando | Lenguaje Natural | Qué hace |
| :--- | :--- | :--- |
| `/multi-agent-architect init`<br>*(acción por defecto)* | *"Usa `multi-agent-architect` para configurar este proyecto"* | **Inicialización en un solo paso sin pausas:** detecta tu proveedor y modelos activos, respeta tu stack actual y la higiene de secretos (`.env`), fusiona de forma segura con archivos previos y activa la sincronización automática de contexto. |
| `/multi-agent-architect models` | *"Con `multi-agent-architect` actualiza los modelos de mis agentes"* | Revisa los modelos vigentes de tu proveedor, evalúa mejoras reales por nivel cognitivo, actualiza solo donde convenga y explica cada cambio. |
| `/multi-agent-architect stack` | *"Con `multi-agent-architect` sugiere mejoras para mi stack"* | Muestra una tabla comparativa (*Stack Actual vs. Mejoras Sugeridas*) y aplica cambios únicamente si los apruebas. |
| `/multi-agent-architect skills` | *"Con `multi-agent-architect` recomiéndame skills para este proyecto"* | Enfoque híbrido: combina skills estándar universales con búsqueda en vivo para tu stack y enlaces oficiales para instalar bajo confirmación. |

---

## 🏗️ Arquitectura que Genera en tu Proyecto

```text
tu-proyecto/
├── AGENTS.md                      # Fuente única de verdad (Delegación Total + Auto-Sync)
├── GEMINI.md / CLAUDE.md          # Adaptador ligero apuntando a AGENTS.md
├── context/
│   ├── arquitectura.md            # Capa Permanente (módulos, esquemas, contratos, nombres env)
│   └── estado-y-plan.md           # Capa Efímera (máx. 60 líneas: avances, commit y backlog)
└── .agents/
    ├── agents/                    # Subagentes especializados con model y fallback_model
    └── skills/                    # Skills de dominio extraídas de tu propio código
```

---

## 📄 Licencia

[MIT](./LICENSE)
