---
title: LP Special Cases
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.5)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0082
betweenness: 0.0001
eigenvector: 0.0846
degree: 10
community: 3
---

# LP Special Cases

Four exceptional situations in which a unique optimal solution does not result.

| Case | Description | Graphical Feature |
|------|------|-------------|
| **Alternative Optimal Solutions** | objective function slope = the slope of some constraint line | the objective function coincides with an entire **edge** → every point between the two extreme points is optimal |
| **Infeasibility** | no point satisfies all constraints simultaneously | the [[Feasible Region]] is the empty set |
| **Unbounded** | the objective function can be improved without limit | the feasible region is unbounded and open in the direction of improvement |
| **Redundant Constraint** | already implied by other constraints, with no effect on the region | does not change the shape of the feasible region |

## Practical Implications
- **Infeasibility**: constraints are too tight → need to add resources or relax constraints
- **Unbounded**: usually a sign of a formulation error (a missing constraint)
- **Alternative optima**: several alternatives with the same objective value → can choose by a secondary criterion

## Related Notes
- [[Feasible Region]] · [[Extreme Points]] · [[Linear Programming]]
- Full map: [[LLM Wiki MOC]]
