import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getAllNotes,
} from "../controllers/noteController";
import { protect, requireRole } from "../middleware/authMiddleware";

const router = express.Router();

// Admin: ver todas as notas de todos os utilizadores
router.get("/all", protect, requireRole("admin"), getAllNotes);

router.post("/", protect, createNote);
router.get("/", protect, getNotes);

router.put("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

export default router;
