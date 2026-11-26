# Moldes de Orquestación y Sincronización Continua de Memoria (`context/`)

Este documento define las plantillas estructurales que `multi-agent-architect` aplica al ejecutar la acción `init`.

---

## 1. Directivas de Autonomía Operativa (Incluidas en `GEMINI.md` / `CLAUDE.md` / `AGENTS.md`)

Al generar el archivo raíz de orquestación del proyecto, se incorporan tres reglas operativas que funcionan automáticamente en segundo plano:

### A. Recuperación Transparente de Contexto
> - **Directiva del Orquestador:** *"Al iniciar una tarea o cuando el historial de una conversación extensa haya sido compactado, consulta silenciosamente `context/estado-y-plan.md` y `context/arquitectura.md` para mantener la alineación con el estado actual y la arquitectura del proyecto."*

### B. Sincronización Dinámica Continua (*Post-Task Auto-Sync*)
> - **Directiva del Orquestador:** *"Cada vez que se complete una tarea o modificación relevante en el proyecto, delega automáticamente en `@explorador-codigo` (modelo Tier 4 ligero) la actualización inmediata de las capas de memoria:"*
>   1. **Capa Permanente (`context/arquitectura.md` y `GEMINI.md`/`AGENTS.md`):**
>      - Se actualiza automáticamente cuando el cambio introduce o modifica módulos, tecnologías del stack, esquemas de base de datos, endpoints, dependencias, **nuevas skills instaladas** o **nuevos subagentes**.
>   2. **Capa Efímera (`context/estado-y-plan.md`):**
>      - Se actualiza al finalizar cada tarea o bloque de cambios, registrando el avance completado, el mensaje de **`## Commit Recomendado`** (*Conventional Commits*) listo para usar y el backlog actualizado (`## Tarea en Curso y Backlog Pendiente`).

### C. Failover Automático por Cuota (`fallback_model`)
> - **Directiva del Orquestador:** *"Cada subagente declara un `model:` titular y un `fallback_model:` ligero. Ante cualquier restricción o agotamiento de cuota en el modelo titular, la ejecución conmuta automáticamente al `fallback_model` garantizando continuidad operativa."*

---

## 2. Plantilla para `context/estado-y-plan.md` (Capa Efímera — Máximo 60 Líneas)

```markdown
## Commit Recomendado
`feat(<alcance>): <mensaje en formato Conventional Commits para el cambio actual>`

## Estado Operativo Actual
- **Proveedor Activo:** `<Proveedor y entorno configurado>`
- **Stack y Gestor Activo:** `<Stack y gestor de paquetes actual del proyecto>`
- **Salud del Proyecto:** `<Estado de compilación, tests y rama activa>`

## Últimos Avances Completados
- `<Resumen técnico conciso de la funcionalidad, refactorización, skill o configuración recién completada>`

## Tarea en Curso y Backlog Pendiente
1. `<Siguiente acción técnica prioritaria 1>`
2. `<Siguiente acción técnica prioritaria 2>`
3. `<Siguiente acción técnica prioritaria 3>`
```

---

## 3. Plantilla de Perfil para Subagentes en `.agents/agents/<rol>.md`

Cada subagente en `.agents/agents/` se configura con los modelos detectados en el entorno del desarrollador y respeta las herramientas actuales del proyecto:

```markdown
---
name: <nombre-del-subagente>
description: <criterio claro de activación y delegación para el Orquestador>
model: <modelo-titular-detectado>
fallback_model: <modelo-ligero-tier-4-detectado>
skills:
  - <skill-de-dominio-1>
  - <skill-de-dominio-2>
---

# Rol: `@<nombre-del-subagente>`

<Responsabilidades específicas adaptadas al stack actual del proyecto, alcance técnico y directrices de calidad>.
```

> **Responsabilidad de `@explorador-codigo` (`.agents/agents/explorador-codigo.md`):**
> Ejecuta las búsquedas rápidas en el código (`grep`, `find`, `git diff`) para preservar el presupuesto de contexto del Orquestador (*Exploration Budget*) y mantiene sincronizados `context/arquitectura.md` y `context/estado-y-plan.md` en segundo plano tras cada tarea finalizada.

---

## 4. Protocolo Greenfield en 2 Fases (Únicamente para Proyectos Desde Cero en Carpeta Vacía)

Cuando la skill se ejecuta en un directorio vacío para crear un proyecto nuevo:
1. **Fase 1 (Consultoría y Diseño Arquitectónico — Sin generar archivos aún):**
   - Formula **máximo 5 preguntas clave** sobre objetivos, arquitectura/stack (Software o Flujos Documentales/PDF/Slides), modelo de datos y entorno de despliegue.
   - Presenta la **Propuesta Arquitectónica Preliminar** y la **Matriz de Subagentes** con los modelos detectados en el entorno.
   - Solicita confirmación: *"¿Apruebas esta arquitectura o deseas ajustar algún componente antes de generar la estructura del proyecto?"*
2. **Fase 2 (Generación Completa tras aprobación):**
   - Inicializa la estructura de directorios con el stack acordado, genera `context/arquitectura.md`, `context/estado-y-plan.md`, `.agents/skills/`, `.agents/agents/`, `GEMINI.md`/`CLAUDE.md`, `AGENTS.md` e informa al final sobre las acciones opcionales (`models`, `stack`, `skills`).
