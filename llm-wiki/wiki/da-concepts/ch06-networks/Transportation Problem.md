---
title: Transportation Problem
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.6.1)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0098
betweenness: 0.0007
eigenvector: 0.0819
degree: 12
community: 3
---

# Transportation Problem

A network [[Linear Programming]] that **minimizes total shipping cost** when moving goods from multiple **origins** to multiple **destinations**. (Ch.6 Distribution and Network Models)

## Model Structure
- **Decision variables**: `xᵢⱼ` = amount shipped from origin i → destination j
- **Objective function**: `Min Σᵢ Σⱼ cᵢⱼ xᵢⱼ` (unit shipping cost × amount shipped)
- **Constraints**:
  - supply constraint: `Σⱼ xᵢⱼ ≤ sᵢ` (at most each origin's supply)
  - demand constraint: `Σᵢ xᵢⱼ ≥ dⱼ` (at least each destination's demand)
  - non-negativity

## Characteristics
- **Balanced problem**: total supply = total demand → all constraints are equalities
- If unbalanced, add a dummy origin/destination
- A **network structure** with 0/1 constraint coefficients → the optimal solution is always integer (integrality)
- A special case of the [[Transshipment Problem]]

## Related Notes
- [[Transshipment Problem]] · [[Assignment Problem]] · [[Linear Programming]]
- Full map: [[LLM Wiki MOC]]
