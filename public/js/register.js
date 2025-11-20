document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
        
    };

    try {
        const res = await fetch("http://localhost:8080/api/usuarios/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            // Mandamos el correo al verify.html para saber qué usuario verificar
            localStorage.setItem("pendingEmail", data.email);
            window.location.href = `/html/verificar.html?email=${encodeURIComponent(data.email)}`;
            return;
        }

        const msg = await res.text();
        alert("Error: " + msg);

    } catch (err) {
        alert("Error de conexión con el servidor");
        console.error(err);
    }
});
