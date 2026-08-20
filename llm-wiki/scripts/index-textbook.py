#!/usr/bin/env python3
"""Index a source PDF (textbook or slide deck) so notes can be enriched from it.

Produces, under llm-wiki/raw/.index/<subject>/ (never deployed — raw/ is
excluded by the repo's allowlist .gitignore):

    <name>.pages.jsonl   one row per page: {page, printed, chars, text}
    <name>.toc.json      outline entries: {title, level, page}
    <name>.meta.json     sha256, page count, printed-page offset, warnings

The extracted text is for SEARCH ONLY. PDF text layers mangle tables,
figures, equations and two-column layouts, so always re-read the real pages
with a PDF reader before writing anything into a note.

Usage:
    index-textbook.py <subject> [pdf_path] [--as NAME] [--kind textbook|slides]

With no pdf_path it looks for raw/<subject>/Textbook.pdf.
"""
import argparse, hashlib, json, re, sys
from collections import Counter
from datetime import date
from pathlib import Path

RAW = Path(__file__).resolve().parent.parent / "raw"

# A source has to actually contain the book. Both "textbook" PDFs handed over
# on 2026-08-19 were cover + table of contents only, and silently indexing
# those would have produced a confident, empty coverage report.
THRESHOLDS = {
    #            min chars on a "body" page, min body pages, min body fraction
    "textbook": (400, 50, 0.50),
    "slides":   (80,  10, 0.30),
}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def extract(path: Path):
    """Return (list_of_page_texts, toc_entries). Prefers PyMuPDF."""
    try:
        import pymupdf  # type: ignore
    except ImportError:
        import fitz as pymupdf  # type: ignore
    doc = pymupdf.open(path)
    pages = [p.get_text() or "" for p in doc]
    toc = [{"level": lvl, "title": title.strip(), "page": pg}
           for lvl, title, pg in (doc.get_toc() or [])]
    doc.close()
    return pages, toc


PAGENUM_RE = re.compile(r"^\s*(?:page\s+)?(\d{1,4})\s*$", re.I)


def printed_offset(pages):
    """Guess `pdf_page - printed_page`. Textbook page 23 is rarely PDF page 23,
    and a coverage report that cites the wrong number is worse than useless."""
    deltas = Counter()
    for i, text in enumerate(pages, start=1):
        lines = [l for l in (text or "").splitlines() if l.strip()]
        for line in lines[:2] + lines[-3:]:
            m = PAGENUM_RE.match(line)
            if not m:
                continue
            printed = int(m.group(1))
            if 0 < printed <= i:          # printed number can't exceed pdf page
                deltas[i - printed] += 1
    if not deltas:
        return None, 0.0
    offset, hits = deltas.most_common(1)[0]
    return offset, round(min(hits / max(len(pages), 1), 1.0), 3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("subject")
    ap.add_argument("pdf", nargs="?")
    ap.add_argument("--as", dest="name", help="index name (default: file stem)")
    ap.add_argument("--kind", choices=sorted(THRESHOLDS), default="textbook")
    ap.add_argument("--force", action="store_true",
                    help="index even if the body-text guard rejects it")
    a = ap.parse_args()

    pdf = Path(a.pdf) if a.pdf else RAW / a.subject / "Textbook.pdf"
    if not pdf.exists():
        sys.exit(f"✗ not found: {pdf}\n  put the source in raw/{a.subject}/ first "
                 f"(raw/ is gitignored, so it never reaches the public site)")

    name = a.name or ("textbook" if a.kind == "textbook" else pdf.stem)
    out = RAW / ".index" / a.subject

    print(f"reading {pdf} …")
    pages, toc = extract(pdf)
    n = len(pages)

    min_chars, min_pages, min_frac = THRESHOLDS[a.kind]
    body = [i for i, t in enumerate(pages) if len(t.strip()) >= min_chars]
    frac = len(body) / n if n else 0.0
    total_chars = sum(len(t) for t in pages)

    warnings = []
    if total_chars < 1000:
        warnings.append("no text layer at all — this looks like a scan; OCR it first")
    if len(body) < min_pages or frac < min_frac:
        warnings.append(
            f"only {len(body)}/{n} pages ({frac:.0%}) carry body text — "
            f"this looks like front matter / a preview, not the {a.kind}")
    if not toc:
        warnings.append("no PDF outline; coverage will need a hand-written concept list")

    fatal = [w for w in warnings if "front matter" in w or "no text layer" in w]
    if fatal and not a.force:
        print("\n✗ refusing to index:")
        for w in fatal:
            print(f"    {w}")
        print("  → supply the full-text PDF, or re-run with --force if you know better.")
        sys.exit(2)

    offset, conf = printed_offset(pages)

    # Only now — a refused index must leave no directory behind, or the empty
    # folder later reads as "this subject is indexed".
    out.mkdir(parents=True, exist_ok=True)

    with (out / f"{name}.pages.jsonl").open("w", encoding="utf-8") as fh:
        for i, t in enumerate(pages, start=1):
            row = {"page": i, "chars": len(t), "text": t}
            if offset is not None:
                row["printed"] = i - offset
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")

    (out / f"{name}.toc.json").write_text(
        json.dumps(toc, ensure_ascii=False, indent=1), encoding="utf-8")

    meta = {
        "subject": a.subject, "name": name, "kind": a.kind,
        "source": str(pdf.relative_to(RAW.parent)), "sha256": sha256(pdf),
        "pages": n, "body_pages": len(body), "body_fraction": round(frac, 3),
        "toc_entries": len(toc),
        "printed_page_offset": offset, "offset_confidence": conf,
        "indexed": date.today().isoformat(), "warnings": warnings,
    }
    (out / f"{name}.meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"✓ {n} pages · {len(body)} with body text · {len(toc)} outline entries")
    if offset is not None:
        print(f"  printed-page offset ≈ {offset} (pdf page − {offset} = printed page), "
              f"confidence {conf:.0%}")
    for w in warnings:
        print(f"  ! {w}")
    print(f"  → {out}/{name}.*")


if __name__ == "__main__":
    main()
