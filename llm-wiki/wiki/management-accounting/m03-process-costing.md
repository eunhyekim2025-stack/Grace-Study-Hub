---
title: "Module 3 — 종합원가계산과 완성품환산량 (EU)"
tags: [management-accounting, module-3, process-costing, equivalent-units, production-report]
sources: ["Managerial Accounting: Comprehensive Study Guide (Modules 1–12)"]
updated: 2026-08-12
---

<div class="dc-view">
<div><div class="dc-title">Module 3 · 종합원가계산</div><div class="dc-sub">"반쯤 만들다 만 것"에 원가를 얼마나 붙일 것인가</div></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">문제</div>월말에 공장을 멈추니 <b>반쯤 만든 재공품</b>이 잔뜩. 완제품 4개만큼 원가를 붙이면 너무 많다.</div>
<div class="dc-card"><div class="dc-eyebrow">해법 · 완성품환산량 EU</div>"반쯤 된 것 4개 = 완제품 2개어치의 일"로 바꿔서 센다 <span class="dc-chip amber">4 × 0.50 = 2 EU</span></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>왜 재료와 가공을 따로 세나</h2><span class="dc-hint">반쯤 구워진 쿠키</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">🥣 재료 Materials</div>밀가루·설탕·버터는 <b>맨 처음에 전부</b> 들어간다 → 오븐 속 쿠키도 재료 기준으로는 <b>100% 완성</b></div>
<div class="dc-card"><div class="dc-eyebrow">🔥 가공원가 Conversion (DL + MO)</div>굽는 노동과 가스비는 <b>시간에 따라 조금씩</b> → 같은 쿠키가 가공 기준으로는 <b>60%</b></div>
</div>
<div class="dc-callout">같은 재공품 100개라도 <b>재료 EU = 100개, 가공 EU = 60개</b>. 그래서 완성품환산량은 반드시 두 열로 계산한다.</div>
<div class="dc-section"><span class="dc-num">2</span><h2>제조원가보고서 5단계</h2><span class="dc-hint">순서만 외우면 된다</span></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">물량 파악</div><div class="dc-step-d">몇 개를 다뤘나</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">완성품환산량</div><div class="dc-step-d">실제 일한 양은</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">총원가 집계</div><div class="dc-step-d">돈은 총 얼마</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">단위당 원가</div><div class="dc-step-d">1개당 얼마</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">5</div><div class="dc-step-t">원가 배분</div><div class="dc-step-d">누구에게 얼마씩</div></div>
</div>
<div class="dc-callout ok">3단계 총원가와 5단계 배분 합계가 <b>반드시 일치</b>해야 한다 — 자체 검산 장치.</div>
</div>

# Module 3 — 종합원가계산과 완성품환산량

> [[management-accounting/index|← Management Accounting]] · 이전: [[m02-cost-concepts-job-order-costing|Module 2]] · 다음: [[m04-activity-based-costing|Module 4 — ABC]]

요가매트나 휘발유처럼 **똑같은 제품을 대량으로** 만들 때 씁니다. 개별 작업을 추적하는 대신
공정 전체 원가를 총 생산량으로 나눠버립니다. 문제는 딱 하나 — **월말의 미완성품**입니다.

---

## 완성품환산량 (Equivalent Units, EU)

완성품환산량은 **부분적으로 완성된 재공품에 대해 실제로 수행된 작업량**을 나타냅니다.

### 비유 ① 울타리 페인트칠

두 명의 작업자가 널빤지 **4장을 각각 50%씩** 칠했다면 → **2 완성품환산량** (4 × 0.50).
완전히 칠한 2장과 **일한 양이 같습니다.**

### 비유 ② 반쯤 구워진 쿠키

- **재료**는 맨 처음에 100% 투입됩니다 → 오븐 속 쿠키도 재료 기준 **100% 완성**
- **가공원가(Conversion = DL + MO)**는 시간에 따라 균등하게 들어갑니다 → 같은 쿠키가 가공 기준 **60%**

> [!important] 시험에서 "왜 두 열로 계산하나요?"의 답
> **완성도가 항목마다 다르기 때문**입니다. 재료용 EU와 가공용 EU를 **반드시 따로** 구합니다.

$$\text{완성품환산량} = \text{물량} \times \text{완성도(백분율)}$$

---

## 제조원가보고서 5단계 (Production Report)

| 단계 | 이름 | 하는 일 |
|---|---|---|
| **1** | 물량 파악 (Physical Units) | 이번 달에 다룬 총 개수를 맞춰본다. "들어온 개수 = 나간 개수 + 남은 개수" |
| **2** | 완성품환산량 (Equivalent Units) | **재료용**과 **가공용**을 각각 계산 |
| **3** | 총원가 집계 (Costs to Account For) | 기초재공품 원가 + 당기 투입 원가 = 나눠줄 총 돈 |
| **4** | 환산량 단위당 원가 (Cost per EU) | 3단계 ÷ 2단계. "1개어치 일에 얼마 들었나" |
| **5** | 원가 배분 (Cost Reconciliation) | ① 완성돼 나간 것과 ② 기말 재공품에 배분 |

**한 문장 요약:** 몇 개를 다뤘고(1) → 실제 일한 양은 얼마고(2) → 돈은 총 얼마고(3) →
1개당 얼마고(4) → 그래서 누구에게 얼마씩(5).

> [!tip] 검산
> 5단계에서 배분한 금액의 합이 3단계 총원가와 **정확히 같아야** 합니다.
> 안 맞으면 어딘가 틀린 것이니, 답을 제출하기 전에 반드시 확인하세요.

---

## 관련 노트

- [[m02-cost-concepts-job-order-costing|Module 2]] — 개별 vs 종합의 선택 기준, 가공원가 정의
- [[m04-activity-based-costing|Module 4 — ABC]]
- [[cheatsheet-formulas|공식 치트시트 & 용어사전]]
