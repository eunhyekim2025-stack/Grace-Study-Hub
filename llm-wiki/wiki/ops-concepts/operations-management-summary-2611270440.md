---
title: "Operations Management — Revision summary (forecasting, newsvendor, mrp-erp, spc, esg-supply-chain)"
tags: [summary, auto-generated]
created: 2026-11-27
updated: 2026-11-27
---

> [!summary] Key takeaways  
- Forecasting translates historical demand and external signals into actionable plans for capacity, staffing, budgeting, and risk mitigation.  
- Choose the simplest method that fits the demand pattern (SMA → WMA → Exponential Smoothing → AI); only move to a more complex technique when it demonstrably reduces error.  
- Validate every model with error metrics (MAD, MSE, MAE); the method with the lowest average error over a robust validation horizon is the one to adopt.  
- Seasonal and trend components must be isolated: de‑seasonalize, fit a trend line, then re‑seasonalize to capture recurring spikes and underlying growth.  
- Linear regression (y = A + Bx) provides the optimal trend line by minimizing squared deviations; Excel’s `INTERCEPT` and `SLOPE` functions automate the calculation.  
- External data (e.g., Google Trends) can improve forecasts but require periodic re‑validation because correlations decay over time.  
- Document α, window sizes, seasonal indices, and error‑metric results to ensure auditability and smooth model updates.  
- **Newsvendor** — one order before one uncertain season: balance overage $C_o$ vs underage $C_u$ at the critical ratio $C_u/(C_u+C_o)$; for Normal demand $Q^* = \mu + z\sigma$. Ordering the forecast is optimal only when $C_o = C_u$.  
- **MRP/ERP** — explode the MPS through the BOM into time-phased component orders, top-down by level and offset by lead time; ERP ≈ MRP II + CRM, and most ERP failures are about data/change-management, not software.  
- **SPC** — separate common-cause from assignable-cause variation; x̄ and R charts detect assignable causes; capability $C_p = (USL-LSL)/6\sigma$ (control limits ≠ spec limits); Six Sigma targets $C_p = 2$.  
- **ESG supply chains** — the problem is moral hazard (unobservable supplier conduct); four levers (audits · disclosure · penalty schemes · cooperative auditing), and raising the goodwill cost of being caught strengthens them all.  

## OPS 6-1 — Forecasting Fundamentals  

### Theory & concepts  
- **Data collection** – Gather historical sales, usage statistics, and relevant external indicators (e.g., search‑trend indices).  
- **Method selection** – Decide among Simple Moving Average (SMA), Weighted Moving Average (WMA), Exponential Smoothing, or AI/Big‑Data models based on data length, desired responsiveness, and implementation effort.  
- **Model validation** – Compute forecast errors (MAD, MSE, MAE) on a hold‑out or rolling‑window sample; adjust parameters (α, weights, window size) to minimize the chosen error metric.  
- **Operational deployment** – Translate the selected forecast into capacity sizing, labor planning, budgeting, and risk‑management buffers.  

### Key terms  

| Term | Meaning |
|------|---------|
| **α (alpha)** | Smoothing factor in exponential smoothing (0 ≤ α ≤ 1); lower α gives more weight to past forecasts, higher α emphasizes the latest observation. |
| **SMA** | Simple Moving Average; arithmetic mean of the last *n* periods with equal weights. |
| **WMA** | Weighted Moving Average; recent periods receive higher pre‑assigned weights that sum to 1. |
| **MAD** | Mean Absolute Deviation; average of absolute forecast errors, treating all deviations equally. |
| **MSE** | Mean Squared Error; average of squared forecast errors, penalizing larger deviations more heavily. |
| **MAE** | Mean Absolute Error; synonymous with MAD, often reported for comparability with industry benchmarks. |
| **Red line** | The projected forecast trajectory (the “line” extended into future periods) used for capacity and financial planning. |
| **Focus error** | The discrepancy between a set target (focus) and the actual measured value; minimized by selecting an appropriate error metric. |

