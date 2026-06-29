---
title: Advanced LP Applications
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.5)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0028
betweenness: 0.0000
eigenvector: 0.0632
degree: 7
community: 3
---

# Advanced Linear Programming Applications

Four application areas that extend LP (Ch.5).

## DEA — Data Envelopment Analysis (5.1)
- Evaluates **relative efficiency** (e.g., hospitals, branches). Compares the unit being evaluated against a **composite unit** formed as a weighted combination of the other units.
- If the composite unit achieves **the same or more output with fewer inputs** than the target, the target is **inefficient**. LP produces an efficiency score (≤1).

## Revenue Management (5.2)
- Allocates fixed capacity (seats, rooms) across **segmented demand and fare classes** to maximize revenue (airlines, hotels). LP allocates seats by fare class.

## Portfolio / Asset Allocation (5.3)
- Determines asset-class weights with LP. **Maximizes expected return** subject to risk-profile constraints (conservative, moderate). → The nonlinear version is [[Nonlinear Optimization]] (Markowitz).

## Game Theory (5.4)
- Market-share competition modeled as a **two-person zero-sum game**.
- **Pure Strategy**: when the saddle point exists, i.e., maximin = minimax.
- **Mixed Strategy**: if there is no saddle point, find the probabilistic strategy via **LP**.

## Related notes
- Foundations: [[Linear Programming]] · [[LP Special Cases]] · Applications: [[Portfolio Selection]] · Nonlinear: [[Nonlinear Optimization]]
- Full map: [[LLM Wiki MOC]]
