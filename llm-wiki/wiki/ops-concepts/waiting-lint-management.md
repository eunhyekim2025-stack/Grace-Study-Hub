---
title: "Waiting Lint Management"
tags: ["lecture", "recording"]
sources: ["In-class recording — Waiting Lint Management (2026-09-10, in-site recorder / Groq transcript)"]
kind: 개념
relations:
  part-of: [operations-management]
created: 2026-09-10
recording:
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-000-GO8EOPqlY9p3UzNvWGL2sj4TqCXud1.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-001-V0Bx5wNxJ4oUJZx3xwcILTNI2P70K0.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-002-znKzwwWjaHnvyPusisLTuUxYk77GLM.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-003-QZCAiX2unUZqCwjNS9IccPML8VL3Lg.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-004-VE6tylVH4gOQ9uZ4ANiD4RMLwJhb81.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-005-Wp5uskdeFsmPFlm6XwWMDRolhVYteW.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-006-JXUJosTQEuNTTnSU2y4PXe0weaXZTR.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-007-DFk9ElTt3AKGP6NjOjfGdloC2i9PDP.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-008-rULflL3z0aoWn0Cr1u7zxPExp60iJH.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-009-AdFq0eUkoqPgDijtyUyIGazinLxgkK.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-010-t3WDUVChKHozuAZHgksAtgzSeLqsir.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-011-mqeqoKJwYxzD7hlFc1JXYsXSycz5qW.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-012-LVeNj4OT4xaazTcRVXjRqcLHJIkSPs.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-013-nNYm1n5We2F9tgWr7PuhW4FlVHp9wh.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-014-lvm4dOnaifJ04qTdxDt58EL1Az4ouf.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-015-zW1gLIpkUlGwDXRTtwp3rNFNd5SNGr.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-016-AxfpxS6o5NDa6EkybidRJKvUhQOLwH.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-017-4qPQvVgv1Q3gJ2adIrHqQVvrSLhYzr.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-018-nzw8w5lrwz8cdr54LLvKied0aKTN4M.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-019-7bujRlaHzqDw12njfQrYQKHlMkOHc1.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-020-En4WD3UWmQVXJkzzI62rG23j3uy2aq.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-021-rQMzVlptujKFAFgyHKiXkMvqOkdN3l.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-022-2OXNvUdWg0jRfQ8F3mgf86kmdmTcwc.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-023-RuusLJ5oaApuLYr6KLva6SX5XawsXI.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-024-d2xwCiMGtVwdb8petp72ANwkmTKSul.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-025-tosKk3VChDdPZP2jKh3fIUXyIWkwfX.webm"
  - "recordings/operations-management/2026-09-10-waiting-lint-management/seg-026-8YG8PZ4Zn3T1BHhwlkYJ8Yu1BjwP8E.webm"
---

> [!note] 🎙️ Original recording archived privately (27 segments) in your Vercel Blob store — not published here.

<div class="dc-view"><div class="dc-title">Waiting Lint Management</div><div class="dc-sub">Balancing variability, capacity, and inventory to minimize queues</div><div class="dc-flow"><div class="dc-step"><div class="dc-step-n">1</div><div class="dc-step-t">Measure variability</div><div class="dc-step-d">CV of arrivals & service, processing‑time spread</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">2</div><div class="dc-step-t">Choose mitigation</div><div class="dc-step-d">Add capacity (more servers) or reduce variability (automation, standardization)</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">3</div><div class="dc-step-t">Apply buffering</div><div class="dc-step-d">Limited WIP/queue as short‑term buffer when stages have similar speed</div></div><div class="dc-arrow">→</div><div class="dc-step"><div class="dc-step-n">4</div><div class="dc-step-t">Evaluate performance</div><div class="dc-step-d">Throughput, Wq, Ws, utilization, cost</div></div></div></div>

