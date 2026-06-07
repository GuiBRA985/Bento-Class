const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bento Cursos Online");
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    plataforma: "Bento Cursos",
    versao: "1.0"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
