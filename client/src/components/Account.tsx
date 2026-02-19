import { useNavigate } from 'react-router-dom';

export const Account = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-form profile-container">
        <h2>O Meu Perfil 👤</h2>
        
        <div className="profile-info">
          <span className="form-label">
            E-mail associado:
          </span>
          <span className="profile-email">
            {userEmail || 'Não disponível'}
          </span>
        </div>

        <div className="profile-actions">
          <button 
            className="back-btn" 
            onClick={() => navigate('/')}
          >
             Voltar às Notas
          </button>

          <button 
            className="logout-btn"
            onClick={handleLogout} 
          >
            Terminar Sessão
          </button>
        </div>
      </div>
    </div>
  );
};