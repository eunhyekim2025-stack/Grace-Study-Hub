---
title: Range of Feasibility
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.3.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0097
betweenness: 0.0003
eigenvector: 0.0591
degree: 10
community: 4
---

<div class="dc-view">
<div class="dc-title">Range of Feasibility</div>
<div class="dc-sub">Range over which a constraint RHS can change with a constant shadow price</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Change in RHS</div><div class="dc-step-d">within range of feasibility</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Shadow Price</div><div class="dc-step-d">stays constant</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Objective Value</div><div class="dc-step-d">changes linearly</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Characteristics</h2><span class="dc-hint">key properties</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Constant Shadow Price</b> within range <span class="dc-chip">linearity</span></div><div class="dc-card"><b>Linear Change</b> in objective value <span class="dc-chip">shadow price × change in RHS</span></div><div class="dc-card"><b>Single RHS Change</b> at a time <span class="dc-chip">assumption</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Example Use</h2><span class="dc-hint">applications</span></div>
<div class="dc-cols"><div class="dc-card"><b>Evaluating Expansion</b> economics <span class="dc-chip">resource expansion</span></div><div class="dc-card"><b>Profit Increase</b> calculation <span class="dc-chip">shadow price × change in RHS</span></div></div>
<div class="dc-section"><span class="dc-num">3</span><h2>Multiple RHS Changes</h2><span class="dc-hint">100% rule</span></div>
<div class="dc-card"><b>100% Rule</b> applies <span class="dc-chip">Range of Optimality</span></div>
<div class="dc-callout">Shadow price stays constant within the range of feasibility</div>
</div>


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
