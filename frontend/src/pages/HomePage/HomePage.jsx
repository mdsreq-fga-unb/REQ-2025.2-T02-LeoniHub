import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import leoniLogo from '../../assets/img/leonni_logo.jpeg';
import closetChicLogo from '../../assets/img/closet_chic.jpeg';

export default function HomePage() {
    
    const navigate = useNavigate();

    return (
        <div className={styles.body}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>Leoni Hub</h1>
                <p className={styles.subtitle}>Portal Administrativo</p>
                <p className={styles.description}>Acesse os sistemas de gestão das lojas</p>
            </div>

            {/* Cards das Lojas */}
            <div className={styles.storesContainer}>

                {/* Card Leoni */}
                <div className={styles.storeCard}>
                    <div className={styles.statusBadge}>
                        Online
                    </div>
                    
                    <div className={styles.logoContainer}>
                        <img 
                            src={leoniLogo} 
                            alt="Leonni Logo" 
                            className={styles.storeLogo}
                        />
                    </div>
                    
                    <h2 className={styles.storeName}>Leonni</h2>
                    <p className={styles.storeDescription}>Ternos e acessórios masculinos</p>
                    
                    <button 
                        className={`${styles.accessButton} ${styles.leoniButton}`}
                        onClick={() => (navigate('/login'))}
                    >
                        Acessar Sistema
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>© 2025 Styloni Hub — Sistema de Gestão Integrado</p>
            </footer>
        </div>
    );
}