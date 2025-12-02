const express = require("express");
const path = require("path");

// 👉 Cambia esto por tu IP pública o dominio:
const URL_API = "https://serviobrass.com";

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname en CommonJS funciona directo
const publicPath = path.join(__dirname, "public");

// Servir archivos estáticos
app.use(express.static(publicPath));

// Ruta principal → login
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "html", "index.html"));
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🌐 Frontend disponible en: http://localhost:${PORT}`);
});
