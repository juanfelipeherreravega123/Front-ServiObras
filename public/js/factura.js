async function pagar() {
    const cotizacionId = localStorage.getItem("cotizacionId");
    const usuarioId = localStorage.getItem("usuarioId");

    const data = { cotizacionId, usuarioId };

    const response = await fetch("http://localhost:8080/api/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const factura = await response.json();

    alert("Factura generada: " + factura.id);
}
