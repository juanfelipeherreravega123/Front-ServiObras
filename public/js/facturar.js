async function facturar(idCotizacion) {
  const res = await fetch(`https://serviobrass.com/api/facturacion/${idCotizacion}`, {
    method: "POST"
  });

  const fact = await res.json();
  alert(`Factura generada. Total a pagar: $${fact.total_pagar}`);
}
