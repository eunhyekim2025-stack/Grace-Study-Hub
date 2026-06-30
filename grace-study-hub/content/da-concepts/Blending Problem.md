---
title: Blending Problem
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Ch.4 Operations) + da/excel-solutions/Blending Problem.xlsx
sources: [da/Textbook.pdf, da/excel-solutions/Blending Problem.xlsx]
updated: 2026-06-18
pagerank: 0.0087
betweenness: 0.0004
eigenvector: 0.0769
degree: 11
community: 3
---

# Blending Problem (Operations Application)

A [[Linear Programming]] application that **mixes several ingredients** to meet quality requirements while **minimizing cost**. (Ch.4 Operations Management)

## Model Structure
- **Decision variables**: amount of each ingredient used `xⱼ`
- **Objective function**: minimize total blending cost `Σ (unit costⱼ · xⱼ)`
- **Typical constraints**:
  - total output requirement
  - component ratio constraints (e.g., a given component ≥/≤ a certain % of the total)
  - upper limits on ingredient availability
  - non-negativity

## Characteristics
- A ratio constraint `(component/total) ≥ p` is linearized as `component − p·total ≥ 0`
- Typical in oil refining (gasoline blending), animal feed, food, etc.

## Related Notes
- [[Linear Programming]] · [[Production Scheduling]] · [[Workforce Assignment]] · [[Sensitivity Analysis]]
- Full map: [[LLM Wiki MOC]]
