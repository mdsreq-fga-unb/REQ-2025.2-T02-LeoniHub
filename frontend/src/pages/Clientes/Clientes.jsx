import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Users } from 'lucide-react';
import { getAllClientes } from '../../services/clienteService';
import './Clientes.css';

export default function Clientes() {
  const navigate = useNavigate();
  
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllClientes();
      setClientes(response.data || []);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
      setError(err.message || 'Erro ao carregar clientes');
      if (err.message.includes('Token')) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  return (
    <div className="clientes-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Clientes</h1>
          <p>Gerencie seus clientes e histórico de pedidos</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/clientes/novo')}
        >
          <Plus className="icon" />
          Novo Cliente
        </button>
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-filter">
          <Filter className="icon" />
          Filtros
        </button>
      </div>

      <div className="clientes-card">
        <div className="card-header">
          <h2>
            <Users className="icon" />
            Lista de Clientes
          </h2>
        </div>
        
        <div className="clientes-list">
          {loading ? (
            <div className="loading-state">
              <p>Carregando clientes...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p className="error-message">{error}</p>
              <button className="btn-primary" onClick={loadClientes}>
                Tentar Novamente
              </button>
            </div>
          ) : filteredClientes.length === 0 ? (
            <div className="empty-state">
              <Users className="empty-icon" />
              <h3>Nenhum cliente encontrado</h3>
              <p>Comece adicionando seu primeiro cliente</p>
              <button 
                className="btn-primary"
                onClick={() => navigate('/clientes/novo')}
              >
                Adicionar Cliente
              </button>
            </div>
          ) : (
            filteredClientes.map(cliente => (
              <div 
                key={cliente.id} 
                className="cliente-item"
                onClick={() => navigate(`/clientes/${cliente.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="cliente-info">
                  <div className="cliente-main">
                    <h3>{cliente.nome}</h3>
                    <span className={`status-badge ${cliente.status}`}>
                      {cliente.status}
                    </span>
                  </div>
                  <p className="cliente-contact">{cliente.email}</p>
                  <p className="cliente-contact">{cliente.telefone}</p>
                </div>
                
                  <div className="cliente-stats">
                  <div className="stat">
                    <span className="stat-value">{cliente.pedidosAtivos || 0} pedidos ativos</span>
                    <span className="stat-label">Total: R$ {(cliente.totalGasto || 0).toFixed(2).replace('.', ',')}</span>
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
