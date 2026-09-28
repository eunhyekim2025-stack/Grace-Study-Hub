---
title: "Module 4 — Activity-Based Costing (ABC)"
tags: [management-accounting, module-4, abc, cost-driver, overhead-allocation, cost-hierarchy, activity-rate, first-stage-allocation, second-stage-allocation, customer-margin]
sources: ["Managerial Accounting: Comprehensive Study Guide (Modules 1–12)", "ACCT102 Management Accounting — Week 7 Activity-Based Costing lecture deck (adapted from McGraw-Hill / Garrison), merged 2026-09-28"]
updated: 2026-09-28
relations:
  part-of: [management-accounting/index]
pagerank: 0.0047
betweenness: 0.0000
eigenvector: 0.0086
degree: 9
community: 1
---

<div class="dc-view">
<div><div class="dc-title">Module 4 · Activity-Based Costing</div><div class="dc-sub">"Products don't consume cost — activities do"</div></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">❌ Traditional · one plantwide rate</div>All overhead is pushed through <b>a single driver</b> (labour hours). It is splitting the dinner bill evenly — the person who drank water pays the same as the one who ordered three steaks.</div>
<div class="dc-card"><div class="dc-eyebrow">✅ ABC · several activity rates</div>Each activity gets its own <b>cost driver</b>, so every product carries <b>what it actually consumed</b>.</div>
</div>
<div class="dc-callout warn">Using one driver leads to <b>overcosting high-volume, simple products</b> and <b>undercosting low-volume, complex ones</b>. Your best seller ends up subsidising the problem child.</div>
<div class="dc-section"><span class="dc-num">1</span><h2>Activity rate examples</h2><span class="dc-hint">what actually drives the cost</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">Assembly</div><b>£2 per direct labour hour</b> — longer assembly, more cost <span class="dc-chip">driver: labour hours</span></div>
<div class="dc-card"><div class="dc-eyebrow">Inspection</div><b>£8 per inspection</b> — driven by <b>how many times</b>, not how long <span class="dc-chip">driver: inspections</span></div>
<div class="dc-card"><div class="dc-eyebrow">Parts Administration</div><b>£1,000 per unique part</b> — <b>independent of volume</b> <span class="dc-chip amber">driver: distinct parts</span></div>
</div>
<div class="dc-callout ok">Run ABC and the usual plot twist appears — the best-selling line was less profitable than it looked, and the low-volume speciality product was losing money. Pricing and product-line decisions change here.</div>
</div>

# Module 4 — Activity-Based Costing (ABC)

> [[management-accounting/index|← Management Accounting]] · Previous: [[m03-process-costing|Module 3]] · Next: [[m05-cost-behaviour-estimation|Module 5 — Cost Behaviour]]

ABC moves away from a single **"Plantwide Rate"** (the traditional POHR) to **multiple activity rates**.

---

## What goes wrong with a single rate

Using one driver — such as labour hours — for all overhead can lead to:

- **Overcosting** high-volume, simple products
- **Undercosting** low-volume, complex products

Because their labour hours look similar, a fiddly product and a straightforward one absorb the **same
overhead**, even though the fiddly one consumes far more of the support functions.

---

## Activity rates

| Activity | Rate | How to read it |
|---|---|---|
| **Assembly** | **£2** per direct labour hour | The longer the assembly, the higher the cost |
| **Inspection** | **£8** per inspection | Driven by the **number of inspections**, not hours worked. Awkward products are inspected more, so they pay more |
| **Parts Administration** | **£1,000** per unique part | The more distinct parts, the more administration. **Completely independent of how many units you make** |

> [!important] ABC in one line
> **"Cost is consumed by activities, not by products — so the product that used the activity should pay for it."**

---

## Why this changes management decisions

Look at the parts administration rate. **£1,000 per unique part** attaches whether you build 1 unit or
10,000. So the burden **per unit explodes for low-volume, high-variety products.**

Under the traditional method that cost was smeared thinly across the high-volume lines, where it stayed
hidden. ABC simply returns it to its rightful owner.

---

## How ABC actually works — the two-stage process

ABC assigns overhead in **two stages**, through five steps:

1. **Define the activities, activity cost pools, and activity measures.** An *activity* is any event that consumes resources; an *activity cost pool* accumulates the cost of one activity; the *activity measure* (cost driver) is the base used to allocate that pool.
2. **First-stage allocation** — assign the overhead costs *into* the activity cost pools (typically using **cross-functional interviews** about how resources are actually consumed).
3. **Calculate the activity rate** for each pool = **total pool cost ÷ total activity** for its measure.
4. **Second-stage allocation** — assign the pooled overhead *out* to the cost objects (products, customers) = activity rate × the object's use of that activity.
5. **Prepare management reports** — product margins and customer margins.

