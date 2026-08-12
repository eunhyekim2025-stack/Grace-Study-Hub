---
title: "Module 5 — Cost Behaviour & Estimation (Relevant Range · High-Low)"
tags: [management-accounting, module-5, cost-behaviour, relevant-range, high-low-method]
sources: ["Managerial Accounting: Comprehensive Study Guide (Modules 1–12)"]
updated: 2026-08-12
---

<div class="dc-view">
<div><div class="dc-title">Module 5 · Cost Behaviour &amp; Estimation</div><div class="dc-sub">From "where did the cost come from" to "how does it move when volume moves"</div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Four cost patterns</h2><span class="dc-hint">in total, not per unit</span></div>
<div class="dc-cols-4">
<div class="dc-card"><div class="dc-eyebrow">Variable</div>Moves in <b>direct proportion</b> to activity <span class="dc-chip">aluminium for cans</span></div>
<div class="dc-card"><div class="dc-eyebrow">Fixed</div>Constant <b>regardless of activity</b> <span class="dc-chip">factory rent</span></div>
<div class="dc-card"><div class="dc-eyebrow">Mixed</div>A flat fee <b>plus</b> usage <span class="dc-chip">phone plan</span></div>
<div class="dc-card"><div class="dc-eyebrow">Step-Fixed</div><b>Jumps</b> at a threshold <span class="dc-chip">one supervisor per 50 students</span></div>
</div>
<div class="dc-section"><span class="dc-num">2</span><h2>The relevant range</h2><span class="dc-hint">trust the line only inside this band</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Why it exists</div>Real cost curves are <b>bendy</b> and impossible to compute with. So we carve out the band we actually operate in and <b>assume linearity there</b> <span class="dc-chip">e.g. 1m–1.5m units</span></div>
<div class="dc-card"><div class="dc-eyebrow">The catch</div>Plug in a volume <b>outside</b> the range and the prediction is wrong. "What if we make 3 million?" is not a question this line can answer — at that point you need a second factory.</div>
</div>
<div class="dc-section"><span class="dc-num">3</span><h2>The high-low method</h2><span class="dc-hint">Y = mX + b</span></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Pick two points</div><div class="dc-step-d">highest and lowest activity (X)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Slope m</div><div class="dc-step-d">cost difference ÷ activity difference</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Intercept b</div><div class="dc-step-d">total cost − (m × activity)</div></div>
</div>
<div class="dc-callout warn">🚨 The most-failed step — select the points by <b>highest and lowest activity (X)</b>, never by highest and lowest cost.</div>
</div>

# Module 5 — Cost Behaviour & Estimation

> [[management-accounting/index|← Management Accounting]] · Previous: [[m04-activity-based-costing|Module 4]] · Next: [[m06-cvp-analysis|Module 6 — CVP Analysis]]

The perspective shifts here. Modules 1–4 asked **"where did this cost come from?"**
From now on the question is **"how does cost change when volume changes?"** — the basis of all prediction and planning.

---

## Cost patterns

- **Variable** — moves in direct proportion to activity. Example: aluminium for cans
- **Fixed** — constant regardless of activity. Example: factory rent
- **Mixed** — contains both fixed and variable elements. Example: a phone plan with a flat fee plus data charges
- **Step-Fixed** — jumps at thresholds. Example: hiring a new supervisor for every 50 students

> [!important] Total and per-unit move in opposite directions
> Rent of £1,000 over 100 units → £10 each. The same £1,000 over 200 units → £5 each.
> **Fixed cost is fixed in total and variable per unit. Variable cost is the reverse** — variable in total,
> fixed per unit. This inversion is a perennial exam item, and it is the mechanism behind the
> [[m07-variable-vs-absorption-costing|Module 7 overproduction trap]].

---

## The relevant range

Cost behaviour is analysed within the **relevant range** — the range of activity (e.g. 1 million to
1.5 million units) where the assumption that costs are linear holds true. Predictions outside that band
are not reliable.

---

## The linear equation and the high-low method

$$Y = mX + b$$

| Symbol | Meaning |
|---|---|
| $Y$ | Total cost (what you are solving for) |
| $m$ | Variable cost per unit (the slope) |
| $X$ | Activity level |
| $b$ | Total fixed cost (the intercept) |

> [!warning] Execution warning
> When using the high-low method, always select the data points based on the
> **highest and lowest activity (X)**, *not* the highest and lowest cost.
> The two usually coincide, which is exactly why people get caught out when they do not.

**Step 1 — variable rate $m$**

$$m = \frac{\text{Cost at highest activity} - \text{Cost at lowest activity}}{\text{High Activity} - \text{Low Activity}}$$

**Step 2 — fixed cost $b$**

$$b = \text{Total Cost} - (m \times \text{Activity})$$

Either point should give the same $b$ — use that as a **built-in check**.

### Worked example

| Month | Machine hours (X) | Total electricity (Y) |
|---|---:|---:|
| January | 1,200 | £1,180 |
| **February ← low** | **800** | **£900** |
| March | 1,500 | £1,390 |
| **April ← high** | **1,800** | **£1,600** |

- $m = (1{,}600 - 900) \div (1{,}800 - 800) = 700 \div 1{,}000 =$ **£0.70 per machine hour**
- $b = 1{,}600 - (0.70 \times 1{,}800) =$ **£340**
- Check: $900 - (0.70 \times 800) =$ £340 ✓
- Cost equation: $Y = 0.70X + 340$ → 1,400 hours in May predicts **£1,320**

*(These figures are illustrative, added to show the procedure. The source guide states the formulas only.)*

---

## Related notes

- [[m06-cvp-analysis|Module 6 — CVP Analysis]] — consumes the variable/fixed split produced here
- [[cheatsheet-formulas|Formula Cheat Sheet & Glossary]]
