// Base URL for the Express API.
// Leave VITE_API_URL empty when the frontend and API share an origin
// (Vite proxies /api to http://localhost:5000 during development).
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export function apiUrl(path) {
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function postJson(path, payload) {
  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.success) {
    const error = new Error(
      data?.message || `Request failed (HTTP ${response.status}). Please try again.`
    );
    error.status = response.status;
    throw error;
  }

  return data;
}
