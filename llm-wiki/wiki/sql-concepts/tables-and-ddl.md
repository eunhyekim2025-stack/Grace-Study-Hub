---
title: 테이블 정의(DDL)와 데이터 조작(DML)
tags: [sql, mysql, ddl, dml, table, constraint]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL", "SQLBolt Lessons 13–18"]
updated: 2026-08-04
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">테이블 정의(DDL)와 데이터 조작(DML)</div><div class="dc-sub">DDL로 표 구조를 만들고, DML로 데이터를 넣고·고치고·지운다</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">데이터 형식</div><div class="dc-step-d">INT · CHAR · DATE …</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">CREATE TABLE</div><div class="dc-step-d">열 + 형식 정의</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">제약조건</div><div class="dc-step-d">PK · FK · UNIQUE …</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">ALTER / DROP</div><div class="dc-step-d">수정·삭제</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>주요 데이터 형식</h2><span class="dc-hint">숫자·문자·날짜</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">숫자</div>INT · BIGINT · DECIMAL · FLOAT</div>
<div class="dc-card"><div class="dc-eyebrow">문자</div>CHAR(고정) · VARCHAR(가변) · TEXT</div>
<div class="dc-card"><div class="dc-eyebrow">날짜</div>DATE · DATETIME · TIME</div>
</div>
<div class="dc-section"><span class="dc-num">2</span><h2>제약조건</h2><span class="dc-hint">데이터 무결성</span></div>
<div class="dc-card"><b>PRIMARY KEY</b> 행을 유일하게 구분 (중복·NULL 불가) <span class="dc-chip">PK</span></div>
<div class="dc-card"><b>FOREIGN KEY</b> 다른 테이블의 PK를 참조 <span class="dc-chip">FK</span></div>
<div class="dc-card"><b>UNIQUE · NOT NULL · DEFAULT · AUTO_INCREMENT</b> 값의 규칙을 강제</div>
<div class="dc-callout">CHAR는 <b>고정 길이</b>(남는 자리 공백), VARCHAR는 <b>가변 길이</b>(실제 길이만큼). 길이가 들쭉날쭉하면 VARCHAR가 효율적.</div>
<div class="dc-section"><span class="dc-num">3</span><h2>데이터 조작 (DML)</h2><span class="dc-hint">행을 넣고·고치고·지운다</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">INSERT</div>새 행 추가 <span class="dc-chip">INTO … VALUES</span></div>
<div class="dc-card"><div class="dc-eyebrow">UPDATE</div>기존 행 수정 <span class="dc-chip amber">SET … WHERE</span></div>
<div class="dc-card"><div class="dc-eyebrow">DELETE</div>행 삭제 <span class="dc-chip amber">FROM … WHERE</span></div>
</div>
<div class="dc-callout warn">UPDATE·DELETE에서 <b>WHERE를 빠뜨리면 전체 행</b>에 적용된다. 먼저 같은 조건으로 SELECT해 대상 행을 확인한 뒤 실행하라.</div>
</div>

# 테이블 정의(DDL)와 데이터 조작(DML)

SQL 명령은 크게 둘로 나뉜다.
- **DDL(Data Definition Language)** — 테이블 **구조**를 만들고 바꾼다: `CREATE`, `ALTER`, `DROP`.
- **DML(Data Manipulation Language)** — 테이블 안의 **데이터(행)** 를 다룬다: `INSERT`, `UPDATE`, `DELETE` (조회 `SELECT` 포함).

이 노트는 표를 **정의(DDL)** 하고, 그 안의 데이터를 **조작(DML)** 하는 명령을 함께 다룬다.

## 데이터 형식

| 분류 | 형식 | 설명 |
|------|------|------|
| 숫자 | `INT`, `BIGINT` | 정수 |
| 숫자 | `DECIMAL(m,d)` | 소수점 고정(정확한 금액) |
| 숫자 | `FLOAT`, `DOUBLE` | 실수(근사값) |
| 문자 | `CHAR(n)` | **고정 길이** 문자열 |
| 문자 | `VARCHAR(n)` | **가변 길이** 문자열 |
| 문자 | `TEXT`, `LONGTEXT` | 대용량 문자열 |
| 날짜 | `DATE`, `DATETIME`, `TIME` | 날짜·시간 |

## CREATE TABLE

