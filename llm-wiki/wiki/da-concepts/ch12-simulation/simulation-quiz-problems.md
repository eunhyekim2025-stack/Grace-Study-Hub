---
title: Simulation Chapter 12 — Textbook Problem Quiz
tags: [decision-analysis, simulation, exam-prep, quiz, textbook-problems, monte-carlo]
sources: [da/Textbook.pdf, da/textbook-solutions/MS14E_chapter_12_Final.doc]
updated: 2026-06-18
pagerank: 0.0018
betweenness: 0.0004
eigenvector: 0.0582
degree: 6
community: 2
---

# Simulation (Chapter 12) — Textbook Problem Quiz

Exam-prep cards built on the **end-of-chapter problems** of Chapter 12 of the Anderson/Sweeney/Williams textbook.
The worked-example (PortaCom/Butler/Black Sheep) drills are in [[da-concepts/ch12-simulation/simulation-quiz]]; this file covers the **practice problems with changed numbers**.

Design principle: in each card, one **bolded decisive fact** changes the conclusion. A pair where the same technique produces a made-out/not-made-out (or split-value) result is placed together.
Not IRAC — a 4-part **Issue / Method / Application / Conclusion** structure. (Methodology borrowed from: [[law-concepts/quiz-methodology]])

---

## Decisive Fact → Conclusion (Summary Table)

| Problem | Decisive fact | Conclusion |
|------|------------|------|
| 1 | c₂ = $90, x = 20,000 (optimistic) vs c₂ = $100, x = 10,000 (pessimistic) | $1,280,000 vs $40,000 |
| 2 | What-if gives only the range; simulation provides **probability** | The probability of loss can be quantified |
| 3 | r = 0.9218 → interval [0.9, 1.0) | c₁ = $47 |
| 4 | r = 0.0336 → interval [0.0, 0.1) | c₁ = $43 |
| 5 | Uniform formula `a + r(b−a)`, r = 0.6221 | Parts cost = $92.44 |
| 6 | r = 0.8531 → z = +1.05 (**above** the mean) | Demand = 19,725 |
| 7 | r = 0.1762 → z = −0.93 (**below** the mean) | Demand = 10,815 |
| 8 | r = 0.7169 → interval [.40, .80) | 4 new accounts |
| 9 | Win-probability interval differs per game (r = 0.50: G1 win, G4 loss) | Conclusion flips by home/away |
| 10 | Each quarter applies the return to the **starting price** (compounding) | Closing price = $92.14 |
| 11 | Mean profit $6,000 + P(loss) 0.24–0.30 | Too risky → reject |
| 12 | Mean profit = P(win) × per-deal profit is the maximum | Recommend a $140,000 bid |

---

### Scenario 1 — Scenario Analysis: Optimistic vs Pessimistic Profit (Problem 1)

PortaCom model `Profit = (249 − c₁ − c₂)x − 1,000,000`. The engineer proposed parts cost c₂ = $90 and first-year demand x = 20,000, while the financial analyst proposed c₂ = $100, x = 10,000. Both cases assume direct labor cost c₁ = $45.

**Q: What are the two profit estimates?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: A what-if calculation substituting fixed input scenarios into the model

**Method**:
```
Profit = (249 − c₁ − c₂) × x − 1,000,000
```

**Application**:
- Engineer: (249 − 45 − 90) × 20,000 − 1,000,000 = 114 × 20,000 − 1,000,000 = **$1,280,000**
- Financial analyst: (249 − 45 − 100) × 10,000 − 1,000,000 = 104 × 10,000 − 1,000,000 = **$40,000**

**Conclusion**: Engineer (optimistic) = **$1,280,000**, financial analyst (pessimistic) = **$40,000**

> **Exam tip**: Compute the unit margin (249−c₁−c₂) first, then multiply by demand, then deduct the fixed cost of $1,000,000 last. If margin and demand worsen at the same time, profit plunges — which is why a single point estimate is risky.

</details>

---

### Scenario 2 — Why Simulation: The Limits of What-If (Problem 1c)

The two scenarios above show possible profits from $40,000 to $1,280,000.

