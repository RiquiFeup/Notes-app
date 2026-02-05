import {  useState } from 'react';
import { Note } from '../types';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, id?: string) => void; 
  initialData?: Note | null; 
}

export function NoteModal({ isOpen, onClose, onSave, initialData }: NoteModalProps) {
    
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");


  if (!isOpen) return null;

  return (
    <div className="modal-overlay"> 
      <dialog open className="note-dialog">
        <div className="dialog-content">
          <div className="dialog-header">
            <h2 className="dialog-title">{initialData ? "Edit Note" : "Add New Note"}</h2>
            <button className="close-btn" onClick={onClose}>x</button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            onSave(title, content, initialData?._id); 
            setTitle("");           
            setContent("");         
            onClose();              
          }}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input 
                type="text" 
                className="form-input" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..." 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea 
                className="form-textarea" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..." 
                required
              ></textarea>
            </div>

            <div className="dialog-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">Save Note</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}