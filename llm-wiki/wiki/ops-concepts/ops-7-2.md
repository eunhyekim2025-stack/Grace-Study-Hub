---
title: "OPS 7-2 — EOQ & Order Planning"
tags: ["lecture", "recording"]
sources: ["In-class recording — OPS 7-2 (2026-10-01, in-site recorder / Groq transcript)"]
kind: 개념
relations:
  part-of: [operations-management]
created: 2026-10-01
recording:
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-000-hq7wS5IFd2QT88u9LMVGBCOIB1wqHk.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-001-Xspanh6sD8B9LaZPS5xJYK3hkr7Z8F.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-002-gogCQ5TMvzmSBBcH7EJQh8tQWWpIml.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-003-MI4uxCk0zppoZcoVbApovl27qUCGHj.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-004-Knu1WnmFihxBJ5FNqGmhmdqqrw3Js7.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-005-zkMJZIOlFCTZEFMenoAFUthSPyT3SP.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-006-8WRwrfPo4WTrFh8KYE7jN0NBfMwM3I.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-007-FhUOiXXAmHBFXn6sNsbuVyeSGO8XHY.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-008-bJJhPzZgNJxwPBvSQ72hTMM8nr367U.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-009-NGh1rKvj1f6QgjIWAYSIrZEqvlHiaE.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-010-TERQNqtr0sNFsFvqF7GZEDMRZQlx6E.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-011-7KpYOekQBWS8k7boWnIpHPGtAjsbL0.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-012-Bo1UzP7youUZFpMjdinUzETGC0WHxO.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-013-zlC7MdXK7YuE9AjrNW6URjHiuqD7KJ.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-014-wMupHefUPhXeturcZxVIjeTd6r566c.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-015-AKbujkKd8u6lF2j9vTSaHbTdyVjYtC.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-016-fV9iNRIw1FUZTRJGwkerf8OaLGJIGZ.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-017-sjvIAv5ehOiLIXjyWDXhCAoHMMdHGi.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-018-tQrCbTCXSkZO8oUMKnqAFaGfbzD9hl.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-019-cuEwLGwCP13kgEVG3uVQsX8cugfg80.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-020-TC8fabJYZkgpmfCHGaAIHslTEopGX7.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-021-SiWzJ3vIwSNLnOsCIWXs2ar7WpANoz.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-022-4VthSSKKnWkzgGnmd4Szx7smLdoQqs.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-023-k9OCfyGXDayGa4MdrvlgokmY7zrW4u.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-024-VX8wZU0l1JomrPivf0rOLcv87DBLnd.webm"
  - "recordings/operations-management/2026-10-01-ops-7-2/seg-025-fueBZouEfqJTWEkRcLJ3tc1hEBg0B3.webm"
---

> [!note] 🎙️ Original recording archived privately (26 segments) in your Vercel Blob store — not published here.

<div class="dc-view"><div class="dc-title">EOQ & Order Planning</div><div class="dc-sub">Balancing ordering & holding costs, accounting for MOQ, ROP and supplier dynamics</div><div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Identify data</div><div class="dc-step-d">K (setup), H (holding‑rate), D (annual demand)</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Compute EOQ</div><div class="dc-step-d">Q* = √(2KD / H)</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Check constraints</div><div class="dc-step-d">MOQ, capacity, lead‑time</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Calculate costs</div><div class="dc-step-d">TC = K·D/Q + H·Q/2</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">5</div><div class="dc-step-t">Set Reorder Point</div><div class="dc-step-d">ROP = demand × lead‑time + safety stock</div></div></div></div>

> [!summary] Key takeaways  
- EOQ = √(2 K D / H) gives the order size that equalises marginal ordering & holding costs.  
- Total relevant cost = K·D/Q + H·Q/2; purchasing cost is irrelevant for the optimisation.  
- Always compare EOQ with supplier Minimum Order Quantity (MOQ) and capacity limits.  
- Reorder Point = demand during lead time (plus safety stock) – order before stock hits zero.  
- Joint ordering or supply‑chain coordination can turn a high MOQ into a cost advantage.

