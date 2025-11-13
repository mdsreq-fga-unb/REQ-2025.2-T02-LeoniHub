import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import leoniLogo from '../../assets/img/leonni_logo.jpeg';
import closetChicLogo from '../../assets/img/closet_chic.jpeg';

export default function HomePage() {
    
    const navigate = useNavigate();

    const handleStoreAccess = (storeId) => {
        // Salva a loja selecionada no localStorage
        localStorage.setItem('lojaId', storeId);
        
        // Navega para a página de login da loja selecionada
        navigate(`/login/${storeId}`);
    };

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
                {/* Card Closet Chic */}
                <div className={styles.storeCard}>
                    <div className={styles.statusBadge}>
                        Online
                    </div>
                    
                    <div className={styles.logoContainer}>
                        <img 
                            src={closetChicLogo} 
                            alt="Closet Chic Logo" 
                            className={styles.storeLogo}
                        />
                    </div>
                    
                    <h2 className={styles.storeName}>Closet Chic</h2>
                    <p className={styles.storeDescription}>Vestidos e acessórios femininos</p>
                    
                    <button 
                        className={`${styles.accessButton} ${styles.closetChicButton}`}
                        onClick={() => handleStoreAccess('ClosetChic')}
                    >
                        Acessar Sistema
                    </button>
                </div>

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
                        onClick={() => handleStoreAccess('Leonni')}
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