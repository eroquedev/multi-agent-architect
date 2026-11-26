---
name: multi-agent-architect
description: >-
  Use this skill to initialize, manage, or upgrade multi-agent orchestration and
  Double-Layer Memory (GEMINI.md, CLAUDE.md, AGENTS.md, context/, .agents/) in any
  project. Supports 4 independent actions: (1) 'init' to generate the complete
  orchestration in a single uninterrupted pass respecting the project's current stack,
  (2) 'models' to audit and rebalance agent models when new provider models appear,
  (3) 'stack' to compare the current stack against optional technical improvements,
  and (4) 'skills' to recommend curated community skills with official links.
---

# `multi-agent-architect` — Orquestación Multiagente e Ingeniería de Contexto

Esta skill opera mediante **4 acciones independientes** para configurar y mantener la arquitectura multiagente del proyecto sin interrupciones innecesarias.

## Tabla de Acciones e Invocación

Identifica qué acción solicita el desarrollador (ya sea mediante comando corto o en lenguaje natural) y ejecuta **únicamente** el flujo correspondiente:

| Acción | Comando Corto | Equivalente en Lenguaje Natural | Propósito |
| :--- | :--- | :--- | :--- |
| **`init`** *(Por defecto)* | `/multi-agent-architect` o `/multi-agent-architect init` | *"Configura / inicializa la orquestación de este proyecto"* | Genera toda la orquestación de principio a fin en **un solo proceso sin pausas**, respetando el stack actual del proyecto. |
| **`models`** | `/multi-agent-architect models` | *"Actualiza / mejora los modelos de mis agentes"* | Consulta los modelos actuales del proveedor, evalúa si hay modelos nuevos o mejores y actualiza los agentes explicando cada cambio. |
| **`stack`** | `/multi-agent-architect stack` | *"Analiza o sugiere mejoras de stack para mi proyecto"* | Compara el stack actual del proyecto frente a mejoras opcionales recomendadas y aplica solo las que el usuario apruebe. |
| **`skills`** | `/multi-agent-architect skills` | *"Recomiéndame skills para este proyecto"* | Sugiere skills públicas verificadas del catálogo curado con sus enlaces oficiales para instalar bajo confirmación. |

---

## ACCIÓN 1: `init` — Inicialización Directa en Un Solo Proceso (Por Defecto)

> **Regla de Cero Fricción:** En proyectos existentes, **no detengas el proceso con preguntas intermedias, no impongas cambios de stack (respeta su gestor actual `npm`, `pnpm`, `yarn`, `bun`, `cargo`, `uv`, etc.) y nunca elimines archivos de su carpeta `docs/`**. Genera toda la estructura de corrido.
> *(Única excepción: si el directorio está completamente vacío y el usuario pide crear un proyecto desde cero / Greenfield, aplica primero la Fase 1 de consultoría descrita en [`./references/moldes-orquestacion.md`](./references/moldes-orquestacion.md)).*

### Pasos de Ejecución Continua (`init`):
1. **Reconocimiento Autónomo (Vía Subagente Económico Tier 4):**
   - Lanza un subagente con el modelo más ligero disponible (`flash_lite` / Tier 4) para que en una sola lectura:
     - Detecte automáticamente el proveedor de IA donde corre la sesión actual (o el proveedor que el usuario haya indicado en su prompt) y obtenga sus modelos disponibles (`agy models`, catálogo de Claude Code, Codex, Cursor u Ollama).
     - Audite el stack actual del proyecto, su gestor de paquetes, estructura de carpetas y cualquier documentación en `docs/` o archivos `.md`.
2. **Construcción de la Memoria de Doble Capa en `context/`:**
   - Siguiendo [`./references/moldes-orquestacion.md`](./references/moldes-orquestacion.md), crea:
     - `context/arquitectura.md` (**Capa Permanente**: mapa real del stack actual, módulos, base de datos, contratos, comandos con su gestor actual y conocimiento técnico extraído de `docs/`, manteniendo `docs/` intacto).
     - `context/estado-y-plan.md` (**Capa Efímera**: máx. 60 líneas con estado operativo, avances, `## Commit Recomendado` y backlog activo).
3. **Creación de Skills Propios del Proyecto en `.agents/skills/`:**
   - Crea entre **2 y 5 skills internas** en `.agents/skills/<dominio>/SKILL.md` basadas en las reglas y convenciones reales del código auditado (preservando intacta cualquier carpeta `resources/*` preexistente).
4. **Creación de Subagentes (`.agents/agents/`) y Archivos Raíz (`GEMINI.md` / `CLAUDE.md` + `AGENTS.md`):**
   - Clasifica los modelos detectados en los **4 Tiers Cognitivos** de [`./references/reglas-enrutamiento-dinamico.md`](./references/reglas-enrutamiento-dinamico.md) y crea los subagentes necesarios para el proyecto (`arquitecto-sistema.md`, `especialista-backend.md`, `especialista-datos.md`, `especialista-plataforma.md`, `especialista-ui-ux.md`, `auditor-qa-tests.md` y **`explorador-codigo.md`** en Tier 4), cada uno con su `model:` y `fallback_model:`.
   - Crea el archivo raíz del proveedor (`GEMINI.md` y/o `CLAUDE.md`) y `AGENTS.md` dejando activadas en segundo plano las **3 Directivas Autónomas**:
     1. *Full-Delegation Orchestration* (el Orquestador planifica y delega la exploración en `@explorador-codigo`).
     2. *Recuperación Silenciosa de Contexto* (lectura automática de `context/` al iniciar tareas o tras compactación del chat).
     3. *Post-Task Auto-Sync* (`@explorador-codigo` actualiza automáticamente `context/arquitectura.md` y `context/estado-y-plan.md` cada vez que se realizan cambios en el proyecto).
