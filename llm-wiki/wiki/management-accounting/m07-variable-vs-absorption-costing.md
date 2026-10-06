---
title: "Module 7 — Variable (Marginal) vs Absorption Costing"
tags: [management-accounting, module-7, absorption-costing, variable-costing, overproduction-trap, income-statement, contribution-format, traditional-format]
sources: ["Managerial Accounting: Comprehensive Study Guide (Modules 1–12)", "ACCT102 Week 2,3B CVP lecture deck (raw/acct102/slides/2,3B CVP_BT.pdf, adapted from McGraw-Hill) — contribution income-statement format; worked example figures are original, not from the deck"]
updated: 2026-10-06
relations:
  part-of: [management-accounting/index]
pagerank: 0.0080
betweenness: 0.0040
eigenvector: 0.0412
degree: 18
community: 1
---

<div class="dc-view">
<div><div class="dc-title">Module 7 · Variable vs Absorption</div><div class="dc-sub">Exactly one thing is in dispute — how to treat Fixed Manufacturing Overhead</div></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Absorption Costing · GAAP</div>Fixed MO is a <b>product cost</b> → it attaches to inventory and carries into the next period <span class="dc-chip">required for external reporting</span></div>
<div class="dc-card"><div class="dc-eyebrow">Variable (Marginal) Costing</div>Fixed MO is a <b>period cost</b> → expensed in full, immediately <span class="dc-chip amber">for internal decisions</span></div>
</div>
<div class="dc-callout">DM, DL and variable MO are product costs under <b>both</b> methods. Only <b>fixed MO</b> differs.</div>
<div class="dc-section"><span class="dc-num">1</span><h2>🚨 The overproduction trap</h2><span class="dc-hint">inflating profit without selling anything</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Normal · make 1,000, sell 1,000</div>Fixed MO £100,000 ÷ 1,000 units = £100 each → all sold, so <b>the full £100,000 is expensed</b></div>
<div class="dc-card"><div class="dc-eyebrow">Overproduce · make 2,000, sell 1,000</div>The same £100,000 ÷ 2,000 = <b>£50</b> each → only £50,000 hits COGS; the other <b>£50,000 sits in inventory as an asset</b></div>
</div>
<div class="dc-callout warn">Sales did not rise by a single penny, yet <b>profit rose by £50,000.</b> Half the fixed overhead left the income statement and was <b>deferred</b> onto the balance sheet. Meanwhile the warehouse fills with unsold stock.</div>
<div class="dc-section"><span class="dc-num">2</span><h2>Which profit is higher</h2><span class="dc-hint">reliably examined</span></div>
<div class="dc-cols-3">
<div class="dc-card"><b>Production &gt; Sales</b> (inventory up)<br>→ <b>Absorption profit is higher</b></div>
<div class="dc-card"><b>Production &lt; Sales</b> (inventory down)<br>→ <b>Variable profit is higher</b></div>
<div class="dc-card"><b>Production = Sales</b> (inventory flat)<br>→ <b>The two are equal</b></div>
</div>
</div>

# Module 7 — Variable (Marginal) vs Absorption Costing

> [[management-accounting/index|← Management Accounting]] · Previous: [[m06-cvp-analysis|Module 6]] · Next: [[m08-budgeting|Module 8 — Budgeting]]

This is where [[m01-intro-management-accounting|Module 1]]'s "different purpose, different answer" bites
hardest. Same company, same month — **two different net income figures.**

---

## Comparison

| Feature | Absorption Costing (GAAP) | Variable (Marginal) Costing |
|---|---|---|
| Direct Materials & Labour | Product cost | Product cost |
| Variable Manufacturing Overhead | Product cost | Product cost |
| **Fixed MO (FMO)** | **Product cost** — carried in inventory | **Period cost** — expensed now |
| Impact on income | **Higher** when Production > Sales | **Lower** when Production > Sales |
| Main use | External financial statements (mandatory) | Internal decisions · CVP analysis |

---

## The two income-statement formats

Each method lays the income statement out differently, because each **groups the costs differently**.
Absorption groups by **function** (manufacturing → `COGS`, everything else → selling & admin). Variable
groups by **behaviour** (everything variable first, everything fixed after) — the same
[[m06-cvp-analysis|contribution format]] CVP needs.

### The structure — line by line

