// Save JWT token
function saveToken(token) {
    localStorage.setItem("authToken", token);
}

// Get JWT
function getToken() {
    return localStorage.getItem("authToken");
}

// Remove JWT (logout)
function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
}
