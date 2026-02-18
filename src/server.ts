import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/notes-db";

mongoose
  .connect(mongoURI)
  .then(() => console.log(" Conectado ao MongoDB!"))
  .catch((err) => console.error(err));

app.use("/notes", noteRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API de Notas e Autenticação a funcionar! ");
});

app.listen(port, () => {
  console.log(` Servidor rodando em http://localhost:${port}`);
});
