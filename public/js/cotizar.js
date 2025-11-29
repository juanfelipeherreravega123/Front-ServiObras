// Función para generar la cotización
async function generarCotizacion() {
    // Obtener los datos necesarios desde el localStorage
    const usuarioId = localStorage.getItem("usuarioId");
    const carritoId = localStorage.getItem("carritoId");

    // Crear los datos para la solicitud
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
        agregarCotizacionAlCarrito(cot.id, usuarioId);
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al generar la cotización.");
    }
}

// Función para agregar la cotización al carrito
async function agregarCotizacionAlCarrito(cotizacionId, usuarioId) {
    try {
        // Realizar la solicitud POST al backend para agregar la cotización al carrito
        const response = await fetch("http://localhost:8080/api/cotizaciones/${cotizacionId}/llevar-a-carrito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuarioId }),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Error al agregar la cotización al carrito.");
        }

        alert("Cotización agregada al carrito");
        window.location.href = "../html/carrito.html"; // Redirigir al carrito
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al agregar la cotización al carrito.");
    }
}

// Asegurarse de que el evento de generación de cotización esté bien asignado al botón
document.getElementById("btnGenerarCotizacion").addEventListener("click", generarCotizacion);