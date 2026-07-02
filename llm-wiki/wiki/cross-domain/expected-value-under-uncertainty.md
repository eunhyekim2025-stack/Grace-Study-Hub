---
title: Insight — A Decision Under Uncertainty Is the Weighted Sum of Outcome × Probability (Isomorphic Across Three Subjects)
tags: [cross-domain, insight, methodology]
sources: []
updated: 2026-06-19
kind: 통찰
relations:
  see-also: [da-concepts/simulation, law-concepts/remedies, fa-concepts/time-value-of-money]
pagerank: 0.0017
betweenness: 0.0022
eigenvector: 0.0405
degree: 6
community: 1
---

# Insight — Expected Value (EV): the weighted sum of outcome × probability

In an uncertain future, "what should I choose" reduces, in all three subjects, to a comparison of **Σ(outcome × probability)**.
Only the object (money, damages, cash flows) differs; the computational structure is the same.

| Subject | Decision | Outcome | Probability/weight | Anchor |
|------|------|------|-----------|------|
| 📊 DA | Order quantity/investment option | Profit/cost | Scenario probability (simulation) | [[da-concepts/ch12-simulation/simulation]] |
| ⚖️ Law | Litigation vs settlement | Damages/litigation cost | Probability of winning | [[law-concepts/ch18-remedies/remedies]] |
| 💰 FA | Investment/financing | Future cash flows | Discounting (time value) = conversion to certainty equivalent | [[fa-concepts/ch09-long-term-liabilities/time-value-of-money]] |

> [[cross-domain/business-lifecycle]] already mentions the "**expected value** of litigation vs settlement" and the
> "**expected-value** comparison of financing options" — this page pulls that common operation out as an explicit node.

## Limits of the isomorphism
- FA's discounting (PV) weights *time preference*, not *probability* — both "convert the future to present value,"
  but the meaning of the weighting differs. EV (probability) and PV (time) meet in [[cross-domain/time-and-delay]].
- In law, probability is the roughest to quantify because judges have wide discretion, making it an **estimate**.
