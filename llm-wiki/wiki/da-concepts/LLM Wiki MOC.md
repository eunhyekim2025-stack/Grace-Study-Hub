---
title: LLM Wiki MOC — Decision Analysis
tags: [LLM, decision-analysis, MOC]
created: 2026-06-18
source: Textbook.pdf (Anderson/Sweeney/Williams, Management Science 14e)
sources: [da/Textbook.pdf]
updated: 2026-06-18
pagerank: 0.0514
betweenness: 0.0914
eigenvector: 0.2153
degree: 68
community: 3
---

# 🗺️ LLM Wiki MOC — Decision Analysis

A map of core concepts based on Anderson·Sweeney·Williams, *An Introduction to Management Science* (14e).
Course scope: **Linear programming (Ch.2–5) · Integer and nonlinear (Ch.7–8) · Networks (Ch.6) · Projects and inventory (Ch.9–10) · Probabilistic models (Ch.11–12) · Decision and multicriteria (Ch.13–14) · Forecasting (Ch.15)**.

---

## 🧭 A. Foundations
- [[Management Science Process]] — the 5 modeling steps, deterministic/probabilistic models
- [[Breakeven Analysis]] — cost, revenue, profit; breakeven point

## 📐 B. Linear Programming Core (Ch.2)
- [[Linear Programming]] — formulation, the 4 assumptions
- [[Graphical Solution Method]] — two-variable graphical solution
- [[Feasible Region]] — feasible region, convex set
- [[Extreme Points]] — extreme point theorem
- [[Slack and Surplus Variables]] — standard form, binding or not
- [[LP Special Cases]] — multiple optima, infeasibility, unbounded, redundant constraints

## 🔍 C. Sensitivity Analysis (Ch.3)
- [[Sensitivity Analysis]] — what-if, post-optimality
- [[Shadow Price]] — value of one unit of a resource (dual value)
- [[Reduced Cost]] — entry cost of a non-producing variable
- [[Range of Optimality]] — objective-coefficient changes + the 100% rule
- [[Range of Feasibility]] — range of RHS changes

## 💼 D. Linear Programming Applications (Ch.4)
- [[Media Selection]] — marketing (Media Selection.xlsx)
- [[Portfolio Selection]] — finance (Portfolio Selection.xlsx)
- [[Blending Problem]] — operations/blending (Blending Problem.xlsx)
- [[Production Scheduling]] — multi-period production and inventory (Production Scheduling.xlsx)
- [[Workforce Assignment]] — staffing (Workforce Assignment.xlsx)

## 🌐 E. Distribution / Network Models (Ch.6)
- [[Transportation Problem]] — transportation problem
- [[Transshipment Problem]] — transshipment (general minimum-cost flow)
- [[Assignment Problem]] — one-to-one assignment (Clark County Sheriff.xlsx)
- [[Shortest Route Problem]] — shortest route
- [[Maximal Flow Problem]] — maximal flow

## 🎲 F. Probabilistic Models (Ch.11–12)
- [[Waiting Line Models]] — queuing M/M/1, M/M/k, Little's Law
- [[Simulation]] — Monte Carlo simulation *(existing page)*
  - Related quiz: [[simulation-quiz]]

## 🧮 G. Optimization Extensions (Ch.5·7·8)
- [[Advanced LP Applications]] — DEA, revenue management, portfolio, game theory
- [[Integer Linear Programming]] — integer/0-1 variables, LP relaxation and bounds
- [[Nonlinear Optimization]] — local/global optima, Markowitz portfolio

## 🗓️ H. Projects / Inventory (Ch.9·10)
- [[Project Scheduling (PERT-CPM)]] — critical path, three-point estimates (t, σ²), crashing
- [[Inventory Models]] — EOQ, reorder point, single-period (newsvendor)

## 🎯 I. Decision Analysis (Ch.13·14)
- [[Decision Analysis]] — payoff, decision tree, EMV, EVPI, EVSI, utility
- [[Multicriteria Decisions]] — goal programming, scoring models, AHP (consistency ratio CR)

## 📈 J. Forecasting (Ch.15)
- [[Time Series Forecasting]] — moving average, exponential smoothing, linear trend, seasonality

---

## 🔗 Concept Flow (Learning Path)
```
Management Science Process
   └─ Linear Programming ── Graphical Solution Method ── Feasible Region ── Extreme Points
        ├─ Slack/Surplus ── Shadow Price ── Range of Feasibility
        ├─ Sensitivity Analysis ── Reduced Cost ── Range of Optimality
        ├─ Applications: Media / Portfolio / Blending / Production / Workforce
        └─ Networks: Transportation ── Transshipment ── {Assignment, Shortest Route, Maximal Flow}
   └─ Probabilistic: Waiting Line Models ── Simulation
```

## 📊 Note Statistics
- Total atomic notes: **24** (+ existing Simulation)
- Sources: `raw/da/Textbook.pdf`, `raw/da/excel-solutions/*.xlsx`
