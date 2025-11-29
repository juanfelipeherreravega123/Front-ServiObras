const BASE_URL = window.location.origin.includes("5500")
  ? "http://localhost:8080"
  : window.location.origin;

async function cargarHistorial() {
    const usuarioId = localStorage.getItem("usuarioId");
    const token = localStorage.getItem("token");

    if (!usuarioId || !token) {
        alert("Sesión no válida");
        return;
    }

    const response = await fetch(`${BASE_URL}/api/historial/usuario/${usuarioId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Error cargando historial");
        return;
    }

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