**Q: Is what-if scenario analysis alone sufficient? What does simulation additionally tell you?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: The essential difference between what-if (scenario) analysis and simulation

**Method**: Compare the outputs of the two techniques.
- What-if: a specific input combination → a single result (gives only the range)
- Simulation: repeatedly sample inputs from probability distributions → **a distribution of results + probabilities**

**Application**:
- What-if only says "both $40,000 and $1,280,000 are possible."
- **Simulation provides probability information for each profit level** → P(loss), P(profit > target), etc. can be computed.

**Conclusion**: What-if gives only the **range** of possibilities; simulation gives the **probabilities** within that range.

> **Exam tip**: "What-if is scenarios, simulation is probability." If a question asks about probability of loss, expected value, or distribution, the answer is always simulation.

</details>

---

### Scenario 3 — Determining c₁ via a Discrete Distribution Interval Table (Problem 3a, high-cost case)

PortaCom's direct labor cost c₁ is discretely distributed — $43(0.1), $44(0.2), $45(0.4), $46(0.2), $47(0.1). On one trial, the random number was **r = 0.9218**.

**Q: What is the value of c₁?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Map a random number to an interval based on cumulative probability in a discrete distribution

**Method**: Assign intervals by cumulative probability.
| c₁ | Probability | Random-number interval |
|----|------|-----------|
| $43 | 0.1 | [0.0, 0.1) |
| $44 | 0.2 | [0.1, 0.3) |
| $45 | 0.4 | [0.3, 0.7) |
| $46 | 0.2 | [0.7, 0.9) |
| $47 | 0.1 | [0.9, 1.0) |

**Application**:
- **r = 0.9218 ∈ [0.9, 1.0)** → c₁ = $47

**Conclusion**: c₁ = **$47/unit** (the highest labor cost, a 10%-probability tail event)

> **Exam tip**: Interval width = probability. Boundaries are lower-inclusive and upper-exclusive ([lower, upper)). ≥ 0.9 → $47.

</details>

---

### Scenario 4 — Determining c₁ via a Discrete Distribution Interval Table (Problem 3a, low-cost case)

On another trial of the same PortaCom simulation, **r = 0.0336** came up.

**Q: What is the value of c₁? (What differs from Scenario 3?)**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Same interval table, different random number → flipped result

**Method**: The interval table from Scenario 3, unchanged.

**Application**:
- **r = 0.0336 ∈ [0.0, 0.1)** → c₁ = $43
- (Scenario 3 had r=0.9218 → [0.9,1.0) → $47. Same table, only the random number differs)

**Conclusion**: c₁ = **$43/unit** (the lowest labor cost)

> **Exam tip**: If the random number is near 0, take the **first row** of the table (the smallest value); near 1, the last row. Don't memorize the cumulative-probability table — build the intervals by adding up on the spot.

</details>

---

### Scenario 5 — Uniform Distribution: Parts Cost (Problem 3b)

PortaCom's parts cost c₂ is uniform over $80–$100. Random number **r = 0.6221**.

**Q: What is the value of c₂?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Generate a value by formula from a continuous uniform distribution (not an interval table)

**Method**:
```
c₂ = a + r(b − a) = 80 + r(100 − 80) = 80 + 20r
```

**Application**:
- **c₂ = 80 + 20(0.6221)** = 80 + 12.44 = **$92.44**

**Conclusion**: c₂ = **$92.44/unit**

> **Exam tip**: A uniform distribution needs no table, just one formula. r=0 → minimum (a), r=1 → maximum (b).

</details>

---

### Scenario 6 — Normal Distribution: Above-Mean Demand (Problem 3c)

PortaCom's first-year demand is Normal(μ=15,000, σ=4,500). The random number r = 0.8531 corresponds to z = +1.05.

**Q: What is the value of demand x?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Generate a value via a z-value from a normal distribution

**Method**:
```
x = µ + zσ
```
(Excel: `=NORMINV(RAND(), 15000, 4500)` does the same)

**Application**:
- r = 0.8531 > 0.5 → **z = +1.05 (positive, above the mean)**
- **x = 15,000 + 1.05(4,500)** = 15,000 + 4,725 = **19,725**

**Conclusion**: Demand = **19,725 units** (above the mean)

