// Time-of-day greeting on the dashboard. The h1 is baked at build time, so we
// rewrite it client-side to match the *visitor's* local clock. Runs on load and
// on every SPA nav (guarded — no-op when the greeting isn't on the page).
function setGreeting() {
  const el = document.getElementById("sh-greeting")
  if (!el) return
  const h = new Date().getHours()
  let text: string, emoji: string
  if (h >= 5 && h < 12) {
    text = "Good morning"
    emoji = "☀️"
  } else if (h >= 12 && h < 17) {
    text = "Good afternoon"
    emoji = "🌤️"
  } else if (h >= 17 && h < 22) {
    text = "Good evening"
    emoji = "🌆"
  } else {
    text = "Good night"
    emoji = "🌙"
  }
  el.textContent = `${text}, Grace ${emoji}`
}

document.addEventListener("nav", setGreeting)
setGreeting()
