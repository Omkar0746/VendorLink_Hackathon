export const API_BASE = "http://localhost:5000/api";

export const api = async (endpoint, method="GET", body=null, tokenRequired=false) => {
    const headers = { "Content-Type": "application/json" };

    if (tokenRequired) {
        const token = localStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    return await res.json();
};
