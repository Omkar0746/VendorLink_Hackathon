// assets/js/api.js

// Dynamically detect API base so it works on any port
export const API_BASE = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

export async function api(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  console.log(`[API] Calling: ${API_BASE}${cleanEndpoint}`);

  const res = await fetch(`${API_BASE}${cleanEndpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}
