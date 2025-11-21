const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { randomUUID } = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Simulación de "tabla ordenes" en memoria.
// En la realidad esto iría a PostgreSQL.
const ORDENES = [];

app.get("/ordenes", (req, res) => {
  res.json(ORDENES);
});

app.get("/ordenes/:id", (req, res) => {
  const orden = ORDENES.find(o => o.id === req.params.id);
  if (!orden) {
    return res.status(404).json({ error: "Orden no encontrada" });
  }
  res.json(orden);
});

app.post("/ordenes", (req, res) => {
  const { clienteId, monto, estado } = req.body;

  if (!clienteId || !monto) {
    return res.status(400).json({ error: "clienteId y monto son obligatorios" });
  }

  const nuevaOrden = {
    id: randomUUID(),
    clienteId,
    monto,
    estado: estado || "PENDIENTE",
    fechaCreacion: new Date().toISOString()
  };

  ORDENES.push(nuevaOrden);

  // En Productivo: INSERT en PostgreSQL.
  res.status(201).json(nuevaOrden);
});

app.put("/ordenes/:id", (req, res) => {
  const orden = ORDENES.find(o => o.id === req.params.id);
  if (!orden) {
    return res.status(404).json({ error: "Orden no encontrada" });
  }

  const { estado } = req.body;
  if (estado) {
    orden.estado = estado;
  }
  orden.fechaActualizacion = new Date().toISOString();

  // En Productivo: UPDATE en PostgreSQL.
  res.json(orden);
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", servicio: "app2_ordenes" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`App2 (Órdenes) escuchando en puerto ${PORT}`);
});
