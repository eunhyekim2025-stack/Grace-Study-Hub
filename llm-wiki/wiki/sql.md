---
title: 🗄 SQL
tags: [sql, moc, index]
updated: 2026-08-04
kind: 주제
---

# 🗄 SQL

> [[index|← 과목 선택]] · 혼자 공부하는 SQL (MySQL) + SQLBolt — **학습 환경 → 데이터 정의 → 쿼리 → 프로그래밍 → 고급 개체**

## 수업 내용 — 개념 (sql-concepts/)
> [SQL 기초 강의] · *혼자 공부하는 SQL* 마인드맵 7개 가지(아래) + **[SQLBolt 쿼리 2개](#쿼리-sqlbolt-보강)** = 총 9개 노트.

| # | 주제 | 페이지 |
|---|------|--------|
| 1 | 강의 및 학습 환경 | [[sql-concepts/learning-environment]] — DBMS 개념 · MySQL/Workbench 세팅 |
| 2 | SQL 프로그래밍 | [[sql-concepts/sql-programming]] — 변수 · IF/CASE · WHILE · 동적 SQL |
| 3 | 테이블 정의 · 데이터 조작 | [[sql-concepts/tables-and-ddl]] — DDL(CREATE/ALTER/DROP) + DML(INSERT/UPDATE/DELETE) |
| 4 | 가상 테이블: 뷰(View) | [[sql-concepts/views]] — SELECT에 이름 붙인 가상 테이블 |
| 5 | 인덱스(Index) | [[sql-concepts/indexes]] — 클러스터형 vs 보조 · B-tree |
| 6 | 스토어드 개체 | [[sql-concepts/stored-objects]] — 프로시저 · 함수 · 커서 |
| 7 | 트리거(Trigger) | [[sql-concepts/triggers]] — 이벤트 자동 실행 · OLD/NEW |

## 쿼리 (SQLBolt 보강)
> SQLBolt의 조회(쿼리) 부분을 주제별로 정리. 기존 노트에 없던 SELECT·JOIN·집계를 채운다.

| 주제 | 페이지 |
|------|--------|
| 쿼리 기초 | [[sql-concepts/queries-basics]] — SELECT · WHERE(연산자·LIKE) · 정렬(ORDER BY·LIMIT) · 표현식/AS |
| JOIN과 집계 | [[sql-concepts/joins-and-aggregates]] — INNER/OUTER JOIN · NULL · GROUP BY 집계 · HAVING · 실행 순서 |
