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
community: 4
---

<div class="dc-view">
<div class="dc-title">Insight — A Decision Under Uncertainty Is the Weighted Sum of Outcome × Probability (Isomorphic Across Three Subjects)</div>
<div class="dc-sub">Expected value (EV) is the weighted sum of outcome × probability, applicable across three subjects: decision analysis, law, and finance.</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Identify outcome</div><div class="dc-step-d">Determine the possible outcomes in a decision.</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Assign probability</div><div class="dc-step-d">Assign a probability to each outcome.</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Calculate expected value</div><div class="dc-step-d">Calculate the expected value by multiplying each outcome by its probability and summing the results.</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Applications Across Subjects</h2><span class="dc-hint">Isomorphism in decision analysis, law, and finance</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Decision Analysis</b> uses simulation to determine scenario probability <span class="dc-chip">DA</span></div><div class="dc-card"><b>Law</b> uses probability of winning to determine damages or litigation cost <span class="dc-chip">Law</span></div><div class="dc-card"><b>Finance</b> uses discounting to determine the present value of future cash flows <span class="dc-chip">FA</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Limits of Isomorphism</h2><span class="dc-hint">Differences in weighting and meaning</span></div>
<div class="dc-cols"><div class="dc-card"><b>Time preference</b> is weighted in finance, differing from probability weighting <span class="dc-chip">FA</span></div><div class="dc-card"><b>Probability estimation</b> is challenging in law due to judicial discretion <span class="dc-chip">Law</span></div></div>
<div class="dc-callout">The expected value of a decision under uncertainty is the weighted sum of outcome × probability.</div>
<div class="dc-view>


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
