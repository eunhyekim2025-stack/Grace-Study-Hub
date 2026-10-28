---
title: "Newsvendor Model — Ordering Under One-Shot Demand Uncertainty"
tags: [operations-management, opim201, inventory, newsvendor, critical-ratio, service-level, safety-stock, revenue-management]
sources: ["SMU OPIM 201 Session 10 — Inventory Management: The Newsvendor Model (Cachon & Terwiesch, Ch. 14 & 15)"]
updated: 2026-10-28
kind: 개념
relations:
  part-of: [operations-management]
  see-also: [ops-concepts/forecasting, ops-concepts/ops-7-2]
---

<div class="dc-view">
<div><div class="dc-title">The Newsvendor Model</div><div class="dc-sub">One season, one order, random demand — how much to bet before you know the number</div></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Order too much</div>Left-over stock at season end → <b>overage cost C<sub>o</sub></b> = cost − salvage</div>
<div class="dc-card"><div class="dc-eyebrow">Order too little</div>Lost sales → <b>underage cost C<sub>u</sub></b> = price − cost</div>
</div>
<div class="dc-callout">Balance the two with the <b>critical ratio</b>: order up to the quantity where the in-stock probability equals <b>C<sub>u</sub> ⁄ (C<sub>u</sub> + C<sub>o</sub>)</b>.</div>
<div class="dc-section"><span class="dc-num">★</span><h2>Normal-demand shortcut</h2><span class="dc-hint">the exam workhorse</span></div>
<div class="dc-callout ok"><b>Q* = μ + z·σ</b>, where z is read from the standard-normal table at service level C<sub>u</sub>/(C<sub>u</sub>+C<sub>o</sub>). The term <b>z·σ is the safety stock</b>.</div>
</div>

# Newsvendor Model — Ordering Under One-Shot Demand Uncertainty

> [[operations-management|← Operations Management]] · The inventory model for a **single selling season** with **one** order. Pairs with [[ops-concepts/ops-7-2|EOQ]] (the model for *repeated*, steady demand) and starts from a demand forecast (→ [[ops-concepts/forecasting|Forecasting]]).

---

## What the newsvendor model is

A setting with **one selling season** and **one procurement opportunity**, placed well *before* the season — you receive the whole order before demand is seen. It fits products with a **short life cycle**: newspapers and magazines, fashion, seasonal goods (Christmas trees, toys), fresh food, blood banks.

- **Demand is random**; left-over inventory at season end may be **salvaged** for less than cost.
- **The decision is the order quantity $Q$.** The fixed/ordering cost is inconsequential (there is only one order), so it does not enter the trade-off.
- **The "too much / too little" problem:** order too much → stock left over; order too little → sales lost.

> [!tip] The model is bigger than newspapers
> Its real structure is: **an uncertain quantity · a bet made before the quantity is revealed · a consequence for getting the bet wrong.** That covers how much food to order for a party, cell-phone plan minutes, production capacity for a new product, team size for a project, and a hedge fund's cash reserve.

---

## Overage vs underage costs — the two sides of the bet

| Cost | Meaning | For the newsvendor |
|---|---|---|
| **Overage cost $C_o$** | The loss from ordering a unit that is **not** sold — the extra profit you would have kept by ordering one *fewer* | **$C_o =$ cost $−$ salvage** |
| **Underage cost $C_u$** | The opportunity cost of **not** ordering a unit that could have sold — the profit you would have gained by ordering one *more* | **$C_u =$ price $−$ cost** |

$C_o$ is the unit cost of **over**-estimating demand; $C_u$ is the unit cost of **under**-estimating it.

---

## The critical ratio (newsvendor fractile)

For **any** continuous demand distribution $F$, the optimal $Q^*$ (minimising expected overage + underage cost) satisfies

$$F(Q^*) \;=\; P(D \le Q^*) \;=\; \frac{C_u}{C_u + C_o} \qquad\text{(the critical ratio / newsvendor fractile)}$$

- $F(Q^*)$ is the **in-stock probability** — the chance all demand is met from the order, i.e. the **service level**. So the critical ratio *is* the **optimal in-stock probability**.
- $1 - F(Q^*) = P(D > Q^*)$ is the **stock-out probability**.
- The **larger $C_u$** (losing a sale hurts more), the **higher** the optimal service level; the larger $C_o$, the lower it.

---

## Normal-demand shortcut — the exam workhorse

