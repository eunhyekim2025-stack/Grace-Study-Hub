---
title: "CTRW 6 — Inductive Forms: Syllogism, Generalisation, Abduction"
tags: [critical-thinking-in-real-world, ctrw-seminar, lecture, recording, induction, statistical-syllogism, inductive-generalisation, abduction, sampling-bias, standard-error, stereotype, llm]
sources: ["CTRW Lecture 6 Slides (Sovan Patra, 36 slides) — inductive forms: statistical syllogism, inductive generalisation, abduction", "In-class recording — CTRW 6-1 (2026-09-21, in-site recorder / Groq transcript) — the quantitative mechanics merged in 2026-09-21"]
created: 2026-09-21
updated: 2026-09-21
kind: 개념
relations:
  part-of: [critical-thinking-in-real-world/index]
---

<div class="dc-view">
<div><div class="dc-title">Inductive Forms</div><div class="dc-sub">Lecture 5 asked whether a deductive inference is valid. This one asks what makes an inductive inference strong — and there are three shapes to know</div></div>
<div class="dc-section"><span class="dc-num">1</span><h2>The three forms</h2><span class="dc-hint">what each one moves between</span></div>
<div class="dc-cols-3">
<div class="dc-card"><div class="dc-eyebrow">Form 1 · population → member</div><b>Statistical syllogism</b><br><i>N% of Fs are Gs; X is an F; so X is a G</i><br>Strong when <b>N is high</b> and the <b>reference class is narrow</b>.</div>
<div class="dc-card"><div class="dc-eyebrow">Form 2 · sample → population</div><b>Inductive generalisation</b><br><i>N% of sampled Fs are Gs; so N% of all Fs are Gs</i><br>Strong when the sample is <b>large enough</b> and <b>representative</b>.</div>
<div class="dc-card"><div class="dc-eyebrow">Form 3 · observation → cause</div><b>Abduction</b><br><i>O is observed; E₁ best explains O; so E₁ is true</i><br>Strong when E₁ really is the <b>best</b> available explanation.</div>
</div>
<div class="dc-section"><span class="dc-num">2</span><h2>Two ways a generalisation goes wrong</h2><span class="dc-hint">both are called “hasty”</span></div>
<div class="dc-cols">
<div class="dc-card"><div class="dc-eyebrow">Too few</div><b>Noise</b> — the estimate is imprecise. <i>Small-sample fallacy.</i></div>
<div class="dc-card"><div class="dc-eyebrow">Wrong ones</div><b>Bias</b> — the estimate is systematically off. <i>Biased-sample fallacy.</i></div>
</div>
<div class="dc-callout warn">Frequency justifies forms 1 and 2. Abduction does not run on frequency at all — it runs on <b>explanatory fit</b>, which is why it needs its own test.</div>
</div>

# CTRW 6 — Inductive Forms

> [[critical-thinking-in-real-world/index|← Critical Thinking in Real World]] · Lecture 6 (slides + the 2026-09-21 in-class recording). Textbook backing: **5.9.1–5.9.3** and **7.3.1–7.3.6**. The deductive counterpart is [[ctrw-5-1]] · [[ctrw-5-2]]; the reference chapter is [[ctrw-ch05-forms-of-argument|Ch5]].

> [!summary] Key takeaways
> - An argument is **inductive** when the arguer wants the conclusion accepted as **highly likely, short of guaranteed**. Cogency needs a strong inference, true premises, **and reliability**.
> - **Statistical syllogism** runs population → member. Two levers: **raise N**, and **narrow the reference class**.
> - **Inductive generalisation** runs sample → population. Two failure axes: **too small** (noisy) and **unrepresentative** (biased). Both are "hasty".
> - **Abduction** — inference to the best explanation — is the form we use most, and the only one not justified by a frequency.
> - An **unestablished stereotype is a prejudice**; a large language model is an inductive-generalisation machine, and inherits every one of these faults.

---

## A preface — why form, again

Lecture 5 took deductive arguments and asked whether the **form** made the inference valid. This
lecture does the same job for induction: identify the **shape** an inductive argument takes, because
the shape tells you exactly **what to test**.

There is a deeper reason induction gets its own lecture. A valid **deductive** argument only makes
explicit what its premises **already contain** — it re-arranges known information and never adds a
**new fact about the world**. Everything we genuinely learn *empirically* arrives through
**induction**, which is exactly why its faults have to be understood rather than avoided.

> [!info] The standard being applied
> An argument is **inductive** if the arguer intends the conclusion to be established with a
> relatively high degree of certainty **but short of a guarantee**. A good — **cogent** — inductive
> argument must be relatively strong, have true premises, **and be reliable**
> ([[ctrw-ch01-basic-concepts-of-reasoning|Ch1]]).

