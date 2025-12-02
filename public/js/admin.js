// ===========================
// PROTEGER PANEL ADMIN
// ===========================
(function validarAdmin() {
  const token = localStorage.getItem("token");
  const rol = (localStorage.getItem("rol") || "").toLowerCase();

  if (!token || rol !== "admin") {
    window.location.href = "/html/login.html";
  }
})();

// ===========================
// CONFIG BASE URL
// ===========================

// ===========================
// LOGOUT
// ===========================
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("usuarioId");
  localStorage.removeItem("rol");

  window.location.href = "/html/login.html";
}

// ===========================
// OCULTAR TODAS LAS SECCIONES
// ===========================
function ocultarSecciones() {
  document.getElementById("crearUsuarioSection").style.display = "none";
  document.getElementById("eliminarUsuarioSection").style.display = "none";
  document.getElementById("dashboardSection").style.display = "none";
}

// ===========================
// 🔥 SECCIÓN: SUGERENCIAS
// ===========================

// Mostrar sección sugerencias
function mostrarSugerencias() {
    ocultarSecciones();
    document.getElementById("sugerenciasSection").style.display = "block";
    cargarSugerencias();
}

// Cargar sugerencias desde backend
async function cargarSugerencias() {
    const tbody = document.getElementById("sugerenciasBody");
    tbody.innerHTML = "<tr><td colspan='7'>Cargando...</td></tr>";

    try {
        const response = await fetch(`${BASE_URL}/api/sugerencias`);
        if (!response.ok) {
            tbody.innerHTML = "<tr><td colspan='7'>Error cargando sugerencias</td></tr>";
            return;
        }

        const data = await response.json();
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = "<tr><td colspan='7'>No hay sugerencias registradas</td></tr>";
            return;
        }

        data.forEach(s => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${s.id}</td>
                <td>${s.id_usuario || "Visitante"}</td>
                <td>${s.nombre} ${s.apellido}</td>
                <td>${s.correo}</td>
                <td>${s.mensaje}</td>
                <td>${s.origen}</td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarSugerencia(${s.id})">
                        Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("ERROR cargando sugerencias:", error);
        tbody.innerHTML = "<tr><td colspan='7'>Error cargando sugerencias</td></tr>";
    }
}

// Eliminar sugerencia
async function eliminarSugerencia(id) {
    const confirmar = confirm(`¿Eliminar sugerencia ID ${id}?`);
    if (!confirmar) return;

    try {
        const response = await fetch(`${BASE_URL}/api/sugerencias/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            alert("Error eliminando sugerencia");
            return;
        }

        alert("Sugerencia eliminada");
        cargarSugerencias();

    } catch (err) {
        console.error("ERROR eliminando sugerencia:", err);
        alert("No se pudo eliminar la sugerencia");
    }
}

// ===========================
// 🔥 NUEVO: FUNCIÓN QUE PINTA LA TABLA
// ===========================
function mostrarUsuariosEnTabla(usuarios) {
  const tablaBody = document.getElementById("usuariosBody");
  if (!tablaBody) return;

  tablaBody.innerHTML = "";

  if (usuarios.length === 0) {
    tablaBody.innerHTML = "<tr><td colspan='7'>No hay usuarios encontrados</td></tr>";
    return;
  }

  usuarios.forEach(user => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>
        <button class="btnEliminar" data-id="${user.id_usuario}" data-nombre="${user.nombre}">
          🗑 Eliminar
        </button>
      </td>
      <td>${user.id_usuario}</td>
      <td>${user.nombre}</td>
      <td>${user.apellido}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.rol}</td>
    `;
    tablaBody.appendChild(fila);
  });

  activarBotonesEliminar();
}

