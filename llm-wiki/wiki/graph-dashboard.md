---
title: Graph Dashboard
tags: [dashboard, graph]
updated: 2026-06-24
---

# Graph Dashboard

*2026-06-24 기준 | 노드: 119 | 링크: 595 | 타입 관계: 147*

---

## 🚨 조기경보 — Driver 신호 강도 (Operational Ontology)

신호 강도 = 각 Driver에 `part-of`로 쌓인 Signal의 최근성 가중 합 (반감기 6개월).
임계 초과 시 `triggers` 대상 페이지를 재검토하라.

| 상태 | Driver | 강도 | Horizon | 발화 대상 (triggers) |
|---|---|---|---|---|
| 🟡 WATCH | [[drivers/ai-contract-review]] | 2.16 | H2 | [[law-concepts/ch11-exemption-clauses/exemption-clause]], [[cross-domain/business-lifecycle]] |
| 🟢 dormant | [[drivers/ai-legal-automation]] | 0.98 | H3 | — |

---

## 🔄 시스템 사고 — 피드백 루프 (Systems Thinking)

부호 있는 인과 부분그래프(`amplifies` +, `dampens` −)의 cycle. 루프 극성 = 엣지 부호의 곱
(음링크 짝수 → 강화 R / 홀수 → 균형 B). 딜레이는 각 페이지 본문 `> [!delay]` 콜아웃 참조.

| 유형 | 루프 | 음링크 |
|---|---|---|
| ⚖️ 균형(B) | [[systems/liability-disputes]] → [[systems/ai-adoption]] ↺ | 1 |
| 🔁 강화(R) | [[systems/review-cost]] → [[systems/ai-adoption]] ↺ | 2 |

### 🎯 레버리지 포인트 (루프 참여 × 중심성)

가장 많은 피드백 구조에 놓인 노드 — 개입이 가장 멀리 전파되는 지점 (Meadows 레버리지의 프록시).

| 노드 | 참여 루프 수 | Betweenness |
|---|---|---|
| [[systems/ai-adoption]] | 2 | 0.0098 |
| [[systems/liability-disputes]] | 1 | 0.0006 |
| [[systems/review-cost]] | 1 | 0.0000 |

---

## Aristotelian 메타 — 10 범주론 (존재의 서술 방식)

위키 아키텍처가 실현하는 10 범주. 7개는 노드/속성/엣지로 구현, 3개는 추상 지식에
무의미하여 배제 (Action을 그래프에서 뺀 것과 동일한 규율).

| 범주 | 위키에서의 구현 | 상태 |
|---|---|---|
| 실체 | Page 노드 (entity_type = 2차 실체/종) | ✅ |
| 양 | pagerank·degree·strength 등 수치 속성 | ✅ |
| 질 | tags | ✅ |
| 관계 | RELATES 타입 엣지 | ✅ |
| 능동 | 방향성 엣지의 출발 (triggers, causes) | ✅ |
| 수동 | 방향성 엣지의 도착 (triggered-by, caused-by) | ✅ |
| 시간 | updated | ✅ |
| 장소 | 추상 지식엔 공간 없음 — 배제 | ❌ 배제 |
| 자세 | 무의미 — 배제 | ❌ 배제 |
| 소유 | tags가 일부 흡수, 별도 모델 없음 — 배제 | ❌ 배제 |

---

## Aristotelian 메타 — 실체의 4원인 (설명의 4겹 "왜?")

각 원인을 표현하는 relation과 현재 엣지 수. 질료·형상은 기존 taxonomy가 이미 담당,
작용·목적은 인과 사각형 완성을 위해 추가.

| 원인 | relation | 엣지 수 |
|---|---|---|
| 질료인 — 무엇으로 구성되는가 | `part-of` | 4 |
| 형상인 — 무엇으로 정의되는 형상 | `is-a`, `defines` | 3 |
| 작용인 — 무엇이 이것을 일으키는가 | `causes`, `triggers`, `requires` | 3 |
| 목적인 — 무엇을 위한 것인가 (telos) | `serves` | 1 |

