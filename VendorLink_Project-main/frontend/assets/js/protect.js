// assets/js/protect.js

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

export function requireVendor() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login as Vendor first.");
    window.location.href = "login.html";
    return null;
  }

  if (user.role !== "vendor") {
    alert("Vendors only page.");
    window.location.href = "index.html";
    return null;
  }

  return user;
}
