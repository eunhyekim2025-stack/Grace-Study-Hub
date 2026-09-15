---
title: "Operations Management — Revision summary"
tags: [summary, auto-generated]
created: 2026-09-15
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

> [!summary] Key takeaways
- Match method to pattern: flat → SMA/WMA/ES; sloping → regression; repeating → seasonal factor; both → decomposition.  
- Exponential smoothing is the workhorse for stationary demand; tune α by lowest MAD/MSE.  
- Always report forecast error (MAD or MSE) and treat the number as an interval, not a certainty.  
- Aggregate forecasts when possible; the farther the horizon, the less reliable the forecast.  

## Forecasting – core methods

### Stationary series
> [!info] Stationary series = no trend, no season; demand fluctuates around a constant mean.  

- **Simple Moving Average (SMA)** – average of last N periods. Larger N = smoother, slower response.  
- **Weighted Moving Average (WMA)** – assign weights (sum = 1) to recent periods; more weight = quicker reaction.  
- **Exponential Smoothing (ES)** – $F_t = \alpha A_{t-1} + (1-\alpha)F_{t-1}$; only last forecast needed.  

> [!example] 3‑month SMA on 120, 110, 140 → 123.3; 5‑month SMA → 118.0; WMA (0.5,0.3,0.2) → 127.0; ES (α=0.3) → 118.2.  

### Trend – linear regression
> [!info] Fit $Y = a + bX$ by least squares; $X$ = period number.  

- Slope $b = \frac{\sum xy - n\bar{x}\bar{y}}{\sum x^2 - n\bar{x}^2}$  
- Intercept $a = \bar{y} - b\bar{x}$  
- Forecast = $a + b \times$ future period.  

### Seasonality – seasonal factor
> [!info] Seasonal factor $S_i = \frac{\text{avg demand in season }i}{\text{overall avg}}$, with $\sum_i S_i = \text{#seasons}$.  

- Forecast for season $i$ = (trend forecast) × $S_i$.  

### Decomposition (trend + season)
> [!info] Steps:
