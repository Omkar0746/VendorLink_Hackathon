import { api } from "./api.js";

async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const product = await api(`/products/${id}`);

    document.getElementById("p-image").src = product.image;
    document.getElementById("p-name").textContent = product.name;
    document.getElementById("p-price").textContent = "₹" + product.price;
    document.getElementById("p-category").textContent = product.category;
}

loadProduct();
