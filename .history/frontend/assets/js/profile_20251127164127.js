import { getUser } from "./utils.js";

const user = getUser();

if (!user) {
  window.location.href = "login.html";
} else {
  document.getElementById("prof-name").textContent = user.name;
  document.getElementById("prof-email").textContent = user.email;
  document.getElementById("prof-role").textContent = user.role;
}
