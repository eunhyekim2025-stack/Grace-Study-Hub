---
title: Financial Accounting (ACCT101) — Concept Map
tags: [financial-accounting, acct101, moc, overview]
sources: [fa/Textbook.pdf, fa/guided-notes/Week 4 - Guided Practice Notes.pdf, fa/guided-notes/Week 5 - Guided Practice Notes.pdf, fa/guided-notes/Week 9 - Guided Notes.pdf, fa/guided-notes/Week 10 - Guided Notes.pdf, fa/guided-notes/Week 11 - Guided Notes Final.pdf]
updated: 2026-07-01
pagerank: 0.0253
betweenness: 0.0034
eigenvector: 0.0690
degree: 18
community: 2
---

# Financial Accounting (ACCT101) — Concept Map (MOC)

A hub organizing the SMU **ACCT101 Financial Accounting** (Term 2 AY2025-26, Tess Chua) course materials so the LLM Wiki can search and cite them.
Sources are the textbook (`fa/Textbook.pdf`) and the weekly Guided Notes (Weeks 4, 5, 9, 10, 11). All accounting treatments follow **double-entry bookkeeping (DR/CR)** and the **accrual** basis.

> Core unifying principle: **Revenue Recognition** (revenue when earned) + **Matching** (expenses when incurred) — independent of when cash changes hands. The [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]] reconciles this gap back onto a cash basis.

---

## Chapter Topic Map
> Ordered by textbook chapter (Spiceland *Financial Accounting*). Lecture week shown for cross-reference.

| Ch | Chapter | Topic | Page | Week |
|----|---------|-------|------|------|
| 4 | Cash and Internal Controls | Bank reconciliation | [[fa-concepts/ch04-cash-controls/bank-reconciliation]] | W4 |
| 6 | Inventory and Cost of Goods Sold | Inventory (perpetual system) | [[fa-concepts/ch06-inventory/inventory]] | W5 |
| 9 | Long-Term Liabilities | Time value of money (PV/PVA) | [[fa-concepts/ch09-long-term-liabilities/time-value-of-money]] | W9 |
| 9 | Long-Term Liabilities | Liability classification + Bonds | [[fa-concepts/ch09-long-term-liabilities/bonds-payable]] | W9 |
| 10 | Stockholders' Equity | Shareholders' equity (shares, APIC, treasury shares) | [[fa-concepts/ch10-equity/shareholders-equity]] | W10 |
| 10 | Stockholders' Equity | Dividends (cash, share, cumulative preference) | [[fa-concepts/ch10-equity/dividends]] | W10 |
| 11 | Statement of Cash Flows | Statement of cash flows (indirect method) | [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]] | W11 |

---

## The Three Financial Statements and Their Links

```
Income Statement ──(Net Profit)──► Retained Earnings ──► Balance Sheet
       │                                   ▲                   │
       │ accrual-based                     │ less dividends    │ Assets=Liabilities+Equity
       ▼                                   │                   ▼
  [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]] ◄┴── reconciled onto a cash basis (indirect method)
```

- **Income Statement**: Revenue (recognized) − Expenses (incurred) → Net Profit. → [[fa-concepts/ch06-inventory/inventory]] (COGS), [[fa-concepts/ch09-long-term-liabilities/bonds-payable]] (interest expense)
- **Balance Sheet**: Assets = Liabilities + Equity. → [[fa-concepts/ch10-equity/shareholders-equity]], [[fa-concepts/ch09-long-term-liabilities/bonds-payable]]
- **Statement of Cash Flows**: Reclassifies Net Profit into operating/investing/financing cash flows. → [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]]

---

## Dependencies Between Concepts

- Computing a bond's issue price requires the PV/PVA tables of [[fa-concepts/ch09-long-term-liabilities/time-value-of-money]] → [[fa-concepts/ch09-long-term-liabilities/bonds-payable]]
- The COGS and working-capital changes of [[fa-concepts/ch06-inventory/inventory]] feed directly into the operating activities of the [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]]
- [[fa-concepts/ch10-equity/dividends]] and treasury shares are sub-topics of [[fa-concepts/ch10-equity/shareholders-equity]] and financing activities in the [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]]
- [[fa-concepts/ch04-cash-controls/bank-reconciliation]] verifies the cash balance → the starting point of all cash-based analysis

---

## Abbreviations

| Abbr. | Meaning | Abbr. | Meaning |
|------|------|------|------|
| A/R | Accounts Receivable | A/P | Accounts Payable |
| COGS | Cost of Goods Sold | APIC | Additional Paid-In Capital |
| DIT | Deposit in Transit | OC | Outstanding Cheque |
| NSF | Non-Sufficient Funds | EFT | Electronic Funds Transfer |
| PV / PVA | Present Value / PV of Annuity | RE | Retained Earnings |
| FOB | Free On Board | T-Shares | Treasury Shares |
| OCF/ICF/FCF | Operating/Investing/Financing Cash Flow | AJE | Adjusting Journal Entry |

> Source: `raw/fa/Abbreviations.png`
