import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (Note: Note) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export function NoteCard({ note, onEdit, onDelete, formatDate }: NoteCardProps) {
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div className="note-date">
        {note.date ? formatDate(note.date) : "Sem data"}
      </div>

      
        <div className="note-actions">
            <button className="edit-btn" onClick={() => onEdit(note)} title="Edit Note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
            </button>
            <button className="delete-btn" onClick={() => onDelete(note._id)} title="Delete Note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                </svg>
            </button>
        </div>
    </div>
  );
}