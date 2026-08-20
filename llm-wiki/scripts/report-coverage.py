#!/usr/bin/env python3
"""Compare a subject's textbook outline against its existing wiki notes.

This is an ENRICHMENT-CANDIDATE SELECTOR, not an auto-completion engine.
It reports lexical evidence only, in three grades:

    covered              a note contains the concept phrase, or every
                         distinctive word of it
    candidate            partial overlap — a human must look
    no-lexical-evidence  nothing matched. NOT proof the idea is absent:
                         the notes may cover it under different wording

Every row cites the note files that produced the evidence, so the call is
auditable. Nothing here writes to the wiki.

Usage:
    report-coverage.py <subject> [--name textbook] [--status ...] [--limit N]
                                 [--levels 2,3,4] [--out FILE]
"""
import argparse, json, re, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW, WIKI = ROOT / "raw", ROOT / "wiki"

DEFAULT_NOTES = {
    "fa": ["fa-concepts"], "da": ["da-concepts"], "ops": ["ops-concepts"],
    "law": ["law-concepts", "cases", "statutes"],
    "acct102": ["management-accounting"],
    "ctrw": ["critical-thinking-in-real-world"],
}

# Outline entries that are packaging, not concepts.
BOILERPLATE = re.compile(
    r"^(title page|copyright|dedication|contents|preface|foreword|index|glossary|"
    r"references|list of |table of |about the author|acknowledg|"
    r"summary|key terms?|key ?takeaways?|concept connections|further read|"
    r"practice (problems?|exam)|discussion questions|objective questions|"
    r"solved problems?|review questions|exercises|problems|answers|"
    r"learning objectives?|chapter \d+$|appendix|self-study|"
    r"analytics exercise|case[: ]|suggested reading)", re.I)

STOP = set("""the a an and or of in to for with on at by from as is are be been its it this that
these those we you your their his her not no all any some other more most than then so such into
about over under between within during each per via using use used how what why when where which
who whom part chapter section introduction overview basic basics concept concepts topic topics
principle principles nature scope general common main key one two three four five""".split())


