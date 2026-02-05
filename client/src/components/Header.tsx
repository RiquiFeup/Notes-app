import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onAddClick: () => void;
  theme: 'light' | 'dark';  
  onThemeToggle: () => void;
}

export function Header({ onAddClick, theme, onThemeToggle }: HeaderProps) {
  return (
    <header>
      <h1>Quick Notes</h1>
      <div>
        <button className="add-note-btn" onClick={onAddClick}>
          Add Note
        </button>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
    </header>
  );
}