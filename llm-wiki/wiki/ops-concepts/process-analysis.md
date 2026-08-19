---
title: "Process Analysis — Process Choice, Flow Metrics & the Bottleneck"
tags: [operations-management, opim201, process-analysis, process-choice, job-shop, batch-flow, line-flow, product-process-matrix, order-winners, flow-unit, littles-law, inventory-turns, bottleneck, capacity, throughput, theory-of-constraints]
sources: ["SMU OPIM 201 Session 1 — Process Choice & Little's Law (Cachon & Terwiesch, Ch. 1 & 2)", "SMU OPIM 201 Session 2 — Process Analysis (Cachon & Terwiesch, Ch. 3)"]
updated: 2026-08-19
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">Process Analysis</div><div class="dc-sub">Pick the right kind of process, measure it with I·R·T, then find the weakest link</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Capacity of each step</div><div class="dc-step-d">= 1 ÷ processing time (× workers)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Bottleneck</div><div class="dc-step-d">the step with the lowest capacity</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">System capacity</div><div class="dc-step-d">= bottleneck capacity</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Flow rate R</div><div class="dc-step-d">= min{capacity, demand}</div></div>
</div>
<div class="dc-section"><span class="dc-num">0</span><h2>First choose the process, then analyse it</h2><span class="dc-hint">three types, one diagonal</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">Job Shop · MTO</div>Jumbled flows, many products. Flexible cheap machines, skilled workers, <b>low</b> utilization. Cake · F1 car · healthcare.</div>
<div class="dc-card"><div class="dc-eyebrow">Batch Flow · ATO</div>Cells per product <i>family</i>; same family, same route. Middle on every dial. Pastry · wafers · theatre.</div>
<div class="dc-card"><div class="dc-eyebrow">Line Flow · MTS</div>One fixed route. Dedicated automated machines, low-skill work, <b>high</b> utilization. Bread · auto assembly · refinery.</div>
</div>
<div class="dc-callout warn"><b>Efficiency versus flexibility &amp; quality.</b> You cannot have both — and the product–process matrix says a firm off the diagonal is either paying too much per unit or leaving expensive capital idle.</div>
<div class="dc-section"><span class="dc-num">★</span><h2>Little's Law</h2><span class="dc-hint">the one relation that ties the metrics together</span></div>
<div class="dc-callout"><b>I = R × T</b> — inventory equals flow rate times flow time, exactly as <i>distance = speed × time</i>. Pick any two and nature fixes the third. Holds whenever the process is in <b>steady state</b> (in-rate ≈ out-rate).</div>
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

# Process Analysis — Process Choice, Flow Metrics & the Bottleneck

> [[operations-management|← Operations Management]] · The toolkit for four manager questions about any process: **What kind of process should this be? · What do we measure? · How much can we make? · How long a lead time do we quote?**

Based on Cachon & Terwiesch Ch. 1–3 and Goldratt's *The Goal*. A **process** is a series of steps (resources) that turn inputs into outputs. We want its **throughput** (revenue rate), not just to keep everyone busy.

---

## What operations management is

**Operations management is the design and management of a business process that creates and delivers a product or service.** A *process* (or system) is any part of an organisation — any set of activities — that creates and delivers products and services by **transforming inputs into outputs**.

```
                 ┌──────────────────┐
                 │ Customer feedback│
                 └────────┬─────────┘
                          │
 Inputs  ────────►  Transformation  ────────►  Outputs
 people · plant ·        Process              product ·
 equipment ·                                  service
 materials · capital      │
                          │
                 ┌────────┴─────────┐
                 │     Control      │
                 └──────────────────┘
```

Universities, hospitals, banks and car plants are all processes in this sense. The two loops are what make it *management* rather than description: **control** compares what is happening against the plan, and **customer feedback** tells you whether the output was worth producing.

### A process has whatever scope you give it

The same business can be drawn as one box or many, and the choice is yours:

