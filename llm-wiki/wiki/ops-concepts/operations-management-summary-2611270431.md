---
title: "Operations Management — Revision summary (OPS #7-1 ~ #13-1)"
tags: [summary, auto-generated]
created: 2026-11-27
---

> [!summary] Key takeaways  
> - **Flow metrics** (rate R, inventory I, time T) are the three numbers that describe any process.  
> - **Little’s Law (I = R × T)** links them; it holds in steady‑state when input ≈ output.  
> - **Flow rate** is the sales (or completions) per time unit, not simply production volume.  
> - **Flow time** is the average time a unit spends in the system; **cycle time** is the gap between successive completions.  
> - **Inventory turns** = 1 / T; **days of supply** = I / R – both translate raw inventory dollars into a cost‑relevant measure.  
> - Choosing the **correct flow unit** is the first step in any operations analysis; a wrong choice corrupts all downstream metrics.  
> - **Order winners** differentiate you; **order qualifiers** are the minimum standards you must meet.  
> - Real‑world calculations (IRS, fast‑food, insurance, banking, medical‑device firms) illustrate how Little’s Law quantifies workload, waiting, and turnover.  

## Ops 2-1 — Process View & Flow Unit  

### Theory & concepts  
- **Process view**: Model the business as a series of activities that convert inputs into outputs; this view enables measurement and improvement.  
- **Flow unit**: The basic entity that moves through the process and defines the output of interest. Selecting the right flow unit is essential because all performance metrics are built around it.  
- **Strategic link**: The chosen process (e.g., job shop vs. line) reflects the firm’s competitive strategy (order winners vs. qualifiers).  

### Key terms  

| Term | Meaning |
|------|---------|
| **Process view** | Representation of a business as a set of linked activities that transform inputs into outputs. |
| **Flow unit** | The indivisible item that travels through the process (e.g., a rider on a roller‑coaster, a tax form, a medical device). |
| **Order winner** | Attribute that gives a firm a competitive edge and wins business (e.g., quality for a job shop). |
| **Order qualifier** | Minimum attribute level required to be considered a viable competitor. |

### Cases & examples  
| Example | What it shows |
|---------|---------------|
| **Roller‑coaster ride** | Riders are the proper flow unit because they enter and exit the system and directly define throughput (revenue). Employees, horsepower, and seats are design inputs, not flow units. |

### Beyond the textbook  
- Lecture slide emphasized the “you cannot manage what you cannot measure” mantra and illustrated the flow‑unit decision with a simple decision‑tree (flow‑through? natural metric?).  

---

## Ops 2-1b — Flow Metrics & Little’s Law  

### Theory & concepts  
- **Flow rate (R)**: Number of units completed and sold per time period; equals min(supply, demand).  
- **Inventory (I)**: Units currently residing in the system (physical or virtual); incurs holding cost.  
- **Flow time (T)**: Average time a unit spends in the system (waiting + service).  
- **Little’s Law**: In steady state, **I = R × T**; analogous to distance = speed × time.  
- **Cycle time**: Time between successive completions; the true productivity measure, distinct from flow time.  
- **Days of supply / flow time**: I / R, indicating how long inventory sits before being sold.  
- **Inventory turns**: Reciprocal of days of supply (R / I), indicating how many times inventory cycles per period.  

### Key terms  

| Term | Meaning |
|------|---------|
| **Flow rate (throughput, R)** | Rate at which the system generates sales; measured in units per time. |
| **Inventory (I)** | Number of units (or dollar value) currently inside the system; includes work‑in‑process and finished goods. |
| **Flow time (T)** | Average elapsed time a unit spends from entry to exit of the process. |
| **Cycle time** | Time interval between two consecutive completions; equals 1 / R when R is expressed per unit time. |
| **Holding cost** | Cost of capital tied up in inventory plus storage, depreciation, insurance, etc. |
| **Days of supply** | I / R; how many days the current inventory would last at the current flow rate. |
| **Inventory turns** | R / I; number of times inventory is sold and replenished in a period. |
| **Little’s Law** | Fundamental relationship I = R × T for steady‑state systems. |

### Cases & examples (worked calculations)  

