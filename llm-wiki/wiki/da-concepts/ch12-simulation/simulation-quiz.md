---
title: Simulation Chapter 12 — Calculation Drill Cards
tags: [decision-analysis, simulation, exam-prep, quiz, portacom, butler, black-sheep]
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0076
betweenness: 0.0000
eigenvector: 0.0456
degree: 4
community: 3
---

# Simulation (Chapter 12) — Calculation Drill Cards

Quiz methodology: a pair structure where one decisive fact flips the conclusion.
In each card, the **bolded fact** is the key that determines the conclusion.

---

## Decisive Facts That Split the Conclusion (Summary Table)

| Problem | Decisive fact | Conclusion |
|------|------------|------|
| 1 | r = 0.9109 → interval [0.9, 1.0) | c₁ = $47 |
| 2 | r = 0.6531 → interval [0.3, 0.7) | c₁ = $45 |
| 3 | c₂ formula = 80 + 20r | c₂ = $85.36 |
| 4 | D = 79 ≤ Q = 100 → inventory left over | Net profit = $3,635 (holding cost applies) |
| 5 | D = 111 > Q = 100 → stockout | Net profit = $4,670 (shortage cost applies) |
| 6 | Arrival(2) = 2.7 ≤ Completion(1) = 3.7 | Inspector busy → 1 min of waiting occurs |
| 7 | Arrival(3) = 7.6 > Completion(2) = 5.2 | Inspector idle → 0 min waiting |
| 8 | 500-run simulation, 51 losses | Interpreting P(loss) = 0.1020 |

---

### Scenario 1 — Determining c₁ from a Random Number in a Discrete Distribution (failure case)

PortaCom project simulation, run 1. On the first trial, random number r = 0.9109 was generated to determine the direct labor cost (c₁). PortaCom estimates that c₁ follows a discrete distribution between $43 and $47, with a 10% probability of the highest cost ($47).

**Q: What is the simulated value of c₁?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Determine the c₁ value using a random-number interval table for a discrete probability distribution

**Method** (Table 12.3):
Assign random-number intervals by cumulative probability:
| c₁ | Probability | Random-number interval |
|----|------|-----------|
| $43 | 0.1 | [0.0, 0.1) |
| $44 | 0.2 | [0.1, 0.3) |
| $45 | 0.4 | [0.3, 0.7) |
| $46 | 0.2 | [0.7, 0.9) |
| $47 | 0.1 | [0.9, 1.0) |

**Application**:
- r = 0.9109
- **r = 0.9109 falls in interval [0.9, 1.0)** → c₁ = $47
- (If r had been 0.2841 → [0.1, 0.3) → c₁ = $44)

**Conclusion**: c₁ = **$47/unit** (the highest labor cost)

> **Exam tip**: Set intervals by **cumulative** probability. ≥ 0.9 → $47, ≥ 0.7 → $46. Boundary values belong to the lower bound (≤ lower, < upper).

</details>

---

### Scenario 2 — Determining c₁ from a Random Number in a Discrete Distribution (success case — the mode)

Same PortaCom simulation, run 3. Random number r = 0.6531 was generated.

**Q: What is the simulated value of c₁?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Apply the discrete probability distribution interval table

**Method** (Table 12.3): Use the same interval table as Scenario 1

**Application**:
- r = 0.6531
- **r = 0.6531 falls in interval [0.3, 0.7)** → c₁ = $45
- The mode, with probability 0.4 (40%), is selected

**Conclusion**: c₁ = **$45/unit** (the most likely value)

> **Exam tip**: The interval with the highest probability is the widest. $45's interval [0.3, 0.7) has width 0.4 = probability 40%. Interval width = probability.

</details>

---

### Scenario 3 — Calculating Parts Cost (c₂) from a Uniform Distribution

PortaCom's parts cost c₂ follows a uniform distribution between $80 and $100. In simulation run 1, random number r = 0.2680 was generated for c₂.

**Q: What is the simulated value of c₂?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Generate a continuous value by formula from a uniform distribution

**Method** (Eq. 12.2–12.3):
```
c₂ = a + r(b − a)
   = 80 + r(100 − 80)
   = 80 + 20r
```

**Application**:
- r = 0.2680
- **c₂ = 80 + 20(0.2680)** = 80 + 5.36 = **$85.36**

