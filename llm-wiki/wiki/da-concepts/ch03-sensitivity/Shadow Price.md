---
title: Shadow Price
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.3.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0131
betweenness: 0.0008
eigenvector: 0.0783
degree: 13
community: 3
---

# Shadow Price (Dual Value)

**The amount by which the optimal objective value changes when a constraint's right-hand side (RHS) is increased by one unit.** The marginal value of one unit of a resource.

## Key Rules
- **Binding constraint** → shadow price ≠ 0 (the resource is scarce and therefore valuable)
- **Non-binding constraint** → shadow price = 0 ([[Slack and Surplus Variables]] exist, so more of it has no value)
- For `≤` constraints in a maximization problem: shadow price ≥ 0
- It stays constant only within the **[[Range of Feasibility]]**

## Meaning and Use
- "The maximum amount you would be willing to pay to obtain one more unit of this resource"
- A basis for deciding whether to purchase more of a resource or expand capacity
- **Note**: the shadow price is the *change in the optimal value*, not the variable values of the new solution

## Terminology
- The textbook (14e) also uses the term **dual value**
- The "Shadow Price" column in the Excel Solver sensitivity report

## Related Notes
- [[Sensitivity Analysis]] · [[Range of Feasibility]] · [[Slack and Surplus Variables]] · [[Reduced Cost]]
- Full map: [[LLM Wiki MOC]]
