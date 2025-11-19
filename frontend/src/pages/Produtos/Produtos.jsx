import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Package } from 'lucide-react';
import './Produtos.css';

export default function Produtos() {
  const navigate = useNavigate();
  
  const [produtos] = useState([
    {
      id: 1,
      nome: 'Furadeira Elétrica',
      categoria: 'Ferramentas Elétricas',
      tipo: 'individual',
      valorDia: 45.00,
      estoque: 5,
      status: 'disponivel'
    },
    {
      id: 2,
      nome: 'Betoneira 150L',
      categoria: 'Equipamentos de Construção',
      tipo: 'individual',
      valorDia: 120.00,
      estoque: 2,
      status: 'alugado'
    },
    {
      id: 3,
      nome: 'Andaime 2m',
      categoria: 'Estruturas',
      tipo: 'individual',
      valorDia: 80.00,
      estoque: 8,
      status: 'disponivel'
    },
    {
      id: 4,
      nome: 'Compressor de Ar',
      categoria: 'Ferramentas Pneumáticas',
      tipo: 'individual',
      valorDia: 90.00,
      estoque: 1,
      status: 'manutencao'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = {
      disponivel: { label: 'Disponível', class: 'status-disponivel' },
      alugado: { label: 'Alugado', class: 'status-alugado' },
      manutencao: { label: 'Manutenção', class: 'status-manutencao' }
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
                <h3>{produto.nome}</h3>
                <p className="produto-categoria">{produto.categoria}</p>
              </div>

              <div className="produto-details">
                <div className="detail-row">
                  <span className="detail-label">Valor/dia:</span>
                  <span className="detail-value-price">R$ {produto.valorDia.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Estoque:</span>
                  <span className={`detail-value ${produto.estoque <= 2 ? 'estoque-baixo' : 'estoque-ok'}`}>
                    {produto.estoque} unidades
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
