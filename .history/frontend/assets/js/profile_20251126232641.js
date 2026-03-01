window.onload = async () => {
    const token = getToken();

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!data.success) {
        alert("Session expired");
        logout();
        return;
    }

    document.getElementById("profileName").innerText = data.user.name;
    document.getElementById("profileEmail").innerText = data.user.email;
};
