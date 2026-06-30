---
title: Transshipment Problem
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.6.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0088
betweenness: 0.0007
eigenvector: 0.0558
degree: 10
community: 3
---

# Transshipment Problem

The general form of the [[Transportation Problem]] — a network model that allows **intermediate transshipment nodes** between origins and destinations. (Ch.6)

## Model Structure
- **Decision variables**: `xᵢⱼ` = amount shipped from node i → node j (over all possible arcs)
- **Objective function**: minimize total shipping cost
- **Key constraint — flow conservation at each node**:
  - supply node: `outflow − inflow ≤ supply`
  - demand node: `inflow − outflow ≥ demand`
  - transshipment node: `inflow = outflow` (net flow 0)

## Characteristics
- More flexible, since routing through a hub can be cheaper than direct shipping
- A general minimum cost flow model that treats all nodes uniformly
- Includes the transportation and assignment problems as special cases

## Related Notes
- [[Transportation Problem]] · [[Shortest Route Problem]] · [[Maximal Flow Problem]]
- Full map: [[LLM Wiki MOC]]
