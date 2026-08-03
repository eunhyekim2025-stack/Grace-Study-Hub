---
title: Linear Programming
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0243
betweenness: 0.0070
eigenvector: 0.1951
degree: 31
community: 4
---

<div class="dc-view">
<div class="dc-title">Linear Programming</div>
<div class="dc-sub">optimizes a linear objective function subject to linear constraints</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Define decision variables</div><div class="dc-step-d">controllable unknowns (e.g., production quantities)</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Formulate objective function</div><div class="dc-step-d">linear expression to maximize (profit) or minimize (cost)</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Specify constraints</div><div class="dc-step-d">linear inequalities/equalities (e.g., resource limits)</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Key Components</h2><span class="dc-hint">decision variables, objective function, constraints</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Decision Variables</b> controllable unknowns <span class="dc-chip">x₁, x₂</span></div><div class="dc-card"><b>Objective Function</b> linear expression to maximize/minimize <span class="dc-chip">profit/cost</span></div><div class="dc-card"><b>Constraints</b> linear inequalities/equalities <span class="dc-chip">resource limits</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Assumptions</h2><span class="dc-hint">proportionality, additivity, divisibility, certainty</span></div>
<div class="dc-cols"><div class="dc-card"><b>Proportionality</b> linear relationship between variables <span class="dc-chip">assumption</span></div><div class="dc-card"><b>Divisibility</b> decision variables can be divided <span class="dc-chip">assumption</span></div></div>
<div class="dc-callout">Proportionality, Additivity, Divisibility, and Certainty are key assumptions in Linear Programming</div>
</div>


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
