const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== Animações ao rolar a página =====
const revealElements = document.querySelectorAll(".reveal, .reveal-item");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ===== Contadores animados =====
const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const suffix = target === 100 ? "%" : "+";
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 42));

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = `${target}${suffix}`;
        return;
      }

      counter.textContent = `${current}${suffix}`;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.8 });

counters.forEach((counter) => {
  counterObserver.observe(counter);
});
