---
title: Integrated Quiz — Law × Decision Analysis × Financial Accounting
tags: [cross-domain, quiz, exam-prep, integration, business-law, decision-analysis, financial-accounting]
sources: [law/Textbook.pdf, da/Textbook.pdf, fa/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0017
betweenness: 0.0006
eigenvector: 0.1194
degree: 19
community: 2
---

# Integrated Quiz — Three-Subject Composite Scenario

A single business case is analyzed through three lenses: **⚖️ Business Law · 📊 Decision Analysis · 💰 Financial Accounting**.
Design basis: [[law-concepts/quiz-methodology]] — **one decisive fact** per card flips the conclusion, and a formed/not-formed **pair** teaches the boundary line.
Cross-map: [[cross-domain/business-lifecycle]].

> Law cards use **IRAC**; DA and FA cards use the **Issue/Method/Application/Conclusion** structure.

---

## Scenario 1 — Capy Furnishings: an import contract

Capy Furnishings (Singapore) imports high-end furniture from the overseas supplier WHAT Co. WHAT Co. sent an email: **"We can supply Box A furniture for $50,000, payment terms 5/15, n/30. FOB Shipping Point."** Capy immediately replied "We accept. Please ship," and DHL picked up Box A the same day.

### 1-⚖️ [LAW] Is WHAT Co.'s email a legal offer?

<details><summary>▶ Model Answer</summary>

**Issue**: Whether the email is a binding offer or a mere invitation to treat (ITT)

**Rule** (*Gay Choon Ing v Loh* [2009]): An offer must satisfy three requirements — ① clear and definite terms, ② an objective intention to be bound, ③ communication to the other party. A notice that merely states a price is an ITT.

**Application**:
- The email **specifies the item (Box A), price ($50,000), payment terms (5/15, n/30), and shipping terms all in full** ← decisive fact
- "Can supply" is a definite promise → intention to be bound
- Capy's "accept" reply produces a mirror-image match

**Conclusion**: An offer is formed → acceptance creates a **binding contract**.

> **Exam tip**: If price, quantity, and terms are **specified**, it is an offer; if "price may vary / for reference only," it is an ITT. Specificity + intention to be bound is the boundary line.

</details>

### 1-💰 [FA] What are the purchase entry and the payment-within-discount-period entry?

<details><summary>▶ Model Answer</summary>

**Issue**: Handling purchase, freight, and purchase discount under FOB Shipping Point + perpetual inventory

**Method** ([[fa-concepts/inventory]]): Under FOB Shipping Point, **the buyer recognizes inventory at shipment (pickup)**. Freight-in is added to inventory cost; purchase discounts are deducted from inventory.

**Application**:
- Pickup date: **title transfers to Capy immediately upon pickup** ← decisive fact
  - DR Inventory 50,000 / CR A/P 50,000
  - DR Inventory 3,000 / CR Cash 3,000 (DHL freight)
- Payment within 15 days (5% discount = 50,000 × 5% = 2,500):
  - DR A/P 50,000 / CR Inventory 2,500 / CR Cash 47,500

**Conclusion**: Inventory cost = 50,000 + 3,000 − 2,500 = **$50,500**.

> **Exam tip**: FOB Shipping Point → buyer's inventory immediately upon pickup. Freight is **added**, discount is **deducted** (both in the Inventory account). Under FOB Destination, there is no buyer entry until arrival.

</details>

### 1-📊 [DA] One demand simulation

Monthly furniture demand is Normal(μ=100, σ=20). Simulation random number r = 0.8531 (→ z = +1.05).

<details><summary>▶ Model Answer</summary>

**Issue**: Generating one demand value from a normal-distribution random number

**Method** ([[da-concepts/simulation]]): `Demand = µ + zσ`

**Application**:
- r = 0.8531 > 0.5 → **z = +1.05 (above the mean)** ← decisive fact
- Demand = 100 + 1.05(20) = **121 units**

**Conclusion**: Simulated demand = **121 units**.

> **Exam tip**: r>0.5 → above the mean, r<0.5 → below the mean. Substitute the sign directly into µ+zσ.

</details>

---

## Scenario 2 — GreenBuild: Financing a New Factory

GreenBuild wants to raise funds to expand its factory. There are two options. **(A) Issue bonds** — $100,000, 10-year maturity, 5% annual coupon. The current market yield is **6%** (PV factor 0.558, PVA factor 7.360 provided). **(B) Variable-rate bank loan** — the applicable rate is uncertain, estimated at 5% (probability 0.3), 6% (0.5), 7% (0.2). Meanwhile, in the course of pursuing the loan, the bank demanded a personal guarantee from the founder, pressing for a signature within one hour with **"if you refuse, we will immediately breach the existing loan agreement already in place."**

**Q: ① If bonds are issued, what is the issue price and the issuance entry? ② On an expected-cost basis, which is more advantageous, bonds (A) or the loan (B), and what is its limitation? ③ Is the guarantee agreement the founder signed under pressure enforceable?**

<details><summary>▶ Model Answer (integrated)</summary>

A single financing decision flows through three stages: **accounting treatment (💰) → quantitative comparison (📊) → legal effect (⚖️)**.

**① 💰 Bond issue price [FA]** — [[fa-concepts/bonds-payable]], [[fa-concepts/time-value-of-money]]
Issue price = PV of principal + PVA of coupons, **always discounted at the market yield**.
- **coupon 5% < market 6% → issued at a discount** ← decisive fact
- PV(principal) = 100,000 × 0.558 = 55,800
- PVA(coupon $5,000) = 5,000 × 7.360 = 36,800
- Issue price = 55,800 + 36,800 = **$92,600**, discount = $7,400 (contra-liability)
- Entry: DR Cash 92,600 / DR Discount on B/P 7,400 / CR Bonds Payable 100,000

**② 📊 Bonds vs loan expected cost [DA]** — [[da-concepts/simulation]]
Use `EV = Σ(probability × outcome)` to compare the uncertain loan rate with the bond's fixed rate.
- EV(loan rate) = 0.3(5%) + 0.5(6%) + 0.2(7%) = **5.9%** ← decisive calculation
- The bond is **fixed at 6%**, the loan is expected at 5.9% but carries the risk of rising to 7%
- → The expected cost is slightly lower for the loan, but **if risk-averse, choose the fixed-6% bond**. Don't decide on EV alone.

**③ ⚖️ Economic duress on the guarantee [LAW]** — [[law-concepts/duress]]
Economic duress requires ① **illegitimate pressure**, ② the absence of a reasonable alternative, ③ causation.
- **The bank threatened to unlawfully breach a lawful existing contract** ← decisive fact → illegitimate pressure
- The 1-hour deadline → no reasonable alternative; the pressure was the cause of the signature
- → economic duress is made out → the guarantee agreement is **voidable**.

**Conclusion**: The bonds are issued at a discount of **$92,600**; on expected cost the loan (5.9%) is lower than the bonds (6%), but the choice accounts for risk; and the guarantee attached to the loan is **voidable for unlawful pressure** → the three conclusions interlock so that "guarantee risk when pursuing the loan" feeds back into the decision.

> **Exam tip**:
> - 💰 coupon < market → discount (< par). Read the PV/PVA tables at the **market yield** (not the coupon rate).
> - 📊 EV is a weighted average, but even when lower, consider the **risk (variance)** too — same as the "mean + P(loss)" principle in [[da-concepts/simulation-quiz-problems]].
> - ⚖️ "Threatening a lawful act" (e.g. refusing a new loan) is usually not duress. The boundary line is an "**unlawful threat** (breaching an existing contract)."

</details>

---

## Scenario 3 — Stellar Design: Departure of a Key Designer

A star designer is resigning. The employment contract contains a clause: **"For 3 years after leaving, prohibited from working for a competitor anywhere in the world."**

### 3-⚖️ [LAW] Is the restraint-of-trade clause enforceable?

<details><summary>▶ Model Answer</summary>

**Issue**: The reasonableness of the restraint of trade

**Rule** (*Man Financial v Wong* [2008]): A restraint of trade is prima facie void as contrary to public policy, but is valid if it has ① a **legitimate protectable interest** and ② a **reasonable scope** (area, duration, activity) as between the parties and in the public interest. Excessive parts can be severed with the blue pencil.

**Application**:
- **"Worldwide, 3 years, all competitors" is excessive in scope relative to the protectable interest** ← decisive fact → unreasonable
- The interest in protecting trade secrets/customer relations is recognized, but the scope is excessive

**Conclusion**: The current clause is **void (unreasonable)**. If only the reasonable part can be severed, it is partly retained.

> **Exam tip**: The boundary line is the **reasonableness of scope**. "Singapore, 6 months, specific customers" is valid; "worldwide, several years, all activities" is void. Proportionality relative to the protectable interest.

</details>

### 3-💰 [FA] Treasury Share Reissue Entry as a Retention Incentive

The company reissues 10,000 treasury shares it holds (cost $20) to the designer at **$25**.

<details><summary>▶ Model Answer</summary>

**Issue**: Handling a treasury-share reissue above cost

**Method** ([[fa-concepts/shareholders-equity]]): Reissue price > acquisition cost → the difference is credited to **APIC-Treasury**. Not routed through profit or loss.

**Application**:
- **Reissue price $25 > acquisition cost $20** ← decisive fact → APIC-Treasury created
- DR Cash 250,000 / CR APIC-Treasury 50,000 / CR Treasury Shares 200,000

**Conclusion**: The $50,000 difference is **APIC-Treasury (equity)**, with no effect on current profit or loss.

> **Exam tip**: Reissue > cost → APIC-Treasury **created (CR)**. Reissue < cost → covered by APIC-Treasury (if any)/Retained Earnings **(DR)**. Treasury-share transactions do not enter the P&L.

</details>

### 3-📊 [DA] Optimizing the Designer-Project Assignment

You want to assign the remaining 4 designers 1:1 to 4 projects to minimize total cost.

<details><summary>▶ Model Answer</summary>

**Issue**: Identify the problem type for a 1:1 resource assignment at minimum cost

**Method** ([[da-concepts/Assignment Problem]]): Worker-task 1:1 correspondence, minimize total cost → **Assignment Problem** (a special case of binary-variable LP, [[da-concepts/Linear Programming]]).

**Application**:
- **Each designer to exactly 1 project, each project to exactly 1 person** ← decisive structure → assignment problem
- A special case of the transportation problem where both supply and demand are 1

**Conclusion**: Model as an **Assignment Problem** (each variable 0/1, row and column sums = 1).

> **Exam tip**: "1:1 correspondence + cost minimization" → Assignment. If the supply/demand quantities are not 1, it is a general [[da-concepts/Transportation Problem]].

</details>

---

## Scenario 4 — Dispute with WHY Co.: Defective Sofas

A defect was found in the sofas Capy sold to WHY Co. The sales contract contains an exemption clause: **"Capy bears no liability whatsoever for any defect."** Meanwhile, WHY returned 1 defective sofa (sale price $1,000, cost $500), which is reusable.

### 4-⚖️ [LAW] Can liability be excluded by the exemption clause?

<details><summary>▶ Model Answer</summary>

**Issue**: Incorporation, interpretation, and UCTA control of the exemption clause

**Rule** ([[law-concepts/exemption-clause]], UCTA): An exemption clause must ① be incorporated, ② pass interpretation (contra proferentem), and ③ satisfy **UCTA reasonableness**. Liability for death/injury caused by negligence **cannot be excluded**; other losses are subject to a reasonableness test.

**Application**:
- **"Bears no liability whatsoever" is a blanket exclusion subject to the UCTA reasonableness test** ← decisive fact
- Personal injury from a dangerous defect cannot be excluded; even mere property damage may fail the reasonableness test

**Conclusion**: Excluding liability by the exemption clause alone is **highly likely impossible** (a UCTA breach).

> **Exam tip**: The boundary line is **UCTA**. Excluding personal injury = void (absolute). Property damage = reasonableness test. The more sweeping the wording (e.g. "howsoever arising"), the harder it is to pass reasonableness.

</details>

### 4-💰 [FA] Sales-Return Entry (Perpetual Inventory)

<details><summary>▶ Model Answer</summary>

**Issue**: The two pairs of entries for a reusable return

**Method** ([[fa-concepts/inventory]]): A sales return is contra-revenue + (if reusable) reversal of inventory and COGS.

**Application**:
- **Return + reusable** ← decisive fact → two pairs of entries
- DR Sales Returns 1,000 / CR A/R 1,000 (sale price)
- DR Inventory 500 / CR COGS 500 (cost, inventory restored)

**Conclusion**: Net Sales decreases by $1,000, and inventory is restored at cost $500.

> **Exam tip**: If **reusable**, **add** the inventory/COGS reversal entry. If scrapped, only the first entry. Always separate sale price (revenue) from cost (inventory).

</details>

### 4-📊 [DA] Simulating the Number of Defects

Distribution of defects per batch: 0(0.5), 1(0.3), 2(0.15), 3(0.05). Random number r = 0.7169.

<details><summary>▶ Model Answer</summary>

**Issue**: Cumulative-interval mapping in a discrete distribution

**Method** ([[da-concepts/simulation-quiz-problems]]): Build the interval table by cumulative probability, then map r.

**Application**:
| Defects | Probability | Interval |
|--------|------|------|
| 0 | .50 | [.00, .50) |
| 1 | .30 | [.50, .80) |
| 2 | .15 | [.80, .95) |
| 3 | .05 | [.95, 1.00) |
- **r = 0.7169 ∈ [.50, .80)** ← decisive fact → 1 defect

**Conclusion**: Simulated number of defects = **1**.

> **Exam tip**: Upper bound of a cumulative interval = previous sum + current probability. Boundaries [lower-inclusive, upper-exclusive).

</details>

---

## Scenario 5 — Apex Trading: Year-End Closing and Authority

### 5-💰 [FA] Bank Reconciliation — NSF Cheque

Apex's ledger cash balance does not match the bank statement. A customer cheque of $2,800 bounced for non-sufficient funds (NSF).

<details><summary>▶ Model Answer</summary>

**Issue**: Where to adjust for the NSF cheque

**Method** ([[fa-concepts/bank-reconciliation]]): NSF is a **ledger-side** adjustment (with an entry) — since cash was not received, A/R is re-recognized.

**Application**:
- **NSF = a dishonor the company was unaware of → deducted from the ledger** ← decisive fact
- DR A/R 2,800 / CR Cash 2,800

**Conclusion**: After adjustment, **deduct $2,800** from the ledger balance.

> **Exam tip**: NSF, bank charges, and EFT are **ledger-side** (entry yes). DIT and outstanding cheques (OC) are **bank-side** (entry no).

</details>

### 5-⚖️ [LAW] Contract by a Manager Exceeding Authority — Agency

The manager's (agent's) approval limit is $50,000, but he concluded a purchase contract worth $200,000. The supplier **did not know** of the limit, and Apex had habitually held him out as head of purchasing.

