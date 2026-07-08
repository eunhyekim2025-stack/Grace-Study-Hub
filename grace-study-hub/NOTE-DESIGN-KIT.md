# Note Design Kit — per-note custom "Diagram view"

Give any note a rich, custom **Diagram view** (like the Negligence note) without
touching the site code. Two rules:

1. Put a `<div class="dc-view"> … </div>` block **at the top of the note's
   markdown**, right after the frontmatter and before the `#` title.
2. Inside it, use the kit classes below (no inline styles needed).

The Text/Diagram toggle then appears **automatically**: *Diagram view* shows your
block, *Text view* shows the plain markdown body. Nothing else to wire up.

> **Markdown gotcha:** raw HTML in a `.md` file must have **no leading indentation
> (< 4 spaces)** and **no blank lines inside the block**, or Markdown turns it
> into a code block. Keep the whole `dc-view` block flush-left with no empty
> lines. (A one-line-per-tag block is safest.)

---

## Minimal example

```html
<div class="dc-view">
<div><div class="dc-title">Negligence</div><div class="dc-sub">Three elements: Duty → Breach → Damage</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Duty of Care</div><div class="dc-step-d">Spandeck 2-stage</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Breach</div><div class="dc-step-d">Reasonable person</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Damage</div><div class="dc-step-d">Causation</div></div>
</div>
<div class="dc-section"><span class="dc-num">1</span><h2>Duty of Care</h2><span class="dc-hint">neighbour principle</span></div>
<div class="dc-card">Singapore — <b>Spandeck 2-Stage Test</b> <span class="dc-chip">Spandeck v DSTA [2007]</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Stage 1 · Proximity</div>Physical, circumstantial, causal proximity.</div>
<div class="dc-card"><div class="dc-eyebrow">Stage 2 · Policy</div>Policy reasons to deny the duty.</div>
</div>
<div class="dc-callout">🇸🇬 Singapore uses a single unified test instead of the 3-stage <i>Caparo</i> test.</div>
</div>
```

Then the note's normal markdown (`# Title`, `## sections`, …) follows below as
the **Text view**.

---

## Class reference

| Class | What it is |
|---|---|
| `dc-view` | The wrapper. Presence of this enables the toggle. |
| `dc-title` / `dc-sub` | Serif page title + muted subtitle. |
| `dc-eyebrow` | Small uppercase blue label. |
| `dc-card` | White bordered rounded card. |
| `dc-section` + `dc-num` + `h2/h3` + `dc-hint` | Numbered section header (blue circle + serif title + optional grey hint). |
| `dc-flow` → `dc-step` (`dc-step-n`, `dc-step-t`, `dc-step-d`) + `dc-arrow` | Horizontal numbered flow with arrows. |
| `dc-cols` / `dc-cols-3` / `dc-cols-4` | Equal-width column grid (stacks on mobile). |
| `dc-callout` (`.warn`, `.ok`) | Tinted left-border callout. Blue / amber / green. |
| `dc-chip` (`.amber`) | Inline pill — e.g. a case citation. |

All colours come from the site theme tokens, so custom views automatically match
light/dark mode and any future palette change.

---

## Workflows to produce a `dc-view` block

- **Claude Design export** — design the note in claude.ai/design, export the
  HTML, drop the main content into a `dc-view` block (convert inline styles to
  the kit classes where you can, or keep them — both work).
- **By hand** — assemble the kit classes above.
- **Ask the assistant** — "build a diagram view for `<note>`" and it composes the
  kit for you.

Legacy `neg-diagram` / `neg-toolbar` classes are still honored (the Negligence
note uses them).
