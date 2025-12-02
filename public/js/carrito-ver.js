function formatearPeso(valor) {
  if (valor == null) return "$0";
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  });
}

function renderCotizacionEnCarrito() {
  const contResumen = document.getElementById("resumen-cotizacion");
  if (!contResumen) return;

  const datos = JSON.parse(localStorage.getItem("cotizacionCarrito") || "null");

  if (!datos) {
    contResumen.innerHTML = `
      <div class="alert alert-info mb-0">
        No hay ninguna cotización asociada al carrito todavía.
      </div>
    `;
    return;
  }

  const filasMateriales = (datos.materiales || []).map(m => `
    <tr>
      <td>${m.material}</td>
      <td class="text-end">${m.metros}</td>
      <td class="text-end">${formatearPeso(m.precio)}</td>
      <td class="text-end">${formatearPeso(m.total)}</td>
    </tr>
  `).join("");

  contResumen.innerHTML = `
    <div class="card mt-2">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">Cotización para ${datos.nombreLinea}</h5>
          <small class="text-muted">${datos.identificacionLinea || ""}</small>
        </div>
        <span class="badge text-bg-secondary">
          ${datos.fecha ? new Date(datos.fecha).toLocaleDateString("es-CO") : ""}
        </span>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <p class="mb-1"><strong>Correo:</strong> ${datos.correo}</p>
            <p class="mb-1"><strong>Localidad:</strong> ${datos.localidad}</p>
            <p class="mb-1"><strong>Dirección:</strong> ${datos.direccion}</p>
          </div>
          <div class="col-md-6">
            <p class="mb-1"><strong>Teléfono:</strong> ${datos.telefono || "-"}</p>
            <p class="mb-1"><strong>Tipo:</strong> ${datos.tipo === "empresa" ? "Empresa" : "Persona natural"}</p>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-sm align-middle">
            <thead class="table-light">
              <tr>
                <th>Material</th>
                <th class="text-end">Mtrs³/Und</th>
                <th class="text-end">Precio unitario</th>
                <th class="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              ${filasMateriales}
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-end">Subtotal</th>
                <th class="text-end">${formatearPeso(datos.subtotal)}</th>
              </tr>
              <tr>
                <th colspan="3" class="text-end">IVA (19%)</th>
                <th class="text-end">${formatearPeso(datos.iva)}</th>
              </tr>
              <tr>
                <th colspan="3" class="text-end">Total</th>
                <th class="text-end fw-bold">${formatearPeso(datos.total)}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        ${datos.detalles ? `
          <p class="mt-3 mb-0">
            <strong>Detalles / observaciones:</strong><br>
            ${datos.detalles}
          </p>
        ` : ""}
      </div>
    </div>
  `;
}

async function cargarCarrito() {
  const carritoId = localStorage.getItem("carritoId");
  const cont = document.getElementById("carrito-lista");
  cont.innerHTML = "";

  if (!carritoId) {
    cont.innerHTML = `
      <div class="alert alert-warning">
        Aún no tienes un carrito creado. Agrega productos desde el catálogo o desde una cotización.
      </div>
    `;
    renderCotizacionEnCarrito();
    return;
  }

  try {
    const response = await fetch(`https://serviobrass.com/api/carrito/${carritoId}`);
    if (!response.ok) {
      throw new Error("Error al cargar el carrito");
    }

    const carrito = await response.json();

    if (!carrito.items || carrito.items.length === 0) {
      cont.innerHTML = `
        <div class="alert alert-info">
          Tu carrito está vacío. Agrega productos desde el catálogo o desde una cotización.
        </div>
      `;
    } else {
      carrito.items.forEach(item => {
        cont.innerHTML += `
          <div class="col-12">
            <div class="border rounded p-3 mb-2 d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-semibold">${item.producto.nombre}</div>
                <small class="text-muted">Cantidad: ${item.cantidad}</small>
              </div>
              <div class="text-end">
                <div>${formatearPeso(item.subtotal)}</div>
              </div>
            </div>
          </div>
        `;
      });
    }
  } catch (e) {
    console.error(e);
    cont.innerHTML = `
      <div class="alert alert-danger">
        No se pudo cargar el carrito desde el servidor.
      </div>
    `;
  }

  // Mostrar la cotización asociada (si existe)
  renderCotizacionEnCarrito();
}