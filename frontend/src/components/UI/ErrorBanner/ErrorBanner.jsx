import React from 'react';
import styles from './ErrorBanner.module.css';

export default function ErrorBanner({ message }) {
    if (!message) return null;
    return (
        <div className={styles.error} role="alert">
            {message}
        </div>
    );
}
