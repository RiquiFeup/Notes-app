import express from "express";
import mongoose from "mongoose";
import Note from "./models/Note";
import noteRoutes from "./routes/noteRoutes";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/notes-db";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(" Conectado ao MongoDB!");
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));

app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API de Notas funcionando!");
});
