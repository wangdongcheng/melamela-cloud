const scene = document.querySelector(".scene");
const toggle = document.querySelector(".motion-toggle");
const toggleIcon = toggle.querySelector(".motion-toggle__icon");
const toggleLabel = toggle.querySelector(".motion-toggle__label");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let pointerFrame = 0;

function updatePointer(event) {
  if (scene.classList.contains("is-paused") || reduceMotion.matches) return;

  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    scene.style.setProperty("--pointer-x", x.toFixed(3));
    scene.style.setProperty("--pointer-y", y.toFixed(3));
  });
}

function setPaused(paused) {
  scene.classList.toggle("is-paused", paused);
  toggle.setAttribute("aria-pressed", String(paused));
  toggleIcon.textContent = paused ? "▶" : "Ⅱ";
  toggleLabel.textContent = paused ? "Play motion" : "Pause motion";

  if (paused) {
    scene.style.setProperty("--pointer-x", "0");
    scene.style.setProperty("--pointer-y", "0");
  }
}

window.addEventListener("pointermove", updatePointer, { passive: true });
window.addEventListener("pointerleave", () => {
  scene.style.setProperty("--pointer-x", "0");
  scene.style.setProperty("--pointer-y", "0");
});

toggle.addEventListener("click", () => {
  setPaused(!scene.classList.contains("is-paused"));
});

if (reduceMotion.matches) setPaused(true);
