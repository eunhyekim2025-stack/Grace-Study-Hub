---
title: Decision Analysis
tags: [LLM, decision-analysis]
created: 2026-06-24
source: Textbook.pdf (Management Science 14e, Ch.13)
sources: [da/Textbook.pdf]
updated: 2026-06-24
pagerank: 0.0046
betweenness: 0.0001
eigenvector: 0.0695
degree: 8
community: 3
---

# Decision Analysis

A technique for finding the optimal strategy when there are several **decision alternatives** and uncertain **states of nature**. The core chapter of this course's namesake (Ch.13).

## Structuring the Problem (13.1)
- **Payoff Table**: rows = alternatives dᵢ, columns = states of nature sⱼ, cells = payoffs Vᵢⱼ
- **Influence Diagram** / **Decision Tree**: □ = decision node, ○ = chance (event) node, branch ends = payoffs

## Decisions Without Probabilities (13.2)
| Criterion | Method |
|------|------|
| **Optimistic (maximax)** | The maximum among each alternative's maximum payoff |
| **Conservative (maximin)** | The maximum among each alternative's minimum payoff |
| **Minimax Regret** | From the opportunity-loss (regret) table, the minimum among each alternative's maximum regret |

## Decisions With Probabilities (13.3)
- **Expected value EV(dᵢ) = Σⱼ P(sⱼ)·Vᵢⱼ** — choose the alternative with the maximum EV (or minimum if costs) (= EMV).
- **EVPI (Expected Value of Perfect Information)** = `EVwPI − EVwoPI`
  - EVwPI = Σⱼ P(sⱼ)·(best payoff under sⱼ), EVwoPI = the optimal EV.
  - EVPI = the maximum you would pay for perfect information.

## Sample Information (13.5) · Bayes (13.6)
- **EVSI (Expected Value of Sample Information)** = `EVwSI − EVwoSI`. The maximum you would pay for information (e.g., market research).
- **Efficiency = EVSI / EVPI** (0–1).
- **Posterior probabilities** update [[simulation|probabilities]] — use **Bayes' theorem** to compute branch probabilities from prior × likelihood.
- Outputs: **Decision Strategy** (the optimal alternative for each situation), **Risk Profile** (the probability distribution of payoffs).

## Risk / Sensitivity (13.4) · Utility (13.7)
- **Risk Analysis**: assess risk from the payoff distribution of the chosen alternative. **Sensitivity Analysis**: the robustness of the decision as probabilities/payoffs change. → The same post-optimality idea as [[Sensitivity Analysis]].
- **Utility Theory**: evaluate using **utility** instead of money (risk-averse / neutral / seeking). Maximize **expected utility** rather than EMV.

## Related notes
- Evaluation under uncertainty: [[simulation]] · Multicriteria extension: [[Multicriteria Decisions]]
- Full map: [[LLM Wiki MOC]]
