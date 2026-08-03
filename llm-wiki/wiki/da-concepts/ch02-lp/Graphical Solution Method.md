---
title: Graphical Solution Method
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.2.2)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0093
betweenness: 0.0001
eigenvector: 0.0682
degree: 10
community: 4
---

<div class="dc-view">
<div class="dc-title">Graphical Solution Method</div>
<div class="dc-sub">find optimal solution to a Linear Programming problem with two decision variables by plotting it on a 2D plane</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Plot constraints</div><div class="dc-step-d">as lines with inequality directions</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Identify Feasible Region</div><div class="dc-step-d">satisfying all constraints</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Draw objective function line</div><div class="dc-step-d">iso-profit / iso-cost line</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Shift the line</div><div class="dc-step-d">toward improving objective values</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">5</div><div class="dc-step-t">Find optimal solution</div><div class="dc-step-d">at Extreme Points just before leaving the feasible region</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Key Intuition</h2><span class="dc-hint">maximization and minimization</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Maximization</b> push iso-profit line up/right <span class="dc-chip">last vertex</span></div><div class="dc-card"><b>Minimization</b> pull iso-cost line down/left <span class="dc-chip">last vertex</span></div><div class="dc-card"><b>Optimal solution</b> always at an Extreme Point <span class="dc-chip">vertex of feasible region</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Limitations</h2><span class="dc-hint">number of variables</span></div>
<div class="dc-card"><b>Number of variables</b> limited to 2 for visualization <span class="dc-chip">simplex method for 3 or more</span></div>
<div class="dc-callout">optimal solution always occurs at an Extreme Point (vertex) of the feasible region</div>
</div>


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
