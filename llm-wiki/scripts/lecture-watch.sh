#!/bin/bash
# lecture-watch.sh — iCloud Lectures 폴더의 새 강의 녹음을 자동 처리(반자동).
#   새 오디오 → scripts/ingest.mjs (ffmpeg → whisper.cpp → 노트 초안) → graph-sync → 알림
# launchd LaunchAgent(WatchPaths)가 폴더 변경 시 이 스크립트를 실행한다.
# 끄기:  launchctl unload ~/Library/LaunchAgents/com.grace.lecture-watch.plist
#
# 왜 ingest.mjs 를 쓰는가 — 예전에는 여기서 직접 ffmpeg·whisper 를 돌리고
# `claude -p --permission-mode acceptEdits` 로 노트를 쓰게 했다. 그건 신뢰할 수 없는
# 전사본을 **파일 편집 권한을 쥔 모델**에게 먹이는 구조였다. 실측 결과 `claude -p` 는
# --disallowed-tools / --allowed-tools "" / --permission-mode 어느 것으로도 격리되지
# 않는다(자세한 내역은 scripts/ingest.mjs 의 provider 주석). ingest.mjs 는 도구를
# 전면 차단하고 도구 사용이 감지되면 결과를 폐기하며, 파일 쓰기·커밋은 모델이 아니라
# 코드가 수행한다. 전사·노트 생성 로직도 한 곳으로 합쳐진다.
set -uo pipefail

REPO="/Users/youngmin/grace-ai"          # 정본 경로 (Desktop 경유 금지 — launchd TCC)
WIKI="$REPO/llm-wiki"
LECT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Lectures"
LOG="$WIKI/scripts/lecture-watch.log"
AUTO_NOTES="${AUTO_NOTES:-1}"            # 0이면 아무것도 하지 않음(파이프라인 정지)
# whisper 의 -l auto 는 세그먼트마다 언어를 재판별해서, 영어 강의를 한국어로 오판하고
# 음차해 버린 전례가 있다(2026-06-24 로그: "in contract로", auto-detected ko p=0.848).
# SMU 수업은 영어이므로 en 을 기본으로 둔다. 한국어 강의면 LECTURE_LANG=ko 로 실행.
LECTURE_LANG="${LECTURE_LANG:-en}"
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

log(){ echo "[$(date '+%F %T')] $*" >> "$LOG"; }
notify(){ osascript -e "display notification \"$1\" with title \"Study Hub\"" 2>/dev/null || true; }

log "── watch triggered ──"
[ "$AUTO_NOTES" = "1" ] || { log "AUTO_NOTES=0 — 중단"; exit 0; }
[ -d "$LECT" ] || { log "Lectures 폴더 없음"; exit 0; }
command -v node >/dev/null || { log "node 없음"; exit 0; }

made=0
shopt -s nullglob nocaseglob
for subjdir in "$LECT"/*/; do
  subject="$(basename "$subjdir")"
  [ "$subject" = ".processed" ] && continue
  mkdir -p "$subjdir/.processed"
  for audio in "$subjdir"*.m4a "$subjdir"*.mp3 "$subjdir"*.wav "$subjdir"*.mp4 "$subjdir"*.mov; do
    [ -e "$audio" ] || continue
    base="$(basename "${audio%.*}")"
    marker="$subjdir/.processed/$base.done"
    [ -f "$marker" ] && continue                      # 이미 처리됨

    brctl download "$audio" 2>/dev/null || true       # iCloud 온라인전용이면 내려받기
    sleep 2
    log "처리 시작: [$subject] $base"

    # --no-commit: 초안이므로 사람이 검수한 뒤 커밋한다(예전 동작과 동일하게 git 은 건드리지 않음).
    # ingest.mjs 가 전사본을 raw/<과목>/lectures/ 에 남기므로 대조 가능.
    if ( cd "$REPO" && node scripts/ingest.mjs "$audio" \
           --subject "$subject" \
           --provider claude-code \
           --language "$LECTURE_LANG" \
           --exercises \
           --no-commit >>"$LOG" 2>&1 ); then
      touch "$marker"
      made=$((made+1))
      notify "[$subject] $base — 노트 초안 생성됨 (검수 필요)"
      log "완료: [$subject] $base"
    else
      log "실패: [$subject] $base — 마커를 남기지 않으므로 다음 트리거에 재시도"
    fi
  done
done

# 그래프·사이트 반영 (노트가 실제로 생겼을 때만)
if [ "$made" -gt 0 ]; then
  cd "$WIKI/graph" && python3 src/sync.py >>"$LOG" 2>&1 && python3 src/analyze.py >>"$LOG" 2>&1 \
    && python3 src/viz.py >>"$LOG" 2>&1 && python3 src/dashboard.py >>"$LOG" 2>&1
  log "graph-sync/analyze 완료 (${made}건)"
fi
log "── watch 종료 ──"
