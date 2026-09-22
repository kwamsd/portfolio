const phrase = "Étudiant en data & IA";
const output = document.querySelector(".typing");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themeToggle = document.querySelector(".theme-toggle");

let index = 0;
let erasing = false;
let timer;

function typeLoop() {
  if (!output) return;
  if (reducedMotion.matches) {
    output.textContent = phrase;
    return;
  }

  output.textContent = phrase.slice(0, index);

  if (!erasing && index < phrase.length) {
    index += 1;
    timer = window.setTimeout(typeLoop, 85);
  } else if (!erasing) {
    erasing = true;
    timer = window.setTimeout(typeLoop, 1800);
  } else if (index > 0) {
    index -= 1;
    timer = window.setTimeout(typeLoop, 42);
  } else {
    erasing = false;
    timer = window.setTimeout(typeLoop, 550);
  }
}

reducedMotion.addEventListener("change", () => {
  window.clearTimeout(timer);
  index = 0;
  erasing = false;
  typeLoop();
});

if (output) typeLoop();

document.querySelector("#year").textContent = new Date().getFullYear();

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Activer le mode clair" : "Activer le mode sombre");
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Mode clair" : "Mode sombre";
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
}

setTheme(localStorage.getItem("portfolio-theme") === "dark");
themeToggle.addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));
