const express = require("express");
const cors = require("cors");
const supabase = require("./supabase");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bento Cursos Online");
});

app.get("/api/status", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("perfis")
      .select("*")
      .limit(1);

    res.json({
      status: "online",
      banco: error ? "erro" : "conectado",
      detalhes: error?.message || "Supabase OK"
    });

  } catch (err) {
    res.status(500).json({
      status: "erro",
      mensagem: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
