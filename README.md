<p align="center">
  <img src="static/assets/latido-del-corazon.png" alt="Logo de Medic Total" width="88">
</p>

<h1 align="center">Medic Total</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Proyecto-Acad%C3%A9mico-0E7490?style=for-the-badge" alt="Proyecto académico">
  <img src="https://img.shields.io/badge/Despliegue-Render-46E3B7?style=for-the-badge" alt="Desplegado en Render">
</p>

Medic Total es un proyecto académico que simula una aplicación web para el registro de pacientes y la gestión básica de citas médicas. Permite registrar pacientes, consultar los médicos disponibles, agendar citas y visualizar el historial de citas por paciente.

## Stack tecnológico

| Área | Tecnologías |
| --- | --- |
| Backend | Python · Flask · Gunicorn |
| Frontend | HTML · CSS · JavaScript |

## Arquitectura MVC

```text
Usuario
   │
   ▼
Vista · templates/ y static/
   │
   ▼
Controlador · app.py
   │
   ▼
Modelo · models/
```

El proyecto fue desarrollado siguiendo el patrón **MVC (Modelo-Vista-Controlador)**. La vista corresponde a las plantillas HTML y los recursos estáticos; el controlador está en `app.py`, donde se gestionan las rutas y validaciones; y el modelo se organiza en los módulos de `models/`, responsables de la lógica de la aplicación.

En producción, **Render** ejecuta Flask mediante **Gunicorn**. La interfaz se sirve desde `templates/index.html`, mientras que los estilos, scripts e imágenes se encuentran en `static/`.

## Desarrollo realizado

- Se construyó una interfaz de una sola página con secciones para pacientes, médicos y citas.
- Se implementaron rutas REST para consultar y registrar pacientes, médicos y citas.
- Se validan los campos requeridos antes de guardar información.
- Se creó un endpoint `/health` para verificar el estado del servicio en Render.

## Instalación local

1. Clona el repositorio y entra en la carpeta del proyecto.

   ```bash
   git clone https://github.com/Navin-Andres/ProyectoClinica.git
   cd ProyectoClinica
   ```

2. Crea y activa un entorno virtual.

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Instala las dependencias.

   ```bash
   pip install -r requirements.txt
   ```

4. Inicia la aplicación y abre `http://127.0.0.1:5000`.

   ```bash
   python app.py
   ```

## Despliegue

La aplicación está desplegada en una instancia gratuita de prueba de **Render**.

<p align="center">
  <a href="https://clinica-web-cjqh.onrender.com">Ver aplicación en línea ↗</a>
</p>
