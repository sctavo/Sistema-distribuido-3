const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const ORDENES_REPLICA = [
  {
    id: "replica-order-1",
    clienteId: "replica-1",
    monto: 9999,
    estado: "MODO_REPLICA",
    fechaCreacion: "2025-01-01T00:00:00Z"
  }
];

app.get("/ordenes", (req, res) => {
  res.json(ORDENES_REPLICA);
});

app.get("/health", (req, res) => {
  res.json({ status: "OK - Replica", servicio: "app2_replica" });
});

const PORT = process.env.PORT || 5102;
app.listen(PORT, () =>
  console.log(`App2 Replica escuchando en puerto ${PORT}`)
);
