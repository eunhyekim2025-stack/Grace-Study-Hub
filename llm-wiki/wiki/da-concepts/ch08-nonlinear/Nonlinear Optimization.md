---
title: Nonlinear Optimization
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.8)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0032
betweenness: 0.0000
eigenvector: 0.0790
degree: 7
community: 3
---

# Nonlinear Optimization Models

Optimization where the objective function or constraints are **nonlinear**. Handles curved relationships (diminishing returns, variance, etc.).

## Key Concepts (8.1)
- **Unconstrained** vs **constrained** problems.
- **Local optimum** vs **global optimum**: nonlinear problems can have multiple local solutions, so unlike LP there is no guarantee that "vertex = global optimum".
  - If the objective is **convex (minimization) / concave (maximization)**, then the local optimum = the global optimum.
- **Dual Values**: even in the nonlinear case, the value of relaxing a constraint by one unit → the [[Shadow Price]] idea.

## Applications (8.2–8.5)
| Section | Content |
|----|------|
| 8.2 Index Fund | Constructing an index-tracking portfolio |
| 8.3 **Markowitz Portfolio** | **Minimize variance (risk)** subject to a target return — nonlinear because variance is quadratic |
| 8.4 Pooling | Nonlinear blending in mixing processes |
| 8.5 New-product diffusion forecasting | Fitting a Bass-type nonlinear growth curve |

## Related notes
- Versus linear: [[Linear Programming]] · LP portfolio version: [[Portfolio Selection]] · Dual: [[Shadow Price]]
- Full map: [[LLM Wiki MOC]]