// ===========================
// CARGAR LISTA DE USUARIOS
// ===========================
async function cargarUsuarios() {
  const tablaBody = document.getElementById("usuariosBody");
  if (!tablaBody) return;

  tablaBody.innerHTML = "<tr><td colspan='7'>Cargando...</td></tr>";

  try {
    console.log("➡ FETCH:", `${BASE_URL}/api/usuarios/listar`);

    const response = await fetch(`${BASE_URL}/api/usuarios/listar`);
    console.log("➡ RESPONSE:", response.status);

    if (!response.ok) {
      tablaBody.innerHTML = "<tr><td colspan='7'>Error cargando usuarios</td></tr>";
      console.error("❌ Error HTTP:", await response.text());
      return;
    }

    const usuarios = await response.json();
    console.log("➡ USUARIOS:", usuarios);

    mostrarUsuariosEnTabla(usuarios);

  } catch (e) {
    console.error("❌ ERROR FETCH:", e);
    tablaBody.innerHTML = "<tr><td colspan='7'>Error cargando usuarios</td></tr>";
  }
}

// ===========================
// ACTIVAR BOTONES DE ELIMINAR
// ===========================
function activarBotonesEliminar() {
  const botones = document.querySelectorAll(".btnEliminar");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      eliminarUsuario(id, nombre);
    });
  });
}

// ===========================
// ELIMINAR USUARIO
// ===========================
async function eliminarUsuario(id, nombre) {
  const confirmar = confirm(`¿Seguro que deseas eliminar al usuario ${nombre}?`);

  if (!confirmar) return;

  try {
    const response = await fetch(`${BASE_URL}/api/usuarios/eliminar/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();
    alert(result.message);

    cargarUsuarios();

  } catch (e) {
    alert("Error eliminando usuario");
  }
}

// ===========================
// 🔥 NUEVO: BUSCAR USUARIO
// ===========================
async function buscarUsuario(texto) {
  if (texto.trim() === "") {
    cargarUsuarios();
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/usuarios/buscar/${texto}`);
    if (!response.ok) {
      console.error("Error en búsqueda:", await response.text());
      return;
    }

    const usuarios = await response.json();
    mostrarUsuariosEnTabla(usuarios);

  } catch (err) {
    console.error("Error en búsqueda:", err);
  }
}

// ===========================
// MENÚ, FORM, EVENTOS
// ===========================
document.addEventListener("DOMContentLoaded", () => {

  const userMenu = document.getElementById("userMenu");
  const dropdown = document.getElementById("dropdownMenu");
  const userName = document.getElementById("userName");

  userName.innerHTML = localStorage.getItem("username") || "Admin";

  userMenu.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    if (!userMenu.contains(event.target)) dropdown.style.display = "none";
  });

  ocultarSecciones();
  document.getElementById("dashboardSection").style.display = "flex";

  // CREAR USUARIO
  document.getElementById("crearUsuarioBtn").addEventListener("click", () => {
    ocultarSecciones();
    document.getElementById("crearUsuarioSection").style.display = "block";
  });

  document.getElementById("cerrarCrearUsuario").addEventListener("click", () => {
    ocultarSecciones();
    document.getElementById("dashboardSection").style.display = "flex";
  });

  // ELIMINAR USUARIO
  document.getElementById("eliminarUsuarioBtn").addEventListener("click", () => {
    ocultarSecciones();
    document.getElementById("eliminarUsuarioSection").style.display = "block";
    cargarUsuarios();
  });

  // 🔥 ACTIVAR SECCIÓN SUGERENCIAS
   document.getElementById("btnSugerencias").addEventListener("click", mostrarSugerencias);

  document.getElementById("cerrarEliminarUsuario").addEventListener("click", () => {
    ocultarSecciones();
    document.getElementById("dashboardSection").style.display = "flex";
  });

  // FORMULARIO CREAR
  document.getElementById("formCrearUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      rol: e.target.rol.value
    };

    try {
      const response = await fetch(`${BASE_URL}/api/usuarios/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) return alert(result.error);

      alert("Usuario creado con éxito");

      e.target.reset();
      ocultarSecciones();
      document.getElementById("dashboardSection").style.display = "flex";

    } catch {
      alert("Error creando usuario");
    }
  });

  // 🔥 NUEVO: EVENTO DEL BUSCADOR
  const inputBuscar = document.getElementById("buscarUsuario");
  if (inputBuscar) {
    inputBuscar.addEventListener("input", (e) => {
      buscarUsuario(e.target.value);
    });
  }

});