---

## Form 1 — Statistical Syllogism

A **statistical syllogism (SS)** infers that an attribute of a **reference class** is present in a
**member** of that class.

> [!info] The form
> **P1.** N% of **F**s are **G**s  ·  **P2.** X is an **F**  ∴  **C.** X is a **G**
> F is the **reference class**, G the **attribute class**, X a **member** of F.

| Example | N | Reference class F | Attribute G |
|---|---|---|---|
| I am a Singaporean, so I am a homeowner | 6 in 10 | Singaporeans | homeowners |
| Max is a dog, so Max barks at postmen | 90% | dogs | bark at postmen |
| Sovan is Indian, so Sovan drinks a lot | "most" | Indians | drink a lot |
| Sovan is a Singapore resident, so he uses a smartphone | ≥ 80% | Singapore residents | smartphone users |

### What makes it strong — two levers

**1. The size of N.** The higher N, the stronger the inference. At the limit, **N = 100% makes the
inference deductively valid** — it stops being a statistical syllogism at all.

**2. The narrowness of the reference class.** This is the subtler one, and it is where the exam
question lives.

> [!important] The reference-class problem
> It arises when the member belongs to **another reference class as well**, and the two syllogisms
> **contradict each other**:
>
> | | |
> |---|---|
> | Most **smokers** die before 60 · Sovan smokes | ∴ Sovan will die before 60 |
> | Most **philosophers** live till 90 · Sovan is a philosopher | ∴ Sovan will live till 90 |
>
> Both are decent syllogisms; they cannot both be right. The resolution: **the narrower the
> reference class, the stronger the SS** — "smoking philosophers" beats either. This is also the
> practical shape of an attack on an SS's inference: *name a narrower class the member belongs to
> whose frequency runs the other way* ([[ctrw-ch04-diagramming-reasons-for-and-against|Ch4]]).

---

## Form 2 — Inductive Generalisation

An **inductive generalisation (IG)** infers that an attribute distributed in a **sample** a certain
way is distributed **in the population** the same way. It runs in the **opposite direction** to a
statistical syllogism.

> [!info] The form
> **P.** N% of observed (sampled) **F**s have property **G**  ∴  **C.** N% of **all F**s have **G**
> The observed Fs are the **sample**; all Fs are the **population**.

| Example | Sample | Population |
|---|---|---|
| 70% of Singaporeans **interviewed** are happy with the PAP ∴ 70% of all Singaporeans are | those interviewed | all Singaporeans |
| All the women **I have gone out with** are insensitive ∴ all women are | one man's dating history | all women |
| The **sample count** says WP has 52% in Sengkang ∴ WP has 52% in Sengkang | counted ballots | all Sengkang ballots |
| 95% of people **on Trip Advisor** rated this hotel excellent ∴ 95% of people will | reviewers who posted | everyone |

### What makes it strong — two axes

**1. Sample size.** Attack the inference by saying *the sample was too small*.

> [!tip] The size guidance from the slides
> - For populations between **100 and 1,000**, a sample of **at least 10%** is recommended.
> - For **larger** populations, a **smaller percentage** still gives a strong inference — this is the
>   **law of large numbers**.
> - In research, standardised statistical technique fixes the size precisely, given a **desired
>   strength** (e.g. 95%) and facts about the population (size, heterogeneity).

> [!info] Why bigger samples help — the standard-error mechanics
> The imprecision of a sample estimate is its **standard error**, roughly **SE ≈ σ/√N**. Because the
> error falls with the **square root** of the sample size, there are **diminishing returns**: to
> **halve** the error you must **quadruple N**. The **law of large numbers** is the limit of this —
> as N grows the sample proportion converges on the true one.
> For a *finite* population a **finite-population correction** applies, multiplying the SE by
> **√[(N − n)/(N − 1)]**. This is why a sample of ~100 can pin down a city of 5,000 or a country of
> 5,000,000 almost equally well: past a point the **absolute** sample size matters far more than the
> **fraction** of the population it covers — and why the "≥ 10 %" rule of thumb only bites for *small*
> populations.

**2. Representativeness.** Attack the inference by saying *the sample was not representative*. Three
named sources of bias:

| Bias | What happens |
|---|---|
| **Environment bias** | the sample is drawn from a **specific environment** unrepresentative of the population |
| **Self-selection bias** | the sample **chose itself**, but the population includes members who would never volunteer |
| **Survivorship bias** | the population includes members that **did not survive**; the sample contains only survivors |

Beyond how the sample is *drawn*, a generalisation can fail from **non-sampling error** — something
unrelated to the sampling that makes the projection wrong anyway. The classic case: a perfectly
representative pre-election poll **overtaken by an event or a policy change** between the survey and
the vote. No sample design fixes that; it is a reminder that a strong IG only licenses a claim about
**the population as it was sampled**.

