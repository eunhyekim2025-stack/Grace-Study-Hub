---
title: Shareholders' Equity — Shares & Treasury (Week 10)
tags: [financial-accounting, acct101, equity, shares, apic, treasury-shares]
sources: [fa/guided-notes/Week 10 - Guided Notes.pdf]
updated: 2026-06-18
pagerank: 0.0113
betweenness: 0.0000
eigenvector: 0.0439
degree: 9
community: 2
---

# Shareholders' Equity — Shares & Treasury Shares (Week 10)

Components of shareholders' equity: in addition to Retained Earnings (accumulated profit), Net Profit, and Dividends, this week covers **share issuance and treasury shares**.

> Distributions (dividends) are on a separate page: [[fa-concepts/ch10-equity/dividends]].

---

## Issued vs Outstanding Shares

- **Authorised shares**: the lifetime issuance ceiling set at incorporation
- **Issued / Outstanding shares**: shares actually issued to and held by investors
- Each class of shares is assigned a **par value**

### Ordinary vs Preference

| Type | Features |
|------|------|
| **Ordinary** | Voting rights, dividends (when declared), residual claim on assets |
| **Preference** | **Fixed dividend rate**, **priority** over ordinary in dividends and liquidation (e.g., "5% Preference shares") |

---

## APIC (Additional Paid-In Capital)

The amount issued **in excess of** par value is credited to a separate equity account, **APIC**. It can be separated by class (APIC–Ordinary, APIC–Preference).

### Issuance Journal Entries
| Case | Journal entry |
|------|------|
| 2,000 ordinary shares @ $0.01 (par $0.01) | DR Cash 20 / CR Ordinary Shares 20 |
| 2,000 ordinary shares @ $1 (par $0.01) | DR Cash 2,000 / CR APIC-Ordinary 1,980 / CR Ordinary Shares 20 |
| 1,000 preference shares @ $30 (par $30) | DR Cash 30K / CR Preference Shares 30K |
| 1,000 preference shares @ $30 (par $40)\* | DR Cash 40K / CR APIC-Preference 10K / CR Preference Shares 30K |

> Par = the share-capital account (par), the excess = APIC. (\*per the notation in the notes' example)

---

## Balance Sheet Presentation (Shareholders' Equity)

```
Preference shares, $30 par; 100,000 authorised; 1,000 issued & outstanding   30,000
Additional paid-in capital - Preference                                       10,000
Ordinary shares, $0.01 par; 1,000,000 authorised; 2,000 issued & outstanding      20
Additional paid-in capital - Ordinary                                          1,980
Retained earnings                                                              8,000
Total Shareholders' Equity                                                    50,000
```

---

## Treasury Shares

Shares the company **repurchases of its own previously issued shares**. **Contra-equity** → reduces total equity. Once repurchased, they are no longer outstanding. They may be reissued later.

| Transaction | Journal entry | Mnemonic |
|------|------|------|
| Purchase @ $20 (20,000 shares) | DR Treasury Shares 400K / CR Cash 400K | "DR T-Shares" |
| Reissue @ $20 (equal to cost) | DR Cash 200K / CR T-Shares 200K | **at cost** |
| Reissue @ $25 (above cost) | DR Cash 250K / CR APIC-Treasury 50K / CR T-Shares 200K | "**CR**eate APIC" |
| Reissue @ $15 (below cost) | DR Cash 150K / DR APIC-Treasury 50K / CR T-Shares 200K | "**DR**ain RE/APIC" |

> **Exam tip**: Reissue price > cost → **create (credit)** APIC-Treasury. Reissue price < cost → cover the shortfall from APIC-Treasury (if any) or from **Retained Earnings (debit)**. Treasury share transactions never go through the income statement (P&L).

---

## Related Concepts

- [[fa-concepts/financial-accounting]] ← concept map (MOC)
- [[fa-concepts/ch10-equity/dividends]] ← equity distributions (cash, share, cumulative preference)
- [[fa-concepts/ch11-cash-flows/statement-of-cash-flows]] ← share issuance and treasury share repurchases are financing activities (FCF)
