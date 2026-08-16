---
title: "Ch9 — Propositional Logic"
tags: [critical-thinking-in-real-world, ctrw-textbook, propositional-logic, truth-tables, operators, validity, tautology]
sources: ["Mooney, Williams & Burik, An Introduction to Critical and Creative Thinking (McGraw-Hill, 2015) — Ch.9 Propositional Logic"]
updated: 2026-08-16
kind: 절차
---

<div class="dc-view">
<div><div class="dc-title">Propositional Logic</div><div class="dc-sub">Reason about whole statements — symbolise, build a truth table, and validity is decidable for <i>any</i> argument</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Symbolise</div><div class="dc-step-d">simple props → letters, 5 operators</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Main operator</div><div class="dc-step-d">brackets fix the scope</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Truth table</div><div class="dc-step-d">2ⁿ rows, work inside-out</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Read validity</div><div class="dc-step-d">look for a counterexample row</div></div>
</div>
<div class="dc-section"><span class="dc-num">★</span><h2>Two logics, two building blocks</h2><span class="dc-hint">don't confuse them</span></div>
<div class="dc-cols-2">
<div class="dc-card"><div class="dc-eyebrow">Categorical ([[ctrw-ch08-categorical-logic|Ch8]])</div>building block = <b>terms / classes</b>; letters stand for S, P, M.</div>
<div class="dc-card"><div class="dc-eyebrow">Propositional (Ch9)</div>building block = <b>whole propositions</b>; letters stand for simple statements, joined by operators.</div>
</div>
<div class="dc-callout">The chapter's goal: a <b>mechanical decision procedure</b> for validity that works on <i>any</i> propositional argument — not just the named forms of [[ctrw-ch05-forms-of-argument|Ch5]].</div>
</div>

# Ch9 — Propositional Logic

> [[index|← Critical Thinking in Real World]] · Textbook Ch.9. The truth-table procedure that proves what [[ctrw-ch05-forms-of-argument|Ch5]] took on trust. Exercises **9.1–9.4** (private answer key held for feedback).

---

## The five operators (symbolising)
Pick a letter for each **simple** proposition (a *dictionary*), then combine with:

| Operator | Symbol | Ordinary-language cues |
|---|---|---|
| Negation | **~P** | "not," "it is not the case that," "un-/in-" — but only when it genuinely *negates* the whole proposition |
| Conjunction | **P & Q** | and, but, although, however, yet, moreover, while, even though |
| Disjunction | **P ∨ Q** | either…or, or, **unless** (= "if not") — read *inclusive* unless "but not both" is added |
| Conditional | **P → Q** | if…then, provided, given that, in case, on condition that; also "only if" (marks the **consequent**) |
| Bi-conditional | **P ↔ Q** | if and only if, "necessary and sufficient," "just in case" |

**Translation cautions:**
- Not every "not" is a negation — "Some men are *not* stupid" ≠ "It is not the case that some men are stupid" (translate as a simple positive instead).
- "**P only if Q**" = **P → Q** (Q necessary), *not* Q → P. "P if Q" = Q → P (P sufficient).
- Only **truth-functional** compounds belong here — "We fired you *because* you were late" isn't (its truth needs more than the parts). Only **indicative** conditionals qualify, not counterfactuals ("If I *were* Branson…").
- **Main operator = scope.** Brackets decide meaning: `W & (T ∨ K)` (a conjunction) ≠ `(W & T) ∨ K` (a disjunction). Insert commas/`both`/`either` to disambiguate English.

## The five basic truth tables
A truth table lists every combination of T/F for the components. **n simple propositions → 2ⁿ rows.**

| P | Q | ~P | P & Q | P ∨ Q | P → Q | P ↔ Q |
|---|---|----|-------|-------|-------|-------|
| T | T | F | **T** | T | T | **T** |
| T | F | F | F | T | **F** | F |
| F | T | T | F | T | T | F |
| F | F | T | F | **F** | T | **T** |

Read off the rule for each:
- **~P** flips the value.
- **& (conjunction)** — true **only when both** conjuncts are true.
- **∨ (inclusive disjunction)** — false **only when both** disjuncts are false (true if both). *Exclusive* "or" = `(P ∨ Q) & ~(P & Q)`.
- **→ (conditional)** — **false only when a true antecedent meets a false consequent** (T→F). The one counter-intuitive table: think of a *promise* — you only broke "if you marry me, I'll love you forever" in the case marry-and-don't-love.
- **↔ (bi-conditional)** — true **only when both sides match** (both T or both F).

## Building a complex truth table
For a compound with several operators: lay out the 2ⁿ interpretations, then **work from the innermost components outward to the main operator**, filling a column under each operator. The column under the **main operator** is the proposition's truth table. (Shortcut: a conditional is automatically **T** wherever its antecedent is F, so those rows can be filled at once.)

## Classifying and comparing propositions
Reading the main-operator column classifies a proposition:

| Class | Main-operator column | Says about the world |
|---|---|---|
| **Tautology** | all **T** | nothing (always true — e.g. `(W & C) → C`) |
| **Self-contradiction** | all **F** | nothing (never true — e.g. `S & ~S`) |
| **Contingent** | mix of T and F | **something** — only contingent claims are informative |

Comparing two propositions' columns:
- **Logically equivalent** — identical columns (e.g. `P ↔ Q` and `(P → Q) & (Q → P)`).
- **Contradictory** — opposite in every row (e.g. `P → Q` and `P & ~Q`).
- **Consistent** — at least one row where **all are true** (they *can* hold together).
- **Inconsistent** — **no** row where all are true (they can't all be true — a red flag when you assert several claims at once).

## Testing an argument for validity
Write the premises and conclusion across the top, build the joint truth table, then apply the definition of validity directly:

> **A counterexample = a row with all premises true and the conclusion false.**
> **Valid** ⇔ the table has **no** counterexample row. **Invalid** ⇔ at least one.

This *proves* the Ch5 forms: Modus Ponens (`P→Q / P // Q`) has no counterexample; Denying the Antecedent (`P→Q / ~P // ~Q`) has one (the F-T row) — so it's invalid.

**Indirect (short) method:** instead of the whole table, *assume the premises true and the conclusion false* and try to fill in consistent truth values. If you're forced into a contradiction → **valid**; if a consistent assignment exists → that's your counterexample → **invalid**. Faster, though trickier when several assignments are possible.

## Key takeaways
- **Symbolise** with the five operators; mind the traps — inclusive "or," "only if" = consequent, truth-functional & indicative only; **brackets set the main operator**.
- Memorise the **five truth tables**; the only surprising one is **→** (false solely on T→F).
- **n props → 2ⁿ rows**; build inside-out to the main operator; classify as tautology / self-contradiction / **contingent** (only the last is informative).
- **Validity = no row with true premises and a false conclusion** — a fully mechanical test (direct table, or the faster assume-and-derive short method).

## Related notes
- [[ctrw-ch05-forms-of-argument]] — the propositional forms (MP, MT, DS, HS…) this chapter proves valid or invalid
- [[ctrw-ch08-categorical-logic]] — the parallel decision procedure (Venn) for class logic
- [[ctrw-ch01-basic-concepts-of-reasoning]] — validity, counterexamples, the inclusive/exclusive "or"
- [[ctrw-ch07-fallacies]] — Denying the Antecedent / Affirming the Consequent shown invalid by their tables
