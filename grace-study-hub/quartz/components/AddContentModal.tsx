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
type Subject = { slug: string; emoji: string; label: string; term?: string }
const SUBJECTS = subjectsData as Subject[]

// Existing semesters (newest first) power the "학기" picker for new subjects.
// Baked in at build time; the newest one is the default for a new subject.
const TERMS = [...new Set(SUBJECTS.map((s) => s.term).filter(Boolean) as string[])].sort((a, b) =>
  b.localeCompare(a, undefined, { numeric: true }),
)
const CURRENT_TERM = TERMS[0] || ""

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

const AddContentModal: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  // The live tag vocabulary (every note's frontmatter tags), baked in at build
  // time. Posted to /api/add so auto-tagging reuses existing tags instead of
  // inventing near-duplicates — the same tags Obsidian and the wiki graph read.
  const knownTags = [
    ...new Set((allFiles ?? []).flatMap((f) => (f.frontmatter?.tags ?? []) as string[])),
  ].sort()
  const knownTagsJSON = JSON.stringify(knownTags).replace(/</g, "\\u003c")
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
          <label class="sh-check">
            <input type="checkbox" id="sh-note-homework" />
            <span>
              <b>📩 숙제노트로 저장</b>
              <small>이 노트를 해당 과목의 <b>Homework</b> 폴더에 저장합니다. 그 과목의 첫 숙제노트면 왼쪽 목차에 "과목 · Homework" 섹션이 자동으로 생겨요.</small>
            </span>
          </label>
          <div class="sh-field">
            <label for="sh-note-tags">태그 (쉼표로 구분)</label>
            <input id="sh-note-tags" class="sh-input" placeholder="예: 개념, 시험대비 — 비워두면 AI가 자동 추가" />
            <small class="sh-hint">비워두거나 몇 개만 적어도 AI가 기존 태그를 재사용해 자동으로 채워줍니다.</small>
          </div>
          <script
            type="application/json"
            id="sh-known-tags"
            dangerouslySetInnerHTML={{ __html: knownTagsJSON }}
          />
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
            {/* Transcripts whose save failed — kept in localStorage, retried here */}
            <div class="sh-drafts" id="sh-rec-drafts" hidden></div>
            <p class="sh-modal-hint">
              긴 강의도 2분 단위로 나눠 자동 전사 후 하나의 노트로 정리해요. 노트는 <b>영어로 생성</b>됩니다
              (한국어로 말해도 영어로 번역·정리). <b>첫 녹음 시</b> 브라우저가 마이크 권한을 물으면
              <b>“허용”</b>을 눌러주세요. Vercel에 <b>GROQ_API_KEY</b>가 설정돼 있어야 합니다.
            </p>
          </div>

          <div class="sh-rec-or">또는</div>

          {/* ④ Attach an image/audio asset that notes embed with ![[...]] */}
          <div class="sh-field">
            <label for="sh-file-input">파일</label>
            <input id="sh-file-input" class="sh-input" type="file" />
          </div>
          <p class="sh-modal-hint">
            <b>🖼 이미지·오디오 첨부</b> — 필기 사진·다이어그램·오디오를 위키에 올려요. 올린 뒤
            뜨는 <code>![[파일명]]</code>을 아무 노트에 붙여넣으면 그 자리에 표시됩니다.
          </p>
          <p class="sh-modal-hint">
            📝 <b>PDF·영상·웹의 AI 자동 노트는 이제 여기서 만들지 않아요.</b> 봇 차단·토큰·용량
            한계로 자주 실패해서, 더 안정적이고 품질 좋은 방식으로 옮겼습니다 —
            <br />
            ① 자료(PDF·녹음·영상 링크)를 <b>Claude에게 직접</b> 주면 dc-view 스타일 노트로 정리해
            바로 배포합니다. ② 또는 내 컴퓨터에서{" "}
            <code>node scripts/ingest.mjs &lt;파일 또는 링크&gt;</code> — 스캔 PDF·필기 사진 OCR,
            긴 강의 전사까지 파일 크기·봇 차단 제한 없이 로컬에서 처리해요.
          </p>
          <div class="sh-modal-actions">
            <button class="sh-btn sh-btn-new" data-add-submit="file">🖼 이미지·오디오 첨부</button>
            <button class="sh-btn sh-btn-ghost" data-add-close>취소</button>
          </div>
        </div>

        <div class="sh-panel" data-panel="subject" hidden>
          <div class="sh-field">
            <label for="sh-subject-name">과목 이름</label>
            <input id="sh-subject-name" class="sh-input" placeholder="예: Machine Learning, 미시경제학" />
          </div>
          <div class="sh-field">
            <label for="sh-subject-term">학기 (Semester)</label>
            <input
              id="sh-subject-term"
              class="sh-input"
              list="sh-term-options"
              value={CURRENT_TERM}
              placeholder="예: 2027 Semester 1"
            />
            <datalist id="sh-term-options">
              {TERMS.map((t) => (
                <option value={t} />
              ))}
            </datalist>
            <p class="sh-modal-hint">
              기존 학기를 고르거나 <b>새 학기</b>를 입력하세요. 형식: <b>YYYY Semester N</b> (예: 2027
              Semester 1) — 이래야 학기순 정렬이 맞아요.
            </p>
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
