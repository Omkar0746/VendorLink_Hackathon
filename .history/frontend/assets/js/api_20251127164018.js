export const API_BASE = "http://localhost:5000/api";

export async function api(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.message || "Request failed");

  return data;
}
