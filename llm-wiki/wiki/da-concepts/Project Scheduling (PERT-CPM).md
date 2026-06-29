---
title: Project Scheduling (PERT/CPM)
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.9)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0028
betweenness: 0.0000
eigenvector: 0.0552
degree: 6
community: 3
---

# Project Scheduling: PERT/CPM

Analyzes the **completion time and critical path** of a project made up of multiple activities and precedence relationships. PERT (uncertain times) + CPM (critical path).

## Critical Path (9.1)
- Build the network from each activity's **immediate predecessors**.
- **Forward pass**: ES (earliest start), EF = ES + t. **Backward pass**: LF (latest finish), LS = LF − t.
- **Slack = LS − ES = LF − EF**. The **Critical Path** = the path of activities with zero slack = the **longest path** = the shortest project completion time.

## Uncertain Activity Times (9.2)
- Use three-point estimates (optimistic a, most likely m, pessimistic b) assuming a **beta distribution**:
  - **Expected time t = (a + 4m + b) / 6**
  - **Variance σ² = ((b − a) / 6)²**
- **Project completion-time variance** = sum of the variances of the activities on the critical path. Use the standard normal (z) to compute "probability of completing within T days".

## Time–Cost Trade-off (9.3)
- **Crashing**: shorten activity times at additional cost. Crash cost per unit time = (crash cost − normal cost) / (normal time − crash time).
- Formulate as a **linear programming (LP) model** to meet the target completion time at minimum cost → [[Linear Programming]].

## Related notes
- Network models: [[Shortest Route Problem]] · [[Maximal Flow Problem]] · LP: [[Linear Programming]]
- Full map: [[LLM Wiki MOC]]
