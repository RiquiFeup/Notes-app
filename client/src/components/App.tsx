import { useState, useEffect } from 'react'; 
import { Note } from '../types.js';            
import '../index.css';                      
import { Header } from './Header';
import { NoteCard } from './NoteCard';
import { NoteModal } from './NoteModal';


function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Erro ao procurar notas:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      }

    } catch (error) {
      console.error("Erro ao guardar nota:", error);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note); 
    setIsModalOpen(true); 
     
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT'); 
  };

  const handleSave = async (title: string, content: string, id?: string) => {
    const method = id ? 'PUT' : 'POST';
    const url = id 
      ? `http://localhost:3000/notes/${id}` 
      : 'http://localhost:3000/notes';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const savedNote = await response.json();
        
        if (id) {
          const updatedList = notes.map(n => n._id === id ? savedNote : n);
          setNotes(updatedList);
        } else {
          setNotes([...notes, savedNote]);
        }
        setIsModalOpen(false);
        setEditingNote(null);
      }
      
    } catch (error) {
      console.error("Erro ao guardar:", error);
    }
};

  return (
    <>
      <Header onAddClick={() => setIsModalOpen(true)} />

      <NoteModal 
        key={editingNote?._id || 'new'} 
        isOpen={isModalOpen}
        initialData={editingNote} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSave}
      />
      
      <main id="notesContainer" className="notes-grid">
        {notes.length === 0 ? (
          <div className="empty-state">
            <h2>No notes yet</h2>
            <p>Create your first note to get started!</p>
          </div>
        ) : (
          notes.map((note) => (
          <NoteCard 
            key={note._id} 
            note={note} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
            formatDate={formatDate} 
          />
        ))
        )}

      </main>
    </>
  );
}

export default App
