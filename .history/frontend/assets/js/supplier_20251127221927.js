// assets/js/supplier.js
import { api } from "./api.js";
import { requireSupplier } from "./protect.js";

const user = requireSupplier();
if (!user) return;

const tableBody = document.getElementById("productTable");
const addForm = document.getElementById("addProductForm");

// Load supplier products
async function loadProducts() {
  try {
    const products = await api("/products/me/list", "GET", null, true);
    tableBody.innerHTML = "";

    products.forEach((p) => {
      const tr = document.createElement("tr");
      tr.className = "border-b dark:border-gray-700 text-sm";

      tr.innerHTML = `
        <td class="p-3">${p.name}</td>
        <td class="p-3">₹${p.price}</td>
        <td class="p-3">${p.category || "-"}</td>
        <td class="p-3">
          <button class="text-blue-500 text-xs mr-3" onclick="editProduct('${p._id}', '${p.name}', ${p.price}, '${p.category || ""}')">
            Edit
          </button>
          <button class="text-red-500 text-xs" onclick="deleteProduct('${p._id}')">
            Delete
          </button>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  } catch (err) {
    alert("Failed to load products: " + err.message);
  }
}

// Add product
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    name: document.getElementById("pName").value.trim(),
    price: Number(document.getElementById("pPrice").value),
    image: document.getElementById("pImage").value.trim(),
    category: document.getElementById("pCategory").value.trim(),
    inStock: true,
    tags: [], // later we can take from UI
  };

  try {
    await api("/products", "POST", body, true);
    alert("Product added!");
    addForm.reset();
    loadProducts();
  } catch (err) {
    alert("Error adding product: " + err.message);
  }
});

// Expose edit/delete to window for inline onclick
window.editProduct = async (id, name, price, category) => {
  const newName = prompt("New name:", name) || name;
  const newPrice = Number(prompt("New price:", price) || price);
  const newCategory = prompt("New category:", category || "") || category;

  try {
    await api(`/products/${id}`, "PUT", {
      name: newName,
      price: newPrice,
      category: newCategory,
    }, true);

    alert("Product updated");
    loadProducts();
  } catch (err) {
    alert("Error updating: " + err.message);
  }
};

window.deleteProduct = async (id) => {
  if (!confirm("Delete this product?")) return;

  try {
    await api(`/products/${id}`, "DELETE", null, true);
    alert("Product deleted");
    loadProducts();
  } catch (err) {
    alert("Error deleting: " + err.message);
  }
};

// Load analytics as before if you added that API
async function loadAnalytics() {
  try {
    const stats = await api("/orders/supplier/analytics", "GET", null, true);
    document.getElementById("totalOrders").textContent = stats.totalOrders;
    document.getElementById("revenue").textContent = "₹" + stats.revenue;
  } catch (err) {
    console.warn("Analytics error:", err.message);
  }
}

loadProducts();
loadAnalytics();
