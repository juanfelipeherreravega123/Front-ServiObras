// Función para agregar un producto o cotización al carrito
async function agregarCarrito(cotizacionId) {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
        alert("Debes iniciar sesión primero");
        window.location.href = "/html/login.html";
        return;
    }

    let carritoId = localStorage.getItem("carritoId");

    // Crear carrito si no existe
    if (!carritoId) {
        const response = await fetch("http://localhost:8080/api/carrito/crear", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_usuario: parseInt(usuarioId, 10) })
        });

        const carrito = await response.json();
        carritoId = carrito.id_carrito;
        localStorage.setItem("carritoId", carritoId);
    }

    // Agregar la cotización al carrito
    await fetch(`http://localhost:8080/api/cotizaciones/${cotizacionId}/llevar-a-carrito`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuarioId })
    });

    alert("Cotización agregada al carrito");
    window.location.href = "/html/carrito.html"; // Redirigir al carrito
}

// Llamada a esta función desde el frontend después de generar la cotización
async function generarCotizacion() {
    const usuarioId = localStorage.getItem("usuarioId");
    const carritoId = localStorage.getItem("carritoId");

    const data = { usuarioId, carritoId };

    try {
        // Realizar la solicitud POST para generar la cotización
        const response = await fetch("http://localhost:8080/api/cotizaciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Error al generar la cotización.");
        }

        // Obtener la cotización generada desde la respuesta
        const cot = await response.json();
        localStorage.setItem("cotizacionId", cot.id); // Guardar el ID de la cotización

        alert("Cotización generada");

        // Llamar a la función para agregar la cotización al carrito
        agregarCarrito(cot.id);
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al generar la cotización.");
    }
}