| Level | Example | Use it when |
|---|---|---|
| **Aggregate** | wood + metal → **Factory** → guitars · mortgage applications → **Calculate credit risk** → approved / rejected loans | you care about the input-to-output conversion as a whole |
| **Micro** (sub-processes) | mortgage applications → *collect data from client* → *evaluate loan metrics* → *underwriting decision* → *communicate to sales* → approved / rejected loans | you need to find **where** inside the box the problem is |

You cannot find a bottleneck at the aggregate level — that is precisely what the micro view is for.

---

## Choosing the process type

Before analysing a process you have to decide what kind of process to run. Processes are characterised on **seven attributes**:

| # | Attribute | Runs from … to |
|:--:|---|---|
| 1 | **Inventory strategy** | make-to-stock ↔ make-to-order |
| 2 | **Types of inventory held** | finished goods (FG) · raw material (RM) · work-in-process (WIP) |
| 3 | **Production capacity** | low ↔ high |
| 4 | **Degree of customization** | high ↔ low |
| 5 | **Process flexibility** (equipment, workforce) | flexible ↔ dedicated |
| 6 | **Degree of automation** | manual ↔ automated |
| 7 | **Workforce skill level** | craftsman ↔ low-skill operator |

> [!warning] Only certain combinations make sense
> These seven dials are not independent. Highly customised output *requires* flexible equipment and skilled workers, which rules out heavy automation, which caps capacity. That is why the whole space collapses to essentially **three viable process types**.

### Inventory strategy — where the order meets the product

| Strategy | Where production starts | Inventory held as | Examples |
|---|---|---|---|
| **Make-To-Stock (MTS)** | **before** the demand order — finished goods produced in advance | FG | seasonal products, a cafeteria |
| **Assemble-To-Order (ATO)** | components and sub-assemblies are ready; **final assembly** waits for the order | WIP | Dell / Gateway computers, Subway, Burger King |
| **Make-To-Order (MTO)** | **nothing** is produced until the order is confirmed | RM | custom-built home, tailor-made clothes, some consulting engagements |

The three differ only in **how far down the line the order arrives**. Push the decoupling point later and you gain customisation but lose speed; push it earlier and you gain speed but carry the risk of unsold finished goods.

### The three process types

| | **Job Shop** | **Batch Flow** | **Line Flow** |
|---|---|---|---|
| **Work flow** | jumbled & complex, **multiple products** | **cells**: one cell per product *family*; same family → same flow | pre-determined & simple, essentially **one product** |
| **Machines** | highly flexible, handles different jobs; typically **not automated, hence inexpensive** | different and/or flexible machines grouped into a cell | highly specialised, one job only; typically **automated, hence expensive** |
| **Examples** | cake · design company · F1 race car · healthcare | pastry · semiconductor wafers · apparel sewing · theatre | bread · auto assembly · oil refinery · newspaper |
| Capacity / production | Low | Medium | High |
| Automation | Low | Medium | High |
| Demand customization (volume & variety) | High | Medium | Low |
| Process flexibility | High | Medium | **Low (dedicated)** |
| Worker skill | High | Medium | Low |
| **Resource utilization** | Low | Medium | High |
| **Inventory strategy** | MTO | ATO | MTS |

> [!important] The whole table is one trade-off
> **Efficiency versus flexibility & quality.** Every row moves together: the flexible end (job shop) buys variety with idle resources and expensive labour; the efficient end (line flow) buys utilization with dedicated equipment that can make exactly one thing. There is no column that wins on both.
>
> Notice that **low resource utilization is a design choice, not a failure** in a job shop — which is a useful corrective to the bottleneck sections below, where utilization looks like something you always want to raise.

> [!note] Read the rows as *typical*, not *definitional*
> The table is the exam-answer version, and every row is the natural pairing. But none of them is an identity: a job shop can perfectly well run some standard items make-to-stock, and its low utilization follows from jumbled flows rather than from the definition of a job shop. If a question hands you a process that breaks a row, trust the described flow, not the label.

### The product–process matrix

Hayes & Wheelwright's matrix puts **process choice** on the vertical axis and **product/market choice** on the horizontal one:

