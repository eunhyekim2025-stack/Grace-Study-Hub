---
title: Slack and Surplus Variables
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0115
betweenness: 0.0004
eigenvector: 0.0621
degree: 10
community: 3
---

# Slack and Surplus Variables

Variables added when converting inequality constraints into **equalities** to produce the standard form.

| Variable | Constraint Type | Meaning | Conversion |
|------|-----------|------|------|
| **Slack** | `≤` | unused resource | `aᵢx + s = bᵢ`, `s ≥ 0` |
| **Surplus** | `≥` | amount above the minimum requirement | `aᵢx − s = bᵢ`, `s ≥ 0` |

## Determining Binding Status
- **Slack/Surplus = 0** → the constraint is **binding**, the resource is fully used up
- **Slack/Surplus > 0** → **non-binding**, slack exists

## Standard Form
A form in which all constraints are equalities and all variables are non-negative. This is the input format for the simplex method.

## Link to Sensitivity
- Only binding constraints have a non-zero **[[Shadow Price]]**
- The shadow price of a non-binding constraint = 0

## Related Notes
- [[Linear Programming]] · [[Feasible Region]] · [[Shadow Price]]
- Full map: [[LLM Wiki MOC]]
