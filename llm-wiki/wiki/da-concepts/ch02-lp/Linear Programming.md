---
title: Linear Programming
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0255
betweenness: 0.0185
eigenvector: 0.2149
degree: 31
community: 3
---

# Linear Programming (LP)

A mathematical programming technique that optimizes (maximizes/minimizes) a **linear objective function** subject to **linear constraints**.

## Components
- **Decision variables**: controllable unknowns (e.g., production quantities per product x₁, x₂)
- **Objective function**: the linear expression to maximize (profit) or minimize (cost)
- **Constraints**: linear inequalities/equalities, such as resource limits
- **Non-negativity**: `xᵢ ≥ 0`

## Formulation Example — Par, Inc. (golf bags)
```
Max  10 S + 9 D            (maximize profit)
s.t. 0.7 S + 1.0 D ≤ 630   (cutting & dyeing)
     0.5 S + 0.833 D ≤ 600 (sewing)
     1.0 S + 0.667 D ≤ 708 (finishing)
     0.1 S + 0.25 D ≤ 135  (inspection & packaging)
     S, D ≥ 0
```

## LP Assumptions
- **Proportionality**, **Additivity**, **Divisibility**, **Certainty**
- If divisibility breaks down → Integer LP

## Solution Methods
- [[Graphical Solution Method]] (2 variables)
- Simplex method / computer (Excel Solver) — many variables

## Related Notes
- [[Feasible Region]] · [[Extreme Points]] · [[Slack and Surplus Variables]] · [[Sensitivity Analysis]]
- Applications: [[Media Selection]] · [[Portfolio Selection]] · [[Blending Problem]]
- Full map: [[LLM Wiki MOC]]
