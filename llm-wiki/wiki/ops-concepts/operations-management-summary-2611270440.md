---
title: "Operations Management — Revision summary (forecasting, newsvendor, mrp-erp, spc, esg-supply-chain)"
tags: [summary, auto-generated]
created: 2026-11-27
---

> [!summary] Key takeaways  
- Forecasting translates historical demand and external signals into actionable plans for capacity, staffing, budgeting, and risk mitigation.  
- Choose the simplest method that fits the demand pattern (SMA → WMA → Exponential Smoothing → AI); only move to a more complex technique when it demonstrably reduces error.  
- Validate every model with error metrics (MAD, MSE, MAE); the method with the lowest average error over a robust validation horizon is the one to adopt.  
- Seasonal and trend components must be isolated: de‑seasonalize, fit a trend line, then re‑seasonalize to capture recurring spikes and underlying growth.  
- Linear regression (y = A + Bx) provides the optimal trend line by minimizing squared deviations; Excel’s `INTERCEPT` and `SLOPE` functions automate the calculation.  
- External data (e.g., Google Trends) can improve forecasts but require periodic re‑validation because correlations decay over time.  
- Document α, window sizes, seasonal indices, and error‑metric results to ensure auditability and smooth model updates.  

## OPS 6-1 — Forecasting Fundamentals  

### Theory & concepts  
- **Data collection** – Gather historical sales, usage statistics, and relevant external indicators (e.g., search‑trend indices).  
- **Method selection** – Decide among Simple Moving Average (SMA), Weighted Moving Average (WMA), Exponential Smoothing, or AI/Big‑Data models based on data length, desired responsiveness, and implementation effort.  
- **Model validation** – Compute forecast errors (MAD, MSE, MAE) on a hold‑out or rolling‑window sample; adjust parameters (α, weights, window size) to minimize the chosen error metric.  
- **Operational deployment** – Translate the selected forecast into capacity sizing, labor planning, budgeting, and risk‑management buffers.  

### Key terms  

| Term | Meaning |
|------|---------|
| **α (alpha)** | Smoothing factor in exponential smoothing (0 ≤ α ≤ 1); lower α gives more weight to past forecasts, higher α emphasizes the latest observation. |
| **SMA** | Simple Moving Average; arithmetic mean of the last *n* periods with equal weights. |
| **WMA** | Weighted Moving Average; recent periods receive higher pre‑assigned weights that sum to 1. |
| **MAD** | Mean Absolute Deviation; average of absolute forecast errors, treating all deviations equally. |
| **MSE** | Mean Squared Error; average of squared forecast errors, penalizing larger deviations more heavily. |
| **MAE** | Mean Absolute Error; synonymous with MAD, often reported for comparability with industry benchmarks. |
| **Red line** | The projected forecast trajectory (the “line” extended into future periods) used for capacity and financial planning. |
| **Focus error** | The discrepancy between a set target (focus) and the actual measured value; minimized by selecting an appropriate error metric. |

### Cases & examples  
- **Google‑trend vs. sales (2005‑2009)** – Demonstrated a strong positive correlation that weakened after 2009, illustrating the need to re‑validate external signals regularly.  
- **Electricity usage forecasting** – Quarterly household consumption combined with a 5‑year market‑share outlook guided fuel procurement and long‑term grid‑storage decisions.  

### Beyond the textbook  
- Lecture emphasized starting with SMA and only progressing to more sophisticated models when error reduction justifies added complexity.  
- Practical tip: test a range of α values (0.1‑0.5) and retain the one yielding the lowest MAE/MSE; record the chosen α for audit trails.  

## OPS 6-2 — Forecasting Overview (Stationary, Seasonal, Trend)  

### Theory & concepts  
- **Stationary methods** – Apply when demand shows no clear trend or seasonality; typically a moving‑average forecast.  
- **Seasonal methods** – Multiply a base forecast by a seasonal factor (season‑average ÷ overall average) and optionally a growth multiplier for forward periods.  
- **Trend methods** – Use linear regression (y = A + Bx) to capture steady upward or downward movement; the least‑squares line minimizes Σ(observed − predicted)².  
- **Method‑matching rule** – Select the forecasting family that mirrors the observed pattern; never rely on raw prior‑year demand if the pattern has shifted.  

### Key terms  

| Term | Meaning |
|------|---------|
| **Stationary method** | Forecast based on moving average, assuming demand is level with no trend or seasonality. |
| **Seasonal factor** | Ratio of a season’s average demand to the overall average; used to scale the base forecast for each season. |
| **Linear regression** | Trend model y = A + Bx where A is the intercept and B the slope; fitted by minimizing squared errors. |
| **Istikamah** | Principle of consistency; apply the chosen forecasting method uniformly across periods. |
| **P** | Ratio equal to one fourth, used in a specific example (context‑specific). |
| **Maha grauza** | Mentioned term without detailed definition in the notes. |

