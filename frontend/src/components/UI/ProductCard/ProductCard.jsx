import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onPrimary, onEdit }) {
    const status = product?.status || 'Indefinido';
    const isAlugado = String(status).toLowerCase().includes('alug');

    return (
        <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
                <img
                    src={product?.imageUrl || product?.image || '/125-6.webp'}
                    alt={product?.name || 'Produto'}
                    className={styles.productImage}
                />
            </div>

            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product?.name || product?.title || 'Sem nome'}</h3>
                <div className={styles.statusBadge}>
                    <div
                        className={styles.statusIndicator}
                        style={{ backgroundColor: isAlugado ? '#d90003' : '#24bcc4' }}
                    />
                    <span className={styles.statusText}>{status}</span>
                </div>
                <p className={styles.productSize}>Tam: {product?.size || product?.sizeLabel || '—'}</p>
            </div>

            <div className={styles.actionButtons}>
                <button className={styles.primaryBtn} onClick={() => onPrimary && onPrimary(product)}>
                    {isAlugado ? 'Devolver' : 'Alugar'}
                </button>
                <button className={styles.secondaryBtn} onClick={() => onEdit && onEdit(product)}>Editar</button>
            </div>
        </div>
    );
}
