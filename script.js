const revealItems = document.querySelectorAll(".reveal");
const faqItems = document.querySelectorAll(".faq-item");
const form = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav a, .nav-cta");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => faq.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");
    const room = data.get("room");
    const date = data.get("date");

    formMessage.textContent = `${name}, заявка на ${room} на ${date} принята в демо-режиме.`;
    form.reset();
  });
}

if (menuToggle && topbar) {
  menuToggle.addEventListener("click", () => {
    topbar.classList.toggle("menu-active");
    document.body.classList.toggle("menu-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      topbar.classList.remove("menu-active");
      document.body.classList.remove("menu-open");
    });
  });
}