def norm(s: str) -> str:
    """Fold the mojibake that PDF outlines are full of, then lowercase."""
    s = unicodedata.normalize("NFKD", s)
    s = (s.replace("Õ", "'").replace("’", "'").replace("‘", "'")
           .replace("“", '"').replace("”", '"')
           .replace("—", " ").replace("–", " ").replace("−", "-"))
    s = s.lower()
    s = re.sub(r"^\s*(?:\d+[.)]?)+\s*", "", s)          # "2.3 Little's Law"
    s = re.sub(r"^\s*(?:ch(?:apter)?|pt|part|sec(?:tion)?|appendix)\s*"
               r"\d*[a-z]?\s*[:.\-]?\s*", "", s)        # "Ch 10: Glossary"
    s = re.sub(r"^\s*(?:\d+[.)]?)+\s*", "", s)          # numbering after the prefix
    s = re.sub(r"[^\w\s'-]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def tokens(phrase: str):
    return [t for t in re.split(r"[\s'-]+", phrase) if len(t) >= 3 and t not in STOP]


def load_profile(subject: str) -> dict:
    p = RAW / subject / "profile.yml"
    if not p.exists():
        return {}
    try:
        import yaml
        return yaml.safe_load(p.read_text(encoding="utf-8")) or {}
    except Exception as e:                                   # pragma: no cover
        print(f"! ignoring {p}: {e}", file=sys.stderr)
        return {}


def load_notes(dirs):
    notes = {}
    for d in dirs:
        base = WIKI / d
        if not base.exists():
            print(f"! no such note folder: {base}", file=sys.stderr)
            continue
        for f in sorted(base.rglob("*.md")):
            notes[str(f.relative_to(WIKI))] = norm(f.read_text(encoding="utf-8"))
    return notes


def load_slides(subject: str):
    """Concatenated text of any index built with --kind slides."""
    idx = RAW / ".index" / subject
    blob = []
    for meta in sorted(idx.glob("*.meta.json")) if idx.exists() else []:
        if json.loads(meta.read_text()).get("kind") != "slides":
            continue
        jl = meta.with_name(meta.name.replace(".meta.json", ".pages.jsonl"))
        if jl.exists():
            blob += [json.loads(l)["text"] for l in jl.open(encoding="utf-8")]
    return norm(" ".join(blob)) if blob else None


def has_word(hay: str, word: str) -> bool:
    return re.search(rf"\b{re.escape(word)}\b", hay) is not None


def has_phrase(hay: str, phrase: str) -> bool:
    """Phrase match that tolerates whitespace/punctuation between the words."""
    parts = [re.escape(w) for w in phrase.split()]
    return re.search(r"\b" + r"[\s\-'/,:;()]+".join(parts) + r"\b", hay) is not None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("subject")
    ap.add_argument("--name", default="textbook")
    ap.add_argument("--levels", default="", help="outline levels to treat as concepts, e.g. 3,4")
    ap.add_argument("--status", default="", help="filter, e.g. no-lexical-evidence,candidate")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--out")
    a = ap.parse_args()

    idx = RAW / ".index" / a.subject
    toc_f, meta_f = idx / f"{a.name}.toc.json", idx / f"{a.name}.meta.json"
    if not toc_f.exists():
        sys.exit(f"✗ no index at {toc_f}\n  run: index-textbook.py {a.subject}")
    toc = json.loads(toc_f.read_text(encoding="utf-8"))
    meta = json.loads(meta_f.read_text(encoding="utf-8")) if meta_f.exists() else {}
    offset = meta.get("printed_page_offset")

    prof = load_profile(a.subject)
    dirs = prof.get("notes_dirs") or DEFAULT_NOTES.get(a.subject) or [f"{a.subject}-concepts"]
    aliases = {norm(k): v for k, v in (prof.get("aliases") or {}).items()}
    extra_skip = [re.compile(p, re.I) for p in (prof.get("skip_sections") or [])]

    notes = load_notes(dirs)
    if not notes:
        sys.exit(f"✗ no notes found in {dirs}")
    slides = load_slides(a.subject)

    levels = {int(x) for x in a.levels.split(",") if x.strip()} if a.levels else None
    if levels is None:                       # default: skip the coarsest level
        seen = sorted({e["level"] for e in toc})
        levels = set(seen[1:]) if len(seen) > 1 else set(seen)

    # Distinctiveness: a word in most notes carries no signal.
    df = {}
    for body in notes.values():
        for w in set(re.findall(r"[a-z][a-z'-]{2,}", body)):
            df[w] = df.get(w, 0) + 1
    common = {w for w, c in df.items() if c > 0.6 * len(notes)}

    rows, counts = [], {"covered": 0, "candidate": 0, "no-lexical-evidence": 0}
    for i, e in enumerate(toc):
        title = e["title"].strip()
        if e["level"] not in levels:
            continue
        phrase = norm(title)
        if not phrase or BOILERPLATE.match(phrase) or any(r.search(title) for r in extra_skip):
            continue
        toks = tokens(phrase)
        for alias in aliases.get(phrase, []):
            toks += tokens(norm(alias))
        toks = list(dict.fromkeys(toks))
        if not toks:
            continue
        distinctive = [t for t in toks if t not in common] or toks

        # Only the literal phrase earns "covered". Requiring merely that every
        # word appears somewhere in a note marks "Accounts Payable" as covered
        # by a note that says "accounts" and "bonds payable" in two different
        # paragraphs — a false positive that hides a real gap.
        best, evidence = "no-lexical-evidence", []
        for path, body in notes.items():
            if has_phrase(body, phrase):
                status = "covered"
            else:
                hit = sum(has_word(body, t) for t in distinctive)
                status = "candidate" if hit and hit >= len(distinctive) / 2 else None
            if status:
                evidence.append(path)
                if status == "covered":
                    best = "covered"
                elif best != "covered":
                    best = "candidate"
        counts[best] += 1

        nxt = next((toc[j]["page"] for j in range(i + 1, len(toc))
                    if toc[j]["level"] <= e["level"]), None)
        pdf_rng = f"{e['page']}" + (f"–{nxt - 1}" if nxt and nxt - 1 > e["page"] else "")
        printed = f"{e['page'] - offset}" if offset is not None else "?"

        scope = "—"
        if slides is not None:
            scope = "in-syllabus" if (phrase in slides or
                                      all(has_word(slides, t) for t in distinctive)) else "not-in-slides"
        elif slides is None:
            scope = "scope-unknown"

        rows.append({"status": best, "concept": title, "pdf": pdf_rng,
                     "printed": printed, "scope": scope,
                     "evidence": sorted(set(evidence))[:3]})

    order = {"no-lexical-evidence": 0, "candidate": 1, "covered": 2}
    rows.sort(key=lambda r: (order[r["status"]], r["concept"].lower()))
    if a.status:
        keep = {s.strip() for s in a.status.split(",")}
        rows = [r for r in rows if r["status"] in keep]
    if a.limit:
        rows = rows[:a.limit]

    L = [f"# Textbook coverage — {a.subject} ({a.name})", "",
         f"- source: `{meta.get('source','?')}` · {meta.get('pages','?')} pages · "
         f"indexed {meta.get('indexed','?')}",
         f"- notes compared: **{len(notes)}** files in {', '.join(dirs)}",
         f"- printed page = pdf page − {offset}" if offset is not None
         else "- printed-page offset unknown; pages below are PDF pages",
         f"- **{counts['covered']} covered · {counts['candidate']} candidate · "
         f"{counts['no-lexical-evidence']} no-lexical-evidence**", ""]
    for w in meta.get("warnings", []):
        L.append(f"> ! {w}")
    total = sum(counts.values())
    if total and meta.get("pages") and meta["pages"] / total > 20:
        L.append(f"> ! outline is chapter-level only ({total} concepts across "
                 f"{meta['pages']} pages) — coverage here is coarse; add a "
                 f"hand-written concept list to raw/{a.subject}/profile.yml")
    L += ["", "> `no-lexical-evidence` means no word overlap was found — it is a place to *look*,",
          "> not proof the notes lack the idea. Verify against the real PDF pages before writing.", "",
          "| Status | Concept | PDF p. | Printed p. | Scope | Evidence |",
          "|---|---|---|---|---|---|"]
    for r in rows:
        ev = "<br>".join(f"`{p}`" for p in r["evidence"]) or "—"
        L.append(f"| {r['status']} | {r['concept']} | {r['pdf']} | {r['printed']} | {r['scope']} | {ev} |")

    text = "\n".join(L)
    if a.out:
        Path(a.out).write_text(text, encoding="utf-8")
        print(f"✓ {Path(a.out)}  ({len(rows)} rows)")
    else:
        print(text)


if __name__ == "__main__":
    main()
