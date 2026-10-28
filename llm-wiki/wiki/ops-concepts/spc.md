---
title: "Statistical Process Control (SPC) & Process Capability"
tags: [operations-management, opim201, quality, spc, control-chart, process-capability, six-sigma, conformance-quality, variation]
sources: ["SMU OPIM 201 Session 12 — Quality Management: Statistical Process Control (Cachon & Terwiesch, Ch. 7)"]
updated: 2026-10-28
kind: 개념
relations:
  part-of: [operations-management]
  see-also: [ops-concepts/process-analysis, ops-concepts/forecasting]
---

<div class="dc-view">
<div><div class="dc-title">Statistical Process Control</div><div class="dc-sub">Don't inspect defects out of the product — keep variation out of the process</div></div>
<div class="dc-flow">
<div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Conformance analysis</div><div class="dc-step-d">Is the process <b>in control</b>? x̄ & R charts catch assignable-cause variation</div></div>
<div class="dc-arrow">→</div>
<div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Process capability</div><div class="dc-step-d">If in control, how <b>capable</b>? C<sub>p</sub> = (USL − LSL) ⁄ 6σ</div></div>
</div>
<div class="dc-callout"><b>Process-focused, not product-focused.</b> Catch abnormal variation in the <i>process</i> before it turns into a defective <i>product</i> — prevention beats inspection.</div>
</div>

# Statistical Process Control (SPC) & Process Capability

> [[operations-management|← Operations Management]] · The quality half of the course: use statistics to tell whether a process's output conforms to its design specification — and act on the **process**, not the finished unit.

---

## Quality: design vs conformance

**Quality** = the ability to consistently meet or exceed customer expectations. Two faces:

