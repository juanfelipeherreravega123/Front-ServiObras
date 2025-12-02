
console.log("Sugerencias.js CARGADO");

window.enviarSugerencia = async function (event) {
  event.preventDefault();

  console.log("FUNCION EJECUTADA");

  const nombre = document.getElementById("sug-nombre").value.trim();
  const apellido = document.getElementById("sug-apellido").value.trim();
  const correo = document.getElementById("sug-correo").value.trim();
  const mensaje = document.getElementById("sug-mensaje").value.trim();

  if (!nombre || !apellido || !correo || !mensaje) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const id_usuario = localStorage.getItem("usuarioId");

  const data = {
    nombre,
    apellido,
    correo,
    mensaje,
    id_usuario: id_usuario ? Number(id_usuario) : null
  };

  console.log("DATA ENVIADA:", data);

  try {
    const res = await fetch(`${BASE_URL}/api/sugerencias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    console.log("RESPUESTA:", res.status);

    if (!res.ok) {
      alert("Error al enviar la sugerencia");
      return;
    }

    alert("Mensaje enviado con éxito");
    event.target.reset();

  } catch (error) {
    console.error("ERROR SUGERENCIA:", error);
    alert("No se pudo enviar el mensaje");
  }
};
