---
title: Dividends — Cash, Share & Cumulative Preference (Week 10)
tags: [financial-accounting, acct101, dividends, preference-shares, retained-earnings]
sources: [fa/guided-notes/Week 10 - Guided Notes.pdf]
updated: 2026-06-18
pagerank: 0.0113
betweenness: 0.0000
eigenvector: 0.0439
degree: 9
community: 2
---

# Dividends — Week 10

Distribution of profit to shareholders. A sub-topic of [[fa-concepts/w10-equity-and-dividends/shareholders-equity]]; when cash goes out, it is shown under financing activities (FCF) in the [[fa-concepts/w11-cash-flows/statement-of-cash-flows]].

---

## Order of Events

| Date | Meaning | Journal entry |
|------|------|------|
| **Declaration Date** | Dividend declared | **Entry required** |
| Ex-Dividend Date | From this date the buyer no longer receives the dividend (usually 1 day before record date) | No entry |
| Record Date | Shareholder register fixed | No entry |
| **Payment Date** | Actual payment | **Entry required** |

> Journal entries only on the declaration and payment dates. No entry on the ex-dividend or record dates.

---

## 1) Cash Dividends

Example: 100,000 ordinary shares, $0.10 per share declared.
```
Declaration: DR Dividends        10,000   /  CR Dividend Payable  10,000
Payment:     DR Dividend Payable 10,000   /  CR Cash             10,000
```

---

## 2) Cumulative Preference

Undeclared dividends accumulate as **arrears**, so when a dividend is later declared, **the full arrears are paid first**. Ordinary shareholders receive nothing until all preference arrears have been cleared.

**Example**: 6% cumulative preference shares, 10,000 @ $10 par; ordinary shares, 50,000 @ $1 par. No dividend in 2023; $15,000 total declared in 2024.
```
Annual preference dividend = 6% × 10,000 × $10 = $6,000
Arrears (2023 + 2024) = $6,000 + $6,000 = $12,000  → to preference first
Ordinary share = $15,000 − $12,000 = $3,000
```

> **Exam tip**: Cumulative preference shares are allocated **starting from the arrears**. Not just "this year's" but "all missed years + this year" is filled to the preference shares first, and only the remainder goes to ordinary.

---

## 3) Share Dividends

When cash is short, shares are distributed pro rata → **transfer from RE to share capital**. Under accounting standards, recorded at **market value**.

**Example**: 1,000,000 ordinary shares (@ $0.10 par), 10% share dividend, market price $1.
```
New shares = 10% × 1,000,000 = 100,000 shares,  market value = 100,000 × $1 = $100,000
Declaration: DR Retained Earnings              100,000
             CR Share Dividend Distributable    10,000   (par: 100,000 × $0.10)
             CR APIC-Ordinary                    90,000   (excess)
Distribution: DR Share Dividend Distributable   10,000
              CR Ordinary Shares                 10,000
```

> **Exam tip**: The share dividend amount is **outstanding shares × dividend rate × market price** (not issued/authorised shares). On declaration, reduce RE; on distribution, transfer SDD → share capital.

---

## Related Concepts

- [[fa-concepts/financial-accounting]] ← concept map (MOC)
- [[fa-concepts/w10-equity-and-dividends/shareholders-equity]] ← shares, APIC, treasury shares
- [[fa-concepts/w11-cash-flows/statement-of-cash-flows]] ← cash dividend payments are financing (FCF) outflows
