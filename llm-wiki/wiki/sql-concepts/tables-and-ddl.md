---
title: 테이블과 데이터 정의
tags: [sql, mysql, ddl, table, constraint]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL"]
updated: 2026-08-03
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">테이블과 데이터 정의</div><div class="dc-sub">DDL로 테이블 구조를 만들고 제약조건으로 데이터 무결성을 지킨다</div></div>
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
</div>

# 테이블과 데이터 정의

테이블의 구조를 만들고 바꾸는 명령을 **DDL(Data Definition Language)** 이라 한다: `CREATE`, `ALTER`, `DROP`.

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
CREATE TABLE member (
    mem_id      CHAR(8)      NOT NULL PRIMARY KEY,
    mem_name    VARCHAR(10)  NOT NULL,
    height      INT          NULL,
    join_date   DATE         DEFAULT (CURRENT_DATE)
);
```

## 제약조건(Constraint)

데이터의 **무결성(integrity)** 을 지키는 규칙이다.

- **PRIMARY KEY** — 행을 유일하게 식별. 중복·NULL 불가. 테이블당 1개.
- **FOREIGN KEY** — 다른 테이블의 PK를 참조해 두 테이블을 연결. 참조 무결성 보장.
- **UNIQUE** — 중복 금지(단, NULL은 허용).
- **NOT NULL** — 빈 값(NULL) 금지.
- **DEFAULT** — 값을 지정하지 않으면 기본값 입력.
- **AUTO_INCREMENT** — 행이 추가될 때마다 자동으로 1씩 증가(주로 PK에 사용).

## ALTER / DROP

```sql
ALTER TABLE member ADD COLUMN phone CHAR(11) NULL;   -- 열 추가
ALTER TABLE member MODIFY COLUMN mem_name VARCHAR(20); -- 형식 변경
DROP TABLE member;                                    -- 테이블 삭제
```

> **DROP은 테이블과 데이터를 통째로 삭제**한다. 데이터만 비우려면 `DELETE`/`TRUNCATE`를 쓴다.

## 관련 노트
- [[sql-concepts/indexes]] · [[sql-concepts/views]] · [[sql-concepts/learning-environment]]
