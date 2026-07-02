---
title: Feasible Region
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0133
betweenness: 0.0004
eigenvector: 0.0842
degree: 12
community: 3
---

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
