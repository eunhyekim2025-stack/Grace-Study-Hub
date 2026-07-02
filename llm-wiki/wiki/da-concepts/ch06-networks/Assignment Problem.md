---
title: Assignment Problem
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Ch.6.3) + da/excel-solutions/Clark County Sheriff.xlsx
sources: [da/Textbook.pdf, da/excel-solutions/Clark County Sheriff.xlsx]
updated: 2026-06-18
pagerank: 0.0064
betweenness: 0.0082
eigenvector: 0.1030
degree: 11
community: 3
---

# Assignment Problem

A network [[Linear Programming]] that **assigns agents to tasks 1:1** to minimize total cost (or maximize benefit). (Ch.6)

## Model Structure
- **Decision variables**: `xᵢⱼ = 1` (agent i assigned to task j), otherwise 0
- **Objective function**: `Min Σᵢ Σⱼ cᵢⱼ xᵢⱼ`
- **Constraints**:
  - each agent does exactly one task: `Σⱼ xᵢⱼ = 1`
  - each task gets exactly one agent: `Σᵢ xᵢⱼ = 1`
  - `xᵢⱼ ≥ 0`

## Characteristics
- A **special case of the [[Transportation Problem]]** with all supplies = demands = 1
- Thanks to the network structure, solving it as an LP automatically yields a **0/1 integer** solution (no integer constraint needed)
- If unbalanced (agents ≠ tasks), add dummy rows/columns
- Example: patrol-car–district assignment (Clark County Sheriff)

## Related Notes
- [[Transportation Problem]] · [[Transshipment Problem]] · [[Workforce Assignment]]
- Full map: [[LLM Wiki MOC]]
