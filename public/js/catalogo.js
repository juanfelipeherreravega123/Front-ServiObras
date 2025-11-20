async function cargarProductos() {
    const response = await fetch("http://localhost:8080/api/productos");
    const productos = await response.json();

    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <p><b>Precio:</b> $${p.precio}</p>
                <button onclick="agregarCarrito(${p.id})">Agregar al carrito</button>
            </div>
        `;
    });
}