**Conclusion**: c₂ = **$85.36/unit**

> **Exam tip**: A uniform distribution is computed in one step with the formula `a + r(b−a)`. No interval table as with a discrete distribution. r=0 gives the minimum (a), r=1 gives the maximum (b).

</details>

---

### Scenario 4 — Computing PortaCom Run 1 Profit

PortaCom run 1 simulation results: c₁ = $47, c₂ = $85.36, x = 17,366 units.

**Q: What is the run 1 simulated Profit?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Substitute the generated values into the simulation model formula

**Method** (Eq. 12.1):
```
Profit = (249 − c₁ − c₂) × x − 1,000,000
```
Parameters: Selling price $249, Admin+Advertising = $400,000 + $600,000 = $1,000,000

**Application**:
- Margin per unit = 249 − 47 − 85.36 = **$116.64**
- **Profit = 116.64 × 17,366 − 1,000,000**
- = 2,025,570 − 1,000,000 = **$1,025,570**

**Conclusion**: Run 1 profit = **$1,025,570** (a profit is made)

> **Exam tip**: Always deduct the fixed cost of $1,000,000 in the profit calculation. Compute the per-unit margin first, then multiply by demand.

</details>

---

### Scenario 5 — Butler Inventory Simulation: D ≤ Q (inventory left over)

Butler Electrical Supply reorders ventilation fans up to a level of Q = 100 units. In January, demand D = 79 units occurred. Gross profit = $50/unit, Holding cost = $15/unit, Shortage cost = $30/unit.

**Q: What is January's Net profit?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Apply the holding cost when D ≤ Q

**Method** (Eq. 12.5):
```
Case 1: D ≤ Q
Net profit = 50D − 15(Q − D)
```

**Application**:
- **D = 79 ≤ Q = 100** → Case 1 applies
- Gross profit = 50 × 79 = 3,950
- Holding cost = 15 × (100 − 79) = 15 × 21 = **315**
- Net profit = 3,950 − 315 = **$3,635**

**Conclusion**: January Net profit = **$3,635** (21 units left over, so a holding cost is incurred)

> **Exam tip**: D < Q → apply holding cost (cost of leftover inventory). Shortage cost = 0. Only D units are sold.

</details>

---

### Scenario 6 — Butler Inventory Simulation: D > Q (stockout)

In the same Butler system, in February demand D = 111 units occurred. Q = 100.

**Q: What is February's Net profit?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Apply the shortage cost when D > Q

**Method** (Eq. 12.6):
```
Case 2: D > Q
Net profit = 50Q − 30(D − Q)
```

**Application**:
- **D = 111 > Q = 100** → Case 2 applies
- Gross profit = 50 × 100 = 5,000 (only Q units can be sold)
- Shortage cost = 30 × (111 − 100) = 30 × 11 = **330**
- Net profit = 5,000 − 330 = **$4,670**

**Conclusion**: February Net profit = **$4,670** (11 units of demand unmet, so a shortage cost is incurred)

> **Exam tip**: D > Q → apply shortage cost. Sales are capped at Q units. D − Q = unfilled demand → a $30 penalty each.

</details>

---

### Scenario 7 — Black Sheep Scarves: Inspector Busy (waiting occurs)

Black Sheep Scarves quality inspection simulation. Scarf 1 arrives at 1.4 min, service time 2.3 min, so completion time is 3.7 min. Scarf 2's interarrival time (IAT) = 1.3 min.

**Q: What is Scarf 2's wait time?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Determine whether the inspector is idle/busy → determine the wait time

**Method** (Fig. 12.14):
```
Arrival time(2) = Arrival time(1) + IAT
If Arrival(2) > Completion(1) → Inspector IDLE, Start = Arrival
If Arrival(2) ≤ Completion(1) → Inspector BUSY, Start = Completion(1)
Wait time = Start time − Arrival time
```

**Application**:
- Arrival time(2) = 1.4 + 1.3 = **2.7 min**
- Completion time(1) = 3.7 min
- **2.7 ≤ 3.7** → Inspector **BUSY**
- Start time(2) = Completion time(1) = 3.7 min
- **Wait time = 3.7 − 2.7 = 1.0 min**

**Conclusion**: Scarf 2's wait time = **1.0 min**

> **Exam tip**: Arrival ≤ Completion (previous customer) → there must be waiting. Start time = previous customer's completion time. This is the core judgment of a dynamic simulation.

