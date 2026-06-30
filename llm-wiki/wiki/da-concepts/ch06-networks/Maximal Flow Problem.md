---
title: Maximal Flow Problem
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.6.5)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0067
betweenness: 0.0000
eigenvector: 0.0533
degree: 9
community: 3
---

# Maximal Flow Problem

A model that **maximizes the flow** that can be sent from **source → sink** in a network under edge **capacity** constraints. (Ch.6)

## Model Structure
- **Decision variable**: `xᵢⱼ` = flow on edge i→j
- **Objective function**: maximize the total flow `f` leaving the source (or entering the sink)
  - Use a formulation with a fictitious return edge `xₛₜ = f` from sink→source and maximize it
- **Constraints**:
  - Capacity constraint: `xᵢⱼ ≤ uᵢⱼ`
  - Flow conservation at every node: inflow = outflow
  - Non-negativity constraint

## Characteristics
- Useful for identifying bottlenecks (max-flow = min-cut, the max-flow min-cut theorem)
- Throughput analysis of road networks, pipelines, and communication networks
- The last type in the network LP family

## Related Notes
- [[Shortest Route Problem]] · [[Transshipment Problem]] · [[Transportation Problem]]
- Full map: [[LLM Wiki MOC]]
