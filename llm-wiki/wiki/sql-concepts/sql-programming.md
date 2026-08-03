---
title: SQL 프로그래밍
tags: [sql, mysql, programming, control-flow, stored-procedure]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL"]
updated: 2026-08-03
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">SQL 프로그래밍</div><div class="dc-sub">스토어드 프로시저 안에서 조건·반복으로 로직을 제어한다</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">변수</div><div class="dc-step-d">DECLARE · SET</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">조건</div><div class="dc-step-d">IF · CASE</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">반복</div><div class="dc-step-d">WHILE</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">동적 SQL</div><div class="dc-step-d">PREPARE · EXECUTE</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>조건문</h2><span class="dc-hint">분기 처리</span></div>
<div class="dc-cols"><div class="dc-card"><div class="dc-eyebrow">IF</div>참/거짓 <b>두 갈래</b> 분기. <code>IF 조건 THEN … ELSE … END IF</code> <span class="dc-chip">True / False</span></div><div class="dc-card"><div class="dc-eyebrow">CASE</div><b>여러 갈래</b> 다중 분기. 값·범위별로 결과 지정 <span class="dc-chip amber">다중 조건</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>반복문</h2><span class="dc-hint">WHILE</span></div>
<div class="dc-card"><b>WHILE 조건 DO … END WHILE</b> — 조건이 참인 동안 반복. <code>ITERATE</code>(계속)·<code>LEAVE</code>(탈출)로 제어</div>
<div class="dc-callout warn">제어문(IF·CASE·WHILE)은 대부분 <b>스토어드 프로시저/함수 내부</b>에서 사용된다 — 일반 SELECT 문에는 쓰지 않는다.</div>
</div>

# SQL 프로그래밍

SQL도 일반 프로그래밍 언어처럼 **변수·조건·반복**으로 로직을 제어할 수 있다. 이런 제어문은 주로 **스토어드 프로시저(stored procedure)** 내부에서 구현된다.

## 변수

```sql
DECLARE myVar INT;      -- 변수 선언 (프로시저 안)
SET myVar = 100;        -- 값 대입
SET @sessionVar = 'A';  -- @ 붙이면 세션 변수 (선언 없이 바로 사용)
```

## 1. IF문 — 참/거짓 두 갈래 분기

가장 기본적인 조건문. 조건이 **참(True)인지 거짓(False)인지**에 따라 실행 여부를 결정한다.

```sql
IF 조건식 THEN
    -- 참일 때 실행
ELSE
    -- 거짓일 때 실행
END IF;
```

- `IF … THEN … END IF`: 조건이 참일 때만 내부 문장 실행.
- `IF … ELSE`: 참일 때와 거짓일 때 실행할 문장을 각각 다르게 지정 → **두 경로로 분기**.

## 2. CASE문 — 여러 갈래 다중 분기

조건이 셋 이상일 때 IF를 여러 번 겹치는 대신 **CASE**로 다중 분기한다.

```sql
CASE
    WHEN 점수 >= 90 THEN SET 학점 = 'A';
    WHEN 점수 >= 80 THEN SET 학점 = 'B';
    ELSE SET 학점 = 'F';
END CASE;
```

## 3. WHILE문 — 반복

```sql
WHILE 조건식 DO
    -- 반복 실행
END WHILE;
```

- `ITERATE`: 반복의 처음으로 돌아감(continue).
- `LEAVE`: 반복을 빠져나감(break).

## 4. 동적 SQL

쿼리 문자열을 실행 시점에 조립해 실행한다.

```sql
PREPARE myQuery FROM 'SELECT * FROM member WHERE mem_id = ?';
EXECUTE myQuery USING @id;
DEALLOCATE PREPARE myQuery;
```

## 관련 노트
- [[sql-concepts/stored-objects]] · [[sql-concepts/triggers]]
