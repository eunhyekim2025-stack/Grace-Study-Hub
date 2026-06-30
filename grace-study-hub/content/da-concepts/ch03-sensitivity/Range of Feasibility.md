---
title: Range of Feasibility
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.3.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0103
betweenness: 0.0004
eigenvector: 0.0547
degree: 10
community: 3
---

# Range of Feasibility

The range over which a **constraint right-hand side (RHS, bᵢ)** can change while the **[[Shadow Price]] stays constant**.

## Characteristics
- If the RHS changes within this range: the shadow price stays the same, and the objective value changes linearly by `shadow price × change in RHS`
- Outside the range: the set of binding constraints changes, so the shadow price changes → recomputation required
- Assumes only one RHS changes at a time
- Excel: current RHS ± **Allowable Increase / Allowable Decrease**

## Example Use
- "If cutting & dyeing time is increased from 630 to 700 hours, how much does profit increase?"
  → if 700 is within the range of feasibility, profit increases by `(700−630) × shadow price`
- Evaluating the economics of expanding a resource

## Multiple RHS Changes
The same **100% rule** applies, as in [[Range of Optimality]].

## Related Notes
- [[Sensitivity Analysis]] · [[Shadow Price]] · [[Range of Optimality]]
- Full map: [[LLM Wiki MOC]]
