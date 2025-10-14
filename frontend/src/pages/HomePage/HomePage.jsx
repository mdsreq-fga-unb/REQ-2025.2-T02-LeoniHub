import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Para navegação e links
import styles from './HomePage.module.css'; // Importando o CSS Module
import leoniLogo from '../../assets/img/leoni_logo.png'; // Importando a imagem

export default function HomePage() {

    return(
        <div className={styles.body}>
            <div className={styles.title}>PAGINA HOME!</div>
        </div>
    )

}