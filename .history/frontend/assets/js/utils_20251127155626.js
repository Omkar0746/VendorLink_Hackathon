export function protectRoute() {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
}

export function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
