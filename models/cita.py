from .db import get_connection

def crear_cita(data):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        sql = "INSERT INTO citas (paciente_id, medico_id, fecha, motivo) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (
            data['paciente_id'],
            data['medico_id'],
            data['fecha'],
            data['motivo']
        ))
        conn.commit()
    finally:
        cursor.close()
        conn.close()

def obtener_citas():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM citas")
        data = cursor.fetchall()
        return data
    finally:
        cursor.close()
        conn.close()