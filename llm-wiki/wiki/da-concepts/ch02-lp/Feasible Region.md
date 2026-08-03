---
title: Feasible Region
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0127
betweenness: 0.0002
eigenvector: 0.0734
degree: 12
community: 4
---

<div class="dc-view">
<div class="dc-title">Feasible Region</div>
<div class="dc-sub">set of points satisfying all constraints and non-negativity constraints</div>
<div class="dc-section"><span class="dc-num">1</span><h2>Definition</h2><span class="dc-hint">search space for solution</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Convex Set</b> line segment joining any two points lies within <span class="dc-chip">LP property</span></div><div class="dc-card"><b>Intersection</b> of half-planes formed by constraints <span class="dc-chip">geometric interpretation</span></div><div class="dc-card"><b>Bounded/Unbounded</b> depends on constraints <span class="dc-chip">feasible region type</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Boundaries</h2><span class="dc-hint">binding and non-binding constraints</span></div>
<div class="dc-cols"><div class="dc-card"><b>Binding Constraint</b> optimal solution on constraint line <span class="dc-chip">no slack</span></div><div class="dc-card"><b>Non-binding Constraint</b> slack exists <span class="dc-chip">unused resource</span></div></div>
<div class="dc-section"><span class="dc-num">3</span><h2>Special Cases</h2><span class="dc-hint">infeasible or unbounded regions</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Infeasible</b> no solution exists <span class="dc-chip">empty feasible region</span></div><div class="dc-card"><b>Unbounded</b> unlimited improvement possible <span class="dc-chip">unbounded region</span></div><div class="dc-card"><b>Extreme Points</b> vertices of feasible region <span class="dc-chip">optimal solutions</span></div></div>
<div class="dc-callout">feasible region is convex set</div>
</div>


# Feasible Region

The set of points that **simultaneously satisfy** all constraints and the non-negativity constraints. It is the search space for finding a solution in the [[Graphical Solution Method]].

## Properties
- An LP feasible region is always a **convex set** — the line segment joining any two points in the region lies entirely within it
- It is the **intersection** of the half-planes formed by the constraint inequalities
- It may be bounded or unbounded

## Boundaries and Binding
- **Binding constraint**: the optimal solution lies on that constraint line → all of the resource is used ([[Slack and Surplus Variables]] = 0)
- **Non-binding constraint**: slack exists
- The vertices of the feasible region = **[[Extreme Points]]**

## Special Cases
- An empty feasible region → **infeasible** ([[LP Special Cases]])
- Unlimited improvement of the objective over an unbounded region → **unbounded**

## Related Notes
- [[Graphical Solution Method]] · [[Extreme Points]] · [[LP Special Cases]]
- Full map: [[LLM Wiki MOC]]
