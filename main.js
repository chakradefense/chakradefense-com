window.addEventListener("DOMContentLoaded", function () {
  const navTitle = document.querySelector(".nav-title");
  const heroTitle = document.querySelector(".hero-title");

  // Navbar title visibility based on scroll
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        navTitle.classList.add("visible");
      } else {
        navTitle.classList.remove("visible");
      }
    },
    {
      threshold: 0.1
    }
  );

  if (heroTitle) {
    heroObserver.observe(heroTitle);
  }

  // Fade-in cards when in viewport
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  document.querySelectorAll(".card").forEach((card) => {
    cardObserver.observe(card);
  });
});

// Smooth scroll function (used by back-to-top if needed)
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
    const time = timestamp - startTime;
    const percent = Math.min(time / duration, 1);
    const eased = easeInOutQuad(percent);

    window.scrollTo(0, startY + diff * eased);

    if (time < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Back to top button logic
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
