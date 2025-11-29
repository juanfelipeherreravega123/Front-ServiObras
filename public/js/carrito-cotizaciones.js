// carrito-cotizaciones.js
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const carritoLista = document.getElementById("carrito-lista");

  if (carrito.length === 0) {
    carritoLista.innerHTML = "<p>No hay artículos en tu carrito.</p>";
  } else {
    carrito.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("col-md-12", "d-flex", "justify-content-between");
      div.innerHTML = `
        <div>
          <h6>Material ${index + 1}</h6>
          ${item.materiales.map(m => `<p>${m.material} - ${m.metros} m³</p>`).join("")}
        </div>
      `;
      carritoLista.appendChild(div);
    });
  }
}