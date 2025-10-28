import React from 'react';
import styles from './EmptyState.module.css';

export default function EmptyState({ title = 'Nada por aqui', children }) {
    return (
        <div className={styles.empty}>
            <p className={styles.title}>{title}</p>
            {children && <div className={styles.children}>{children}</div>}
        </div>
    );
}
