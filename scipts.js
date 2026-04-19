
//  DATOS DE MÉDICOS (pre-cargados en el sistema)

const MEDICOS = [
  { id: "M001", nombre: "Dr. Andrés Ramírez", especialidad: "Cardiología" },
  { id: "M002", nombre: "Dra. Laura Gómez", especialidad: "Traumatología" },
  { id: "M003", nombre: "Dr. Carlos Herrera", especialidad: "Oftalmología" },
  { id: "M004", nombre: "Dra. Sofía Martínez", especialidad: "Neurología" },
  { id: "M005", nombre: "Dr. Felipe Torres", especialidad: "Dermatología" },
  { id: "M006", nombre: "Dra. Valeria Ruiz", especialidad: "Pediatría" },
  { id: "M007", nombre: "Dr. Jorge Castillo", especialidad: "Ginecología" },
];


//  HELPERS — leer y guardar en localStorage

function getPacientes() {
  return JSON.parse(localStorage.getItem("pacientes") || "[]");
}
function savePacientes(lista) {
  localStorage.setItem("pacientes", JSON.stringify(lista));
}

function getCitas() {
  return JSON.parse(localStorage.getItem("citas") || "[]");
}
function saveCitas(lista) {
  localStorage.setItem("citas", JSON.stringify(lista));
}


//  PESTAÑAS

function mostrarTab(nombre) {
  // Ocultar todos los contenidos
  document.querySelectorAll(".tab-content").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

  // Mostrar el seleccionado
  document.getElementById("sec-" + nombre).classList.add("active");
  document.getElementById("tab-" + nombre).classList.add("active");

  // Renderizar contenido dinámico según la pestaña
  if (nombre === "medicos") renderMedicos();
  if (nombre === "paciente") renderPacientes();
  if (nombre === "cita") cargarMedicosEnSelect();
}


//  SECCIÓN 1 — Registro de Paciente

function registrarPaciente(event) {
  event.preventDefault();

  const id = document.getElementById("pac-id").value.trim();
  const nombre = document.getElementById("pac-nombre").value.trim();
  const edad = document.getElementById("pac-edad").value.trim();
  const msg = document.getElementById("msg-paciente");

  const pacientes = getPacientes();

  // Verificar que el ID no esté duplicado
  if (pacientes.find(p => p.id === id)) {
    mostrarMensaje(msg, "⚠️ Ya existe un paciente con ese ID.", "error");
    return;
  }

  pacientes.push({ id, nombre, edad });
  savePacientes(pacientes);

  mostrarMensaje(msg, `✅ Paciente ${nombre} registrado exitosamente.`, "ok");
  document.getElementById("formPaciente").reset();
  renderPacientes();
}

function renderPacientes() {
  const contenedor = document.getElementById("lista-pacientes");
  const pacientes = getPacientes();

  if (pacientes.length === 0) {
    contenedor.innerHTML = "<p class='vacio'>No hay pacientes registrados aún.</p>";
    return;
  }

  contenedor.innerHTML = pacientes.map(p => `
    <div class="tarjeta tarjeta-paciente">
      <div class="tarjeta-icon">👤</div>
      <h4>${p.nombre}</h4>
      <p><strong>ID:</strong> ${p.id}</p>
      <p><strong>Edad:</strong> ${p.edad} años</p>
    </div>
  `).join("");
}

//  SECCIÓN 2 — Mostrar Médicos

function renderMedicos() {
  const contenedor = document.getElementById("lista-medicos");

  contenedor.innerHTML = MEDICOS.map(m => `
    <div class="tarjeta tarjeta-medico">
      <div class="tarjeta-icon">🩺</div>
      <h4>${m.nombre}</h4>
      <p><strong>ID:</strong> ${m.id}</p>
      <span class="badge-especialidad">${m.especialidad}</span>
    </div>
  `).join("");
}

//  SECCIÓN 3 — Agendar Cita

function cargarMedicosEnSelect() {
  const select = document.getElementById("cita-medico");
  // Limpiar opciones previas (menos la primera)
  select.innerHTML = `<option value="">-- Seleccione un médico --</option>`;

  MEDICOS.forEach(m => {
    const option = document.createElement("option");
    option.value = m.id;
    option.textContent = `${m.nombre} — ${m.especialidad}`;
    select.appendChild(option);
  });

  // Establecer fecha mínima = hoy
  const hoy = new Date().toISOString().split("T")[0];
  document.getElementById("cita-fecha").min = hoy;
}

function agendarCita(event) {
  event.preventDefault();

  const pacId = document.getElementById("cita-pac-id").value.trim();
  const medicoId = document.getElementById("cita-medico").value;
  const fecha = document.getElementById("cita-fecha").value;
  const motivo = document.getElementById("cita-motivo").value.trim();
  const msg = document.getElementById("msg-cita");

  // Verificar que el paciente esté registrado
  const pacientes = getPacientes();
  const paciente = pacientes.find(p => p.id === pacId);

  if (!paciente) {
    mostrarMensaje(msg, "⚠️ ID de paciente no encontrado. Por favor regístrese primero.", "error");
    return;
  }

  // Obtener datos del médico
  const medico = MEDICOS.find(m => m.id === medicoId);

  const citas = getCitas();
  citas.push({
    id: Date.now(),
    pacienteId: paciente.id,
    pacienteNombre: paciente.nombre,
    medicoId: medico.id,
    medicoNombre: medico.nombre,
    especialidad: medico.especialidad,
    fecha,
    motivo
  });
  saveCitas(citas);

  mostrarMensaje(msg, `✅ Cita agendada con ${medico.nombre} para el ${fecha}.`, "ok");
  document.getElementById("formCita").reset();
}

//  SECCIÓN 4 — Mis Citas

function buscarCitas() {
  const id = document.getElementById("buscar-id").value.trim();
  const contenedor = document.getElementById("lista-citas");

  if (!id) {
    contenedor.innerHTML = "";
    return;
  }

  const citas = getCitas().filter(c => c.pacienteId === id);

  if (citas.length === 0) {
    contenedor.innerHTML = "<p class='vacio'>No se encontraron citas para ese ID.</p>";
    return;
  }

  contenedor.innerHTML = citas.map(c => `
    <div class="tarjeta tarjeta-cita">
      <div class="tarjeta-icon">📅</div>
      <h4>${c.medicoNombre}</h4>
      <span class="badge-especialidad">${c.especialidad}</span>
      <p><strong>Paciente:</strong> ${c.pacienteNombre}</p>
      <p><strong>Fecha:</strong> ${c.fecha}</p>
      <p><strong>Motivo:</strong> ${c.motivo}</p>
    </div>
  `).join("");
}


//  HELPER — mostrar mensajes de éxito/error

function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = "form-msg " + tipo;
  setTimeout(() => { elemento.textContent = ""; elemento.className = "form-msg"; }, 4000);
}


//  INICIALIZACIÓN al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderPacientes();   // mostrar pacientes en la pestaña 1
  cargarMedicosEnSelect(); // cargar médicos en el select de la pestaña 3
});
