---
title: "Management accounting — Revision summary"
tags: [summary, auto-generated]
created: 2026-11-26
---

> [!summary] Key takeaways  
- Rank products by **contribution per constrained‑resource unit**; allocate the scarce resource to the highest‑ranked product.  
- Transfer‑price negotiation hinges on the **seller’s minimum (opportunity cost)** and the **buyer’s maximum (external cost)**; an internal transfer is possible only when these intervals overlap.  
- Only **avoidable (relevant) costs** matter for both capacity and transfer‑price decisions; sunk or allocated fixed costs are ignored.  
- Bottlenecks can be relieved by subcontracting, adding capacity, or redesigning the process.  
- Mis‑aligned transfer prices can turn a firm‑wide optimal decision into a sub‑optimal one, reducing overall profit.  
- Use “per‑resource‑unit” contribution, not raw contribution margin, for every allocation decision.  
- The negotiation interval provides a clear, quantitative range for a mutually acceptable internal price.  

---

## Capacity‑constrained product selection  

### Theory & concepts  
- **Identify the bottleneck** – determine which resource (machine minutes, labor hours, inventory parts, etc.) limits overall output.  
- **Compute contribution margin (CM) per unit** – subtract variable costs from sales price for each product.  
- **Determine resource usage per unit** – quantify how many units of the constrained resource each product consumes.  
- **Calculate CM per resource unit** – divide the product’s CM by its resource usage; this yields the profit contribution of each scarce‑resource hour.  
- **Rank and allocate** – start with the product having the highest CM/resource‑unit, satisfy its demand, then move to the next product until the bottleneck capacity is exhausted.  
- **Relief options** – if the bottleneck is too restrictive, consider subcontracting the operation, adding more capacity, or redesigning the process to shift the constraint.  

### Key terms  

| Term | Meaning |
|------|---------|
| Constraint | Any limited resource that caps production (e.g., machine time, labor hours, inventory parts). |
| Contribution margin per resource unit | CM ÷ amount of constrained resource used; the basis for ranking products when capacity is scarce. |
| Bottleneck | The specific constraint that determines the maximum possible output of the system. |
| Relevant cost | Cost that changes with the decision; excludes sunk or unavoidable fixed costs. |
| Opportunity cost | The benefit foregone by not using a resource in its next best alternative use. |

### Cases & examples  
- **Tutoring example** – 6 h of tutor time are available. Company A pays $20 for 2 h ($10 / h) and Company B pays $24 for 3 h ($8 / h). Allocate the time to Company A first to maximize earnings.  
- **Production‑capacity example**  

| Product | CM/unit | Minutes/unit | CM/min |
|---------|--------|--------------|--------|
| 1 | $24 | 1 | $24 |
| 2 | $15 | 0.5 | $30 |

  Product 2 yields a higher $/minute, so it is produced first; any remaining minutes are used for Product 1.  

### Beyond the textbook  
- **Inventory‑parts illustration** – When on‑hand inventory of a component is insufficient to meet demand, the part becomes a functional constraint; the firm must either order more or adjust production schedules.  
- **Bottleneck‑relief options** – Sub‑contract the constrained operation, add additional machines or labor, or redesign the workflow to eliminate the bottleneck.  

---

## Transfer‑pricing decision framework  

### Theory & concepts  
- **Transfer price definition** – the internal price at which one division sells a part or service to another division within the same firm.  
- **Seller’s minimum price** – the opportunity cost of the selling division, usually the external market price it could obtain or its incremental cost if capacity is excess.  
- **Buyer’s maximum price** – the lower of the external purchase price and the total cost of obtaining the item internally (including any downstream processing).  
- **Negotiation interval** – the overlap between the seller’s minimum and the buyer’s maximum; any price within this range makes an internal transfer mutually beneficial.  
- **Capacity extremes** – when the seller has no excess capacity, its minimum price rises to the external market price; with excess capacity, the minimum falls to the incremental (variable) cost.  
- **Decision rule** – if the negotiation interval is non‑empty, the divisions can agree on an internal price; if it is empty, each division must trade externally.  

### Key terms  

| Term | Meaning |
|------|---------|
| Transfer price | Internal price for inter‑division sales of goods or services. |
| Seller’s minimum price | The lowest price the selling division will accept, equal to its opportunity cost. |
| Buyer’s maximum price | The highest price the buying division will pay, equal to the cheaper of external purchase or internal total cost. |
| Negotiation interval | The range where seller’s minimum ≤ buyer’s maximum; internal transfer is feasible. |
| Relevant cost | Cost that varies with the decision; excludes sunk or unavoidable fixed costs. |
| Opportunity cost | Benefit foregone by not using a resource in its next best alternative. |

