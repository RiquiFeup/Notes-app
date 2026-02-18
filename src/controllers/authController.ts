import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Este email já está registado." });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "Utilizador criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registar utilizador." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ou password incorretos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ou password incorretos." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Erro no login." });
  }
};
