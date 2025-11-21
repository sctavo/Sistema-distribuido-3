from flask import Flask, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Datos simulados (como si fueran un snapshot)
CLIENTES_REPLICA = [
    {
        "id": "replica-1",
        "nombre": "Cliente Replica",
        "correo": "replica@correo.com",
        "fecha_creacion": "2025-01-01T00:00:00Z"
    }
]

@app.route("/clientes", methods=["GET"])
def listar_clientes():
    return jsonify(CLIENTES_REPLICA), 200

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "OK - Replica", "servicio": "app1_replica"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5101, debug=False)
