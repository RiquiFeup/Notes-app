interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header>
      <h1>Quick Notes</h1>
      <div>
        <button className="add-note-btn" onClick={onAddClick}>
          Add Note
        </button>
        <button id="themeToggleBtn" className="theme-toggle-btn">🌙</button>
      </div>
    </header>
  );
}