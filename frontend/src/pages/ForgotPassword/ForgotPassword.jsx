import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { useAuth } from '../../contexts/AuthContext';
import leoniLogo from '../../assets/img/leonni_logo.jpeg';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { loading, forgotPassword } = useAuth();  

  const handlePasswordRecover = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage(''); // Limpa msg de sucesso anterior ao tentar de novo

    const result = await forgotPassword(email);

    if (result.success) {
      setSuccessMessage(result.message || 'E-mail de recuperação enviado com sucesso!');
      setEmail(''); // Limpa o campo após sucesso
    } else {
      setError(result.error || 'Não foi possível enviar o e-mail. Verifique o endereço.');
    }
  }
  
  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        
        {/* Lado Esquerdo - Marca */}
        <div className={styles.loginLeft}>
          <img 
            src={leoniLogo} 
            alt="Logo Leoni Hub" 
            className={styles.logoImage} 
          />
          <h1 className={styles.brandTitle}>Leonni Hub</h1>
          <p className={styles.brandSubtitle}>
            Sistema de gestão premium para ternos e alfaiataria.
          </p>
        </div>

        {/* Lado Direito - Formulário */}
        <div className={styles.loginRight}>
          <h2>Recuperar Senha</h2>
          <p className={styles.description}>
            Informe seu e-mail cadastrado para receber as instruções de redefinição.
          </p>

          {error && (
            <div className={styles.alertError}>
              ⚠️ {error}
            </div>
          )}
          
          {successMessage && (
            <div className={styles.alertSuccess}>
              ✅ {successMessage}
            </div>
          )}
          
          <form onSubmit={handlePasswordRecover} className={styles.formulario}>
            <input 
              type="email" 
              placeholder="Digite seu e-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
              autoComplete="email"
            />
            
            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Instruções'}
            </button>
          </form>
        </div>
      </div>

      <Link to="/login" className={styles.buttonBack}>
        ← Voltar para o Login
      </Link>
    </div>
  )
}