### Bias and noise — two different sicknesses

> [!important] Estimator and estimand
> - Generalise from a **small** sample → the estimate is **imprecise / noisy**. *Small-sample fallacy.*
> - Generalise from a **biased** sample → the estimate is **biased**. *Biased-sample fallacy.*
> - **Either way the generalisation is called hasty** — but the cures are opposite: noise is fixed by
>   *more* data, bias is not fixed by more data at all.

> [!example] The jellybean jar — which estimator is biased, which is noisy?
> 100 jellybeans in a jar; we want the proportion that are red.
>
> | Estimator | Verdict |
> |---|---|
> | red count in **1 randomly picked** bean ÷ 1 | **unbiased, very noisy** — right on average, wildly off on any single draw |
> | red count in a sample of **20 red** beans ÷ 20 | **maximally biased, not noisy** — it returns 1.00 every time, reliably wrong |
> | red count in a **randomly picked 20** ÷ 20 | **unbiased, moderately noisy** — the honest estimator |
> | (red count in a randomly picked 20 **+ 3**) ÷ 20 | **biased, same noise** as above — a constant +0.15 shift |
>
> The pair to fix in mind is rows 2 and 3: **more of a biased sample buys you nothing.**

---

## Telling the two apart

The direction of travel is the whole test:

| | From | To |
|---|---|---|
| **Statistical syllogism** | the **population** (a known frequency) | a **member** |
| **Inductive generalisation** | a **sample** | the **population** |

> [!example] The discrimination exercise
> **(a)** *"Most philosophers I know drink. Steven is a philosopher. So Steven drinks."*
> Two steps, not one — an **IG** from *philosophers I know* to *philosophers*, then an **SS** from
> *philosophers* down to *Steven*. Both steps are attackable, and the IG is the weak one: "philosophers
> I know" is a self-selected sample.
>
> **(b)** *"So far I have found the first six CTRW lectures boring. Therefore I will probably find the
> last three boring as well."* Also a chain — generalise from six observed lectures to *CTRW lectures*,
> then apply that to the three unobserved ones. Sample size six, and drawn entirely from the **early**
> part of the course: an environment-bias worry as much as a size one.

> [!uncertain] (b) is the contested one
> The slide leaves the answer blank. Read strictly, an inference from observed to **unobserved members
> of the same class** is a predictive induction rather than a clean IG or SS; the two-step reading
> above is the most charitable. Check it against what was said in class.

---

## Stereotypes and prejudice

Hasty generalisations and uncogent syllogisms produce **unestablished stereotypes** about individuals
and groups — the slides list *"Black Americans are criminals," "Malays love to lepak," "Singaporeans
are kiasu," "migrant workers are unhygienic," "Sovan (Indian) is good with computers," "women talk too
much."*

> [!important] The term to know
> **Any unestablished stereotype is a prejudice.**
> Note what this makes the flaw: not rudeness but a **logical** defect — a generalisation whose sample
> was too small or biased, or a syllogism whose reference class was too broad. The remedy is the same
> remedy as for any hasty generalisation.

Note too that the "flattering" ones are the same error: *"Sovan is good with computers"* is
structurally identical to the insulting entries in the list.

---

## Inductive generalisation and AI

> [!info] What a large language model does
> It is trained on a very large amount of human text and learns **statistical relationships** in it.
> Given a prompt it **predicts** what would follow — *"The sky is …"* → *"blue"*, because that is the
> common pattern — and builds a whole response by continually choosing the next word or combination of
> words from context.

Read that as an argument form and an LLM is an **inductive-generalisation machine**:

1. From the **sample** (training data) it determines, for each type of linguistic context, the
   continuation that is generally most appropriate — an **inductive generalisation**.
2. Given a prompt it identifies the relevant context and applies that generalisation to produce the
   response — a **statistical syllogism**.

Which means it inherits **exactly the faults above**:

| Fault | In an LLM |
|---|---|
| **Hasty generalisation — small sample** | output on a topic the training data barely covers |
| **Hasty generalisation — biased sample** | output on a topic the training data does not fairly represent |
| **The reference-class problem** | the model picks a broad context when a narrower one applies — the failure behind documented bias against speakers of **African American English** |

> [!tip] Why this belongs in a critical-thinking course
> It gives you a precise vocabulary for what is wrong with a confident machine answer — not "it made
> things up" but *which* inductive fault it committed, and therefore what would fix it.

---

## Form 3 — Abduction

