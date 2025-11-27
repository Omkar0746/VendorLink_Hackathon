// js/index.js
async function loadProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();
    const list = document.getElementById('productList'); // match this id in index.html
    list.innerHTML = '';
    products.forEach(p => {
      const el = document.createElement('div');
      el.className = 'product-card';
      el.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description || ''}</p>
        <p>Price: ₹${p.price}</p>
      `;
      list.appendChild(el);
    });
  } catch (err) {
    console.error('Error loading products', err);
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
