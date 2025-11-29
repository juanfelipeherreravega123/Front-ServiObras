async function agregarCarrito(productoId) {
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

    // Agregar producto
    await fetch(`http://localhost:8080/api/carrito/${carritoId}/agregar?productoId=${productoId}&cantidad=1`, {
        method: "POST"
    });

    alert("Producto agregado al carrito");
}

