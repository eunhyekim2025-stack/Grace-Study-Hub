// Wires the "🖨 프린트" button to the browser's print dialog (which also offers
// "Save as PDF"). The heavy lifting is CSS: the `@media print` block in
// custom.scss hides the top bar, sidebars, footer and on-screen buttons so only
// the article is printed. Rebound on every SPA nav.
function initPrint() {
  const btn = document.getElementById("sh-print-btn")
  if (!btn || btn.dataset.bound === "1") return
  btn.dataset.bound = "1"
  btn.addEventListener("click", () => window.print())
}

document.addEventListener("nav", initPrint)
initPrint()
