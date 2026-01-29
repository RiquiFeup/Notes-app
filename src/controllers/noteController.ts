import { Request, Response } from "express";
import Note from "../models/Note";

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar a nota" });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notas" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar nota" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }

    res.status(200).json({ message: "Nota apagada" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao apagar nota" });
  }
};
