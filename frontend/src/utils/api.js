const DEFAULT_PRODUCTION_API_BASE_URL = "https://elivateacademy.com";
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";
const rawApiBaseUrl = configuredApiBaseUrl || DEFAULT_PRODUCTION_API_BASE_URL;

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

export function apiUrl(path = "") {
  if (!path) {
    return API_BASE_URL;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function fetchJson(path, options) {
  const response = await fetch(apiUrl(path), options);
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const statusMessage =
      response.status === 404
        ? "API endpoint not found. Make sure the backend server is running and the latest alumni routes are available."
        : `Unexpected server response (${response.status}).`;

    throw new Error(statusMessage);
  }

  const data = await response.json();

  return { response, data };
}
