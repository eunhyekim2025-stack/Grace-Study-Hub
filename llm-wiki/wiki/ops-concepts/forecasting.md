---
title: "Forecasting — Time-Series Demand Methods"
tags: [operations-management, opim201, forecasting, time-series, exponential-smoothing, seasonality, linear-regression]
sources: ["SMU OPIM 201 Session 6 — Forecasting"]
updated: 2026-08-19
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">Forecasting</div><div class="dc-sub">Read the past to predict demand — average, trend and season, then check the error</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Stationary</div><div class="dc-step-d">moving avg · weighted · exp. smoothing</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Trend</div><div class="dc-step-d">linear regression Y = a + bX</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Seasonality</div><div class="dc-step-d">seasonal factor = season avg ÷ overall avg</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Evaluate</div><div class="dc-step-d">pick lowest MAD / MSE</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>Two families of method</h2><span class="dc-hint">this class = quantitative time series</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Quantitative</div>From <b>historical data</b>: time series (stationary, trend, seasonal), causal relationships, simulation.</div>
<div class="dc-card"><div class="dc-eyebrow">Qualitative</div>From <b>expert judgement</b>: grass-roots (bottom-up), market research, historical analogy, panel consensus, <b>Delphi</b>.</div>
</div>
<div class="dc-callout">A <b>time series</b> is historical data assumed to keep the same pattern. Its components: <b>average · trend · seasonal/cyclical · autocorrelation · randomness</b>. The job is to separate these, project each, and recombine.</div>
</div>

# Forecasting — Time-Series Demand Methods

> [[operations-management|← Operations Management]] · Forecasts drive capacity planning, production scheduling, inventory, budgeting and marketing. Getting it wrong is expensive — Apple lost ~US$190 B of market cap in 5 weeks when iPhone XR sales missed forecast; a BTS mention emptied two months of Downy stock in a day.

---

## Stationary series — demand = constant + noise

> [!info] "Stationary" in plain words
> A series is **stationary** when it has **no trend and no season** — it wanders around a fixed level and keeps coming back to it. Monthly sales of toothpaste: some months up, some down, but no direction. The opposite is a series that is *going somewhere* (trend) or that *repeats a shape* every year (seasonality), and those need different tools.
>
> The practical test is to plot it. If a straight ruler laid on the plot is flat, treat it as stationary.

When demand just reverts to a mean, use one of three:

| Method | Rule | Notes |
|---|---|---|
| **Simple moving average (SMA)** | average of the last $N$ periods | large $N$ = smoother but slower to react; small $N$ = jumpy |
| **Weighted moving average (WMA)** | weighted average of last few periods, **weights sum to 1** | more weight on recent data; SMA is the equal-weight special case |
| **Exponential smoothing (ES)** | see formula below | needs only the last forecast + last actual |

### Worked example — all three on one dataset

Monthly demand for six months:

| Month | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Demand | 100 | 130 | 90 | 120 | 110 | 140 |

**Forecast month 7.**

| Method | Calculation | Forecast |
|---|---|---|
| **3-month SMA** | $(120+110+140)\div3$ | **123.3** |
| **5-month SMA** | $(130+90+120+110+140)\div5$ | **118.0** |
| **WMA**, weights 0.5 / 0.3 / 0.2 on months 6 / 5 / 4 | $0.5(140)+0.3(110)+0.2(120)$ | **127.0** |
| **Exponential smoothing**, $\alpha=0.3$ | run below | **118.2** |

The exponential-smoothing run, starting from $F_1 = A_1 = 100$ and applying $F_t = F_{t-1} + \alpha(A_{t-1}-F_{t-1})$ each month:

| $t$ | $F_{t-1}$ | $A_{t-1}$ | error | $F_t = F_{t-1} + 0.3 \times$ error |
|---|---|---|---|---|
| 2 | 100 | 100 | 0 | 100.0 |
| 3 | 100.0 | 130 | +30.0 | 109.0 |
| 4 | 109.0 | 90 | −19.0 | 103.3 |
| 5 | 103.3 | 120 | +16.7 | 108.3 |
| 6 | 108.3 | 110 | +1.7 | 108.8 |
| **7** | 108.8 | 140 | +31.2 | **118.2** |

> [!tip] What the four numbers tell you
> - **The 3-month SMA (123.3) reacts harder than the 5-month one (118.0)** — a short window throws away the old low months, so it chases the recent jump. Longer window = smoother = slower.
> - **The WMA is the highest (127.0)** because it puts half its weight on the single most recent month, which happened to be the peak. That is the risk of weighting recency heavily: you inherit the last month's luck.
> - **Every method lags a turning point.** Forecast month 6 with a 3-month SMA and you get $(90+120+110)/3 = 106.7$ against an actual of **140** — a miss of 33. No averaging method can see a jump coming; it can only notice one after it has happened. This lag is the price of smoothing, not a bug you can tune away.

### Exponential smoothing

$$F_t = \alpha A_{t-1} + (1-\alpha)F_{t-1} = F_{t-1} + \alpha\underbrace{(A_{t-1}-F_{t-1})}_{\text{last forecast error}}$$