> **Exam tip**: r > 0.5 → positive z → **above** the mean. r < 0.5 → negative z → **below** the mean. r = 0.5 → z = 0 → exactly the mean.

</details>

---

### Scenario 7 — Normal Distribution: Below-Mean Demand (Problem 3c, pair)

The same PortaCom demand distribution Normal(15,000, 4,500). The random number r = 0.1762 corresponds to z = −0.93.

**Q: What is the value of demand x? (How does the sign differ from Scenario 6?)**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Negative z → below-mean value

**Method**: `x = µ + zσ` (a negative z subtracts)

**Application**:
- r = 0.1762 < 0.5 → **z = −0.93 (negative, below the mean)**
- **x = 15,000 + (−0.93)(4,500)** = 15,000 − 4,185 = **10,815**

**Conclusion**: Demand = **10,815 units** (below the mean)

> **Exam tip**: Never drop the sign of z — in µ + zσ a negative z automatically **subtracts**. The same formula applies to Problem 7 (service time `15 + z(3)`): r=0.9821→z=2.10→21.30 min.

</details>

---

### Scenario 8 — Building a Probability Table Then Mapping (Problem 4, Gustin Seminar)

Distribution of the number of new accounts: 0(.01), 1(.04), 2(.10), 3(.25), 4(.40), 5(.15), 6(.05). First trial random number **r = 0.7169**.

**Q: Build the interval table and find the number of new accounts for this trial.**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Build a cumulative interval table from the given probabilities

**Method**: Accumulate the probabilities to set the interval boundaries.
| Accounts | Probability | Cumulative interval |
|------|------|-----------|
| 0 | .01 | [.00, .01) |
| 1 | .04 | [.01, .05) |
| 2 | .10 | [.05, .15) |
| 3 | .25 | [.15, .40) |
| 4 | .40 | [.40, .80) |
| 5 | .15 | [.80, .95) |
| 6 | .05 | [.95, 1.00) |

**Application**:
- **r = 0.7169 ∈ [.40, .80)** → **4** new accounts

**Conclusion**: 4 new accounts. (Note: over 10 trials, a total of 37 accounts → average fee $5,000 × 37 = $185,000, less seminar cost $35,000 → net contribution $150,000 → recommend continuing the seminar)

> **Exam tip**: Upper bound of an interval = previous cumulative sum + current probability. The widest interval (here 4 accounts, width 0.40) occurs most often.

</details>

---

### Scenario 9 — When the Probability Changes Each Trial (Problem 8, World Series)

In a best-of-seven series, Atlanta's win probability differs by game (home/away): G1 .60, G2 .55, G3 .48, G4 .45 …. Suppose in some game the random number **r = 0.50** came up.

**Q: Is r = 0.50 a win in G1? In G4?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: A simulation where the success interval **changes** each trial

**Method**: In game i, "Atlanta wins" is the interval [0, pᵢ). If r < pᵢ, it is a win.

**Application**:
- G1: win interval [0, .60). **r = 0.50 < 0.60 → win**
- G4: win interval [0, .45). **r = 0.50 ≥ 0.45 → loss**

**Conclusion**: The same r = 0.50 is a **win** in G1 but a **loss** in G4 — because the interval differs by game.

> **Exam tip**: If the probability changes each trial, redraw the interval table each trial. Estimate the series win probability by running the simulation **many times** as (number of Atlanta wins / total trials).

</details>

---

### Scenario 10 — Dynamic (Compounding) Calculation: Quarterly Stock Price (Problem 11)

The quarterly return is Uniform(−8%, +12%): `Return% = −8 + r(20)`. Starting price $80.00. Q1 r = 0.52 → +2.4%, Q2 r = 0.99 → +11.8%.

**Q: What is the stock price at the end of quarter 2? (Beware the common trap)**

<details>
<summary>▶ Model Answer</summary>

**Issue**: A stateful simulation — each period is based on the immediately preceding result

**Method**:
```
Ending price = Beginning price + Return% × Beginning price
Next quarter's Beginning price = the previous quarter's Ending price   ← key
```

