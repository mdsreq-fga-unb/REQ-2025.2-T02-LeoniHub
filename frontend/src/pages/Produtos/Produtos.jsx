import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Package } from 'lucide-react';
import './Produtos.css';

export default function Produtos() {
  const navigate = useNavigate();
  
  const [produtos] = useState([
    {
      id: 1,
      codigo: 'PROD001',
      descricao: 'Terno Preto Linha Luxo',
      cor: 'Preto',
      tamanho: '42',
      quantidade: 5,
      valor: 399.00,
      status: 'disponivel'
    },
    {
      id: 2,
      codigo: 'PROD002',
      descricao: 'Terno Bege Linha Clássica',
      cor: 'Bege',
      tamanho: '44',
      quantidade: 2,
      valor: 299.00,
      status: 'alugado'
    },
    {
      id: 3,
      codigo: 'ACESS001',
      descricao: 'Cinto Com Fivela',
      cor: 'Marrom',
      tamanho: 'Único',
      quantidade: 8,
      valor: 80.00,
      status: 'disponivel'
    },
    {
      id: 4,
      codigo: 'PROD003',
      descricao: 'Terno Azul Marinho Linha Luxo',
      cor: 'Azul Marinho',
      tamanho: '46',
      quantidade: 1,
      valor: 399.00,
      status: 'Limpeza'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProdutos = produtos.filter(produto =>
    produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = {
      disponivel: { label: 'Disponível', class: 'status-disponivel' },
      alugado: { label: 'Alugado', class: 'status-alugado' },
      manutencao: { label: 'Limpeza', class: 'status-manutencao' }
    };
    return badges[status] || badges.disponivel;
  };

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
          const statusBadge = getStatusBadge(produto.status);
          return (
            <div key={produto.id} className="produto-card">
              <div className="card-header-produto">
                <div className="produto-icon">
                  <Package size={32} />
                </div>
                <span className={`status-badge ${statusBadge.class}`}>
                  {statusBadge.label}
                </span>
              </div>

              <div className="produto-info">
                <h3>{produto.descricao}</h3>
                <p className="produto-categoria">Código: {produto.codigo}</p>
              </div>

              <div className="produto-details">
                <div className="detail-row">
                  <span className="detail-label">Cor:</span>
                  <span className="detail-value">{produto.cor}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Tamanho:</span>
                  <span className="detail-value">{produto.tamanho}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Valor:</span>
                  <span className="detail-value-price">R$ {produto.valor.toFixed(2)}</span>
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
