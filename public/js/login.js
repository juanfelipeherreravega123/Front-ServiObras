
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

        const verificarUrl = ["localhost", "127.0.0.1"].includes(window.location.hostname)
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
    localStorage.setItem("rol", body.rol);

    // Normalizar rol (admin / cliente)
    const rol = (body.rol || "").toLowerCase();

    // Rutas según entorno
    const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

    const catalogoUrl = isLocal ? "../html/catalogo.html" : "/html/catalogo.html";
    const adminUrl   = isLocal ? "../html/administrador.html" : "/html/administrador.html";

    // Redirección según rol
    if (rol === "admin") {
      window.location.href = adminUrl;
    } else {
      window.location.href = catalogoUrl;
    }

  } catch (err) {
    console.error("ERROR LOGIN:", err);
    alert("No se pudo conectar con el servidor.");
  }
}

window.login = login;

// Si ya hay sesión, saltar login
if (localStorage.getItem("token")) {

  const rol = (localStorage.getItem("rol") || "").toLowerCase();
  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  const catalogoUrl = isLocal ? "../html/catalogo.html" : "/html/catalogo.html";
  const adminUrl   = isLocal ? "../html/administrador.html" : "/html/administrador.html";

  if (rol === "admin") {
    window.location.href = adminUrl;
  } else {
    window.location.href = catalogoUrl;
  }
}
