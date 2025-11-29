const BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:8080"
  : "https://serviobrass.com";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (!nombre || !apellido || !username || !email || !password || !confirm) {
    alert("Completa todos los campos");
    return;
  }

  if (password !== confirm) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const data = { nombre, apellido, username, email, password };

  try {
    const res = await fetch(`${BASE_URL}/api/usuarios/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    let body = {};
    try { body = await res.json(); } catch {}

    if (res.ok) {
      localStorage.setItem("pendingEmail", email);

      const verificarUrl = window.location.hostname === "127.0.0.1"
        ? "/public/html/verificar.html"
        : "/html/verificar.html";

      window.location.href = verificarUrl;
    } else {
      alert(body.error || "Error en el registro");
    }

  } catch (err) {
    console.error(err);
    alert("No se pudo conectar con el servidor.");
  }
});