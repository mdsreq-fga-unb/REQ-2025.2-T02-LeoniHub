import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  
  const { lojaId } = useParams();  
  const { loading, forgotPassword } = useAuth();  

  const handlePasswordRecover = async (event) => {
    event.preventDefault();
    setError('');

    // Validação básica
    if (!email) {
      setError('O campo E-mail não pode estar vazio');
      return;
    }

    // Chamar função de ForgotPassword do Context
    const result = await forgotPassword(email, lojaId);

    if (result.success) {
      setSuccessMessage(result.message || 'Verifique seu e-mail para recuperar sua senha!');
    } else {
      // Mostrar erro
      setError(result.error || 'Erro ao recuperar a senha');
    }
  }

  return (
    <div className={styles.body}>
        <div className={styles.header}>
            <h1 className={styles.mainTitle}>Esqueci a Senha - {lojaId}</h1>
        </div>

        <div className={styles.formularioCard}>
            <div className={styles.formulario}>

                <h2> Insira seu E-mail </h2>

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
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
            </div>
        </div>

    </div>
  )
}
