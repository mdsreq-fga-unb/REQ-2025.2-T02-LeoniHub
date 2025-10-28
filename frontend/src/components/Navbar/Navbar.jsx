import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import styles from './Navbar.module.css';
import logo from '../../assets/img/leoni_logo.png';

const Navbar = () => {
  // Usa o StoreContext como fonte única do lojaId
  const { lojaId, clearLoja } = useStore();
  const navigate = useNavigate();

  // Gera rota no formato /<base>/<lojaId> quando existir lojaId, caso contrário retorna a rota sem id.
  // Ex: mk('/dashboard') -> '/dashboard/leoni' ou '/dashboard' se não houver lojaId
  const mk = (path) => {
    if (!lojaId) return path;
    const clean = path.startsWith('/') ? path.slice(1) : path;
    if (clean === '') return `/dashboard/${lojaId}`;
    return `/${clean}/${lojaId}`;
  };

  const handleLogout = (e) => {
    e.preventDefault();
    try { clearLoja(); } catch (err) { /* ignore */ }
    navigate('/');
  };

  return (
    <nav className="sidebar">

      <div className="header-row">
        <img className="logo-img" src={logo} alt="Leoni Logo" />
        <strong className={styles.title}>Leoni Hub</strong>
      </div>

      <ul className={styles.navList}>
        <li>
          <NavLink
            to={mk('/dashboard')}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Estoque
          </NavLink>
        </li>

        <li>
          <NavLink
            to={mk('/orders')}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Pedidos
          </NavLink>
        </li>

        <li>
          <NavLink
            to={mk('/clientes')}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Clientes
          </NavLink>
        </li>

        <li>
          <NavLink
            to={mk('/products')}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Produtos
          </NavLink>
        </li>

        <li>
          <NavLink
            to={mk('/contratos')}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Contratos
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'/'}
            onClick={(e) => { handleLogout(e); }}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Sair
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;