> [!tip] The two "stages"
> First stage: **resources → activities**. Second stage: **activities → products / customers**. A single plantwide rate collapses both into one step with one driver — which is exactly what distorts the numbers. ABC also uses **more cost pools** than the one plantwide pool.

## The five-level cost hierarchy

ABC recognises that not every cost is driven by the number of *units*. It sorts activities into **five levels**, and each level is allocated on its *own* kind of measure:

| Level | Performed… | Example driver |
|---|---|---|
| **Unit-level** | each time a **unit** is produced | machine hours, direct labour hours |
| **Batch-level** | each time a **batch** is processed (regardless of units in the batch) | number of setups, production orders |
| **Product-level** | to support a **specific product** line | product designs, number of distinct parts |
| **Customer-level** | to serve a **specific customer** (regardless of what they buy) | sales calls, customer orders |
| **Organization-sustaining** | to run the organisation **regardless** of products/customers | — (not assigned to products; see below) |

> [!important] Why the hierarchy matters
> Traditional costing spreads **all** of these on a **unit-level** base (labour or machine hours). That systematically **overcosts high-volume** products (they soak up the batch/product/customer costs they didn't cause) and **undercosts low-volume, complex** ones — the note's opening warning, now with its mechanism.

## Choosing an activity measure — two driver types

| Driver | What it is | Use when |
|---|---|---|
| **Transaction driver** | a **simple count** of how many times an activity happens (inspections, setups, orders) | each occurrence costs about the same |
| **Duration driver** | a measure of the **amount of time** an activity takes (inspection *hours*, setup *hours*) | occurrences vary a lot in length — more accurate, but more costly to track |

## What ABC does with costs that traditional costing won't

- **It assigns *non-manufacturing* costs too.** Where there is a cause-and-effect link, ABC pushes selling/admin costs — **sales commissions, shipping, warranty repairs** — onto the products or customers that cause them. Traditional *product* costing leaves these out (treats them as period costs).
- **It does *not* assign *all* manufacturing costs.** Two categories are **left out** of product cost because no product causes them:
  - **Organization-sustaining costs** — factory security, the plant manager's salary, heating — incurred *regardless* of what is made.
  - **Costs of unused / idle capacity** — charging these to products would penalise them for capacity they never used and make unit cost rise as volume falls (a death-spiral). ABC charges idle capacity to the **period** instead.

> So ABC is neither simply "more" nor "less" than traditional costing — it assigns overhead on a **cause-and-effect** basis, which *adds* some costs (non-manufacturing) and *removes* others (organization-sustaining, idle capacity).

## ABC vs traditional — product and customer margins

Because the drivers differ, the **margins** differ. Running ABC on the same business typically **raises** the reported margin on the simple high-volume line and **cuts** (sometimes to a loss) the low-volume specialty line — the "plot twist" above, now quantified:

| Product | Traditional margin | ABC margin |
|---|---|---|
| High-volume / simple | looks healthy | **higher** — it had been subsidising the others |
| Low-volume / complex | looks profitable | **lower — often a loss** once its batch- and product-level costs land on it |

> [!note] The reconciliation check
> ABC also produces **customer margins**, not just product margins. Both **reconcile back to the company's net operating income** — the **organization-sustaining** costs and any **idle-capacity** cost make up the gap between the sum of the product/customer margins and reported profit. If it doesn't reconcile, something was mis-assigned.

## Limitations, and what makes ABC succeed

> [!warning] Why ABC is a *supplement*, not a replacement
> - **Not GAAP-compliant** — most firms keep the traditional system for external reporting and run ABC internally, so **two systems** must be maintained.
> - **Substantial resources** to implement and maintain (interviews, extra pools).
> - **Resistance to, and misinterpretation of,** unfamiliar numbers.
> - The pull to **fully allocate every cost** to products — which quietly reintroduces the distortion ABC was built to remove.

Successful implementations share three traits: **strong top-management support**; ABC data **linked to how people are evaluated and rewarded** (otherwise staff conclude it doesn't matter and abandon it); and **cross-functional teams** who hold the operational knowledge the design needs and, by being included, resist it less.

---

## Related notes

- [[m02-cost-concepts-job-order-costing|Module 2 — POHR]] — the traditional method ABC replaces
- [[m05-cost-behaviour-estimation|Module 5 — Cost Behaviour & Estimation]]
- [[cheatsheet-formulas|Formula Cheat Sheet & Glossary]]
