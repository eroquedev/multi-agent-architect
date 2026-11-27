# 🧩 `multi-agent-architect`

[![skills.sh](https://skills.sh/b/eroquedev/multi-agent-architect)](https://skills.sh/eroquedev/multi-agent-architect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Skill de **Orquestación Multiagente**, **Enrutamiento Dinámico de Modelos** y **Memoria de Doble Capa** para agentes de desarrollo con IA (**Gemini CLI / Antigravity**, **Claude Code**, **Cursor**, **Codex**, **OpenCode**, **Windsurf**).

---

## 📦 Instalación

```bash
# Instalar en el proyecto actual
npx skills add eroquedev/multi-agent-architect

# O con pnpm / global (-g)
pnpm dlx skills add eroquedev/multi-agent-architect -g
```

También puedes pedirle directamente a tu agente en el chat:
> *"Instala la skill de `https://github.com/eroquedev/multi-agent-architect` en este proyecto."*

---

## ⚡ Uso y Acciones

Una vez instalada, invoca la acción que necesites mediante comando corto o lenguaje natural:

| Comando | Lenguaje Natural | Qué hace |
| :--- | :--- | :--- |
| `/multi-agent-architect init`<br>*(acción por defecto)* | *"Usa `multi-agent-architect` para configurar este proyecto"* | **Inicialización en un solo paso sin pausas:** detecta tu proveedor y modelos activos, respeta el stack actual de tu proyecto y genera toda la orquestación y memoria en segundo plano. |
| `/multi-agent-architect models` | *"Con `multi-agent-architect` actualiza los modelos de mis agentes"* | Revisa si tu proveedor tiene modelos nuevos o más eficientes, hace un balance capacidad/consumo, actualiza los agentes que lo requieran y reporta los cambios. |
| `/multi-agent-architect stack` | *"Con `multi-agent-architect` sugiere mejoras para mi stack"* | Muestra una comparativa entre tu stack actual y mejoras técnicas opcionales (con su justificación). Solo aplica cambios si los apruebas. |
| `/multi-agent-architect skills` | *"Con `multi-agent-architect` recomiéndame skills para este proyecto"* | Enfoque híbrido: recomienda skills estándar universales + busca en internet skills específicas para tu stack con enlaces oficiales para instalar bajo confirmación. |

---

## 🏗️ Arquitectura que Genera en tu Proyecto

```text
tu-proyecto/
├── GEMINI.md / CLAUDE.md          # Orquestador Principal (Full-Delegation + Auto-Sync)
├── AGENTS.md                      # Puente universal compatible con cualquier CLI/IDE
├── context/
│   ├── arquitectura.md            # Capa Permanente (Fuente de verdad estructural)
│   └── estado-y-plan.md           # Capa Efímera (Avances, commit sugerido y backlog)
└── .agents/
    ├── agents/                    # Subagentes especializados con model y fallback_model
    └── skills/                    # Skills de dominio extraídas de las reglas de tu proyecto
```

---

## 📂 Estructura del Repositorio

```text
multi-agent-architect/
├── .github/workflows/skills-maintenance.yml      # Auditoría semanal automática de vigencia de skills
├── LICENSE                                       # Licencia MIT
├── README.md                                     # Documentación general
└── skills/
    └── multi-agent-architect/
        ├── SKILL.md                              # Especificación y flujo de las 4 acciones
        └── references/
            ├── reglas-enrutamiento-dinamico.md   # Clasificación en 4 Tiers y balance de modelos
            ├── skills-estandar.md                # Catálogo curado de skills estándar universales
            └── moldes-orquestacion.md            # Plantillas de memoria en doble capa y subagentes
```

---

## 📄 Licencia

[MIT](./LICENSE)
