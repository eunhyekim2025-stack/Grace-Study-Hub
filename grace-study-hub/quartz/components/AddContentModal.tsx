// @ts-ignore
import addContentScript from "./scripts/addContent.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// In-page "add content" window (replaces the old GitHub redirect). Rendered
// once per page (hidden); the top-bar buttons open it via data-add-open. Saving
// posts to /api/add, which commits into the wiki. See addContent.inline.ts.
const SUBJECT_OPTIONS: [string, string][] = [
  ["business-law", "⚖️ Business Law"],
  ["decision-analysis", "📊 Decision Analysis"],
  ["financial-accounting", "💰 Financial Accounting"],
  ["operations-management", "⚙️ Operations Management"],
  ["cross-domain", "🔗 Cross-Domain"],
  ["ai-foresight", "🤖 AI · Foresight"],
  ["", "(미분류)"],
]

const Subjects = ({ id }: { id: string }) => (
  <select id={id} class="sh-input">
    {SUBJECT_OPTIONS.map(([v, label]) => (
      <option value={v}>{label}</option>
    ))}
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
          <button class="sh-modal-x" data-add-close aria-label="닫기">
            ✕
          </button>
        </div>

        <div class="sh-field">
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
            <textarea id="sh-note-content" class="sh-input" rows={8} placeholder="마크다운으로 작성하세요…"></textarea>
          </div>
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
          <div class="sh-field">
            <label for="sh-file-input">파일</label>
            <input id="sh-file-input" class="sh-input" type="file" />
          </div>
          <p class="sh-modal-hint">
            PDF · 이미지 · 오디오 파일 등을 올릴 수 있어요. 오디오 <b>자동 전사</b>는 기존 iCloud
            파이프라인을 사용하세요.
          </p>
          <div class="sh-modal-actions">
            <button class="sh-btn sh-btn-new" data-add-submit="file">업로드</button>
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
