
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Para navegação e links
import styles from './LoginPage.module.css'; // Importando o CSS Module
import leoniLogo from '../../assets/img/leoni_logo.png'; // Importando a imagem

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegação programática

  const handleLogin = (event) => {
    event.preventDefault(); // Previne o recarregamento da página
    setIsLoading(true); // Ativa o estado de "carregando"

    // Simula uma chamada de API e redireciona após 900ms
    setTimeout(() => {
      // Em uma aplicação real, aqui você faria a chamada para o backend
      // e só navegaria em caso de sucesso.
      navigate('/dashboard'); // Navega para a rota do dashboard
    }, 900);
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
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="E-mail" required disabled={isLoading} />
            <input type="password" placeholder="Senha" required disabled={isLoading} />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
      
      {/* O componente Link é a forma correta de criar links de navegação interna */}
      <Link to="/" className={styles.buttonBack}>
        ← Voltar ao Menu Principal
      </Link>
    </div>
  );
}

export default LoginPage;