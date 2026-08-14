---
title: "Process Analysis — Capacity, Bottleneck & Throughput"
tags: [operations-management, opim201, process-analysis, bottleneck, capacity, throughput, theory-of-constraints]
sources: ["SMU OPIM 201 Session 2 — Process Analysis (Cachon & Terwiesch, Ch. 3)"]
updated: 2026-08-14
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">Process Analysis</div><div class="dc-sub">Find the weakest link — the bottleneck sets how fast the whole system can go</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Capacity of each step</div><div class="dc-step-d">= 1 ÷ processing time (× workers)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Bottleneck</div><div class="dc-step-d">the step with the lowest capacity</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">System capacity</div><div class="dc-step-d">= bottleneck capacity</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Flow rate R</div><div class="dc-step-d">= min{capacity, demand}</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>The goal (Theory of Constraints)</h2><span class="dc-hint">throughput, not utilization</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">Throughput</div>Rate the system generates revenue. <b>Revenue = min{Production, Demand}</b> — making more than you sell is not revenue.</div>
<div class="dc-card"><div class="dc-eyebrow">Operating expense</div>Rate the system generates cost — $$ going <b>into</b> the system.</div>
<div class="dc-card"><div class="dc-eyebrow">Inventory</div>Capital tied up <b>inside</b> the system. "It costs money to make money… just don't take too much."</div>
</div>
<div class="dc-callout warn">High capacity utilization is <b>not</b> the goal — only a possible means. 100% utilization of a <b>non-bottleneck</b> resource just builds useless inventory.</div>
<div class="dc-section"><span class="dc-num">2</span><h2>The bottleneck rules everything</h2><span class="dc-hint">the weakest link</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">It sets system capacity</div>A non-bottleneck's utilization is decided by the bottleneck, <b>not by its own potential</b>. Lost time at the bottleneck is lost for the whole system.</div>
<div class="dc-card"><div class="dc-eyebrow">Spot it by symptoms</div>Lowest capacity / largest processing time · always busy (highest utilization) · longest queue · most inventory piled in front.</div>
</div>
</div>

# Process Analysis — Capacity, Bottleneck & Throughput

> [[operations-management|← Operations Management]] · The toolkit for answering three manager questions about any process: **How much can we make? · How busy is each resource? · How long a lead time do we quote?**

Based on Goldratt's *The Goal* and Cachon & Terwiesch Ch. 3. A **process** is a series of steps (resources) that turn inputs into outputs. We want its **throughput** (revenue rate), not just to keep everyone busy.

---

## Process vocabulary — the definitions everything is built on

| Term | Definition | Formula |
|---|---|---|
| **Processing time** | Time for one resource to complete one flow unit (a.k.a. resource cycle time) | given |
| **Capacity** | Max flow units a resource can finish per unit time | $\text{Capacity} = \dfrac{1}{\text{Processing time}}$ |
| **Capacity with _m_ parallel workers** | Several identical resources at one step | $\text{Capacity} = \dfrac{m}{\text{Processing time}}$; effective processing time $= \dfrac{\text{Processing time}}{m}$ |
| **Utilization** | Fraction of time a resource is actually working | $\dfrac{\text{Busy time}}{\text{Available time}} = \dfrac{\text{Flow rate}}{\text{Capacity}}$ |
| **Bottleneck** | Resource with the **highest utilization** — usually the **lowest capacity / largest processing time** | — |
| **System (process) capacity** | Max flow units the whole process can finish per unit time | **= Bottleneck capacity** |
| **Flow rate, R** | What the process actually produces | $R = \min\{\text{System capacity},\ \text{Demand}\}$ |
| **(System) cycle time, CT** | Time between completions of successive finished units | $CT = \dfrac{1}{R}$ |
| **Flow time, T** | Time a single unit spends inside the whole system | sum of processing + waiting along its path |

> [!important] Utilization = "what actually gets done ÷ what could theoretically get done"
> Because $R = \min\{\text{capacity},\text{demand}\}$, every non-bottleneck runs at less than 100% — its idleness is **imposed by the bottleneck upstream/downstream**, not by any fault of its own.

**Demand-constrained vs capacity-constrained.** If demand < system capacity, the process is *demand-constrained* ($R=$ demand); if demand ≥ system capacity, it is *capacity-constrained* ($R=$ system capacity).

---

## Worked example — a 3-step line

Assume sufficient demand. Processing times: Step I = 2, Step II = 3, Step III = 1 min/unit.

| | Step I | Step II | Step III |
|---|---|---|---|
| Processing time | 2 min/unit | 3 min/unit | 1 min/unit |
| **Capacity** | 30/hr | **20/hr** | 60/hr |
| Utilization (at R = 20) | 20/30 ≈ 66.7% | **20/20 = 100%** | 20/60 ≈ 33.3% |

