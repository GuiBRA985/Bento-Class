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
    const { error } = await supabase
      .from("alunos")
      .select("*")
      .limit(1);

    res.json({
      status: "online",
      banco: error ? "erro" : "conectado"
    });
  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
});

app.post("/api/alunos", async (req, res) => {
  try {
    const { nome, email } = req.body;

    const { data, error } = await supabase
      .from("alunos")
      .insert([
        {
          id: crypto.randomUUID(),
          nome,
          email
        }
      ])
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({
      erro: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.get("/api/teste-aluno", async (req, res) => {
  const { data, error } = await supabase
    .from("alunos")
    .insert([
      {
        id: crypto.randomUUID(),
        nome: "Gui Teste",
        email: `gui${Date.now()}@teste.com`
      }
    ])
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
