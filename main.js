  window.addEventListener("DOMContentLoaded", function () {
    const navTitle = document.querySelector(".nav-title");
    const heroTitle = document.querySelector(".hero-title");

    const observer = new IntersectionObserver(
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
      observer.observe(heroTitle);
    }
  });