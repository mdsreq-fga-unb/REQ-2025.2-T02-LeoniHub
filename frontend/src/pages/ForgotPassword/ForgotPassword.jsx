import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { useAuth } from '../../contexts/AuthContext';
import leoniLogo from '../../assets/img/leoni_logo.png';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { loading, forgotPassword } = useAuth();  

  const handlePasswordRecover = async (event) => {
    event.preventDefault();
    setError('');

    // Chamar função de ForgotPassword do Context
    const result = await forgotPassword(email);

    if (result.success) {
      setSuccessMessage(result.message || 'Verifique seu e-mail para recuperar sua senha!');
    } else {
      // Mostrar erro
      setError(result.error || 'Erro ao recuperar a senha');
    }
  }

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
          <h2>Recuperar Senha</h2>

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

          {successMessage && (
            <div style={{ 
              color: 'green', 
              backgroundColor: 'rgba(197, 255, 180, 1)', 
              padding: '10px', 
              borderRadius: '5px',
              marginBottom: '15px'
            }}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handlePasswordRecover}>
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>

          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#177b81' }}>Voltar para Login</Link>
          </p>
        </div>
      </div>

      <Link to="/" className={styles.buttonBack}>
        ← Voltar ao Menu Principal
      </Link>
    </div>
  )
}
