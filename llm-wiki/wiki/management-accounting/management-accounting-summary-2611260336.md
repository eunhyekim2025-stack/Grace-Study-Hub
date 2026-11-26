---
title: "Management accounting — Revision summary"
tags: [summary, auto-generated]
created: 2026-11-26
---

> [!summary] Key takeaways  
- Rank products by **contribution margin per constrained‑resource unit**; allocate the scarce resource to the highest‑ranked product first.  
- A transfer‑price negotiation is feasible only when the seller’s minimum price (its opportunity cost) and the buyer’s maximum price (the cheaper of external purchase or total internal cost) overlap.  
- Only **avoidable (relevant) costs** should be used in both capacity and transfer‑price decisions; sunk or allocated fixed costs are ignored.  
- Relieve a bottleneck by subcontracting, adding capacity, or redesigning the process; otherwise the firm may have to turn down profitable internal sales.  
- Mis‑aligned internal prices can turn a firm‑wide optimal plan into a sub‑optimal one, even when each division acts rationally.  

## Capacity‑constrained product selection  

**Theory & concepts**  
- Identify the **constrained resource** (e.g., machine minutes, labor hours, on‑hand inventory parts) that limits overall output.  
- Compute each product’s **contribution margin (CM)** per unit: Sales − Variable costs.  
- Determine how many units of the constrained resource each product consumes.  
- Derive **CM per resource unit** = CM ÷ resource use; this normalises profit contribution to the scarce factor.  
- Rank products by this per‑unit figure and allocate the limited capacity from the highest rank down until the resource is exhausted or demand is satisfied.  

**Key terms**  

| Term | Meaning |
|------|---------|
| Constraint | Any limited resource (machine time, labor, inventory) that caps total production. |
| Contribution margin per resource unit | CM ÷ amount of the constrained resource used; the basis for ranking products when capacity is scarce. |
| Bottleneck | The specific constraint that determines the maximum possible output of the whole system. |
| Relevant cost | Cost that changes with the decision; excludes sunk or unavoidable fixed costs. |
| Opportunity cost | The benefit foregone by not using a resource in its next best alternative use. |

**Cases & examples**  
- **Tutoring example** – 6 h of tutor time available. Company A pays $20 for 2 h ($10 / h) and Company B pays $24 for 3 h ($8 / h). Allocate the time to Company A first to maximise earnings.  
- **Production‑capacity example**  

| Product | CM/unit | Minutes/unit | CM/min |
|---------|--------|--------------|--------|
| 1 | $24 | 1 | $24 |
| 2 | $15 | 0.5 | $30 |

  Product 2 yields a higher $/minute, so it is produced first; any remaining minutes go to Product 1.  

**Beyond the textbook**  
- Lecture recording emphasized the warning: *use “per‑resource‑unit” contribution, not raw CM, for all allocation decisions*.  
- Slide deck listed three practical bottleneck‑relief options: subcontract the constrained operation, add machines or labor, or redesign the process to move/eliminate the bottleneck.  

## Transfer pricing fundamentals  

**Theory & concepts**  
- A **transfer price** is the internal price at which one division sells a good or service to another division.  
- Three common bases:  
  1. **Market‑based** – use the prevailing external price.  
  2. **Negotiated** – divisions agree on a price within a mutually acceptable interval.  
  3. **Cost‑based** – start from the seller’s production cost and add a markup; beware of including irrelevant fixed costs.  
- Decision‑making hinges on **relevant (avoidable) costs** only. The seller will not accept a price below its opportunity cost; the buyer will not pay more than its cheapest alternative (external purchase or internal total cost).  

**Key terms**  

| Term | Meaning |
|------|---------|
| Transfer price | Internal price for inter‑division sales of goods or services. |
| Seller’s minimum price | The lowest price the selling division will accept, usually its opportunity cost (often the external market price). |
| Buyer’s maximum price | The highest price the buying division will pay, typically the lower of external purchase cost or total internal cost (including downstream processing). |
| Negotiation interval | The overlap between seller’s minimum and buyer’s maximum; any price inside this range can be agreed. |
| Cost‑based transfer pricing | Pricing method that starts with the seller’s cost and adds a markup; must exclude irrelevant fixed costs to keep the price incentive‑compatible. |

**Cases & examples**  
- **Company Z internal vs. external sourcing** – Division X’s relevant unit cost = $6. External market price = $50. Division Y can (a) buy externally for $12 + $2 shipping = $14, or (b) buy internally at TP = $X, add $10 processing, and sell for $30. Y will choose the lower total cost; X will accept only if TP ≥ its opportunity cost.  
- **Threshold tables** (illustrative):  

