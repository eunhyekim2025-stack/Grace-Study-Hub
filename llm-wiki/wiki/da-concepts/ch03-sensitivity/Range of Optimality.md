---
title: Range of Optimality
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.3.1)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0102
betweenness: 0.0005
eigenvector: 0.0538
degree: 10
community: 3
---

# Range of Optimality

The range over which an **objective function coefficient (cⱼ)** can change while the **current optimal solution (extreme point) remains unchanged**.

## Characteristics
- Assumes **only one** objective coefficient changes at a time
- If a coefficient changes within this range: **the optimal decision variable values stay the same**, though the objective function *value* may change
- Outside the range → a different extreme point becomes optimal (the solution changes)
- Excel: current coefficient ± **Allowable Increase / Allowable Decrease**

## Multiple Coefficient Changes → 100% Rule
When several objective coefficients change at once:
> Express each change as a percentage of its allowable range; if the **sum is at most 100%**, the current solution remains optimal.
- Above 100%, optimality is not guaranteed (recomputation required)
- ([[Range of Feasibility]] applies the same 100% rule to RHS changes)

## Related Notes
- [[Sensitivity Analysis]] · [[Reduced Cost]] · [[Range of Feasibility]]
- Full map: [[LLM Wiki MOC]]
