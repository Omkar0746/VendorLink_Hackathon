import { api } from "./api.js";
import { getUser } from "./utils.js";

const user = getUser();
if (!user || user.role !== "supplier") window.location.href = "login.html";

// Elements
const tableBody = document.getElementById("productTable");
const addForm = document.getElementById("addProductForm");

// Load Supplier's Products
async function loadProducts() {
  try {
    const products = await api("/products/me/list", "GET", null, true);

    tableBody.innerHTML = "";

    products.forEach((p) => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-gray-700";

      tr.innerHTML = `
        <td class="p-3">${p.name}</td>
        <td class="p-3">₹${p.price}</td>
        <td class="p-3">${p.category}</td>
        <td class="p-3 flex gap-3">
          <button class="text-blue-500 text-sm" onclick='editProduct("${p._id}", "${p.name}", "${p.price}", "${p.category}")'>
            Edit
          </button>
          <button class="text-red-500 text-sm" onclick='deleteProduct("${p._id}")'>
            Delete
          </button>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  } catch (err) {
    alert(err.message);
  }
}

// Add Product
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    name: document.getElementById("pName").value,
    price: document.getElementById("pPrice").value,
    image: document.getElementById("pImage").value,
    category: document.getElementById("pCategory").value
  };

  try {
    await api("/products", "POST", body, true);
    alert("Product added!");
    addForm.reset();
    loadProducts();
    loadAnalytics();
  } catch (err) {
    alert(err.message);
  }
});

// Edit Product
window.editProduct = async (id, name, price, category) => {
  const newName = prompt("New Name:", name);
  const newPrice = prompt("New Price:", price);
  const newCat = prompt("New Category:", category);

  try {
    await api(`/products/${id}`, "PUT", {
      name: newName,
      price: newPrice,
      category: newCat
    }, true);

    alert("Updated!");
    loadProducts();
  } catch (err) {
    alert(err.message);
  }
};

// Delete Product
window.deleteProduct = async (id) => {
  if (!confirm("Delete this product?")) return;

  try {
    await api(`/products/${id}`, "DELETE", null, true);
    alert("Deleted");
    loadProducts();
    loadAnalytics();
  } catch (err) {
    alert(err.message);
  }
};

// Analytics
async function loadAnalytics() {
  try {
    const stats = await api("/orders/supplier/analytics", "GET", null, true);
    document.getElementById("totalOrders").textContent = stats.totalOrders;
    document.getElementById("revenue").textContent = "₹" + stats.revenue;
  } catch (err) {
    console.log("Analytics error:", err.message);
  }
}

loadProducts();
loadAnalytics();
