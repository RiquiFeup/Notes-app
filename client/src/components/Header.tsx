import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onAddClick: () => void;
  theme: 'light' | 'dark';  
  onThemeToggle: () => void;
  searchTerm: string;                     
  onSearchChange: (value: string) => void;
}

export function Header({ onAddClick, theme, onThemeToggle, searchTerm, onSearchChange }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0 }}>Quick Notes</h1>
      </div>
      
      <div style={{ flex: '2', display: 'flex', justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="Pesquisar notas..." 
          className="header-search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
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