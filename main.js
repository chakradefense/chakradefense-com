// main.js
window.addEventListener("DOMContentLoaded", function () {
  // — NAVBAR TITLE FADE-IN/OUT —
  const navTitle  = document.querySelector(".nav-title");
  const heroTitle = document.querySelector(".hero-title");

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        navTitle.classList.add("visible");
      } else {
        navTitle.classList.remove("visible");
      }
    },
    { threshold: 0.1 }
  );
  if (heroTitle) heroObserver.observe(heroTitle);

  // — CARD FADE-IN ON SCROLL —
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".card").forEach((card) => {
    cardObserver.observe(card);
  });

  // — BACK‑TO‑TOP BUTTON —
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    // show / hide
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 300);
    });

    // smooth scroll on click
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// (Optional) If you ever need a custom easing, you can still use this helper:
function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const time    = timestamp - startTime;
    const percent = Math.min(time / duration, 1);
    const eased   = easeInOutQuad(percent);

    window.scrollTo(0, startY + diff * eased);

    if (time < duration) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}