---

## 🧠 추론 — Knowledge Graph Reasoning

위키는 이미 트리플(S-P-O)·타입·온톨로지를 갖춘 KG다. 이 절은 **추론으로 도출된**
엣지를 보여준다 — 주장(asserted, `RELATES`)과 별도 테이블(`INFERRED`)에 보관해 둘을
절대 혼동하지 않는다. 규칙: 이행폐포(is-a·part-of·requires) / 역관계 / 대칭.

| 규칙 (provenance) | 추론 엣지 수 |
|---|---|
| symmetric:see-also | 48 |
| inverse:applies | 38 |
| inverse:governs | 18 |
| inverse:cites | 17 |
| inverse:part-of | 7 |
| transitive:part-of | 3 |
| inverse:is-a | 3 |
| inverse:dampens | 3 |
| inverse:triggers | 2 |
| inverse:about | 2 |
| inverse:supports | 1 |
| inverse:extends | 1 |
| inverse:serves | 1 |
| inverse:causes | 1 |
| inverse:refines | 1 |
| inverse:amplifies | 1 |

### 이행 폐포 도출 예 (a R b, b R c ⟹ a R c)

| 주어 | 관계 | 목적어 (추론) |
|---|---|---|
| [[signals/2026-06-bigfour-ai-review]] | `part-of` | [[drivers/ai-legal-automation]] |
| [[signals/2025-11-ai-drafting-malpractice]] | `part-of` | [[drivers/ai-legal-automation]] |
| [[signals/2026-04-bar-ai-guidance]] | `part-of` | [[drivers/ai-legal-automation]] |

### 타입 포섭 (subsumption — 어떤 개념의 모든 하위유형)

- **[[law-concepts/vitiating-factor]]** ⊇ [[law-concepts/ch13-misrepresentation/misrepresentation]]
- **[[law-concepts/vitiating-factor]]** ⊇ [[law-concepts/ch14-duress-undue-influence/duress]]
- **[[law-concepts/vitiating-factor]]** ⊇ [[law-concepts/ch14-duress-undue-influence/undue-influence]]

---

## Ontology — 엔티티 타입 (도메인 분류, 디렉토리 파생)

| 엔티티 타입 | 페이지 수 |
|---|---|
| DAConcept | 36 |
| LawConcept | 25 |
| Case | 14 |
| Page | 12 |
| Statute | 8 |
| FAConcept | 8 |
| CrossDomain | 6 |
| Signal | 3 |
| Driver | 2 |
| Tool | 1 |
| Model | 1 |
| Concept | 1 |
| Paper | 1 |
| Prompt | 1 |

### 노드 kind (인식론 역할, frontmatter 선언 — entity_type와 직교)

| kind | 페이지 수 |
|---|---|
| 주제 | 5 |
| 통찰 | 3 |
| 사건 | 1 |
| 의미 | 1 |
| 주장 | 1 |

---

## Ontology — 관계 타입 (RELATES)

| 관계 | 엣지 수 |
|---|---|
| see-also | 54 |
| applies | 38 |
| governs | 18 |
| cites | 17 |
| part-of | 4 |
| dampens | 3 |
| is-a | 3 |
| triggers | 2 |
| about | 2 |
| extends | 1 |
| serves | 1 |
| causes | 1 |
| refines | 1 |
| supports | 1 |
| amplifies | 1 |

---

## PageRank — 영향력 (많이 인용되는 페이지)

