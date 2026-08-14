---
title: "Waiting Line Management — Variability, Queues & Pooling"
tags: [operations-management, opim201, waiting-line, queuing, variability, kingman, littles-law, pooling]
sources: ["SMU OPIM 201 Session 4 — Waiting Line Management (Cachon & Terwiesch, Ch. 9)"]
updated: 2026-08-14
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">Waiting Line Management</div><div class="dc-sub">Where variability lives, queues form — even when the server is not fully busy</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Variability</div><div class="dc-step-d">arrivals + service times fluctuate (CV)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Waiting T<sub>q</sub></div><div class="dc-step-d">Kingman: service × utilization × variability</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Queue length I<sub>q</sub></div><div class="dc-step-d">Little's Law: I<sub>q</sub> = T<sub>q</sub> ÷ a</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Set capacity m</div><div class="dc-step-d">enough servers to hit a target T<sub>q</sub></div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>Why queues form at all</h2><span class="dc-hint">the key insight</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">No variability → no wait</div>With perfectly regular arrivals and service, there is <b>no waiting</b> as long as utilization &lt; 100%.</div>
<div class="dc-card"><div class="dc-eyebrow">Variability → waiting anyway</div>Real arrivals/service fluctuate, so units wait <b>even when utilization &lt; 100%</b>. Supply can fall behind demand but can never get ahead of it.</div>
</div>
<div class="dc-callout warn">Two failure modes from variability: <b>blocking</b> (a station finished a unit but can't pass it on) and <b>starving</b> (a station is idle with no unit to work on). Both lose effective capacity; a buffer (the waiting line) absorbs some of the loss.</div>
</div>

# Waiting Line Management — Variability, Queues & Pooling

> [[operations-management|← Operations Management]] · [[process-analysis]] assumed fixed processing times. Reality is **variable** — and variability, not just average load, is what creates waiting lines.

---

## Measuring variability — use the coefficient of variation

**Standard deviation** is an *absolute* measure — but a std of 10 minutes means something very different around a 10-minute average than around a 100-minute average. So we use the **coefficient of variation (CV)**, a *relative* measure:

$$CV = \frac{\text{standard deviation}}{\text{mean}}, \qquad CV_a = \frac{\text{std of interarrival time}}{\text{mean interarrival time}}, \qquad CV_p = \frac{\text{std of processing time}}{\text{mean processing time}}$$

(Analogous to preferring days-of-supply over raw inventory: a ratio travels better than a raw number.) Variability comes from **arrivals** (volume swings, randomness, product mix), **tasks** (inherent variation, no SOP, rework) and **resources** (breakdowns, absence, set-ups).

---

## The waiting line model — notation

| Symbol | Meaning |
|---|---|
| $a$ | average **interarrival** time (so $1/a$ = arrival rate) |
| $p$ | average **service (processing)** time (so $1/p$ = service rate per server) |
| $m$ | number of parallel servers |
| $u$ | **utilization** $= \dfrac{\text{flow rate}}{\text{process capacity}} = \dfrac{1/a}{m(1/p)} = \dfrac{p}{a\,m}\;(<1)$ |
| $T_q$ | average time **waiting in queue** · $T = T_q + p$ = average time in system (flow time) |
| $I_q,\ I_p,\ I$ | average number waiting · in service · in system |

**Decision:** demand ($a$) is given; we control **supply** — the service rate $1/p$ of each server and the **number of servers** $m$, to hit a target $T_q$ (or $T$).

---

## Kingman's formula — predicting the wait $T_q$

$$T_q = \underbrace{\frac{p}{m}}_{\text{service time}} \times \underbrace{\frac{u^{\sqrt{2(m+1)}-1}}{1-u}}_{\text{utilization}} \times \underbrace{\frac{CV_a^{2}+CV_p^{2}}{2}}_{\text{variability}}$$

Three multiplicative levers — pull any of them down and the wait drops:

- **↑ effective capacity** (raise $m$ or cut $p$) → shorter wait, directly *and* by lowering $u$.
- **↓ utilization** (as $u \to 1$, the factor $\frac{u^{\dots}}{1-u}$ **explodes**) → this is why you can never run a variable system at 100%.
- **↓ variability** ($CV_a$ or $CV_p$) → shorter wait at the same average load.

### Little's Law gives the queue length

$$\text{Inventory} = \text{Flow rate} \times \text{Flow time}: \quad I_q = \frac{1}{a}\,T_q, \quad I_p = \frac{1}{a}\,p, \quad I = I_p + I_q = \frac{1}{a}\,T$$

---

## Worked example — Beau Ties call centre (staffing to a target)

Bringing phone orders in-house: service time $p = 3$ min with std 4 min, so $CV_p = 4/3$; assume $CV_a = 1$; target $T_q = 1$ min. For the **7–8 am** slot there are 5 calls/hr, so $a = 60/5 = 12$ min.

**Try $m = 1$:** $u = \dfrac{p}{a\,m} = \dfrac{3}{12} = 0.25$. Exponent $\sqrt{2(1+1)}-1 = 1$.

$$T_q = \frac{3}{1}\times\frac{0.25^{1}}{1-0.25}\times\frac{1^2+(4/3)^2}{2} = 3 \times 0.333 \times 1.389 \approx \mathbf{1.39\ min} > 1 \;\; ✗$$

**Try $m = 2$:** $u = \dfrac{3}{12\times2} = 0.125$, giving $T_q \approx \mathbf{0.12\ min} < 1$ ✓. **Hire 2 operators** for that slot. Repeating this per hour produces the day's staffing plan; note **seasonality** (predictable peaks) is handled by time-slotting the day, whereas **variability** (unpredictable size of each peak) is what the queue formula handles.

---

## Pooling — the economies of scale of queues

An online retailer serves two markets, each 4 customers/hr. Three layouts (all $CV_a=CV_p=1$):

| | **A** — 2 servers, 2 separate queues | **B** — 2 servers, 1 combined queue | **C** — 1 super-server, 1 queue |
|---|---|---|---|
| Setup | each server 5/hr, dedicated | both serve pooled demand, 5/hr each | one server at 10/hr (cost of two) |
| $a$ | 15 min (per queue) | 7.5 min (pooled) | 7.5 min |
| $p$ | 12 min | 12 min | 6 min |
| $u$ | 0.8 | 0.8 | 0.8 |

- **B beats A.** Same utilization, but a *pooled* queue is never in the wasteful state that a separate-queue system can reach — **a customer waiting while another server sits idle**. Pooling shortens $T_q$: economies of scale.
- **B vs C.** The super-server (C) serves twice as fast, so an individual's *flow time* $T$ is shorter — but with a single server, one customer waits while it is busy, so $T_q$ can be **larger** than the two-server pool B. Faster service cuts $T$; more servers cut $T_q$.

**Pooling in practice:** call centres, bank single-lines, QSR drive-through order-taking (order taker may be states away). **Limits of pooling:** it demands broader skills (more training/pay), can break the customer–server relationship (patients want their own doctor), and can raise the wait for one class to lower the average (dropping first-class priority screening).

---

## Managing waiting systems — points to remember

- **Variability is the norm, not the exception**; with it, waiting is inevitable even below 100% utilization — you *cannot* run the bottleneck at 100%.
- Use the waiting-time formula to get a feel for the system, test scenarios, and **balance utilization against responsiveness**.
- **Levers to improve performance:** pool/cross-train (↑$m$) · self-service to cut arrivals (↑$a$) · appointment systems to cut arrival randomness (↓$CV_a$) · standardisation & training to cut service time and its randomness (↓$p$, ↓$CV_p$).
- **Managerial response:** understand where variability comes from and eliminate what you can; **accommodate the rest by holding excess capacity**.

## Related notes

- [[process-analysis]] — capacity, utilization and the bottleneck (the fixed-time baseline this note adds variability to)
- [[line-balancing]] — designing a line's stations; Little's Law and utilization recur here
- [[m02-cost-concepts-job-order-costing|MA · fixed vs variable / sunk costs]] — the cost side of a make-vs-outsource (in-house vs Vonage) decision
