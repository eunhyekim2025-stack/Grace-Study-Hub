---
title: Production Scheduling
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Ch.4 Operations) + da/excel-solutions/Production Scheduling.xlsx
sources: [da/Textbook.pdf, da/excel-solutions/Production Scheduling.xlsx]
updated: 2026-06-18
pagerank: 0.0061
betweenness: 0.0002
eigenvector: 0.0699
degree: 10
community: 3
---

# Production Scheduling (Operations Application)

A [[Linear Programming]] application that **plans production and inventory jointly** across multiple periods to minimize total cost. (Ch.4 Operations Management)

## Model Structure
- **Decision variables**: production in each period `Pₜ`, end-of-period inventory `Iₜ`
- **Objective function**: minimize `Σ (production cost + inventory holding cost)` (including variable labor cost if needed)
- **Key constraint — inventory balance**:
  `carried-over inventory(t−1) + production(t) − demand(t) = ending inventory(t)`
  - the key constraint that chains the periods together
- production-capacity and warehouse-capacity upper limits, non-negativity

## Characteristics
- The **inventory linking equations** across periods are the core of the model
- A trade-off between absorbing demand variation with inventory vs. adjusting production capacity

## Related Notes
- [[Linear Programming]] · [[Blending Problem]] · [[Workforce Assignment]] · [[Transportation Problem]]
- Full map: [[LLM Wiki MOC]]
