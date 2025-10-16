import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  // Boa prática: Gerar o ano dinamicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/*Sobre a empresa ou logo*/}
        <div className={styles.footerSection}>
          <h4>Leoni Hub</h4>
          <p>Projeto de gerenciamento de estoque para a Closet Chic Compartilhada e a Leonni.</p>
        </div>

        {/*Links de navegação */}
        <div className={styles.footerSection}>
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="/">Sobre Nós</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} Leoni Hub. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;