// assets/js/supplier_dashboard.js
import { apiFetch, getUser } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('createProductForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = form.querySelector('input[name="title"]').value.trim();
      const description = form.querySelector('textarea[name="description"]').value.trim();
      const price = Number(form.querySelector('input[name="price"]').value);
      const stock = Number(form.querySelector('input[name="stock"]').value);
      const images = []; // add image handling if you want later

      const { status, data } = await apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify({ title, description, price, stock, images })
      });
      if (status === 200 || status === 201) {
        alert('Product created');
        form.reset();
      } else {
        alert(data?.message || 'Product creation failed');
      }
    });
  }

  // optionally list own products
  const listBtn = document.getElementById('loadProductsBtn');
  if (listBtn) {
    listBtn.addEventListener('click', async () => {
      const { status, data } = await apiFetch('/products');
      if (status === 200) {
        // render products
        console.log(data);
      } else {
        alert('Could not load products');
      }
    });
  }
});


document.getElementById("addProductForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/products/create", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ name, price, image }),
    });

    const data = await res.json();

    if (res.ok) {
        alert("Product added!");
        loadProducts();
    } else {
        alert(data.error || "Failed to add product");
    }
});
