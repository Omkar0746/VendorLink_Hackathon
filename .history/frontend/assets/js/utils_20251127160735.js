export function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function protectPage(requiredRole = null) {
  const token = localStorage.getItem("token");
  const user = getUser();
  if (!token || !user) {
    window.location.href = "login.html";
    return;
  }
  if (requiredRole && user.role !== requiredRole) {
    alert("You are not allowed to view this page.");
    window.location.href = "index.html";
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Dark mode
export function initThemeToggle() {
  const html = document.documentElement;
  const stored = localStorage.getItem("theme") || "light";
  if (stored === "dark") html.classList.add("dark");

  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