### Cases & examples  
- **Company Z internal vs. external sourcing** – Division X’s unit cost (relevant) = $6. External market price = $50. Division Y can (1) buy externally for $12 + $2 shipping = $14, or (2) buy internally at a transfer price **X**, add $10 processing, and sell for $30. Y will choose the lower total cost; X will accept only if **TP ≥ $6** (its incremental cost) and **TP ≤ $50** (its external price).  
- **Threshold tables** – illustrate seller and buyer limits under different capacity situations (e.g., X with no excess capacity has a minimum TP of $15, the external price; Y’s maximum when it can buy externally is $12).  
- **Overlap cases** –  
  *Case 1*: X has excess capacity (min $6) and Y can buy externally (max $12) → feasible range **$6–$12**.  
  *Case 2*: X has no excess capacity (min $15) and Y must buy internally (max $20) → feasible range **$15–$20**.  

### Beyond the textbook  
- **Power dynamics** – Divisions with stronger bargaining power may push the transfer price toward their own profit goal; corporate leadership may impose caps to protect overall cost efficiency.  
- **Regulatory influence** – Global minimum tax rules and transfer‑pricing regulations can shape internal pricing strategies, especially for multinational firms.  
- **Simple flow diagram tip** – Sketch a two‑division diagram showing costs, prices, and profit flows before analysis to visualise the impact of different transfer‑price choices.  

---

## Relevant cost considerations  

### Theory & concepts  
- **Relevant cost definition** – any cost that changes as a result of the decision; excludes sunk costs and any fixed costs that will be incurred regardless of the alternative chosen.  
- **Variable production cost** – costs that vary directly with output (e.g., $6 per unit) are relevant for both capacity and transfer‑price decisions.  
- **Allocated fixed cost** – fixed overhead assigned to a product (e.g., $1 per unit) is irrelevant for incremental decisions; the relevant cost becomes the variable portion only.  
- **Additional variable selling expenses** – these affect the external purchase cost but are avoided when buying internally, thus they belong in the buyer’s maximum price calculation.  

### Key terms  

| Term | Meaning |
|------|---------|
| Variable production cost | Cost that varies with the level of output; directly relevant to decision making. |
| Allocated fixed cost | Fixed overhead distributed to products for reporting; not relevant for incremental decisions. |
| External purchase cost | Total cost of buying from outside the firm, including price, shipping, and any variable expenses. |
| Internal purchase cost | Transfer price plus any additional internal processing costs incurred by the buying division. |

### Cases & examples  
- **Cost comparison table**  

| Cost element | External purchase | Internal purchase |
|--------------|-------------------|-------------------|
| Unit price   | $12               | $6                |
| Shipping     | $2                | $0                |
| **Total**    | **$14**           | **$6**            |

  Shows that using only the variable cost ($6) for the internal price yields a lower total cost than buying externally ($14).  

- **Full‑cost pitfall** – Adding an allocated fixed cost of $1 to the $6 variable cost would raise the internal price to $7, still lower than $14 but illustrates how including irrelevant costs can unnecessarily inflate the transfer price.  

### Beyond the textbook  
- **Regulatory note** – Cost‑based transfer‑pricing methods that incorporate full cost (including fixed overhead) can run afoul of tax authorities because they may not reflect arm’s‑length pricing.  

---

## Key formulas  

| Formula | Symbol definition | When to use |
|---------|-------------------|-------------|
| **Contribution margin (CM)** | CM = Sales − Variable Costs | Base measure of profit contribution per unit. |
| **CM per resource unit** | CMᵣ = CM ÷ Resource use | Rank products when a specific resource is the bottleneck. |
| **Seller’s minimum price** | TPₘᵢₙ = Opportunity cost = max(External price, Incremental cost) | Determines the lowest acceptable internal price for the seller. |
| **Buyer’s maximum price** | TPₘₐₓ = min(External price + shipping, Internal processing cost) | Determines the highest price the buyer will pay. |
| **Negotiation interval condition** | TPₘᵢₙ ≤ TPₘₐₓ → internal transfer feasible | Checks whether an internal price can be agreed upon. |
| **Relevant cost** | RC = Variable costs + any incremental costs | Use for any make‑or‑buy, add‑or‑drop, or transfer‑price decision. |
| **Break‑even (units)** | BE₍units₎ = Fixed expenses ÷ CM per unit | Not directly in the notes but derived from CM concepts. |
| **Degree of operating leverage (DOL)** | DOL = CM ÷ Operating Income | Shows profit sensitivity to sales changes; appears in the formula cheat sheet. |

*All symbols are defined in the table; the formulas are the core quantitative tools needed for capacity allocation and transfer‑price negotiations.*