| Scenario | Data & Calculation | Insight |
|----------|-------------------|---------|
| **IRS tax‑regulation department** | WIP = 588, R = 300 yr = 25 mo, T = I/R = 588 / 25 ≈ 23.5 mo. | Shows that average project duration far exceeds the claimed < 6 months, contradicting the manager’s statement. |
| **Fast‑food restaurant** | 200 customers in 2 h → 100 cust/hr. Average WIP = 45. T = I/R × 60 = 45 / 100 × 60 ≈ 27 min. | Average customer spends ~27 min inside (waiting + service). |
| **Travelers Insurance claims** | 6,000 claims/yr → 120 / wk, processing time = 2 wk. I = R × T = 120 × 2 = 240 claims in process. | Indicates the work‑in‑process level for claims. |
| **Bank checking account** | Avg balance = $3,000, turnover = 6 × /yr → T = 1/6 yr. R = I/T = 3,000 × 6 = $18,000 / yr (≈ $500 / mo). | Demonstrates Little’s Law applied to financial flows. |
| **Medical‑device firm** | Sales = $60 M, ending inventory = $20 M, unit cost = $1,000, sale price = $2,000. I = 20 M / 1,000 = 20,000 units. R = 60 M / 2,000 = 30,000 units/yr. T = I/R = 20,000 / 30,000 ≈ 0.667 yr. Inventory turns = 1 / 0.667 ≈ 1.5 turns/yr. | Shows a relatively slow inventory turnover (1.5 times per year). |
| **Shouldice hospital (steady state)** | Beds occupied per day = 28 × 5/7 ≈ 20. WIP = (56+56+84+112+112+84+56)/7 = 80 patients. Flow time = 4 days. Verify: I = R × T = 20 × 4 = 80. | Confirms Little’s Law for a service‑provider setting. |

### Beyond the textbook  
- Lecture slides highlighted the distinction between **flow rate = sales** versus **production = output**; the “min(supply, demand)” note stresses that excess production merely creates inventory and holding cost.  
- Real‑world comparison of **Tiffany vs. Walmart** illustrated how “days of supply” (78 days vs. 43 days) better captures the cost impact of inventory than raw dollar amounts.  

---

## OPS Practice Set 1 (Applied Little’s Law Problems)  

### Theory & concepts  
- Reinforces the use of **Little’s Law** (I = R × T) to back‑solve for any of the three variables when the other two are known.  
- Demonstrates that **WIP (inventory)** can be expressed either in units or dollar value; the same algebra applies.  

### Key terms  

| Term | Meaning |
|------|---------|
| **WIP (Work‑in‑Process)** | Same as inventory I; the number of units currently in the system. |
| **Flow rate (R)** | Number of units completed per time period (e.g., projects per month). |
| **Flow time (T)** | Average time a unit spends in the system (e.g., months per project). |

### Cases & examples (selected)  

| Example | Calculation | Result |
|---------|-------------|--------|
| **IRS department** | R = 300 / yr = 25 /mo; I = 588; T = I/R = 23.5 mo | Projects take ~2 years on average, contradicting the “< 6 months” claim. |
| **Fast‑food restaurant** | R = 100 cust/hr; I = 45; T = I/R × 60 = 27 min | Average customer dwell time ≈ 27 min. |
| **Travelers Insurance** | R = 6,000 / yr = 120 / wk; T = 2 wk; I = R × T = 240 claims | 240 claims are in process at any time. |
| **Bank account turnover** | Avg balance = $3,000; turnover = 6 × /yr → T = 1/6 yr; R = I/T = $18,000 / yr (≈ $500 / mo). | Shows how cash flow can be analyzed with Little’s Law. |
| **Medical‑device inventory** | I = 20 M / 1,000 = 20,000 units; R = 60 M / 2,000 = 30,000 units/yr; T = 20,000 / 30,000 ≈ 0.67 yr; Turns ≈ 1.5 / yr. | Low turnover indicates capital tied up in inventory. |
| **Account payable/receivable** *(data incomplete in notes)* | – | – (no full calculation provided). |
| **Shouldice hospital** | R = 28 beds × 5/7 ≈ 20 beds/day; I = average occupied beds = 80; T = 4 days; verifies I = R × T. | Confirms Little’s Law in a health‑service context. |

### Beyond the textbook  
- The practice set explicitly connects **Little’s Law** to **financial metrics** (e.g., bank account turnover) and **service settings** (hospital beds), reinforcing its universal applicability.  

---

## Key formulas  

| Formula | Symbol definition | When to use |
|---------|-------------------|-------------|
| **Little’s Law** | I = R × T | Relate inventory, flow rate, and flow time in steady‑state processes. |
| **Flow time** | T = I / R | Compute average time a unit spends in the system when I and R are known. |
| **Flow rate** | R = I / T | Determine how many units are completed per time unit. |
| **Inventory turns** | Turns = R / I = 1 / T | Measure how many times inventory cycles in a period; higher is better (lower holding cost). |
| **Days of supply** | Days = I / R | Express inventory as a time horizon (how many days the current stock will last). |
| **Cycle time** | CT = 1 / R (if R expressed per unit time) | Time between successive completions; useful for line‑balancing and capacity planning. |

---

## Note on missing chapters (#7‑1 through #13‑1)  

The supplied notes contain headings for **OPS 7‑1, 7‑2, 7‑3, 10‑1, 10‑2, 12‑1, 12‑2, 13‑1**, but no accompanying content. Because the instruction forbids inventing or fabricating material, these chapters are omitted from the reference. If additional lecture slides, recordings, or textbook excerpts become available for those sections, they can be incorporated following the same structure.
