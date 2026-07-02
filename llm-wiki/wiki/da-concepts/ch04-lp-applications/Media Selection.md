---
title: Media Selection
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Ch.4 Marketing) + da/excel-solutions/Media Selection.xlsx
sources: [da/Textbook.pdf, da/excel-solutions/Media Selection.xlsx]
updated: 2026-06-18
pagerank: 0.0064
betweenness: 0.0000
eigenvector: 0.0838
degree: 9
community: 3
---

# Media Selection (Marketing Application)

A [[Linear Programming]] application that **allocates an advertising budget across multiple media** (TV, radio, newspaper, etc.) to maximize exposure / audience contacts. (Ch.4 Marketing Applications)

## Model Structure
- **Decision variables**: number of ads in each medium `xⱼ`
- **Objective function**: maximize total reach (exposure quality units / potential customer contacts)
- **Typical constraints**:
  - budget constraint: `Σ (unit costⱼ · xⱼ) ≤ budget`
  - upper/lower bounds on available ad slots per medium
  - media mix policy (e.g., TV ≥ a certain fraction of the total)
  - non-negativity

## Characteristics
- Many policy constraints (media variety, minimum/maximum usage) lead to numerous constraint equations
- Fractional ratio constraints are rearranged into linear form

## Related Notes
- [[Linear Programming]] · [[Portfolio Selection]] · [[Blending Problem]] · [[Sensitivity Analysis]]
- Full map: [[LLM Wiki MOC]]
