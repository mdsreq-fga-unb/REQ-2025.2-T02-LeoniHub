import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  // Boa prática: Gerar o ano dinamicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* Seção 1: Sobre a empresa ou logo */}
        <div className={styles.footerSection}>
          <h4>Nome da Empresa</h4>
          <p>Uma breve descrição sobre o seu negócio.</p>
        </div>

        {/* Seção 2: Links de navegação */}
        <div className={styles.footerSection}>
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="/sobre">Sobre Nós</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
          </ul>
        </div>

        {/* Seção 3: Redes Sociais */}
        <div className={styles.footerSection}>
          <h4>Siga-nos</h4>
          {/* Aqui você colocaria os ícones das redes sociais */}
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} Nome da Empresa. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;