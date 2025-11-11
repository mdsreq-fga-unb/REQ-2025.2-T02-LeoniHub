
import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginPage.module.css';
import leoniLogo from '../../assets/img/leoni_logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { lojaId } = useParams();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    // Validações básicas
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    // Chamar função de login do Context
    const result = await login(lojaId, email, password);

    if (result.success) {
      // Login bem-sucedido, redirecionar para dashboard
      navigate('/dashboard');
    } else {
      // Mostrar erro
      setError(result.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.loginLeft}>
          <img 
            src={leoniLogo} 
            alt="Logo Leoni Hub" 
            className={styles.logoImage} 
          />
          <h1 className={styles.brandTitle}>Leoni Hub</h1>
          <p className={styles.brandSubtitle}>
            Painel administrativo para gerenciamento de ternos e acessórios masculinos
          </p>
        </div>

        <div className={styles.loginRight}>
          <h2>Entrar - {lojaId}</h2>
          
          {error && (
            <div style={{ 
              color: 'red', 
              backgroundColor: '#ffe6e6', 
              padding: '10px', 
              borderRadius: '5px',
              marginBottom: '15px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading} 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={loading} 
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link style={{color:'#1876b1ff'}} to={`/forgotpassword/${lojaId}`}>Esqueceu a senha?</Link>
          </p>


          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            Não tem conta? <Link style={{color:'#1876b1ff'}} to={`/register/${lojaId}`}>Cadastre-se</Link>
          </p>
        </div>
      </div>
      
      <Link to="/" className={styles.buttonBack}>
        ← Voltar ao Menu Principal
      </Link>
    </div>
  );
}

export default LoginPage;