async function cargarCarrito() {
    const carritoId = localStorage.getItem("carritoId");

    const response = await fetch(`http://localhost:8080/api/carrito/${carritoId}`);
    const carrito = await response.json();

    const cont = document.getElementById("carrito-lista");
    cont.innerHTML = "";

    carrito.items.forEach(item => {
        cont.innerHTML += `
            <div>
                <p>${item.producto.nombre}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Subtotal: $${item.subtotal}</p>
            </div>
        `;
    });
}
