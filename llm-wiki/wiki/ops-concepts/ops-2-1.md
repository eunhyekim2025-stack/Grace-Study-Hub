---
title: "Ops 2-1 — Process View & Flow Unit"
tags: [operations-management, opim201, lecture, recording, process-view, flow-unit, order-winners]
sources: ["OPIM 201 Session 2 in-class recording — process view & flow unit (2026-08-27, whisper/Groq transcript)", "operations-management/lectures/2026-08-27-ops-2-1-transcript.txt"]
created: 2026-08-27
updated: 2026-08-27
kind: 개념
recording_folder: "recordings/operations-management/2026-08-27-2-1 (private Vercel Blob, 6 segments)"
---

<div class="dc-view">
<div><div class="dc-title">Process View & the Flow Unit</div><div class="dc-sub">You cannot manage what you cannot measure — so first define the unit that flows</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Strategy</div><div class="dc-step-d">order winners vs qualifiers</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Process view</div><div class="dc-step-d">activities: input → output</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Flow unit</div><div class="dc-step-d">the thing that flows through</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Metrics</div><div class="dc-step-d">then define performance measures</div></div>
</div>
<div class="dc-callout">Pick the <b>flow unit</b> before anything else: the basic unit that <b>moves through the process</b> and defines the output of interest. Choose it wrong and every performance measure that follows is wrong.</div>
</div>

> [!todo] Verify — AI draft from a class recording
> Built from an auto-transcript (some passages the recorder mis-heard as Malay); check figures and any names against the slides.

## Recap: competitive strategy → order winners & qualifiers

Last session's thread: your **process choice** specifies your **competitive strategy** (a *job shop* competes on **quality**; a *line* competes on **price**). Competing on one dimension does **not** mean abandoning the others — you must hold the rest at a **minimum qualifying level**.

| Term | Meaning |
| --- | --- |
| **Order winner** | The attribute that lets you *win* the competition — where you excel and define your strategy |
| **Order qualifier** | The attributes you must keep at a **minimum level** just to be considered a valid competitor |

## The process view

To quantify a business's performance, look at it as a **process** = a **set of activities that convert input into output**. The foundational rule: **you cannot manage what you cannot measure** — you must measure, then compare options, to know which is better.

## The flow unit — the load-bearing choice

> [!info] Definition
> The **flow unit** is the *basic unit that moves through a process* and defines the process **output of interest**. A good flow unit lets you consistently characterize **both input and output**, and from there define performance measures.

### Worked example — an amusement-park ride

For a roller-coaster ride (the process), which is the right flow unit? Two tests decide it:

1. **Does it flow through the system?** (enter as input, leave as output)
2. **Is it natural for defining performance measures?**

| Candidate | Flow unit? | Why |
| --- | --- | --- |
| **Riders** | ✅ **Yes** | They actually *flow through* (in → out), and directly define the natural performance measure — **number of riders processed** (throughput → revenue) |
| Employees | ❌ No | Related to **cost**, but *fixed once you hire/fire* — doesn't vary with system performance, so it can't define a performance measure directly |
| Horsepower / speed | ❌ No | Part of the **design** (a design parameter, not something that flows); influences performance but isn't itself a measure |
| Seats | ❌ No | A fixed design capacity, doesn't flow |

> The test that settles it: employees and horsepower are **design inputs** — important and cost-related, but *not used directly* to build performance metrics. Only the **rider** flows through and yields the metric.

## Key takeaways

- Process choice sets strategy; distinguish the **order winner** (where you excel) from **order qualifiers** (minimum bar on everything else).
- Model the business as a **process**: activities converting **input → output**. *You cannot manage what you cannot measure.*
- Choose the **flow unit** first — the unit that **flows through** and lets you define both input/output and the performance measures.
- Distinguish the flow unit from **design parameters** (employees, horsepower): those affect performance but don't flow and aren't direct metrics.

## Related notes

- [[ops-concepts/process-analysis|Process Analysis — process choice, flow metrics & the bottleneck]] — the concept note this lecture feeds
- [[ops-concepts/ops-2-1b|Ops 2-1b — Flow Metrics & Little's Law]] — the metrics that follow from the flow unit
- [[ops-concepts/ops-2-2|Ops 2-2 — Process Bottleneck & Capacity Analysis]]
