// js/supplier_dashboard.js
import { getToken } from './auth.js';

async function getProductsForSupplier() {
  // show all products and filter by supplierId on UI OR fetch all and filter client side
  const res = await fetch('http://localhost:5000/api/products');
  const products = await res.json();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const myProducts = products.filter(p => p.supplierId === user.id || (p.supplierId && p.supplierId._id === user.id));
  renderProductList(myProducts);
}

function renderProductList(products) {
  const container = document.getElementById('supplierProductList');
  container.innerHTML = '';
  products.forEach(p => {
    const row = document.createElement('div');
    row.innerHTML = `
      <strong>${p.title}</strong> - ₹${p.price}
      <button data-id="${p._id}" class="edit">Edit</button>
      <button data-id="${p._id}" class="delete">Delete</button>
    `;
    container.appendChild(row);
  });
}

document.addEventListener('click', async (e) => {
  if (e.target.matches('.delete')) {
    const id = e.target.dataset.id;
    const token = localStorage.getItem('token');
    if (!confirm('Delete this product?')) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`}
    });
    getProductsForSupplier();
  }
  if (e.target.matches('.edit')) {
    // implement edit modal/form prefill -> call PUT /api/products/:id
  }
});

document.getElementById('createProductForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const title = document.getElementById('prodTitle').value;
  const price = parseFloat(document.getElementById('prodPrice').value);
  const description = document.getElementById('prodDescription').value;
  const body = { title, price, description, stock: 10, images: [] };
  const res = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json();
    alert(err.message || 'Error creating product');
    return;
  }
  document.getElementById('createProductForm').reset();
  getProductsForSupplier();
});

document.addEventListener('DOMContentLoaded', () => {
  getProductsForSupplier();
});