| 페이지 | 제목 | PageRank |
|---|---|---|
| [[da-concepts/LLM Wiki MOC]] | LLM Wiki MOC — Decision Analysis | 0.0514 |
| [[law-concepts/ch18-remedies/remedies]] | Remedies (구제 수단) | 0.0406 |
| [[law-concepts/ch13-misrepresentation/misrepresentation]] | Misrepresentation (부실표시) | 0.0359 |
| [[law-concepts/ch16-breach/discharge]] | Discharge of Contract (계약의 종료) | 0.0305 |
| [[law-concepts/ch10-terms/terms]] | Terms of Contract (계약 조항) | 0.0305 |
| [[da-concepts/ch02-lp/Linear Programming]] | Linear Programming | 0.0258 |
| [[fa-concepts/financial-accounting]] | Financial Accounting (ACCT101) — 개념 맵 | 0.0256 |
| [[law-concepts/ch08-consideration-intention/consideration]] | Consideration (대가) | 0.0254 |
| [[law-concepts/ch07-offer-acceptance/offer]] | Offer (청약) | 0.0245 |
| [[law-concepts/ch17-frustration/frustration]] | Frustration (이행 불능) | 0.0237 |

---

## Betweenness — 허브 (다른 페이지들을 연결하는 브릿지)

| 페이지 | 제목 | Betweenness |
|---|---|---|
| [[da-concepts/LLM Wiki MOC]] | LLM Wiki MOC — Decision Analysis | 0.0914 |
| [[cross-domain/business-lifecycle]] | 비즈니스 라이프사이클 — 3과목 교차 맵 | 0.0539 |
| [[drivers/ai-contract-review]] | 생성형 AI가 1차 계약 검토를 대체한다 | 0.0360 |
| [[graph-dashboard]] | Graph Dashboard | 0.0346 |
| [[law-concepts/ch10-terms/terms]] | Terms of Contract (계약 조항) | 0.0331 |
| [[index]] | index | 0.0285 |
| [[law-concepts/ch11-exemption-clauses/exemption-clause]] | Exemption Clause (면책 조항) | 0.0221 |
| [[cases/gay-choon-ing-v-loh]] | Gay Choon Ing v Loh Sze Ti Terence Peter [2009] SGCA 3 | 0.0219 |
| [[law-concepts/ch06-negligence/negligence]] | Negligence (과실) | 0.0199 |
| [[statutes/unfair-contract-terms-act]] | Unfair Contract Terms Act (UCTA, Cap 396) | 0.0190 |

---

## Eigenvector — 권위성 (영향력 있는 페이지에게 인용되는 페이지)

| 페이지 | 제목 | Eigenvector |
|---|---|---|
| [[business-law]] | ⚖️ Business Law | 0.3617 |
| [[graph-dashboard]] | Graph Dashboard | 0.2611 |
| [[da-concepts/LLM Wiki MOC]] | LLM Wiki MOC — Decision Analysis | 0.2153 |
| [[decision-analysis]] | 📊 Decision Analysis | 0.2057 |
| [[cross-domain/business-lifecycle]] | 비즈니스 라이프사이클 — 3과목 교차 맵 | 0.2032 |
| [[law-concepts/ch13-misrepresentation/misrepresentation]] | Misrepresentation (부실표시) | 0.1807 |
| [[law-concepts/ch18-remedies/remedies]] | Remedies (구제 수단) | 0.1679 |
| [[da-concepts/ch02-lp/Linear Programming]] | Linear Programming | 0.1637 |
| [[law-concepts/ch10-terms/terms]] | Terms of Contract (계약 조항) | 0.1588 |
| [[cases/gay-choon-ing-v-loh]] | Gay Choon Ing v Loh Sze Ti Terence Peter [2009] SGCA 3 | 0.1508 |

---

## Communities (Louvain 클러스터)

| Community ID | 크기 | 대표 페이지 (PageRank 상위 3) |
|---|---|---|
| 0 | 49 | remedies, misrepresentation, discharge |
| 3 | 37 | LLM Wiki MOC, Linear Programming, Sensitivity Analysis |
| 1 | 20 | ai-contract-review, ai-adoption, liability-disputes |
| 2 | 13 | financial-accounting, statement-of-cash-flows, bonds-payable |

---

## Orphan Pages — 연결 없음

*없음 — 모든 페이지가 연결되어 있습니다.*
