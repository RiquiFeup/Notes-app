import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../types.js';
import { Header } from './Header';
import { NoteCard } from './NoteCard';
import { NoteModal } from './NoteModal';

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate(); 

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [theme]); 

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes', {
          headers: getAuthHeaders() 
        });
        
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Erro ao procurar notas:", error);
      }
    };

    fetchNotes();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(), 
      });

      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (error) { console.error("Erro ao apagar:", error); }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note); 
    setIsModalOpen(true); 
  };

  const handleSave = async (title: string, content: string, id?: string) => {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/notes/${id}` : 'http://localhost:3000/notes';

    try {
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(), 
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const savedNote = await response.json();
        if (id) {
          setNotes(notes.map(n => n._id === id ? savedNote : n));
        } else {
          setNotes([savedNote, ...notes]); 
        }
        setIsModalOpen(false);
        setEditingNote(null);
      }
    } catch (error) { console.error("Erro ao guardar:", error); }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT'); 
  };

  return (
    <>

      <Header onAddClick={() => setIsModalOpen(true)} theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      
      <NoteModal 
        key={editingNote?._id || 'new'} 
        isOpen={isModalOpen}
        initialData={editingNote} 
        onClose={() => { setIsModalOpen(false); setEditingNote(null); }}
        onSave={handleSave}
      />
      
      <main id="notesContainer" className="notes-grid">
        {notes.length === 0 ? (
          <div className="empty-state">
            <h2>Sem notas</h2>
            <p>Cria a tua primeira nota para começar!</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} onEdit={handleEdit} formatDate={formatDate} />
          ))
        )}
      </main>
    </>
  );
};