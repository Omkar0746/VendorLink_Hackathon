// assets/js/supplier.js
import { api } from "./api.js";
import { getUser } from "./utils.js";

const user = getUser();
if (!user || user.role !== "supplier") {
  window.location.href = "login.html";
}

const tableBody = document.getElementById("productTable");
const addForm = document.getElementById("addProductForm");

async function loadProducts() {
  try {
    const products = await api("/products/me/list", "GET", null, true);
    tableBody.innerHTML = "";

    products.forEach((p) => {
      const tr = document.createElement("tr");
      tr.className = "text-gray-700 dark:text-gray-200";

      tr.innerHTML = `
        <td class="p-3">${p.name}</td>
        <td class="p-3">₹${p.price}</td>
        <td class="p-3">${p.category || ""}</td>
        <td class="p-3 space-x-3">
          <button class="text-blue-500 text-xs" onclick="editProduct('${p._id}', '${p.name}', '${p.price}', '${p.category || ""}')">Edit</button>
          <button class="text-red-500 text-xs" onclick="deleteProduct('${p._id}')">Delete</button>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  } catch (err) {
    alert(err.message);
  }
}

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    name: document.getElementById("pName").value.trim(),
    price: Number(document.getElementById("pPrice").value),
    image: document.getElementById("pImage").value.trim(),
    category: document.getElementById("pCategory").value.trim(),
  };

  try {
    await api("/products", "POST", body, true);
    alert("Product added");
    addForm.reset();
    loadProducts();
    loadAnalytics();
  } catch (err) {
    alert(err.message);
  }
});

// Expose to window for inline onclick
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
    alert(err.message);
  }
};

window.deleteProduct = async (id) => {
  if (!confirm("Delete this product?")) return;

  try {
    await api(`/products/${id}`, "DELETE", null, true);
    alert("Product deleted");
    loadProducts();
    loadAnalytics();
  } catch (err) {
    alert(err.message);
  }
};

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