| ↓ process \ product → | Low volume (unique) | Medium volume (high variety) | High volume (lower variety) | Very high volume (standardized) |
|---|---|---|---|---|
| **Job shop** | ✅ | | ↗ *unit variable costs* | ↗ *generally too high* |
| **Batch flow** | | ✅ | | |
| **Worker-paced line** | | ✅ | | |
| **Machine-paced line** | | | ✅ | |
| **Continuous process** | ↙ *utilization of fixed* | ↙ *capital generally too low* | | ✅ |

- **On the diagonal** the process matches the product. Going down it: *less complexity, less flexibility, more efficiency*.
- **Above the diagonal** (a flexible process making a high-volume standard product) — **unit variable costs are too high**. You are paying craftsmen to make bread.
- **Below the diagonal** (a dedicated process making a low-volume custom product) — **utilization of fixed capital is too low**. You bought a refinery to bake one cake.
- Historically, **every industry has been forced down the diagonal** as its product standardised — eye surgery, vehicle production, financial services, butchery.

> [!example] Airlines — the same matrix in service form
> Vertical: *multiple in-flight procedures and aircraft types* ↔ *a single procedure and a single aircraft type*. Horizontal: *multiple service classes* ↔ *a single service class*.
>
> **Air France and British Airways** sit top-left (many classes, many aircraft types). **Ryanair** sits bottom-right (one class, one aircraft type — the 737 fleet is the process choice that makes the product choice possible). **Silverjet and L'Avion** tried single-class all-business — a coherent diagonal position that still failed commercially, which is worth remembering: sitting on the diagonal is necessary, not sufficient.
>
> **Matching the product and the process is vital.**

### How do we choose?

The process choice must be **consistent with competitive strategy** — cost, quality, customization, delivery (and others: sustainability, variety, service). **A firm cannot excel simultaneously on all competitive dimensions.** Trade-off analysis lets it concentrate resources on the *relative* performance of the parameters that actually decide its success (the classic SWOT framing).

Draw the industry as a **frontier** — say customization against price:

```
 Customization
   high │  ● A
        │       ╲          ← current frontier in the industry
        │    ○────► ● C     (○ = us, inside the frontier)
        │    │      ╲
        │    ▼        ● B
    low │              ╲
        └───────────────────  Price
          high         low
```

- A firm **inside** the frontier (○) is simply underperforming — it can improve customization *and* price at once by **improving its process**. No trade-off is involved.
- A firm **on** the frontier faces a real trade-off: more of one dimension now costs the other. Competitors A, B and C have each picked a different point on it.

> [!tip] The same shape shows up again below
> The inventory-turns-vs-gross-margin curve in *Counting inventory* is this identical picture drawn with different axes. Learn to ask of any such chart: **is this firm on the frontier or inside it?** — because the answer decides whether the fix is "make a choice" or "get better".

### Order winners and order qualifiers

| | Definition | What it does |
|---|---|---|
| **Order qualifier** | criteria a firm must provide to be **considered or shortlisted** as a potential supplier | gets you onto the list |
| **Order winner** | customer requirements that enable a firm to **win the business** | gets you picked off the list |

Over time, **what used to be an order winner becomes an order qualifier** — a rival matches it, and it stops distinguishing anyone. McDonald's made speed and consistency a winner in fast food; today no chain survives without them, so they merely qualify you. Dell made build-to-order configuration a winner; it is now table stakes.

> [!question] The seminar's two prompts
> *What is an order winner for Burger King?* — customisation: "have it your way", flame-grilled, assembled to your order (which is exactly why BK runs an **ATO** process).
> *What is an order qualifier for McDonald's?* — speed, price and consistency: necessary to be in the game, no longer enough to win it.
> These are discussion prompts, not fixed answers — the defensible move in an exam is to name the dimension **and** tie it to the process type it implies.

**Key lesson.** Operations strategy matches processes to products, and is **inseparable from the firm's overall strategy** — if the two are not aligned, the firm is positioned for trouble. Identifying your order winners and qualifiers is one concrete way to decide both at once.

---

## The flow unit — deciding what to count

