---
title: "Modules 9–12 — Advanced Performance Management"
tags: [management-accounting, module-9, module-10, module-11, module-12, variance-analysis, flexible-budget, standard-costs, price-quantity-variance, fixed-overhead-variance, responsibility-accounting, segment-reporting]
sources: ["Managerial Accounting: Comprehensive Study Guide (Modules 1–12)", "SMU ACCT102 (BT) Week 11 — Flexible Budget (adapted from McGraw-Hill)", "SMU ACCT102 (BT) Week 11 — Standard Costs and Variances (adapted from McGraw-Hill); worked figures from the deck's Glacier Peak / Hanson examples"]
updated: 2026-10-29
relations:
  part-of: [management-accounting/index]
pagerank: 0.0044
betweenness: 0.0000
eigenvector: 0.0091
degree: 9
community: 1
---

<div class="dc-view">
<div><div class="dc-title">Modules 9–12 · Performance Management</div><div class="dc-sub">The plan exists — now find out whether it happened</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Variance Analysis</div><div class="dc-step-d">budget vs actual — why the gap?</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Responsibility Accounting</div><div class="dc-step-d">whose gap is it?</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Segment Reporting</div><div class="dc-step-d">performance seen segment by segment</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>Variance analysis</h2><span class="dc-hint">split the gap by cause</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Price variance</div>Did we <b>pay more per unit</b> than planned? Usually owned by <b>purchasing</b></div>
<div class="dc-card"><div class="dc-eyebrow">Quantity / efficiency variance</div>Did we <b>use more</b> than planned — waste, scrap? Usually owned by <b>production</b></div>
</div>
<div class="dc-callout">"Materials came in £5,000 over budget" is not actionable on its own. Only once you split <b>price</b> from <b>quantity</b> do you know which department owns it and what to do about it.</div>
<div class="dc-section"><span class="dc-num">2</span><h2>Responsibility accounting</h2><span class="dc-hint">the controllability principle</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">The rule</div>A manager should be evaluated only on items <b>within their control</b></div>
<div class="dc-card"><div class="dc-eyebrow">Why it matters</div>Charging a store manager for the CEO's salary is unfair — and destroys the measure's value as an incentive</div>
</div>
<div class="dc-callout warn">Connects back to <b>Module 7</b> — evaluate managers on absorption income and you hand them an incentive to <b>overproduce</b>. Internal evaluation therefore uses variable costing income.</div>
</div>

# Modules 9–12 — Advanced Performance Management

> [[management-accounting/index|← Management Accounting]] · Previous: [[m08-budgeting|Module 8 — Budgeting]]

---

## Variance Analysis

Compare the budgets built in [[m08-budgeting|Module 8]] against **actual results**, then work out **why** they differ. Two nested breakdowns do this: first flex the budget to the actual activity level, then split each spending gap into **price** and **quantity**.

### Step 1 — flex the budget (compare apples with apples)

A **static planning budget** is built for a *single* planned activity level. If actual activity differs, comparing actual costs to it is misleading — "apples vs oranges." *(Budget 100 units / $5,000 expense vs actual 120 units / $7,000 — is the manager overspending, or just busier?)*

A **flexible budget** restates the budget at the **actual** activity level — showing what costs *should have been* for that activity (variable costs flex in proportion; fixed costs stay constant within the [[m05-cost-behaviour-estimation|relevant range]]). Laying the three columns side by side splits the total gap:

$$\underbrace{\text{Static planning budget}}_{}\ \xrightarrow{\textbf{Activity variance}}\ \underbrace{\text{Flexible budget}}_{\text{same activity as actual}}\ \xrightarrow{\textbf{Revenue \& spending variances}}\ \underbrace{\text{Actual results}}_{}$$

| Variance | Compares | Caused by |
|---|---|---|
| **Activity variance** | Flexible budget − Static planning budget | the activity level differing from plan (not cost control) |
| **Revenue variance** *(revenue price variance)* | Actual revenue − Flexible-budget revenue | selling price ≠ planned |
| **Spending variance** | Actual cost − Flexible-budget cost | input prices/usage ≠ planned |

> [!tip] Label every variance **F** or **U**
> **Favourable (F)**: actual revenue > budget, or actual cost < budget. **Unfavourable (U)**: the reverse. A favourable *cost* variance is not automatically "good news" — flex first, then judge.

### Step 2 — standard costs and the standard cost card

A **standard** is a benchmark: a **quantity standard** (how much input *should* be used) and a **price standard** (how much *should* be paid per unit of input). Together, for one unit of output, they give the **standard cost card**:

| Input | Standard Qty (A) | Standard Price (B) | Standard cost (A×B) |
|---|---|---|---|
| Direct materials | 3.0 lbs | $4.00 / lb | $12.00 |
| Direct labour | 2.5 hrs | $14.00 / hr | $35.00 |
| Variable mfg. overhead | 2.5 hrs | $3.00 / hr | $7.50 |
| **Total standard unit cost** | | | **$54.50** |

### Step 3 — the general variance model (split spending into price × quantity)

Four quantities, evaluated **at the actual output**:

- **AQ** actual quantity of input used · **AP** actual price paid
- **SQ** standard quantity *allowed for the actual output* · **SP** standard price

