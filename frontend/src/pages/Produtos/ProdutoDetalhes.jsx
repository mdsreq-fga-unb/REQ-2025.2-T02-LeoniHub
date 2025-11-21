import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Package } from 'lucide-react';
import './ProdutoDetalhes.css';

export default function ProdutoDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - substituir por chamada API
  const [produto] = useState({
    id: id,
    codigo: 'PROD001',
    descricao: 'Terno Preto Linha Luxo',
    cor: 'Preto',
    tamanho: '42',
    quantidade: 5,
    valor: 399.00,
    status: 'disponivel',
    observacoes: 'Terno premium com acabamento de alta qualidade. Ideal para eventos formais.'
  });

  const getStatusBadge = (status) => {
    const badges = {
      disponivel: { label: 'Disponível', class: 'status-disponivel' },
      alugado: { label: 'Alugado', class: 'status-alugado' },
      manutencao: { label: 'Manutenção', class: 'status-manutencao' }
    };
    return badges[status] || badges.disponivel;
  };

  const statusBadge = getStatusBadge(produto.status);

  return (
    <div className="produto-detalhes-page">
      <div className="detalhes-header">
        <button 
          className="btn-back"
          onClick={() => navigate('/produtos')}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <button 
          className="btn-edit"
          onClick={() => navigate(`/produtos/${id}/editar`)}
        >
          <Edit2 size={20} />
          Editar
        </button>
      </div>

      <div className="detalhes-content">
        <div className="produto-card-detalhes">
          <div className="card-header-detalhes">
            <div className="produto-icon-large">
              <Package size={48} />
            </div>
            <span className={`status-badge ${statusBadge.class}`}>
              {statusBadge.label}
            </span>
          </div>

          <div className="produto-info-detalhes">
            <h1>{produto.descricao}</h1>
            <p className="produto-codigo">Código: {produto.codigo}</p>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Cor</span>
              <span className="info-value">{produto.cor}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tamanho</span>
              <span className="info-value">{produto.tamanho}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Valor</span>
              <span className="info-value-destaque">R$ {produto.valor.toFixed(2)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Quantidade</span>
              <span className={`info-value ${produto.quantidade <= 2 ? 'quantidade-baixa' : 'quantidade-ok'}`}>
                {produto.quantidade} unidades
              </span>
            </div>
          </div>

          {produto.observacoes && (
            <div className="observacoes-section">
              <h3>Observações</h3>
              <p>{produto.observacoes}</p>
            </div>
          )}
        </div>

        {/* Seção de Histórico de Aluguéis - pode ser implementada futuramente */}
        <div className="historico-section">
          <h2>Histórico de Aluguéis</h2>
          <div className="historico-empty">
            <p>Nenhum aluguel registrado para este produto ainda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
