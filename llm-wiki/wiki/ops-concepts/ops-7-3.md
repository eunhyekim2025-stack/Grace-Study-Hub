---
title: "OPS 7-3"
tags: ["lecture", "recording"]
sources: ["In-class recording — OPS 7-3 (2026-10-01, in-site recorder / Groq transcript)"]
kind: 개념
relations:
  part-of: [operations-management]
created: 2026-10-01
recording:
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-000-qy7xdErEq3hZKNlrxkXxFVZgHkhbW6.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-001-dKfZARyiZTvwoOFALH33uZZyQEqv3s.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-002-gtJ1sXVEvUe2qyaeNBHF8qYYhJyQjO.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-003-YBfc81FmdipF9F6XT3UOXOknUaJl8l.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-004-K9Hrlm6Tz9XBPqjHo8MYUhULzcUOL9.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-005-UKTdoPk8AMKUX468qVBtMBUxpDEgC4.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-006-3Uu6RtL6pYbGN0n32k50E35Bm0A3mh.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-007-VXG5xlGErZimsyKwadNUs9dZuhtUaE.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-008-4Vwzh61U1L94twweth5QNNV6TYpLSN.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-009-7GvqawARAg8unpU6xfqoiJbdnBKq7q.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-010-aNbdEeL8SFAqIrcDZcelv34XRZKtsr.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-011-zXTRvI4TWXhuY7tUnzGkAV0Y1duQ66.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-012-fFyQvKzfm4f22CUcUO2h6BUpIRKOrj.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-013-mRJt2gwgq24ycBPBdBHKVrgfmyHbyl.webm"
  - "recordings/operations-management/2026-10-01-ops-7-3/seg-014-ab46w6CBqmX1BElaA8hzOlRawuRGVY.webm"
---

> [!note] 🎙️ Original recording archived privately (15 segments) in your Vercel Blob store — not published here.

<div class="dc-view"><div class="dc-title">OPS #7-3</div><div class="dc-sub">Reorder‑point inventory control – from demand to order trigger</div><div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Annual demand</div><div class="dc-step-d">Convert to a consistent time unit (e.g., daily)</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Lead time</div><div class="dc-step-d">Time between order placement and receipt</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Lead‑time demand</div><div class="dc-step-d">Demand rate × lead time</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Reorder point (ROP)</div><div class="dc-step-d">Set order trigger when inventory position ≤ lead‑time demand</div></div></div></div>

> [!summary] Key takeaways  
- ROP = demand rate × lead time (must use consistent time units).  
- Inventory position = on‑hand + pipeline inventory; trigger order when ≤ ROP.  
- Convert annual demand to daily (or period) demand before calculations.  
- Lead time must be shorter than the order‑cycle length for the model to hold.  
- Consistency of units (days, months, years) is essential for accurate results.  

## Reorder Point Basics
> [!info] **Reorder Point (ROP)** – The inventory level at which a new order is placed to avoid stock‑outs.  
- Calculated as **lead‑time demand** (demand during the supplier’s lead time).  
- Works best when demand is relatively constant.

## Calculating Lead‑Time Demand
> [!info] **Lead‑time demand** = demand rate × lead time.  
- **Demand rate**: units per time period (e.g., 1,200 units/year).  
- **Lead time**: time from order placement to receipt (e.g., 3 months = 3/12 year).  

| Parameter | Example value | Units |
|-----------|---------------|-------|
| Annual demand | 20,000 | units/year |
| Daily demand | 20,000 ÷ 365 ≈ 55 | units/day |
| Lead time | 5 days | days |
| Lead‑time demand | 55 × 5 = 275 | units |

> [!example] If demand = 1,200 units/year and lead time = 3 months, lead‑time demand = 1,200 × (3/12) = 300 units. Set ROP = 300 units.

## Inventory Position
> [!info] **Inventory position** = on‑hand inventory + pipeline (outstanding) inventory.  
- **On‑hand**: stock physically available.  
- **Pipeline**: units already ordered but not yet received.  

> [!warning] Do **not** use only on‑hand inventory to decide ordering; ignoring pipeline inventory can cause premature orders or stock‑outs.

### How it works
1. When a new order is placed, pipeline inventory increases by the order quantity.  
2. As time passes, on‑hand inventory is consumed by demand.  
3. When inventory position ≤ ROP, place the next order.

> [!example]  
- Order size = 100 units, lead time = 3 months.  
- At month 0: on‑hand = 0, pipeline = 0 → position = 0 → order placed (100).  
- Month 1: on‑hand = 0, pipeline = 100 → position = 100.  
- Month 2: on‑hand = 0, pipeline = 200 (second order placed) → position = 200.  
- Month 3: first shipment arrives → on‑hand = 100, pipeline = 200 → position = 300 (equals ROP).  
- Order again because position ≤ ROP.

## Order Cycle Considerations
- **Cycle length (T)** must be longer than lead time (L) for the model to be valid.  
- If L ≥ T, the system cannot replenish before the next order is due, leading to stock‑outs.  

> [!warning] Ensure **L < T**; otherwise adjust order frequency or negotiate shorter lead times.

## Practical Tips
- Always convert demand to the same time unit as lead time before multiplying.  
- Verify operating days per year (e.g., 250 days) to compute daily demand accurately.  
- Use the same cost horizon (annual, monthly) for all cost components (holding, ordering).  

## Key terms
| Term | Meaning |
|------|---------|
| Reorder Point (ROP) | Inventory level that triggers a new order (lead‑time demand). |
| Lead‑time demand | Expected demand during the supplier’s lead time. |
| Inventory position | Sum of on‑hand and pipeline inventory. |
| On‑hand inventory | Stock physically available for immediate use. |
| Pipeline inventory | Stock that has been ordered but not yet received. |
| Demand rate | Units required per unit of time (e.g., per day, per month). |
