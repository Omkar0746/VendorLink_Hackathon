// frontend/js/api.js
const API_BASE = 'http://localhost:5000/api'; // change when deployed

function getAuthToken() {
  return localStorage.getItem('token');
}

async function apiFetch(path, { method = 'GET', body = null, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, data };
  return data;
}
