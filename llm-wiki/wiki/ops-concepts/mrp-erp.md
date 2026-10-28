---
title: "MRP & ERP — Planning Dependent-Demand Components"
tags: [operations-management, opim201, mrp, erp, bill-of-materials, master-production-schedule, lot-sizing, dependent-demand, supply-chain]
sources: ["SMU OPIM 201 Session 11 — Material Requirement Planning (MRP) & Enterprise Resource Planning (ERP)"]
updated: 2026-10-28
kind: 개념
relations:
  part-of: [operations-management]
  see-also: [ops-concepts/forecasting, ops-concepts/ops-7-2, ops-concepts/newsvendor]
---

<div class="dc-view">
<div><div class="dc-title">MRP & ERP</div><div class="dc-sub">Once you know what end items to build, work backwards to every part — what, how much, and when</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Forecast</div><div class="dc-step-d">end-item demand</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Order policy</div><div class="dc-step-d">how many end items · EOQ / Newsvendor</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">MRP & ERP</div><div class="dc-step-d">production/purchase plan for every <b>component</b></div></div>
</div>
<div class="dc-callout"><b>Dependent demand.</b> A component's demand is <b>certain</b> once the end-item schedule is fixed — so it is <b>calculated, not forecast</b>. Apple forecasts iPad minis; Foxconn then <i>computes</i> the parts it needs.</div>
</div>

# MRP & ERP — Planning Dependent-Demand Components

> [[operations-management|← Operations Management]] · Where [[ops-concepts/ops-7-2|EOQ]] and [[ops-concepts/newsvendor|the newsvendor model]] decide how many *end items* to make, **MRP** decides the quantity and timing of every **part** that goes into them, and **ERP** is the enterprise-wide system MRP grew into.

---

## What MRP is

**Material Requirement Planning** is a computer-based system that translates the **Master Production Schedule** (end-item requirements) into **time-phased** requirements for subassemblies, components and raw materials. It answers three questions for every component — **what · how much · when** — accounting for forecasts, procurement/production **lead times**, demand/supply variability and **lot-sizing** (batch) rules.

> [!tip] It is not only for factories
> MRP logic runs in services too: a restaurant planning a dish's ingredients, a hospital scheduling surgical supplies, a hotel chain sizing soap/towels/staff or a room renovation. Anywhere a "finished thing" decomposes into parts with lead times.

---

## The three inputs

| Input | Answers | What it holds |
|---|---|---|
| **Master Production Schedule (MPS)** | *when & how many end items* | The end items to produce, in what quantity, in each period — **disaggregated** from the aggregate plan (which is set at product-family level, not SKU level) |
| **Bill of Materials (BOM)** | *what & how much* | Every raw material, part and subassembly needed for **one unit** of the product |
| **Item Master** | *status of each item* | On-hand inventory, scheduled receipts, **lead time**, and the **lot-sizing rule** per item |

### The BOM product-structure tree

A visual tree listing components by **level** (level 0 = end item at the top, leaves at the bottom).

- **Parent–child:** an item one level up is the *parent*; the one below is the *child*. Calculations run **level by level, top down**.
- **Multiplicity** = how many units of a child go into **one** parent (e.g. a chair needs 2 legs → multiplicity 2).
- With **multiple parents**, a child's multiplicity can differ per parent, but its **level is unique** — an item sits at the *lowest* level at which it appears (so all its demand is accumulated before it is planned).

---

## Lot sizing — how to meet a net requirement

| Rule | Behaviour |
|---|---|
| **Lot-for-lot (L4L)** | Order exactly the net requirement each period — no left-over |
| **Fixed Order Quantity (FOQ)** | Order a fixed lot (or whole **multiples** of it). If FOQ = 50 and net demand = 35, you still order 50; if demand = 60, order 100 |

FOQ trades extra holding inventory for fewer setups (setup cost) — the same tension [[ops-concepts/ops-7-2|EOQ]] optimises.

---

## MRP explosion — the calculation

Six quantities are tracked per item, per period:

| Term | Meaning |
|---|---|
| **GR** — Gross Requirements | Total expected demand |
| **SR** — Scheduled Receipts | Orders already scheduled to arrive |
| **OH** — On-Hand inventory | Expected inventory at period end |
| **NR** — Net Requirements | Amount actually needed |
| **PR** — Planned Receipts | NR adjusted for the lot-sizing rule |
| **POR** — Planned Order Release | When/how much to actually order or start, **offset by lead time** |

