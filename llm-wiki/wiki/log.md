---
pagerank: 0.0014
betweenness: 0.0000
eigenvector: 0.0123
degree: 3
community: 0
---
# Log

위키 활동의 시간순 기록. append-only.

포맷: `## [YYYY-MM-DD] <operation> | <title>`

---

## [2026-06-17] init | LLM Wiki 초기 구조 생성

- Raw / Wiki / Schema 3계층 구조 설정
- wiki/ 하위에 concepts, models, papers, prompts, tools 폴더 생성
- CLAUDE.md 스키마 작성
- index.md, log.md 생성

## [2026-06-17] setup | Business Law 도메인 통합

- SMU Business Law 자료 48개 파일을 raw/law/ 하위로 복사
  - cases/ (15 판례 PDF), statutes/ (7 법령 PDF), prewriting/ (20 Monkey's Pre-writing PDF)
  - notes/ (4 파일), pq/ (6 연습문제 PDF), Textbook.pdf
- wiki/cases/, wiki/statutes/, wiki/law-concepts/ 디렉토리 생성
- CLAUDE.md에 Business Law 구조 추가

## [2026-06-17] schema | IRAC Drill 방법론 + /quiz skill 추가
- 생성된 페이지: law-concepts/quiz-methodology.md
- 생성된 skill: .claude/commands/quiz.md (/quiz <챕터>)
- 핵심: 결정적 사실 1개 → 결론 전환 구조, 성립/불성립 쌍 설계, 시험 팁 경계선 명시

## [2026-06-17] query | Chapter 8 Mistake PQ형 시나리오 카드 생성
- 생성된 페이지: law-concepts/mistake-quiz-scenarios.md
- 소스: law/pq/(1-6) PQ 형식 분석 + prewriting/8. Monkey's Mistake.pdf
- 내용: 13개 시나리오 (A 유형별 spotting 4, B Unilateral Term 2, C Identity 3, D NEF 2, E 종합 2)
  - 각 카드: 시나리오 → IRAC → Model Answer (접기/펼치기)
  - Issue Spotting 체크리스트 (시험장 순서도 포함)

## [2026-06-17] query | Chapter 8 Mistake 퀴즈 카드 생성
- 생성된 페이지: law-concepts/mistake-quiz.md
- 소스: law/prewriting/8. Monkey's Mistake.pdf + wiki/law-concepts/mistake.md
- 내용: 23문항, 판례 11개 비교표, 시나리오 2개, 빠른 암기표

## [2026-06-17] ingest | Monkey's Offer (청약)

- 생성된 페이지: wiki/law-concepts/offer.md
- 갱신된 페이지: wiki/index.md (Business Law 섹션 신설)
- 주요 발견:
  - 청약의 3원칙: 명확한 구속 약속, 객관적 구속 의사, 전달
  - ITT 4유형: 광고·진열·경매·입찰 (각각 예외 판례 존재)
  - 계약 유형: 일방적(unilateral) vs 쌍방(bilateral)
  - 청약 소멸 5가지: 철회·반청약·기간경과·조건불성취·사망
  - 핵심 싱가포르 판례: Gay Choon Ing v Loh [2009] SGCA 3
- 모순/불확실: 없음 (신규 도메인)
- 미작성 링크: acceptance, consideration, iclr, capacity, cases/gay-choon-ing-v-loh

## [2026-06-17] ingest | Monkey's Pre-writing 2–20 (계약법·불법행위 19개 주제)

- 생성된 페이지 (wiki/law-concepts/, 19개):
  - acceptance, consideration, iclr, terms, exemption-clause
  - misrepresentation, mistake, duress, undue-influence, unconscionability
  - illegality, restraint-of-trade, capacity, privity, discharge
  - frustration, remedies, negligence, agency
- 갱신된 페이지: wiki/index.md (20개 law-concept 전부 [x], 신규 판례·법령 링크 추가)
- 주요 발견 (싱가포르 특유 리딩 케이스):
  - Consideration: Pao On 예외, Williams v Roffey practical benefit, promissory estoppel은 방패로만
  - Mistake: Chwee Kin Keong v Digilandmall (형평법상 unilateral mistake + constructive knowledge)
  - Unconscionability: BOM v BOK [2018] — narrow doctrine 채택 (broad 거부)
  - Restraint of Trade: Man Financial v Wong [2008] — legitimate interest + reasonableness
  - Discharge: RDC Concrete v Sato Kogyo [2007] — 종료권 4상황 프레임워크
  - Negligence: Spandeck v DSTA [2007] — proximity + policy 단일 2단계 테스트
  - 제정법: ETA, Evidence Act(parol evidence), UCTA, CPFTA, FCA, CRTPA, SOGA, Contributory Negligence Act
- 모순/불확실: 없음 (LLM/AI 도메인과 충돌 없음)
- 정리: index.md의 capacity-detail 중복 항목 제거 → capacity로 통합
- 미작성 링크: cases/ 6건, statutes/ 8건 (추후 cases·statutes ingest 시 작성)

## [2026-06-18] index | Decision Analysis 자료 등록 + Ch.12 교과서 문제 퀴즈

- index.md 갱신: **Decision Analysis 섹션 신규 추가** (이전엔 da-concepts/가 카탈로그에 누락돼 있었음)
  - da-concepts/ 3개 페이지 등록: simulation, simulation-quiz, simulation-quiz-problems
  - raw/da/ 원본 소스 카탈로그화: Textbook.pdf, textbook-solutions(1–21장), excel-solutions, homework
- 신규 페이지: da-concepts/simulation-quiz-problems.md
  - 베이스: da/textbook-solutions/MS14E_chapter_12_Final.doc 연습문제 25문항
  - 카드 수: 12장 (비-IRAC, Issue/Method/Application/Conclusion 구조)
  - 커버: 시나리오 분석, 이산/균일/정규 난수 생성, 시행별 확률변동(World Series),
    동적 복리 계산(주가), 위험 기반 의사결정(P(loss)), 기대이익 입찰 선택
  - 설계: 결정적 사실 1개 볼드 + 성립/불성립 쌍 (simulation-quiz 방법론 차용, IRAC 미적용)
- 기존 simulation-quiz.md(예제 드릴)와 역할 분리: examples vs end-of-chapter problems

## [2026-06-18] graph-sync + graph-analyze | DA 페이지 그래프 반영

- 노드: 37, 엣지: 100 (DA 3개 페이지 신규 포함)
- Top PageRank: consideration(0.090), offer(0.083), remedies(0.080) — Business Law 코어 유지
- Communities: 5개 — **DA 페이지가 독립 클러스터(Community 4) 형성**: simulation ↔ simulation-quiz ↔ simulation-quiz-problems
- Orphan: 없음 (DA 페이지 모두 상호 연결됨)

## [2026-06-18] ingest | Decision Analysis 교과서 → Obsidian atomic notes 24개 + MOC

- 소스: raw/da/Textbook.pdf (Anderson/Sweeney/Williams, *Management Science* 14e)
  - 범위 결정 근거: Brief Contents에서 **학생 형광펜 표시 = Ch.2,3,4,6** + Excel 풀이(LP 6종) + 기존 Ch.11,12
- 사용자 요청 보정 (튜토리얼 템플릿 잔재 정정):
  - 출력 경로 `/Users/me/ObsidianVault/...` 부재 → 기존 프로젝트 `wiki/da-concepts/`로 합의
  - "LLM 관련 개념" 요청이나 소스는 경영과학 → Decision Analysis 개념으로 추출(볼트명·tags는 요청대로 유지)
- 생성된 페이지 (wiki/da-concepts/, 25개):
  - MOC: `LLM Wiki MOC.md`
  - A 기초(2): Management Science Process, Breakeven Analysis
  - B LP핵심(6): Linear Programming, Graphical Solution Method, Feasible Region, Extreme Points, Slack and Surplus Variables, LP Special Cases
  - C 민감도(5): Sensitivity Analysis, Shadow Price, Reduced Cost, Range of Optimality, Range of Feasibility
  - D LP응용(5): Media Selection, Portfolio Selection, Blending Problem, Production Scheduling, Workforce Assignment
  - E 네트워크(5): Transportation/Transshipment/Assignment/Shortest Route/Maximal Flow Problem
  - F 확률(1): Waiting Line Models (기존 waiting-line stub 대체)
- 포맷: 하이브리드 frontmatter(요청 tags/created/source + 프로젝트 title/sources/updated), 옵시디언 `[[노트 제목]]` 링크
- 갱신된 페이지: wiki/index.md (Atomic Notes 서브섹션 신설, waiting-line stub → Waiting Line Models)
- 모순/불확실: 소스 도메인(경영과학) ↔ "LLM" 명칭 불일치는 사용자 확인 후 볼트명만 유지로 정리
- 미작성 링크: 없음 (모든 노트 상호 연결, MOC 경유)

## [2026-06-18] ingest | Financial Accounting (ACCT101) → fa-concepts/ 8개 페이지

- 소스: SMU Files의 Financial Accounting 폴더 → raw/fa/로 복사
  - Textbook.pdf(797pp, 참고용), guided-notes(Week 4·5·9·10·11), final-questions(png), Abbreviations.png
  - 범위 결정 근거: 교과서가 너무 방대 → **Guided Notes가 실제 강의 범위**라 이를 기준으로 개념 추출
- 생성된 페이지 (wiki/fa-concepts/, 8개):
  - financial-accounting (MOC): 재무제표 3종 연결, 약어, 주차 지도
  - bank-reconciliation (W4): DIT/OC/NSF, DR·CR 반대 이유, 2면 조정
  - inventory (W5): 영구재고법, COGS, 매입·매출 분개, FOB Destination/Shipping Point
  - time-value-of-money (W9): PV·PVA 공식과 표
  - bonds-payable (W9): 부채 분류, 액면/할인 발행, 유효이자율 상각
  - shareholders-equity (W10): 보통/우선주, APIC, 자기주식 3시나리오
  - dividends (W10): 현금·주식·누적우선 배당, 배당 일정
  - statement-of-cash-flows (W11): 간접법 5단계, 운전자본 변동표
- 갱신된 페이지: wiki/index.md (Financial Accounting 섹션 신설 + raw/fa/ 소스 카탈로그)
- 상호 링크: MOC 허브 + 의존성(bonds↔TVM, SCF↔inventory/bonds/dividends/equity) → 독립 클러스터 형성 의도
- 모순/불확실: 없음 (신규 도메인). US GAAP 채택(이자·배당 분류)은 강의 노트 명시대로 기록

## [2026-06-18] graph-sync + graph-analyze | FA 페이지 그래프 반영

- 노드: 69, 엣지: 299 (FA 8개 페이지 신규 포함)
- Communities: 7개 — **FA 페이지가 독립 클러스터(Community 3, 19개) 형성**: 대표 financial-accounting · statement-of-cash-flows · bonds-payable
- 공출현 상위: financial-accounting ↔ statement-of-cash-flows (6)
- FA 최고 연결: financial-accounting(degree 15), statement-of-cash-flows(13)
- Orphan: log 1개뿐 (기존부터, append-only라 wikilink 없음) — FA 페이지는 전부 상호 연결됨

## [2026-06-18] lint | 정기 점검 + 교차연결 보강

- 발견된 문제: broken link 43건, orphan 1건(graph-dashboard), **cross-domain edge 0건**(Law/DA/FA 완전 분리)
- 수정된 항목:
  - 누락 페이지 스텁 13개 생성: cases/ 6건 + statutes/ 7건 (index·law-concepts의 broken link 해소)
  - da-concepts/simulation-quiz-problems.md 복구 (직전 da-concepts 일괄 재생성 21:32에 유실됐던 것)
  - index.md의 `[[노트 제목]]` placeholder 링크 제거
- 잔여(자동수정 보류): overview.md의 `[[concepts/README\|...]]` 5건은 표 안 escaped pipe(`\|`)라 sync 미해석 — Obsidian 렌더는 정상, 그래프 엣지만 누락
- 추천 탐색 주제: cases/statutes 스텁의 판례·법령 원문 ingest로 확장

## [2026-06-18] ingest | Cross-Domain 통합 (cross-domain/) — Law×DA×FA 다리 구축

- 목적: 3과목이 그래프상 완전 분리(cross-domain edge 0) → 복합 퀴즈의 연결 기반 부재 해소
- 생성된 페이지 (wiki/cross-domain/, 2개):
  - business-lifecycle: 단일 비즈니스 사건을 3렌즈로 보는 교차 맵 (개념 페이지 상호 링크)
  - integrated-quiz: 5개 복합 시나리오 × 3렌즈(⚖️/📊/💰) = 15문항, quiz-methodology 기반
- 커버: offer/duress/restraint/exemption/agency × inventory/bonds/treasury/sales-return/bank-rec × normal-sim/EV/assignment/discrete-sim/EV
- 갱신: index.md (Cross-Domain 섹션 신설)
- 효과: cross-domain/ 페이지가 Law·DA·FA 세 커뮤니티를 잇는 bridge 노드 → betweenness 상승 기대

## [2026-06-18] feature | 온톨로지 레이어 구현 (entity types + typed relations)

- 목적: 모든 `[[링크]]`가 타입 없는 단일 LINKS 엣지였음 → 의미 관계(semantic relation) 표현 불가
- 그래프 2레이어화:
  - **LINKS** — 본문 `[[wikilink]]` 기반 타입 없는 엣지 (기존 유지, 탐색·중심성용)
  - **RELATES {type}** — frontmatter `relations:` 기반 타입 있는 엣지 (신규, 온톨로지)
- 엔티티 타입: 디렉토리에서 자동 결정 (Case/Statute/LawConcept/Concept/DAConcept/FAConcept/…), `Page.entity_type` 컬럼
- 관계 taxonomy (고정 9종): is-a, part-of, requires, applies, cites, governs, defines, contradicts, see-also
- 신규/수정 코드:
  - `graph/src/ontology.py` (신규) — taxonomy·엔티티 매핑·파서·검증의 단일 출처
  - `db.py` — entity_type 컬럼 + RELATES rel table
  - `sync.py` — entity_type 부여 + relations 파싱 + 타입 엣지 + ⚠경고
  - `query.py` — 프리셋 추가: types, relations, oftype, byrel, neighbors
  - `analyze.py`·`dashboard.py` — 엔티티/관계 분포 출력
- 문서: CLAUDE.md 온톨로지 절 신설, ingest/lint/graph-sync/graph-query/graph-analyze 스킬 갱신
- 시드 검증: rdc-concrete(applies→discharge), consideration(see-also×3, cites×2) → sync 85 pages, 397 links, 6 typed relations ✓

## [2026-06-18] feature | 형식 불가지론 보강 (정규화→중재 / 충돌 테이블 / 합리화 함정 탐지)

- 배경: Phase 무관, /query·/ingest·synthesis가 "형식 불가지론적 정규화" 없이 결론 → 긴 본문 선호 편향·무인용 서사 환각(합리화 함정) 위험
- 적용 3조치 (llm-wiki 스킬에 이식):
  1. **/query 2단계화** — 정규화 블록(소스별 동일 형태 1문장, 판정 금지) → 중재 블록(정규화 문장만으로 [수렴]/[모순]/[분기] 판정, 충돌 판정엔 CoT 금지·직접 QA). query.md 명문화.
  2. **/ingest 충돌 테이블 의무 섹션** — `## 충돌 테이블`(주제·주장A·주장B·판정·증거), 증거 앵커 강제, 누적적 구축(기존 소급 X). ingest.md 명문화.
  3. **/lint 합리화 함정 탐지** — `graph/src/lint_citations.py` 신규: synthesis 페이지 인용 밀도·무인용 연속 측정. lint.md에 규칙·실행 추가.
- 신규 코드: `graph/src/lint_citations.py` (synthesis 4개 스캔, cross-domain/integrated-quiz·business-lifecycle 2개 경고)
- 문서: CLAUDE.md "형식 불가지론" 절 신설 (3조치 + 근본 원리: relations=SOT 권위화, 앵커 강제, Python validator 재검증)
- 한계 명시: 증상 치료. 근본 병리(사전학습 데이터의 형식-내용 분리 결여)는 미해결.

## [2026-06-18] feature | Conflict Arbiter 2단계 파이프라인(A) + 정규화 view 생성기(B)

- 목적: 형식 불가지론 보강의 "스킬 문구"를 실제 Python 아키텍처로 격상 (LLM 생성 전 결정론적 정규화·중재)
- B `build_normalized_claims.py`: Kuzu Page/RELATES → 1문장 고정 템플릿 정규화(claims.jsonl). 형식·길이 단서 제거. /query가 본문보다 먼저 조회.
  - 산출: 85 page claims + 6 relation claims → graph/normalized/claims.jsonl
- A `conflict_arbiter.py`: 2단계 인지 아키텍처
  - Stage 1 normalize() — 정규화만, 판정 금지 (raw 접근 허용)
  - Stage 2 arbitrate(claim_a, claim_b, kind) — 정규화 문자열만 입력. raw 객체 넘기면 TypeError로 차단(주의 마스킹을 코드 경계로 강제)
  - 충돌 4종 자동 탐지: contradicts 엣지 / [!contradiction] 콜아웃 / 정의 경합(defines) / SOT↔서사 분기(relations 대상 본문 미언급)
  - 판정 어휘: 수렴/모순/분기/needs-judgment → graph/normalized/conflicts.md
- 검증: contradicts+미언급 대상 일시 주입 → 3건(모순1·분기2) 정확 탐지, 되돌림 후 0건. Stage2 규칙·마스킹 가드 단위테스트 통과.
- 배선: query.md(정규화 view 우선 조회 step 2.5 + conflicts.md 인용), graph-analyze.md(step 3.5 두 스크립트 + needs-judgment 보고), CLAUDE.md(디렉토리 + 형식 불가지론 절 갱신)
- 산출물은 graph/normalized/에 위치 → wiki 그래프로 동기화되지 않음(오염 방지)
- 보류(미구현): Stage 1/2 정규화·중재에 LLM 호출 연결(현재 결정론적 규칙 + 템플릿). 의미 비교가 필요한 needs-judgment는 /query에서 마스킹 쌍으로 LLM/사람이 해소.

## 2026-06-19 — Operational Ontology (조기경보 레이어) 접목
- 동기: 팔란티어 온톨로지의 2개 차용 검토. (1) Action=골격+동작 → 분석 위키엔 오버엔지니어링, 미채택. (2) operational ontology(신호→발화)는 채택.
- 결정: 도메인=AI/기술의 법·경영 충격 / 강도=그래프 파생(수동점수 0) / 신호=사용자 큐레이션.
- 설계 핵심: triggers 대상 = 새 Action이 아니라 *기존 지식 페이지* → 경보가 "무엇을 재검토할지"로 라우팅(foresight→knowledge 봉합).
- 온톨로지 추가: ENTITY_TYPES += signals/→Signal, drivers/→Driver. RELATIONS += triggers/triggered-by.
- 강도 공식: strength(Driver) = Σ over part-of Signals of 0.5^(age_months/6) (반감기 6개월, 최근성 가중). analyze.py가 Kuzu+frontmatter strength:에 write-back.
- 임계 2단(threshold:{watch,act}) + Three Horizons(horizon:). dashboard에 🚨 조기경보 테이블(🔴ACT/🟡WATCH/🟢dormant).
- 코드: db.py(Page.strength), sync.py(strength 기본값), analyze.py(signal_strength+write-back+console), dashboard.py(early_warning_rows+섹션), ontology.py.
- 시드: drivers/ai-contract-review + signals 3건. 검증: sync 89p/12rel(경고0) → analyze strength=2.20(3신호, 2025-11건 감쇠) → dashboard 🟡 WATCH, triggers=[exemption-clause, business-lifecycle] 정상.
- 보류(확장): 강도 velocity(가속도) 기반 경보 — 현재 level+임계만. 신호 history 저장 시 발전.

## 2026-06-19 — 아리스토텔레스 온톨로지 주입 (10 범주론 + 4원인)
- 평가: 10 범주론은 7/10이 이미 아키텍처에 구현됨(실체=Page, 양=수치, 질=tags, 관계=RELATES, 능동/수동=방향성 엣지, 시간=updated). 3개(장소·자세·소유)는 추상 지식에 무의미 → 배제(Action 함정과 동일 규율). 4원인은 절반이 이미 아리스토텔레스적(part-of=질료, is-a/defines=형상)이나 목적인(telos) 완전 부재 + 작용인 일반형 부재.
- 결정: 4원인=2개 관계 추가(추천) / 10 범주론=메타 레이어만(추천, 새 엔진·검증 0).
- 관계 추가: causes/caused-by(작용인), serves/served-by(목적인) → 인과 사각형 완성. causes는 requires(선행조건)·triggers(조기경보 특수case)와 구분되는 일반 인과.
- 메타 레이어: ontology.py에 CATEGORIES(10 범주, applicable 플래그로 3개 명시 배제) + CAUSES(4원인→relation 매핑) + RELATION_CAUSE/cause_of() 단일 출처. 새 노드/엣지/검증 없음.
- 뷰: analyze.py 콘솔에 "4원인 커버리지" 집계, dashboard.py에 "Aristotelian 메타" 2섹션(범주 실현표 + 4원인 엣지수). 기존 RELATES 데이터에 대한 뷰일 뿐.
- 시드: signals/bigfour에 causes:[drivers/ai-contract-review](작용인 — part-of=증거와 구분, 실무 변동을 능동 유발). drivers에 serves:[cross-domain/business-lifecycle](목적인/telos — 감시의 존재 이유). triggers↔serves 대상 겹쳐도 인과 층 다름을 본문 명시.
- 검증: sync 89p/14rel(경고0) → 4원인 커버리지 질료3·형상0·작용3·목적1 정확. strength 2.20 불변(causes가 part-of 집계에 안 끼어듦). dashboard 2섹션 정상 렌더.

## 2026-06-19 — 시스템 사고 레이어 (피드백 루프·딜레이·레버리지)
- 평가: 진짜 빠진 프리미티브는 인과 엣지의 *부호(polarity)*뿐. 루프 탐지·R/B 분류·레버리지는 전부 파생(strength·4원인과 동일 grammar). Stock=Driver.strength 이미 존재. 인과 링크=causes/triggers/requires 있으나 무부호.
- 결정: 루프=파생 전용(추천, 새 엔티티 0) / 부호 인코딩=signed 관계 2개(추천). 딜레이는 본문 [!delay] 콜아웃(경량). 레버리지는 파생 점수(Meadows 12단계 타입화 안 함=오버엔지니어링 회피).
- 관계 추가: amplifies(+)/dampens(−). ontology.py CAUSAL_POLARITY 단일 출처(amplifies+1/dampens−1/causes·triggers·requires=+1).
- analyze.py: load_causal_graph(부호 엣지) + causal_loops(simple_cycles, 극성 곱→R/B) + leverage_scores(루프참여×betweenness). dashboard.py가 analyze에서 import해 "🔄 시스템 사고" 섹션 생성.
- 시드(systems/, 일반 Page): ai-adoption↔review-cost(dampens 2개=R루프), ai-adoption→liability-disputes→ai-adoption(amplifies+dampens=B루프, [!delay] 콜아웃 + 2025-11 신호 증거). 레버리지 1위=ai-adoption(루프 2개 교차).
- 버그 발견·수정: parse_frontmatter가 YAML 오류 시 조용히 {} 반환 → title이 '['로 시작(`[변수]`)하면 flow-seq로 파싱 실패→relations 통째 누락, 경고도 없음. sync.py에 가드 추가(frontmatter 블록 존재 but 파싱 빈 경우 경고). 시드 title 따옴표/대시로 수정.
- 검증: sync 92p/19rel(경고0) → 루프 2개(R:음2, B:음1) 정확 분류, 레버리지 ai-adoption=2 top. dashboard 섹션 정상. 가드 in-memory 테스트 통과(malformed→발화, valid→정상).

## 2026-06-19 — 지식 그래프 추론 레이어 (KG Reasoning)
- 평가 리프레이밍: 위키는 *이미* KG다 — 페이지=엔티티, 모든 RELATES 엣지=(S,P,O) 트리플, ontology.py=어휘, symmetric/inverse 속성특성 선언됨. RDF/OWL/triple-store 재구현은 있는 것 재구현. KG가 가진 것 중 빠진 결정적 하나 = 추론.
- 결정: 추론=역/대칭+이행폐포+타입포섭(추천) / 외부 표준(RDF·SPARQL)=건너뜀(추천, 외부 소비자 없음→오버엔지니어링).
- 속성특성: ontology.py에 TRANSITIVE={is-a, part-of, requires} + is_transitive() 추가(symmetric/inverse는 기존 RELATIONS에 이미 존재). OWL property characteristic 대응.
- 스키마: db.py에 INFERRED(FROM Page TO Page, type, rule) 테이블 추가. asserted(RELATES)와 별도 — 둘을 절대 혼동 안 하는 것이 KG 논리 규율 + 합리화함정 방지.
- 엔진: infer.py 신규. (1) 이행폐포(관계별 nx.descendants, 직접엣지 제외), (2) 역관계+대칭(asserted ∪ 이행추론 엣지에 적용 → has-subtype가 폐포 반영). rule provenance(transitive:part-of / inverse:is-a / symmetric:see-also)로 출처 기록. sync.py 끝에서 자동 실행.
- 뷰: dashboard.py "🧠 추론" 절 — 규칙별 분포 + 이행 도출 예 + 타입포섭(has-subtype) 목록. dashboard가 infer 결과를 INFERRED 테이블에서 조회.
- 시드: (이행) drivers/ai-legal-automation 신설 + ai-contract-review part-of 그것 → signal(part-of 계약검토) 3개가 transitive:part-of로 법률자동화까지 도출. (포섭) law-concepts/vitiating-factor 신설 + duress·undue-influence·misrepresentation is-a 추가(셋 다 tags에 이미 vitiating-factor 보유 → 충실한 큐레이션) → has-subtype 3개 도출.
- 검증: sync 94p/23rel + 추론 29엣지(transitive3·inverse21·symmetric5). 도출 정확성 확인: 이행 part-of 3건, 포섭 has-subtype 3건. INFERRED∩RELATES 중복=0(분리 규율 유지). dashboard 절 정상.

## 2026-06-19 — 인식론 노드 kind + 담론 관계 레이어 + 시각화
- 요청: 노드유형(의미·통찰·절차·사건·주장·주제) + 엣지유형(지지·확장·구체화·정련·유사·주제·주장·반박·촉발·전제) 분류 추가 + 시각화 전략.
- 평가 리프레이밍: 노드유형은 entity_type(도메인, 디렉토리 파생)과 *직교*하는 인식론 facet → frontmatter kind:로 선언(디렉토리 불가, 가로지름). 엣지유형 10개 중 5개는 기존 관계와 중복(촉발=triggers 등).
- 결정: 엣지=디둡(5 신규 + 한글 alias로 나머지 재사용) / 시각화=Mermaid+pyvis(둘 다).
- 노드 kind: ontology.py KINDS{의미·통찰·절차·사건·주장·주제} + valid_kind(). db.py Page.kind 컬럼. sync.py가 파싱·저장·미정의 경고. entity_type와 공존(faceted).
- 담론 관계 5종 신규: supports(지지)·extends(확장)·refines(정련)·about(주제)·asserts(주장). 디둡: 촉발=triggers·반박=contradicts·전제=requires·구체화=applies·유사=see-also (중복 타입 생성 안 함).
- 한글 alias: RELATION_ALIAS(지지→supports 등) + parse_relations/validate_relations에서 canonical_relation()로 해석. frontmatter에 한글 어휘 직접 사용 가능, 동일 canonical 엣지 생성.
- 시각화 viz.py 신규(무의존): (1) wiki/graph-viz.md — Mermaid 3종(담론 그래프/피드백 루프/is-a 포섭), 버전관리·Obsidian 렌더. (2) graph/graph.html — vis-network CDN 인터랙티브, 노드색=kind·크기=PageRank·엣지색=평면(causal/discourse/structural)·점선=inferred. 4채널 규약. dashboard.py에 kind 분포 추가.
- 검증: sync 95p/26rel(경고0) + 추론32. 한글 alias 3건(지지→supports, 주제→about, 확장→extends) 전부 canonical 해석 확인. kind 4종 저장. Mermaid 담론·포섭 다이어그램 정상, graph.html 26KB(한글라벨·점선 검증).
- 시드: cross-domain/ai-disruption-thesis(kind 주장, 주제/확장 한글 alias). bigfour signal(kind 사건, 지지 alias). vitiating-factor(kind 의미). business-lifecycle(kind 주제).

## 2026-06-19 — 의외의 교차 연결 (구조적 동형 브리지)
- 요청: 서로 다른 자료 간 의외의 연결점을 적극 연결.
- 데이터 진단: 핵심 3과목(law/da/fa)은 거의 완전 사일로 — 직접 LINKS 엣지 단 1개. 교차는 전부 cross-domain 허브 경유.
- 규율: 합리화 함정 방지 원칙 준수 — 억지 유추 금지, 그래프로 후보 탐색 후 진짜 구조적 동형만 앵커와 함께 연결. 버린 후보: 강화루프↔estoppel, 면책↔포트폴리오분산(표면 유사).
- 채택 3개 브리지(kind: 통찰, cross-domain/):
  1. threshold-reasoning — 경계값이 이산적으로 결론을 뒤집는다. DA(Range of Optimality/Feasibility·Shadow Price·Sensitivity) ↔ Law(quiz-methodology "결정적 사실 1개") ↔ FA(inventory 컷오프).
  2. expected-value-under-uncertainty — Σ(결과×확률). DA(simulation) ↔ Law(remedies 소송EV) ↔ FA(time-value 할인).
  3. time-and-delay — 시간이 가치·효력·인과를 바꾼다. FA(time-value 할인) ↔ Systems(liability-disputes 딜레이→오버슈트) ↔ Law(frustration/discharge). 학술과목을 내가 만든 systems/foresight 레이어와 연결.
- 각 페이지에 "동형의 한계" 절로 overclaim 방지(예: DA 경계=수학적 연속 vs Law 경계=규범적 범주).
- 검증: sync 99p/39rel + 추론 45(see-also 대칭 18). 3 브리지 각각 3~4 도메인 연결 확인(사일로 해소). lint_citations: 3개 통찰 페이지 전부 인용 밀도 통과(time-and-delay는 무인용 연속 6→앵커 보강 후 통과).

## [2026-06-23] ingest | Gay Choon Ing v Loh Sze Ti Terence Peter [2009] SGCA 3 (원문 PDF)
- 갱신된 페이지: cases/gay-choon-ing-v-loh (17줄 stub → 사실관계·하급심·쟁점·판시·법리·시험포인트·충돌테이블 전문)
- 주요 발견: ① 화해계약(compromise)은 본질이 계약 — POA+Waiver Letter 동시체결을 서신 전체의 객관적 해석으로 유효 화해로 보아 하급심 번복 [para 77,89]. ② 요청(request)이 손해/이익과 당사자를 잇는 연결고리 → 이익이 제3자(ASP)에 가도 충분한 대가 [para 80–82]. ③ consideration coda: Williams factual benefit로 요건이 잉여화될 위험·대안(경제적강박/부당위압/비양심성/금반언) 검토 [para 92–118].
- relations: applies→consideration·offer·acceptance·iclr / cites→man-financial-v-wong·teo-seng-kee-bob-v-arianecorp.
- 모순/불확실: 화해 성립 여부에서 항소심↔하급심 모순(번복). consideration 존속은 obiter 정책론 vs 실정 요건으로 분기(공존).
- 후속: 나머지 cases/statutes stub 13개도 동일 방식 ingest 대기. graph-sync로 새 relations 반영 권장.

## [2026-06-23] ingest (대량/병렬) | law/cases 13 + law/statutes 7 원문 PDF
- 7개 서브에이전트 병렬 처리. raw/law/cases·statutes 전 원문 정독 → 20페이지 작성.
- 생성된 판례(신규 8): chwee-kin-keong-v-digilandmall(일방적 착오·온라인 성립), zurich-v-b-gold(맥락적 해석·증거법 s94), sembcorp-marine-v-ppl(묵시조항 3단계·Belize 거부), orient-centre-v-societe-generale(비의존 조항→증거적 금반언), raiffeisen-v-archer-daniels-midland(기망 4요건), sports-connection-v-deuter(RDC 정련), ngiam-kong-seng-v-lim(정신적 손해), man-mohan-singh-v-zurich(loss of dependency).
- 확장된 판례 stub(4): teo-seng-kee-bob-v-arianecorp, rdc-concrete-v-sato-kogyo, man-financial-v-wong([2008]→[2007] SGCA 53 정정), spandeck-v-dsta. (gay-choon-ing-v-loh은 직전 단건 완료)
- 확장된 법령 stub(7): electronic-transactions / evidence / unfair-contract-terms / sales-of-goods / frustrated-contracts / contributory-negligence / consumer-protection Act.
- relations: 판례→applies/cites/see-also, 법령→governs(규율 대상 law-concept). 모든 stub의 그래프 메트릭(pagerank 등) 보존.
- 주요 발견: Chwee CA의 보통법(실제인식) vs 형평(구성적인식+부정) 이원 / Spandeck 단일 2단계(근접성→정책) / RDC 4 Situations·Hongkong Fir / Sembcorp의 Belize 명시적 거부 / Orient 비의존 조항=증거적 금반언으로 reliance 차단.
- 모순/불확실: 다수 페이지가 항소심↔하급심 번복을 충돌테이블에 모순으로 기록. Orient는 UCTA의 비의존 조항 적용 여부를 미결로 남김([!uncertain]).
- 미반영: BOM v BOK·제3자권리법은 raw 원문 부재로 stub 유지. DA/FA 원문(교과서·해답지)은 위키 큐레이션 방식과 불일치로 제외.
- 후속: graph-sync(새 relations) → graph-analyze(신규 8페이지 메트릭 부여) → 사이트 재빌드.

## [2026-06-24] ingest | BOM v BOK [2018] SGCA 83 (공식 판결문 eLitigation 원문)
- raw 부재였던 마지막 판례 stub 해소. 사용자 요청에 따라 **PDF를 직접 구하는 대신 공개 판결문(eLitigation gd)을 웹에서 취득** → `raw/law/cases/(11) BOM v BOK [2018] SGCA 83.txt`(문단번호 포함 원문 432줄)로 저장 후 ingest. (judiciary.gov.sg PDF 링크는 404.)
- 갱신된 페이지: cases/bom-v-bok (17줄 stub → 사실관계·하급심·쟁점·판시·법리(misrep/mistake/undue influence/unconscionability)·시험포인트·충돌테이블 전문, 전 주장에 [para N] 앵커).
- 주요 발견: ① 불공정성 — 호주 *Amadio* 넓은 법리 **거부**, *Fry v Lane*·*Cresswell* 좁은 법리 채택하되 **infirmity를 빈곤·무지→신체·정신·정서로 확장**(자기이익 보전능력을 급격히 손상시킬 중대성 + 상대 인지). 저가·독립조언 결여는 **필수요건 아님**("very important factors") [para 141–142]. ② narrow doctrine ≈ Class 1 undue influence 가설(폐기 보류, virtually coincident) [para 145–152]. ③ Class 1 undue influence 인정(급성 비탄 이용, 정신무능력 불요, "bullying or importunity") / 영향력 행사자 이득 불요(*Bridgeman v Green*) [para 102–107]. ④ Class 2A 번복 — 부부간 묵시적 위임 부정(*Balfour*) [para 110–113]. ⑤ misrepresentation·mistake(*Pitt v Holt*)도 각각 독립 무효사유. ⑥ coda: 통합 우산 법리 거부 [para 177].
- relations: applies→unconscionability·undue-influence·misrepresentation·mistake·vitiating-factor / see-also→duress·gay-choon-ing-v-loh.
- 동반 보정: law-concepts/unconscionability 페이지의 narrow-doctrine 요건을 1차 판례에 맞춰 정정(저가·독립조언=필수 아님으로 수정, BOM v BOK를 source로 추가). index.md cases 표 [ ]→[x].
- 후속: graph-sync(새 relations 5+2) → graph-analyze(메트릭 재계산) → 사이트 재빌드.

## [2026-06-24] nav | 홈 카탈로그를 드릴다운(허브-스포크) 구조로 재편
- 요청: index → 과목(선택) → 수업내용 → cases/퀴즈. index에는 과목만 노출.
- 신규 허브(MOC) 4개: business-law / decision-analysis / financial-accounting / ai-foresight (kind: 주제). 각 허브가 해당 과목의 개념·판례·법령·퀴즈·원본소스 테이블을 보유. 상단에 [[index|← 과목 선택]] 백링크.
- index.md: 상세 테이블 전부 제거 → 과목 메뉴(3 수업 + cross-domain + ai·foresight)만 남김. 비파괴적(폴더 이동 없음 → ontology·링크 보존).
- 퀴즈 분리: law-concepts의 mistake-quiz·scenarios·irac·methodology를 business-law 허브의 ## 퀴즈로, simulation-quiz(·problems)를 decision-analysis 허브의 ## 퀴즈로 묶음.
- 그래프: sync 107→111 페이지. 링크 질량이 index(degree 106→8)에서 허브로 이동(business-law 48 / da 29 / ai-foresight 14 / fa 9). analyze·viz·dashboard 재생성.
- 검증: 4 허브 + index HTTP 200, index 본문 위키링크=과목 5개+메타만. cases/퀴즈 허브 포함 확인.

## [2026-06-24] tooling | 과목 추가 규약 + /add-subject 스킬
- 확장성 요청(과목 계속 추가 시 정렬 유지). 콘텐츠 폴더 불변 원칙 하에 과목 구분을 3 표현 레이어(탐색기 라벨·허브·index)로만 한다는 규약을 CLAUDE.md "과목(Subject) 추가 규약"으로 명문화 + 불변 규칙에 1줄 추가.
- 탐색기(quartz.layout.ts): 이미 forgiving(미등록 폴더는 맨 끝에 원래 이름으로 표시, rank ?? 999) — "여기에 추가" 주석 보강. 로직 변경 없음(재빌드 불요).
- 신규 명령 `.claude/commands/add-subject.md`: 폴더 시드 → 탐색기 등록 → 허브(MOC) → index 메뉴 → (선택)ontology → sync/analyze/재빌드 → 검증/로그까지 1패스 스캐폴딩. CLAUDE.md Operations 표에 등록.

## [2026-06-24] ingest | DA 누락 챕터 8개 노트 (Anderson 14e Ch.5·7·8·9·10·13·14·15)
- 갭 분석: Business Law(prewriting 20주제)·FA(가이드노트 W4·5·9·10·11)는 큐레이션 범위 전부 노트화 완료 → 추가 없음. DA만 Ch1–4·6·11·12만 있고 나머지 누락.
- 사용자 선택: DA 빠진 장 전부 추가. **Ch16 Markov는 교과서 PDF에 없음("On Website")이라 제외**(출처 부재 → 규칙상 미작성).
- 신규 da-concepts 노트 8개(교과서 CONTENTS·도입부 근거, 책↔PDF 오프셋 +32로 위치 확정):
  - Advanced LP Applications(Ch5: DEA·수익관리·포트폴리오·게임이론)
  - Integer Linear Programming(Ch7: 0-1, LP완화·경계, 모델링 제약)
  - Nonlinear Optimization(Ch8: 국소/전역, Markowitz)
  - Project Scheduling (PERT-CPM)(Ch9: 임계경로, t=(a+4m+b)/6, crashing)
  - Inventory Models(Ch10: EOQ Q*=√(2DCo/Ch), 재주문점, newsvendor)
  - Decision Analysis(Ch13: payoff·tree, maximax/maximin/minimax regret, EMV·EVPI·EVSI·Bayes·utility)
  - Multicriteria Decisions(Ch14: 목표계획 편차변수, 점수모형, AHP CR=CI/RI)
  - Time Series Forecasting(Ch15: MA·지수평활 F=αY+(1-α)F, 선형추세, 계절성)
- 허브/MOC 갱신: decision-analysis.md에 클러스터 G–J 추가(개념 24→32), LLM Wiki MOC에 G–J 섹션·코스범위 확장, index.md DA 설명 갱신.
- 그래프: sync 111→119 페이지, 595 링크. 8개 노트 community 3(DA)로 군집, 미해결 링크 경고 없음. analyze·viz·dashboard 재생성.
- 검증: 8개 노트 HTTP 200, 허브 클러스터 G–J 렌더 확인.

## [2026-06-24] site | 메인 제목 변경
- quartz.config.ts pageTitle "LLM Wiki — 수업 노트" → "Study Wiki" (사용자 요청). 서버 재시작 후 좌상단 적용 확인.

## [2026-06-24] tooling | 강의 녹음 자동화 파이프라인 (반자동)
- 요청: 폰 녹음이 컴퓨터에 연결되면 자동으로 수업노트+예시문제 생성. 확인 결과 이 맥에서 전부 가능(iCloud Voice Memos 동기화·iCloud Drive·launchd·whisper.cpp·claude -p 헤드리스 모두 검증).
- 사용자 선택: 반자동(초안 생성+검수 표시+알림) / 전용 iCloud Drive 폴더 트리거.
- 구성: iCloud `Lectures/<과목>/` 폴더(+README) → launchd com.grace.lecture-watch(WatchPaths) → scripts/lecture-watch.sh: ffmpeg→whisper-cli(ggml-small)→전사본 raw/<과목>/lectures/ 저장→claude -p(acceptEdits)로 노트+예시문제 초안→graph-sync/analyze→macOS 알림.
- 검증: 합성 오디오로 전사 파이프라인 통과(AUTO_NOTES=0, 토큰 0). launchd 에이전트 load 확인. 헤드리스 노트생성은 실제 녹음으로 첫 검증 예정.
- 안전장치: 초안에 [!todo] 검수 배너, 전사본 raw 보존, 오디오·모델 git 제외 예정. 끄기 launchctl unload / AUTO_NOTES=0.
- 신규 스킬 .claude/commands/ingest-lecture.md(수동) + CLAUDE.md "강의 녹음 자동화" 문서화.

## [2026-07-01] reorg | Align FA + Law chapter folders to textbook TOC
- Request: reorganize each subject's content by chapter, spine = textbook chapters (not lecture weeks/thematic parts); fix naming/numbering + navigation/hubs.
- DA (da-concepts/): already ch01–ch15 = *Management Science* 14e TOC — no change.
- FA (fa-concepts/): renamed week folders → Spiceland textbook chapters. w04→ch04-cash-controls (Cash & Internal Controls), w05→ch06-inventory (Inventory & COGS), w09→ch09-long-term-liabilities, w10→ch10-equity (Stockholders' Equity), w11→ch11-cash-flows.
- Law (law-concepts/): split thematic parts → SMU *The Law of Business* chapters. part5→ch06-negligence, part1→ch07-offer-acceptance/ch08-consideration-intention/ch09-capacity-privity, part2→ch10-terms/ch11-exemption-clauses, part3→ch12-mistake/ch13-misrepresentation/ch14-duress-undue-influence/ch15-illegality, part4→ch16-breach(discharge)/ch17-frustration/ch18-remedies, part6→ch20-agency. privity moved part4→ch09 (matches textbook Ch 9 Capacity & Privity). vitiating-factor umbrella → law-concepts/ root (spans Ch 12–15).
- All moves via git mv; 10 FA + 29 Law link references rewritten across vault (basenames preserved); 0 stale paths remain.
- Hubs rebuilt: business-law.md + financial-accounting.md tables reordered by chapter with a Ch column; mistake-quiz labels Chapter 8→Ch 12.

## [2026-07-03] content | Add personal profile pages (about-me, resume)
- Request: put my info into the wiki and connect an "about me" page to it.
- Added [[resume]] — résumé source of truth (curated from a high-school extracurricular CV + LinkedIn, adapted for a 2nd-year university résumé; high-school grades/SAT/AP excluded). Mirrors ~/resume/data/*.yaml → resume site.
- Added [[about-me]] — personal hub (kind 프로필) linking who I am to subjects studied and things built; relations: see-also → resume, business-law, financial-accounting, decision-analysis, ai-foresight.
- Registered both in index.md (More table). Graph sync still to run to pull them into the graph DB.

## [2026-07-03] content | Remove résumé from site; add "Add Content" page
- Request: résumé is unrelated to Grace's Study Hub — remove it; add a visible way to add recordings, new subjects, and files.
- Deleted [[resume]] and its menu row; cleaned all [[resume]] links out of [[about-me]] (see-also + body); log history kept.
- Added [[add-content]] (kind 절차) — a hub with the iCloud recording pipeline, GitHub web-editor buttons for notes/file uploads, and the /add-subject flow. Registered in index.md (More table).
