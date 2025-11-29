const BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:8080"
  : "https://serviobrass.com";

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Completa los campos");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    let body = {};
    try { body = await res.json(); } catch {}

    if (!res.ok) {
      if (body.error === "NO_VERIFICADO") {
        localStorage.setItem("pendingEmail", username);

        const verificarUrl = ["127.0.0.1", "localhost"].includes(window.location.hostname)
          ? "/public/html/verificar.html"
          : "/html/verificar.html";

        window.location.href = verificarUrl;
        return;
      }

      alert(body.message || body.error || "Error en login");
      return;
    }

    // Guardar token y datos
    localStorage.setItem("token", body.token);
    localStorage.setItem("username", body.username);
    localStorage.setItem("usuarioId", body.id_usuario);

    const catalogoUrl = ["127.0.0.1", "localhost"].includes(window.location.hostname)
      ? "/public/html/catalogo.html"
      : "/html/catalogo.html";

    window.location.href = catalogoUrl;

  } catch (err) {
    console.error("ERROR LOGIN:", err);
    alert("No se pudo conectar con el servidor.");
  }
}

window.login = login;

// Si ya hay sesión, saltar login
if (localStorage.getItem("token")) {
  const catalogoUrl = ["127.0.0.1", "localhost"].includes(window.location.hostname)
    ? "/public/html/catalogo.html"
    : "/html/catalogo.html";

  window.location.href = catalogoUrl;
}