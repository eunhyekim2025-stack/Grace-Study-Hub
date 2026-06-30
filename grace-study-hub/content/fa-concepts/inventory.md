---
title: Inventory — Perpetual System (Week 5)
tags: [financial-accounting, acct101, inventory, cogs, perpetual, fob]
sources: [fa/guided-notes/Week 5 - Guided Practice Notes.pdf]
updated: 2026-06-18
pagerank: 0.0083
betweenness: 0.0001
eigenvector: 0.0441
degree: 8
community: 2
---

# Inventory — Perpetual System (Week 5)

Inventory is an asset **held for sale in the ordinary course of business**, or to be used in production or the provision of services (FRS 2-6).
ACCT101 covers only the **Perpetual Inventory System** — inventory and revenue are updated **simultaneously**.

> Core flow: unsold inventory → **Inventory (current asset)** / sold inventory → **COGS (expense)**.

---

## Inventory ≠ Supplies

| Category | Treatment |
|------|------|
| **Inventory** | Held for sale → expensed as **COGS** when sold |
| **Supplies** | Consumed in internal operations → recorded as an **operating expense** when used |

> Service businesses (e.g., a hair salon) generally have no COGS — shampoo, towels, etc., are operating expenses. However, if products are marked up and resold, COGS arises.

---

## Measuring Inventory

```
Inventory cost = purchase price (price × qty)
        + inbound transportation (transportation-in / freight-in)
        − purchase returns
        − purchase discounts
```
> Transportation is not subtracted; it remains in the cost. **Inventory cost should be less than the intended selling price.**

---

## Perpetual System Journal Entries

### Purchase-side
| Transaction | Journal entry |
|------|------|
| Purchase on credit | DR Inventory / CR A/P |
| Freight-in | DR Inventory / CR Cash |
| Purchase return | DR A/P / CR Inventory |
| Purchase discount | DR A/P / CR Inventory |

### Sales-side — **always two pairs of entries**
| Transaction | Journal entry |
|------|------|
| Sale on credit | DR A/R / CR Sales Revenue (selling price) **+** DR COGS / CR Inventory (cost) |
| Sales return (contra-rev.) | DR Sales Returns / CR A/R **+** (if reusable) DR Inventory / CR COGS |
| Sales discount | DR Sales Discount / CR A/R |

> Sales Returns and Sales Discounts are **contra-revenue** → subtracted from Sales to arrive at **Net Sales**.

---

## Income Statement Format

```
Sales Revenue              xxx
Less: Sales Returns        (xx)   ← contra-revenue
Less: Sales Discounts      (xx)
Net Sales                  xxx
Less: COGS                 (xx)
Gross Profit               xxx
Add: Other income/losses    xx
Less: Selling & Admin exp  (xx)
Net Profit                 xxx
```

---

## Shipping Terms

These determine when legal title transfers and who bears the freight cost.

| Term | Title transfers | In-transit inventory belongs to | Freight borne by |
|------|----------------|------------------|------------|
| **FOB Destination** | On arrival at the buyer | **Seller** | **Seller** (Delivery Expense) |
| **FOB Shipping Point** | When the seller ships | **Buyer** | **Buyer** (added to Inventory) |

- Freight on an FOB Shipping Point purchase: `DR Inventory / CR Cash` (included in cost)
- Freight on an FOB Destination sale: `DR Delivery Expense / CR Cash` (expensed)

> **Exam tip**: "If I pay the freight and the goods come into my inventory" → DR Inventory. "If I pay the freight but I'm the seller" → DR Delivery Expense. The point at which title transfers determines who holds the in-transit inventory.

---

## Credit Terms Notation (e.g., 2/20, n/30)

"2% discount if paid within 20 days, otherwise full amount within 30 days." If paid within the discount period, the buyer records a purchase discount and the seller records a Sales Discount.

---

## Related Concepts

- [[fa-concepts/financial-accounting]] ← concept map (MOC)
- [[fa-concepts/statement-of-cash-flows]] ← COGS and inventory changes feed directly into operating cash flow (working capital)
