---
title: IRAC Drill Design Methodology
tags: [exam-prep, methodology, IRAC, quiz-design]
sources: [law/prewriting/8. Monkey's Mistake.pdf]
updated: 2026-06-17
pagerank: 0.0025
betweenness: 0.0000
eigenvector: 0.0583
degree: 5
community: 2
---

# IRAC Drill Design Methodology

Unlike simple concept-memorisation cards, an exam-style IRAC Drill is designed so that **one key fact changes the conclusion**.
This methodology applies to any chapter.

---

## Why This Structure

The limitation of concept cards: "What is Common Mistake?" → only the definition is memorised → application fails in exam scenarios.

Exam questions always:
1. Present facts where it is **ambiguous** whether the law applies
2. Require the student to find the **decisive fact** and connect it to the Rule
3. Require the student to explain why two seemingly similar cases reach **different conclusions**

---

## Structure of a Single Card

```
### Scenario N — [title]

[scenario: concrete figures, characters, facts — the decisive fact is buried naturally]

**Q: [a single, clear question]**

<details>
<summary>▶ Model Answer</summary>

**Issue**: [the issue in one line]

**Rule** (*case [year]*): [the applicable law + requirements]

**Application**:
- [fact 1] → [analysis]
- [fact 2] → [analysis]
- **[decisive fact]** → [connection to law] ← bolded

**Conclusion**: [a clear one-liner] → contract void/voidable/valid.

> **Exam tip**: [the boundary line this question teaches, in one line]

</details>
```

---

## Design Principles

### Principle 1 — Include Only One Decisive Fact
- Good example: "both are usable in Tony's process" → Common Mistake not made out
- Bad example: several facts jointly affecting the conclusion → unclear what the student should learn

### Principle 2 — Design in Pairs
Place two questions side by side, changing only the decisive fact:

| Fact | Conclusion |
|------|------|
| Both **usable** | Common Mistake not made out |
| Aviation certification **impossible** | Common Mistake made out |

→ The student clearly recognises "what changed the conclusion"

### Principle 3 — Put Cases Only in the Rule, Facts Only in the Application
If you mix facts into the Rule → the student memorises "case = this fact" → cannot apply to new facts.

### Principle 4 — The Exam Tip Should State the Boundary Line
"The Bell test is narrow" (X) → too abstract
"The test is whether the purpose can be achieved — usable means not made out, unusable means made out" (O)

---

## Per-Chapter Application Guide

When building an IRAC Drill for each chapter, first check:

1. Find the **boundary-case authorities** (a doctrine where a made-out case and a failed case coexist)
2. Identify the **decisive difference** between the two cases
3. Weave that difference into the scenario

| Chapter | Boundary case pair |
|------|--------------|
| Mistake | Bell (failed) vs Associated Japanese Bank (made out) |
| Mistake | Phillips v Brooks (voidable) vs Ingram v Little (void) |
| Consideration | Stilk v Myrick (failed) vs Williams v Roffey (made out) |
| Misrepresentation | Mere opinion (failed) vs implied representation of fact (made out) |
| Duress | Legitimate pressure (failed) vs unlawful threat (made out) |
| Exemption Clause | Incorporation (failed) vs incorporation (succeeded) |

---

## File Naming Convention

```
wiki/law-concepts/<topic>-quiz.md          ← concept-memorisation cards
wiki/law-concepts/<topic>-quiz-scenarios.md ← PQ-style scenarios
wiki/law-concepts/<topic>-quiz-irac.md     ← IRAC Drill (this methodology)
```

→ The `/quiz` skill auto-generates using this methodology.