> **You cannot manage or improve what you cannot measure.**

The **flow unit** is the basic unit that moves through the process, and it generally defines the process output you care about. Choose one that can measure and describe **all** the activities in the process.

> [!example] Which is the right flow unit for a roller coaster?
> (a) seats · (b) **riders** · (c) employees · (d) miles per hour · (e) operating hours per day
>
> **(b) riders.** Seats and employees are *resources* the process uses, not things that flow through it. Miles per hour is a rate, and operating hours is a duration — neither is a unit at all. Riders enter, get processed and leave, and every activity (queueing, boarding, riding, unloading) can be described in terms of them.

Once the flow unit is fixed, three performance measures follow — and they are the subject of the rest of this note.

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
| **Flow rate, R** | What the process actually produces — a.k.a. the **throughput rate** | $R = \min\{\text{System capacity},\ \text{Demand}\}$ |
| **Inventory, I** | Number of flow units **inside** the process at a moment in time | counted, or via Little's Law below |
| **(System) cycle time, CT** | Time between completions of successive finished units | $CT = \dfrac{1}{R}$ |
| **Flow time, T** | Time a single unit spends inside the whole system | sum of processing + waiting along its path |

> [!important] Utilization = "what actually gets done ÷ what could theoretically get done"
> Because $R = \min\{\text{capacity},\text{demand}\}$, every non-bottleneck runs at less than 100% — its idleness is **imposed by the bottleneck upstream/downstream**, not by any fault of its own.

**Demand-constrained vs capacity-constrained.** If demand < system capacity, the process is *demand-constrained* ($R=$ demand); if demand ≥ system capacity, it is *capacity-constrained* ($R=$ system capacity).

> [!warning] Inventory is an asset to an accountant and a liability to an operations manager
> On the balance sheet inventory is an asset ([[m02-cost-concepts-job-order-costing|product cost sits in inventory until the unit sells]]). In operations it should usually be read as a **liability**: it is capital parked in the system, and by Little's Law it is *also* the reason your flow time is long. Both readings are correct about different things — the accounting one about ownership, the operations one about consequence.

---

## Little's Law — the one relation linking I, R and T

Observation first: if you are in a long queue (lots of inventory), you expect to wait a long time (long flow time). If a plant is stuffed with WIP, you expect a long delivery lead time. That intuition is exactly right, and it has a formula.

$$\boxed{\;I \;=\; R \times T\;} \qquad\Longleftrightarrow\qquad T \;=\; \frac{I}{R} \;=\; I \times CT \qquad (\text{recall } R = 1/CT)$$

$I$ = inventory (flow units in the process) · $R$ = flow rate · $T$ = flow time.

> [!tip] The intuition is *distance = speed × time*
> Inventory is the "distance" the system holds, flow rate is the speed at which units move, flow time is how long the trip takes. Any one of the three can be recovered from the other two.

> [!example] The tunnel
> Cars enter a tunnel at **10 cars/min** and take **2 min** to cross. How many cars are inside at any moment?
> $$I = R \times T = 10 \times 2 = \mathbf{20\ cars}$$
> Nobody counted the cars — the count was implied by the rate and the duration.

### The condition: steady state

Little's Law applies **whenever the process is in steady state** — the input rate and the output rate are about the same.

> [!warning] Why the condition is not a technicality
> Consider a bank teller. If customers join the queue faster than the teller serves them, the queue **grows without bound**; there is no average inventory and no average flow time to speak of, so there is nothing meaningful to compute. This is why analysis is only ever done on steady-state processes — and why a variable process can never be run at 100% utilization (→ [[waiting-line-management]]).

### Two implications worth memorising

1. **Of the three measures $(I, R, T)$, management can choose two — nature gives you the third.** You do not get to pick all three.
2. **At a constant flow rate, reducing inventory ⟺ reducing flow time.** They are the same project. Every lean/JIT initiative is this sentence.

### Cycle time (CT) versus flow time (T)

Two different clocks, constantly confused:

