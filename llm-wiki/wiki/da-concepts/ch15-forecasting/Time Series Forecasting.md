---
title: Time Series Forecasting
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.15)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0028
betweenness: 0.0000
eigenvector: 0.0558
degree: 5
community: 3
---

# Time Series Analysis and Forecasting

Identify the **patterns** in past time series data to forecast the future.

## Time Series Patterns (15.1)
Horizontal · Trend · Seasonal · Trend + Seasonal · Cyclical. Choose the technique that matches the pattern.

## Forecast Accuracy (15.2)
Error eₜ = Yₜ − Fₜ.
- **MAE** = mean |eₜ| · **MSE** = mean eₜ² · **MAPE** = mean |eₜ/Yₜ|·100%
- Apply several techniques to the same data and pick the one with the smallest error.

## Moving Average / Exponential Smoothing (15.3) — Horizontal Pattern
- **Moving average (MA)**: average of the most recent k periods. **Weighted moving average**: larger weight on recent values.
- **Exponential Smoothing**: **F_{t+1} = α·Yₜ + (1−α)·Fₜ** (0 < α < 1). A larger α weights recent values more. A single parameter exponentially weights all past data.

## Trend / Seasonality (15.4–15.5)
- **Linear Trend**: **Tₜ = b₀ + b₁·t** (least squares). Use when there is a trend.
- **Seasonality**: deseasonalize with a seasonal index → fit the trend → reseasonalize. Handle by presence/absence of trend and by monthly/quarterly data.

## Related notes
- Modeling uncertainty: [[simulation]] · Forecasting applications: [[Decision Analysis]]
- Full map: [[LLM Wiki MOC]]
