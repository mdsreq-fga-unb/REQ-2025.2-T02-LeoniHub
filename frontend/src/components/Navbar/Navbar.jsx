import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/img/leoni_logo.png';
import icEstoque from '../../assets/icons/estoque.svg';
import icPedidos from '../../assets/icons/pedidos.svg';
import icClientes from '../../assets/icons/clientes.svg';
import icProdutos from '../../assets/icons/produtos.svg';
import icContratos from '../../assets/icons/contratos.svg';
import icSair from '../../assets/icons/sair.svg';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { logout, lojaId } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      // ignore logout errors but continue navigation
      console.warn('logout failed', err);
    }
    navigate('/login/Leonni');
  };

  return (
    <nav className="sidebar">
      <div className="header-row">
        <img className="logo-img" src={logo} alt="Leoni Logo" />
        <div>
          <strong className={styles.title}>Leoni Hub</strong>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
            {lojaId || localStorage.getItem('lojaId') || ''}
          </div>
        </div>
      </div>

      <ul className={styles.navList}>
        <li>
          <NavLink to="/estoque" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            <img src={icEstoque} alt="Estoque" className={styles.icon} />
            <span> Estoque</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pedidos" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            <img src={icPedidos} alt="Pedidos" className={styles.icon} />
            <span> Pedidos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/clientes" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            <img src={icClientes} alt="Clientes" className={styles.icon} />
            <span> Clientes</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/produtos" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            <img src={icProdutos} alt="Produtos" className={styles.icon} />
            <span> Produtos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contratos" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            <img src={icContratos} alt="Contratos" className={styles.icon} />
            <span> Contratos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login/Leonni" onClick={async (e) => { e.preventDefault(); await handleLogout(); }} className={styles.navLink}>
            <img src={icSair} alt="Sair" className={styles.icon} />
            <span> Sair</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;