$$\boxed{\text{Price variance} = AQ(AP - SP)} \qquad \boxed{\text{Quantity variance} = SP(AQ - SQ)}$$

Read as a three-row ladder — the gaps between the rungs are the variances:

| Row | Value | Gap |
|---|---|---|
| AQ × AP | actual cost | ↕ **Price variance** = AQ(AP − SP) |
| AQ × SP | | ↕ **Quantity variance** = SP(AQ − SQ) |
| SQ × SP | standard cost allowed | |

The same model, renamed by input:

| Input | "Price" side | "Quantity" side |
|---|---|---|
| Direct materials | **Materials price variance** | **Materials quantity variance** |
| Direct labour | **Labour rate variance** | **Labour efficiency variance** |
| Variable MOH | VMOH rate variance | VMOH efficiency variance *(calc not examinable)* |

> [!example] Glacier Peak Outfitters — materials & labour
> **Materials:** standard 0.1 kg/parka @ $5; actual 210 kg @ $4.90 to make 2,000 parkas → SQ = 0.1×2,000 = 200 kg.
> Price = 210($4.90−$5) = **$21 F**; Quantity = $5(210−200) = **$50 U**; total **$29 U**.
>
> **Labour:** standard 1.2 hr/parka @ $10; actual 2,500 hr costing $26,250 (⇒ AP = $10.50) for 2,000 parkas → SQ = 1.2×2,000 = 2,400 hr.
> Rate = 2,500($10.50−$10) = **$1,250 U**; Efficiency = $10(2,500−2,400) = **$1,000 U**; total **$2,250 U**.

### Who owns it, and when it is isolated

- **Materials price variance → purchasing manager**; **materials quantity variance → production manager**. The **standard** price is used in the quantity variance *on purpose*, so production is not blamed for purchasing's price result.
- **Labour variances → production managers** (they control skill mix, motivation, supervision, training).
- Variances are **not fully controllable by one person** — cheap material (price F) can cause more usage or more labour time (quantity/efficiency U), so causes interlink.
- **Timing / isolation:** the **price variance is computed on the entire quantity *purchased*** (so purchasing problems surface early, even before use); the **quantity variance only on the quantity *used***.

> [!example] Why "purchased vs used" matters
> Standard 1.5 lb @ $4/Zippy; **purchased** 2,800 lb @ $3.90, **used** 1,700 lb to make 1,000 Zippies (SQ = 1,500 lb).
> Price var (on purchased) = 2,800($3.90−$4) = **$280 F**. Quantity var (on used) = $4(1,700−1,500) = **$800 U**.

### Fixed overhead — budget and volume variances

Fixed overhead splits differently (there is no "price × quantity"):

$$\text{Budget variance} = \text{Actual FOH} - \text{Budget FOH} \qquad \text{Volume variance} = \text{Budget FOH} - \text{Applied FOH} = FPOHR\,(DH - SH)$$

where **Applied FOH** (standard costing) = fixed POHR × **standard hours allowed for actual output**, **DH** = denominator (budgeted) hours, **SH** = standard hours allowed, **FPOHR** = fixed portion of the predetermined overhead rate.

> [!important] The volume variance is about *utilisation, not spending*
> It is **favourable when actual activity exceeds planned** (you spread the same fixed cost over more output) and **does not measure over/under-spending** — only how fully the facility's capacity was used.

> [!example] Fixed overhead
> Budget FOH $270,000 over 30,000 units × 3 MH = 90,000 denominator hrs ⇒ FPOHR = $3/MH. Actual FOH $280,000; actual 28,000 units ⇒ SH allowed = 3×28,000 = 84,000.
> Budget var = $280,000 − $270,000 = **$10,000 U**; Volume var = $3(90,000 − 84,000) = **$18,000 U**; total **$28,000 U**.

### Which variances to investigate — management by exception

Investigate the **largest** variances first, by **dollar amount or as a % of standard** (a 40%-of-standard oil variance beats a 1% flour variance even if smaller in dollars). Plotting variances on a **statistical control chart** flags those outside the normal band of random fluctuation — the same logic as [[ops-concepts/spc|statistical process control]] in Operations.

---

## Responsibility Accounting

The principle: **managers should be evaluated only on what they can control.**

- Holding a store manager accountable for head-office CEO salary is indefensible.
- Include uncontrollable items and the metric stops functioning as an incentive at all.

---

## Segment Reporting

The business is broken into **segments** — stores, product lines, regions — and each is measured on its own.
This completes the **segmented information** that [[m01-intro-management-accounting|Module 1]] identified as
the defining characteristic of managerial accounting.

> [!important] The link back to Module 7
> Evaluate managers using **absorption costing income** and you give them an incentive to inflate profit
> through [[m07-variable-vs-absorption-costing|overproduction]]. Internal performance measurement therefore
> uses **variable costing income**. This is where Module 7 and Modules 9–12 meet.

---

## Related notes

- [[m08-budgeting|Module 8 — Budgeting]] — the plan that variances are measured against
- [[m07-variable-vs-absorption-costing|Module 7 — Variable vs Absorption Costing]]
- [[cheatsheet-formulas|Formula Cheat Sheet & Glossary]]
