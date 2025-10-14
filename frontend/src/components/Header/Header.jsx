import React from 'react';
import { Link } from 'react-router-dom'; // Para o logo ser clicável
import Navbar from '../Navbar/Navbar'; // Importe a Navbar!
import styles from './Header.module.css';

import logo from '../../assets/img/leoni_logo.png'
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Lado Esquerdo: Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Logo da Empresa" className={styles.logoImage}></img>
          </Link>
          <strong>Leoni Hub</strong>
        </div>

        {/* Centro: Navegação Principal */}
        <Navbar />

      </div>
    </header>
  );
};

export default Header;