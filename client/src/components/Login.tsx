import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isRegistering ? 'register' : 'login';
    const toastId = toast.loading('A processar...');
    try {
      const response = await fetch(`http://localhost:3000/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
               
        if (!isRegistering) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('email', email); 
          toast.success('Login efetuado com sucesso!', { id: toastId });
          navigate('/'); 
        } else {
          toast.success('Conta criada com sucesso! Agora podes entrar.', { id: toastId });
          navigate('/');
          setIsRegistering(false);
        }
      } else {
        toast.error(data.message || "Erro na operação", { id: toastId });
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      toast.error("Erro ao conectar ao servidor", { id: toastId });
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegistering ? 'Criar Conta' : 'Entrar'}</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isRegistering ? 'Registar' : 'Entrar'}</button>
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Já tens conta? Entra aqui' : 'Não tens conta? Regista-te'}
        </p>
      </form>
    </div>
  );
};