**Application**:
- Q1: 80.00 + 0.024(80.00) = 80.00 + 1.92 = **$81.92**
- **Q2 applies to $81.92, not $80**: 81.92 + 0.118(81.92) = 81.92 + 9.67 = **$91.59**
- (Continuing to quarter 8, the closing price = **$92.14**)

**Conclusion**: End of quarter 2 = **$91.59** (applying twice to the starting price $80 would be wrong)

> **Exam tip**: In a dynamic simulation, each step's **previous output is the next input**. Stock price, inventory balance, and queues always update the running value. Continuing to use the original value ($80) is the biggest mistake.

</details>

---

### Scenario 11 — Decision from Simulation Results: Risk (Problem 14)

Result of simulating a new product 500 times: mean profit ≈ $6,000, and 120–150 of the 500 runs are losses → P(loss) ≈ 0.24–0.30.

**Q: Should this project go ahead? Compare with PortaCom (mean $710,000, P(loss) ≈ 0.10).**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Risk analysis considering mean profit and probability of loss together

**Method**: Evaluate the mean (expected value) and P(loss) simultaneously. Even if the mean is positive, a high probability of loss is risky.

**Application**:
- Mean profit $6,000 → positive but **small**
- **P(loss) ≈ 0.24–0.30 → a loss in 1 of every 3–4 runs** → very high
- PortaCom: mean $710,000, P(loss) ≈ 0.10 → large reward and low risk → acceptable

**Conclusion**: This project is **too risky** — the probability of loss is excessive relative to the small expected profit → reject it, or refine the variable-cost/demand estimates.

> **Exam tip**: "The mean is positive, so OK" is a trap. Look at the mean and P(loss) **as a pair**. For the same mean, accept if P(loss) is 0.10, reject if 0.30.

</details>

---

### Scenario 12 — Bidding Decision: By Mean Profit (Problem 16)

Result of 1,000 competitive-bidding simulations:

| Bid | Wins | Profit if won | Mean profit |
|--------|----------|-------------|----------|
| $130,000 | 340–380 | $30,000 | ≈ $10,800 |
| $140,000 | 620–660 | $20,000 | ≈ $12,800 |
| $150,000 | 1,000 | $10,000 | $10,000 |

**Q: Which bid do you recommend?**

<details>
<summary>▶ Model Answer</summary>

**Issue**: Trade-off between win probability and per-deal profit → maximize expected profit

**Method**:
```
Mean profit ≈ P(win) × (profit if won)
```
Choose the option with the maximum **mean profit** — neither the highest win probability nor the largest per-deal profit.

**Application**:
- $150,000: always wins but the lowest per-deal profit → mean $10,000
- $130,000: highest per-deal profit ($30,000) but low win rate → mean ≈ $10,800
- **$140,000: mean profit ≈ $12,800, the maximum**

**Conclusion**: **Recommend the $140,000 bid** (the balance point between win rate and per-deal profit)

> **Exam tip**: Not the "option that wins most often" nor the "option that earns the most per deal," but the option with the **maximum expected profit (probability × reward)**.

</details>

---

## Quick Formula Reference

| Situation | Formula / Rule |
|------|------------|
| Discrete distribution | Build an interval table by cumulative probability → map r ([lower, upper)) |
| Uniform distribution | `a + r(b − a)` |
| Normal distribution | `µ + zσ` (r>0.5→positive z, r<0.5→negative z) / Excel `=NORMINV(RAND(), µ, σ)` |
| Probability varies per trial | Rebuild the interval table each trial (e.g. World Series) |
| Dynamic/compounding calculation | Previous output = next input (stock price, inventory, queue) |
| Risk-analysis decision | Evaluate mean profit **and** P(loss) together |
| Bid/policy selection | Expected profit = P(success) × reward, choose the maximum |
| Probability estimation | (number of occurrences of the event of interest) / (total number of trials) |

---

## Connected Concepts

- [[da-concepts/ch12-simulation/simulation]] ← Chapter 12 concept summary (model structure, examples)
- [[da-concepts/ch12-simulation/simulation-quiz]] ← worked-example (PortaCom/Butler/Black Sheep) calculation drills
- [[law-concepts/quiz-methodology]] ← the decisive-fact→conclusion pair design methodology (common across subjects)