## 1. EOQ model basics
> [!info] **EOQ definition** – the order quantity that minimises the sum of ordering and holding costs under constant demand.  
- Assumes: constant demand, no spoilage, known (often zero) lead time, no quantity discounts.  
- Real‑world fit: stable‑demand items (energy, staples, average household usage ≈ 6.5 units/yr).  

| Assumption | Typical reality |
|------------|-----------------|
| Constant demand | ✔︎ for staple products |
| No spoilage | ✔︎ durable goods |
| Known lead time | ✔︎ often set to 0 for analysis |
| No discounts | ✖︎ can be added later |
| Unlimited capacity | ✖︎ check against plant/warehouse limits |

## 2. Cost components
> [!info] **Ordering (setup) cost K** – fixed expense each time an order is placed (e.g., $1,000).  
> [!info] **Holding cost H** – cost to keep one unit in inventory for a year (often % of unit price).  

- **Holding cost per cycle** = H × Q/2 (average inventory = Q/2).  
- **Ordering cost per cycle** = K × D/Q (number of orders = D/Q).  
- **Purchasing cost** = c × D (independent of Q → omitted from optimisation).  

### Total relevant cost (TRC)
\[
TC(Q)=\frac{K\,D}{Q}+ \frac{H\,Q}{2}
\]

## 3. EOQ calculation & steps
> [!example] **Sample data** – D = 1,200 units/yr, K = $1,000, H = $2.8 M/yr.  

1. **Compute EOQ**  
   \[
   Q^{*}= \sqrt{\frac{2KD}{H}}
   \]  
2. **Validate against constraints** – if MOQ > Q* → order MOQ; if capacity < Q* → cap at capacity.  
3. **Calculate minimum cost** – plug Q* (or adjusted quantity) into TC(Q).  

> [!warning] **Over‑ordering trap** – ordering far above EOQ (e.g., 15,000 units) reduces theoretical ordering cost but inflates holding cost and ties up capital.

## 4. Practical considerations
### Minimum Order Quantity (MOQ)
- Supplier may impose MOQ > EOQ. Buyer must absorb surplus inventory or collaborate with other buyers.  
- **Joint ordering**: multiple buyers pool demand to meet MOQ, sharing holding cost.

| Situation | Decision |
|-----------|----------|
| EOQ ≤ MOQ | Order MOQ, accept surplus |
| EOQ > MOQ | Order EOQ (subject to capacity) |
| Capacity < EOQ | Order up to capacity, recalc cost |

### Minimal Order Batch (MOB)
- Some contracts set a lower bound on batch size (e.g., 1.5 M units). Treat as a hard MOQ.

### Supplier vs. Buyer cost structures
- Supplier holding cost is lower (they own stock); buyer’s holding cost is higher.  
- Negotiation leverages: buyer can request price breaks for larger joint orders or invest in supplier planning tools.

## 5. Reorder Point (ROP)
> [!info] **ROP definition** – inventory level that triggers a new order, usually set at demand during lead time plus safety stock.  

\[
ROP = \text{Demand per period} \times \text{Lead time (periods)} + \text{Safety stock}
\]

> [!example] Lead time = 2 weeks, demand = 10 units/week → ROP = 20 units. Order when inventory falls to 20.

## 6. Managing disruptions
- Sudden demand spikes or supply interruptions invalidate constant‑demand assumption.  
- Maintain safety stock, develop contingency plans, and consider flexible ordering policies.

## Key terms
| Term | Meaning |
|------|---------|
| EOQ | Economic Order Quantity – optimal order size minimizing ordering + holding costs |
| K | Fixed ordering (setup) cost per order |
| H | Holding (carrying) cost rate per unit per year |
| MOQ | Minimum Order Quantity required by supplier |
| ROP | Reorder Point – inventory level that triggers a new order |
| MOB | Minimal Order Batch – contractual lower bound on order size |
| Safety stock | Extra inventory to protect against demand/lead‑time variability |
