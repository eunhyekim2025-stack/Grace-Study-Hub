---
title: "Ch5 — Forms of Argument"
tags: [critical-thinking-in-real-world, ctrw-textbook, categorical-syllogism, propositional-logic, modus-ponens, necessary-sufficient, valid-forms]
sources: ["Mooney, Williams & Burik, An Introduction to Critical and Creative Thinking (McGraw-Hill, 2015) — Ch.5 Forms of Argument"]
updated: 2026-08-16
kind: 개념
---

<div class="dc-view">
<div><div class="dc-title">Forms of Argument</div><div class="dc-sub">Recognise the shape and you can read off validity — templates for building and checking deductive arguments</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Categorical</div><div class="dc-step-d">relations between classes (All/No/Some)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Propositional</div><div class="dc-step-d">relations between whole statements (not/and/or/if)</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Necessary/Sufficient</div><div class="dc-step-d">"if" vs "only if"</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Inductive forms</div><div class="dc-step-d">the four recurring shapes</div></div>
</div>
<div class="dc-section"><span class="dc-num">★</span><h2>Why form matters</h2><span class="dc-hint">three payoffs</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">Tells the type</div>a recognisable form reveals whether the argument is <b>deductive or inductive</b>.</div>
<div class="dc-card"><div class="dc-eyebrow">Tells validity</div>a <b>valid form</b> makes <i>any</i> argument of that form valid — read it off without checking content.</div>
<div class="dc-card"><div class="dc-eyebrow">Tells what to check</div>an inductive form flags what to test (e.g. is <i>n</i> high? is the sample representative?).</div>
</div>
<div class="dc-callout">A valid form guarantees only <b>validity</b>, not <b>soundness</b> — you still need true premises, and there's no mechanical recipe for that.</div>
</div>

# Ch5 — Forms of Argument

> [[index|← Critical Thinking in Real World]] · Textbook Ch.5. The reference chapter for [[ctrw-ch01-basic-concepts-of-reasoning|validity]]. Full rigour comes in [[ctrw-ch08-categorical-logic|Ch8]] (Venn) and [[ctrw-ch09-propositional-logic|Ch9]] (truth tables). Exercises **5.1–5.2** (private answer key held for feedback).

---

## Categorical syllogisms — reasoning about classes

Four statement types, each relating a subject class **S** to a predicate class **P**:

| Type | Form | Example |
|---|---|---|
| **A** | All S are P | All students are poor |
| **E** | No S are P | No students are poor |
| **I** | Some S are P | Some students are poor |
| **O** | Some S are not P | Some students are not poor |

A **categorical syllogism** has two premises + a conclusion, three class terms each used twice: **S** (subject of conclusion), **P** (predicate of conclusion), **M** (the *middle* term, in the premises but not the conclusion). Validity depends purely on the **relations between the classes**.

- **Read "some" as "at least one"** — a frequent source of error.
- **Test:** first appeal to intuition (imagine the classes); if that doesn't clearly yield "yes," hunt for a **formal counterexample** — a same-form argument with obviously true premises and an obviously false conclusion. (Counterexamples prove *invalidity*; they can't prove validity — that needs the [[ctrw-ch08-categorical-logic|Venn method]].)

### Five common valid forms (memorise as templates)
```
1.  All M are P     2.  No M are P      3.  All M are P
    All S are M         All S are M         Some S are M
    ∴ All S are P       ∴ No S are P        ∴ Some S are P

4.  All P are M     5.  No M are P
    Some S are not M    Some S are M
    ∴ Some S are not P  ∴ Some S are not P
```
Valid syllogisms can be **chained** — one's conclusion becomes another's premise.

## Propositional logic — reasoning about whole statements

Validity here depends on **operators** joining propositions: *not* (negation), *and* (conjunction), *or* (disjunction), *if…then* (conditional). The 18 forms the chapter names:

| # | Form | Valid? | Shape |
|---|---|---|---|
| 1 | Double Negation (DN) | ✅ | `Not not P ⟺ P` |
| 2 | Simplification (S) | ✅ | `P and Q ∴ P` |
| 3 | Conjunction (C) | ✅ | `P ; Q ∴ P and Q` |
| 4 | Not Both (NB) | ✅ | `Not(P and Q) ; P ∴ Not Q` |
| 5 | De Morgan's Laws (DM) | ✅ | `Not(P and Q) ⟺ Not P or Not Q` |
| 6 | Disjunctive Syllogism (DS) | ✅ | `P or Q ; Not P ∴ Q` |
| 7 | **False Dichotomy / overlapping alternatives (FD)** | ❌ | `P or Q ; P ∴ Not Q` |
| 8 | Addition (A) | ✅ | `P ∴ P or Q` (any Q) |
| 9 | **Modus Ponens (MP)** | ✅ | `If P then Q ; P ∴ Q` |
| 10 | **Denying the Antecedent (DA)** | ❌ | `If P then Q ; Not P ∴ Not Q` |
| 11 | **Modus Tollens (MT)** | ✅ | `If P then Q ; Not Q ∴ Not P` |
| 12 | **Affirming the Consequent (AC)** | ❌ | `If P then Q ; Q ∴ P` |
| 13 | Hypothetical Syllogism (HS) | ✅ | `If P then Q ; If Q then R ∴ If P then R` |
| 14 | Transposition (T) | ✅ | `If P then Q ∴ If not Q then not P` |
| 15 | **False Transposition (FT)** | ❌ | `If P then Q ∴ If not P then not Q` |
| 16 | Constructive Dilemma (CD) | ✅ | `If P then Q ; If R then S ; P or R ∴ Q or S` |
| 17 | Destructive Dilemma (DD) | ✅ | `If P then Q ; If R then S ; Not Q or not S ∴ Not P or not R` |
| 18 | Reductio ad Absurdum (RAA) | ✅ | `Suppose P … derive (Q and not Q) ∴ Not P` |

> ⚠ **The four invalid ones are the classic fallacies** — FD, **DA**, **AC**, FT. DA and AC are the two ways to misuse a conditional; commit them by mistaking the direction of "if."

### Disjunction and conditional subtleties
- **Inclusive vs exclusive "or":** by charity, read `P or Q` as **inclusive** ("or both") unless the context clearly excludes both. "**unless**" = inclusive *or* (`P unless Q` = `P or Q or both`).
- **Conditional:** in `If P then Q`, **P = antecedent, Q = consequent**; never split them. Crucially, "**only if**" marks the **consequent**, so **"only if" ≠ "if"** — `P only if Q` means `If P then Q`, *not* `If Q then P`.
- Arguments can be written in **Standard Argument Form (SAF)** with a dictionary (assign a letter to each simple proposition), then each inference labelled by its form — the method for long combined arguments (and [[ctrw-ch06-reconstructing-and-constructing-arguments|Ch6]]).

## Necessary vs sufficient conditions ("if" vs "only if")

| Phrasing | Meaning | Role of the condition |
|---|---|---|
| **Q if P** | If P then Q | **P is *sufficient* for Q** |
| **Q only if P** | If Q then P | **P is *necessary* for Q** |
| **Q if and only if P** | both directions | **P is necessary *and* sufficient** ("just in case") |

- **Sufficient ≠ necessary** and vice versa: being a man is *necessary* but not *sufficient* for being a bachelor; having wings is *neither* necessary nor sufficient for flight.
- **The trap:** treating a *necessary* condition as if it were *sufficient*. "Jack apologised only if Tom did; Tom apologised; so Jack did" — invalid, because Tom's apology is only necessary, not sufficient. Structurally this is **affirming the consequent** ([AC], #12).

## Four common inductive forms

| Form | Shape | What makes it strong |
|---|---|---|
| **Statistical syllogism** | *n% of Fs are Gs; X is an F; so probably X is a G* | high *n*; reliable (no known info about X that lowers the odds). n=100 → deductively valid |
| **Inductive generalisation** | *n% of a sample of S is F; so ≈ n% of S is F* | sample **unbiased + large enough**; note the "**about**" (margin of error) — vaguer conclusions are *stronger* |
| **Argument from (inductive) analogy** | *X has a,b,c,z; Y has a,b,c; so probably Y has z* | shared properties are **relevant** and numerous |
| **Argument from authority** | *Authority A says P; so probably P* | A is a **genuine, relevant, unbiased** expert |

(What makes analogies and authority *reliable* — and their failure modes — is [[ctrw-ch07-fallacies|Ch7]].)

## Key takeaways
- **Categorical** = classes (A/E/I/O; S/P/M); five valid templates; "some" = "at least one."
- **Propositional** = operators; know **MP, MT, HS, DS, DM** (valid) vs **DA, AC, FD, FT** (the fallacies) cold.
- **"if" = sufficient, "only if" = necessary** — confusing them is the affirming-the-consequent trap.
- A valid **form** gives validity for free; **soundness still needs true premises**, which no form supplies.

## Related notes
- [[ctrw-ch01-basic-concepts-of-reasoning]] — validity, soundness, counterexamples
- [[ctrw-ch08-categorical-logic]] — the Venn-diagram decision procedure for syllogisms
- [[ctrw-ch09-propositional-logic]] — truth tables that decide *any* propositional argument
- [[ctrw-ch07-fallacies]] — DA/AC and the inductive-form failure modes as named fallacies