### Cases & examples  
- **Google‑trend vs. sales (2005‑2009)** – Demonstrated a strong positive correlation that weakened after 2009, illustrating the need to re‑validate external signals regularly.  
- **Electricity usage forecasting** – Quarterly household consumption combined with a 5‑year market‑share outlook guided fuel procurement and long‑term grid‑storage decisions.  

### Beyond the textbook  
- Lecture emphasized starting with SMA and only progressing to more sophisticated models when error reduction justifies added complexity.  
- Practical tip: test a range of α values (0.1‑0.5) and retain the one yielding the lowest MAE/MSE; record the chosen α for audit trails.  

## OPS 6-2 — Forecasting Overview (Stationary, Seasonal, Trend)  

### Theory & concepts  
- **Stationary methods** – Apply when demand shows no clear trend or seasonality; typically a moving‑average forecast.  
- **Seasonal methods** – Multiply a base forecast by a seasonal factor (season‑average ÷ overall average) and optionally a growth multiplier for forward periods.  
- **Trend methods** – Use linear regression (y = A + Bx) to capture steady upward or downward movement; the least‑squares line minimizes Σ(observed − predicted)².  
- **Method‑matching rule** – Select the forecasting family that mirrors the observed pattern; never rely on raw prior‑year demand if the pattern has shifted.  

### Key terms  

| Term | Meaning |
|------|---------|
| **Stationary method** | Forecast based on moving average, assuming demand is level with no trend or seasonality. |
| **Seasonal factor** | Ratio of a season’s average demand to the overall average; used to scale the base forecast for each season. |
| **Linear regression** | Trend model y = A + Bx where A is the intercept and B the slope; fitted by minimizing squared errors. |
| **Istikamah** | Principle of consistency; apply the chosen forecasting method uniformly across periods. |
| **P** | Ratio equal to one fourth, used in a specific example (context‑specific). |
| **Maha grauza** | Mentioned term without detailed definition in the notes. |

### Cases & examples  
- **Seasonal factor calculation** – Overall average demand = 1 390 units; Q1 average = 1 247 units → factor ≈ 0.90, indicating a 10 % dip in winter.  
- **Growth adjustment** – Applying an 18 % growth rate to the overall average yields a base forecast of 1 408 units for the next period.  
- **Quarterly forecast example** – Q2 2018 forecast = 1.048 × 1.408 ≈ 1.48 (seasonal multiplier × growth‑adjusted base).  

### Beyond the textbook  
- Instructor’s “Istikamah” reminder stresses disciplined, repeatable application of the selected method throughout the planning horizon.  
- Exam guidance: report intermediate calculations to four decimal places, final answers to two; method correctness outweighs minor rounding differences.  

## OPS 7-1 — Seasonal Forecasting Workflow  

### Theory & concepts  
1. **Detect seasonality** – Group observations by the repeating cycle (e.g., quarters), compute average residuals after removing any underlying trend.  
2. **De‑seasonalize** – Subtract the seasonal index from each observation, producing a series that reflects pure trend and random variation.  
3. **Trend regression** – Fit a linear regression line to the de‑seasonalized data to capture the underlying growth or decline.  
4. **Re‑seasonalize** – Add the appropriate seasonal factor back to each period’s trend forecast, yielding the final demand forecast.  

- **Data cleaning** – Exclude outliers that do not share the current operating condition; they distort both seasonal indices and trend slope.  
- **Inventory cost link** – Holding cost typically 30‑40 % of item value; the periodic order quantity (POQ) model balances ordering frequency against cycle‑stock to minimize total cost.  

### Key terms  

| Term | Meaning |
|------|---------|
| **Seasonal index** | Multiplicative factor representing the relative strength of a season (e.g., 0.82 for Q1). |
| **De‑seasonalized series** | Demand data after removal of seasonal effects, used for pure trend analysis. |
| **Trend line** | Linear regression equation forecasting the underlying demand trajectory absent seasonality. |
| **POQ model** | Periodic Order Quantity model that determines optimal order size to minimize holding + ordering + backorder costs. |
| **Holding cost** | Cost of carrying inventory, often expressed as a percentage of the item’s unit value. |

