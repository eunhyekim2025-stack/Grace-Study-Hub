---
title: JOIN과 집계 — 여러 테이블 · GROUP BY
tags: [sql, query, join, aggregate, group-by]
sources: ["SQLBolt Lessons 6–8, 10–12"]
updated: 2026-08-04
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">JOIN과 집계</div><div class="dc-sub">여러 테이블을 잇고(JOIN), 그룹으로 요약한다(집계)</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">JOIN</div><div class="dc-step-d">테이블 연결</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">WHERE</div><div class="dc-step-d">행 필터</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">GROUP BY</div><div class="dc-step-d">그룹으로 묶기</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">집계</div><div class="dc-step-d">COUNT·SUM·AVG</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>JOIN 종류</h2><span class="dc-hint">정규화된 테이블 잇기</span></div>
<div class="dc-cols"><div class="dc-card"><div class="dc-eyebrow">INNER JOIN</div>양쪽에 <b>다 있는</b> 행만 <span class="dc-chip">교집합</span></div><div class="dc-card"><div class="dc-eyebrow">LEFT / RIGHT / FULL OUTER</div>한쪽에만 있어도 <b>남긴다</b> (빈칸은 NULL) <span class="dc-chip amber">NULL 발생</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>집계 함수</h2><span class="dc-hint">GROUP BY로 그룹별</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">개수</div>COUNT(*) · COUNT(col)</div>
<div class="dc-card"><div class="dc-eyebrow">수치</div>SUM · AVG · MIN · MAX</div>
<div class="dc-card"><div class="dc-eyebrow">필터</div>WHERE(그룹 전) · HAVING(그룹 후)</div>
</div>
<div class="dc-callout warn">집계 결과를 조건으로 거를 땐 <b>WHERE가 아니라 HAVING</b>을 쓴다 — WHERE는 그룹 짓기 전, HAVING은 그룹 지은 후에 적용된다.</div>
</div>

# JOIN과 집계 — 여러 테이블 · GROUP BY

실제 DB는 데이터 중복을 줄이려 정보를 **여러 테이블로 나눠(정규화)** 둔다. 이를 다시 합쳐 보거나(JOIN), 그룹으로 요약하는(집계) 방법이다.

## 1. INNER JOIN — 테이블 잇기

두 테이블을 공통 열(주로 FK↔PK)로 연결한다. `INNER JOIN`은 **양쪽 모두에 짝이 있는** 행만 남긴다.

```sql
SELECT movies.title, boxoffice.sales
FROM movies
INNER JOIN boxoffice
  ON movies.id = boxoffice.movie_id;
```

- `ON` 뒤에 두 테이블을 잇는 조건(어떤 열끼리 같은지)을 쓴다.
- `INNER JOIN`은 그냥 `JOIN`이라고도 쓴다.

## 2. OUTER JOIN — 짝 없는 행도 남기기

한쪽에만 있는 행도 결과에 포함하고 싶을 때. 짝이 없는 칸은 **NULL**로 채워진다.

| 종류 | 남기는 행 |
|------|-----------|
| `LEFT JOIN` | **왼쪽** 테이블의 모든 행 + 오른쪽의 짝 |
| `RIGHT JOIN` | **오른쪽** 테이블의 모든 행 + 왼쪽의 짝 |
| `FULL OUTER JOIN` | **양쪽** 모든 행 |

```sql
SELECT employees.name, buildings.capacity
FROM employees
LEFT JOIN buildings ON employees.building = buildings.name;
```

## 3. NULL 다루기

빈 값은 `NULL`이며, **`= NULL`이 아니라 `IS NULL` / `IS NOT NULL`** 로 검사한다. (OUTER JOIN이 NULL을 자주 만든다.)

```sql
SELECT name FROM employees
WHERE building IS NULL;   -- 배정 안 된 직원
```

## 4. 집계 함수(Aggregate)

여러 행을 하나의 요약값으로 압축한다.

| 함수 | 뜻 |
|------|-----|
| `COUNT(*)` / `COUNT(col)` | 행 개수 / (NULL 아닌) 값 개수 |
| `SUM(col)` | 합계 |
| `AVG(col)` | 평균 |
| `MIN(col)` / `MAX(col)` | 최소 / 최대 |

```sql
SELECT COUNT(*), AVG(sales)
FROM boxoffice;   -- 전체에 대한 요약 한 줄
```

## 5. GROUP BY — 그룹별 집계

`GROUP BY`는 같은 값을 가진 행끼리 묶고, 집계 함수를 **그룹마다** 적용한다.

```sql
SELECT director, COUNT(*) AS movie_count, AVG(length_minutes) AS avg_len
FROM movies
GROUP BY director;   -- 감독별 영화 수·평균 길이
```

## 6. HAVING — 그룹에 조건

집계 **결과**를 기준으로 그룹을 거를 땐 `WHERE`가 아니라 `HAVING`을 쓴다.

```sql
SELECT director, COUNT(*) AS cnt
FROM movies
GROUP BY director
HAVING cnt >= 3;   -- 3편 이상 만든 감독만
```

> **WHERE vs HAVING**: `WHERE`는 그룹 짓기 **전**(개별 행)에, `HAVING`은 그룹 지은 **후**(집계값)에 적용된다.

## 7. 쿼리 실행 순서(Order of Execution)

작성 순서와 **실제 실행 순서**는 다르다. 이 순서를 알면 왜 `WHERE`에서 별명(AS)을 못 쓰는지 등이 이해된다.

```
FROM · JOIN  →  WHERE  →  GROUP BY  →  HAVING
            →  SELECT  →  DISTINCT  →  ORDER BY  →  LIMIT / OFFSET
```

## 관련 노트
- [[sql-concepts/queries-basics]] · [[sql-concepts/tables-and-ddl]] · [[sql-concepts/views]]
