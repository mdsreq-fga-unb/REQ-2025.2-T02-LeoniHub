import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './UpdatePassword.module.css';
import { useAuth } from '../../contexts/AuthContext';
import leoniLogo from '../../assets/img/leonni_logo.jpeg'; 

export default function UpdatePassword() {

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { loading, changePassword } = useAuth();

  useEffect(() => {
    // Lógica para pegar o token da URL (Padrão Supabase)
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1)); // Remove o '#'
    const accessToken = params.get('access_token');
    const errorDescription = params.get('error_description');

    if (accessToken) {
      setToken(accessToken);
    } else if (errorDescription) {
       setError(decodeURIComponent(errorDescription));
    } else {
       // Se não tem hash, talvez o usuário acessou a rota direto sem clicar no email
       setError('Link inválido ou expirado. Solicite uma nova redefinição.');
    }
  }, []); 

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if(newPassword !== newPasswordConfirmation){
        setError('As senhas digitadas não coincidem.');
        return;
    }
    
    if (newPassword.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    if(!token){
        setError('Token de segurança não encontrado. Solicite um novo link por e-mail.');
        return;
    }

    const result = await changePassword(token, newPassword, newPasswordConfirmation);

    if (result.success) {
      setSuccessMessage('Sua senha foi alterada com sucesso! Você já pode fazer login.');
      setNewPassword('');
      setNewPasswordConfirmation('');
    } else {
      setError(result.error || 'Não foi possível alterar a senha. Tente novamente.');
    }
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        
        {/* Lado Esquerdo - Branding */}
        <div className={styles.loginLeft}>
          <img 
            src={leoniLogo} 
            alt="Logo Leoni Hub" 
            className={styles.logoImage} 
          />
          <h1 className={styles.brandTitle}>Leoni Hub</h1>
          <p className={styles.brandSubtitle}>
            Segurança em primeiro lugar. Defina uma nova senha forte para sua conta.
          </p>
        </div>

        {/* Lado Direito - Formulário */}
        <div className={styles.loginRight}>
          <h2>Redefinir Senha</h2>
          <p className={styles.description}>
            Crie uma nova senha para acessar o painel administrativo.
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

          <form onSubmit={handlePasswordReset} className={styles.formulario}>
              <input 
                type="password" 
                placeholder="Nova senha" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
                disabled={loading || !token}
                autoComplete="new-password"
              />
              <input 
                type="password" 
                placeholder="Confirme a nova senha" 
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                required 
                disabled={loading || !token}
                autoComplete="new-password"
              />

              <button type="submit" disabled={loading || !token}>
                  {loading ? 'Salvando...' : 'Alterar Senha'}
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