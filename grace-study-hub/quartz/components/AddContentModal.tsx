// @ts-ignore
import addContentScript from "./scripts/addContent.inline"
// @ts-ignore  — subjects data, single source of truth (kept in sync by /api/add-subject)
import subjectsData from "../../subjects.json"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// In-page "add content" window (replaces the old GitHub redirect). Rendered
// once per page (hidden); the top-bar buttons open it via data-add-open. Saving
// posts to /api/add, which commits into the wiki. See addContent.inline.ts.
// The "과목" picker is driven by subjects.json so it always lists the real,
// current subjects (new ones appear automatically; removed ones drop off).
type Subject = { slug: string; emoji: string; label: string }
const SUBJECTS = subjectsData as Subject[]

const Subjects = ({ id }: { id: string }) => (
  <select id={id} class="sh-input">
    {SUBJECTS.map((s) => (
      <option value={s.slug}>
        {s.emoji} {s.label}
      </option>
    ))}
    <option value="">(미분류)</option>
  </select>
)

const AddContentModal: QuartzComponent = (_: QuartzComponentProps) => {
  return (
    <div id="sh-add-modal" class="sh-modal" hidden>
      <div class="sh-modal-backdrop" data-add-close></div>
      <div class="sh-modal-card" role="dialog" aria-modal="true">
        <div class="sh-modal-tabs">
          <button class="sh-modal-tab active" data-add-tab="note">
            + 새 노트
          </button>
          <button class="sh-modal-tab" data-add-tab="upload">
            🎙 녹음/파일 업로드
          </button>
          <button class="sh-modal-tab" data-add-tab="subject">
            + 새 과목
          </button>
          <button class="sh-modal-x" data-add-close aria-label="닫기">
            ✕
          </button>
        </div>

        <div class="sh-field" id="sh-pw-field">
          <label for="sh-add-pw">추가 비밀번호</label>
          <input id="sh-add-pw" class="sh-input" type="password" placeholder="한 번 입력하면 기억됩니다" />
        </div>

        <div class="sh-panel" data-panel="note">
          <div class="sh-field">
            <label for="sh-note-title">제목</label>
            <input id="sh-note-title" class="sh-input" placeholder="노트 제목" />
          </div>
          <div class="sh-field">
            <label for="sh-note-subject">과목</label>
            <Subjects id="sh-note-subject" />
          </div>
          <div class="sh-field">
            <label for="sh-note-tags">태그 (쉼표로 구분)</label>
            <input id="sh-note-tags" class="sh-input" placeholder="예: 개념, 시험대비" />
          </div>
          <div class="sh-field">
            <label for="sh-note-content">내용</label>
            <textarea id="sh-note-content" class="sh-input" rows={8} placeholder="마크다운으로 작성하거나, NotebookLM 요약을 그대로 붙여넣으세요…"></textarea>
          </div>
          <label class="sh-check">
            <input type="checkbox" id="sh-note-polish" checked />
            <span>
              <b>🪄 NotebookLM 붙여넣기 정리</b>
              <small>붙여넣은 요약을 AI가 사이트 스타일(제목·목록·표·콜아웃)로 다듬어요. 내용은 그대로 두고 형식만 정리합니다.</small>
            </span>
          </label>
          <div class="sh-modal-actions">
            <button class="sh-btn sh-btn-new" data-add-submit="note">노트 저장</button>
            <button class="sh-btn sh-btn-ghost" data-add-close>취소</button>
          </div>
        </div>

        <div class="sh-panel" data-panel="upload" hidden>
          <div class="sh-field">
            <label for="sh-file-subject">과목</label>
            <Subjects id="sh-file-subject" />
          </div>

          {/* ① Record right here — chunked transcription → auto lecture note */}
          <div class="sh-rec">
            <div class="sh-rec-head">🔴 사이트에서 녹음 → 강의 노트 자동 생성</div>
            <div class="sh-field">
              <label for="sh-rec-title">노트 제목</label>
              <input id="sh-rec-title" class="sh-input" placeholder="예: 계약법 3주차 강의" />
            </div>
            <div class="sh-rec-controls">
              <button class="sh-btn sh-btn-rec" data-rec-start>
                🔴 녹음 시작
              </button>
              <button class="sh-btn sh-btn-rec-stop" data-rec-stop hidden>
                ■ 정지 &amp; 노트 생성
              </button>
            </div>
            <div class="sh-rec-status" id="sh-rec-status"></div>
            <p class="sh-modal-hint">
              긴 강의도 2분 단위로 나눠 자동 전사 후 하나의 노트로 정리해요. <b>첫 녹음 시</b> 브라우저가
              마이크 권한을 물으면 <b>“허용”</b>을 눌러주세요. Vercel에 <b>GROQ_API_KEY</b>가 설정돼
              있어야 합니다.
            </p>
          </div>

          <div class="sh-rec-or">또는</div>

          {/* ② Upload an existing file */}
          <div class="sh-field">
            <label for="sh-file-input">파일 업로드</label>
            <input id="sh-file-input" class="sh-input" type="file" />
          </div>
          <p class="sh-modal-hint">PDF · 이미지 · 오디오 파일 등을 그대로 올릴 수 있어요.</p>
          <div class="sh-modal-actions">
            <button class="sh-btn sh-btn-new" data-add-submit="file">업로드</button>
            <button class="sh-btn sh-btn-ghost" data-add-close>취소</button>
          </div>
        </div>

        <div class="sh-panel" data-panel="subject" hidden>
          <div class="sh-field">
            <label for="sh-subject-name">과목 이름</label>
            <input id="sh-subject-name" class="sh-input" placeholder="예: Machine Learning, 미시경제학" />
          </div>
          <p class="sh-subjects-title" style="margin:6px 0 8px;">기본 설정</p>
          <label class="sh-check">
            <input type="checkbox" id="sh-subject-notes" checked />
            <span>
              <b>영어 노트 + 요약 자동 생성</b>
              <small>제목만으로 Claude가 영어 개요 노트와 핵심 요약을 만들어요.</small>
            </span>
          </label>
          <label class="sh-check">
            <input type="checkbox" id="sh-subject-quiz" checked />
            <span>
              <b>개념 이해용 짧은 퀴즈</b>
              <small>핵심 개념을 확인하는 짧은 Q&amp;A 퀴즈를 함께 생성해요.</small>
            </span>
          </label>
          <p class="sh-modal-hint">
            생성 후 폴더 · 허브 페이지가 만들어지고 왼쪽 사이드바에 자동으로 나타나요 (1–2분 뒤 반영).
          </p>
          <div class="sh-modal-actions">
            <button class="sh-btn sh-btn-new" data-add-submit="subject">과목 만들기</button>
            <button class="sh-btn sh-btn-ghost" data-add-close>취소</button>
          </div>
        </div>

        <div class="sh-modal-status" id="sh-add-status"></div>
      </div>
    </div>
  )
}

AddContentModal.afterDOMLoaded = addContentScript

export default (() => AddContentModal) satisfies QuartzComponentConstructor
