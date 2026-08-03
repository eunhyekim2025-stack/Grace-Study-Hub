---
title: 스토어드 개체
tags: [sql, mysql, stored-procedure, stored-function, cursor]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL"]
updated: 2026-08-03
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">스토어드 개체</div><div class="dc-sub">SQL 문의 묶음을 DB 안에 저장해 두고 이름으로 호출한다</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">CREATE</div><div class="dc-step-d">로직을 정의</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">DB에 저장</div><div class="dc-step-d">재사용 가능</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">CALL / 호출</div><div class="dc-step-d">매개변수 전달</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>세 가지 개체</h2><span class="dc-hint">프로시저 · 함수 · 커서</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">스토어드 프로시저</div>여러 SQL을 묶은 <b>작업 단위</b>. <code>CALL</code>로 실행 <span class="dc-chip">IN/OUT</span></div>
<div class="dc-card"><div class="dc-eyebrow">스토어드 함수</div>값을 <b>RETURN</b>. SELECT 안에서 사용 <span class="dc-chip amber">반환값 1개</span></div>
<div class="dc-card"><div class="dc-eyebrow">커서(Cursor)</div>결과를 <b>행 단위</b>로 하나씩 처리</div>
</div>
<div class="dc-section"><span class="dc-num">2</span><h2>왜 쓰나</h2><span class="dc-hint">재사용 · 성능 · 보안</span></div>
<div class="dc-card"><b>재사용</b> 복잡한 로직을 한 번 만들어 반복 호출 · <b>성능</b> 미리 컴파일 · <b>보안</b> 테이블 직접 접근 대신 프로시저만 허용</div>
<div class="dc-callout">프로시저는 <b>CALL</b>로 실행하고 값을 OUT 매개변수로 돌려준다. 함수는 <b>RETURN</b> 한 개의 값을 돌려주고 SELECT 문 안에서 쓴다.</div>
</div>

# 스토어드 개체

**스토어드 개체(stored object)** 는 SQL 문들의 묶음을 DBMS 안에 저장해 두고 이름으로 불러 쓰는 것이다. [[sql-concepts/sql-programming|SQL 프로그래밍]]의 제어문(IF·CASE·WHILE)이 주로 이 안에서 동작한다.

## 1. 스토어드 프로시저(Stored Procedure)

여러 SQL 문을 하나의 작업 단위로 묶은 것. `CALL`로 실행한다.

```sql
DELIMITER $$
CREATE PROCEDURE add_member(IN p_id CHAR(8), IN p_name VARCHAR(10))
BEGIN
    INSERT INTO member(mem_id, mem_name) VALUES (p_id, p_name);
END $$
DELIMITER ;

CALL add_member('BLK', '블랙핑크');   -- 호출
```

- **매개변수** — `IN`(입력), `OUT`(출력), `INOUT`(입출력).
- 내부에서 IF·CASE·WHILE 같은 제어문과 여러 SQL을 자유롭게 조합.

## 2. 스토어드 함수(Stored Function)

계산 결과인 **하나의 값을 RETURN**한다. `SELECT` 문 안에서 사용할 수 있다.

```sql
DELIMITER $$
CREATE FUNCTION get_age(p_birth DATE) RETURNS INT
BEGIN
    RETURN YEAR(CURDATE()) - YEAR(p_birth);
END $$
DELIMITER ;

SELECT mem_name, get_age(birth_date) FROM member;
```

| | 스토어드 프로시저 | 스토어드 함수 |
|---|-----------------|--------------|
| 실행 | `CALL` | SELECT 등 문장 안에서 호출 |
| 반환 | OUT 매개변수(여러 개 가능) | `RETURN` 값 1개 |
| SQL 내 사용 | 불가 | 가능 |

## 3. 커서(Cursor)

쿼리 결과 집합을 **한 행씩 순회**하며 처리한다. 프로시저 안에서 `DECLARE CURSOR` → `OPEN` → `FETCH`(반복) → `CLOSE` 순으로 사용한다.

## 왜 쓰나

- **재사용성** — 복잡한 로직을 한 번 정의해 반복 호출.
- **성능** — 미리 최적화·컴파일되어 실행이 빠름, 네트워크 트래픽 감소.
- **보안** — 사용자에게 테이블 직접 접근 대신 프로시저 실행 권한만 부여.

## 관련 노트
- [[sql-concepts/sql-programming]] · [[sql-concepts/triggers]]
