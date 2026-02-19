import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onAddClick: () => void;
  theme: 'light' | 'dark';  
  onThemeToggle: () => void;
}

export function Header({ onAddClick, theme, onThemeToggle }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0 }}>Quick Notes</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="add-note-btn" onClick={onAddClick}>
          Add Note
        </button>
        
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />

        <button 
          className="theme-toggle-btn" 
          onClick={() => navigate('/account')} 
          title="Meu Perfil"
        >
          👤
        </button>
      </div>
      
    </header>
  );
}