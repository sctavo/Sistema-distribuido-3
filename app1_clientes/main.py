from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
import datetime

app = Flask(__name__)
CORS(app)

# Simulación de "tabla clientes" en memoria.
# En un entorno real, esto se mapearía a MariaDB.
CLIENTES = {}


def ahora_iso():
    return datetime.datetime.utcnow().isoformat() + "Z"


@app.route("/clientes", methods=["GET"])
def listar_clientes():
    return jsonify(list(CLIENTES.values())), 200


@app.route("/clientes/<cliente_id>", methods=["GET"])
def obtener_cliente(cliente_id):
    cliente = CLIENTES.get(cliente_id)
    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404
    return jsonify(cliente), 200


@app.route("/clientes", methods=["POST"])
def crear_cliente():
    data = request.json or {}
    nombre = data.get("nombre")
    correo = data.get("correo")

    if not nombre or not correo:
        return jsonify({"error": "nombre y correo son obligatorios"}), 400

    cliente_id = str(uuid.uuid4())
    cliente = {
        "id": cliente_id,
        "nombre": nombre,
        "correo": correo,
        "fecha_creacion": ahora_iso()
    }
    CLIENTES[cliente_id] = cliente

    # Aquí, en un escenario real, se haría INSERT en MariaDB.
    return jsonify(cliente), 201


@app.route("/clientes/<cliente_id>", methods=["PUT"])
def actualizar_cliente(cliente_id):
    cliente = CLIENTES.get(cliente_id)
    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    data = request.json or {}
    nombre = data.get("nombre", cliente["nombre"])
    correo = data.get("correo", cliente["correo"])

    cliente["nombre"] = nombre
    cliente["correo"] = correo
    cliente["ultima_modificacion"] = ahora_iso()

    # En escenario real: UPDATE en MariaDB.
    return jsonify(cliente), 200


@app.route("/health", methods=["GET"])
def health():
    # Para orquestadores: indica si el servicio está vivo
    return jsonify({"status": "OK", "servicio": "app1_clientes"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
