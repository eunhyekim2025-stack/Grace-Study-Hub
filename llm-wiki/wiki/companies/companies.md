---
title: Company Analytics — Companies (MOC)
tags: [company, financials, analytics, moc, overview]
updated: 2026-07-10
pagerank: 0.0193
betweenness: 0.0004
eigenvector: 0.0013
degree: 7
community: 1
---

<div class="dc-view">
<div class="dc-title">Company Analytics — Companies (MOC)</div>
<div class="dc-sub">Financial snapshots from company-analytics pipeline</div>
<div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Data source</div><div class="dc-step-d">yfinance (unofficial, lowest trust)</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Provenance-aware storage</div><div class="dc-step-d">schema stores every value with its source</div></div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>Key Points</h2><span class="dc-hint">company data</span></div>
<div class="dc-cols-3"><div class="dc-card"><b>Ticker</b> links to company note <span class="dc-chip">yfinance</span></div><div class="dc-card"><b>Financial data</b> includes revenue and ROE <span class="dc-chip">company-analytics</span></div><div class="dc-card"><b>Exchange and currency</b> stored for each company <span class="dc-chip">SES, SGD</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>Data Trust</h2><span class="dc-hint">data source limitations</span></div>
<div class="dc-card"><b>Current source</b> is yfinance (unofficial) <span class="dc-chip">lowest trust</span></div>
<div class="dc-callout" class="warn">More reliable data can override yfinance with no change to notes</div>
</div>


# Company Analytics — Companies (MOC)

Financial snapshots generated from the **company-analytics** pipeline (SQLite + yfinance, provenance-aware). Each company links to its note.

> [!info] Data source & trust
> Current source is **yfinance** (unofficial, lowest trust). The schema stores every value with its source, so more reliable data (FMP, SGX filings, annual reports) can be layered in later and will automatically override yfinance — with no change to these notes.

## Companies

| Ticker | Company | Exchange | Currency | Latest revenue | ROE |
|---|---|---|---|---:|---:|
| [[companies/d05-si|D05.SI]] | DBS Group Holdings Ltd | SES | SGD | 22.89B | 15.9% |
| [[companies/o39-si|O39.SI]] | Oversea-Chinese Banking Corporation Limited | SES | SGD | 14.53B | 11.9% |
| [[companies/z74-si|Z74.SI]] | Singapore Telecommunications Limited | SES | SGD | 14.26B | 19.6% |