### Cases & examples  
- **Quarterly sales example** – Seasonal indices: Q1 = 0.82, Q2 = 1.12, Q3 = 0.95, Q4 = 1.11. Trend line: `Forecast = 554.9 + 242.2 × Period`. For Period 5 (next Q1): Trend = 1 765.9 → Final forecast ≈ 1 765.9 × 0.82 = 1 448 units.  
- **Outlier impact warning** – Using low‑demand outliers as the base leads to systematic under‑forecasting and potential stock‑outs.  

### Beyond the textbook  
- Lecture highlighted the importance of “clean, condition‑matched data” before model fitting; students were instructed to build a “formation” dataset reflecting the desired future operating condition.  
- Emphasis on communicating the forecast (trend + seasonal components) clearly to stakeholders to avoid misinterpretation.  

## Newsvendor — Ordering under one-shot demand uncertainty

### Theory & concepts
- The newsvendor model fits a setting with **one selling season and one order placed before demand is seen** (newspapers, fashion, fresh food, seasonal goods). The decision is the single **order quantity $Q$**; the ordering/fixed cost is irrelevant because there is only one order.
- It is a **"too much / too little" bet**: order too much → leftover stock salvaged below cost; order too little → lost sales. Two costs frame the bet — **overage $C_o$** = cost − salvage (loss per unsold unit) and **underage $C_u$** = price − cost (profit missed per unit short).
- The optimum balances them at the **critical ratio** $F(Q^*) = C_u/(C_u+C_o)$ — this is the optimal **in-stock probability (service level)**. For Normal demand the shortcut is $Q^* = \mu + z\sigma$, where $z$ comes from the critical ratio and **$z\sigma$ is the safety stock**. If the ratio is below 0.5, $z$ is negative and $Q^*$ sits below the mean. Round the service level **up** when between table entries.

### Key terms

| Term | Meaning |
|------|---------|
| **Overage cost $C_o$** | Loss from a unit ordered but not sold = cost − salvage. |
| **Underage cost $C_u$** | Profit lost from a unit that could have sold but wasn't ordered = price − cost. |
| **Critical ratio (fractile)** | $C_u/(C_u+C_o)$ = optimal in-stock probability / service level. |
| **Safety stock** | $z\sigma$ — the buffer against demand uncertainty; rises with $\sigma$ and target service level. |
| **Revenue management** | Maximising revenue from a fixed, perishable resource (seats, rooms) via price discrimination and capacity control. |

### Cases & examples
- **SMU Fashion Store**: $c{=}10,\ r{=}16,\ s{=}5$, $D\sim N(100,4.47)$ → $C_o{=}5,\ C_u{=}6$, ratio $0.545$, $z\approx0.12$, $Q^*\approx 100.5$ (near the mean because $C_u\approx C_o$).
- **Airline overbooking**: the uncertain quantity is **no-shows** ($\mu{=}25,\sigma{=}15$); $C_u{=}125$ (lost ticket), $C_o{=}250$ (bumping) → ratio $0.33$, $z\approx-0.43$, overbook ≈ **19 seats**.

> [!important] Ordering the forecast is optimal **only** when $C_o=C_u$ (ratio = 0.5). Otherwise the cost structure, not the mean, sets the order — two products with the same forecast can need different quantities.

## MRP & ERP — Planning dependent-demand components

### Theory & concepts
- **MRP (Material Requirement Planning)** translates the **Master Production Schedule** into **time-phased** requirements for every component — answering *what · how much · when* — using lead times, variability and lot-sizing rules.
- It runs on **three inputs**: the **MPS** (which end items, when, how many), the **BOM** (what parts go into one unit, via the product-structure tree and child **multiplicity**), and the **Item Master** (on-hand, scheduled receipts, lead time, lot-sizing rule per item).
- The **explosion** calculation is **top-down by level** and **offset by lead time**: a child's gross requirement is its parents' planned order release × multiplicity, and each order is released $L$ periods before it is needed. **ERP** is the evolution — MRP → MRP II (adds capacity planning, finance) → **ERP** (adds HR, CRM, multi-site/currency; "ERP ≈ MRP II + CRM").

### Key terms

