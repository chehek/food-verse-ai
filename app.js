const form = document.querySelector("#ask-form");
const input = document.querySelector("#question-input");
const answerCard = document.querySelector("#answer-card");
const answerText = document.querySelector("#answer-text");
const toast = document.querySelector("#toast");
let toastTimeout;

function getDemoAnswer(question) {
  const text = question.toLowerCase();

  if (text.includes("rice") || text.includes("leftover") || text.includes("store") || text.includes("safe")) {
    return "Refrigerate perishable leftovers within 2 hours (1 hour if it’s very hot), in shallow covered containers. Most cooked leftovers are best used within 3–4 days in a refrigerator kept at 40°F / 4°C or colder. If food was left out too long or you’re unsure how it was handled, the safest choice is to discard it. Check your local food safety guidance for details.";
  }
  if (text.includes("spinach") || text.includes("chickpea") || text.includes("make") || text.includes("ingredient")) {
    return "Try a quick spinach and chickpea skillet: warm chickpeas with olive oil, garlic, and a pinch of cumin, fold in spinach until just wilted, then finish with lemon. Serve with toast, rice, or a grain you already have. It’s flexible—use what’s on hand, and check any ingredient labels for your dietary needs.";
  }
  if (text.includes("lunch") || text.includes("meal") || text.includes("balanced") || text.includes("plan")) {
    return "A simple lunch template: pair a protein you enjoy (beans, eggs, tofu, fish, or chicken) with a grain or starchy vegetable, plenty of colorful produce, and a flavorful dressing or sauce. Adjust portions and ingredients to your appetite, preferences, and any advice from your healthcare professional.";
  }
  return "I can help you think through ingredients, meal ideas, nutrition basics, and safer food handling. Tell me what’s in your kitchen or what you’re wondering about, and I’ll offer a practical starting point. For personal medical or allergy advice, check with a qualified professional.";
}

function askQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) {
    input.focus();
    return;
  }

  answerText.textContent = getDemoAnswer(cleanQuestion);
  answerCard.hidden = false;
  answerCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  askQuestion(input.value);
});

document.querySelectorAll(".suggestion-chip, .learn-link").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;
    input.value = question;
    askQuestion(question);
  });
});

document.querySelector(".answer-close").addEventListener("click", () => {
  answerCard.hidden = true;
});

document.querySelectorAll(".save-recipe").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!saved));
    button.textContent = saved ? "♡" : "♥";
    showToast(saved ? "Recipe removed from your saved list." : "Recipe saved for later.");
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelector("#refresh-insights").addEventListener("click", () => {
  showToast("Your daily snapshot is up to date.");
});

document.querySelector("#view-details").addEventListener("click", () => {
  showToast("Your daily snapshot is a general wellness overview.");
});

document.querySelector("#plan-button").addEventListener("click", () => {
  showToast("Meal planning is coming soon. Your preferences will be at the center.");
});

document.querySelector(".notification-button").addEventListener("click", () => {
  showToast("You’re all caught up!");
});

const navigationLinks = document.querySelectorAll(".nav-link");
const sections = [...navigationLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${visible.target.id}`;
    link.classList.toggle("active", isActive);
  });
}, { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.1, 0.4] });

sections.forEach((section) => sectionObserver.observe(section));
