---
title: Business Lifecycle — Cross-Map of Three Subjects
tags: [cross-domain, integration, business-law, decision-analysis, financial-accounting, moc]
sources: [law/Textbook.pdf, da/Textbook.pdf, fa/Textbook.pdf]
updated: 2026-06-18
kind: 주제
pagerank: 0.0059
betweenness: 0.0539
eigenvector: 0.2032
degree: 28
community: 2
---

# Business Lifecycle — Law × Decision Analysis × Financial Accounting Cross-Map

The three subjects are studied separately, but **a single business activity** is analyzed through all three lenses at once.
One transaction simultaneously carries (1) **legal effect** (Business Law), (2) **quantitative decision-making** (Decision Analysis), and (3) **accounting records** (Financial Accounting).
This page connects those intersection points, serving as a bridge for applying all three subjects to a single case in an integrated way.

> The integrated quiz starts here → [[cross-domain/integrated-quiz]]

---

## Core insight: same event, three lenses

| Business event | ⚖️ Law | 📊 Decision Analysis | 💰 Financial Accounting |
|--------------|--------|---------------------|------------------------|
| **Entering a supply contract** | Whether offer/acceptance is formed [[law-concepts/ch07-offer-acceptance/offer]] · [[law-concepts/ch07-offer-acceptance/acceptance]] | Order quantity decision under uncertain demand [[da-concepts/ch12-simulation/simulation]] | Purchase/inventory entry, FOB [[fa-concepts/ch06-inventory/inventory]] |
| **Defect/fault dispute** | Exemption clause/misrepresentation [[law-concepts/ch11-exemption-clauses/exemption-clause]] · [[law-concepts/ch13-misrepresentation/misrepresentation]] | Defect-rate simulation [[da-concepts/ch12-simulation/simulation-quiz-problems]] | Sales returns entry [[fa-concepts/ch06-inventory/inventory]] |
| **Equipment investment/financing** | Duress in a guarantee [[law-concepts/ch14-duress-undue-influence/duress]] | Expected-value comparison of financing options [[da-concepts/ch02-lp/Linear Programming]] | Bond issuance at a discount/present value [[fa-concepts/ch09-long-term-liabilities/bonds-payable]] · [[fa-concepts/ch09-long-term-liabilities/time-value-of-money]] |
| **Departure of key personnel** | Reasonableness of restraint of trade [[law-concepts/ch15-illegality/restraint-of-trade]] | Personnel assignment optimization [[da-concepts/ch06-networks/Assignment Problem]] | Reissuance of treasury shares [[fa-concepts/ch10-equity/shareholders-equity]] |
| **Breach/remedies** | Damages/termination [[law-concepts/ch18-remedies/remedies]] · [[law-concepts/ch16-breach/discharge]] | Expected value of litigation vs settlement | Provisions/cash-flow impact [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]] |
| **Profit distribution** | Agent's authority [[law-concepts/ch20-agency/agency]] | EV of dividends vs reinvestment | Dividend entry/cumulative preference [[fa-concepts/ch10-equity/dividends]] |

---

## Three-step thinking framework for integrated analysis

When you receive a specific business scenario:

1. **⚖️ Law — "Is it legally valid / is there liability?"**
   Contract formation, defects, limitation of liability, remedies → result: void/voidable/valid, whether damages apply.

2. **📊 Decision Analysis — "Numerically, which choice is optimal?"**
   Uncertainty modeling (simulation/probability), expected-value comparison, optimization → result: recommended action.

3. **💰 Financial Accounting — "How is it recorded in the books?"**
   Journal entries (DR/CR), financial-statement impact, cash-flow classification → result: financial figures.

> The three conclusions **interact**: a legally void contract also overturns the accounting records, and DA's expected-value calculation uses legal liability (damages) as an input.

---

## Common methodological foundation

The quiz cards across all three subjects use the **same design principle** — [[law-concepts/quiz-methodology]]:
- **One decisive fact** per card flips the conclusion
- A **pair** design (formed/not-formed, or where the value diverges)
- Exam tips state the **boundary line**, not abstract terms

| Subject | Answer structure | Example decisive fact |
|------|----------|---------------|
| Law | IRAC (Issue·Rule·Application·Conclusion) | "both could use it" → no mistake |
| Decision Analysis | Issue·Method·Application·Conclusion | "r=0.92 ∈ [0.9,1.0)" → highest cost |
| Financial Accounting | Issue·Method·Application·Conclusion | "D≤Q" → holding cost applies |

---

## Connection hub

- ⚖️ [[law-concepts/quiz-methodology]] — common quiz design methodology
- 📊 [[da-concepts/ch12-simulation/simulation]] — DA core concept
- 💰 [[fa-concepts/financial-accounting]] — FA concept map
- 🎯 [[cross-domain/integrated-quiz]] — three-subject integrated quiz
