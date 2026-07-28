---
title: Extreme Points
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.3)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0107
betweenness: 0.0002
eigenvector: 0.0785
degree: 10
community: 3
---

<div class="dc-view">
<div class="dc-title">Extreme Points</div>
<div class="dc-sub">Optimal solutions in Linear Programming occur at corner points of the Feasible Region</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Identify Extreme Points</div><div class="dc-step-d">corner points of the Feasible Region</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Check for Optimality</div><div class="dc-step-d">evaluate the objective function at each extreme point</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Extreme Point Theorem</h2><span class="dc-hint">basis of the simplex method</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Optimal Solution</b> occurs at an extreme point <span class="dc-chip">Extreme Point Theorem</span></div><div class="dc-card"><b>Finite Set</b> of extreme points to check <span class="dc-chip">reduces search space</span></div><div class="dc-card"><b>Vertex-Enumeration</b> problem <span class="dc-chip">theoretical basis of simplex method</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Meaning</h2><span class="dc-hint">characteristics of extreme points</span></div>
<div class="dc-cols"><div class="dc-card"><b>Intersection</b> of constraint lines <span class="dc-chip">definition of extreme point</span></div><div class="dc-card"><b>Optimal Solution</b> last point touched by the objective function <span class="dc-chip">Graphical Solution Method</span></div></div>
<div class="dc-callout">Optimal solutions in LP occur at extreme points of the Feasible Region</div>
</div>


# Extreme Points

The **vertices** of the [[Feasible Region]] — corner points that no longer lie on the line segment between two other points in the region.

## Extreme Point Theorem
> If an LP has an optimal solution, then an optimal solution occurs at at least one **extreme point**.

- Therefore, out of infinitely many feasible points, only the **finite set of extreme points** needs to be checked → the theoretical basis of the simplex method
- It reduces the search for the optimum to a vertex-enumeration problem

## Meaning
- Each extreme point is an intersection of constraint lines
- The extreme point the objective function last touches as it shifts in parallel is the optimal solution ([[Graphical Solution Method]])
- Alternative optimal solutions occur along the entire **edge** joining two adjacent extreme points ([[LP Special Cases]])

## Related Notes
- [[Feasible Region]] · [[Graphical Solution Method]] · [[LP Special Cases]]
- Full map: [[LLM Wiki MOC]]