The lecture introduces this with the Sherlock Holmes scene: from a right hand more developed than the
left, a right cuff shiny for five inches and a smooth patch at the left elbow, and a pink-scaled fish
tattoo with a Chinese coin on the watch chain, Holmes reads off **manual labour, recent writing, and a
voyage to China**.

> [!info] The form
> **P1.** It is observed that **O**.
> **P2.** Of the many explanations for O (E₁, E₂, …, Eₙ), **E₁ is the best**, given current knowledge.
> ∴ **C.** E₁ is (or is likely to be) true.
>
> Also known as **inference to the best explanation**.

### When should you read an argument abductively?

Take Holmes's tattoo step: *"You have a tattoo in a style unique to tattooists in China ∴ you have
been to China."* Ask what the missing second premise would have to be:

| To read it as… | The premise you would need | Should you? |
|---|---|---|
| **deductive / valid** | *Everyone with a tattoo in that style has been to China* | **No** — plainly false; the style can be copied elsewhere |
| **a strong statistical syllogism** | *Most people with a tattoo in that style have been to China* | **No** — nobody has that frequency, and Holmes is not appealing to one |
| **abductive** | *Of the explanations for that tattoo, "he got it in China" is the best* | **Yes** — this is what the reasoning actually rests on |

> [!important] The dividing line
> In **non-abductive induction**, the conclusion is justified **purely by a relative frequency** in the
> sample or population. In **abduction**, it is justified by the conclusion being the **best
> explanation of the observation** — and what is observed may itself be a relative frequency.
> So: *no frequency in the reasoning → look for an abductive reading.*

### Abduction is the form we use most

| Domain | How it runs |
|---|---|
| **Personal life** | your partner forgets your birthday **and** your anniversary; your teammate misses the first meeting, is uncontactable, and later says he was at a movie; you do badly on a mid-term — in each case you reach for the explanation that best fits |
| **Medicine** | most clinical diagnosis *is* abduction: observe the symptoms, list the explanations consistent with them, pick the best, prescribe accordingly |
| **Law** | many court judgements are abductive: weigh the evidence, consider the explanations consistent with it, deliver the best one as the verdict |

> [!warning] Do not be fooled by a "must"
> *"Chills, sore throat, slight fever, no appetite — you **must** have the flu."* *"The weapon was in
> your house, you have no alibi, you had the motive, your testimony keeps changing — you **must** be
> guilty."* The word suggests a guarantee, but charitably these are **inductive**: the conclusion is
> the best explanation, not a deduction from the evidence.

> [!uncertain] What "best" means — the slide's technical digression
> The slide sets up the question and leaves the answer blank. The standard completion: E₁ is best when,
> **if E₁ were true, O would be least surprising** — E₁ makes the observation most expected, while
> staying plausible and simple in its own right. The lecturer's closing remark, *"that is why we can be
> reasonably confident that even animals abduce,"* fits that reading: expectation-violation is
> something a creature without language can track. Confirm before quoting it.

> [!todo] Formative exercise
> Identify the structure of the argument in *"Scientists find gas linked to life in the atmosphere of
> Venus"* (The Guardian, 14 Sept 2020) — the phosphine detection. It is an abduction dressed as a
> discovery, and the interesting work is in listing E₂ … Eₙ.

---

## Key terms

| Term | Meaning |
|---|---|
| **Statistical syllogism** | infers an attribute of a reference class is present in a member of it |
| **Reference class** | the population F whose frequency the syllogism uses |
| **Reference-class problem** | the member belongs to a second class whose syllogism contradicts the first; resolved by preferring the **narrower** class |
| **Inductive generalisation** | infers the distribution in a sample holds in the population |
| **Noisy estimate** | imprecise because the sample was too small — the small-sample fallacy |
| **Biased estimate** | systematically off because the sample was unrepresentative — the biased-sample fallacy |
| **Hasty generalisation** | the umbrella term covering both |
| **Environment · self-selection · survivorship bias** | the three named ways a sample stops being representative |
| **Prejudice** | an unestablished stereotype — a hasty generalisation or uncogent syllogism about a group |
| **Abduction** | inference to the best explanation; justified by explanatory fit, not by frequency |

## Related notes
- [[ctrw-ch05-forms-of-argument]] — the reference chapter; its inductive-forms table is the short version of this note
- [[ctrw-ch07-fallacies]] — small-sample and biased-sample as named fallacies, plus weak analogy and appeal to authority
- [[ctrw-ch03-evaluating-arguments]] — inference strength, and why new background information changes reliability
- [[ctrw-5-1]] · [[ctrw-5-2]] — Lecture 5, the deductive counterpart (validity by form)
- [[ctrw-ch04-diagramming-reasons-for-and-against]] — attacking an inference, which is what the reference-class and sampling objections do