> [!summary] Key takeaways  
- Greater processing‑time uncertainty lengthens cycle time and raises waiting.  
- Primary remedy: eliminate or shrink variability (automation, standard work).  
- Secondary remedy: add capacity or use limited WIP/queues when stages are balanced.  
- In services, “inventory” = waiting space; its cost is customers’ time.  
- Staffing: pick the smallest number of servers that meets a service‑level target given λ, μ, and their CVs.

## 1. Variability and Its Consequences
- **Processing‑time spread** (e.g., Uniform 0.5–1.5 min) makes average cycle time > deterministic 1 min.  
- Bottleneck can **shift**: faster Stage A → Stage B blocks; slower Stage A → Stage B starves.  
- Larger **coefficient of variation (CV)** → lower effective capacity, higher queue lengths.  

> [!info] **Variability** – Random fluctuation in arrival or service times, quantified by CV = σ/μ.

> [!warning] Ignoring variability and relying solely on average rates leads to chronic under‑capacity and excess waiting.

## 2. Mitigation Strategies
| Strategy | How it works | When it helps |
|----------|--------------|---------------|
| **Reduce variability** (automation, standardization) | Narrows processing‑time distribution, stabilizes bottleneck | High CV, frequent bottleneck shifts |
| **Increase capacity** (add servers, faster equipment) | Lowers traffic intensity ρ = λ/(N·μ) | Persistent slower stage, high λ |
| **Limited buffering (WIP inventory)** | Small queue absorbs short‑term mismatches when stage speeds are similar | Balanced average speeds, short‑term spikes |

> [!info] **Pooling** – Sharing resources (e.g., a common buffer) to smooth variability across stages.

> [!warning] Adding inventory to a line with a permanently slower stage only accumulates work‑in‑process without improving throughput.

## 3. Waiting Space as “Inventory” in Services
- Service industries cannot stock finished goods; **queues become inventory**.  
- Waiting cost includes facility space, idle staff time, and **customer time** (often expressed as a lifetime fraction).  
- Goal: keep queue length short enough to meet a **target wait** (e.g., ≤ 20 min at a car‑service center).

## 4. Queue Performance Metrics & Staffing Decision
- **Traffic intensity** ρ = λ / (N·μ). Keep ρ well < 1 to avoid exploding queues.  
- **Average waiting in queue** Wq and **system time** Ws = Wq + 1/μ are the primary KPIs.  
- **Decision rule**: Choose the smallest N such that Wq (or a service‑level percentile) ≤ target.  

> [!example] *Clinic*: Fixed 5‑min appointments, service μ = 15 calls/h, utilization 80 %. When service times vary 2–7 min, patients wait despite unchanged utilization.

## 5. Practical Applications
- **Call center** – Decide number of operators (N). Push toward more staff if λ ↑, CV(arrival) ↑, or service CV ↑. Push toward fewer staff if arrivals are stable and cost pressure high.  
- **Café** – Cannot pre‑make products; must balance staff speed (capacity) against order variability to avoid long lines.  
- **Railway analogy** – Adding more trains (servers) and shortening intervals reduces passenger waiting, same principle for any queue.

## 6. Planning with a Target EQ (Efficiency Quotient)
1. **Set target wait** (e.g., ≤ 20 min).  
2. Identify three drivers:  
   - **Time factor** – allocated task time.  
   - **Utilization factor** – resource intensity.  
   - **Capability factor** – skill level; higher capability can offset longer time.  
3. Use the (forthcoming) formula linking operations, capability, utilization, and time to compute required resources directly, avoiding trial‑and‑error.

> [!info] **EQ (Efficiency Quotient)** – Desired performance metric that ties together throughput, wait, and resource usage.

## Key terms
| Term | Meaning |
|------|---------|
| Variability | Random spread in arrival or service times (measured by CV). |
| Capacity (cross‑capacity, “lintas”) | Maximum sustainable processing rate; can be increased by adding servers or speeding up work. |
| Buffer / WIP inventory | Limited queue used to absorb short‑term mismatches when stage speeds are similar. |
| Traffic intensity (ρ) | λ / (N·μ); proportion of capacity used. |
| EQ (Efficiency Quotient) | Target performance metric linking wait time, utilization, and capability. |
