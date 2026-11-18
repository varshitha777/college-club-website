const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("gdg-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const lightMode = document.body.classList.contains("light");
  localStorage.setItem("gdg-theme", lightMode ? "light" : "dark");
  themeToggle.textContent = lightMode ? "☀" : "☾";
});

const tabs = document.querySelectorAll(".tab");
const eventCards = document.querySelectorAll(".event-card");
const eventEmpty = document.getElementById("eventEmpty");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-pressed", "true");
    const selected = tab.dataset.filter;
    let visibleCount = 0;

    eventCards.forEach(card => {
      const showCard = selected === "all" || card.dataset.type === selected;
      card.hidden = !showCard;
      if (showCard) visibleCount++;
    });

    eventEmpty.hidden = visibleCount !== 0;
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 450);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
