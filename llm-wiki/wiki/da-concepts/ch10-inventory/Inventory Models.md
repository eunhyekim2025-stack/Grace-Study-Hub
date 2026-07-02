---
title: Inventory Models
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.10)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0028
betweenness: 0.0000
eigenvector: 0.0600
degree: 5
community: 3
---

# Inventory Models

Determines **how much** and **when** to order by minimizing cost. Deterministic models (EOQ family) + probabilistic-demand models.

## EOQ — Economic Order Quantity (10.1)
- Assumptions: constant annual demand D, instantaneous replenishment, no stockouts.
- Total cost = holding cost + ordering cost = **(Q/2)·C_h + (D/Q)·C_o**
- **Q\* = √(2·D·C_o / C_h)** (holding cost C_h, ordering cost C_o)
- **Reorder point r = d·m** (demand during lead time m). Cycle = Q*/D.
- **Sensitivity**: because Q* is a square-root form, it is **robust** to estimation errors in D and C → [[Sensitivity Analysis]].

## Model Variants (10.2–10.4)
| Model | Key idea |
|------|------|
| **Production Lot Size** | Gradual replenishment (production rate P): Q\* = √(2·D·C_o / ((1−D/P)·C_h)) |
| **Planned Shortages** | Backorders allowed; reflects shortage cost C_b |
| **Quantity Discounts** | Compare total cost by discount tier (including unit price) |

## Probabilistic Demand (10.5–10.7)
- **Single-Period (newsvendor)**: critical ratio **P(demand ≤ Q\*) = C_u / (C_u + C_o)** (underage/shortage loss C_u, overage loss C_o). Examples: newspapers, seasonal goods.
- **Order-quantity / reorder-point (Q, r) model**: meet a service level via safety stock.
- **Periodic Review** model: replenish up to a target inventory level at fixed intervals.

## Related notes
- Simulation of inventory: [[simulation]] · Robustness: [[Sensitivity Analysis]]
- Full map: [[LLM Wiki MOC]]
