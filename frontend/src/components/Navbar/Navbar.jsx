import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
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
            Resgistro
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;