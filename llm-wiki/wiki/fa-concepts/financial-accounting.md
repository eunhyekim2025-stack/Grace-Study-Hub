---
title: Financial Accounting (ACCT101) — Concept Map
tags: [financial-accounting, acct101, moc, overview]
sources: [fa/Textbook.pdf, fa/guided-notes/Week 4 - Guided Practice Notes.pdf, fa/guided-notes/Week 5 - Guided Practice Notes.pdf, fa/guided-notes/Week 9 - Guided Notes.pdf, fa/guided-notes/Week 10 - Guided Notes.pdf, fa/guided-notes/Week 11 - Guided Notes Final.pdf]
updated: 2026-06-18
pagerank: 0.0256
betweenness: 0.0026
eigenvector: 0.0749
degree: 18
community: 2
---

# Financial Accounting (ACCT101) — Concept Map (MOC)

A hub organizing the SMU **ACCT101 Financial Accounting** (Term 2 AY2025-26, Tess Chua) course materials so the LLM Wiki can search and cite them.
Sources are the textbook (`fa/Textbook.pdf`) and the weekly Guided Notes (Weeks 4, 5, 9, 10, 11). All accounting treatments follow **double-entry bookkeeping (DR/CR)** and the **accrual** basis.

> Core unifying principle: **Revenue Recognition** (revenue when earned) + **Matching** (expenses when incurred) — independent of when cash changes hands. The [[fa-concepts/w11-cash-flows/statement-of-cash-flows]] reconciles this gap back onto a cash basis.

---

## Weekly Topic Map

| Week | Topic | Page |
|------|------|--------|
| Week 4 | Bank reconciliation | [[fa-concepts/w04-bank-reconciliation/bank-reconciliation]] |
| Week 5 | Inventory (perpetual system) | [[fa-concepts/w05-inventory/inventory]] |
| Week 9 | Time value of money (PV/PVA) | [[fa-concepts/w09-time-value-and-bonds/time-value-of-money]] |
| Week 9 | Liability classification + Bonds | [[fa-concepts/w09-time-value-and-bonds/bonds-payable]] |
| Week 10 | Shareholders' equity (shares, APIC, treasury shares) | [[fa-concepts/w10-equity-and-dividends/shareholders-equity]] |
| Week 10 | Dividends (cash, share, cumulative preference) | [[fa-concepts/w10-equity-and-dividends/dividends]] |
| Week 11 | Statement of cash flows (indirect method) | [[fa-concepts/w11-cash-flows/statement-of-cash-flows]] |

---

## The Three Financial Statements and Their Links

```
Income Statement ──(Net Profit)──► Retained Earnings ──► Balance Sheet
       │                                   ▲                   │
       │ accrual-based                     │ less dividends    │ Assets=Liabilities+Equity
       ▼                                   │                   ▼
  [[fa-concepts/w11-cash-flows/statement-of-cash-flows]] ◄┴── reconciled onto a cash basis (indirect method)
```

- **Income Statement**: Revenue (recognized) − Expenses (incurred) → Net Profit. → [[fa-concepts/w05-inventory/inventory]] (COGS), [[fa-concepts/w09-time-value-and-bonds/bonds-payable]] (interest expense)
- **Balance Sheet**: Assets = Liabilities + Equity. → [[fa-concepts/w10-equity-and-dividends/shareholders-equity]], [[fa-concepts/w09-time-value-and-bonds/bonds-payable]]
- **Statement of Cash Flows**: Reclassifies Net Profit into operating/investing/financing cash flows. → [[fa-concepts/w11-cash-flows/statement-of-cash-flows]]

---

## Dependencies Between Concepts

- Computing a bond's issue price requires the PV/PVA tables of [[fa-concepts/w09-time-value-and-bonds/time-value-of-money]] → [[fa-concepts/w09-time-value-and-bonds/bonds-payable]]
- The COGS and working-capital changes of [[fa-concepts/w05-inventory/inventory]] feed directly into the operating activities of the [[fa-concepts/w11-cash-flows/statement-of-cash-flows]]
- [[fa-concepts/w10-equity-and-dividends/dividends]] and treasury shares are sub-topics of [[fa-concepts/w10-equity-and-dividends/shareholders-equity]] and financing activities in the [[fa-concepts/w11-cash-flows/statement-of-cash-flows]]
- [[fa-concepts/w04-bank-reconciliation/bank-reconciliation]] verifies the cash balance → the starting point of all cash-based analysis

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
