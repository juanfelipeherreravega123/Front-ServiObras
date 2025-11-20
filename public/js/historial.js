async function cargarHistorial() {
    const usuarioId = localStorage.getItem("usuarioId");

    const response = await fetch(`http://localhost:8080/api/historial/usuario/${usuarioId}`);
    const historial = await response.json();

    const cont = document.getElementById("historial");
    cont.innerHTML = "";

    historial.forEach(h => {
        cont.innerHTML += `
            <div>
                <p>Producto: ${h.producto.nombre}</p>
                <p>Fecha: ${h.fecha}</p>
                <p>Acción: ${h.accion}</p>
            </div>
        `;
    });
}
