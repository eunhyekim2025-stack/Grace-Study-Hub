---
title: ➕ Add Content
tags: [guide, workflow, moc]
updated: 2026-07-03
kind: 절차
pagerank: 0.0018
betweenness: 0.0000
eigenvector: 0.0133
degree: 4
community: 1
---

<div class="dc-view"><div class="dc-title">Add Content</div><div class="dc-sub">Grow the hub by adding recordings, notes, or files through GitHub or the recording pipeline</div><div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Add a recording</div><div class="dc-step-d">Save recording to iCloud Drive, transcribed and drafted into a note automatically</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Add a note or upload files</div><div class="dc-step-d">Use GitHub's web editor to create a new note or upload files</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Add a new subject</div><div class="dc-step-d">Create a new folder, hub page, and home-menu row for the subject</div></div></div><div class="dc-section"><span class="dc-num">1</span><h2>Recordings</h2><span class="dc-hint">Automatic transcription and drafting</span></div><div class="dc-cols-3"><div class="dc-card"><b>Save recording</b> to iCloud Drive <span class="dc-chip">.m4a/.mp3/.wav/.mp4</span></div><div class="dc-card"><b>Transcription</b> and drafting <span class="dc-chip">Whisper pipeline</span></div><div class="dc-card"><b>Review draft</b> and flow into wiki <span class="dc-chip">[!todo] review needed</span></div></div><div class="dc-section"><span class="dc-num">2</span><h2>Notes and Files</h2><span class="dc-hint">Use GitHub's web editor</span></div><div class="dc-cols-3"><div class="dc-card"><b>Create new note</b> <span class="dc-chip">GitHub web editor</span></div><div class="dc-card"><b>Upload files</b> <span class="dc-chip">PDF/image/doc</span></div><div class="dc-card"><b>Commit changes</b> for site update <span class="dc-chip">automatic redeploy</span></div></div><div class="dc-section"><span class="dc-num">3</span><h2>New Subject</h2><span class="dc-hint">Create folder, hub page, and home-menu row</span></div><div class="dc-cols-3"><div class="dc-card"><b>Quick way</b> create first note in new folder <span class="dc-chip">new-subject-concepts/</span></div><div class="dc-card"><b>Full setup</b> ask assistant to run <span class="dc-chip">/add-subject <name></span></div><div class="dc-card"><b>Proper tile</b> on home page with hub <span class="dc-chip">full setup recommended</span></div></div><div class="dc-callout">Always commit changes for automatic site redeploy</div></div>


# ➕ Add Content

> [[index|← Subjects]] · One place to grow the hub — **add a recording, a new subject, or files.**
> Everything here goes through GitHub or the recording pipeline, then the site **redeploys itself**
> (about 1–2 minutes) — no manual build needed.

---

## 🎙️ Add a recording (lecture audio → note)

Recordings are transcribed and drafted into notes **automatically** by the built-in pipeline —
you don't upload audio to the website itself.

1. On your phone or Mac, save the recording (`.m4a` / `.mp3` / `.wav` / `.mp4`) into iCloud Drive:
   `iCloud Drive ▸ Lectures ▸ <subject>/`
   (e.g. `Lectures/business-law/`).
2. iCloud syncs it to your Mac → the watcher transcribes it with Whisper and drafts a note
   marked `> [!todo] 검수 필요` (review needed).
3. Review the draft, then it flows into the wiki like any other note.

> [!note] Why not a website upload button?
> Transcription needs a computer to do real processing. The iCloud folder **is** your upload
> button — drop the file there and the note appears. A public web upload would need a paid
> backend + login; this pipeline already does the job for free.

---

## 📄 Add a note or 📁 upload files

For text notes, PDFs, images, or any file — use GitHub's web editor. These buttons open the
right page already pointed at the wiki folder. After you commit, the site updates on its own.

- **➡️ [Create a new note](https://github.com/eunhyekim2025-stack/Grace-Study-Hub/new/main?filename=llm-wiki/wiki/new-note.md)**
  — opens a blank Markdown file. Rename it, type your note, click **Commit changes**.
- **➡️ [Upload files (PDF / image / doc)](https://github.com/eunhyekim2025-stack/Grace-Study-Hub/upload/main/llm-wiki/wiki)**
  — drag files in, click **Commit changes**.

> [!tip] Where things live
> Subject notes go in that subject's folder, e.g. `law-concepts/`, `da-concepts/`, `fa-concepts/`.
> Put a file in the matching folder so it shows up under the right subject.

---

## 🆕 Add a new subject (class)

A subject is more than one file — it needs a folder, a hub page, a home-menu row, and an
explorer group so it sorts and searches correctly.

- **Quick way:** **[create the first note in a new folder](https://github.com/eunhyekim2025-stack/Grace-Study-Hub/new/main?filename=llm-wiki/wiki/new-subject-concepts/overview.md)**
  — name the folder `<subject>-concepts/` (e.g. `economics-concepts/overview.md`).
- **Full setup (recommended):** ask the assistant to run **`/add-subject <name>`** — it scaffolds
  the folder, subject hub page, home-menu row, and explorer group all at once, consistently.

> [!note]
> The quick way gets a note online fast; the full setup makes the subject appear as a proper
> tile on the home page with its own hub. For a clean new class, prefer the full setup.

---

*Related:* [[index]] · [[overview]] · [[about-me]]
