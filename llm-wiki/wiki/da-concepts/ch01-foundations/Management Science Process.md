---
title: Management Science Process
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.1)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0064
betweenness: 0.0003
eigenvector: 0.0670
degree: 9
community: 4
---

<div class="dc-view">
<div class="dc-title">Management Science Process</div>
<div class="dc-sub">Quantitative approach to decision-making problems</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Model Development</div><div class="dc-step-d">Abstract problem into mathematical representation</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Data Preparation</div><div class="dc-step-d">Gather model coefficients</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Model Solution</div><div class="dc-step-d">Derive optimal solution</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Report Generation</div><div class="dc-step-d">Communicate results</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">5</div><div class="dc-step-t">Implementation</div><div class="dc-step-d">Put into practice and gather feedback</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Model Types</h2><span class="dc-hint">Deterministic and stochastic models</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Deterministic model</b> all inputs are known <span class="dc-chip">LP</span></div><div class="dc-card"><b>Stochastic model</b> includes uncertainty <span class="dc-chip">Waiting Line Models, Simulation</span></div><div class="dc-card"><b>Probabilistic model</b> includes uncertainty <span class="dc-chip">Waiting Line Models, Simulation</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Key Techniques</h2><span class="dc-hint">Linear Programming and more</span></div>
<div class="dc-cols"><div class="dc-card"><b>Linear Programming</b> technique for model solution <span class="dc-chip">LP</span></div><div class="dc-card"><b>Waiting Line Models</b> technique for stochastic models <span class="dc-chip">Queueing Theory</span></div></div>
<div class="dc-callout">Use mathematical models to inform decision-making</div>
</div>


# Management Science Process

Management Science (also called Operations Research) is the discipline that applies a quantitative approach to decision-making problems using **mathematical models**.

## The 5 Steps of Quantitative Analysis

1. **Model Development** — abstract a real-world problem into a mathematical representation
   - objective function, constraints, decision variables
   - controllable input (= decision variables) vs. uncontrollable input (= parameters)
2. **Data Preparation** — gather the values that go into the model coefficients
3. **Model Solution** — derive the optimal solution, applying techniques such as [[Linear Programming]]
4. **Report Generation** — communicate the results to the decision maker
5. **Implementation** — put into practice and gather feedback

## Types of Models
- **Deterministic model**: all inputs are known → LP
- **Stochastic / Probabilistic model**: includes uncertainty → [[Waiting Line Models]], [[da-concepts/ch12-simulation/simulation|Simulation]]

## Related Notes
- [[Breakeven Analysis]] · [[Linear Programming]]
- Full map: [[LLM Wiki MOC]]
