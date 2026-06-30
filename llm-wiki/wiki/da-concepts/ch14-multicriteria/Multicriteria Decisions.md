---
title: Multicriteria Decisions
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.14)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0038
betweenness: 0.0000
eigenvector: 0.0512
degree: 6
community: 3
---

# Multicriteria Decisions

Decision making that simultaneously considers **several conflicting goals/criteria**. Goal programming + scoring models + AHP.

## Goal Programming (14.1–14.2)
- Express each goal as a **goal equation** and introduce **deviation variables** d⁺ (overachievement), d⁻ (underachievement).
- Objective: **minimize** the weighted sum of deviations. Use **preemptive priorities** P₁ ≫ P₂ ≫ … to satisfy higher-ranked goals first.
- Graphical solution / for complex problems use a computer solution (Suncoast example).

## Scoring Models (14.3)
- Per-criterion **weight wⱼ** × the alternative's **rating rᵢⱼ** → **score Sᵢ = Σⱼ wⱼ·rᵢⱼ**. Choose the highest-scoring alternative. Simple and intuitive.

## Analytic Hierarchy Process (AHP, 14.4–14.6)
- **Build the hierarchy**: goal → criteria → alternatives.
- **Pairwise Comparison**: compare criteria/alternatives two at a time on a 1–9 scale → a **comparison matrix**.
- **Synthesization**: normalize the matrix to derive **priorities (weights)**.
- **Consistency** check: **CI = (λmax − n)/(n − 1)**, **CR = CI/RI**. Accept as consistent if **CR < 0.10**.
- Criterion weights × alternative priorities → the **overall priority ranking**.

## Related notes
- Decisions under uncertainty: [[Decision Analysis]] · Weighted LP: [[Linear Programming]]
- Full map: [[LLM Wiki MOC]]
