---
title: LP Special Cases
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.5)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0081
betweenness: 0.0001
eigenvector: 0.0846
degree: 10
community: 3
---

<div class="dc-view">
<div class="dc-title">LP Special Cases</div>
<div class="dc-sub">Four exceptional situations in Linear Programming</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Alternative Optimal Solutions</div><div class="dc-step-d">objective function slope = constraint line slope</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Infeasibility</div><div class="dc-step-d">no point satisfies all constraints</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Unbounded</div><div class="dc-step-d">objective function can be improved without limit</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Redundant Constraint</div><div class="dc-step-d">no effect on the feasible region</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Practical Implications</h2><span class="dc-hint">handling special cases</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Infeasibility</b> constraints too tight <span class="dc-chip">relax constraints</span></div><div class="dc-card"><b>Unbounded</b> formulation error <span class="dc-chip">add missing constraint</span></div><div class="dc-card"><b>Alternative Optima</b> choose by secondary criterion <span class="dc-chip">multiple solutions</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Related Concepts</h2><span class="dc-hint">further study</span></div>
<div class="dc-cols"><div class="dc-card"><b>Feasible Region</b> set of all possible solutions <span class="dc-chip">[[Feasible Region]]</span></div><div class="dc-card"><b>Linear Programming</b> optimization technique <span class="dc-chip">[[Linear Programming]]</span></div></div>
<div class="dc-callout">Identify and handle special cases to ensure valid Linear Programming solutions</div>
</div>


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
