import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Box } from 'lucide-react';
import { listarPedidos } from '../../services/pedidoService'; 
import { getClienteById } from '../../services/clienteService';

import './Pedidos.css'; 

const formatarMoeda = (valor) => {
    return `R$ ${parseFloat(valor || 0).toFixed(2).replace('.', ',')}`;
};

const getStatusBadge = (status) => {
    switch (status) {
        case 'AGUARDANDO_ASSINATURA':
            return 'status-pendente';
        case 'CONCLUIDO':
            return 'status-concluido';
        case 'CANCELADO':
            return 'status-cancelado';
        default:
            return 'status-default';
    }
};

export default function Pedidos() {
  const navigate = useNavigate();
  
  const [pedidos, setPedidos] = useState([]);
  const [nomesClientes, setNomesClientes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await listarPedidos(); // Busca todos os pedidos no service
      const pedidosArray = response.data || response || [];
      setPedidos(pedidosArray);

      // Lógica para mapear os nomes dos cliente
      const idsUnicos = [...new Set(pedidosArray.map(p => p.cliente_id))];
      const mapaNomes = {};

      await Promise.all(idsUnicos.map(async (id) => {
        if (!id) return;
        try {
          const clienteResponse = await getClienteById(id);
          const nome = clienteResponse.data?.nome || clienteResponse.nome || 'Nome não encontrado';
          mapaNomes[id] = nome;
        } 
        catch (error) {
          console.error(`Erro ao buscar cliente ${id}`, error);
          mapaNomes[id] = 'Erro ao carregar nome';
        }
      }));

      setNomesClientes(mapaNomes);  

      console.log("Pedidos", pedidosArray)
    } 
    catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      setError(err.message || 'Erro ao carregar pedidos');
      if (err.message && err.message.includes('Token')) {
        navigate('/login');
      }
      
    } 
    finally {
      setLoading(false);
    }
  };

  // Filtra pedidos pelo ID, valor ou nome/descrição do produto (assumindo que há esses dados no objeto)
  const filteredPedidos = pedidos.filter(pedido => {
    const term = searchTerm.toLowerCase();
    
    const idMatch = pedido.id && pedido.id.toString().includes(term);
    
    const valorMatch = pedido.valor && pedido.valor.toString().includes(term); 

    const statusMatch = pedido.status && pedido.status.toLowerCase().includes(term);

    return idMatch || valorMatch || statusMatch;
  });

  return (
    <div className="pedidos-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Pedidos de Aluguel</h1>
          <p>Gerencie todos os pedidos, de rascunhos a concluídos.</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/pedidos/criar')}
        >
          <Plus className="icon" />
          Novo Pedido
        </button>
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por ID, Valor ou Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/*
        <button className="btn-filter">
          <Filter className="icon" />
          Filtros
        </button>
        */}
      </div>

      <div className="clientes-card">
        <div className="card-header">
          <h2>
            <Box className="icon" />
            Lista de Pedidos
          </h2>
        </div>
        
        <div className="clientes-list"> 
          {loading ? (
            <div className="loading-state">
              <p>Carregando pedidos...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p className="error-message">{error}</p>
              <button className="btn-primary" onClick={loadPedidos}>
                Tentar Novamente
              </button>
            </div>
          ) : filteredPedidos.length === 0 ? (
            <div className="empty-state">
              <Box className="empty-icon" />
              <h3>Nenhum pedido encontrado</h3>
              <p>Comece criando um novo pedido de aluguel</p>
              <button 
                className="btn-primary"
                onClick={() => navigate('/pedido/criar')}
              >
                Criar Novo Pedido
              </button>
            </div>
          ) : (
            filteredPedidos.map(pedido => (
              <div 
                key={pedido.id || pedido.cliente_cpf_cnpj} 
                className="cliente-item"
                onClick={() => navigate(`/pedidos/${pedido.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="cliente-info">
                  <div className="cliente-main">
                    {/* Exibe o ID do pedido e o status */}
                    <h3>Pedido # {pedido.id || 'N/A'}</h3> 
                    <span className={`status-badge ${getStatusBadge(pedido.status)}`}>
                      {pedido.status || 'STATUS DESCONHECIDO'}
                    </span>
                  </div>                  
                  {/* Informações principais do pedido */}
                  <p className="cliente-contact">
                    Cliente: {nomesClientes[pedido.cliente_id] || 'Não Especificado'}
                  </p>
                  <p className="cliente-contact">
                    Retirada: {pedido.data_aluguel} | Devolução: {pedido.data_devolucao}
                  </p>
                </div>
                
                <div className="cliente-stats">
                  <div className="stat">
                    <span className="stat-value">
                       {formatarMoeda(pedido.valor)}
                    </span>
                    <span className="stat-label">Valor Total</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}