<details><summary>▶ Model Answer</summary>

**Issue**: Whether, where actual authority is exceeded, the principal is bound by apparent authority

**Rule** ([[law-concepts/agency]]): If the principal's representation leads a third party reasonably to rely on the agent's authority, the principal is bound by **apparent authority** even where actual authority is exceeded. But it fails if the third party knew of the limit.

**Application**:
- Apex held him out as head of purchasing + **the supplier did not know of the limit and relied** ← decisive fact
- The third party's reasonable reliance is satisfied

**Conclusion**: Apparent authority is made out → Apex is **bound by the $200,000 contract**.

> **Exam tip**: The boundary line is the **third party's knowledge**. If it did not know the limit and there is a representation by the principal → bound; **if it knew the limit** → apparent authority fails → the principal is not bound.

</details>

### 5-📊 [DA] Surplus Cash: Dividend vs Investment (Expected Value)

Choose between (A) an immediate dividend with the surplus cash, or (B) investing in a project with uncertain expected returns. Project net income: $0 (0.4), $30,000 (0.6).

<details><summary>▶ Model Answer</summary>

**Issue**: Comparing the expected value of an uncertain investment option

**Method** ([[da-concepts/simulation]]): Evaluate the investment with `EV = Σ p×outcome`, then compare with the certain alternative.

