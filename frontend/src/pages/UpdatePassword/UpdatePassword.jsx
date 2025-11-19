import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './UpdatePassword.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default function UpdatePassword() {

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { loading, changePassword } = useAuth();

  // Este hook roda assim que a página carrega
  useEffect(() => {

    // 1. Pega o fragmento "hash" da URL (ex: #access_token=...&...)
    const hash = window.location.hash;
    
    // 2. Converte os parâmetros do hash (tipo URL) para um objeto
    const params = new URLSearchParams(hash.substring(1)); // Remove o '#'
    
    // 3. Pega o access_token
    const accessToken = params.get('access_token');

    /*Comentário do Diogo: Essa etapa é devido a como o Supabase funciona na função de troca de senha, através do link enviado no e-mail
    um parametro no URL é o TOKEN necessário pra recuperar a senha sem a necessidade de inserir o e-mail novamente*/

    if (accessToken) {
      setToken(accessToken);
    } else {
      setError('Token de redefinição inválido ou não encontrado.');
    }
  }, []); 

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if(newPassword !== newPasswordConfirmation){
        setError('As senhas não conferem!')
        return;
    }
    if(!token){
        setError('Token de redefinição não encontrado. Tente novamente.')
        return;
    }

    // Chamar função de resetPassword com o TOKEN
    const result = await changePassword(token, newPassword, newPasswordConfirmation);

    if (result.success) {
      setSuccessMessage(result.message || 'Senha alterada com sucesso!');
    } else {
      setError(result.error || 'Erro ao alterar a senha');
    }
  }

  return (
    <div className={styles.body}>
        <div className={styles.header}>
            <h1 className={styles.mainTitle}>Alterar Senha</h1>
        </div>

        <div className={styles.formularioCard}>
            <div className={styles.formulario}>

                <h2> Insira a nova senha </h2>

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

                <form onSubmit={handlePasswordReset}>
                    <input 
                    type="password" 
                    placeholder="Nova senha" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                    />
                    <input 
                    type="password" 
                    placeholder="Nova senha novamente" 
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    required 
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>

                <Link to="/" className={styles.buttonBack}>
                  ← Voltar ao Menu Principal
                </Link>

            </div>
        </div>
    </div>
  )
}
