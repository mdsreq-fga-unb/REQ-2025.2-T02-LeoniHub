
import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
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

  const { lojaId } = useParams();
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  function validarCPF(cpf) { // Retorna "true" se CPF é valido e "false" se não é.
    // 1. Remove caracteres não numéricos (pontos, traços) -> REGEX
    const cpfLimpo = String(cpf).replace(/[^\d]/g, '');

    // 2. Verifica se o CPF tem 11 dígitos
    if (cpfLimpo.length !== 11) {
        return false;
    }

    // 3. Verifica se todos os dígitos são iguais (ex: "00000000000")
    // Regex: ^(\d) -> captura o primeiro dígito; \1{10}$ -> verifica se ele se repete 10x
    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
        return false;
    }

    // 4. Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) { 
        soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    
    let resto = soma % 11;
    let digitoVerificador1 = (resto < 2) ? 0 : (11 - resto);

    // 5. Verifica se o primeiro dígito verificador está correto
    if (digitoVerificador1 !== parseInt(cpfLimpo.charAt(9))) {
        return false;
    }

    // 6. Calcula o segundo dígito verificador (incluindo o primeiro DV)
    soma = 0;
    for (let i = 0; i < 10; i++) {
        // Multiplica os 10 primeiros dígitos pela sequência 11, 10, 9...
        soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    
    resto = soma % 11;
    let digitoVerificador2 = (resto < 2) ? 0 : (11 - resto);

    // 7. Verifica se o segundo dígito verificador está correto
    if (digitoVerificador2 !== parseInt(cpfLimpo.charAt(10))) {
        return false;
    }

    // 8. Se passou por todas as verificações, o CPF é válido
    return true;
    }

  function validarSenha(password, passwordConfirmation){
    if(password !== passwordConfirmation) return false ;
    return true;
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    // Validações básicas
    if (!email || !password || !cpf || !passwordConfirmation || !nomeCompleto) {
      setError('Preencha todos os campos');
      return;
    }

    if (validarCPF(cpf) === false){
        setError('Insira um CPF válido!');
        return;
    }

    if(!validarSenha(password, passwordConfirmation)){
        setError('As duas senhas tem que ser iguais!');
        return;
    }
    const result = await signup(lojaId, email, password, nomeCompleto, cpf);

    if (result.success) {
      // Login bem-sucedido, redirecionar para dashboard
      setSuccessMessage('Cadastro realizado! Verifique seu e-mail para autenticar sua conta!');
    } else {
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
          <h2>Registar - {lojaId}</h2>
          
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
              type="tel" // Aqui estou usando o campo 'tel' porque permite APENAS números e "." e "-"  
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
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

        </div>
      </div>
      
      <Link to="/" className={styles.buttonBack}>
        ← Voltar ao Menu Principal
      </Link>
    </div>
  );
}

export default RegisterPage;