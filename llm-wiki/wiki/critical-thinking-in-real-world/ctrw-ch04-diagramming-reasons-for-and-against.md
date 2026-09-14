---
title: "Ch4 — Diagramming: Reasons For and Against"
tags: [critical-thinking-in-real-world, ctrw-textbook, objections, rebuttal, argument-mapping, inference-attack]
sources: ["Mooney, Williams & Burik, An Introduction to Critical and Creative Thinking (McGraw-Hill, 2015) — Ch.4 Diagramming: Reasons For and Against", "CTRW Lecture 4 Slides (Sovan Patra, 44 slides) — attacking arguments, charity, reliability, deep diagramming"]
updated: 2026-09-14
kind: 개념
relations:
  part-of: [critical-thinking-in-real-world/index]
pagerank: 0.0037
betweenness: 0.0001
eigenvector: 0.0154
degree: 11
community: 6
---

<div class="dc-view">
<div><div class="dc-title">Reasons For and Against</div><div class="dc-sub">Extend the diagram to objections — a balanced argument shows both sides, and there are exactly three things you can attack</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Attack a reason</div><div class="dc-step-d">deny a premise's truth</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Attack a conclusion</div><div class="dc-step-d">deny the conclusion directly</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Attack an inference</div><div class="dc-step-d">grant the reasons, break the link</div></div>
</div>
<div class="dc-section"><span class="dc-num">★</span><h2>The one diagramming rule</h2><span class="dc-hint">two kinds of arrow</span></div>
<div class="dc-cols-2">
<div class="dc-card"><div class="dc-eyebrow">Solid arrow →</div><b>Support</b>: a reason pointing at what it backs.</div>
<div class="dc-card"><div class="dc-eyebrow">Broken arrow ⇠</div><b>Attack</b>: an objection pointing at its target — a reason, a conclusion, or (uniquely) at an <i>inference arrow</i> itself.</div>
</div>
<div class="dc-callout">Objections can themselves be <b>supported</b> by their own reasons and <b>counter-attacked</b> — that's how a real debate becomes one big transparent diagram, so you always know where you are.</div>
</div>

# Ch4 — Diagramming: Reasons For and Against

> [[critical-thinking-in-real-world/index|← Critical Thinking in Real World]] · Textbook Ch.4. Extends [[ctrw-ch02-diagramming-reasoning|Ch2]]'s maps with objections, evaluated by [[ctrw-ch03-evaluating-arguments|Ch3]]'s methods. Exercises **4.1–4.2** (private answer key held for feedback).

---

## The three things an objection can attack

| # | Target | What the objector does | Diagram |
|---|---|---|---|
| **1** | **Truth of a reason** | denies a premise ("your reasons are false") | broken arrow → the **reason** (objection may have its own supporting reason) |
| **2** | **Truth of the conclusion** | denies the conclusion directly, staying *agnostic* about the reasons ("your conclusion is false because…") | broken arrow → the **conclusion** |
| **3** | **The inference** | *grants* the reasons but shows they don't establish the conclusion ("even if I accept your premises, it doesn't follow…") | broken arrow → the **inference arrow** itself |

All three are ways of thinking **outside the box** — actively hunting for where an argument breaks.

## Attacking an inference — the subtle one

