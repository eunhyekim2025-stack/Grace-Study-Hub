---
title: Reduced Cost
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.3)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0101
betweenness: 0.0000
eigenvector: 0.0510
degree: 9
community: 3
---

# Reduced Cost

For a **decision variable whose value is 0 in the current optimal solution**, the amount by which the objective function worsens if that variable is forced to be produced by one unit.

## Key Rules
- At the optimum, `xⱼ > 0` (in production) → reduced cost = 0
- At the optimum, `xⱼ = 0` (not produced) → reduced cost ≠ 0
  - For that product to be adopted, its unit profit must improve by |reduced cost|
- Another interpretation: the variable enters the solution only once its objective coefficient reaches the boundary of the **[[Range of Optimality]]**

## Intuition
- "Why isn't this product made?" → because its profitability falls short by the reduced cost per unit
- Forcing one unit of a non-produced variable into the solution costs exactly that much

## Distinction from Shadow Price
| | Applies To | Meaning |
|---|------|------|
| **[[Reduced Cost]]** | decision variable | cost of bringing the variable into the solution |
| **[[Shadow Price]]** | constraint (resource) | value of one unit of the resource |

## Related Notes
- [[Sensitivity Analysis]] · [[Range of Optimality]] · [[Shadow Price]]
- Full map: [[LLM Wiki MOC]]