**Application**:
- EV(investment) = 0.4(0) + 0.6(30,000) = **$18,000** ← decisive calculation
- A dividend is a cash outflow (FCF), and if the investment EV is positive and exceeds the cost of capital, the investment is superior

**Conclusion**: EV $18,000 > 0 → if risk-tolerant, **invest**; if stability-preferring, dividend. (If a dividend is chosen, [[fa-concepts/dividends]] entry; the cash flow is a **financing-activity (FCF)** outflow in [[fa-concepts/statement-of-cash-flows]])

> **Exam tip**: Use EV to gauge superiority, but also weigh the dividend's accounting treatment (FCF) and risk preference. EV is the starting point, not the end point.

</details>

---

## Decisive Fact → Conclusion (Integrated Summary Table)

| # | Subject | Decisive fact | Conclusion |
|---|------|------------|------|
| 1-⚖️ | Law | Price, quantity, terms all specified | Offer made out → contract |
| 1-💰 | FA | FOB Shipping Point + pickup | Buyer recognizes inventory immediately, cost $50,500 |
| 1-📊 | DA | r=0.8531 → z=+1.05 | Demand 121 |
| 2-💰 | FA | coupon 5% < market 6% | Discount issue $92,600 |
| 2-📊 | DA | EV = Σ p×rate | 5.9% (risk considered) |
| 2-⚖️ | Law | Threat to breach existing contract (unlawful) | Economic duress → voidable |
| 3-⚖️ | Law | Worldwide, 3 years, all (excessive) | Restraint of trade void |
| 3-💰 | FA | Reissue price $25 > cost $20 | APIC-Treasury created |
| 3-📊 | DA | 1:1 correspondence + minimum cost | Assignment Problem |
| 4-⚖️ | Law | Blanket exemption + UCTA | Liability cannot be excluded |
| 4-💰 | FA | Return + reusable | Two pairs of entries (inventory restored) |
| 4-📊 | DA | r=0.7169 ∈ [.50,.80) | 1 defect |
| 5-💰 | FA | NSF = company unaware | Ledger-side deduction |
| 5-⚖️ | Law | Third party unaware of limit + principal's representation | Apparent authority → bound |
| 5-📊 | DA | EV = 0.6×30,000 | $18,000 |

---

## Connected Concepts

- 🗺️ [[cross-domain/business-lifecycle]] — three-subject cross-map
- ⚖️ [[law-concepts/quiz-methodology]] — common design methodology
- 📊 [[da-concepts/simulation-quiz-problems]] · 💰 [[fa-concepts/financial-accounting]]