| | Design quality | **Conformance quality** *(SPC's focus)* |
|---|---|---|
| What | The inherent value designed into the product — does the design meet customer needs vs competitors? | The degree to which output **matches the design spec** — how many defects does the process produce? |
| Owned by | Design / marketing | **Operations** (the production & delivery process) |

A customer requirement is a **tolerance range / specification limits**: $A \pm B$ — target $A$, **USL** $=A+B$, **LSL** $=A-B$ (set by the **customer**). *A bag of M&M's = 45 g ± 3 g → LSL 42 g, USL 48 g.* A unit is a **defect** if it falls outside the spec.

> [!note] Defects compound
> With 8 car parts each at 95% yield, a defect-free car has only $0.95^8 \approx 66\%$ chance. The more complex the product, the higher each part's yield must be.

---

## Inspect, or prevent?

**Inspection** ("inspect quality *into* the product") is common but weak: often **too costly or too late**, never perfect (rare defects slip through), doesn't remove scrap/rework cost, **removes responsibility**, adds non-value-added cost, and can become a bottleneck. **Prevention is better** — quality at the source, nip problems in the bud, find root causes earlier.

> [!info] Juran's Cost-of-Quality model
> **Cost of conformance** — *Prevention* (planning, training, process capability work) + *Appraisal* (inspection, test, calibration). **Cost of poor quality** — *Internal failure* (yield loss, rework, scrap, before delivery) + *External failure* (warranty, recalls, lost goodwill, after delivery). Spending on prevention/appraisal buys down the far larger failure costs.

---

## The two kinds of variation

Defects are driven by **variability**. Some is unavoidable, but distinguish:

- **Common-cause (random/chance) variation** — inherent, causes purely random and unidentifiable (a machine can't fill every bag to *exactly* 45 g).
- **Assignable-cause variation** — causes that **can be identified and eliminated** (tool wear, equipment needing adjustment, defective materials, an operator not following procedure or needing training).

SPC exists to **detect and remove assignable-cause variation.**

---

## Step 1 — Conformance analysis with control charts

A process is **in control** (stable) if there is **no assignable-cause variation**; otherwise it is **out of control**. A **control chart** plots a sample statistic over time against a **centre line (CL)**, **upper control limit (UCL)** and **lower control limit (LCL)**. A point **outside the limits** signals an assignable cause to investigate.

**Sampling:** take $k$ samples of size $N$; for each, record the sample **mean** $\bar{x}_j$ and the **range** $R_j = \max - \min$. Then $\bar{\bar{x}} = \text{mean of the } \bar{x}_j$ and $\bar{R} = \text{mean of the } R_j$.

| Chart | Monitors | Centre | UCL | LCL |
|---|---|---|---|---|
| **x̄ chart** | process **mean** | $\bar{\bar{x}}$ | $\bar{\bar{x}} + A_2\bar{R}$ | $\bar{\bar{x}} - A_2\bar{R}$ |
| **R chart** | process **variability** | $\bar{R}$ | $D_4\,\bar{R}$ | $D_3\,\bar{R}$ |

Control-chart factors by sample size $N$:

| $N$ | $A_2$ | $D_3$ | $D_4$ | $d_2$ |
|--|--|--|--|--|
| 2 | 1.880 | 0 | 3.268 | 1.128 |
| 3 | 1.023 | 0 | 2.574 | 1.693 |
| 4 | 0.729 | 0 | 2.282 | 2.059 |
| 5 | 0.577 | 0 | 2.114 | 2.326 |
| 6 | 0.483 | 0 | 2.004 | 2.534 |

> [!example] M&M's — control limits ($\bar{\bar{x}}=44.96,\ \bar{R}=2.16,\ N=4$)
> x̄ chart: $44.96 \pm 0.729(2.16) \Rightarrow$ **UCL 46.54, LCL 43.38**. R chart: UCL $=2.282(2.16)=$ **4.92**, LCL $=0(2.16)=$ **0**. Plot the next shift's sample means against *these* limits; a point outside ⇒ out of control ⇒ investigate.

**Investigating the assignable cause:** the **Ishikawa (fishbone / cause-effect) diagram** brainstorms root causes across *Specifications/Information · Machines · Methods · People · Materials*; the **Five Whys** keeps asking "why?" so you reach the root cause, not a symptom.

> [!warning] Control limits ≠ specification limits
> **UCL/LCL** (from the *process's own* variation) are **not** USL/LSL (from the *customer*). A process can be **in control yet defective** (stable but centred wrong / too wide for spec) **or out of control yet within spec**. And a point outside the control limits does **not** mean a defect was produced — only that the process changed.

---

## Step 2 — Process capability ($C_p$)

Compute **only when the process is in control.** With output $\sim N(\mu,\sigma)$ and (for this measure) the process mean assumed on target:

$$\boxed{\,C_p = \dfrac{\text{USL} - \text{LSL}}{6\sigma}\,}$$

$C_p$ says **how many standard deviations fit between the mean and a spec limit** — recall $[\mu-3\sigma,\ \mu+3\sigma]$ captures 99.73% of output. The smaller $\sigma$, the larger $C_p$, the lower the defect probability.

> [!example] M&M's ($\mu=45,\ \text{spec }42\text{–}48$)
> $\sigma=1 \Rightarrow C_p=\frac{6}{6(1)}=1$ (spec is ±3σ, **0.27%** defect ≈ 2,700 ppm). $\sigma=0.5 \Rightarrow C_p=2$ (±6σ, far fewer defects). $\sigma=3 \Rightarrow C_p=\tfrac13$ (±1σ, many more defects). **Lower variability ⇒ higher $C_p$ ⇒ fewer defects.**

| $C_p$ | σ's to spec | P{defect} | Defects per million |
|--|--|--|--|
| 1/3 | 1 | 0.317 | 317,000 |
| 2/3 | 2 | 0.0455 | 45,500 |
| **1** | **3** | **0.0027** | **2,700** |
| 4/3 | 4 | 0.0001 | 63 |
| 5/3 | 5 | 6×10⁻⁷ | 0.6 |
| **2** | **6** | 2×10⁻⁹ | **~0.00** |

> [!important] Estimating σ (the two standard deviations)
> $\sigma$ in $C_p$ is the spread of **individual readings** — estimate it as $\sigma = \bar{R}/d_2$. This is **not** $\sigma_{\bar{x}}$, the spread of **sample averages** used in the control limits ($\sigma_{\bar{x}} = \sigma/\sqrt{N}$). *M&M's:* $\sigma = 2.16/2.059 \approx 1.049$, so $C_p = 6 / (6 \times 1.049) \approx \mathbf{0.95}$.

---

## Six Sigma

- Juran suggested a target $C_p = 4/3$ (4σ). **Bill Smith at Motorola** pioneered **Six Sigma** in 1986 with a target $C_p = 2$ — the mean sits **6σ** from each spec limit, an astounding ~2 defects per *billion*.
- Six Sigma grew from a statistical target into a **continuous-improvement philosophy**: relentlessly **reduce variance ($\sigma$)**. Firms tend to **underestimate** the sigma level that minimises long-term total cost (Smith's key insight) — the right level trades the cost of defects against the cost of improvement.
- The improvement **cycle** never ends: *conformance analysis → eliminate the assignable cause → capability analysis → improve $C_p$ →* repeat. It works best for **high conformance quality at low cost in repetitive operations**.

> [!tip] To cut defects, you can move the mean or shrink the variance
> Re-centring the process mean onto the target is usually **easier** than reducing variability — but reducing $\sigma$ is what raises $C_p$ permanently.

## Related notes

- [[ops-concepts/process-analysis|Process Analysis]] — the process whose variation SPC monitors; capability ties to yield loss
- [[ops-concepts/forecasting|Forecasting]] — the other place the Normal distribution and σ drive the numbers
- [[ops-concepts/newsvendor|Newsvendor]] — σ as the measure of uncertainty you plan against