**The general procedure** — start at period 1, go to the last period; for item at period $k$:

1. **GR** — for every **parent** of this item, multiply the parent's **POR** (just computed) by the **multiplicity**, and sum across parents.
2. **NR** $= \max\{\,\text{GR} - \text{SR} - \text{OH}_{k-1},\ 0\,\}$
3. **PR** — from the lot-sizing rule: L4L → PR = NR; FOQ → smallest multiple of FOQ that is $\ge$ NR.
4. **OH** $= \text{OH}_{k-1} + \text{SR} + \text{PR} - \text{GR}$
5. **POR** $=$ PR shifted **earlier by the lead time** $L$ (PR in period $k$ is released in period $k-L$).

> [!important] The two ideas that make it click
> **① Top-down by level:** a child's GR *is* its parents' POR × multiplicity — so you must finish every parent before planning the child. **② Lead-time offset:** the POR sits $L$ periods *before* the receipt is needed, which is why planning runs backwards in time from the due date.

> [!todo] 수치·예제 검수 필요
> 강의의 전체 explosion 예제(Example 1: A·B·C·D·E, lead times/lot sizes)는 표가 커서 여기서는 **절차**만 정리했습니다. 실제 시험 대비는 세션 슬라이드·Practice Problem Set 8의 표를 직접 풀어 확인하세요.

**Outputs:** the production/purchase **order-release schedule**; **reschedule & exception reports** (date/quantity revisions, expedites, late orders, scrap, requirements for nonexistent parts); and **performance-control reports** (missed deliveries, stock-outs, cost performance).

---

## From MRP to ERP — the evolution

| Stage | Scope |
|---|---|
| **MRP** | Materials only |
| **MRP II** | Adds **Capacity Requirements Planning (CRP)**; expands to accounting, marketing, payroll, A/P, A/R, sales/inventory analysis |
| **ERP** | Open data exchange; adds cost accounting, budgeting, **HR**, project management, **CRM**; handles multiple sites, currencies, languages. **Naively, ERP = MRP II + CRM**, and it incorporates **global supply-chain management** |

ERP rests on three macro processes — **CRM** (customer), **ISCM** (internal supply chain), **SRM** (supplier) — over a transaction-management foundation (financials, HR, database, security).

### Benefits · pitfalls · trends

> [!note] Benefits
> Better use of resources — **lower inventory, higher workforce efficiency, better customer service** (one source for billing and relationship tracking) · a platform for automation and **instantaneous global information sharing** · easier management/analysis of business processes.

> [!warning] Pitfalls (why ERP projects fail)
> - **Data-integrity assumption** — garbage in, garbage out; unreliable lead-time quotes persist. Some systems add **CRP** to mitigate.
> - **Poor implementation strategy** — needs real **change management** (executive involvement, training, clear goals). Projects stall when the sponsor leaves — avg MD tenure ~4 yrs vs ~18-month implementations.
> - **Under-resourcing** — true cost is under-counted; maintenance/renewal runs **15–22% of initial software cost** per year; vendors depend on ongoing "value-added services."
> - **Customization** — you must know what you actually need.
> - **Inexperienced / over-relied-upon consultants.**
> - Real failures: Invacare lost ~US$30M (2005, Oracle ERP); Vodafone fined £4.6M (2016) after an ERP failure mis-credited top-ups.

> [!tip] Latest trends
> **Cloud ERP** (SaaS/XaaS — lower upfront cost, leased & subscription-based, ideal for SMEs; trade-off: loss of control, reliance on provider security) · **Mobile ERP** (better data quality and visibility, agility) · **Two-tier ERP** (a legacy corporate system + a lighter subsidiary system, since one-size-fits-all is often inflexible) · **Social ERP** (integrating social media into HR/marketing) · and incorporating **Big Data, IoT and AI**.

## Related notes

- [[ops-concepts/ops-7-2|EOQ & Order Planning]] / [[ops-concepts/newsvendor|Newsvendor]] — set the end-item quantities MRP plans components for
- [[ops-concepts/forecasting|Forecasting]] — the end-item forecast that feeds the MPS
- [[ops-concepts/process-analysis|Process Analysis]] — capacity (CRP checks whether the MRP plan is even feasible)
