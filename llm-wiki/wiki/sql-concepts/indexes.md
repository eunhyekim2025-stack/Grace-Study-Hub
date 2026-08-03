---
title: 인덱스(Index)
tags: [sql, mysql, index, performance, b-tree]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL"]
updated: 2026-08-03
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">인덱스(Index)</div><div class="dc-sub">책의 '찾아보기' — 조회 속도를 극적으로 높이는 데이터 구조</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">문제</div><div class="dc-step-d">전체 테이블 스캔은 느림</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">인덱스 생성</div><div class="dc-step-d">정렬된 B-tree</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">빠른 조회</div><div class="dc-step-d">WHERE·정렬 가속</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>두 종류</h2><span class="dc-hint">클러스터형 vs 보조</span></div>
<div class="dc-cols"><div class="dc-card"><div class="dc-eyebrow">클러스터형</div>테이블을 <b>키 순으로 물리 정렬</b>. 테이블당 1개. PK가 자동 지정 <span class="dc-chip">Primary</span></div><div class="dc-card"><div class="dc-eyebrow">보조(Secondary)</div>별도 구조에 <b>위치 정보</b>만 저장. 여러 개 가능 <span class="dc-chip amber">UNIQUE 등</span></div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>장 · 단점</h2><span class="dc-hint">공짜가 아니다</span></div>
<div class="dc-cols"><div class="dc-callout ok">SELECT·정렬이 빨라진다 (전체 스캔 회피)</div><div class="dc-callout warn">INSERT·UPDATE·DELETE는 느려지고, 저장 공간을 추가로 쓴다</div></div>
<div class="dc-callout">인덱스는 <b>자주 조회하지만 자주 바뀌지 않는</b> 열에 만들 때 효과가 크다.</div>
</div>

# 인덱스(Index)

**인덱스**는 책 뒤의 '찾아보기'와 같다. 데이터를 **정렬된 구조(B-tree)** 로 따로 관리해, 원하는 행을 전체 스캔 없이 빠르게 찾게 한다.

## 왜 필요한가

인덱스가 없으면 DBMS는 조건에 맞는 행을 찾으려고 **테이블 전체를 처음부터 끝까지 훑는다(Full Table Scan)**. 데이터가 많을수록 느려진다. 인덱스가 있으면 정렬된 트리를 타고 내려가 **몇 단계 만에** 위치를 찾는다.

## 두 종류

| 구분 | 클러스터형 인덱스 | 보조 인덱스 |
|------|-----------------|------------|
| 정렬 | 테이블 자체를 키 순으로 **물리적 정렬** | 원본은 그대로, 별도 구조에 위치만 저장 |
| 개수 | 테이블당 **1개** | 여러 개 가능 |
| 생성 | `PRIMARY KEY` 지정 시 자동 | `UNIQUE`/`CREATE INDEX`로 생성 |
| 속도 | 가장 빠름 | 클러스터형보다 한 단계 더 거침 |

## 생성과 삭제

```sql
CREATE INDEX idx_mem_name ON member (mem_name);       -- 보조 인덱스
CREATE UNIQUE INDEX idx_mem_id ON member (mem_id);    -- 중복 방지 + 인덱스
DROP INDEX idx_mem_name ON member;                    -- 삭제

SHOW INDEX FROM member;   -- 인덱스 확인
```

## 장점과 단점

- ✅ **조회(SELECT)·정렬 속도 향상** — 전체 스캔을 피한다.
- ⚠️ **입력·수정·삭제(INSERT/UPDATE/DELETE)가 느려짐** — 인덱스도 함께 갱신해야 하므로.
- ⚠️ **추가 저장 공간** 소모.

> 그러므로 인덱스는 무조건 많이 만들면 안 되고, **조회가 잦고 변경이 드문** 열에 선별적으로 만든다.

## 관련 노트
- [[sql-concepts/tables-and-ddl]] · [[sql-concepts/views]]