| Division | Situation | Minimum TP (seller) | Maximum TP (buyer) |
|----------|-----------|---------------------|--------------------|
| X (no excess) | Must sell externally | $15 (external price) | – |
| X (excess) | Only internal demand | $6 (incremental cost) | – |
| Y (can buy externally) | Choose cheapest source | – | $12 (external price) |
| Y (only internal) | Must cover processing | – | $20 (30‑10) |

- **Overlap cases** –  
  *Case 1*: X has excess capacity (≥ $6) and Y can buy externally (≤ $12) → feasible range **$6–$12**.  
  *Case 2*: X has no excess (≥ $15) and Y must buy internally (≤ $20) → feasible range **$15–$20**.  

**Beyond the textbook**  
- Lecture notes highlighted that a corporate‑set transfer price above the seller’s opportunity cost (e.g., $15 when the external price is $12) can block a mutually beneficial internal trade, leading to a firm‑wide loss.  
- Recent regulatory discussion (global minimum tax) may force multinational firms to justify transfer‑price policies more rigorously, influencing the choice of market‑based or cost‑plus methods.  

## Relevant cost considerations  

**Theory & concepts**  
- **Relevant cost** = any cost that will change as a result of the decision; it includes variable production costs and any incremental costs directly tied to the alternative.  
- **Irrelevant cost** = sunk costs or allocated fixed overhead that will be incurred regardless of the choice; these must be excluded from the analysis.  
- When comparing internal vs. external sourcing, add any variable downstream costs (e.g., processing, shipping) to the internal option, but omit them for the external option if they are avoided.  

**Key terms**  

| Term | Meaning |
|------|---------|
| Variable production cost | Cost that varies directly with output (e.g., $6 per unit); relevant for internal transfer decisions. |
| Allocated fixed cost | Fixed overhead spread across units (e.g., $1 per unit) that does not change with the decision; irrelevant for marginal analysis. |
| Additional variable selling expense | Costs such as shipping or handling that are incurred only when a product is sold externally; affect the buyer’s maximum price. |

**Cases & examples**  
- **Cost comparison table**  

| Cost element | External purchase | Internal purchase |
|--------------|-------------------|-------------------|
| Unit price   | $12               | $6                |
| Shipping     | $2                | $0                |
| **Total**    | **$14**           | **$6**            |

  The $1 allocated fixed cost per unit is ignored because it does not change with the decision.  

**Beyond the textbook**  
- Slide deck warned that using **full cost** (including allocated fixed overhead) in a cost‑plus transfer price inflates the internal price, discouraging beneficial internal trade.  

## Practical tips & power dynamics  

**Theory & concepts**  
- Sketch a simple two‑division flow diagram (showing costs, transfer price, and resulting profits) before performing any calculation; visualising the cash‑flow helps spot hidden incentives.  
- Recognise that divisions with stronger bargaining power may push for a higher transfer price to boost their own profit, while corporate leadership may impose caps to protect overall cost efficiency.  

**Beyond the textbook**  
- Lecture emphasized that “power dynamics” can be managed by setting corporate‑wide transfer‑price policies (e.g., a band around market price) to balance division incentives with firm‑wide optimality.  

## Key formulas  

| Formula | Symbol definition | When to use |
|---------|-------------------|-------------|
| **Contribution Margin (CM)** | CM = Sales − Variable Costs | Base figure for profitability and for per‑resource calculations. |
| **CM per resource unit** | CM / Resource‑use = (Sales − Variable Costs) ÷ Units of constrained resource | Rank products when a bottleneck exists. |
| **Seller’s minimum transfer price** | TP_min = Opportunity cost = External market price (if no excess capacity) or Incremental cost (if excess capacity) | Determines the lowest price the seller will accept. |
| **Buyer’s maximum transfer price** | TP_max = min(External purchase cost, Internal total cost) | Determines the highest price the buyer will pay. |
| **Negotiation interval condition** | TP_min ≤ TP_max → internal transfer feasible | Checks whether divisions can agree on a price. |
| **Relevant cost** | RC = Σ (costs that change with the decision) | Use in any make‑or‑buy, keep‑or‑drop, or transfer‑price analysis. |
| **Predetermined Overhead Rate (POHR)** | POHR = Estimated total manufacturing overhead ÷ Estimated total allocation base | From the Formula Cheat Sheet; needed when overhead is allocated to products. |
| **Cost equation** | Y = a + bX | Total cost (Y) equals fixed cost (a) plus variable cost per unit (b) times activity level (X). |
| **Break‑even (units)** | BE_units = Fixed Expenses ÷ CM per unit | Determines the sales volume at which profit is zero. |
| **Degree of Operating Leverage (DOL)** | DOL = CM ÷ Operating Income | Shows how a % change in sales translates into % change in profit. |

---  

*All explanations, examples, and formulas are drawn directly from the provided study notes; no external information has been added.*