| Term | Meaning |
|------|---------|
| **MPS / BOM / Item Master** | The three MRP inputs: end-item schedule / parts list per unit / per-item status (on-hand, lead time, lot rule). |
| **Multiplicity** | How many units of a child go into one parent. |
| **Lot-for-lot (L4L) / FOQ** | Order exactly the net requirement / order fixed-size lots (or whole multiples). |
| **GR·SR·OH·NR·PR·POR** | Gross req · scheduled receipts · on-hand · net req · planned receipts · planned order release (lead-time offset). |
| **MRP → MRP II → ERP** | Materials only → + capacity/finance → + HR/CRM/global supply chain. |

### Beyond the textbook
- MRP logic also runs in **services** (restaurant ingredients, hospital surgical supplies, hotel renovations).
- **Why ERP projects fail**: garbage-in-garbage-out data, weak change management, under-resourcing (maintenance ≈ 15–22%/yr of software cost), over-customisation. Real cases: Invacare ~US$30M loss (2005); Vodafone £4.6M fine (2016). Trends: **Cloud, Mobile, Two-tier, Social ERP**, plus Big Data/IoT/AI.

## SPC — Statistical Process Control & Process Capability

### Theory & concepts
- **Conformance quality** = how well output matches the design spec (owned by Operations), vs **design quality**. A customer sets a **tolerance range** $A\pm B$ → **USL/LSL**; a unit outside it is a **defect**. **Prevention beats inspection** (inspection is costly, late, imperfect, and removes responsibility).
- Variation is either **common-cause** (inherent, random, unavoidable) or **assignable-cause** (identifiable and removable — tool wear, bad material, untrained operator). **SPC exists to detect and remove assignable-cause variation.**
- **Step 1 — control charts**: plot a sample statistic vs centre line, UCL, LCL. The **x̄ chart** monitors the mean ($\bar{\bar{x}}\pm A_2\bar{R}$); the **R chart** monitors variability ($D_4\bar{R}$, $D_3\bar{R}$). A point outside the limits ⇒ investigate (Ishikawa fishbone, Five Whys). **Step 2 — capability** (only when in control): $C_p = (USL-LSL)/6\sigma$, where $\sigma=\bar{R}/d_2$ is the spread of *individual* readings.

### Key terms

| Term | Meaning |
|------|---------|
| **Common vs assignable cause** | Inherent random variation vs an identifiable, removable cause. |
| **In / out of control** | No assignable-cause variation (stable) vs an assignable cause present. |
| **Control limits (UCL/LCL)** | From the process's *own* variation — **not** the customer's spec limits (USL/LSL). |
| **Process capability $C_p$** | $(USL-LSL)/6\sigma$ — standard deviations that fit between mean and spec; higher ⇒ fewer defects. |
| **Six Sigma** | Target $C_p=2$ (mean 6σ from each spec limit, ~2 defects/billion); a continuous variance-reduction philosophy. |

> [!warning] Control limits ≠ specification limits. A process can be **in control yet defective** (stable but off-centre/too wide) or **out of control yet within spec**. A point outside control limits means the process *changed*, not that a defect was made.

### Cases & examples
- **M&M's** (45 g ± 3 g): $\bar{\bar{x}}{=}44.96,\ \bar{R}{=}2.16,\ N{=}4$ → x̄ UCL 46.54 / LCL 43.38; R UCL 4.92 / LCL 0. $\sigma=2.16/2.059\approx1.049$ → $C_p\approx 0.95$. At $\sigma{=}1$, $C_p{=}1$ ⇒ 0.27% defects (2,700 ppm); at $\sigma{=}0.5$, $C_p{=}2$.

## ESG in supply chains — Preventing moral hazard