### Cases & examples  
- **Seasonal factor calculation** – Overall average demand = 1 390 units; Q1 average = 1 247 units → factor ≈ 0.90, indicating a 10 % dip in winter.  
- **Growth adjustment** – Applying an 18 % growth rate to the overall average yields a base forecast of 1 408 units for the next period.  
- **Quarterly forecast example** – Q2 2018 forecast = 1.048 × 1.408 ≈ 1.48 (seasonal multiplier × growth‑adjusted base).  

### Beyond the textbook  
- Instructor’s “Istikamah” reminder stresses disciplined, repeatable application of the selected method throughout the planning horizon.  
- Exam guidance: report intermediate calculations to four decimal places, final answers to two; method correctness outweighs minor rounding differences.  

## OPS 7-1 — Seasonal Forecasting Workflow  

### Theory & concepts  
1. **Detect seasonality** – Group observations by the repeating cycle (e.g., quarters), compute average residuals after removing any underlying trend.  
2. **De‑seasonalize** – Subtract the seasonal index from each observation, producing a series that reflects pure trend and random variation.  
3. **Trend regression** – Fit a linear regression line to the de‑seasonalized data to capture the underlying growth or decline.  
4. **Re‑seasonalize** – Add the appropriate seasonal factor back to each period’s trend forecast, yielding the final demand forecast.  

- **Data cleaning** – Exclude outliers that do not share the current operating condition; they distort both seasonal indices and trend slope.  
- **Inventory cost link** – Holding cost typically 30‑40 % of item value; the periodic order quantity (POQ) model balances ordering frequency against cycle‑stock to minimize total cost.  

### Key terms  

| Term | Meaning |
|------|---------|
| **Seasonal index** | Multiplicative factor representing the relative strength of a season (e.g., 0.82 for Q1). |
| **De‑seasonalized series** | Demand data after removal of seasonal effects, used for pure trend analysis. |
| **Trend line** | Linear regression equation forecasting the underlying demand trajectory absent seasonality. |
| **POQ model** | Periodic Order Quantity model that determines optimal order size to minimize holding + ordering + backorder costs. |
| **Holding cost** | Cost of carrying inventory, often expressed as a percentage of the item’s unit value. |

### Cases & examples  
- **Quarterly sales example** – Seasonal indices: Q1 = 0.82, Q2 = 1.12, Q3 = 0.95, Q4 = 1.11. Trend line: `Forecast = 554.9 + 242.2 × Period`. For Period 5 (next Q1): Trend = 1 765.9 → Final forecast ≈ 1 765.9 × 0.82 = 1 448 units.  
- **Outlier impact warning** – Using low‑demand outliers as the base leads to systematic under‑forecasting and potential stock‑outs.  

### Beyond the textbook  
- Lecture highlighted the importance of “clean, condition‑matched data” before model fitting; students were instructed to build a “formation” dataset reflecting the desired future operating condition.  
- Emphasis on communicating the forecast (trend + seasonal components) clearly to stakeholders to avoid misinterpretation.  

## Key formulas  

| Formula | Description | Symbols |
|---------|-------------|---------|
| **Simple Moving Average (SMA)** | Average of the last *n* observations | \( \text{SMA}_t = \frac{1}{n}\sum_{i=0}^{n-1} D_{t-i} \) |
| **Weighted Moving Average (WMA)** | Weighted average where recent periods have higher importance | \( \text{WMA}_t = \sum_{i=0}^{n-1} w_i D_{t-i} \), \( \sum w_i = 1 \) |
| **Exponential Smoothing** | Recursive forecast that blends latest actual with previous forecast | \( F_{t+1} = \alpha D_t + (1-\alpha)F_t \) |
| **Mean Absolute Deviation (MAD)** | Average absolute forecast error | \( \text{MAD} = \frac{1}{N}\sum_{t=1}^{N} |D_t - F_t| \) |
| **Mean Squared Error (MSE)** | Average squared forecast error | \( \text{MSE} = \frac{1}{N}\sum_{t=1}^{N} (D_t - F_t)^2 \) |
| **Seasonal factor** | Ratio of season‑average to overall average | \( S_j = \frac{\overline{D}_j}{\overline{D}} \) |
| **Linear regression (trend)** | Least‑squares line fitting demand over time | \( y = A + Bx \) where \( B = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sum (x_i-\bar{x})^2} \) and \( A = \bar{y} - B\bar{x} \) |
| **Re‑seasonalized forecast** | Combine trend forecast with seasonal index | \( F_{t}^{\text{final}} = (A + Bx_t) \times S_{j(t)} \) |
| **POQ optimal order quantity** (simplified) | Balances holding and ordering costs over a fixed review period | \( Q^* = \sqrt{\frac{2DS}{h(1 - d/p)}} \) where *D* = demand per period, *S* = ordering cost, *h* = holding cost per unit, *d* = demand rate, *p* = production rate. |

*All symbols are defined in the table; where a symbol appears in multiple formulas (e.g., *D* for demand), the meaning remains consistent.*
