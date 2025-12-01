// ===========================
// PROTEGER PANEL ADMIN
// ===========================
(function validarAdmin() {
  const token = localStorage.getItem("token");
  const rol = (localStorage.getItem("rol") || "").toLowerCase();

  if (!token || rol !== "admin") {
    // No es admin → fuera
    const loginUrl = ["localhost", "127.0.0.1"].includes(window.location.hostname)
      ? "/html/login.html"
      : "/html/login.html";

    window.location.href = loginUrl;
  }
})();

// ===========================
// CONFIGURACIÓN BASE URL
// ===========================
const BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:8080"
  : "https://serviobrass.com";

// ===========================
// CERRAR SESIÓN
// ===========================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("usuarioId");
  localStorage.removeItem("rol");

  const loginUrl = ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "/html/login.html"
    : "/html/login.html";

  window.location.href = loginUrl;
}

// ===========================
// MENÚ DESPLEGABLE ADMIN
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const userMenu = document.getElementById("userMenu");
  const dropdown = document.getElementById("dropdownMenu");
  const userName = document.getElementById("userName");

  // Mostrar nombre real del admin
  const username = localStorage.getItem("username") || "Admin";
  userName.innerHTML = username + "";

  // Abrir/Cerrar menú
  userMenu.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Cerrar menú si hace click afuera
  document.addEventListener("click", (event) => {
    if (!userMenu.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
});