### Theory & concepts
- The core problem is **moral hazard** (post-contractual opportunism): a supplier takes **actions you cannot freely observe** — e.g. **child labour** deep in the chain — and may pursue private interests at the buyer's and workers' expense. The management question is how to prevent it when you can't watch the supplier.
- Four levers: **(1) Supplier audits** (internal = cheap but low independence; external/NGO = credible, accountable); **(2) Information disclosure** (publishing policies; e.g. California Transparency in Supply Chains Act, KnowTheChain — helps only if it raises the firm's goodwill cost of being caught); **(3) Penalty schemes** (zero tolerance / corrective actions / hybrid); **(4) Cooperation in auditing** when firms share a supplier.

### Key terms

| Term | Meaning |
|------|---------|
| **Moral hazard** | Post-contractual opportunism — unobservable supplier actions with efficiency consequences. |
| **Internal vs external audit** | Self-audit (cheaper, less independent) vs NGO/third-party (more credible/accountable). |
| **Penalty schemes** | Zero tolerance (lose contract) / corrective actions (must fix) / hybrid (depends who finds it). |
| **Joint auditing vs audit sharing** | One shared audit (low cost, no free-riding, but less independence) vs each audits & shares results (independent but costly, free-riding risk). |

### Cases & examples
- **Joint auditing**: Accord & Alliance on factory safety in Bangladesh. **Audit sharing**: International Pharmaceutical Supply Chain Consortium.
- Penalty-lever interactions: raising the **goodwill cost** of being caught makes *every* scheme more effective; reducing inspection cost helps little when goodwill costs are already high.

## Key formulas  

| Formula | Description | Symbols |
|---------|-------------|---------|
| **Simple Moving Average (SMA)** | Average of the last *n* observations | \( \text{SMA}_t = \frac{1}{n}\sum_{i=0}^{n-1} D_{t-i} \) |
| **Weighted Moving Average (WMA)** | Weighted average where recent periods have higher importance | \( \text{WMA}_t = \sum_{i=0}^{n-1} w_i D_{t-i} \), \( \sum w_i = 1 \) |
| **Exponential Smoothing** | Recursive forecast that blends latest actual with previous forecast | \( F_{t+1} = \alpha D_t + (1-\alpha)F_t \) |
| **Mean Absolute Deviation (MAD)** | Average absolute forecast error | \( \text{MAD} = \frac{1}{N}\sum_{t=1}^{N} |D_t - F_t| \) |
| **Mean Squared Error (MSE)** | Average squared forecast error | \( \text{MSE} = \frac{1}{N}\sum_{t=1}^{N} (D_t - F_t)^2 \) |
| **Seasonal factor** | Ratio of season‑average to overall average | \( S_j = \frac{\overline{D}_j}{\overline{D}} \) |
| **Linear regression (trend)** | Least‑squares line fitting demand over time | \( y = A + Bx \) where \( B = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sum (x_i-\bar{x})^2} \) and \( A = \bar{y} - B\bar{x} \) |
| **Re‑seasonalized forecast** | Combine trend forecast with seasonal index | \( F_{t}^{\text{final}} = (A + Bx_t) \times S_{j(t)} \) |
| **POQ optimal order quantity** (simplified) | Balances holding and ordering costs over a fixed review period | \( Q^* = \sqrt{\frac{2DS}{h(1 - d/p)}} \) where *D* = demand per period, *S* = ordering cost, *h* = holding cost per unit, *d* = demand rate, *p* = production rate. |
| **Newsvendor critical ratio** | Optimal in-stock probability / service level | \( F(Q^*) = \dfrac{C_u}{C_u + C_o} \), with \(C_u=\text{price}-\text{cost}\), \(C_o=\text{cost}-\text{salvage}\) |
| **Newsvendor order (Normal demand)** | Optimal order = mean + safety stock | \( Q^* = \mu + z\sigma \), \(z\) read from the critical ratio |
| **MRP net requirement** | What is actually needed before lot-sizing | \( NR = \max\{GR - SR - OH_{k-1},\ 0\} \) |
| **MRP on-hand roll-forward** | End-of-period inventory | \( OH_k = OH_{k-1} + SR + PR - GR \) |
| **SPC x̄ control limits** | Monitor the process mean | \( \bar{\bar{x}} \pm A_2\bar{R} \) |
| **SPC R control limits** | Monitor process variability | \( UCL = D_4\bar{R},\ LCL = D_3\bar{R} \) |
| **Process capability** | σ's between mean and spec; higher ⇒ fewer defects | \( C_p = \dfrac{USL - LSL}{6\sigma} \), with \( \sigma = \bar{R}/d_2 \) |

*All symbols are defined in the table; where a symbol appears in multiple formulas (e.g., *D* for demand), the meaning remains consistent.*
