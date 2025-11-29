const BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:8080"
  : "https://serviobrass.com";

function nextInput(current, nextId) {
  if (current.value.length === 1) {
    const next = document.getElementById(nextId);
    if (next) next.focus();
  }
}

async function verifyCode() {
  const ids = ["code1","code2","code3","code4","code5","code6"];
  const code = ids.map(id => document.getElementById(id).value.trim()).join("");

  if (code.length !== 6) {
    alert("Debes ingresar los 6 dígitos.");
    return;
  }

  const email = localStorage.getItem("pendingEmail");

  if (!email) {
    alert("No se encontró correo pendiente.");
    window.location.href = "../html/register.html";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/usuarios/verificar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, codigo: code })
    });

    let body = {};
    try { body = await res.json(); } catch {}

    if (res.ok) {
      alert("Cuenta verificada con éxito");
      localStorage.removeItem("pendingEmail");

      const loginUrl = window.location.hostname === "127.0.0.1"
        ? "/public/html/login.html"
        : "/html/login.html";

      window.location.href = loginUrl;
    } else {
      alert(body.error || "Código incorrecto");
    }

  } catch (err) {
    console.error(err);
    alert("No se pudo conectar con el servidor.");
  }
}

window.nextInput = nextInput;
window.verifyCode = verifyCode;