---
title: "Ops 2-1b — Flow Metrics & Little's Law"
tags: [operations-management, opim201, lecture, recording, flow-rate, inventory, flow-time, littles-law, inventory-turns, days-of-supply]
sources: ["OPIM 201 Session 2 (make-up) in-class recording — flow metrics & Little's Law (2026-08-27, whisper/Groq transcript)", "operations-management/lectures/2026-08-27-makeup-2-1-transcript.txt"]
created: 2026-08-27
updated: 2026-08-27
kind: 개념
recording_folder: "recordings/operations-management/2026-08-27-make-up-2-1 (private Vercel Blob, 46 segments; a few mid-lecture segments failed to transcribe)"
---

<div class="dc-view">
<div><div class="dc-title">Flow Metrics & Little's Law</div><div class="dc-sub">Three numbers describe any process — and one law ties them together</div></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">Flow rate (R)</div>Rate the system <b>completes & sells</b> units. Tied to <b>revenue</b>. <span class="dc-chip">= min(supply, demand)</span></div>
<div class="dc-card"><div class="dc-eyebrow">Inventory (I)</div>Units currently <b>in the system</b>. Tied to <b>holding cost</b> (capital tied up).</div>
<div class="dc-card"><div class="dc-eyebrow">Flow time (T)</div>Time a unit <b>spends in the system</b> (waiting + service). Tied to cost too.</div>
</div>
<div class="dc-callout"><b>Little's Law:</b> <b>I = R × T</b>. Inventory equals flow rate times flow time — like <i>distance = speed × time</i>. Holds in steady state (input ≈ output; the queue doesn't explode to infinity).</div>
</div>

> [!todo] Verify — AI draft from a class recording
> Built from an auto-transcript (some passages mis-heard as Malay; a few segments failed). Check the Tiffany/Walmart figures against the slides.

## The three basic performance metrics

A firm cares most about **profit = revenue − cost**. The three metrics map onto that:

| Metric | Definition | Ties to |
| --- | --- | --- |
| **Flow rate (throughput, R)** | The rate at which the system **generates sales** — the rate units/services are *completed* **and sold** | **Revenue** |
| **Inventory (I)** | Units currently inside the system (physical *or* virtual) | **Holding cost** (capital cost) |
| **Flow time (T)** | Time a unit spends in the system (waiting + service) | Cost (internal) |

> [!warning] Flow rate is sales, not production
> Under modern management, **production ≠ sales**. You can produce without selling — that just creates inventory. So **revenue = min(production, demand)** — a combination of supply *and* demand, not supply alone.

### Inventory holding cost — it's not the value of the goods

The **$1 of inventory** isn't what hurts you — the **cost of *holding*** that $1 does. Components of holding cost:

- **Opportunity / capital cost** — capital is tied up in the goods instead of earning elsewhere (the dominant one under an operations lens)
- **Depreciation & obsolescence** (and currency/perishability risk)
- **Storage** — space, workers to maintain it
- **Insurance** — more goods → more premium

Holding cost is **not a fixed cost** in general — it varies with how much you hold. From an operations view, capital cost matters mainly *as* inventory cost.

**Virtual inventory** counts too — a queue of tax forms to process, a token-based (virtual) queue of waiting customers. Any unit sitting in the system, physical or not, is costly to hold.

## Little's Law: I = R × T

> [!info] The law
> **Inventory = Flow rate × Flow time** (John D. C. Little, MIT). The proportionality constant between inventory and flow time is the **flow rate**.

Three ways to feel why it's true:

1. **Distance = speed × time** — inventory (how much you've "produced") = rate × time available. Intuitive, accepted without proof.
2. **Rearranged: T = I / R** — flow time equals inventory divided by flow rate.
3. **Group-assignment analogy:** 5 questions, one person does all → flow rate 1/day → flow time 5 days. Split the work (5 people, 1 each) → flow rate 5/day → flow time 1 day. Same work, higher R → lower T.

> [!example] Averages represent variable quantities
> Flow time isn't a single value — different customers spend different times. When asked "the" flow time, you report the **average** (like averaging exam scores of 80 and 100 into 90). Little's Law works with these averages.

## Cycle time vs flow time (don't confuse them)

- **Flow time** = time *one* unit spends in the system (e.g. a customer's total 25 min = waiting + service).
- **Cycle time** = time **between successive completions** — watch the output and time the gap between one finished unit and the next (e.g. one sandwich out **every 5 min**).
- **Cycle time = real productivity/throughput**, not flow time. A unit may take 25 min end-to-end, yet the line still churns out one **every 5 min**.
- For a line of stations, the relation mirrors Little's Law: **flow time = inventory × cycle time**.

## Flow time as the better inventory gauge — days of supply & turns

Raw inventory value is **not** informative on its own (depends on firm size, margins…). Convert it via Little's Law:

- **Days of supply / flow time** = Inventory ÷ Flow rate — how long a batch sits **before it's cleared**.
- **Inventory turns** = the reciprocal — how many times per year you turn inventory over.

> [!example] Tiffany vs Walmart
> A luxury jeweller (Tiffany-like) holds inventory ~**78 days** before it sells → each $1 of inventory incurs holding cost for 78 days. **Walmart** turns inventory in ~**43 days** (high turns) → each $1 is held far shorter. So it's **not the amount of inventory** that matters, but **how long each dollar of it stays** before replenishment — that drives the holding cost.

## Key takeaways

- Three metrics: **flow rate (R → revenue), inventory (I → holding cost), flow time (T → cost).**
- **Flow rate = sales, not production**; revenue = **min(supply, demand)**.
- Holding cost is about **capital tied up + storage + obsolescence + insurance**, not the goods' value.
- **Little's Law: I = R × T** (steady state). Use **T = I/R** to read inventory as **days of supply**; its reciprocal is **inventory turns**.
- **Cycle time** (gap between completions) = true throughput; distinguish it from **flow time** (time one unit spends inside).

## Related notes

- [[ops-concepts/ops-2-1|Ops 2-1 — Process View & Flow Unit]] — defines the flow unit these metrics measure
- [[ops-concepts/ops-2-2|Ops 2-2 — Process Bottleneck & Capacity Analysis]] — the next step: capacity & bottlenecks
- [[ops-concepts/process-analysis|Process Analysis]] — the concept note (Little's Law, inventory turns)