```sql
CREATE TABLE IF NOT EXISTS member (
    mem_id      CHAR(8)      NOT NULL PRIMARY KEY,
    mem_name    VARCHAR(10)  NOT NULL,
    height      INT          NULL,
    join_date   DATE         DEFAULT (CURRENT_DATE)
);
```

- `IF NOT EXISTS` — 같은 이름의 테이블이 이미 있으면 오류 없이 넘어간다.
- 각 열은 `이름 · 데이터형식 · (제약조건)` 순으로 정의한다.
- 열 뒤가 아니라 맨 끝에 `PRIMARY KEY (a, b)`, `FOREIGN KEY (x) REFERENCES t(y)`처럼 **테이블 수준 제약**으로 쓸 수도 있다(복합 키 등).

## 제약조건(Constraint)

데이터의 **무결성(integrity)** 을 지키는 규칙이다.

- **PRIMARY KEY** — 행을 유일하게 식별. 중복·NULL 불가. 테이블당 1개.
- **FOREIGN KEY** — 다른 테이블의 PK를 참조해 두 테이블을 연결. 참조 무결성 보장.
- **UNIQUE** — 중복 금지(단, NULL은 허용).
- **NOT NULL** — 빈 값(NULL) 금지.
- **DEFAULT** — 값을 지정하지 않으면 기본값 입력.
- **AUTO_INCREMENT** — 행이 추가될 때마다 자동으로 1씩 증가(주로 PK에 사용).

## ALTER TABLE — 구조 변경

이미 만든 테이블의 열을 추가·변경·삭제하거나 이름을 바꾼다.

```sql
ALTER TABLE member ADD COLUMN phone CHAR(11) NULL;      -- 열 추가
ALTER TABLE member MODIFY COLUMN mem_name VARCHAR(20);  -- 형식/제약 변경
ALTER TABLE member DROP COLUMN height;                  -- 열 삭제
ALTER TABLE member RENAME COLUMN mem_name TO name;      -- 열 이름 변경
ALTER TABLE member RENAME TO members;                   -- 테이블 이름 변경
```

## DROP TABLE — 테이블 삭제

```sql
DROP TABLE IF EXISTS member;   -- 테이블 구조 + 데이터 모두 삭제
```

> **셋의 차이**: `DROP TABLE`은 테이블 자체를 없앤다. `TRUNCATE TABLE`은 구조는 남기고 **모든 행**을 빠르게 비운다. `DELETE`는 **조건에 맞는 행**만 지운다(아래 DML).

---

# 데이터 조작 (DML)

정의한 테이블에 데이터를 넣고(`INSERT`), 고치고(`UPDATE`), 지운다(`DELETE`). *(SQLBolt Lessons 13–15)*

## INSERT — 행 추가

```sql
-- ① 모든 열 값을 순서대로
INSERT INTO member
VALUES ('BLK', '블랙핑크', 163, '2020-01-01');

-- ② 특정 열만 지정 (나머지는 DEFAULT/NULL)
INSERT INTO member (mem_id, mem_name)
VALUES ('IVE', '아이브'),
       ('AESPA', '에스파');   -- 여러 행 한 번에

-- ③ 값에 수식·함수 사용 가능
INSERT INTO boxoffice (movie_id, sales)
VALUES (1, 283742034 / 1000000);
```

- 열을 명시하는 ②가 **권장**된다 — 나중에 테이블에 열이 추가돼도 기존 INSERT 문이 깨지지 않는다(forward compatible).
- `AUTO_INCREMENT` 열은 값을 생략하면 자동으로 채워진다.

## UPDATE — 행 수정

```sql
UPDATE member
SET mem_name = '르세라핌', height = 170
WHERE mem_id = 'LSRFM';
```

> ⚠️ **WHERE를 빠뜨리면 테이블의 모든 행이 바뀐다.** SQLBolt의 조언: 수정 전에 **같은 WHERE로 먼저 `SELECT`** 해서 대상 행이 맞는지 확인한 뒤 UPDATE를 실행하라.

## DELETE — 행 삭제

```sql
DELETE FROM member
WHERE mem_id = 'BLK';
```

- `WHERE` 없는 `DELETE FROM member;` 는 **전체 행을 삭제**한다(구조는 남음).
- UPDATE와 똑같이, 먼저 `SELECT`로 지울 행을 확인하는 습관이 안전하다.

## 관련 노트
- [[sql-concepts/indexes]] · [[sql-concepts/views]] · [[sql-concepts/learning-environment]]
