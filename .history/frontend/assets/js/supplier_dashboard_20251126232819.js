window.onload = () => {
    if (!getToken()) {
        window.location.href = "login.html";
    }
};
