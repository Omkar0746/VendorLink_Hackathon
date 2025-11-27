async function loadProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!data.success) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("profileName").innerText = data.user.name;
    document.getElementById("profileEmail").innerText = data.user.email;
}

loadProfile();