5. **Cierre Limpio:**
   - Muestra el árbol de archivos creados y finaliza con este bloque informativo de 4 líneas:
     > ✅ **Orquestación inicializada respetando el stack actual de tu proyecto.**
     > Cuando lo necesites, puedes ejecutar cualquiera de estas acciones adicionales:
     > - `/multi-agent-architect models` — Revisar y actualizar los modelos de tus agentes si salieron versiones mejores.
     > - `/multi-agent-architect stack` — Analizar tu stack actual y ver sugerencias opcionales de mejora.
     > - `/multi-agent-architect skills` — Recibir recomendaciones de skills públicas verificadas para tu proyecto.

---

## ACCIÓN 2: `models` — Actualización y Re-balanceo Inteligente de Modelos

Cuando el usuario invoque `/multi-agent-architect models` (o pida revisar/actualizar los modelos de sus agentes):

1. **Lectura de Configuración Actual:**
   - Inspecciona los campos `model:` y `fallback_model:` actuales en `GEMINI.md` / `CLAUDE.md`, `AGENTS.md` y todos los archivos de `.agents/agents/*.md`.
2. **Consulta en Vivo del Catálogo del Proveedor:**
   - Mediante el subagente económico, obtiene la lista actualizada de modelos disponibles hoy en el proveedor del desarrollador.
3. **Evaluación y Balance (Capacidad vs. Consumo de Cuota):**
   - Aplica los criterios de [`./references/reglas-enrutamiento-dinamico.md`](./references/reglas-enrutamiento-dinamico.md):
     - Evalúa por cada rol (Tier 1 a Tier 4) si existe un modelo nuevo o superior que mejore el razonamiento, la velocidad o la eficiencia de tokens (o si algún modelo configurado quedó deprecado).
     - **Regla de Estabilidad:** Si no hay una diferencia significativa para un rol, **mantiene el modelo actual sin cambios**.
     - Si hay una mejora real, actualiza `model:` y/o `fallback_model:` en los archivos `.md` correspondientes y sincroniza `context/arquitectura.md` y `context/estado-y-plan.md`.
4. **Reporte de Actualización:**
   - Responde al desarrollador con una tabla clara:
     - **Agente / Archivo**
     - **Modelo Anterior ➔ Modelo Actualizado** *(o "Sin cambios — ya usa el óptimo")*
     - **Justificación técnica** *(por qué es mejor en capacidad, velocidad o eficiencia de cuota)*.

---

## ACCIÓN 3: `stack` — Consultoría Opcional de Mejoras de Stack

Cuando el usuario invoque `/multi-agent-architect stack` (o pida sugerencias para mejorar el stack de su proyecto):

1. **Diagnóstico Comparativo (Sin Modificar Archivos Aún):**
   - Analiza las herramientas actuales del proyecto (gestor de paquetes como `npm` vs `pnpm`, configuración de tipado, linters, scripts de build, estructura de dependencias o seguridad).
   - Presenta al desarrollador una tabla clara con 3 columnas:
     - **Stack Actual en tu Proyecto**
     - **Mejora Sugerida** *(ej. migrar de `npm` a `pnpm` en Node.js, de `pip` a `uv` en Python, activar strict mode, etc.)*
     - **Por qué se sugiere** *(beneficio real en seguridad de dependencias, velocidad, aislamiento o mantenibilidad)*.
2. **Decisión del Desarrollador:**
   - Pregunta: *"¿Deseas que aplique alguna de estas mejoras o prefieres mantener tu stack actual?"*
   - Si el desarrollador decide mantener su stack, no modifiques nada. Si aprueba una o más mejoras, aplícalas y haz que `@explorador-codigo` actualice automáticamente `context/arquitectura.md` y `context/estado-y-plan.md`.

---

## ACCIÓN 4: `skills` — Recomendación Curada de Skills de la Comunidad

Cuando el usuario invoque `/multi-agent-architect skills` (o pida recomendaciones de skills externas para su proyecto):

1. **Selección Curada:**
   - Cruza las tecnologías y el dominio del proyecto actual contra [`./references/boveda-skills.md`](./references/boveda-skills.md) y selecciona entre **3 y 6 skills públicas verificadas**.
2. **Presentación con Enlaces Oficiales:**
   - Muestra cada skill sugerida indicando:
     - **Nombre de la skill** y **por qué aporta valor a este proyecto**.
     - **Enlace oficial** (GitHub / `skills.sh`) para que el desarrollador pueda revisarla.
     - **Comando de instalación adaptado al gestor actual del proyecto** (`npx skills add ...` si usa `npm`, `pnpm dlx skills add ...` si usa `pnpm`, `bunx skills add ...` si usa `bun`).
3. **Instalación Bajo Confirmación:**
   - Instala únicamente las skills que el desarrollador pida expresamente (o cualquier otra que haya investigado por su cuenta) y sincroniza `context/arquitectura.md`.
