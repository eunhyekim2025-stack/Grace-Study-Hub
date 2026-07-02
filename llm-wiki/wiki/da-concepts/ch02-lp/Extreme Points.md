---
title: Extreme Points
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.3)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0108
betweenness: 0.0002
eigenvector: 0.0785
degree: 10
community: 3
---

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
