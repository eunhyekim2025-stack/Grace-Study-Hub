---
title: "Line Balancing — Assigning Tasks to Workstations"
tags: [operations-management, opim201, line-balancing, cycle-time, precedence, heuristics, production-levelling]
sources: ["SMU OPIM 201 Session 3 — Line Balancing"]
updated: 2026-08-19
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">Line Balancing</div><div class="dc-sub">Spread the tasks across stations so the line hits its target rate with the fewest stations and least idle time</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Target cycle time</div><div class="dc-step-d">= available time ÷ target output</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Theoretical min stations</div><div class="dc-step-d">N<sub>min</sub> = Σt<sub>k</sub> ÷ CT (round up)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Assign by a rule</div><div class="dc-step-d">LTT or LNF, respecting precedence</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Efficiency</div><div class="dc-step-d">= Σt<sub>k</sub> ÷ (N<sub>a</sub> × CT)</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>What problem is this?</h2><span class="dc-hint">staffing a line to demand</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">The setting</div>A <b>line-flow</b> process (a moving line of identical products). We must place every task into a sequence of workstations.</div>
<div class="dc-card"><div class="dc-eyebrow">The goal</div>Meet the <b>target flow rate</b> with the <b>fewest workstations</b> (highest utilization) and the <b>least idle time</b> — a "good balance".</div>
</div>
<div class="dc-callout">Two hard constraints: every station's total time ≤ <b>target cycle time</b>, and tasks obey their <b>precedence</b> (a task can only go in once all its predecessors are placed).</div>
<div class="dc-section"><span class="dc-num">2</span><h2>Two priority heuristics</h2><span class="dc-hint">good, not guaranteed optimal</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">LTT — Longest Task Time</div>Among eligible tasks that still fit, assign the one with the <b>longest task time</b> first.</div>
<div class="dc-card"><div class="dc-eyebrow">LNF — Largest Number of Followers</div>Among eligible tasks that still fit, assign the one with the <b>most downstream tasks</b> first.</div>
</div>
</div>

# Line Balancing — Assigning Tasks to Workstations

> [[operations-management|← Operations Management]] · Previous idea: [[process-analysis]] (the bottleneck limits a process). Line balancing is how we *design* the line so no station becomes a needless bottleneck.

**Line balancing** allocates tasks across workstations to *balance the workload* while meeting the target flow rate. It is the "staffing to demand" half of **production levelling** — setting a steady target output rate for a period so planning stays tractable and production stays consistent. Levers include automating/outsourcing slow tasks, adding workers or overtime, and **specialisation** (breaking down the bottleneck task). Because target demand shifts across periods, **capacity flexibility** — cross-training and a temporary/flexible workforce — matters for the long run.

> [!info] Why "balance" is the word — the intuition before any formula
> A line moves at the pace of its **slowest station**, because every station has to hand its unit on at the same moment. Suppose four stations take **30 · 128 · 40 · 50** seconds. A finished bike comes off the end every **128 s** — the slowest station's time — no matter how fast the other three are. Meanwhile:
>
> - station 1 works 30 s and then **stands idle for 98 s**, every single cycle;
> - stations 3 and 4 are idle 88 s and 78 s;
> - only station 2 is busy the whole time.
>
> **Balancing does not make anyone work faster.** It moves work *off* the tall station and *onto* the short ones, so the peak comes down and everyone's idle time shrinks together. The line's speed is set by the tallest bar; the line's cost is set by the total height of all the bars. Balancing lowers the first without raising the second.

---

## Vocabulary

| Term | Meaning |
|---|---|
| **(Target) cycle time, CT** | Time between successive finished units coming off the end of the line. Set by demand: $CT = \dfrac{\text{available time}}{\text{target output}}$ — a **time per unit**, e.g. "one bike every 128 seconds". It is a *budget*: no station may exceed it |
| **Task time, $t_k$** | Time to complete task $k$ |
| **Eligible task** | A task all of whose predecessors are already placed in the current or an earlier station |
| **Efficiency** | $\dfrac{\sum t_k}{N_a \times CT}$ — the line's average utilization ($N_a$ = actual # stations) |
| **Theoretical min stations** | $N_{\min} = \left\lceil \dfrac{\sum t_k}{CT} \right\rceil$ — you can never do better than this |

> [!note] Efficiency is a utilization
> $\sum t_k$ is the real work (busy time); $N_a \times CT$ is the time made available. Their ratio is exactly "what gets done ÷ what could get done" — the same utilization idea as in [[process-analysis]].

---

## Worked example — Huffy bicycles

Huffy runs one 8-hour shift/day; daily production plan = **225** bicycles. Nine tasks (total 477 s):

| Task | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| Time (s) | 60 | 45 | 35 | 92 | 55 | 70 | 30 | 25 | 65 |
| Predecessors | — | 1 | 1 | 3 | 3 | 2,4 | 6 | 5,6 | 7,8 |

