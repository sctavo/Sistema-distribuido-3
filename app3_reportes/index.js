const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// En una implementación real, estas URLs las expone el Middleware.
// En esta versión inicial las dejamos apuntando directo (después las cambiamos).
const APP1_BASE_URL = process.env.APP1_URL || "http://localhost:5001";
const APP2_BASE_URL = process.env.APP2_URL || "http://localhost:5002";

app.get("/reportes/clientes-ordenes", async (req, res) => {
  try {
    const [clientesResp, ordenesResp] = await Promise.all([
      axios.get(`${APP1_BASE_URL}/clientes`),
      axios.get(`${APP2_BASE_URL}/ordenes`)
    ]);

    const clientes = clientesResp.data;
    const ordenes = ordenesResp.data;

    // Reporte simple: total de órdenes por cliente
    const resumenPorCliente = clientes.map(c => {
      const ordenesCliente = ordenes.filter(o => o.clienteId === c.id);
      const totalOrdenes = ordenesCliente.length;
      const montoTotal = ordenesCliente.reduce((acc, o) => acc + (o.monto || 0), 0);

      return {
        clienteId: c.id,
        nombre: c.nombre,
        correo: c.correo,
        totalOrdenes,
        montoTotal
      };
    });

    res.json({
      generadoEn: new Date().toISOString(),
      totalClientes: clientes.length,
      totalOrdenes: ordenes.length,
      resumenPorCliente
    });
  } catch (err) {
    console.error("Error generando reporte:", err.message);
    res.status(500).json({ error: "No se pudo generar el reporte" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", servicio: "app3_reportes" });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`App3 (Reportes) escuchando en puerto ${PORT}`);
});
