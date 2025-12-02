// =========================
// GENERAR COTIZACIÓN
// =========================
async function generarCotizacion() {
    const usuarioId = localStorage.getItem("usuarioId");
    const carritoId = localStorage.getItem("carritoId");

    if (!usuarioId || !carritoId) {
        alert("No se encontró el usuario o el carrito.");
        return;
    }

    const data = { usuarioId, carritoId };

    try {
        const response = await fetch("https://serviobrass.com/api/cotizaciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error al generar la cotización.");
        }

        const cot = await response.json();
        localStorage.setItem("cotizacionId", cot.id);

        // Ahora la mandamos al carrito
        await agregarCotizacionAlCarrito(cot.id, usuarioId);

    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al generar la cotización.");
    }
}


// =========================
// AGREGAR COTIZACIÓN AL CARRITO
// =========================
async function agregarCotizacionAlCarrito(cotizacionId, usuarioId) {
    try {
        const response = await fetch(
            `https://serviobrass.com/api/cotizaciones/${cotizacionId}/llevar-a-carrito`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuarioId })
            }
        );

        if (!response.ok) {
            throw new Error("Error al agregar la cotización al carrito");
        }

        window.location.href = "/html/carrito.html";

    } catch (error) {
        console.error(error);
        alert("Hubo un problema al agregar la cotización al carrito.");
    }
}



// =========================
// LISTENER DEL BOTÓN
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("agregar-carrito");

    if (!btn) {
        console.error("No se encontró el botón #agregar-carrito");
        return;
    }

    btn.addEventListener("click", () => {
        generarCotizacion();
    });
});