import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Package, AlertCircle } from 'lucide-react';
import * as produtoService from '../../services/produtoService';
import './Produtos.css';

export default function Produtos() {
  const navigate = useNavigate();
  
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar produtos ao montar o componente
  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await produtoService.getAllProdutos();
      
      if (response.success) {
        setProdutos(response.data || []);
      } else {
        setError(response.error || 'Erro ao carregar produtos');
      }
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="produtos-page">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="produtos-page">
        <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>
          <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
          <p>{error}</p>
          <button 
            onClick={loadProdutos}
            style={{ 
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#14b8a6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="produtos-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Produtos</h1>
          <p>Gerencie seu inventário de produtos para aluguel</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/produtos/novo')}
        >
          <Plus className="icon" />
          Novo Produto
        </button>
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-filter">
          <Filter className="icon" />
          Filtros
        </button>
      </div>

      <div className="produtos-grid">
        {filteredProdutos.map((produto) => {
          return (
            <div key={produto.id} className="produto-card">
              <div className="card-header-produto">
                <div className="produto-icon">
                  <Package size={32} />
                </div>
              </div>

              <div className="produto-info">
                <h3>{produto.descricao}</h3>
                <p className="produto-categoria">Código: {produto.codigo}</p>
              </div>

              <div className="produto-details">
                <div className="detail-row">
                  <span className="detail-label">Cor:</span>
                  <span className="detail-value">{produto.cor || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tamanho:</span>
                  <span className="detail-value">{produto.tamanho || '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Valor:</span>
                  <span className="detail-value-price">R$ {produto.valor?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Quantidade:</span>
                  <span className={`detail-value ${produto.quantidade <= 2 ? 'estoque-baixo' : 'estoque-ok'}`}>
                    {produto.quantidade} unidades
                  </span>
                </div>
              </div>

              <button 
                className="btn-ver-detalhes"
                onClick={() => navigate(`/produtos/${produto.id}`)}
              >
                Ver Detalhes
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
