---
title: "OPS 7-1 — Seasonal Forecasting Workflow"
tags: ["lecture", "recording"]
sources: ["In-class recording — OPS 7-1 (2026-10-01, in-site recorder / Groq transcript)"]
kind: 개념
relations:
  part-of: [operations-management]
created: 2026-10-01
recording:
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-000-F7d2Ac0JV4oF0oTGJmvkIPL0rbzT4t.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-001-W3IByV6P1kPNyVRFHE18uonjsPqX0F.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-002-fYFEgRhPHio1y3sefLoPynoHNjiAH1.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-003-UDTQix3hUAKDEuX71nYBlAJB8adimE.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-004-wVrXFIEC6WqYxZii9xxpunjalSgfPf.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-005-mKx4CBusuGE0FfFYQ69EsV7vhLoiky.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-006-BLN6UrU6HZbdXA60uRcQfjRave3onS.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-007-TZFdKUvCEqxSvfl1KmahKRhJmVzsbN.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-008-5G8Akc5MJpmjel869pA6DIRsRRkdyK.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-009-cWkYcyVwrAZOYO68S8kzdTcqZQIfGv.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-010-HWsYsPTTEBHXULrPkPl8VF5Z1q0akz.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-011-nkyog5MVZkgeyl3ZYGJNL7T4XRPdGf.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-012-TjE1S1FG88c6Use0Vm1bY7HnETAxid.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-013-CY2fy0V6AQgoEaxckgcnjx9sWXa5XR.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-014-zQMaMfiJrkE6jMT3u09qq5TwYaJq7L.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-015-9eNSiUDIhPfQFH00Zpz0ev94sI8STg.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-016-3qHTxDqoaUoNZVRTHDuqHUjizzzmdS.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-017-tk648pOfv2zJIsiNtO4kSFPBXtghHQ.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-018-3gV3Y0TCuuBom8AUWcv8c1bYpSWGQi.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-019-sq76FngWZruikPwICHpmBG81QOAKTK.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-020-mWQm72GnEXdnDqjHPjHELLNe5x0EKm.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-021-x077m5fSaVDDrTbR56WQWgF8zgeTxr.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-022-0abCr3lW4jUBKRnbLyk162faIA97lD.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-023-R4KEQiQ0npIag5hjssbtaL8fpswvjF.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-024-fREmdfS3NtDe3sFZwuekHXvB3Uv2Sy.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-025-ydXTKYTGeZArNZRI8eUH8BhorAu16n.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-026-5etyIjgBAzsDUsXKLJNpV2zqdOcH4W.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-027-fTTLn2mqCrkuQDqVzlOMgVInm4CvHq.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-028-pV7uV9NnSuZflzypD4E0jbqJzBrGXF.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-029-qouMGiE96ipMC8HlEIDsKP0pAigHFS.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-030-xo5dkVLj8B6yH9h4oZo262zyROSe0o.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-031-f9pj8ph5Mac5GXCG0vfwmZgbFxZB53.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-032-9vnlI4GCALKEua9FnJo3P4AjTTwzen.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-033-RgJw61kPVpkFVrWAt68dlgtlzpZ7mc.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-034-dUHZAQW15SIbTxfsEat5kRVhGwGgmD.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-035-g3IfmFUxejj7sHjLJvEwgxRceGzdyH.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-036-5tXOeZZBJtkSfY6GS0pYLllvBikZou.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-037-kB5P3fu1raDBukfd4ZutuNhrMBywI0.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-038-K5c90BjQQLBZwBzI6o1xhKYDeX8Wvm.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-039-rDgxFXZrW5SViRvyVIr3mA8c5d3RfV.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-040-6f9rnChnsyrA0zkZf0jJ8kfS4Cx0s9.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-041-L1MWMVDcjWbK53cIWWCXYQ6vTtpI65.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-042-4KfyYk6veCqBhivTgbnvhXbooDx4Jo.webm"
  - "recordings/operations-management/2026-10-01-ops-7-1/seg-043-oo6a0hTNOzlTlA7JcyUC3Pq6Y913ch.webm"
---

> [!note] 🎙️ Original recording archived privately (44 segments) in your Vercel Blob store — not published here.

<div class="dc-view"><div class="dc-title">Seasonal Forecasting Workflow</div><div class="dc-sub">Isolate trend, handle seasonality, produce final forecast</div><div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Detect Seasonality</div><div class="dc-step-d">Group data by cycle, compute average residuals</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">De‑seasonalize</div><div class="dc-step-d">Subtract seasonal indices from observations</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Trend Regression</div><div class="dc-step-d">Fit linear model to cleaned data</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Re‑seasonalize</div><div class="dc-step-d">Add seasonal factors back to trend forecast</div></div></div></div>

