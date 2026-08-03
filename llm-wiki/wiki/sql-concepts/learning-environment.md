---
title: 강의 및 학습 환경
tags: [sql, database, mysql, environment]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL"]
updated: 2026-08-03
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">강의 및 학습 환경</div><div class="dc-sub">혼자 공부하는 SQL — DBMS 개념과 MySQL 실습 환경 세팅</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">DBMS 이해</div><div class="dc-step-d">데이터베이스·SQL이 뭔지</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">MySQL 설치</div><div class="dc-step-d">서버 + Workbench</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">샘플 DB</div><div class="dc-step-d">실습용 데이터 적재</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">쿼리 실행</div><div class="dc-step-d">SELECT로 첫 조회</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>핵심 용어</h2><span class="dc-hint">데이터 → DBMS → SQL</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">데이터베이스</div>체계적으로 저장된 데이터의 집합 <span class="dc-chip">DB</span></div>
<div class="dc-card"><div class="dc-eyebrow">DBMS</div>DB를 관리하는 소프트웨어 <span class="dc-chip amber">MySQL</span></div>
<div class="dc-card"><div class="dc-eyebrow">SQL</div>DBMS에 명령하는 표준 언어</div>
</div>
<div class="dc-section"><span class="dc-num">2</span><h2>실습 도구</h2><span class="dc-hint">MySQL 8.x</span></div>
<div class="dc-card"><b>MySQL Server</b> — 실제 데이터를 저장·처리하는 엔진</div>
<div class="dc-card"><b>MySQL Workbench</b> — 쿼리를 작성·실행하는 GUI 클라이언트</div>
<div class="dc-callout">DBMS(서버)와 클라이언트(Workbench)는 별개다. 서버가 켜져 있어야 쿼리가 실행된다.</div>
</div>

# 강의 및 학습 환경

**혼자 공부하는 SQL**의 출발점 — 데이터베이스가 무엇인지 이해하고, MySQL 실습 환경을 갖추는 단계다.

## 왜 데이터베이스인가

- **데이터(data)**: 저장·처리 대상이 되는 값 하나하나.
- **데이터베이스(DB)**: 여러 사용자가 공유하며 사용할 목적으로 **체계적으로 통합·관리**하는 데이터의 집합.
- **DBMS(DataBase Management System)**: 데이터베이스를 관리·운영하는 소프트웨어. MySQL, Oracle, SQL Server, PostgreSQL 등.
- **SQL(Structured Query Language)**: 관계형 DBMS에 명령을 내리는 **표준 언어**. DBMS 종류가 달라도 문법 대부분이 공통이다.

## 관계형 DBMS(RDBMS)의 뼈대

| 용어 | 의미 |
|------|------|
| 테이블(table) | 행과 열로 이루어진 데이터 저장 단위 |
| 열(column) | 테이블의 속성 (예: 이름, 나이) |
| 행(row) | 실제 데이터 한 건 (레코드) |
| 기본 키(PK) | 각 행을 유일하게 구분하는 열 |

## 실습 환경

1. **MySQL Server 설치** — 데이터를 실제로 저장·처리하는 엔진(백그라운드에서 동작).
2. **MySQL Workbench 설치** — 서버에 접속해 SQL을 작성·실행하는 GUI 도구.
3. **접속** — 호스트/포트(기본 3306)/사용자(root)/비밀번호로 서버에 연결.
4. **샘플 데이터베이스** — 교재 제공 스크립트로 실습용 DB·테이블을 생성해 둔다.

> DBMS는 **서버**, Workbench는 **클라이언트**다. 서버가 실행 중이어야 클라이언트에서 쿼리를 보낼 수 있다.

## 첫 SQL

```sql
SHOW DATABASES;          -- 어떤 데이터베이스가 있는지 확인
USE market_db;           -- 사용할 데이터베이스 선택
SELECT * FROM member;    -- member 테이블 전체 조회
```

## 관련 노트
- [[sql-concepts/tables-and-ddl]] · [[sql-concepts/sql-programming]]
