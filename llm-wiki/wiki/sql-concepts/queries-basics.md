---
title: 쿼리 기초 — SELECT · WHERE · 정렬
tags: [sql, query, select, where, sorting]
sources: ["SQLBolt Lessons 1–4, 9"]
updated: 2026-08-04
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">쿼리 기초 — SELECT · WHERE · 정렬</div><div class="dc-sub">테이블에서 원하는 열·행을 골라 정렬해 가져온다</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">SELECT</div><div class="dc-step-d">어떤 열</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">FROM</div><div class="dc-step-d">어떤 테이블</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">WHERE</div><div class="dc-step-d">어떤 행(조건)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">ORDER BY</div><div class="dc-step-d">정렬 + LIMIT</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>기본 구조</h2><span class="dc-hint">열 → 테이블 → 조건</span></div>
<div class="dc-card"><b>SELECT</b> 열 목록(또는 <code>*</code>) <b>FROM</b> 테이블 <b>WHERE</b> 조건 <span class="dc-chip">가장 많이 쓰는 문</span></div>
<div class="dc-section"><span class="dc-num">2</span><h2>WHERE 연산자</h2><span class="dc-hint">숫자 vs 문자</span></div>
<div class="dc-cols"><div class="dc-card"><div class="dc-eyebrow">숫자</div>= != &lt; &gt; · BETWEEN … AND … · IN (…)</div><div class="dc-card"><div class="dc-eyebrow">문자</div>= · LIKE (% _) · IN (…) <span class="dc-chip amber">패턴 매칭</span></div></div>
<div class="dc-section"><span class="dc-num">3</span><h2>정렬 · 제한</h2><span class="dc-hint">ORDER BY · LIMIT</span></div>
<div class="dc-card"><b>ORDER BY</b> 열 <b>ASC/DESC</b> · <b>LIMIT</b> n <b>OFFSET</b> m — 페이지네이션에 사용</div>
<div class="dc-callout">중복 제거는 <b>DISTINCT</b>, 열·결과에 별명은 <b>AS</b>. 조건은 <b>AND</b>/<b>OR</b>로 결합한다.</div>
</div>

# 쿼리 기초 — SELECT · WHERE · 정렬

데이터베이스에서 데이터를 **읽어오는(조회)** 명령이 `SELECT`다. SQL에서 가장 많이 쓰는 문장이며, "어떤 **열**을, 어떤 **테이블**에서, 어떤 **행**만" 골라오는 구조다.

## 1. SELECT … FROM — 열 고르기

```sql
SELECT column, another_column   -- 특정 열만
FROM mytable;

SELECT *                        -- 모든 열
FROM mytable;
```

## 2. WHERE — 행(조건) 고르기

`WHERE`는 조건에 맞는 행만 남긴다. 각 행마다 조건식을 평가해 참인 행만 결과에 포함한다.

### 숫자·일반 연산자

| 연산자 | 뜻 | 예 |
|--------|-----|-----|
| `=`, `!=` (`<>`) | 같다 / 다르다 | `year = 2020` |
| `<`, `<=`, `>`, `>=` | 대소 비교 | `year >= 2000` |
| `BETWEEN a AND b` | a~b 범위(포함) | `year BETWEEN 2000 AND 2010` |
| `NOT BETWEEN a AND b` | 범위 밖 | |
| `IN (…)` / `NOT IN (…)` | 목록에 있음/없음 | `year IN (2001, 2005, 2010)` |

### 문자열 연산자

| 연산자 | 뜻 |
|--------|-----|
| `=` | 정확히 일치(대소문자 구분은 DB마다 다름) |
| `LIKE` / `NOT LIKE` | 패턴 매칭(대소문자 무시하는 경우 많음) |
| `%` | 0글자 이상 아무 문자 (와일드카드) |
| `_` | 정확히 1글자 |
| `IN (…)` | 목록에 있음 |

```sql
SELECT title FROM movies
WHERE title LIKE 'Toy Story%';   -- 'Toy Story'로 시작
```

### 조건 결합

```sql
SELECT * FROM movies
WHERE year >= 2000 AND (director = 'John Lasseter' OR length_minutes < 100);
```

## 3. DISTINCT — 중복 제거

```sql
SELECT DISTINCT director FROM movies;   -- 감독 목록(중복 없이)
```

## 4. ORDER BY — 정렬

실제 DB의 데이터는 정렬돼 있지 않다. 특정 열 기준으로 오름차순(`ASC`)·내림차순(`DESC`) 정렬한다.

```sql
SELECT * FROM movies
ORDER BY year DESC;   -- 최신 순
```

## 5. LIMIT · OFFSET — 일부만

`LIMIT`은 가져올 행 수를 제한하고, `OFFSET`은 몇 번째부터 셀지를 정한다. 웹의 "페이지네이션"이 대표적 예다(정렬 후 offset을 바꿔가며 페이지별로 조회).

```sql
SELECT * FROM movies
ORDER BY year DESC
LIMIT 5 OFFSET 10;   -- 11~15번째 행
```

## 6. 표현식과 별명(AS)

값에 계산·함수를 적용하고, 열·결과에 읽기 쉬운 이름을 붙일 수 있다.

```sql
SELECT title AS 제목,
       (sales / 1000000) AS sales_millions
FROM boxoffice;
```

## 관련 노트
- [[sql-concepts/joins-and-aggregates]] · [[sql-concepts/tables-and-ddl]]
