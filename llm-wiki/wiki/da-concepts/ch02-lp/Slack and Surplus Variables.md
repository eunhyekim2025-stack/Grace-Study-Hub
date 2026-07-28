---
title: Slack and Surplus Variables
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0112
betweenness: 0.0004
eigenvector: 0.0780
degree: 10
community: 3
---

<div class="dc-view">
<div class="dc-title">Slack and Surplus Variables</div>
<div class="dc-sub">Variables for converting inequality constraints into equalities</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Slack Variable</div><div class="dc-step-d">added to ≤ constraints</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Surplus Variable</div><div class="dc-step-d">subtracted from ≥ constraints</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Constraint Types</h2><span class="dc-hint">Slack and Surplus meanings</span></div>
<div class="dc-cols-2"><div class="dc-card"><b>Slack</b> unused resource <span class="dc-chip">≤ constraint</span></div><div class="dc-card"><b>Surplus</b> amount above minimum <span class="dc-chip">≥ constraint</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Binding Status</h2><span class="dc-hint">Slack/Surplus values</span></div>
<div class="dc-cols-2"><div class="dc-card"><b>Binding</b> Slack/Surplus = 0 <span class="dc-chip">fully used resource</span></div><div class="dc-card"><b>Non-binding</b> Slack/Surplus > 0 <span class="dc-chip">slack exists</span></div></div>
<div class="dc-section"><span class="dc-num">3</span><h2>Standard Form</h2><span class="dc-hint">input format for simplex method</span></div>
<div class="dc-card"><b>Standard Form</b> all constraints are equalities and variables are non-negative</div>
<div class="dc-section"><span class="dc-num">4</span><h2>Sensitivity Link</h2><span class="dc-hint">Shadow Price relation</span></div>
<div class="dc-card"><b>Shadow Price</b> non-zero only for binding constraints</div>
<div class="dc-callout">Only binding constraints have a non-zero Shadow Price</div>
</div>


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
