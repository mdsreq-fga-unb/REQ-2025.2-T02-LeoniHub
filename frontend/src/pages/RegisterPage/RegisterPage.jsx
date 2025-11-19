
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './RegisterPage.module.css';
import leoniLogo from '../../assets/img/leoni_logo.png';

function RegisterPage() {

  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { signup, loading } = useAuth();


  function validarSenha(password, passwordConfirmation){
    if(password !== passwordConfirmation) return false ;
    return true;
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    if(!validarSenha(password, passwordConfirmation)){
        setError('As duas senhas tem que ser iguais!');
        return;
    }

    const result = await signup(email, password, nomeCompleto, cpf);

    if (result.success) {
      // Registro bem-sucedido
      setSuccessMessage('Cadastro realizado! Verifique seu e-mail para autenticar sua conta!');
    } 
    else {
      // Mostrar erro
      setError(result.error || 'Erro ao se registrar');
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
          <h2>Registar </h2>
          
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

          <form onSubmit={handleRegister}>
            <input 
              type="nomeCompleto" 
              placeholder="Nome Completo" 
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required 
              disabled={loading} 
            />
            <input 
              type="text" // Aqui estou usando o campo 'tel' porque permite APENAS números e "." e "-"  
              placeholder="CPF" 
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required 
              disabled={loading} 
            />
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
            <input 
              type="password" 
              placeholder="Confirmação da Senha" 
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required 
              disabled={loading} 
            />
            
            <button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>

          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            Já tem uma conta? <Link style={{color:'#1876b1ff'}} to="/login">Faça Login</Link>
          </p>

        </div>
      </div>
      
      <Link to="/" className={styles.buttonBack}>
        ← Voltar ao Menu Principal
      </Link>
    </div>
  );
}

export default RegisterPage;