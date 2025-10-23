import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/img/leoni_logo.png'

const Navbar = () => {
  return (
    <nav className="sidebar">

      <div className="header-row">
      <img className="logo-img" src={logo} alt='Leoni Logo'></img>
        <strong className={styles.title}>Leoni Hub</strong>
      </div>

      <ul className={styles.navList}>
        <li>

          {/*Aplica a estilização do navLink em todos, se estiver ativa (na Page) ativa o outro estilo*/ }

          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login"
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/register"
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Registro
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;