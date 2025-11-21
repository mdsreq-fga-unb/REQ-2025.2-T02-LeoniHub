import React from 'react';
import styles from './StatCard.module.css';

export default function StatCard({ label, value, loading }) {
    return (
        <div className={styles.statCard}>
            <p className={styles.statLabel}>{label}</p>
            <p className={styles.statValue}>{loading ? '...' : value}</p>
        </div>
    );
}
