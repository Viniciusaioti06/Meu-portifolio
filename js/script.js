/* ===== MENU MOBILE ===== */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha ao clicar em um link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ===== HEADER: sombra ao rolar ===== */
const header = document.getElementById("site-header");

if (header) {
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ===== ACTIVE NAV LINK (highlight da seção visível) ===== */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

if (sections.length && navItems.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle(
              "active",
              href === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));
}

/* ===== REVEAL AO ROLAR ===== */
const revealEls = document.querySelectorAll(".reveal, .reveal-item, .reveal-delay");

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ===== CONTADORES ANIMADOS ===== */
const counters = document.querySelectorAll("[data-count]");

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.count);
        const isPercent = target === 100;
        const suffix = isPercent ? "%" : "+";
        const duration = 900; // ms
        const startTime = performance.now();

        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out quart
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.round(eased * target);

          el.textContent = `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = `${target}${suffix}`;
          }
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.8 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}
