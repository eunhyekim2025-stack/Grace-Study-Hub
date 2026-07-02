---
title: Waiting Line Models
tags: [LLM, decision-analysis]
created: 2026-06-18
source: Textbook.pdf (Management Science 14e, Ch.11)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0081
betweenness: 0.0054
eigenvector: 0.0563
degree: 7
community: 3
---

# Waiting Line Models (Queuing)

A model that analyzes the **performance characteristics of a waiting line** under stochastic arrivals and service. It evaluates the cost–service trade-off in system design (e.g., number of servers). (Ch.11)

## Inputs (Kendall notation M/M/k)
- **λ (lambda)**: mean arrival rate (Poisson distribution → inter-arrival times are exponential)
- **μ (mu)**: mean service rate per channel (exponential)
- **k**: number of service channels (servers)
- Utilization: `ρ = λ / (kμ)` must be < 1 for a stable steady state

## Single-channel M/M/1 operating characteristics
| Metric | Formula |
|------|------|
| Probability system is empty | `P₀ = 1 − λ/μ` |
| Average number waiting (queue) | `Lq = λ² / [μ(μ − λ)]` |
| Average number in system | `L = Lq + λ/μ` |
| Average waiting time in queue | `Wq = Lq / λ` |
| Average time in system | `W = Wq + 1/μ` |
| Probability server is busy | `Pw = λ/μ` |

- **Little's Law**: `L = λW`, `Lq = λWq` (holds for all waiting lines)

## Extensions
- **M/M/k**: multiple channels (formulas are complex; use tables/software)
- Variants: finite queue, finite population, constant service time (M/D/1), etc.
- When an analytic solution is hard → use [[Simulation]] instead

## Cost model
Choose the number of channels k that minimizes `Total cost = waiting cost (cw·L) + service cost (cs·k)`.

## Related notes
- [[Simulation]] · [[Management Science Process]]
- Full map: [[LLM Wiki MOC]]
