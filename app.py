from flask import Flask, render_template, request, jsonify
from models.paciente import *
from models.medico import *
from models.cita import *
import traceback

app = Flask(__name__)

# Vista principal
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health')
def health():
    return jsonify({"estado": "ok"})

# ===== PACIENTES =====
@app.route('/pacientes', methods=['GET'])
def get_pacientes():
    try:
        return jsonify(obtener_pacientes())
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e), "mensaje": "Error al obtener pacientes"}), 500

@app.route('/pacientes', methods=['POST'])
def add_paciente():
    try:
        data = request.json
        if not data or 'id' not in data or 'nombre' not in data or 'edad' not in data:
            return jsonify({"mensaje": "Faltan campos requeridos: id, nombre, edad"}), 400
        crear_paciente(data)
        return jsonify({"mensaje": "Paciente registrado"})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e), "mensaje": "Error al registrar paciente"}), 500

# ===== MEDICOS =====
@app.route('/medicos', methods=['GET'])
def get_medicos():
    try:
        return jsonify(obtener_medicos())
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e), "mensaje": "Error al obtener médicos"}), 500

# ===== CITAS =====
@app.route('/citas', methods=['POST'])
def add_cita():
    try:
        data = request.json
        if not data or 'paciente_id' not in data or 'medico_id' not in data or 'fecha' not in data or 'motivo' not in data:
            return jsonify({"mensaje": "Faltan campos requeridos: paciente_id, medico_id, fecha, motivo"}), 400
        crear_cita(data)
        return jsonify({"mensaje": "Cita creada"})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e), "mensaje": "Error al crear cita"}), 500

@app.route('/citas', methods=['GET'])
def get_citas():
    try:
        return jsonify(obtener_citas())
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e), "mensaje": "Error al obtener citas"}), 500

if __name__ == '__main__':
    app.run(debug=True)