| | **Cycle time, CT** | **Flow time, T** |
|---|---|---|
| Measures | time between **completions of successive units** | time **one unit** spends in the system |
| Formula | $CT = 1/R$ | $T = I \times CT = I/R$ |
| Whose experience | the **factory's** — how often something comes off the end | the **unit's** (or the customer's) — how long it took |

> [!example] The conveyor
> A moving conveyor passes **4 workstations**, each taking a uniform **10 minutes**. What are CT and T?
> - **CT = 10 min** — a finished unit comes off the end every 10 minutes, whatever the line's length.
> - **T = 4 × 10 = 40 min** — a unit must pass all four stations.
> - And Little's Law closes the loop: $I = R \times T = \frac{1}{10} \times 40 = \mathbf{4\ units}$ in the system — one at each station, as you would expect.
>
> **Adding stations lengthens T but leaves CT alone.** A customer waits longer; the factory ships just as often.

---

## Counting inventory — four currencies for the same "I"

Little's Law is indifferent to the units you use, so "how much inventory" can be asked in four ways:

| Currency | Which letter of $I = R\times T$ | Meaning | Use when |
|---|---|---|---|
| **Flow units** | the **I** | number of wetsuits, patients, chips | there is one flow unit, or you care about one product |
| **Dollars** | the **I** | $ value of inventory (at **cost of inventory**) | the firm has multiple products — an intuitive total |
| **Days-of-supply** | the **T** | average number of days a unit spends in the system; equivalently, how long stock would last at the average flow rate if **no replenishment arrived** | comparing firms of different sizes |
| **Inventory turns** | $1/T = R/I$ | how many times the average inventory is **sold and replenished** per year | the standard efficiency benchmark |

$$\text{Inventory turns} = \frac{1}{\text{Flow time}} = \frac{1}{T} = \frac{R}{I}$$

High turns (= low days-of-supply) means inventory is held briefly before reaching customers.

> [!warning] Use COGS, not revenue, as the flow rate
> When $I$ is measured in dollars **at cost**, $R$ must be in dollars **at cost** too — so the flow rate is **cost of goods sold**, not sales revenue. Mixing a cost-valued numerator with a revenue-valued denominator inflates the turns and is the single most common slip here.

> [!question] Firm A holds \$1,000 of inventory; Firm B holds \$10,000. Which manages inventory better?
> **Unanswerable as stated.** Inventory is only meaningful against the rate that flows through it. \$10,000 held against \$1,000,000 of annual COGS turns 100 times a year; \$1,000 held against \$2,000 of COGS turns twice. The absolute number says nothing — which is the entire reason days-of-supply and turns exist.

### Worked comparison — Sears vs Wal-Mart, 2018

| | **Sears** | **Wal-Mart Stores Inc.** |
|---|---:|---:|
| Inventory | \$2,798,000,000 | \$43,783,000,000 |
| Total operating revenue | \$16,702,000,000 | \$500,343,000,000 |
| **Cost of goods sold** (= flow rate $R$) | \$13,175,000,000 | \$373,396,000,000 |
| **Flow time** $T = I/R$ | 0.2124 yr = **77.5 days** | 0.1173 yr = **42.8 days** |
| **Inventory turns** $= 1/T$ | **4.7 / yr** | **8.5 / yr** |

Wal-Mart holds **15.6 times more inventory in absolute dollars** than Sears and is nonetheless managing it roughly **twice as well** — each unit sits on its shelves 42.8 days instead of 77.5.

> [!note] Ending inventory vs average inventory
> These use the **ending** inventory from the balance sheet, which is what the figures above give. Financial analysts normally compute turnover against **average** inventory, $(\text{beginning}+\text{ending})/2$. The operations logic is identical either way — just be consistent, and say which one you used.

> [!important] The punchline
> It is **not the amount** of inventory that matters, but the **cost of carrying each unit**. The shorter the flow time — the higher the inventory turns — the lower the carrying cost. And by Little's Law that is the same statement as: get the units out faster.

### Turns and gross margin trade off

Plot inventory turns against gross margin across retailers (Gaur, Fisher & Raman) and the points fall along a **downward-sloping frontier**:

- **High turns, low margin** — Wal-Mart, Giant. Thin markup, sell it fast, make the money on volume.
- **Low turns, high margin** — Robinsons, Marketplace. Fat markup, slow movement, make the money per unit.
- A retailer **below** the curve is simply underperforming, and can improve *either* axis without giving up the other. A retailer **on** it must choose.

This is the competitive-frontier picture from *How do we choose?* above, drawn with operational axes — which is the point: a firm's inventory policy is a restatement of its competitive strategy, not a separate decision.

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

| # | Step | What it means |
|---|------|---------------|
| 1 | **Identify** | find the constraint (the bottleneck) |
| 2 | **Exploit** | get the most out of it — no idle time, no waste |
| 3 | **Subordinate** | everything else runs to serve the constraint |
| 4 | **Elevate** | add capacity to the constraint |
| 5 | **Repeat** | ↺ the bottleneck has likely moved — start again |

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

## Practice — check your understanding

> [!question] 1 · Dentist
> Over an eight-hour day a dentist's office treats **24 patients**. What is the flow rate per hour, and what are the components of a patient's flow time?
>
> $R = 24/8 = \mathbf{3\ patients/hr}$. Flow time is the **whole stay**, not just the treatment: waiting in reception → check-in → waiting in the chair → X-ray / cleaning / examination → checkout. Most of a service flow time is usually waiting, which is why $T$ and processing time must never be conflated.

> [!question] 2 · Candy Haven Bakery
> Ten customers visit between **8am and 10am**, spending 10, 15, 20, 11, 8, 12, 5, 18, 29 and 32 minutes respectively. Average number processed per hour? Flow time?
>
> $R = 10 \text{ customers} / 2 \text{ hr} = \mathbf{5\ customers/hr}$. $T = \frac{160}{10} = \mathbf{16\ min}$.
> Little's Law then gives the average number *in* the bakery: $I = R \times T = 5 \times \frac{16}{60} \approx \mathbf{1.33\ customers}$ — a third measure nobody had to observe.

> [!question] 3 · West End Donut Shop
> **2,400 customers** over the **10 hours** it is open; each spends **5 minutes** inside. How many customers are in the shop at any given time?
>
> $R = 2400/10 = 240$/hr, $T = 5\text{ min} = \tfrac{1}{12}$ hr, so $I = R \times T = 240 \times \tfrac{1}{12} = \mathbf{20\ customers}$.
> **Watch the units** — $R$ and $T$ must be on the same clock. Mixing per-hour with minutes is the mistake this question is built to catch.

---

## Key lessons

- **Choose the process before analysing it.** Job shop / batch flow / line flow are packages, not dials you set independently, and the product–process matrix says the choice must match the product's volume and variety.
- **Operations strategy is firm strategy.** Order winners and qualifiers are the practical way to decide product and process together.
- **Little's Law, $I = R \times T$,** ties the three performance measures together in steady state — pick two, nature gives the third; at constant $R$, cutting inventory *is* cutting flow time.
- **Count inventory in days-of-supply or turns, never in absolute dollars** — and use COGS as the flow rate when working in money.
- In a series of tasks, the **bottleneck drives system performance** — it caps the flow rate.
- **System capacity rises only by improving the bottleneck**, after which the bottleneck may jump to another resource.
- **Focus on fully utilizing the bottleneck**; do not chase 100% on a non-bottleneck.
- With **multiple products**, the demand mix can change the bottleneck and the system's performance.

## Related notes

- [[line-balancing]] — how to assign tasks to stations so no single station becomes an over-loaded bottleneck; the *worker-paced* and *machine-paced* lines of the product–process matrix are what it designs
- [[waiting-line-management]] — what happens at a resource when arrivals and service times are *variable*; Little's Law reappears there as $I_q = T_q/a$
- [[forecasting]] — an MTS process lives or dies on the demand forecast; MTO does not need one
- [[m06-cvp-analysis|MA · CVP / break-even]] · [[m02-cost-concepts-job-order-costing|MA · fixed vs variable costs]]
