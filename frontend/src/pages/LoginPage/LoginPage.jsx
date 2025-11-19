
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginPage.module.css';
import leoniLogo from '../../assets/img/leoni_logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate('/clientes');
    } else {
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
          <h2>Entrar</h2>
          
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

          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            Não tem conta? <Link to="/register">Cadastre-se</Link>
          </p>

          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            <Link to="/forgotpassword" style={{ color: '#177b81', fontSize: '14px' }}>
              Esqueceu sua senha?
            </Link>
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