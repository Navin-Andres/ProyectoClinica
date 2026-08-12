from .db import get_connection

medicos_db = [
    { "id": "M001", "nombre": "Dr. Andrés Ramírez", "especialidad": "Cardiología" },
    { "id": "M002", "nombre": "Dra. Laura Gómez", "especialidad": "Traumatología" },
    { "id": "M003", "nombre": "Dr. Carlos Herrera", "especialidad": "Oftalmología" },
    { "id": "M004", "nombre": "Dra. Sofía Martínez", "especialidad": "Neurología" },
    { "id": "M005", "nombre": "Dr. Felipe Torres", "especialidad": "Dermatología" },
    { "id": "M006", "nombre": "Dra. Valeria Ruiz", "especialidad": "Pediatría" },
    { "id": "M007", "nombre": "Dr. Jorge Castillo", "especialidad": "Ginecología" },
]

def obtener_medicos():
    conn = get_connection()
    cursor = conn.cursor()
    return medicos_db
   

    try:
        cursor.execute("SELECT * FROM medicos")
        data = cursor.fetchall()
        return data
    finally:
        cursor.close()
        conn.close()