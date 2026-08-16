---
title: "Ch8 — Categorical Logic"
tags: [critical-thinking-in-real-world, ctrw-textbook, categorical-logic, square-of-opposition, venn-diagram, syllogism, mood-figure]
sources: ["Mooney, Williams & Burik, An Introduction to Critical and Creative Thinking (McGraw-Hill, 2015) — Ch.8 Categorical Logic"]
updated: 2026-08-16
kind: 절차
---

<div class="dc-view">
<div><div class="dc-title">Categorical Logic</div><div class="dc-sub">A decision procedure for class reasoning — put it in standard form, then a Venn diagram settles validity for certain</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Standard form</div><div class="dc-step-d">A · E · I · O propositions</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Square / twiddle</div><div class="dc-step-d">relations + equivalences</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Syllogism</div><div class="dc-step-d">mood + figure, S/P/M terms</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Venn test</div><div class="dc-step-d">shade, X, read validity</div></div>
</div>
<div class="dc-section"><span class="dc-num">★</span><h2>The four standard forms</h2><span class="dc-hint">quantity × quality</span></div>
<div class="dc-cols-2">
<div class="dc-card"><div class="dc-eyebrow">Universal</div><b>A</b> = All S are P (affirmative) · <b>E</b> = No S are P (negative)</div>
<div class="dc-card"><div class="dc-eyebrow">Particular</div><b>I</b> = Some S are P (affirmative) · <b>O</b> = Some S are not P (negative)</div>
</div>
<div class="dc-callout">Every proposition = <b>quantifier + subject term + copula (are / are not) + predicate term</b>. "Some" means <b>at least one</b> (it does <i>not</i> imply "some are not"). A/I from Latin <i>Affirmo</i>, E/O from <i>nEgO</i>.</div>
</div>

# Ch8 — Categorical Logic

> [[index|← Critical Thinking in Real World]] · Textbook Ch.8. The rigorous decision procedure that [[ctrw-ch05-forms-of-argument|Ch5]] deferred. (Takes the *Aristotelian* view: universal claims carry **existential import** — "All of John's children are talented" implies John *has* children.) Exercises **8.1–8.5** (private answer key held for feedback).

---

## The square of opposition — relations between A, E, I, O
(For propositions with the **same** subject and predicate terms.)

| Relation | Pair | Rule |
|---|---|---|
| **Contradictories** (diagonals) | A↔O, E↔I | **always opposite** truth values — exactly one is true |
| **Contraries** (top) | A↔E | can't **both be true**; can both be false |
| **Subcontraries** (bottom) | I↔O | can't **both be false**; can both be true |
| **Subalternates** (sides) | A→I, E→O | **truth flows down, falsity rises up** |

From one truth value you can often fill in the rest — but not always (e.g. from "E is false" you get "I is true," then stall).

## Immediate inferences & the three "twiddling" operations
An **immediate inference** goes from *one* premise to a conclusion. Beyond the square, three transformations produce **logically equivalent** propositions:

| Operation | What you do | Preserves meaning for |
|---|---|---|
| **Conversion** | swap S and P | **E, I** only |
| **Obversion** | change the quality **and** replace P with its complement (non-P) | **all four** (A, E, I, O) |
| **Contraposition** | swap S↔P **and** negate both terms | **A, O** only |

Chaining these lets you test inferences whose premise and conclusion don't share the same terms (e.g. "All non-H are non-F ∴ All F are H" — valid, shown by twiddling into a common term, then the square).

## The syllogism and its parts
A **categorical syllogism** = two premises + conclusion, exactly **three terms** each used twice:

- **Major term (P)** = predicate of the conclusion; its premise = the **major premise**.
- **Minor term (S)** = subject of the conclusion; its premise = the **minor premise**.
- **Middle term (M)** = in both premises, not the conclusion — the *conceptual bridge*.

**Standard form:** three terms, each twice, **major premise first**. Then name it by:
- **Mood** — the three proposition types in order, e.g. **AAA**, **EIO**.
- **Figure** — the pattern of the middle term (4 figures). Combined: **AAA-1**, **EIO-2**, etc.

```
Figure 1   Figure 2   Figure 3   Figure 4
  M–P        P–M        M–P        P–M
  S–M        S–M        M–S        M–S
  ─────      ─────      ─────      ─────
  S–P        S–P        S–P        S–P
```

## The Venn-diagram test (the payoff)
Three overlapping circles — **S** bottom-left, **P** bottom-right, **M** on top — giving 8 regions. **Only diagram the premises**; the argument is **valid iff everything needed to draw the conclusion is already present** in the premise diagram. All shading/X-ing is done *from the subject's circle*.

**Step 1 — shade (universals first).** For **A/E**, shade the region the premise says is *empty* (A "All S are P" → shade the S-part outside P; E "No S are P" → shade the S∩P overlap).

**Step 2 — enter X's (particulars).** For **I/O**, place an **X** for the "at least one." If the premises don't fix which region, the X **straddles the line** between two; never put an X in a shaded region; never a more definite claim than the premises license.

**Read validity:** if the conclusion's picture is already there → **valid**; if something's missing → **invalid**. A leftover **X sitting on a line → invalid** (the conclusion only *might* be true, and validity is all-or-nothing).

**Step 3 — only when the conclusion is I or O and steps 1–2 didn't already show validity.** Because universals carry existential import, ensure **every circle contains an X**. When you have a *choice* of where to place or move an X, deliberately **pick the region that makes the argument invalid** — if you can make it break, it's invalid (valid arguments never break).

> This method recognises **24 valid standard forms** (e.g. AAA-1, EAE-1, AII-3, EIO in every figure, plus the strengthened AAI/EAO forms from existential import).

## Translating ordinary language into standard form (§8.10)
Most real sentences aren't already A/E/I/O — rewrite them, guided by the [[ctrw-ch05-forms-of-argument|equivalences]]:
- "**If it's a cat, then it's a mammal**" → **All** cats are mammals.
- "**Only** members may enter" → **All** who may enter are members.
- Add a copula and a noun-phrase predicate: "All Englishmen like soccer" → "All Englishmen **are** people who like soccer."

## Key takeaways
- Put every claim in **standard form** (quantifier + S + *are/are not* + P); "some" = at least one.
- The **square** (contradictories/contraries/subcontraries/subalternates) + **twiddling** (conversion E/I, obversion all, contraposition A/O) settle **immediate** inferences.
- Name a syllogism by **mood + figure**; test it with the **Venn method** — shade universals, X the particulars, and read whether the conclusion is already drawn.
- **X on a line = invalid**; step 3 (existential import) is needed only for I/O conclusions not already shown valid.

## Related notes
- [[ctrw-ch05-forms-of-argument]] — the five valid categorical templates this chapter proves
- [[ctrw-ch09-propositional-logic]] — the parallel decision procedure (truth tables) for *whole-statement* logic
- [[ctrw-ch01-basic-concepts-of-reasoning]] — validity, counterexamples, "some = at least one"
- [[ctrw-ch10-definitions]] — genus/species classification underpins categorical terms
