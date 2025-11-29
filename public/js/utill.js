// Detecta si estás en Live Server (puerto 5500)
export const BASE_URL = window.location.origin.includes("5500")
  ? "http://localhost:8080"
  : window.location.origin;

// helpers
export const redirect = (path) => {
  window.location.href = window.location.origin.includes("5500")
    ? `/public/${path}`
    : path;
};