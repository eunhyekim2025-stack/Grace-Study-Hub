---
title: Integer Linear Programming
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.7)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0028
betweenness: 0.0000
eigenvector: 0.0656
degree: 7
community: 3
---

# Integer Linear Programming (ILP)

An LP in which some or all variables must be **integers**. Used for indivisible decisions (counts, yes/no).

## Types (7.1)
- **All-integer**: all variables are integers
- **Mixed-integer**: only some variables are integers
- **0-1 (binary)**: variables ∈ {0,1} — yes/no decisions

## LP Relaxation and Bounds (7.2)
- **LP Relaxation**: the LP solved with the integer constraints dropped.
- **Rounding** can become **infeasible** or **suboptimal** — risky.
- The LP relaxation gives a **bound**: in a maximization problem, the LP optimal value ≥ the ILP optimal value (an upper bound).

## 0-1 Variable Applications (7.3)
Capital budgeting · **fixed cost** (cost incurred only when active) · distribution-network design · location (bank location) · product design and market-share optimization.

## 0-1 Modeling Flexibility (7.4)
| Constraint | Expression |
|------|----|
| **Multiple-choice / Mutually exclusive** | Σ xⱼ = 1 / Σ xⱼ ≤ 1 |
| **k out of n** | Σ xⱼ = k |
| **Conditional** | xᵢ ≤ xⱼ (i possible only if j) |
| **Corequisite** | xᵢ = xⱼ |
- Note: [[Sensitivity Analysis]] interpretation in ILP is not as straightforward as in LP.

## Related notes
- Foundations: [[Linear Programming]] · [[LP Special Cases]] · Applications: [[Production Scheduling]]
- Full map: [[LLM Wiki MOC]]
