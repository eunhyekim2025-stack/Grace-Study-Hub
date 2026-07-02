---
title: Statement of Cash Flows — Indirect Method (Week 11)
tags: [financial-accounting, acct101, cash-flows, indirect-method, working-capital]
sources: [fa/guided-notes/Week 11 - Guided Notes Final.pdf]
updated: 2026-06-18
pagerank: 0.0215
betweenness: 0.0009
eigenvector: 0.0469
degree: 15
community: 2
---

# Statement of Cash Flows — Week 11

The income statement and balance sheet do not show how **cash** is generated or used (accrual basis). The SCF **reconciles profit to cash** to reveal true liquidity.

> In essence: classify and summarize the year's **change in the Cash T-account (ending − beginning)** into three categories — operating, investing, and financing. The sum of the three activities = the net change in cash.

---

## The Three Activities

| Activity | Focus | Inflow examples | Outflow examples |
|------|------|---------|---------|
| **Operating (OCF)** | Current assets & current liabilities | Sale of goods/services, interest income\*, dividend income\* | Purchases, operating expenses, taxes, interest expense\* |
| **Investing (ICF)** | Non-current assets | Sale of PPE, sale of a business unit | Purchase of PPE, lending to others |
| **Financing (FCF)** | Long-term debt & equity | Share issuance, borrowing (bank/bonds) | Dividends paid\*, principal repayment, treasury share purchases |

> \* This course adopts **US GAAP** — interest expense, interest income, and dividend income are OCF; dividends paid are FCF.

---

## Operating Activities — Indirect Method, 5 Steps

Start from **Net Profit before tax** and adjust onto a cash basis.

### Step 1 — Add back non-cash expenses
Depreciation (tangible) and amortisation (intangible) involved no cash outflow → add them back.
`+ Depreciation + Amortisation`

### Step 2 — Remove investing/financing gains and losses
Gains/losses on PPE disposal and on early bond redemption are computed with non-cash elements → **remove them entirely** from operating profit.
`− Gain / + Loss (on sale of PPE, on early bond redemption)`

### Step 3 — Treat interest and dividend items separately (US GAAP)
- Interest expense: first **add back** (+), then **subtract the actual amount paid** (−) via the Interest Payable T-account
- Interest/dividend income: first **remove** (−), then **add the actual amount received** (+) via the Receivable T-account
`+ Interest Expense − Cash paid` / `− Int/Div Revenue + Cash received`

### Step 4 — Analyze changes in Working Capital
Period-over-period changes in current assets and current liabilities, excluding Cash.

| Change | Cash effect |
|------|----------|
| Current asset increase | **−** (cash tied up, e.g., inventory increase) |
| Current asset decrease | **+** (e.g., A/R collection) |
| Current liability increase | **+** (e.g., accrued expenses, cash not yet out) |
| Current liability decrease | **−** (e.g., A/P repayment) |

> Accounts already handled in another Step or belonging to FCF (e.g., Dividend Payable) are excluded from Step 4.

### Step 5 — Subtract taxes actually paid
Derive the actual cash paid via the Tax Payable T-account.
`− Tax paid`

---

## Check

```
OCF + ICF + FCF = ending cash − beginning cash (B − A of the Cash T-account)
```
> In exams, a **comparative balance sheet + current-period income statement** is provided → derive the actual cash generated/used and classify it.

> **Exam tip**: The indirect method is a "profit → cash" translation. Add back non-cash items (depreciation), remove investing/financing gains and losses, and remember asset↑ = cash↓, liability↑ = cash↑. For interest and taxes, derive the **actual cash paid** separately via T-accounts.

---

## Related Concepts

- [[fa-concepts/financial-accounting]] ← concept map (MOC), links the three financial statements
- [[fa-concepts/ch06-inventory/inventory]] ← inventory/COGS changes = Step 4 working capital
- [[fa-concepts/ch09-long-term-liabilities/bonds-payable]] ← interest expense (Step 3), early-redemption gains/losses (Step 2)
- [[fa-concepts/ch10-equity/dividends]] ← dividends paid = FCF outflow
- [[fa-concepts/ch10-equity/shareholders-equity]] ← share issuance, treasury shares = FCF
- [[fa-concepts/ch04-cash-controls/bank-reconciliation]] ← the verified cash balance is the beginning/ending Cash
