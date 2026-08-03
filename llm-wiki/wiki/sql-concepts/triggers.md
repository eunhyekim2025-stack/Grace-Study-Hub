---
title: 트리거(Trigger)
tags: [sql, mysql, trigger, automation, audit-log]
sources: ["[SQL 기초 강의] · 혼자 공부하는 SQL"]
updated: 2026-08-03
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">트리거(Trigger)</div><div class="dc-sub">테이블에 INSERT·UPDATE·DELETE가 일어나면 자동 실행되는 코드</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">이벤트 발생</div><div class="dc-step-d">INSERT/UPDATE/DELETE</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">트리거 작동</div><div class="dc-step-d">BEFORE / AFTER</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">자동 처리</div><div class="dc-step-d">로그·검증·백업</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>작동 시점 × 이벤트</h2><span class="dc-hint">6가지 조합</span></div>
<div class="dc-cols"><div class="dc-card"><div class="dc-eyebrow">BEFORE</div>작업 <b>직전</b> 실행 — 값 검증·보정에 사용</div><div class="dc-card"><div class="dc-eyebrow">AFTER</div>작업 <b>직후</b> 실행 — 로그·백업에 사용</div></div>
<div class="dc-section"><span class="dc-num">2</span><h2>OLD · NEW</h2><span class="dc-hint">변경 전후 값 참조</span></div>
<div class="dc-card"><b>NEW</b> 새로 들어오는 값 (INSERT/UPDATE) · <b>OLD</b> 기존/삭제되는 값 (UPDATE/DELETE)</div>
<div class="dc-callout warn">트리거는 사용자가 직접 호출하지 않는다 — 이벤트가 일어나면 <b>DBMS가 자동으로</b> 실행한다. 남용하면 추적이 어려워지니 목적을 명확히.</div>
</div>

# 트리거(Trigger)

**트리거**는 특정 테이블에 `INSERT`·`UPDATE`·`DELETE` 같은 이벤트가 발생하면 **자동으로 실행되는** SQL 코드다. 사용자가 `CALL`하지 않아도 DBMS가 알아서 작동시킨다.

## 작동 시점과 이벤트

- **시점**: `BEFORE`(작업 직전) / `AFTER`(작업 직후)
- **이벤트**: `INSERT` / `UPDATE` / `DELETE`
- → 조합하면 `AFTER INSERT`, `BEFORE UPDATE` 등 6가지.

## OLD와 NEW

트리거 안에서는 변경 전후의 행을 특수 키워드로 참조한다.

| 키워드 | INSERT | UPDATE | DELETE |
|--------|--------|--------|--------|
| `NEW.열` | 삽입될 값 | 변경 후 값 | — |
| `OLD.열` | — | 변경 전 값 | 삭제될 값 |

## 예시 — 삭제 내역 자동 백업

`member` 테이블에서 행이 삭제되면, 삭제된 데이터를 `member_deleted` 테이블에 자동으로 남긴다.

```sql
DELIMITER $$
CREATE TRIGGER trg_member_delete
    AFTER DELETE
    ON member
    FOR EACH ROW
BEGIN
    INSERT INTO member_deleted(mem_id, mem_name, deleted_at)
    VALUES (OLD.mem_id, OLD.mem_name, NOW());
END $$
DELIMITER ;
```

이제 누가 `DELETE FROM member ...`를 실행하면, 트리거가 자동으로 삭제 기록을 남긴다.

## 활용

- **감사 로그(audit)** — 누가 언제 무엇을 바꿨는지 기록.
- **백업** — 삭제·변경 전 데이터 보존.
- **데이터 검증·보정** — `BEFORE`에서 잘못된 값을 막거나 기본값 채우기.

## 관리

```sql
SHOW TRIGGERS;                      -- 트리거 목록
DROP TRIGGER trg_member_delete;     -- 트리거 삭제
```

> 트리거는 **자동으로 숨어서 동작**하므로, 원인을 모르는 데이터 변화의 범인이 되기 쉽다. 목적과 동작을 문서화해 두는 게 좋다.

## 관련 노트
- [[sql-concepts/stored-objects]] · [[sql-concepts/sql-programming]]