- $\alpha$ (smoothing constant, 0–1) sets how hard the forecast reacts. $\alpha=0$ → ignore new data (follow old forecast); $\alpha=1$ → chase last period's actual (dangerous if demand is random — a high period is often followed by a low one).
- **Advantages:** surprisingly accurate, tiny data footprint, easy to compute. Needs a starting forecast (often last period's actual).

*Worked:* start $F_{2006}=471.07$ (the 2005 actual); with $A_{2006}=468.96$ and $\alpha=0.05$:
$$F_{2007} = 471.07 + 0.05\,(468.96-471.07) = 471.07 - 0.11 = \mathbf{470.96}$$

### Choosing a method — forecast error

$$e_t = A_t - F_t, \qquad MAD = \frac{1}{n}\sum|e_t|, \qquad MSE = \frac{1}{n}\sum e_t^{2}$$

MAD is the average size of the miss; **MSE squares the errors so it punishes large misses** harder. Pick the method/parameter with the **lowest** MAD or MSE (e.g. an ES with $\alpha=0.05$, MAD ≈ 8.3, beats $\alpha=0.2$, MAD ≈ 8.7).

---

## Trend — linear regression

Fit $Y = a + bX$ by **least squares** — the line that makes the **sum of the squared vertical gaps** between the line and the actual points as small as possible. (Squared, so that a miss above and a miss below cannot cancel out, and so that one big miss counts for more than several small ones — the same reason MSE punishes large errors.) $X$ = the period number, numbered **consecutively** 1, 2, 3 …:

$$b = \frac{\sum xy - n\,\bar{x}\,\bar{y}}{\sum x^{2} - n\,\bar{x}^{2}}, \qquad a = \bar{y} - b\,\bar{x}$$

Then extrapolate: forecast for a future period = $a + b\,(\text{its period number})$. (In practice, run it in Excel.)

---

## Seasonality — the seasonal factor

A **seasonal factor** rescales the average up or down for each recurring season:

$$S_i = \frac{\text{average demand in season } i}{\text{overall average demand}}, \qquad \sum_i S_i = (\text{number of seasons})$$

Forecast for a season = (forecast of the average) × its seasonal factor. *Example:* quarters with overall average 2779; Summer averages 3050, so $S_{\text{summer}} = 3050/2779 = 1.10$ (Summer runs ~10% above the year's average).

---

## Trend + seasonality together — the decomposition method

When **both** a trend and a season are present: **separate them, project each, recombine.**

1. **De-seasonalize** — divide each actual by its seasonal factor ($A_i / S_i$) to strip the season out.
2. **Trend** — run linear regression on the de-seasonalized series.
3. **Re-seasonalize** — multiply each trend forecast back by the season's factor.

*Worked (12 quarters → forecast Q13–16).* Seasonal factors $S_1{=}0.82,\ S_2{=}1.10,\ S_3{=}0.97,\ S_4{=}1.12$. Regression on the de-seasonalized demand gives $b=342.2,\ a=554.9$. So for Q14: trend $= 554.9 + 342.2\times14 = 5345.7$, then re-seasonalize $\times S_2$: $5345.7\times1.10 \approx \mathbf{5880}$. (Q15 ≈ 5517, Q16 ≈ 6754.)

---

## Four principles that hold for every forecast

Worth internalising before trusting any number above.

| # | Principle | What it changes about your behaviour |
|:--:|---|---|
| 1 | **Every forecast is wrong.** | Never report a bare number. Report the number **and its expected error** (MAD/MSE) — a forecast of 500 ± 10 and one of 500 ± 300 support completely different decisions. |
| 2 | **Aggregate forecasts are more accurate than detailed ones.** | Total store sales are far easier to predict than sales of one SKU in one colour, because individual errors **cancel**. Forecast at the level you can, then split down. |
| 3 | **Short horizons beat long ones.** | Accuracy decays with distance. So **delay commitments** as long as you can — this is exactly why assemble-to-order beats make-to-stock when demand is uncertain (→ [[process-analysis]]). |
| 4 | **A forecast is not a target.** | "What we think will happen" and "what we want to happen" are different objects. Merging them is how a sales quota quietly becomes the demand plan, and how [[m08-budgeting|every budget beneath it]] inherits the error. |

> [!tip] Principle 2 is a cousin of pooling
> Aggregating demand and [[waiting-line-management|pooling servers]] are **related pooling effects**, and both are worth recognising as "combining things smooths variation" — but the mechanisms differ, so do not treat them as one theorem:
>
> | | Aggregate forecasting | Pooled queues |
> |---|---|---|
> | What is combined | **demand streams** | **servers and their queue** |
> | Why it helps | partially independent errors **cancel** in the sum | idle capacity can immediately take the **next arrival**, so no server sits idle while someone waits |
> | The gain is in | forecast **accuracy** | waiting **time** |

---

## Key takeaways

- Match the method to the **pattern**: flat → moving average / exponential smoothing; sloping → regression; repeating → seasonal factors; both → decomposition.
- **Exponential smoothing** is the workhorse — accurate, cheap, minimal data; tune $\alpha$ by MAD/MSE.
- Never blindly **follow last period's demand** (that is ES with $\alpha=1$) when demand is random — the error explodes.
- Always **validate with an error metric** (MAD or MSE) before trusting a forecast.

## Related notes

- [[waiting-line-management]] — a forecast feeds the staffing plan (seasonality vs variability); the [[m08-budgeting|budget]] starts from a sales forecast
- [[line-balancing]] — the target production rate a line is balanced to comes from a demand forecast
- [[m08-budgeting|MA · Budgeting]] — every budget begins with the sales forecast
