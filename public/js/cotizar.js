async function generarCotizacion() {
    const usuarioId = localStorage.getItem("usuarioId");
    const carritoId = localStorage.getItem("carritoId");

    const data = { usuarioId, carritoId };

    const response = await fetch("http://localhost:8080/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const cot = await response.json();
    localStorage.setItem("cotizacionId", cot.id);

    alert("Cotización generada");
}
