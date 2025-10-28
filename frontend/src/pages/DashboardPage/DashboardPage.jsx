import React, { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Estatísticas (preparadas para serem carregadas do backend)
    const [stats, setStats] = useState({
        productsAvailable: 0,
        activeOrders: 0,
        upcomingReturns: 0,
        clients: 0,
    });
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);

    // Fallback mocks (úteis enquanto o backend não estiver disponível)
    const fallbackProducts = [
        { id: '1', name: 'Vestido Leoni A', status: 'Disponível', size: 'M', imageUrl: '/125-6.webp' },
        { id: '2', name: 'Camisa Leoni B', status: 'Alugado', size: 'G', imageUrl: '/125-6.webp' },
        { id: '3', name: 'Saia Leoni C', status: 'Disponível', size: 'P', imageUrl: '/125-6.webp' },
    ];

    const fallbackStats = {
        productsAvailable: 32,
        activeOrders: 5,
        upcomingReturns: 2,
        clients: 48,
    };

    // Helper seguro para fetch que valida status e content-type antes de parsear JSON
    async function fetchJsonSafe(url, opts) {
        const res = await fetch(url, opts);
        const text = await res.text();
        const contentType = res.headers.get('content-type') || '';

        if (!res.ok) {
            // Log para diagnóstico e lançar erro
            console.error('fetch error', { url, status: res.status, body: text.slice(0, 1000) });
            throw new Error(`HTTP ${res.status}`);
        }

        // Se o content-type não indicar JSON, tentar parsear mesmo assim, senão lançar erro com preview
        if (!contentType.includes('application/json')) {
            try {
                return JSON.parse(text.replace(/^\uFEFF/, ''));
            } catch (e) {
                console.warn('Resposta não é JSON', { url, contentType, bodyPreview: text.slice(0, 400) });
                throw new Error('Resposta não é JSON');
            }
        }

        try {
            return JSON.parse(text.replace(/^\uFEFF/, ''));
        } catch (err) {
            console.error('JSON parse failed', { url, bodyPreview: text.slice(0, 1000) });
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const base = process.env.REACT_APP_API_BASE ? process.env.REACT_APP_API_BASE.replace(/\/$/, '') : '';
                const url = base ? `${base}/products` : '/api/products';

                const data = await fetchJsonSafe(url);
                if (mounted) setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.warn('Falha ao buscar produtos, usando fallback mock:', err.message);
                if (mounted) {
                    setProducts(fallbackProducts);
                    setError('Backend não disponível — mostrando dados mock');
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => { mounted = false; };
    }, []);

    // Busca as estatísticas do backend quando disponível
    useEffect(() => {
        let mounted = true;
        async function loadStats() {
            setStatsLoading(true);
            setStatsError(null);
            try {
                // endpoint preparado: /api/dashboard/stats (padrão)
                const base = process.env.REACT_APP_API_BASE ? process.env.REACT_APP_API_BASE.replace(/\/$/, '') : '';
                const url = base ? `${base}/dashboard/stats` : '/api/dashboard/stats';

                try {
                    const data = await fetchJsonSafe(url);
                    const mapped = {
                        productsAvailable: Number(data.productsAvailable ?? data.products ?? data.totalProducts ?? stats.productsAvailable) || 0,
                        activeOrders: Number(data.activeOrders ?? data.ordersActive ?? data.active ?? stats.activeOrders) || 0,
                        upcomingReturns: Number(data.upcomingReturns ?? data.returnsSoon ?? data.nextReturns ?? stats.upcomingReturns) || 0,
                        clients: Number(data.clients ?? data.totalClients ?? data.customers ?? stats.clients) || 0,
                    };
                    if (mounted) setStats(mapped);
                } catch (err) {
                    console.warn('Falha ao buscar estatísticas, usando fallback:', err.message);
                    if (mounted) {
                        setStats(fallbackStats);
                        setStatsError('Backend não disponível — mostrando estatísticas mock');
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
    }, []);

    const getStatusColor = (status) => {
        // status expected: 'Disponível', 'Alugado', etc.
        if (!status) return '#999';
        const s = String(status).toLowerCase();
        if (s.includes('alug')) return '#d90003';
        if (s.includes('disp')) return '#24bcc4';
        return '#999';
    };
    return (
        <div className={styles.container}>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Header */}
                <h2 className={styles.pageTitle}>Painel Leoni - Controle</h2>

                {/* Stats Cards */}
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

                {/* Search and Filter */}
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

                {/* Product Cards */}
                <div className={styles.productsGrid}>
                    {loading && <p>Carregando produtos...</p>}
                    {error && <p style={{ color: 'crimson' }}>Erro: {error}</p>}
                    {!loading && !error && products.length === 0 && (
                        <p>Nenhum produto cadastrado.</p>
                    )}

                    {!loading && !error && products.map((p) => (
                        <div className={styles.productCard} key={p.id || p._id || p.code}>
                            <div className={styles.productImageContainer}>
                                <img
                                    src={p.imageUrl || p.image || '/125-6.webp'}
                                    alt={p.name || 'Produto'}
                                    className={styles.productImage}
                                />
                            </div>

                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{p.name || p.title || 'Sem nome'}</h3>
                                <div className={styles.statusBadge}>
                                    <div
                                        className={styles.statusIndicator}
                                        style={{ width: '26px', backgroundColor: getStatusColor(p.status) }}
                                    />
                                    <span className={styles.statusText}>{p.status || 'Indefinido'}</span>
                                </div>
                                <p className={styles.productSize}>Tam: {p.size || p.sizeLabel || '—'}</p>
                            </div>

                            <div className={styles.actionButtons}>
                                <button className={styles.primaryBtn}>{p.status && String(p.status).toLowerCase().includes('alug') ? 'Devolver' : 'Alugar'}</button>
                                <button className={styles.secondaryBtn}>Editar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