> [!summary] Key takeaways  
- Separate trend and seasonal components; forecast each then recombine.  
- Use clean, condition‑matched data; discard outliers that distort the trend.  
- Inventory cost = holding + ordering + backorder; holding cost often 30‑40 % of item value.  
- POQ model balances order size vs. cycle‑stock to minimise total cost.  
- Consistency, verification, and clear communication are essential for reliable forecasts.

## 1. Seasonal Forecasting Process  

- **Step 1 – Identify seasonality**  
  > [!info]  
  > *Seasonal cycle length* = number of periods after which pattern repeats (e.g., 4 for quarterly data).  

- **Step 2 – Compute seasonal indices**  
  - Fit a linear trend (least‑squares).  
  - Residual = Observed − Trend.  
  - Average residuals for each position in the cycle → seasonal factors.  

- **Step 3 – De‑seasonalize & regress**  
  - Subtract seasonal indices from original data.  
  - Apply linear regression to the de‑seasonalized series (Excel formula `=INTERCEPT(range,range)` & `=SLOPE(range,range)`).  

- **Step 4 – Re‑seasonalize**  
  - Forecast trend forward.  
  - Add the appropriate seasonal factor for each future period.  

> [!example]  
> *Quarterly sales* (Q1‑Q4) → seasonal factors 0.82, 1.12, 0.95, 1.11.  
> Trend line: `Forecast = 554.9 + 242.2 × Period`.  
> For Period 5 (Q1 next year): Trend = 554.9 + 242.2·5 = 1765.9 → Final = 1765.9 × 0.82 ≈ 1448.

> [!warning]  
> Ignoring seasonality produces a monotonic line that misses demand spikes, leading to stock‑outs or excess inventory.

### Quick reference table

| Cycle position | Seasonal index (example) |
|----------------|--------------------------|
| 1 (Q1)         | 0.82                     |
| 2 (Q2)         | 1.12                     |
| 3 (Q3)         | 0.95                     |
| 4 (Q4)         | 1.11                     |

## 2. Data Cleaning & Scenario Selection  

- Remove **non‑homogeneous** outliers that do not share the current condition; they bias the trend.  
- Prefer **higher‑level trends** (overall direction) over short, noisy segments.  
- Build a “formation” dataset that reflects the desired operating condition before feeding it to the model.  

> [!warning]  
> Using low‑demand outliers as the forecast base under‑estimates future needs; project above the observed low point.

## 3. Inventory Cost Fundamentals  

| Cost type      | Typical share of total cost | Key drivers |
|----------------|----------------------------|-------------|
| Holding (capital) | 30 %–40 % | Capital tied up, storage, opportunity cost |
| Ordering (transport) | Variable | Fixed shipping fee, order frequency |
| Backorder      | Situation‑dependent | Lost sales, customer dissatisfaction, extra logistics |

- **Holding cost definition**: any cost proportional to the time a unit stays in the system.  
- **Backorder cost** occurs when demand cannot be met immediately; includes lost sales and extra handling.  

> [!info]  
> *Cycle stock* = demand covered by the regular order quantity; determines how many periods of demand are kept on hand.

## 4. POQ (Periodic Order Quantity) Model Overview  

- **Objective**: choose an order size that minimizes total cost = holding + ordering + backorder.  
- **Key inputs**: demand rate (units/period), ordering cost (fixed per order), holding cost per unit per period.  

> [!example]  
> Demand = 500 units/week, unit cost = $2, fixed shipping = $1,000 per order (≤15,000 units).  
> Optimal policy: order the full 15,000‑unit batch → shipping cost spread over 30 weeks, lowering per‑unit cost.

- Consistency: applying the same POQ steps must yield identical numbers across repetitions.  

> [!warning]  
> Mis‑estimating holding cost (e.g., treating a fixed‑term lease as variable storage) inflates total cost and leads to sub‑optimal order quantities.

## 5. Practical Tips & Communication  

- Verify arithmetic (e.g., 5.5 + 3.4 = 8.9) before finalizing forecasts.  
- Communicate assumptions clearly to stakeholders; link forecast to the data cleaning and seasonality handling steps.  
- Ensure the forecasting owner understands: data sources, cleaning rules, essential steps, and cost formulas.  

## Key terms  

| Term | Meaning |
|------|---------|
| Seasonal index | Multiplicative factor representing typical deviation for a specific period in the cycle |
| De‑seasonalize | Subtract seasonal indices to isolate the underlying trend |
| Holding cost | Cost proportional to the time a unit remains in inventory (capital, storage, opportunity) |
| POQ (Periodic Order Quantity) | Inventory model that determines optimal order size based on periodic demand and cost parameters |
| Backorder cost | Penalty incurred when demand cannot be satisfied immediately, including lost sales and extra logistics |
