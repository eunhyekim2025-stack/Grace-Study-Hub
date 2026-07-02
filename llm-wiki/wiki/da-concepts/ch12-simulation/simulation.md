---
title: Simulation (Chapter 12)
tags: [decision-analysis, simulation, risk-analysis, inventory, waiting-line, monte-carlo]
sources: [da/Textbook.pdf, da/textbook-solutions/MS14E_chapter_12_Final.doc]
updated: 2026-06-18
pagerank: 0.0098
betweenness: 0.0048
eigenvector: 0.1039
degree: 13
community: 3
---

# Simulation (Chapter 12)

Simulation is a method that repeatedly generates uncertain input values to estimate the distribution of a system's output.
It suits complex problems with no closed-form solution (non-standard distributions, complex waiting lines, etc.).

> Key point: simulation is **not an optimization technique** — it is a tool to describe the performance of a given policy.

---

## Structure of a Simulation Model

```
Controllable Inputs  ──┐
                       ├─→  Model  ──→  Output
Uncertain Inputs     ──┘
(Certain / Uncertain)
```

- **Controllable inputs**: values set by the analyst (e.g., price, reorder level Q)
- **Uncertain inputs**: generated randomly from a probability distribution (e.g., demand, cost)
- **Parameters**: fixed constants (e.g., selling price $249, administrative cost $400,000)

---

## 12.1 Risk Analysis — PortaCom Project

### Model

```
Profit = (249 − c₁ − c₂) × x − 1,000,000
```

| Variable | Description | Distribution |
|------|------|------|
| c₁ | Direct labor cost | Discrete: $43–$47 (probabilities 0.1/0.2/0.4/0.2/0.1) |
| c₂ | Parts cost | Uniform: $80–$100 |
| x  | First-year demand | Normal: μ=15,000, σ=4,500 |

**Scenario comparison**:
- Base case (c₁=45, c₂=90, x=15,000): Profit = **$710,000**
- Worst case (c₁=47, c₂=100, x=1,500): Profit = **−$847,000**
- Best case (c₁=43, c₂=80, x=28,500): Profit = **$2,591,000**
- 500-trial simulation: Mean = $698,457, P(loss) = **0.1020**

### Random Number Generation

**Discrete distribution (c₁, direct labor cost)**:
Assign random-number intervals in proportion to the probabilities:

| c₁ | Probability | Random-number interval |
|----|------|-----------|
| $43 | 0.1 | 0.0 ≤ r < 0.1 |
| $44 | 0.2 | 0.1 ≤ r < 0.3 |
| $45 | 0.4 | 0.3 ≤ r < 0.7 |
| $46 | 0.2 | 0.7 ≤ r < 0.9 |
| $47 | 0.1 | 0.9 ≤ r < 1.0 |

**Uniform distribution (c₂, parts cost)**:
```
c₂ = a + r(b − a) = 80 + r(100 − 80) = 80 + 20r     (12.3)
```

**Normal distribution (x, demand)**:
```
Excel: =NORMINV(RAND(), 15000, 4500)                  (12.4)
```
- RAND() < 0.5 → generates below-average demand
- RAND() > 0.5 → generates above-average demand

---

## 12.2 Inventory Simulation — Butler Electrical Supply

### Setup
- Selling price $125, cost $75 → **Gross profit = $50/unit**
- Monthly demand D: Normal(μ=100, σ=20)
- Holding cost: **$15/unit** (unsold inventory)
- Shortage cost: **$30/unit** (unmet demand)
- Controllable input: reorder level Q

### Profit Formulas

**Case 1: D ≤ Q (demand ≤ inventory)**
```
Net profit = 50D − 15(Q − D)
```

**Case 2: D > Q (demand > inventory)**
```
Net profit = 50Q − 30(D − Q)
```

### Service Level
```
Service Level = total units sold / total units demanded
```

**Simulation results (300 months)**:

| Q | Average monthly net profit | Service level |
|---|--------------|------------|
| 100 | $4,293 | 92.5% |
| 110 | $4,524 | 96.5% |
| 120 | **$4,575** | **98.6%** |
| 130 | $4,519 | 99.6% |
| 140 | $4,399 | 99.9% |

→ **Optimal reorder level: Q = 120** (balances profit and service level)

---

## 12.3 Waiting Line Simulation — Black Sheep Scarves

### Setup (Dynamic / Discrete-Event Simulation)
- Quality inspection department: 1 scarf = 1 customer
- Inter-arrival time (IAT): Uniform(0, 5 min)
  ```
  IAT = 0 + r(5 − 0) = 5r                              (12.8)
  ```
- Service time (ST): Normal(μ=2 min, σ=0.5 min)
  ```
  Excel: =NORMINV(RAND(), 2, 0.5)
  ```

### Key Relationships

```
Arrival time(i) = Arrival time(i−1) + IAT

Inspector IDLE: Arrival time(i) > Completion time(i−1)
  → Start time(i) = Arrival time(i)

Inspector BUSY: Arrival time(i) ≤ Completion time(i−1)
  → Start time(i) = Completion time(i−1)

Wait time(i) = Start time(i) − Arrival time(i)
Completion time(i) = Start time(i) + ST
System time(i) = Completion time(i) − Arrival time(i)
```

### Simulation results (1,000 scarves, 900 steady-state)
- **P(waiting)** = 549/900 = **0.61** → 61% wait
- Average waiting time: **1.59 min** (target: ≤1 min → not met)
- Inspector utilization: **78.6%**

→ Adding a second inspector reduces waiting → one inspector fails the service standard, so two are recommended

---

## 12.4 Other Simulation Issues

| Term | Description |
|------|------|
| **Static simulation** | Trials are independent — a prior result does not affect the next (PortaCom, Butler) |
| **Dynamic simulation** | State changes over time — waiting lines (Black Sheep) |
| **Verification** | Confirms the model works as intended |
| **Validation** | Confirms the model accurately reflects the real system |
| **Startup period** | Remove the initial transient — collect only steady-state statistics |

### Pros and Cons of Simulation

| Pros | Cons |
|------|------|
| Can model complex systems | No guarantee of an optimal solution |
| Can use any distribution | Results vary from run to run |
| Enables risk analysis (probabilities) | Computational cost can be high |
| Easy what-if analysis | Model validation is hard |

---

## Key Excel Formulas

| Distribution | Excel formula |
|------|-----------|
| Uniform(a, b) | `= a + RAND()*(b-a)` |
| Normal(μ, σ) | `= NORMINV(RAND(), μ, σ)` |
| Discrete (using an interval table) | `IF(RAND()<0.1, 43, IF(RAND()<0.3, 44, ...))` |

---

## Connected Concepts

- [[da-concepts/ch12-simulation/simulation-quiz]] ← practice problems and calculation drills
- [[da-concepts/ch11-waiting-lines/Waiting Line Models]] ← Chapter 11 waiting-line formulas (analytic solution)
