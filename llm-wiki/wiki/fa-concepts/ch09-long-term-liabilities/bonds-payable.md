---
title: Liabilities & Bonds Payable (Week 9)
tags: [financial-accounting, acct101, liabilities, bonds, discount, amortisation]
sources: [fa/guided-notes/Week 9 - Guided Notes.pdf]
updated: 2026-06-18
pagerank: 0.0119
betweenness: 0.0001
eigenvector: 0.0440
degree: 9
community: 2
---

# Liabilities & Bonds Payable — Week 9

## Classification of Liabilities

| Category | Definition | Examples |
|------|------|------|
| **Current liability** | Due within 1 year or the normal operating cycle (whichever is longer) | A/P, Unearned Revenue, Salaries Payable |
| **Non-current liability** | Due beyond that period | Bank Loan, **Bonds Payable** |

---

## What Is a Bond?

A long-term interest-bearing note payable. Issued like shares to raise funds.
- **Principal (face value)**: the amount to be repaid at maturity
- **Coupon rate**: the interest rate paid periodically on the face value
- **Market yield**: the return the market demands → **determines the issue price**

Key relationships:
```
coupon = market  →  issue price = face value (at par)
coupon < market  →  issue price < face value (at discount)
coupon > market  →  issue price > face value (at premium)
```

---

## Issued At Par

Example: $100,000, 10 years, 5% annual coupon, 5% market yield.

| Point in time | Journal entry |
|------|------|
| Issuance | DR Cash 100K / CR Bonds Payable 100K |
| Coupon payment | DR Interest Expense 5K / CR Cash 5K |
| FYE falls before a coupon (e.g., issued 6/30, year-end 12/31) | DR Interest Expense 2.5K / CR Interest Payable 2.5K |
| Next coupon payment | DR Interest Payable 2.5K / DR Interest Expense 2.5K / CR Cash 5K |
| Repayment at maturity | DR Bonds Payable 100K / CR Cash 100K (the final coupon is recorded separately) |

> A bond is a **liability** — at issuance, debit Cash and credit Bonds Payable.

---

## Issued At Discount

If the market yield (6%) > coupon (5%), the bond is issued **below face value** to compensate for the lower coupon.
The issue price is computed using the tables in [[fa-concepts/ch09-long-term-liabilities/time-value-of-money]], **always using the market yield**:

```
PV of Principal : 100,000 × PV factor   = 55,800
+ PVA of Coupons:   5,000 × PVA factor  = 36,800
─────────────────────────────────────────────────
Issue Price                              = 92,600
Discount = 100,000 − 92,600 = 7,400  (contra-liability)
```

**Issuance journal entry**:
```
DR Cash               92,600
DR Discount on B/P     7,400
CR Bonds Payable     100,000
```

**Balance sheet presentation (Carrying Value)**:
```
Bonds Payable          100,000
Less: Discount on B/P  (7,400)
Carrying Value          92,600
```

---

## Discount Amortisation

The discount is amortised to bring the carrying value up to face value at maturity — the **effective interest method**.
- The discount is eroded with each coupon
- **Interest Expense > Cash paid (coupon)** → the carrying value gradually increases
- Track the carrying value with an amortisation table, like a depreciation schedule

> **Exam tip**: At a discount → interest expense each period is **greater than the cash coupon** (the difference = discount amortisation). To compute the issue price, use the PV table for the principal and the PVA table for the coupons, **both at the market interest rate**.

---

## Related Concepts

- [[fa-concepts/financial-accounting]] ← concept map (MOC)
- [[fa-concepts/ch09-long-term-liabilities/time-value-of-money]] ← issue price = PV(principal) + PVA(coupons)
- [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]] ← treatment of interest expense and removal of early-redemption gains/losses (indirect method Steps 2 & 3)
