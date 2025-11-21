import React, { useEffect, useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import fetchJsonSafe from '../../utils/fetchJsonSafe';

export default function DashboardPage() {
    const { lojaId: contextLojaId } = useStore();
    const { lojaId: paramLojaId } = useParams();
    const lojaId = paramLojaId || contextLojaId || 'loja1';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [stats, setStats] = useState({
        productsAvailable: 0,
        activeOrders: 0,
        upcomingReturns: 0,
        clients: 0,
    });
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);


    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const base = process.env.REACT_APP_API_BASE ? process.env.REACT_APP_API_BASE.replace(/\/$/, '') : 'http://localhost:3001';
                const url = `${base}/products`;

                const data = await fetchJsonSafe(url, {
                    headers: {
                        'x-loja-id': lojaId,
                        'Content-Type': 'application/json'
                    }
                });

                if (mounted) setProducts(Array.isArray(data.data) ? data.data : []);
            } catch (err) {
                console.warn('Falha ao buscar produtos:', err.message);
                if (mounted) setError(err.message || 'Erro ao carregar produtos');
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => { mounted = false; };
    }, [lojaId]);

    // Busca as estatísticas do backend quando disponível (mantido o padrão, mas adicionando o header)
    useEffect(() => {
        let mounted = true;
        async function loadStats() {
            setStatsLoading(true);
            setStatsError(null);
            try {
                const base = process.env.REACT_APP_API_BASE ? process.env.REACT_APP_API_BASE.replace(/\/$/, '') : 'http://localhost:3001';
                const url = `${base}/dashboard/stats`;

                try {
                    const data = await fetchJsonSafe(url, {
                        headers: {
                            'x-loja-id': lojaId,
                            'Content-Type': 'application/json'
                        }
                    });
                    const mapped = {
                        productsAvailable: Number(data.productsAvailable ?? data.products ?? data.totalProducts ?? stats.productsAvailable) || 0,
                        activeOrders: Number(data.activeOrders ?? data.ordersActive ?? data.active ?? stats.activeOrders) || 0,
                        upcomingReturns: Number(data.upcomingReturns ?? data.returnsSoon ?? data.nextReturns ?? stats.upcomingReturns) || 0,
                        clients: Number(data.clients ?? data.totalClients ?? data.customers ?? stats.clients) || 0,
                    };
                    if (mounted) setStats(mapped);
                } catch (err) {
                    console.warn('Falha ao buscar estatísticas:', err.message);
                    if (mounted) {
                        setStatsError(err.message || 'Erro ao carregar estatísticas');
                    }
                }
            } catch (err) {
                if (mounted) setStatsError(err.message || 'Erro ao carregar estatísticas');
            } finally {
                if (mounted) setStatsLoading(false);
            }
        }

        loadStats();
        return () => { mounted = false; };
    }, [lojaId]);

    const getStatusColor = (status) => {
        if (!status) return '#999';
        const s = String(status).toLowerCase();
        if (s.includes('alug')) return '#d90003';
        if (s.includes('disp')) return '#24bcc4';
        return '#999';
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <h2 className={styles.pageTitle}>Painel Leoni - Controle ({lojaId.toUpperCase()})</h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>PRODUTOS DISPONÍVEIS</p>
                        <p className={styles.statValue}>{statsLoading ? '...' : stats.productsAvailable}</p>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>PEDIDOS ATIVOS</p>
                        <p className={styles.statValue}>{statsLoading ? '...' : stats.activeOrders}</p>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>PRÓXIMAS DEVOLUÇÕES</p>
                        <p className={styles.statValue}>{statsLoading ? '...' : stats.upcomingReturns}</p>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>CLIENTES</p>
                        <p className={styles.statValue}>{statsLoading ? '...' : stats.clients}</p>
                    </div>
                </div>
                <div className={styles.searchRow}>
                    <input
                        type="text"
                        placeholder="Busca por nome, código ou tamanho"
                        className={styles.searchInput}
                    />
                    <select className={styles.filterSelect}>
                        <option>Todos os tipos</option>
                    </select>
                </div>
                <div className={styles.productsGrid}>
                    {loading && <p>Carregando produtos...</p>}
                    {error && <p style={{ color: 'crimson' }}>Erro: {error}</p>}
                    {!loading && !error && products.length === 0 && (
                        <p>Nenhum produto cadastrado na loja {lojaId}.</p>
                    )}
                    {!loading && !error && products.map((p) => (
                        <div className={styles.productCard} key={p.id || p._id || p.code}>
                            <div className={styles.productImageContainer}>
                                <img
                                    src={p.foto || p.imageUrl || p.image || '/125-6.webp'}
                                    alt={p.nome || 'Produto'}
                                    className={styles.productImage}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{p.nome || p.title || 'Sem nome'}</h3>
                                <div className={styles.statusBadge}>
                                    <div
                                        className={styles.statusIndicator}
                                        style={{ width: '26px', backgroundColor: getStatusColor(p.status || (p.quantidade > 0 ? 'Disponível' : 'Alugado')) }}
                                    />
                                    <span className={styles.statusText}>{p.status || (p.quantidade > 0 ? 'Disponível' : 'Alugado')}</span>
                                </div>
                                <p className={styles.productSize}>Preço: R$ {p.preco || '0.00'}</p>
                            </div>
                            <div className={styles.actionButtons}>
                                <button className={styles.primaryBtn}>Detalhes</button>
                                <button className={styles.secondaryBtn}>Editar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
