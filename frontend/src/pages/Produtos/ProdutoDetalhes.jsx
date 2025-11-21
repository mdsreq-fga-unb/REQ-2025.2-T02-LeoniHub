import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Package, AlertCircle, Calendar, User, DollarSign } from 'lucide-react';
import * as produtoService from '../../services/produtoService';
import * as pedidoService from '../../services/pedidoService';
import './ProdutoDetalhes.css';

export default function ProdutoDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduto();
    loadPedidos();
  }, [id]);

  const loadProduto = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await produtoService.getProdutoById(id);
      
      if (response.success) {
        setProduto(response.data);
      } else {
        setError(response.error || 'Erro ao carregar produto');
      }
    } catch (err) {
      console.error('Erro ao carregar produto:', err);
      setError('Erro ao carregar produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const loadPedidos = async () => {
    try {
      setLoadingPedidos(true);
      const response = await pedidoService.listarPedidosPorProduto(id);
      
      if (response.success) {
        setPedidos(response.data || []);
      }
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
    } finally {
      setLoadingPedidos(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      'AGUARDANDO_ASSINATURA': 'Aguardando Assinatura',
      'ATIVO': 'Ativo',
      'CONCLUIDO': 'Concluído',
      'CANCELADO': 'Cancelado'
    };
    return statusLabels[status] || status;
  };

  if (loading) {
    return (
      <div className="produto-detalhes-page">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !produto) {
    return (
      <div className="produto-detalhes-page">
        <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>
          <AlertCircle size={48} style={{ marginBottom: '1rem' }} />
          <p>{error || 'Produto não encontrado'}</p>
          <button 
            onClick={() => navigate('/produtos')}
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
            Voltar para Produtos
          </button>
        </div>
      </div>
    );
  }

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
          </div>

          <div className="produto-info-detalhes">
            <h1>{produto.descricao}</h1>
            <p className="produto-codigo">Código: {produto.codigo}</p>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Cor</span>
              <span className="info-value">{produto.cor || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tamanho</span>
              <span className="info-value">{produto.tamanho || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Valor</span>
              <span className="info-value-destaque">R$ {produto.valor?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Quantidade</span>
              <span className={`info-value ${produto.quantidade <= 2 ? 'quantidade-baixa' : 'quantidade-ok'}`}>
                {produto.quantidade} unidades
              </span>
            </div>
          </div>
        </div>

        {/* Seção de Histórico de Aluguéis */}
        <div className="historico-section">
          <h2>Histórico de Aluguéis</h2>
          
          {loadingPedidos ? (
            <div className="historico-loading">
              <p>Carregando histórico...</p>
            </div>
          ) : pedidos.length === 0 ? (
            <div className="historico-empty">
              <p>Nenhum aluguel registrado para este produto ainda.</p>
            </div>
          ) : (
            <div className="historico-lista">
              {pedidos.map((pedido) => (
                <div key={pedido.id} className="historico-item">
                  <div className="historico-item-header">
                    <span className="pedido-id">Pedido #{pedido.id}</span>
                    <span className={`pedido-status status-${pedido.status?.toLowerCase()}`}>
                      {getStatusLabel(pedido.status)}
                    </span>
                  </div>
                  
                  <div className="historico-item-body">
                    <div className="historico-info">
                      <Calendar size={16} />
                      <div>
                        <span className="info-label-small">Período</span>
                        <span className="info-value-small">
                          {formatDate(pedido.data_aluguel)} até {formatDate(pedido.data_devolucao)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="historico-info">
                      <DollarSign size={16} />
                      <div>
                        <span className="info-label-small">Valor</span>
                        <span className="info-value-small">
                          R$ {pedido.valor?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>

                    <div className="historico-info">
                      <User size={16} />
                      <div>
                        <span className="info-label-small">Cliente</span>
                        <span className="info-value-small">
                          {pedido.cliente_id || 'Não informado'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