When demand is Normal, $D \sim N(\mu, \sigma)$:

$$\boxed{\,Q^* = \mu + z\,\sigma\,}, \qquad z = z_{\,C_u/(C_u+C_o)} \text{ read from the standard-normal table}$$

- **$z\,\sigma$ is the safety stock** — the buffer held against demand uncertainty.
- Safety stock rises with **① the degree of uncertainty $\sigma$** and **② the target service level** (via $z$).
- **$z$ can be negative** — when the critical ratio is below 0.5, the optimal order is *below* the mean.

> [!important] The round-up rule
> If the critical ratio falls **between** two table entries, pick the entry that gives the **greater** order quantity (round the service level up). Example: $0.54380 < 0.545 < 0.54776$, so use $F(z)=0.54776 \Rightarrow z \approx 0.12$.

---

## Worked example 1 — the SMU Fashion Store

Cost $c=\$10$, price $r=\$16$, salvage $s=\$5$; demand $\sim N(\mu=100,\ \sigma=4.47)$.

- $C_o = 10 - 5 = 5$, $C_u = 16 - 10 = 6$
- Critical ratio $=\dfrac{6}{6+5}= 0.545$ → from the table $z_{0.545}\approx 0.12$
- $Q^* = 100 + 0.12 \times 4.47 \approx \mathbf{100.5}$

*Why is $Q^*$ so close to the mean?* Because $C_u \approx C_o$, the critical ratio is near **0.5**, so the optimal order sits almost at the forecast.

---

## Worked example 2 — airline overbooking (the clever reframe)

A flight will sell out. On average **25 passengers no-show** ($\sigma=15$). A ticket earns $\$125$; bumping an overbooked passenger costs $\$250$. How many seats to overbook?

> [!note] What is "demand" here?
> The uncertain quantity is the **number of no-shows**, so we order (overbook) against *that*. $C_u$ = lost ticket revenue from under-booking $=\$125$; $C_o$ = bumping compensation from over-booking $=\$250$.

- Critical ratio $=\dfrac{125}{125+250}= 0.33$ → $z_{0.33}\approx -0.43$ (below 0.5 ⇒ negative $z$)
- $Q^* = 25 + (-0.43)(15) \approx 19$ → **overbook by about 19 seats.**

---

## Using the empirical (discrete) distribution instead

Rather than fit a Normal, you can build the demand distribution straight from history: tabulate each demand value's frequency → $P(D=d)$ → the cumulative $P(D\le d)$. Then **$Q^*$ is the smallest $d$ whose cumulative probability reaches the critical ratio** (round up). For the fashion store ($0.545$), read down the $P(D\le d)$ column to the first entry $\ge 0.545$.

---

## Beyond ordering — revenue management

**Revenue management** maximises revenue from a **fixed, perishable** resource (airline seats, hotel rooms, concert tickets) by *influencing* demand rather than just forecasting it — through **price discrimination** and **capacity control**. Common features: fixed perishable supply, a finite selling season, sunk fixed costs with small marginal costs (hence "revenue" is the lever), uncertain demand, and heterogeneous customers (the more valuable often arrive later).

| Newsvendor term | Hotel last-minute reservation |
|---|---|
| Unit cost | Bargain (advance) rate |
| Selling price | Premium (last-minute) rate |
| Stock too few → miss sales | Reserve too few rooms → miss premium guests |
| Stock too many → money wasted | Reserve too many → revenue lost on empty rooms |

---

## Key insights

- **Losses happen even at the optimum** — some mismatch is unavoidable. Improve it by: better forecasts, shaping demand in-season (dynamic pricing, promotions), finding **reactive supply** to cut underage, or discount outlets/transshipment/recycling to cut overage.
- **Ordering the average (the forecast) is optimal *only* when $C_o = C_u$** (critical ratio $=0.5$). Otherwise $Q^*$ is pulled above or below the forecast.
- **Two products with the same forecast can need different orders** — the cost structure, not the mean, sets the quantity. Always check intuition against the model.

## Related notes

- [[ops-concepts/ops-7-2|EOQ & Order Planning]] — the inventory model for **repeated** orders under steady demand (contrast: newsvendor is one-shot)
- [[ops-concepts/forecasting|Forecasting]] — supplies the demand mean and standard deviation the model needs
- [[ops-concepts/waiting-line-management|Waiting Line Management]] — the other place demand variability drives the decision
