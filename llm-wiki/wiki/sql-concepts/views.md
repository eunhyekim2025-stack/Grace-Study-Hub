---
title: 가상 테이블 — 뷰(View)
tags: [sql, mysql, view, virtual-table, security]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL"]
updated: 2026-08-03
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">가상 테이블 — 뷰(View)</div><div class="dc-sub">SELECT 문에 이름을 붙인 가상 테이블 — 실제 데이터는 없다</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">SELECT 작성</div><div class="dc-step-d">보여줄 열·조건</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">CREATE VIEW</div><div class="dc-step-d">쿼리에 이름 부여</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">테이블처럼 조회</div><div class="dc-step-d">SELECT … FROM 뷰</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>왜 쓰나</h2><span class="dc-hint">보안 + 편의</span></div>
<div class="dc-cols"><div class="dc-card"><div class="dc-eyebrow">보안</div>민감한 열을 숨기고 <b>필요한 열만</b> 노출 <span class="dc-chip">권한 분리</span></div><div class="dc-card"><div class="dc-eyebrow">편의</div>복잡한 조인·조건을 <b>한 이름</b>으로 재사용 <span class="dc-chip amber">쿼리 단순화</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>특징</h2><span class="dc-hint">가상 테이블</span></div>
<div class="dc-card"><b>실제 데이터를 저장하지 않는다</b> — 조회할 때마다 원본 테이블에서 가져온다</div>
<div class="dc-callout warn">뷰를 통한 <b>수정(INSERT/UPDATE)</b>은 집계·GROUP BY·DISTINCT 등이 들어가면 불가능하다. 단순 뷰만 갱신 가능.</div>
</div>

# 가상 테이블 — 뷰(View)

**뷰(View)** 는 하나 이상의 테이블에서 나온 SELECT 문에 **이름을 붙인 가상 테이블**이다. 실제 데이터를 담지 않고, 조회할 때마다 원본 테이블에서 데이터를 가져온다.

## 생성과 사용

```sql
CREATE VIEW v_member AS
    SELECT mem_id, mem_name, addr
    FROM member;

SELECT * FROM v_member;   -- 진짜 테이블처럼 조회
```

## 왜 쓰는가

- **보안(security)** — 원본 테이블에는 전화번호·주소 같은 민감 정보가 있어도, 뷰에는 **필요한 열만** 담아 노출한다. 사용자에게 테이블 대신 뷰 권한만 준다.
- **편의성(convenience)** — 여러 테이블을 조인하는 복잡한 쿼리를 뷰 하나로 만들어 두면, 이후엔 `SELECT * FROM 뷰` 처럼 간단히 재사용한다.

## 특징

- **가상 테이블** — 데이터를 따로 저장하지 않는다(저장 공간 거의 없음). 뷰를 조회하면 내부적으로 원본 SELECT가 실행된다.
- **항상 최신** — 원본 테이블이 바뀌면 뷰 결과도 자동으로 반영된다.

## 갱신 가능 뷰(Updatable View)

- **단순 뷰**(단일 테이블, 집계 없음)는 뷰를 통해 `INSERT`/`UPDATE`/`DELETE` 가능 → 원본 테이블에 반영.
- `GROUP BY`, `DISTINCT`, 집계 함수, `JOIN` 등이 들어간 **복잡한 뷰는 갱신 불가**.

## 관리

```sql
ALTER VIEW v_member AS SELECT ... ;  -- 뷰 정의 변경
DROP VIEW v_member;                  -- 뷰 삭제 (원본 테이블은 그대로)
```

## 관련 노트
- [[sql-concepts/tables-and-ddl]] · [[sql-concepts/indexes]]
