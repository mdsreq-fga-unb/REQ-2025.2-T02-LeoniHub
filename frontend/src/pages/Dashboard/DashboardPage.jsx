import React, { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';
import StatCard from '../../components/UI/StatCard/StatCard';
import ProductCard from '../../components/UI/ProductCard/ProductCard';
import Loader from '../../components/UI/Loader/Loader';
import ErrorBanner from '../../components/UI/ErrorBanner/ErrorBanner';
import EmptyState from '../../components/UI/EmptyState/EmptyState';

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Estatísticas (preparadas para serem carregadas do backend)
    const [stats, setStats] = useState({
        productsAvailable: 5,
        activeOrders: 5,
        upcomingReturns: 2,
        clients: 48,
    });
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (mounted) setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                if (mounted) setError(err.message || 'Erro ao carregar produtos');
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

                const res = await fetch(url);
                const contentType = res.headers.get('content-type') || '';

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text ? text.slice(0, 200) : 'no body'}`);
                }

                if (!contentType.includes('application/json')) {
                    const text = await res.text();
                    throw new Error(`Resposta inesperada (content-type: ${contentType}): ${text ? text.slice(0, 200) : 'sem conteúdo'}`);
                }

                let data;
                try {
                    data = await res.json();
                } catch (parseErr) {
                    const text = await res.text();
                    throw new Error(`JSON inválido: ${text ? text.slice(0, 200) : parseErr.message}`);
                }

                // Esperamos um objeto com chaves compatíveis. Fazer mapeamento seguro.
                const mapped = {
                    productsAvailable: Number(data.productsAvailable ?? data.products ?? data.totalProducts ?? stats.productsAvailable) || 0,
                    activeOrders: Number(data.activeOrders ?? data.ordersActive ?? data.active ?? stats.activeOrders) || 0,
                    upcomingReturns: Number(data.upcomingReturns ?? data.returnsSoon ?? data.nextReturns ?? stats.upcomingReturns) || 0,
                    clients: Number(data.clients ?? data.totalClients ?? data.customers ?? stats.clients) || 0,
                };

                if (mounted) setStats(mapped);
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
                    {loading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Loader size={28} /><span>Carregando produtos...</span></div>
                    )}

                    {error && <ErrorBanner message={error} />}

                    {!loading && !error && products.length === 0 && (
                        <EmptyState title="Nenhum produto cadastrado" />
                    )}

                    {!loading && !error && products.map((p) => (
                        <ProductCard key={p.id || p._id || p.code} product={p} />
                    ))}
                </div>
            </main>
        </div>
    );
}

