---
title: "Module 5 — 원가행태와 추정 (관련범위 · 고저점법)"
tags: [management-accounting, module-5, cost-behaviour, relevant-range, high-low-method]
sources: ["Managerial Accounting: Comprehensive Study Guide (Modules 1–12)"]
updated: 2026-08-12
---

<div class="dc-view">
<div><div class="dc-title">Module 5 · 원가행태와 추정</div><div class="dc-sub">"원가가 어디서 왔나"에서 "생산량이 변하면 어떻게 변하나"로</div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>4가지 원가 패턴</h2><span class="dc-hint">총액 기준</span></div>
<div class="dc-cols-4">
<div class="dc-card"><div class="dc-eyebrow">변동 Variable</div>생산량에 <b>정비례</b>. 2배 만들면 2배 <span class="dc-chip">캔용 알루미늄</span></div>
<div class="dc-card"><div class="dc-eyebrow">고정 Fixed</div>얼마를 만들든 <b>총액 그대로</b> <span class="dc-chip">공장 임차료</span></div>
<div class="dc-card"><div class="dc-eyebrow">혼합 Mixed</div>기본요금 + 쓴 만큼 <span class="dc-chip">휴대폰 요금제</span></div>
<div class="dc-card"><div class="dc-eyebrow">계단 Step-Fixed</div>임계점을 넘으면 <b>점프</b> <span class="dc-chip">학생 50명당 감독관 1명</span></div>
</div>
<div class="dc-section"><span class="dc-num">2</span><h2>관련범위 Relevant Range</h2><span class="dc-hint">이 구간 안에서만 믿으세요</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">왜 필요한가</div>현실의 원가는 <b>구불구불한 곡선</b>이라 계산이 불가능하다. 그래서 실제로 움직이는 구간만 잘라내 <b>직선이라고 가정</b>한다 <span class="dc-chip">예: 100만~150만 개</span></div>
<div class="dc-card"><div class="dc-eyebrow">주의</div>관련범위 <b>밖</b>의 값을 넣으면 예측이 틀린다. "300만 개 만들면?"에 이 직선식을 쓰면 안 된다 — 그쯤이면 공장을 하나 더 지어야 한다.</div>
</div>
<div class="dc-section"><span class="dc-num">3</span><h2>고저점법 High-Low</h2><span class="dc-hint">Y = mX + b</span></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">두 점 고르기</div><div class="dc-step-d">최고·최저 조업도(X)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">기울기 m</div><div class="dc-step-d">원가 차이 ÷ 조업도 차이</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">절편 b</div><div class="dc-step-d">총원가 − (m × 조업도)</div></div>
</div>
<div class="dc-callout warn">🚨 가장 많이 틀리는 지점 — 두 점은 반드시 <b>조업도(X)</b>의 최고·최저로 고른다. <b>원가(Y)</b>의 최고·최저가 아니다.</div>
</div>

# Module 5 — 원가행태와 추정

> [[management-accounting/index|← Management Accounting]] · 이전: [[m04-activity-based-costing|Module 4]] · 다음: [[m06-cvp-analysis|Module 6 — CVP 분석]]

여기서부터 관점이 바뀝니다. 지금까지는 **"원가가 어디서 왔나"**였다면,
이제는 **"생산량이 변하면 원가가 어떻게 변하나"** — 예측과 계획의 출발점입니다.

---

## 원가 패턴 4종

- **변동원가 (Variable)** — 조업도에 정비례. 예: 캔을 만드는 알루미늄
- **고정원가 (Fixed)** — 조업도와 무관하게 일정. 예: 공장 임차료
- **혼합원가 (Mixed)** — 고정 + 변동 요소를 함께 포함. 예: 기본료 + 데이터 요금인 휴대폰 요금제
- **계단원가 (Step-Fixed)** — 임계점에서 점프. 예: 학생 50명마다 감독관 1명 추가 고용

> [!important] 총액과 단위당은 정반대로 움직입니다
> 임차료 100만 원 / 100개 → 개당 10,000원. 임차료 100만 원 / 200개 → 개당 5,000원.
> **고정비는 총액 고정 · 단위당 변동**, **변동비는 총액 변동 · 단위당 고정.**
> 이 뒤집힘이 시험 단골이고, [[m07-variable-vs-absorption-costing|Module 7 과잉생산 함정]]의 원리이기도 합니다.

---

## 관련범위 (Relevant Range)

원가행태는 **관련범위** 안에서만 분석합니다 — **원가가 선형이라는 가정이 성립하는 조업도 구간**
(예: 연간 100만~150만 개). 이 밖의 값을 대입한 예측은 신뢰할 수 없습니다.

---

## 선형 방정식과 고저점법

$$Y = mX + b$$

| 기호 | 의미 |
|---|---|
| $Y$ | 총원가 (구하려는 값) |
| $m$ | 단위당 변동원가 (기울기) |
| $X$ | 조업도 (생산량 · 시간) |
| $b$ | 총 고정원가 (Y절편) |

> [!warning] 실행 시 주의 (Execution Warning)
> 고저점법에서는 **항상 조업도(X)가 가장 높은 관측치와 가장 낮은 관측치**를 고릅니다.
> **원가가 가장 높고 낮은 달**이 아닙니다. 대개 결과가 같아 보여서 방심하다가, 다른 문제에서 통째로 틀립니다.

**1단계 — 변동률 $m$**

$$m = \frac{\text{최고조업도 시 원가} - \text{최저조업도 시 원가}}{\text{최고 조업도} - \text{최저 조업도}}$$

**2단계 — 고정원가 $b$**

$$b = \text{총원가} - (m \times \text{조업도})$$

최고점·최저점 어느 쪽에 대입해도 같은 값이 나와야 합니다 → **검산 장치**로 쓰세요.

### 숫자로 해보기

| 월 | 기계시간 (X) | 총 전기요금 (Y) |
|---|---:|---:|
| 1월 | 1,200 | ₩1,180,000 |
| **2월 ← 최저** | **800** | **₩900,000** |
| 3월 | 1,500 | ₩1,390,000 |
| **4월 ← 최고** | **1,800** | **₩1,600,000** |

- $m = (1{,}600{,}000 - 900{,}000) \div (1{,}800 - 800) = 700{,}000 \div 1{,}000 =$ **시간당 ₩700**
- $b = 1{,}600{,}000 - (700 \times 1{,}800) =$ **₩340,000**
- 검산: $900{,}000 - (700 \times 800) =$ ₩340,000 ✓
- 원가식: $Y = 700X + 340{,}000$ → 5월에 1,400시간이면 **₩1,320,000** 예상

*(위 표의 숫자는 절차를 보여주기 위한 예시입니다. 원본 가이드에는 공식만 제시되어 있습니다.)*

---

## 관련 노트

- [[m06-cvp-analysis|Module 6 — CVP 분석]] — 여기서 쪼갠 변동비/고정비를 그대로 사용
- [[cheatsheet-formulas|공식 치트시트 & 용어사전]]