- **Bottleneck = Step II** (lowest capacity). **System capacity = 20/hr**, so at full demand **R = 20/hr** and **CT = 1/20 hr = 3 min**.
- **Demand-constrained case:** if demand = 10/hr, then R = 10, CT = 6 min, and utilizations fall to 33.3% / 50% / 16.7% — the bottleneck is still Step II but nobody is at 100%.

### Alleviating the bottleneck — and watching it move

Add a **second, parallel worker** (3 min/unit) to Step II. Effective processing time there becomes 3/2 = **1.5 min/unit**, so its capacity becomes 2/3 unit/min = **40/hr**. Now Step II (40) is no longer slowest — **Step I (30/hr) is the new bottleneck**, and system capacity rises to **30/hr**. Improving the bottleneck is the *only* way to lift system capacity; improving a non-bottleneck is "a mirage".

---

## Managing the bottleneck — Theory of Constraints

Goldratt's **five focusing steps** (a continuous-improvement loop):

<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Identify</div><div class="dc-step-d">find the constraint</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Exploit</div><div class="dc-step-d">get the most from it</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Subordinate</div><div class="dc-step-d">everything else serves it</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Elevate</div><div class="dc-step-d">add capacity to it</div></div>
<div class="dc-arrow">↺</div>
<div class="dc-step"><div class="dc-step-n">5</div><div class="dc-step-t">Repeat</div><div class="dc-step-d">the bottleneck has moved</div></div>
</div>

- **Always keep the bottleneck fully utilized** — an idle minute there is lost output for the entire system. Buffering it with a little WIP inventory in front protects it from starving.
- Piling WIP in front of a **non-bottleneck** does nothing for throughput.
- Real-world use: Tesla's Model 3 "production bottleneck" (2017); ToC is used by GE, Ford, P&G, Intel, TATA Steel and thousands more.

---

## Quoting a lead time

A customer orders **N units**. How long to deliver?

- **Starting from an empty system:** the *first* unit needs the full flow time $T$ (it must pass every step); after that, a finished unit emerges every $CT$. So lead time $= T + (N-1)\times CT$.
- **If the system is already running (steady state):** lead time $\approx N \times CT$.

*Example (the 3-step line, CT = 3 min, first unit T = 6 min).* For 1000 units from empty: $6 + 3\times999 = 3003$ min ≈ 50 hr; if already running, $3\times1000 = 3000$ min = 50 hr. At 10 hr/day, **quote 5 days**.

---

## Multiple products — the mix can move the bottleneck

When a step processes several products with different processing times, use the **effective (weighted-average) processing time** at that step:

$$\text{Effective PT} = \sum_i (\text{mix share}_i \times \text{PT}_i), \qquad \text{Capacity} = \frac{1}{\text{Effective PT}}$$

*Example.* Products X, Y with Step I times 2 and 3 min. If mix is 80% X / 20% Y, effective PT = 0.8×2 + 0.2×3 = **2.2 min**; change the mix to 40% X / 60% Y and it becomes 2.6 min — a **different mix can shift which step is the bottleneck**.

**Non-identical parallel machines** at one stage: add their *capacities* (not their times). Two machines at 10 and 5 min/unit give 6 + 12 = **18 units/hr**; the stage's effective processing time is 1 ÷ 18 hr.

---

## Break-even analysis (a costing lens on the same process)

$$\text{Break-even Quantity} = \frac{\text{Fixed Costs}}{\text{Sales Price per Unit} - \text{Variable Cost per Unit}}$$

Derived from Total Revenue = Total Costs at the break-even volume. Used for annual operating planning, viability of a new product/investment, and pricing. This is the same relation as the [[m06-cvp-analysis|CVP break-even in Management Accounting]] — the denominator is the contribution margin per unit. Note labour/wages are usually **fixed** (or sunk) in the short run, yet computing labour cost per unit is still useful for improving the cost structure.

---

## Key lessons

- In a series of tasks, the **bottleneck drives system performance** — it caps the flow rate.
- **System capacity rises only by improving the bottleneck**, after which the bottleneck may jump to another resource.
- **Focus on fully utilizing the bottleneck**; do not chase 100% on a non-bottleneck.
- With **multiple products**, the demand mix can change the bottleneck and the system's performance.

## Related notes

- [[line-balancing]] — how to assign tasks to stations so no single station becomes an over-loaded bottleneck
- [[waiting-line-management]] — what happens at a resource when arrivals and service times are *variable*
- [[m06-cvp-analysis|MA · CVP / break-even]] · [[m02-cost-concepts-job-order-costing|MA · fixed vs variable costs]]
