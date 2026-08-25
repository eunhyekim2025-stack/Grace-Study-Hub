---
title: "Module 5 — Cost Behaviour & Estimation (Relevant Range · High-Low · Scattergraph · Regression)"
tags: [management-accounting, module-5, cost-behaviour, relevant-range, high-low-method, scattergraph, regression, activity-base]
sources: ["Managerial Accounting: Comprehensive Study Guide (Modules 1–12)", "SMU ACCT102 (BT) Week 2 & 3 — Cost behaviour"]
updated: 2026-08-25
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
<div class="dc-callout">Behaviour is always measured <b>against an activity base (cost driver)</b> — units produced, machine hours, miles driven, labour hours. "Variable" is meaningless until you say <i>variable with respect to what</i>.</div>
<div class="dc-section"><span class="dc-num">2</span><h2>The relevant range</h2><span class="dc-hint">trust the line only inside this band</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Why it exists</div>Real cost curves are <b>bendy</b> (the economist's <b>curvilinear</b> cost function) and impossible to compute with. So we carve out the band we actually operate in and <b>assume linearity there</b> <span class="dc-chip">e.g. 1m–1.5m units</span></div>
<div class="dc-card"><div class="dc-eyebrow">The catch</div>Plug in a volume <b>outside</b> the range and the prediction is wrong. "What if we make 3 million?" is not a question this line can answer — at that point you need a second factory.</div>
</div>
<div class="dc-section"><span class="dc-num">3</span><h2>Three ways to split a mixed cost</h2><span class="dc-hint">same data, different accuracy</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">Scattergraph</div>Plot everything, <b>eyeball</b> the line <span class="dc-chip">judgement</span></div>
<div class="dc-card"><div class="dc-eyebrow">High-Low</div>Only <b>2 points</b>, chosen by activity <span class="dc-chip">exam favourite</span></div>
<div class="dc-card"><div class="dc-eyebrow">Least-Squares Regression</div>Uses <b>all</b> points, minimises squared error <span class="dc-chip">most accurate</span></div>
</div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Pick two points</div><div class="dc-step-d">highest and lowest activity (X)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Slope b</div><div class="dc-step-d">cost difference ÷ activity difference</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Intercept a</div><div class="dc-step-d">total cost − (b × activity)</div></div>
</div>
<div class="dc-callout warn">🚨 The most-failed step — select the points by <b>highest and lowest activity (X)</b>, never by highest and lowest cost.</div>
</div>

# Module 5 — Cost Behaviour & Estimation

> [[management-accounting/index|← Management Accounting]] · Previous: [[m04-activity-based-costing|Module 4]] · Next: [[m06-cvp-analysis|Module 6 — CVP Analysis]]

The perspective shifts here. Modules 1–4 asked **"where did this cost come from?"**
From now on the question is **"how does cost change when volume changes?"** — the basis of all prediction and planning.

---

## Cost patterns

- **Variable** — moves in direct proportion to activity. Example: aluminium for cans, raw materials
- **Fixed** — constant regardless of activity. Example: factory rent, property tax
- **Mixed** — contains both fixed and variable elements. Example: utilities, a phone plan with a flat fee plus data charges
- **Step-Fixed** — jumps at thresholds. Example: hiring a new supervisor for every 50 students

> [!important] Total and per-unit move in opposite directions
> Rent of £1,000 over 100 units → £10 each. The same £1,000 over 200 units → £5 each.
> **Fixed cost is fixed in total and variable per unit. Variable cost is the reverse** — variable in total,
> fixed per unit. This inversion is a perennial exam item, and it is the mechanism behind the
> [[m07-variable-vs-absorption-costing|Module 7 overproduction trap]].

| | Variable cost | Fixed cost |
|---|---|---|
| **In total** | Moves in proportion to the activity level | Not affected by the activity level |
| **Per unit** | Stays constant | Falls as activity rises, rises as activity falls |

---

## The activity base (cost driver)

Cost behaviour is never absolute — it is behaviour **with respect to a chosen activity base**: the measure
of whatever causes a variable cost to be incurred.

> **Common activity bases:** units produced · machine hours · miles driven · labour hours

The same cost can be classified differently depending on the base. Store lighting is fixed with respect to
*ice-cream cones sold*, but the driver chosen in [[m04-activity-based-costing|Module 4]] to allocate overhead
is exactly this idea applied to indirect costs. Always ask **"variable with respect to what?"** before
answering a classification question.

---

## Committed vs discretionary fixed costs

Not every fixed cost is equally stuck. The test is one question: **"can I stop this fixed cost in the short term?"**

| | Committed | Discretionary |
|---|---|---|
| **Horizon** | Long-term; cannot be significantly reduced in the short term | May be altered in the short term by current managerial decisions |
| **Examples** | Property tax, depreciation of the building, a property lease | Advertising, CSR programmes, staff training, R&D |

This matters for [[m06-cvp-analysis|CVP]] and [[m08-budgeting|budgeting]]: when profit is under pressure,
discretionary fixed costs are the only ones management can actually cut this period — which is precisely why
cutting them is so often a short-term fix bought with long-term damage.

---

## The relevant range

Cost behaviour is analysed within the **relevant range** — the range of activity where the linearity
assumption holds true. Predictions outside that band are not reliable. The range means something slightly
different for each pattern:

**For variable cost — the linearity assumption.**
The economist's cost function is **curvilinear**: bulk discounts, learning effects and overtime premiums
all bend the line. The accountant substitutes a **straight-line approximation with a constant unit variable
cost**, and that straight line closely tracks the curve *within the relevant range only*.

**For fixed cost — the flat stretch of the graph.**
The relevant range of a fixed cost is the range of activity over which the graph of the cost is **flat**.
Suppose storage space rents at **\$30,000 per year in increments of 1,000 square feet**:

| Rented area | Annual rent |
|---|---:|
| 0 – 1,000 sq ft | \$30,000 |
| **1,001 – 2,000 sq ft** | **\$60,000** ← relevant range if this is where you operate |
| 2,001 – 3,000 sq ft | \$90,000 |

Rent is "fixed" only while you stay inside one step. Cross the boundary and the fixed cost itself resets.

---

## True variable vs step-variable cost

A **step-variable cost** arises when a resource can only be obtained **in chunks** — you cannot hire
0.3 of a maintenance worker. It changes only in response to **fairly wide** changes in activity.

| | True variable | Step-variable |
|---|---|---|
| **Example** | Direct materials | Workers, maintenance labour |
| **Graph** | A smooth straight line from the origin | A staircase |
| **Divisibility** | Buy exactly what you need | Only whole chunks |

> [!warning] Step-variable vs fixed-outside-the-relevant-range
> Both graphs are staircases, so the exam likes to confuse them. Two distinctions separate them:
> 1. **How quickly can the cost be adjusted?** A step-variable cost can be adjusted quickly as conditions
>    change; a fixed cost cannot be changed easily.
> 2. **How "chunky" is the cost?** The steps for fixed costs are **wider** than those of step-variable costs.
>
> The mental image: **a part-time worker (step-variable) vs a property lease (fixed)**.

---

## The mixed cost equation

A mixed cost contains both a variable and a fixed element, and its total cost line is written:

$$Y = a + bX$$

| Symbol | Meaning |
|---|---|
| $Y$ | Total mixed cost — the **dependent variable** (what you are solving for) |
| $a$ | Total fixed cost — the **vertical intercept** of the line |
| $b$ | Variable cost per unit of activity — the **slope** |
| $X$ | Level of activity — the **independent variable** |

> [!note] Two notations, one equation
> The study guide writes it as $Y = mX + b$ (slope $m$, intercept $b$); the ACCT102 slides write it as
> $Y = a + bX$ (intercept $a$, slope $b$). **The letter $b$ means opposite things in the two.**
> Use the course's own form — $Y = a + bX$ — and read $a$ as *fixed*, $b$ as *variable per unit*.

**Quick check.** A fixed monthly utility charge of \$40, a variable cost of \$0.03 per kilowatt hour and a
monthly activity of 2,000 kWh gives $Y = 40 + 0.03(2{,}000) =$ **\$100**.

---

## Splitting a mixed cost: one dataset, three methods

All three methods answer the same question — *how much of this mixed cost is fixed, and how much varies?* —
and all three give **different answers**, because each uses a different amount of the data. The course
dataset below runs through all three.

| Month | Hours of maintenance (X) | Total maintenance cost (Y) |
|---|---:|---:|
| January | 625 | \$7,950 |
| **February ← low** | **450** | **\$7,400** |
| March | 700 | \$8,275 |
| April | 550 | \$7,625 |
| May | 775 | \$9,100 |
| **June ← high** | **850** | **\$9,800** |

### 1 · Scattergraph plot

The scattergraph comes **first**, and its real job is diagnosis: it tells you whether a linear relationship
exists at all before you compute anything.

1. **Plot the data points** — total cost $Y$ (dependent) on the vertical axis against activity $X$
   (independent) on the horizontal axis
2. **Observe a pattern** — is it linear? Are there outliers to exclude?
3. **Draw a line that best estimates the pattern** — a good estimate leaves a *similar number of points
   above and below* the line
4. **Use the Y-intercept and one point** to estimate the cost equation

Reading the fitted line off the graph gives an intercept of **\$4,250** and, through the April point
(550 hours, \$7,625):

$$b = \frac{7{,}625 - 4{,}250}{550} = 6.14 \quad\Rightarrow\quad Y = 4{,}250 + 6.14X$$

It is judgement-based — two people drawing the line by eye get two different answers. That is the price of
using your eyes instead of a formula, and the reason it is a *diagnostic* rather than a final estimate.

### 2 · High-low method

Uses only **two** data points, so it is fast — and fragile, since either point could be an outlier.

> [!warning] Execution warning
> Always select the data points based on the **highest and lowest activity (X)**, *not* the highest and
> lowest cost. The two usually coincide, which is exactly why people get caught out when they do not.

**Step 1 — select high and low by activity.** June (850 hrs, \$9,800) is high; February (450 hrs, \$7,400) is low.

**Step 2 — write both as mixed cost equations.**

$$7{,}400 = FC + VC \times 450 \qquad 9{,}800 = FC + VC \times 850$$

**Step 3 — solve simultaneously.** Subtracting eliminates $FC$:

$$b = \frac{9{,}800 - 7{,}400}{850 - 450} = \frac{2{,}400}{400} = 6.00 \text{ (\$6.00 per hour)}$$
$$a = 9{,}800 - (6.00 \times 850) = 4{,}700 \text{ (\$4,700 fixed)}$$

**Step 4 — form the cost equation.**

$$Y = 4{,}700 + 6.00X$$

Either point should give the same $a$ — use that as a **built-in check**:
$7{,}400 - (6.00 \times 450) = 4{,}700$ ✓

### 3 · Least-squares regression

Used when the scattergraph reveals an approximately linear relationship. It fits the straight line that
**minimises the sum of the squared errors**, using **all** the data points — in practice, via Excel.

$$Y = 4{,}395.67 + 6.02X$$

- Slope $b = 6.02$ — estimated variable maintenance cost of **\$6.02 per hour**
- Intercept $a = 4{,}395.67$ — estimated fixed monthly maintenance cost of **\$4,395.67**
- **$R^2 \approx 0.92$** — the *goodness of fit*: 92% of the variation in maintenance cost is explained by
  the variation in maintenance hours. Close to 1 is good.

> [!tip] Exam scope
> **ACCT102 does not test computation using the regression method.** Know what it does, why it is more
> accurate, and how to read $R^2$ — but the calculation you must be able to perform by hand is **high-low**.

### Comparing the three

| Method | Data points used | Result | Fixed cost estimate |
|---|---|---|---:|
| Scattergraph | All, by eye | $Y = 4{,}250 + 6.14X$ | \$4,250 |
| High-low | 2 | $Y = 4{,}700 + 6.00X$ | \$4,700 |
| Least-squares regression | All, by formula | $Y = 4{,}395.67 + 6.02X$ | \$4,395.67 |

The three disagree, and that is **expected** — each uses a differing amount of the data. Least-squares
regression provides the **most accurate** estimate because it uses all the data points.

---

## Self-check

1. Which of these is variable with respect to the number of ice cream cones sold at a Baskin & Robbins —
   the cost of lighting the store, the wages of the store manager, the cost of tables, or the cost of napkins
   for customers?
2. Sales salaries and commissions are \$10,000 when 80,000 units are sold and \$14,000 when 120,000 units are
   sold. Using the high-low method, what is the **fixed** portion?

> [!success]- Answers
> 1. **Napkins.** The other three do not move with cones sold — lighting and the manager's wage are fixed,
>    and tables are a one-off capital cost. Napkins are consumed per cone.
> 2. **\$2,000.** $b = (14{,}000 - 10{,}000) \div (120{,}000 - 80{,}000) = 0.10$ → \$0.10 per unit;
>    $a = 10{,}000 - (0.10 \times 80{,}000) = 2{,}000$ → **\$2,000**.

---

## Related notes

- [[m04-activity-based-costing|Module 4 — Activity-Based Costing]] — the activity base idea applied to overhead allocation
- [[m06-cvp-analysis|Module 6 — CVP Analysis]] — consumes the variable/fixed split produced here
- [[m08-budgeting|Module 8 — Budgeting]] — where committed vs discretionary fixed costs bite
- [[cheatsheet-formulas|Formula Cheat Sheet & Glossary]]
