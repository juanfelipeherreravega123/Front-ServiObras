document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const user = await res.json();
        alert("Bienvenido " + user.nombre);
        // redirige al dashboard
        window.location.href = "/html/catalogo.html";
    } else {
        const msg = await res.text();
        alert("Error: " + msg);
    }
});
