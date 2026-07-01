---
title: Time Value of Money — PV & PVA (Week 9)
tags: [financial-accounting, acct101, time-value-of-money, present-value, annuity]
sources: [fa/guided-notes/Week 9 - Guided Notes.pdf]
updated: 2026-06-18
pagerank: 0.0090
betweenness: 0.0004
eigenvector: 0.0443
degree: 9
community: 2
---

# Time Value of Money — PV & PVA (Week 9)

"Time is money." A dollar today can earn interest (and, because of inflation) is worth more than a dollar tomorrow. → **Today > Tomorrow.**
Converting a future amount into today's value is **discounting**.

> This concept is used directly in computing the issue price in [[fa-concepts/ch09-long-term-liabilities/bonds-payable]].

---

## Present Value (PV) — Single Amount

```
PV = FV × (1 + r)^(−n)
```
- r = discount rate, n = number of periods
- `(1 + r)^(−n)` = the **discount factor**

**Example**: Need $100,000 in 5 years, 5% compounded annually → `PV = 100,000 × (1.05)^(−5) ≈ $78,353`

### Using the PV Table
Multiply by the discount factor at row = period (n), column = discount rate (r).
**Example**: $100,000 in 10 years, factor 0.614 → `PV = 100,000 × 0.614 = $61,400`

> The PV/PVA tables are provided in the exam.

---

## Present Value of Annuity (PVA) — Stream of Equal Amounts

Receiving or paying an **equal amount** over multiple periods = an **annuity**.

```
PVA = Payment × [ 1 − (1 + r)^(−n) ] / r
```

**Example**: Receive $500 per month for 1 year, 12% annual rate → r = 1% (monthly), n = 12
`PVA = 500 × [1 − (1.01)^(−12)] / 0.01 ≈ $5,628`

### Using the PVA Table
Multiply by the pre-computed annuity factor.
**Example**: `500 × 11.26 ≈ $5,630` (rounding difference when using the table)

---

## Applications of PVA

- Retirement/savings planning: check whether a guaranteed payout is worth as much as the premiums paid
- Loan repayment: **monthly payment = Principal / PVA factor** → assess whether you can afford a car/house

---

## Key Distinction

| Situation | Use |
|------|------|
| A **single** future amount | **PV** |
| A **recurring** equal future amount | **PVA** |
| Bond issue price = PV of principal + PVA of coupons | Both ([[fa-concepts/ch09-long-term-liabilities/bonds-payable]]) |

> **Exam tip**: If the period/rate is "not annual," convert r and n to the relevant period (12% monthly → r = 1%, n = 12). For bonds, **always read the PV/PVA tables at the market yield**.

---

## Related Concepts

- [[fa-concepts/financial-accounting]] ← concept map (MOC)
- [[fa-concepts/ch09-long-term-liabilities/bonds-payable]] ← bond issue price = PV(principal) + PVA(coupons)
