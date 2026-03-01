// assets/js/supplier_dashboard.js

import { api } from "./api.js";
import { requireSupplier } from "./protect.js";

// Ensure supplier is logged in
const user = requireSupplier();
if (!user) return;

// === Load Analytics ===
async function loadDashboard() {
  try {
    const res = await api("/orders/supplier/analytics", "GET");
    document.getElementById("totalOrders").textContent = res.totalOrders;
    document.getElementById("revenue").textContent = "₹" + res.revenue;
  } catch (err) {
    alert("Failed to load analytics");
  }
}

loadDashboard();

// === Add Product ===
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("pname").value,
    image: document.getElementById("pimage").value,
    category: document.getElementById("pcategory").value,
    price: document.getElementById("pprice").value,
  };

  try {
    await api("/products", "POST", product);
    alert("Product Added!");
    window.location.reload();
  } catch (err) {
    alert(err.message);
  }
});
