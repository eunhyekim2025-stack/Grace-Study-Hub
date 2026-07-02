---
title: Sensitivity Analysis
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.3)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0200
betweenness: 0.0027
eigenvector: 0.1230
degree: 20
community: 3
---

# Sensitivity Analysis

The analysis of **how the optimal solution changes when the coefficients** of an LP model change. Also called "what-if" analysis. Performed after the optimal solution is found (post-optimality).

## Why It Matters
- Model coefficients (profits, resource amounts, etc.) are **estimates** and therefore uncertain
- Knowing how far a coefficient can change before the conclusion (the optimal production plan) no longer holds makes the decision more robust

## Two Types of Change
| What Changes | Analysis Tool |
|-----------|-----------|
| **Objective function coefficient (cⱼ)** | [[Range of Optimality]] — the coefficient range over which the optimal basis (vertex) is preserved |
| **Constraint right-hand side (bᵢ, RHS)** | [[Range of Feasibility]] + [[Shadow Price]] — the value of a one-unit change in a resource |

## Key Outputs (Excel Solver Sensitivity Report)
- **[[Shadow Price]]** (dual value)
- **[[Reduced Cost]]**
- **Allowable Increase / Decrease** → the basis for computing the ranges
- **[[Range of Optimality]]**, **[[Range of Feasibility]]**

## Related Notes
- [[Linear Programming]] · [[Shadow Price]] · [[Reduced Cost]] · [[Range of Optimality]] · [[Range of Feasibility]]
- Full map: [[LLM Wiki MOC]]
