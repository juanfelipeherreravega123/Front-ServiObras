// ===================
// PROTEGER CATÁLOGO
// ===================
(function validarSesion() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!token || !username) {
    window.location.href = "/public/html/login.html";
  }
})();

// ========================
// CONFIGURACIÓN DE API
// ========================
const BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:8080"
  : "https://serviobrass.com";

// ========================
// CARGAR PRODUCTOS DEL API
// ========================
async function cargarProductos() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión");
      window.location.href = "/public/html/login.html";
      return;
    }

    const response = await fetch(`${BASE_URL}/api/productos`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener los productos");
    }

    const productos = await response.json();
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
      contenedor.innerHTML = `<p class="text-center mt-4">No hay productos disponibles.</p>`;
      return;
    }

    productos.forEach(p => {
      contenedor.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card producto-card">
            <img src="${p.imagen_url || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text">${p.descripcion}</p>
              <p class="card-price fw-bold text-success">$${p.precio_unitario}</p>
              <button class="btn btn-success w-100" onclick="agregarCarrito(${p.id_producto})">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    document.getElementById("lista-productos").innerHTML = `<p class="text-center text-danger mt-4">Error cargando productos.</p>`;
  }
}

// ========================
// AGREGAR AL CARRITO (DEMO)
// ========================
function agregarCarrito(productoId) {
  alert(`Producto agregado (simulación): ${productoId}`);
}

// ========================
// CERRAR SESIÓN
// ========================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("usuarioId");
  window.location.href = "/public/html/login.html";
}

window.cargarProductos = cargarProductos;
window.agregarCarrito = agregarCarrito;
window.logout = logout;

// Cargar productos al abrir la página
document.addEventListener("DOMContentLoaded", cargarProductos);