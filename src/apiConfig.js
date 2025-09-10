// src/apiConfig.js
// Central API base for all requests
// Priority: REACT_APP_API_URL (from Netlify/CRA) → hostname fallback

const rawFromEnv = process.env.REACT_APP_API_URL || ""; // e.g., https://testaurant-api.fly.dev/api or http://localhost:8000/api

const trimTrailingSlash = (s) => (s || "").replace(/\/+$/, "");

const defaults = {
  production: "https://testaurant-api.fly.dev/api",
  development: "http://localhost:8000/api",
};

let apiUrl;

if (rawFromEnv && rawFromEnv.trim()) {
  // Use value baked at build time by CRA/Netlify
  apiUrl = trimTrailingSlash(rawFromEnv.trim());
} else {
  // Fallback to hostname-based selection
  apiUrl = window.location.hostname === "localhost" ? defaults.development : defaults.production;
  apiUrl = trimTrailingSlash(apiUrl);
}

export default apiUrl; // always WITHOUT trailing slash