> [!info] How to read the precedence diagram below
> Each **circle is a task**, labelled *number · seconds*. An **arrow from A to B means "A must be finished before B can start"** — you cannot fit the wheel before the frame is welded. That is all it says.
>
> - Task **1 has no arrows coming in** → it can start immediately.
> - Task **6 has two arrows in (from 2 and 4)** → it waits for *both*.
> - Two tasks with **no path between them** (say 2 and 5) are independent and may go in either order, or in the same station.
>
> A task is **eligible** when every arrow pointing at it comes from a task already placed. The whole balancing procedure is: repeatedly look at the eligible set, pick one by a rule, place it, refresh the set.

```mermaid
graph LR
  1((1·60)) --> 2((2·45))
  1 --> 3((3·35))
  3 --> 4((4·92))
  3 --> 5((5·55))
  2 --> 6((6·70))
  4 --> 6
  6 --> 7((7·30))
  5 --> 8((8·25))
  6 --> 8
  7 --> 9((9·65))
  8 --> 9
```

**Step 1 — target cycle time.** Available time = 8 × 3600 = 28 800 s/day. $CT = 28\,800 / 225 = \textbf{128 s}$.

**Step 2 — theoretical minimum.** $N_{\min} = \lceil 477 / 128 \rceil = \lceil 3.73 \rceil = \textbf{4}$ stations. *You cannot do better than 4.*

**Step 3 — assign with LTT.** Open a station, list eligible tasks, assign the longest one that still fits (task time + station time ≤ 128); when nothing fits, open the next station.

| Station | Time remaining | Assigned | Idle |
|---|---|---|---|
| 1 | 128 → 68 → 23 | **1, 2** | 23 |
| 2 | 128 → 93 → 1 | **3, 4** | 1 |
| 3 | 128 → 58 → 3 | **6, 5** | 3 |
| 4 | 128 → 98 → 73 → 8 | **7, 8, 9** | 8 |

Total idle = 23 + 1 + 3 + 8 = **35 s**, using **4 stations** = $N_{\min}$ → this balance is **optimal**.

**Step 4 — efficiency.** $\dfrac{477}{4 \times 128} = \dfrac{477}{512} = \textbf{93.2\%}$ average utilization.

> [!tip] LTT beat LNF here
> The same problem under **LNF** needs **5 stations**, so efficiency drops to $477/(5\times128) = \textbf{74.5\%}$. Both are heuristics — neither is guaranteed optimal — but a solution that reaches $N_{\min}$ *is* optimal. When a priority rule ties, break the tie with the other rule.

---

## The general procedure (any priority rule)

1. Open a new station $k$ with station time 0.
2. List all **eligible** tasks. If none exist, stop — final CT = largest station time, # stations = $k$.
3. Pick the first eligible task by the priority rule. If (task time + current station time) ≤ CT, assign it (step 5); else ignore it (step 4).
4. Ignore that task; if more eligible tasks remain, return to step 3, otherwise open a new station (back to step 1).
5. Add the task to the station, increase station time, refresh the eligible list, return to step 2.

---

## Two more results

**Maximum production rate.** A station can never be shorter than its single largest task, so the *minimum* possible cycle time equals the **longest task time** — here task 4 = 92 s. Max production ≈ $28\,800 / 92 ≈ \textbf{313 units/day}$. Note **target production (225) need not equal maximum production (313)** — you balance to the target, not the max.

**Why the optimum can exceed $N_{\min}$.** $N_{\min}$ is a lower bound only; the real optimum may need more stations because task times are **discrete** (they don't divide evenly into CT) and **precedence** forbids some groupings.

**Handling leftover idle time:** give idle workers quality-control or background work, **cross-train** them to help busy stations, or redesign the process.

> [!important] What the balance tells you about flow time and WIP
> Once the line is balanced, [[process-analysis|Little's Law]] hands you two more numbers. Take the **idealised paced line**: a conveyor, one unit at each of $N$ stations, every unit spending exactly $CT$ at each station, no buffers and no transport time. Then
>
> $$T = N \times CT \qquad\text{and}\qquad I = R \times T = \frac{1}{CT} \times (N \times CT) = N$$
>
> For Huffy: $T = 4 \times 128 = 512\text{ s} \approx \mathbf{8.5\ minutes}$ for one bike to traverse the line, and $I = \mathbf{4}$ bikes in process — **one at each station**, exactly as the picture suggests.
>
> **These are a floor, not a general result.** Buffers between stations, blocking and starving, variable task times, parallel stations, or an unpaced worker-paced line all add waiting — so real flow time and real WIP come out **higher** than $N\times CT$ and $N$. Treat the ideal numbers as the best case the design allows.
>
> This is also the clearest case of the $CT \neq T$ distinction: **splitting the work into more, smaller stations leaves $CT$ alone** (the line still ships every 128 s) **but lengthens $T$ and raises WIP**. More stations buys you finer balancing and lower skill requirements, and it costs you lead time and work-in-process.

## Related notes

- [[process-analysis]] — capacity, bottleneck, flow rate, the utilization idea reused here
- [[waiting-line-management]] — when task/arrival times are *variable* rather than fixed
- [[m06-cvp-analysis|MA · CVP]] — the same "available time ÷ rate" arithmetic appears in target-output planning