</details>

---

### Scenario 8 — Black Sheep Scarves: Inspector Idle (no waiting)

Scarf 2's service completes at 3.7 min. Scarf 3's interarrival time (IAT) = 4.9 min.

**Q: What are Scarf 3's wait time and service completion time? (ST = 2.2 min)**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Inspector idle → service starts immediately

**Method** (Fig. 12.14):
```
Arrival time(3) = Arrival time(2) + IAT(3)
If Arrival(3) > Completion(2) → Inspector IDLE
Wait time = 0, Start = Arrival(3)
Completion(3) = Start time(3) + ST
```

**Application**:
- Arrival time(2) = 2.7 min, Completion time(2) = 5.2 min
- Arrival time(3) = 2.7 + 4.9 = **7.6 min**
- **7.6 > 5.2** → Inspector **IDLE**
- Start time(3) = 7.6 min, **Wait time = 0 min**
- **Completion time(3) = 7.6 + 2.2 = 9.8 min**

**Conclusion**: No waiting, completion time = **9.8 min**

> **Exam tip**: Arrival > Completion (previous) → the inspector is already idle. Start = Arrival. The new customer starts immediately with no waiting.

</details>

---

### Scenario 9 — Computing the Service Level and Selecting the Optimal Q

Butler ran a 300-month simulation with Q = 100. Of total demand of 30,181 units, 27,917 were sold. Also, with Q = 120, an average monthly profit of $4,575 and a service level of 98.6% were observed.

**Q: What is the service level for Q = 100, and select the optimal Q.**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Compute the service level + select the optimal policy via experimental simulation

**Method**:
```
Service Level = Total Units Sold / Total Demand
```
The Q that yields the highest profit is optimal. Since simulation has no guaranteed optimal solution, experiment with several values of Q and compare.

**Application**:
- **Service Level(Q=100) = 27,917 / 30,181 = 0.925 = 92.5%**
- Results by Q:

| Q | Avg monthly profit | Service level |
|---|-------------|------------|
| 100 | $4,293 | 92.5% |
| 120 | **$4,575** | **98.6%** |
| 140 | $4,399 | 99.9% |

- **Q = 120 has the highest profit** → optimal choice

**Conclusion**: Service Level(Q=100) = **92.5%**, optimal Q = **120**

> **Exam tip**: Simulation is not optimization — it is experimental, varying Q. A larger Q raises the service level, but profit can actually fall due to increased holding cost.

</details>

---

### Scenario 10 — Interpreting the Probability of Loss (P(loss))

Result of simulating PortaCom 500 times: mean profit $698,457, standard deviation $520,485, minimum −$785,234, maximum $2,367,058, number of losses 51.

**Q: Compute the probability of loss and advise management on the decision.**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Quantify risk from the simulation results

**Method**:
```
P(loss) = number of losses / total number of simulation runs
```
Unlike what-if analysis, simulation provides **probability information**.

**Application**:
- **P(loss) = 51 / 500 = 0.1020 = 10.2%**
- Mean profit $698,457 > 0 → the expected value is positive
- 1 in 10 runs is a loss → risk exists
- P(profit > $250,000) ≈ 0.80 (from the histogram)

**Conclusion**: P(loss) = **10.2%**. The mean profit is positive but the chance of loss is substantial → further market research or confirmation of the risk-tolerance level is needed.

> **Exam tip**: What-if only gives the range (−$847K to $2.6M). Only simulation tells you "what percentage is a loss." This is the core value of simulation.

</details>

---

## Quick Formula Reference

| Situation | Formula |
|------|------|
| Discrete distribution random number | Interval table → based on cumulative probability |
| Uniform distribution | `a + r(b−a)` |
| Normal distribution (Excel) | `=NORMINV(RAND(), μ, σ)` |
| Butler Case 1 (D≤Q) | `50D − 15(Q−D)` |
| Butler Case 2 (D>Q) | `50Q − 30(D−Q)` |
| Service level | `total sold / total demand` |
| Wait time (idle) | `0` (immediate service) |
| Wait time (busy) | `Completion(i−1) − Arrival(i)` |
| PortaCom profit | `(249−c₁−c₂)×x − 1,000,000` |
| P(loss) | `number of losses / total number of simulation runs` |
