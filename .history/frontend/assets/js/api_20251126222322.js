// js/api.js
const API_BASE = 'http://localhost:5000/api';

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers || {};
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {...options, headers});
  // handle non-JSON or errors
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch (e) { data = text; }
  if (!res.ok) {
    const err = (data && data.message) || res.statusText || data;
    throw new Error(err);
  }
  return data;
}
