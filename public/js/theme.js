(() => {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    updateBtn();
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function isDarkActive() {
    return root.getAttribute("data-theme") === "dark";
  }

  function updateBtn() {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;
    const icon = btn.querySelector("i");
    if (icon) {
      icon.className = isDarkActive() ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    btn.setAttribute("aria-label", isDarkActive() ? "Switch to light mode" : "Switch to dark mode");
  }

  // Listen for system theme changes (only applies if user hasn't set a preference)
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  // Initialize on DOM ready to ensure the button exists
  function init() {
    applyTheme(getPreferredTheme());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.toggleTheme = function () {
    const next = isDarkActive() ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };
})();