- Mainly works against **inductive** arguments: assume the reasons true, then **add new information** that, combined with them, **weakens the reliability** of the inference. (The classic shape: "Nearly all Singaporeans are Chinese; Nora is Singaporean; so probably Nora is Chinese" — undercut by "Nora is a Singaporean *Muslim*, and nearly all Singaporean Muslims are not Chinese." The new facts don't contradict the premises; they just drain the support.)
- Against a **deductively valid** inference you can **never succeed** — validity is unbreakable. You *can* attack an **invalid** deductive inference (by counterexample, [[ctrw-ch01-basic-concepts-of-reasoning|Ch1]]).
- The book **does not** diagram reasons *for* an inference (strengthening reliability) — only attacks.
- **Test:** assume the original reasons true and gauge the support; then add the objection's info and ask whether support **dropped**. If yes → a genuine attack on the inference.

## Which target is under attack? — the probability test

The three targets are easy to state and hard to apply: a real objection arrives as one loose
sentence, and *"so what does it actually attack?"* is the question you get marked on. Seminar 4 turns
the intuition into a test. Write **AS** for the attacking statement, **P** for a premise, **C** for
the conclusion, and read $\Pr(\cdot)$ as "how likely this is, given what we know":

| Target | Attacked exactly when | Read as |
|---|---|---|
| **Premise** | $\Pr(P \mid AS) < \Pr(P)$ | with AS in hand the premise is **less likely to be true** than without it |
| **Conclusion** | $\Pr(C \mid AS) < \Pr(C)$ | with AS in hand the conclusion is less likely to be true — **without going through the premises** |
| **Inference** | $\Pr(C \mid P + AS) < \Pr(C \mid P)$ | adding AS **to the existing premises** drains the support they were giving |

> [!important] The first two are tested *out of context*, the third *in context*
> For a premise or a conclusion, look at that statement **alone** and ask whether AS makes it less
> believable. For an inference you must keep the whole argument in view: the premises stay true, and
> the only question is whether they still carry you to the conclusion. Mixing the two up is the usual
> way of mislabelling an attack.

> [!example] Albert the taxi driver — one argument, three different attacks
> *(1) Albert drives a taxi. (2) Many taxi drivers are rich. **∴** (3) Albert is rich.*
> - **"Albert is blind."** Blind people do not drive taxis, so $\Pr(1 \mid AS) < \Pr(1)$ — this attacks **premise (1)**. It says nothing about how rich taxi drivers are.
> - **"Albert receives low-income welfare support from the government."** This leaves both premises untouched and makes *being rich* less likely **directly** — an attack on the **conclusion**.
> - **"For every rich taxi driver there are many more poor ones."** Both premises stay true, but they now support (3) far less than before — an attack on the **inference**.

## An attack is an argument

An attack is never a bare statement flung at a diagram — it is an **argument in its own right**,
whose conclusion is that the target fails:

| Attacking… | The attack's own conclusion |
|---|---|
| a premise | *that premise is false (or likely false)* |
| a conclusion | *that conclusion is false (or likely false)* |
| an inference | *that inference is invalid / relatively weak* |

Because attacks are arguments, everything in [[ctrw-ch01-basic-concepts-of-reasoning|Ch1]] applies to
them unchanged — including the **intention** distinction:

- A **deductive** attack is **sound** or unsound. If it is sound, the target *must* be false — $\Pr(P \mid AS) = 0$ — or the inference is definitely unacceptable.
- An **inductive** attack is **cogent** or uncogent. If it is cogent, the target is *highly likely* false (a low, but not zero, probability), or the inference is highly likely unacceptable.

> [!tip] This is why "Albert is blind" unpacks into two steps
> The attack is really *"(4) Albert is blind **∴** (7) Albert does not drive a taxi"*, and it is (7)
> that collides with premise (1). Every dashed arrow in a diagram hides a small argument like this —
> which is also why an attack can be attacked in turn.

## Charity applies to attacks too

Since the attack is an argument, the **principle of charity** covers it as well: where the attack is
unclear, read it in whichever way makes it *strongest*. Three cases recur.

**1. Unclear whether it hits the conclusion or the inference → read it as the inference.**
*"(1) Emma and Mona come from the same JC. (2) Emma is going to university **∴** (3) Mona will go
too"*, attacked by *"But Mona didn't even finish JC."* Read as a conclusion-attack it merely makes
(3) less likely; read as an inference-attack it destroys the same-JC parallel the whole argument runs
on. The stronger reading wins, so charity mandates the **inference**.

**2. A normative conclusion → the attack really hits a hidden premise.**
*"(1) Sovan should marry Emma because (2) he loves her and (3) she loves him"*, attacked by *"But one
should not marry for love."* It looks like an inference-attack — yet charity to the *original*
argument supplies the implicit normative premise **(5) "You should marry someone whom you love and
who loves you"**, which makes the inference valid. The attack then lands squarely on **(5)**.

> [!important] The moral
> If an argument has a normative conclusion, an implicit premise can **always** be added to make the
> inference valid. So an apparent attack on the *inference* of a normative argument is really an
> attack on a **hidden premise** — reconstruct the premise first, then aim the dashed arrow at it.

**3. Hopeless on every reading → it is not an attack at all.**
*"(1) He will be late, because (2) he left late and (3) if he left late he will be late"*, answered
by *"But you're always late yourself!"* That touches no premise, no conclusion and no inference.
Charity says: do not force it into the diagram as a bad attack — treat it as a **separate, unrelated
observation** (and, in [[ctrw-ch07-fallacies|Ch7]] terms, a *tu quoque*).

## Deep diagramming

A **deep diagram** is one arrow diagram showing the reasons *for* and *against* a conclusion together
— solid arrows for support, dashed for attacks, with attacks themselves supported by further reasons
where the objector gave any. Two habits make it usable:

- **Count the arrows to count the arguments.** A deep diagram with ten arrows contains ten
  argumentative moves, and each one is separately evaluable (valid/strong/weak, premises true or not).
- **Diagram the original argument narrowly first.** Locate premises, inference and conclusion before
  you try to place any dashed arrow; a vague target is what produces a vague attack.

## All-out assaults (long chains)

Real passages stack all of this: a conclusion supported by linked/convergent reasons, some of those reasons attacked, the attacks themselves supported serially, and further objections aimed at the conclusion or the inference. Diagramming keeps the whole thing **transparent** — you can always see which arrow (solid or broken) leads where.

## Evaluating the whole picture

Label **every inference** with its strength and every claim with a truth value, then read the net result:

- **Inference strengths:** valid / strong / moderately strong / weak (from [[ctrw-ch03-evaluating-arguments|Ch3]]).
- **How strong is an *attack*?** An attack on a **reason** (or conclusion) is *weak → strong → valid* depending on how much the objection's truth makes the target **false** (valid = the objection's truth makes the target's falsehood *certain*). An attack on an **inference** is *weak → strong* depending on how much it **weakens reliability** — and *completely successful* if it shows a deductive inference is **invalid**.
- **Net verdict:** the conclusion stands only as firmly as its **strongest surviving line of support** minus its **strongest surviving attack**. If the best support runs through a premise that a strong objection makes doubtful, the conclusion "cannot be established with confidence" — often the honest result. Frequently the whole thing rests on a **deep assumption** (e.g. whether we must always do what "justice demands," or a utilitarian vs non-consequentialist premise) that needs further argument.

## Key takeaways
- **Exactly three attack targets:** the truth of a reason, the truth of the conclusion, or the inference.
- **Solid = support, broken = attack**; an inference-attack points at the *arrow*, not a statement.
- **You can't break a valid inference** — inference-attacks live in inductive territory (weakening reliability with new info).
- To judge a contested argument, **label every arrow's strength**, then weigh strongest support against strongest attack — and watch for the load-bearing **deep assumption**.

## Related notes
- [[ctrw-ch02-diagramming-reasoning]] — the base diagramming method (serial/divergent/linked/convergent)
- [[ctrw-ch03-evaluating-arguments]] — the strength labels and truth tests used here
- [[ctrw-ch06-reconstructing-and-constructing-arguments]] — turn a for-and-against map into a written evaluative essay
- [[case-drug-legalisation-grayling]] — a real op-ed where objections decide the verdict
- [[4-1]] · [[ctrw-4-2]] — Seminar 4, where this chapter was worked live (the probability test, the charity rules, and the dress-code and free-rider exercises)
