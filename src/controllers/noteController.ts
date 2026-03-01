import { Response } from "express";
import Note from "../models/Note";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    console.log("Receiving note:", { title, content, userId: req.userId });

    const newNote = new Note({
      title,
      content,
      userId: req.userId,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error: any) {
    console.error("ERRO AO SALVAR NO MONGODB:", error);
    res
      .status(500)
      .json({ error: "Erro ao salvar a nota", details: error.message });
  }
};

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const notes = await Note.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notas" });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.userId } as any,
      { title, content },
      { new: true },
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ error: "Nota não encontrada ou sem permissão." });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar nota" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      userId: req.userId,
    } as any);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ error: "Nota não encontrada ou sem permissão." });
    }

    res.status(200).json({ message: "Nota apagada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao apagar nota" });
  }
};

// Admin: obter todas as notas de todos os utilizadores
export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find()
      .populate("userId", "email")
      .sort({ createdAt: -1 });

    const formattedNotes = notes.map((note: any) => ({
      _id: note._id,
      title: note.title,
      content: note.content,
      userEmail: note.userId?.email || "Utilizador removido",
      userId: note.userId?._id || note.userId,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }));

    res.json(formattedNotes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar todas as notas" });
  }
};
