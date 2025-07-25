// Smooth Hero-to-Navbar Transition

let lastScrollY = 0;
let ticking = false;
window.debugMode = false;

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}

function updateNavbar() {
  const currentScrollY = window.scrollY;
  const navTitle = document.querySelector(".nav-title");
  const hero = document.querySelector(".hero");
  const subtitle = document.getElementById("subtitle");
  if (!navTitle || !hero) {
    console.error("Required elements not found - nav-title or hero section missing");
    ticking = false;
    return;
  }
  const heroRect = hero.getBoundingClientRect();
  const heroTop = heroRect.top;
  const heroBottom = heroRect.bottom;
  const heroHeight = heroRect.height;
  let heroScrollProgress = 0;
  if (heroTop <= 0 && heroBottom > 0) {
    heroScrollProgress = Math.abs(heroTop) / heroHeight;
    heroScrollProgress = Math.min(heroScrollProgress, 1);
  } else if (heroBottom <= 0) {
    heroScrollProgress = 1;
  }

  if (window.debugMode) {
    console.log("Hero scroll progress:", heroScrollProgress.toFixed(3));
  }

  if (heroScrollProgress > 0.1) {
    const fadeOpacity = Math.min((heroScrollProgress - 0.1) / 0.3, 1);
    navTitle.style.opacity = fadeOpacity;
    navTitle.style.transform = `translateY(${(1 - fadeOpacity) * -10}px)`;
    navTitle.classList.add("visible");
    navTitle.classList.remove("hidden");
  } else {
    navTitle.style.opacity = 0;
    navTitle.style.transform = "translateY(-10px)";
    navTitle.classList.add("hidden");
    navTitle.classList.remove("visible");
  }

  // Subtitle centering logic
  if (subtitle) {
    const subtitleBottom = subtitle.getBoundingClientRect().bottom;
    if (subtitleBottom < 0) {
      navTitle.classList.add("centered");
    } else {
      navTitle.classList.remove("centered");
    }
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

function onScroll() {
  requestTick();
}

function initializeScrollTransition() {
  const navTitle = document.querySelector(".nav-title");
  const hero = document.querySelector(".hero");
  if (!navTitle || !hero) {
    console.error("Failed to initialize: Required elements (.nav-title or .hero) not found");
    return;
  }
  navTitle.style.opacity = 0;
  navTitle.style.transform = "translateY(-10px)";
  navTitle.classList.add("hidden");
  window.addEventListener("scroll", onScroll, { passive: true });
  updateNavbar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeScrollTransition);
} else {
  initializeScrollTransition();
}

// Dynamic gradient border effect on hero buttons
document.querySelectorAll('.hero-btn').forEach(button => {
  button.addEventListener('mousemove', e => {
    const rect = button.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty('--x', `${x}%`);
    button.style.setProperty('--y', `${y}%`);
  });
});

// Gradient glow follows mouse on cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--x', `${x}%`);
    card.style.setProperty('--y', `${y}%`);
  });
});

// Expand/collapse logic for cards
function closeExpandedCard() {
  document.body.classList.remove("modal-open");
  const overlay = document.querySelector('.card-overlay');
  if (overlay) {
    overlay.classList.add('hide');
    setTimeout(() => overlay.remove(), 500);
  }

  document.querySelectorAll('.card.expanded').forEach(card => {
    card.classList.remove('scaled', 'expanded');
    const readLess = card.querySelector('.read-less');
    const readMore = card.querySelector('.read-more');
    if (readLess) readLess.style.display = 'none';
    if (readMore) readMore.style.display = 'block';
  });
}

// Attach click handlers to cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function(e) {
    // If already expanded or clicking 'read-less', do nothing
    if (card.classList.contains('expanded') || e.target.classList.contains('read-less')) {
      return;
    }

    if (e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault();

      // Create overlay
      let overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      document.body.appendChild(overlay);

      // Expand the card and show 'read-less'
      card.classList.add('expanded');
      // Trigger the pop-in scale on the next animation frame
      requestAnimationFrame(() => {
        card.classList.add('scaled');
      });

      const readLess = card.querySelector('.read-less');
      const readMore = card.querySelector('.read-more');
      if (readLess) readLess.style.display = 'block';
      if (readMore) readMore.style.display = 'none';

      document.body.classList.add('modal-open');
      overlay.addEventListener('click', closeExpandedCard);
    }
  });

  // 'Read More' link triggers expansion
  const readMoreLink = card.querySelector('.read-more');
  if (readMoreLink) {
    readMoreLink.addEventListener('click', function(e) {
      e.preventDefault();
      card.click();
    });
  }

  // 'Read Less' button closes the card
  const readLessBtn = card.querySelector('.read-less');
  if (readLessBtn) {
    readLessBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeExpandedCard();
    });
  }
});
