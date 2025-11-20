// Mover al siguiente input automáticamente
function nextInput(current, nextId) {
    if (current.value.length === 1) {
        document.getElementById(nextId)?.focus();
    }
}

// Obtener el código completo (6 dígitos)
function getFullCode() {
    let code = "";
    for (let i = 1; i <= 6; i++) {
        code += document.getElementById(`code${i}`).value.trim();
    }
    return code;
}

// Función para verificar el código
async function verifyCode() {
    const email = localStorage.getItem("pendingEmail"); // se guarda en register.js
    const codigo = getFullCode();

    if (!email) {
        alert("No sabemos qué correo verificar. Regístrate primero.");
        return;
    }

    if (codigo.length !== 6) {
        alert("El código debe tener 6 dígitos.");
        return;
    }

    const data = { email, codigo };

    try {
        const res = await fetch("http://localhost:8080/api/usuarios/verificar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const msg = await res.text();

        if (res.ok) {
            alert("Cuenta verificada con éxito!");
            localStorage.removeItem("pendingEmail");
            window.location.href = "/html/login.html";
        } else {
            alert("Código incorrecto. Inténtalo otra vez.");
        }

    } catch (error) {
        alert("Error conectando con el servidor.");
        console.error(error);
    }
}

// Reenviar código (OPCIONAL — solo si agregas endpoint)
function resendCode() {
    alert("Pronto activaremos esta función.");
}
