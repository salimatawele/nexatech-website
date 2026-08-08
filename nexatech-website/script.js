// ===== NexaTech — script.js =====

// Mobile menu toggle
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

// Close the menu after clicking a link (mobile)
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Current year in the footer
document.getElementById("year").textContent = String(new Date().getFullYear());

// Contact form (visual only, no real email is sent)
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name;
  const email = form.email;
  const message = form.message;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  [name, email, message].forEach((f) => f.classList.remove("invalid"));

  let error = "";
  if (!name.value.trim()) {
    name.classList.add("invalid");
    error = "Please enter your name.";
  } else if (!emailPattern.test(email.value.trim())) {
    email.classList.add("invalid");
    error = "Please enter a valid email address.";
  } else if (!message.value.trim()) {
    message.classList.add("invalid");
    error = "Please write a short message.";
  }

  if (error) {
    status.textContent = error;
    status.className = "form-status error";
    return;
  }

  status.textContent = "Thanks! Your message has been sent.";
  status.className = "form-status success";
  form.reset();

  setTimeout(() => {
    status.textContent = "";
    status.className = "form-status";
  }, 4000);
});

// Scroll reveal animation
const revealTargets = document.querySelectorAll(
  ".about > div, .about-img, .card, .project, .contact > div, .form",
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealTargets.forEach((el) => observer.observe(el));
