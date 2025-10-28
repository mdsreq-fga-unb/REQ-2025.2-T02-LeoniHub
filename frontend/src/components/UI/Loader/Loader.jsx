import React from 'react';
import styles from './Loader.module.css';

export default function Loader({ size = 36 }) {
    return (
        <div className={styles.loader} style={{ width: size, height: size }} aria-hidden="true" />
    );
}
