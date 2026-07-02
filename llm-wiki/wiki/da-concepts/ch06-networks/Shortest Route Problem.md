---
title: Shortest Route Problem
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.6.4)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0066
betweenness: 0.0000
eigenvector: 0.0660
degree: 9
community: 3
---

# Shortest Route Problem

A model that finds the **path with the minimum sum** of distance (or time/cost) from a **start node → destination node** in a network. (Ch.6)

## Model Structure
- **Decision variable**: `xᵢⱼ = 1` (edge i→j included in the path), else 0
- **Objective function**: `Min Σ cᵢⱼ xᵢⱼ`
- **Constraints — flow conservation**:
  - Start node: net outflow = 1
  - Destination node: net inflow = 1
  - Intermediate node: inflow = outflow (net flow 0)

## Characteristics
- A special case of the [[Transshipment Problem]] that sends one unit of flow from start→destination
- Applied to transport/communication routing, equipment-replacement timing decisions, etc.
- Can also be solved with a dedicated algorithm (Dijkstra)

## Related Notes
- [[Transshipment Problem]] · [[Maximal Flow Problem]] · [[Transportation Problem]]
- Full map: [[LLM Wiki MOC]]
