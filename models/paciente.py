from .db import get_connection

def crear_paciente(data):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        sql = "INSERT INTO pacientes (identificacion, nombre, edad) VALUES (%s, %s, %s)"
        cursor.execute(sql, (data["id"], data["nombre"], int(data["edad"])))
        conn.commit()
    finally:
        cursor.close()
        conn.close()

def obtener_pacientes():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM pacientes")
        data = cursor.fetchall()
        return data
    finally:
        cursor.close()
        conn.close()