| Absorption costing (Traditional format) | | Variable (Marginal) costing (Contribution format) |
|---|:--:|---|
| **Sales** | | **Sales** |
| − Cost of goods sold *(units sold × full unit product cost, **incl. fixed MO per unit**)* | | − Variable cost of goods sold *(units sold × **variable** unit product cost)* |
| | | − Variable selling & administrative |
| **= Gross margin** | | **= Contribution margin** |
| − Selling & administrative expenses *(variable **and** fixed)* | | − Fixed manufacturing overhead *(**the whole period's** FMO)* |
| | | − Fixed selling & administrative |
| **= Net operating income** | | **= Net operating income** |

> [!info] The one structural difference that matters
> Under **absorption**, fixed MO rides *inside* `COGS` — so only the fixed MO attached to the units **sold**
> is expensed, and the rest stays in inventory. Under **variable**, the **entire** period's fixed MO is
> expensed below the contribution margin regardless of how much was sold. That single placement is what
> makes the two net-incomes diverge whenever production ≠ sales.

### Worked side by side — produce 2,000, sell 1,500

Data (one period): selling price **£200**/unit · variable production cost **£80**/unit (DM + DL + variable MO)
· variable selling & admin **£10**/unit · fixed MO **£120,000** · fixed selling & admin **£30,000**.

Under absorption, the unit product cost must first absorb fixed MO: £80 + (£120,000 ÷ 2,000 made) = **£140/unit**.

| Absorption costing | £ | | Variable costing | £ |
|---|---:|---|---|---:|
| Sales (1,500 × £200) | 300,000 | | Sales (1,500 × £200) | 300,000 |
| − COGS (1,500 × £140) | (210,000) | | − Variable COGS (1,500 × £80) | (120,000) |
| | | | − Variable selling & admin (1,500 × £10) | (15,000) |
| **= Gross margin** | **90,000** | | **= Contribution margin** | **165,000** |
| − Selling & admin (1,500 × £10 + 30,000) | (45,000) | | − Fixed MO (all of it) | (120,000) |
| | | | − Fixed selling & admin | (30,000) |
| **= Net operating income** | **45,000** | | **= Net operating income** | **15,000** |

> [!important] Reconciling the £30,000 gap
> Production (2,000) exceeded sales (1,500), so **500 units went into ending inventory**. Under absorption
> each carries £60 of fixed MO (£120,000 ÷ 2,000), so **500 × £60 = £30,000 of fixed MO is deferred on the
> balance sheet** instead of expensed. That is exactly the gap: absorption NOI £45,000 − variable NOI
> £15,000 = **£30,000**. When production = sales there is no ending-inventory change, nothing is deferred,
> and the two formats report the **same** net income (the case shown in [[m06-cvp-analysis|Module 6]]).

---

## The Overproduction Trap

> [!danger] The climax of this module
> Under absorption costing, a manager can **artificially inflate profit by overproducing inventory.**
> By making more units than are sold, a portion of **Fixed Manufacturing Overhead is deferred to the
> balance sheet (as inventory)** rather than being expensed on the income statement. This spreads fixed
> costs thinner across more units, reducing the reported cost of goods sold and **increasing net income
> even if sales remain flat.**

### Put in numbers

Fixed MO is £100,000 — a cost that is [[m05-cost-behaviour-estimation|fixed in total but variable per unit]],
which is the mechanism the trap exploits. In both cases the company sells 1,000 units.

| | Make 1,000 | Make 2,000 |
|---|---:|---:|
| Fixed MO per unit | £100 | **£50** |
| Fixed MO inside COGS | £100,000 | **£50,000** |
| Fixed MO parked in inventory | £0 | **£50,000** |
| Net income | baseline | **£50,000 higher** |

**Sales did not move.** Reported profit did, because fixed MO was reclassified from period cost to
[[m02-cost-concepts-job-order-costing|product cost]] and parked in inventory. Cash actually got *worse* —
money is now tied up in stock nobody has bought — the cash effect shows up in
[[fa-concepts/ch11-cash-flows/statement-of-cash-flows|operating cash flow]], not in the profit line.
A rising profit line with a rising inventory line is a warning sign, not a triumph: the same
inventory-valuation mechanism is set out in [[fa-concepts/ch06-inventory/inventory]], and
[[m09-12-performance-management|performance management]] treats it as a manager-incentive
distortion rather than a genuine gain.

---

## Why variable costing exists

Variable costing refuses to let fixed MO hide in inventory — it is written off in the month incurred.
Profit then responds **only to how much you sold**, which is also what makes it the costing basis
[[m06-cvp-analysis|CVP analysis]] assumes. Producing more does not move it at all.
That is precisely why [[m09-12-performance-management|internal performance evaluation]] uses variable
costing income.

External statements, however, must use **absorption costing** under GAAP. So companies maintain both.

---

## Related notes

- [[m02-cost-concepts-job-order-costing|Module 2]] — the product/period distinction being applied here
- [[m05-cost-behaviour-estimation|Module 5]] — "fixed in total, variable per unit" is the mechanism behind the trap
- [[m09-12-performance-management|Modules 9–12]] — so what should managers actually be judged on?
- [[cheatsheet-formulas|Formula Cheat Sheet & Glossary]]
