export function requireSupplier() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login as Supplier first.");
    window.location.href = "login.html";
    return null;
  }

  if (user.role !== "supplier") {
    alert("Only suppliers can access this page.");
    window.location.href = "index.html";
    return null;
  }

  return user;
}
