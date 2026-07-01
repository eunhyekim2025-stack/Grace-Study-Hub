---
title: Bank Reconciliation (Week 4)
tags: [financial-accounting, acct101, cash, bank-reconciliation, internal-control]
sources: [fa/guided-notes/Week 4 - Guided Practice Notes.pdf]
updated: 2026-06-18
pagerank: 0.0079
betweenness: 0.0000
eigenvector: 0.0242
degree: 6
community: 2
---

# Bank Reconciliation — Week 4

A company's **Cash ledger balance** and its **bank statement balance** do not match initially. Bank reconciliation is the procedure of explaining each difference item by item and adjusting both sides separately so that the **adjusted balance** of each agrees.

> Core principle: **Do not force the two balances to match.** Adjust the bank side and the ledger side **separately** to arrive at the same adjusted balance.

---

## Why DR/CR Directions Are Opposite

The same deposit is recorded as a debit or credit depending on who is keeping the records.

| Perspective | Deposit (cash increase) | Reason |
|------|----------------|------|
| Company Cash ledger | **DR (debit)** | The company **OWNS** the cash → asset increase |
| Bank statement | **CR (credit)** | The bank **OWES** the company → bank's liability |

---

## Four Causes of Discrepancy

| Cause | Explanation | Which side to adjust? |
|------|------|--------------|
| **Timing differences** | Deposit in Transit (deposited but not yet recorded by bank), Outstanding Cheque (issued but not yet cleared) | **Bank side** |
| **NSF cheque** | Customer's cheque bounces for insufficient funds → reinstate A/R, decrease Cash | **Ledger side** |
| **Accountant's errors** | Recording errors (e.g., $1,000 recorded as $100) → correct to the accurate amount | The side that made the error |
| **Transactions the accountant was unaware of** | EFT/GIRO, bank service fees (SF), interest income, etc., handled directly by the bank | **Ledger side** |

---

## Reconciliation Procedure (2-sided)

### Bank-side adjustment (no journal entry needed)

```
Bank statement ending balance
+ Deposit in Transit (DIT)
− Outstanding Cheque (OC)        ← OC is always subtracted (cheque has not reached the bank)
± Bank errors
= Adjusted bank balance
```

### Ledger-side adjustment (journal entry required — JE required)

```
Cash ledger ending balance
+ EFT received / interest income
− NSF cheque
− Bank service fee (Service Fee)
± Recording errors
± EFT paid
= Adjusted ledger balance
```

> The two adjusted balances **must be equal**. In the example (CapyHappy), both sides converge to **$29,500**.

---

## CapyHappy Example Summary

- Ledger balance $34,600, bank balance $26,400 → discrepancy
- Bank side: +DIT $8,500 − OC $5,400 = **$29,500**
- Ledger side: +interest $200 +EFT (ABC) $2,000 − advertising expense error $300 − utilities $4,100 − NSF $2,800 − service fee $100 = **$29,500** ✓

> **Exam tip**: An Outstanding Cheque is **always subtracted on the bank side**. NSF, bank fees, interest, and EFT are on the ledger side → accompanied by journal entries. Anything "the company didn't know about" is a ledger adjustment.

---

## Related Concepts

- [[fa-concepts/financial-accounting]] ← concept map (MOC)
- [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]] ← the adjusted cash balance is the starting point of cash flow analysis
