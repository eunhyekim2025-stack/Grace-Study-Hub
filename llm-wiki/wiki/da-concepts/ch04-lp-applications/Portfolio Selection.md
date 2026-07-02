---
title: Portfolio Selection
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Ch.4 Finance) + da/excel-solutions/Portfolio Selection.xlsx
sources: [da/Textbook.pdf, da/excel-solutions/Portfolio Selection.xlsx]
updated: 2026-06-18
pagerank: 0.0074
betweenness: 0.0001
eigenvector: 0.0954
degree: 11
community: 3
---

# Portfolio Selection (Finance Application)

A [[Linear Programming]] application that allocates funds across investable assets to **maximize expected return** (or minimize risk). (Ch.4 Finance Applications)

## Model Structure
- **Decision variables**: amount (or weight) invested in each asset `xⱼ`
- **Objective function**: maximize total expected return `Σ (returnⱼ · xⱼ)`
- **Typical constraints**:
  - total investment limit: `Σ xⱼ ≤ available funds`
  - upper/lower bounds per asset class (diversification policy)
  - risk-grade limits / liquidity requirements
  - non-negativity

## Characteristics
- The linear model assumes returns are constants (treating risk as variance makes it nonlinear → Ch.8)
- Policy ratio constraints are central (e.g., a single holding ≤ 25% of the total)

## Related Notes
- [[Linear Programming]] · [[Media Selection]] · [[Blending Problem]] · [[Sensitivity Analysis]]
- Full map: [[LLM Wiki MOC]]
