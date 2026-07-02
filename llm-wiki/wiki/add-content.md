---
title: ➕ Add Content
tags: [guide, workflow, moc]
updated: 2026-07-03
kind: 절차
---

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
