---
title: "OPS 4-2"
tags: ["lecture", "recording"]
sources: ["In-class recording — OPS 4-2 (2026-09-10, in-site recorder / Groq transcript)"]
kind: 개념
relations:
  part-of: [operations-management]
created: 2026-09-10
recording:
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-000-Gl4bwu079CGwPBF0kC1bP9jqBq1J3c.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-001-j6Sk6xwrFvBvOi9DYO2RC6pRm7gPBg.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-002-HG4n8d2w7r9JthbHlJo19qk2FcBLGX.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-003-f9Bz0XSfKWXJnMZy7yKqGjYTmg5ZIi.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-004-E2l5eub86JOIaEG0Sj0hj64YJbXfTC.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-005-JTJej7vKYFFue56eBsJtY8odZPGxGx.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-006-G6WqU2B5UDAVS8OcVmDwatwu4FXoUK.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-007-0vM8SkhA5Ba7otu8OJ3MYUy23muPkl.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-008-juXv9SSgMhddtyEbFGFz2RRrMOxhCJ.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-009-0skq8zszeYbTw6PBxLtmzKduxlRLs2.webm"
  - "recordings/operations-management/2026-09-10-ops-4-2/seg-010-SnwzXrKSYet5pn29x5Xgid30idrA17.webm"
---

> [!note] 🎙️ Original recording archived privately (11 segments) in your Vercel Blob store — not published here.

<div class="dc-view"><div class="dc-title">OPS #4-2</div><div class="dc-sub">Key concepts: flow‑rate calculation, steady‑state inventory, bottleneck identification, workstation coordination</div><div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Flow Rate &amp; Flow Time</div><div class="dc-step-d">Identify patient flow (e.g., 1 patient/4 days) and compute average inventory.</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Steady‑State Week Selection</div><div class="dc-step-d">Use data from a week that has reached equilibrium (e.g., Week 2), not the initial ramp‑up week.</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Bottleneck &amp; Capacity</div><div class="dc-step-d">Find the resource with highest utilization; adjust capacity or add workers.</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Workstation Assignment</div><div class="dc-step-d">Assign one worker per station; respect coordination constraints (no simultaneous work on non‑adjacent stations).</div></div></div></div>

> [!summary] Key takeaways  
- Use the **steady‑state week** (e.g., Week 2) to compute average inventory; discard ramp‑up data.  
- **Flow time** = average patient stay; **flow rate** = patients per time unit.  
- Identify the **bottleneck** by highest utilization; increase its capacity before others.  
- Workers cannot be assigned to non‑adjacent stations when tasks require simultaneous effort.  

## Practice Mode Review
- Covered **Practice Mode 1 & 2** before moving to new topic.  
- No outstanding questions from the class.

## Flow Rate, Flow Time & Inventory
> [!info] **Flow Rate** – Number of units (patients) completed per unit of time.  
> [!info] **Flow Time** – Average time a unit spends in the system (e.g., 4 days per patient).  
> [!info] **Inventory** – Number of units present in the system at a snapshot; average inventory = flow rate × flow time.

- Question 6 asked to identify **flow rate**, **inventory**, and **flow time** independently, then verify the score.  
- Example: If flow time = 4 days and flow rate = 1 patient/day → average inventory = 4 patients.

## Selecting the Correct Week for Average Inventory
| Week | Input (patients) | Output (discharges) | Reason |
|------|------------------|---------------------|--------|
| 1 (Sun‑Sat) | 28 × 5 = 140 | 28 × 3 = 84 | System not at steady state; cannot use. |
| 2 (Sun‑Sat) | 28 × 5 = 140 | 28 × 5 = 140 | Input = output → equilibrium; use for average inventory. |

> [!warning] **Common mistake:** Using Week 1 data (ramp‑up period) leads to inaccurate inventory estimates.

## CELMA Methodology (Exam Focus)
- Emphasize **methodology** over the exact numeric answer.  
- MCQs are designed so that **errors should not propagate**; each question stands alone.  
- Review steps:  
  1. Identify steady‑state period.  
  2. Compute flow metrics.  
  3. Locate bottleneck.  
  4. Propose capacity adjustments.

## Bottleneck Identification & Capacity Adjustment
> [!info] **Bottleneck** – The resource with the highest utilization, limiting overall throughput.  

- Determine utilization: Utilization = (Required processing time × Demand) / Available time.  
- If Utilization > 100 % → **capacity shortage**; options:  
  1. Add parallel resources.  
  2. Reduce processing time (process improvement).  
  3. Shift demand (schedule smoothing).

## Workstation Assignment Rules (Group Assignment)
- **Four stations** (1‑4); each station gets **one dedicated worker**.  
- **Constraint:** A worker cannot be assigned to non‑adjacent stations if the job requires simultaneous effort (e.g., stations 1 & 3).  
- **Coordination issue:** When two tasks must overlap, the same worker cannot cover both; leads to waiting time.  

> [!example]  
*Scenario:* Station 1 requires 30 min, Station 2 requires 30 min, both must be done within the same hour. Assigning the same worker to both creates a 30‑min idle gap → violates coordination rule.

## Group Assignment Guidance
- Clarify **page questions** before starting; focus on **operation** aspects only.  
- Ensure each worker is **locked to a single station**; avoid cross‑station assignments that break the coordination rule.  
- When demand rises (Question 2 & 3), assume **current workforce is fixed** unless the problem explicitly states hiring.

## Key Terms
| Term | Meaning |
|------|---------|
| Flow Rate | Units completed per time unit |
| Flow Time | Average time a unit spends in the system |
| Inventory | Number of units present; average = flow rate × flow time |
| Bottleneck | Resource with highest utilization limiting throughput |
| Coordination Constraint | Rule preventing a worker from handling non‑adjacent stations simultaneously |
