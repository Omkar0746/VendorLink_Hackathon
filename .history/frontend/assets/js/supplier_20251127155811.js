import { api } from "./api.js";
import { protectRoute } from "./utils.js";

protectRoute();

document.getElementById("addProductForm").addEventListener("submit", async(e)=>{
    e.preventDefault();

    const name = pName.value;
    const price = pPrice.value;
    const image = pImage.value;
    const category = pCategory.value;

    const res = await api("/products/create", "POST", {
        name, price, image, category
    }, true);

    alert("Product added!");
    window.location.reload();
});
