const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const APP1_URL = process.env.APP1_URL || "http://localhost:5001";
const APP2_URL = process.env.APP2_URL || "http://localhost:5002";
const APP3_URL = process.env.APP3_URL || "http://localhost:5003";

// Función de ayuda para hacer llamadas con retry simple
async function callWithRetry(config, retries = 1) {
  try {
    const response = await axios(config);
    return response;
  } catch (err) {
    if (retries > 0) {
      console.warn("Fallo llamada, reintentando...", config.url);
      return callWithRetry(config, retries - 1);
    }
    throw err;
  }
}

// Rutas para exponer App1 a clientes externos
app.get("/api/clientes", async (req, res) => {
  try {
    const resp = await callWithRetry({
      method: "get",
      url: `${APP1_URL}/clientes`
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error en /api/clientes:", err.message);
    res.status(502).json({ error: "Error comunicando con App1" });
  }
});

app.post("/api/clientes", async (req, res) => {
  try {
    const resp = await callWithRetry({
      method: "post",
      url: `${APP1_URL}/clientes`,
      data: req.body
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error en POST /api/clientes:", err.message);
    res.status(502).json({ error: "Error comunicando con App1" });
  }
});

// Rutas para App2 (órdenes)
app.get("/api/ordenes", async (req, res) => {
  try {
    const resp = await callWithRetry({
    method: "get",
    url: `${APP2_URL}/ordenes`
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error en /api/ordenes:", err.message);
    res.status(502).json({ error: "Error comunicando con App2" });
  }
});

app.post("/api/ordenes", async (req, res) => {
  try {
    const resp = await callWithRetry({
      method: "post",
      url: `${APP2_URL}/ordenes`,
      data: req.body
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error en POST /api/ordenes:", err.message);
    res.status(502).json({ error: "Error comunicando con App2" });
  }
});

// Ruta para reportes (App3)
app.get("/api/reportes/clientes-ordenes", async (req, res) => {
  try {
    const resp = await callWithRetry({
      method: "get",
      url: `${APP3_URL}/reportes/clientes-ordenes`
    });
    res.status(resp.status).json(resp.data);
  } catch (err) {
    console.error("Error en /api/reportes/clientes-ordenes:", err.message);
    res.status(502).json({ error: "Error comunicando con App3" });
  }
});

// Healthcheck del middleware
app.get("/health", (req, res) => {
  res.json({ status: "OK", servicio: "middleware_gateway" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Middleware/API Gateway escuchando en puerto ${PORT}`);
});
