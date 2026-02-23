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
