---
title: Graphical Solution Method
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0097
betweenness: 0.0001
eigenvector: 0.0780
degree: 10
community: 3
---

# Graphical Solution Method

A method for finding the optimal solution to a [[Linear Programming]] problem with **two decision variables** by plotting it on a 2D plane.

## Procedure
1. Plot each constraint as a line and determine the inequality direction (half-plane)
2. Identify the **[[Feasible Region]]** that satisfies all constraints
3. Draw the objective function line (iso-profit / iso-cost line)
4. Shift it in parallel toward improving objective values
5. The **[[Extreme Points]]** just before leaving the feasible region is the optimal solution

## Key Intuition
- Maximization: push the iso-profit line **up/right** to the last vertex it touches
- Minimization: pull the iso-cost line **down/left** to the last vertex it touches
- The optimal solution always occurs at an **extreme point (vertex)** of the feasible region

## Limitations
- Only up to 2 variables can be visualized → 3 or more require the simplex method/computer

## Related Notes
- [[Linear Programming]] · [[Feasible Region]] · [[Extreme Points]] · [[Slack and Surplus Variables]]
- Full map: [[LLM Wiki MOC]]
