# Reglas de Enrutamiento Cognitivo Dinámico y Balance de Modelos

> **Principio de Diseño:** `multi-agent-architect` no depende de listas estáticas de modelos. Evalúa en tiempo de ejecución los modelos disponibles en el proveedor activo del desarrollador, asignándolos en la inicialización (`init`) y re-balanceándolos cuando aparecen nuevos modelos (`models`).

---

## 1. Reconocimiento Autónomo del Proveedor y Modelos

El subagente explorador ligero (Tier 4) identifica el proveedor y catálogo de modelos sin interrumpir al usuario:
1. **Detección automática del entorno activo:** Toma por defecto el proveedor donde se está ejecutando la conversación (**Gemini / Antigravity**, **Claude Code**, **Cursor**, **Codex**, **OpenCode**, **Windsurf**), salvo que el desarrollador haya pedido expresamente otro proveedor en su prompt.
2. **Consulta de catálogo local:** Cuando el CLI lo permite, consulta en vivo los modelos habilitados en la cuenta (ej. `agy models` en Gemini/Antigravity u `ollama list` en entornos locales).

---

## 2. Clasificación Dinámica en 4 Niveles Cognitivos (*4-Tier Routing*)

Los modelos detectados se distribuyen automáticamente en los siguientes **4 niveles**:

| Nivel Cognitivo | Criterio de Selección en el Catálogo Detectado | Roles Asignados | Regla Operativa y Gestión de Tokens |
| :--- | :--- | :--- | :--- |
| **TIER 1: Frontera y Orquestación** | Modelos de máximo razonamiento u orquestadores dedicados (`orchestrator`, `opus`, `xhigh`, `pro`, `o3` o familia tope del proveedor). | **Orquestador Principal** (`GEMINI.md` / `CLAUDE.md`) y **`@arquitecto-sistema`**. | **Patrón *Full-Delegation* (Cero Código Repetitivo):** Se dedica exclusivamente a planificación, arquitectura, diseño de contratos y validación. Delega la exploración masiva de archivos a Tier 4 (*Exploration Budget*: máx. 4 lecturas directas). |
| **TIER 2: Ingeniería Core** | Modelos de capacidad alta/media optimizados para código, lógica y arquitectura de datos (`neon-high`, `hydrogen-medium`, `argon-high`, `carbon-high`, `sonnet`, `gpt-5` / `codex`). | **`@especialista-backend`**, **`@especialista-datos`**, **`@especialista-plataforma`**. | Implementación de servicios, APIs, modelado de datos SQL/NoSQL, migraciones, refactorizaciones críticas, tooling y automatización documental (PDF/PPTX/DOCX/XLSX). |
| **TIER 3: Velocidad Visual y QA** | Modelos rápidos de alta precisión (`flash-high`, `flash-medium`, `neon-medium`, `sonnet-medium`). | **`@especialista-ui-ux`** y **`@auditor-qa-tests`**. | Construcción de interfaces frontend/mobile (Astro, Next.js, React), sistemas de diseño, accesibilidad, pruebas unitarias/E2E y validación de tipado/linters. |
| **TIER 4: Exploración Ligera, Auto-Sync y `fallback_model`** | Modelos ultraligeros de bajo costo (`flash-low`, `haiku`, `mini`, `low`, `orchestrator-argon`). | **`@explorador-codigo`** (titular fijo) y **`fallback_model:`** de contingencia para el resto de agentes. | 1) Ejecuta búsquedas rápidas en el repositorio (`grep`, `find`, `git diff`); 2) **Sincroniza automáticamente `context/arquitectura.md` y `context/estado-y-plan.md` tras cada tarea completada**; 3) Actúa como respaldo automático cuando un modelo superior alcanza límites de cuota. |

---

## 3. Estrategias de Optimización según el Proveedor

### A. Entornos Gemini / Antigravity (`agy`)
- **Con acceso híbrido a modelos Claude:** Asigna los modelos nativos de alta disponibilidad (`orchestrator-neon`, `neon`, `hydrogen`, `argon`, `carbon`, `flash`) y aprovecha modelos de cuota limitada (`opus`, `sonnet`) en roles de alto impacto (Orquestación/Arquitectura sin código repetitivo o cirugía compleja), con failover automático hacia Gemini 4 y `fallback_model` en niveles `low` / `flash-low`.
- **Archivos generados:** `GEMINI.md` + `AGENTS.md`.

### B. Entornos Claude Code (Ventanas Rodantes de Cuota)
- **Orquestador y `@arquitecto-sistema`:** `Opus` (planificación y contratos, cero código repetitivo).
- **Especialistas Core (`Backend`, `Datos`, `UI/UX`, `Plataforma`):** `Sonnet`.
- **`@explorador-codigo` (Exploración + Auto-Sync de `context/`) y `fallback_model`:** `Haiku`.
- **Archivos generados:** `CLAUDE.md` + `AGENTS.md`.

### C. Entornos Codex / Cursor / OpenCode / Modelos Locales
- Aplica la distribución de **4 Tiers Cognitivos** sobre los modelos habilitados y genera `AGENTS.md` junto con el archivo nativo del cliente.

---

## 4. Algoritmo de Re-balanceo para la Acción `models` (Actualización de Modelos)

Cuando el desarrollador ejecuta `/multi-agent-architect models`, el balance comparativo sigue estas 4 reglas:
1. **Comparación por Tier:** Compara el modelo actualmente asignado a cada subagente contra los modelos disponibles hoy en el mismo Tier cognitivo.
2. **Criterio de Mejora Real (No solo "más pesado"):**
   - Un modelo nuevo reemplaza al anterior solo si ofrece: **a)** una nueva generación superior para ese Tier, **b)** mejor relación precisión/consumo de tokens, o **c)** reemplazo de un modelo deprecado/retirado.
   - En Tier 3 y Tier 4 se prioriza siempre la **eficiencia y baja latencia** (no subir innecesariamente el consumo de tokens en agentes de exploración o QA).
3. **Principio de Estabilidad:** Si el modelo actual sigue siendo el óptimo en su Tier o la diferencia es marginal, **no se modifica**.
4. **Transparencia:** Siempre se entrega al usuario la tabla comparativa detallando qué agentes cambiaron de modelo, cuáles se mantuvieron y la razón técnica de cada ajuste.
