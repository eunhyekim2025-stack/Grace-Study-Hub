---
title: "Ops 2-2 — Process Bottleneck & Capacity Analysis"
tags: [operations-management, opim201, lecture, recording, bottleneck, capacity, utilization, theory-of-constraints, the-goal, process-flow-diagram]
sources: ["OPIM 201 Session 2 (make-up) in-class recording — bottleneck & capacity (2026-08-27, whisper/Groq transcript)", "operations-management/lectures/2026-08-27-makeup-2-2-transcript.txt"]
created: 2026-08-27
updated: 2026-08-27
kind: 개념
recording_folder: "recordings/operations-management/2026-08-27-make-up-2-2 (private Vercel Blob, 29 segments; a few segments failed to transcribe)"
---

<div class="dc-view">
<div><div class="dc-title">Bottleneck & Capacity Analysis</div><div class="dc-sub">One resource sets the pace of the whole process — find it, then fix it</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Map</div><div class="dc-step-d">process-flow diagram</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Capacity</div><div class="dc-step-d">per step = 1 / processing time</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Bottleneck</div><div class="dc-step-d">slowest step = system capacity</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Improve</div><div class="dc-step-d">relieve it, then re-check</div></div>
</div>
<div class="dc-callout"><b>The bottleneck determines the performance of the whole process.</b> Improve a non-bottleneck and nothing changes; improve the bottleneck and the whole system speeds up.</div>
</div>

> [!todo] Verify — AI draft from a class recording
> Built from an auto-transcript (some passages mis-heard as Malay; a few segments failed). Check the worked numbers against the slides.

## Motivation — *The Goal* (Goldratt)

Today's tools come from Eliyahu Goldratt's **Theory of Constraints**, popularized in his novel ***The Goal***. Firms once paid his consultancy millions to explain process analysis; the ~$13 book made the same lessons cheap. The book explains **how**; this class adds the **science of why**.

## The process-flow diagram

A simple diagram — not an engineering drawing — using three symbols:

| Symbol | Meaning |
| --- | --- |
| **Rectangle** | an **activity** (a processing step) |
| **Arrow** | the **flow** of the flow unit |
| **Triangle** (inverted or not) | **storage / buffer** (inventory) |

You only need the important characteristics (processing times), not how each step works internally.

## Processing time, capacity & the bottleneck

- **Processing time** = time a **resource** (worker or machine) takes to complete its service on one unit. (The book calls a stand-alone resource's processing time its *cycle time*.)
- **Step capacity** = **1 / processing time** (units per unit-time).
- **Bottleneck** = the step with the **lowest capacity** (longest processing time).
- **System capacity = bottleneck capacity.** The bottleneck runs at ~**100% utilization**; other steps are starved/blocked and run below it.

> [!example] Three-step process (the mortgage-team example)
> Steps take **2, 3, 1** minutes/unit → capacities **30, 20, 60** per hour. **Step 2 is the bottleneck** (20/hr) → **system capacity = 20/hr**. Even though step 1 *could* do 30, it's constrained to 20 by the bottleneck downstream.
> **Utilizations:** step 1 = 20/30 ≈ **67%**, step 2 = 20/20 = **100%** (bottleneck), step 3 = 20/60 ≈ **33%**.

## How to improve — relieve the bottleneck, then re-check

- Invest **only** at the bottleneck (e.g. buy one more machine for step 2). Money spent on a non-bottleneck does nothing.
- Do it **progressively**: add capacity to the current bottleneck → the bottleneck may **move** to another step → re-identify → repeat.
- **Buffer inventory** is a common fix: let step 1 stack finished units aside so it isn't blocked while the bottleneck works — firms often **use inventory to smooth operations** around a constraint.

> [!info] Effective capacity with parallel resources
> With **m identical resources** at a step, **effective processing time = processing time / m**. Two 10-min barbers → effective 5 min/unit (you don't finish one haircut in 5 min; you finish **two in 10**). Same averaging logic as flow time.

## Producing a batch, and what constrains it

- To make **1000 units** at a line completing one unit every **cycle time** (say 3 min): **total time = 1000 × cycle time = 3000 min**. (In steady state we ignore the longer first unit.)
- **Demand-constrained** vs **capacity-constrained:**
  - **Demand-constrained** — *demand* sets the flow rate (capacity > demand) → spend money on the **market**, not capacity.
  - **Capacity-constrained** — *capacity* sets the flow rate (demand > capacity) → invest in **capacity** (the bottleneck).
  - Identifying which tells you **where to put resources**.

## Key takeaways

- Map the process with **rectangle/arrow/triangle**; **step capacity = 1/processing time**.
- The **bottleneck** (lowest-capacity step) **sets the system's capacity** and runs at ~100% utilization.
- **Improve only the bottleneck**, progressively — it may move; buffer inventory smooths flow around it.
- **m parallel resources** → effective processing time = time / m.
- Diagnose **demand- vs capacity-constrained** to decide whether to invest in the **market** or in **capacity**.

## Related notes

- [[ops-concepts/ops-2-1b|Ops 2-1b — Flow Metrics & Little's Law]] — the metrics behind capacity/utilization
- [[ops-concepts/ops-2-1|Ops 2-1 — Process View & Flow Unit]]
- [[ops-concepts/process-analysis|Process Analysis]] — bottleneck, capacity, theory of constraints
