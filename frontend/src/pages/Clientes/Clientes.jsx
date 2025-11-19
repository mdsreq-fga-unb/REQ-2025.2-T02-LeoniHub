import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Users } from 'lucide-react';
import './Clientes.css';

export default function Clientes() {
  const navigate = useNavigate();
  
  const [clientes] = useState([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      status: 'ativo',
      pedidosAtivos: 2,
      totalGasto: 2450.00
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 88888-8888',
      cpf: '987.654.321-00',
      status: 'ativo',
      pedidosAtivos: 1,
      totalGasto: 1200.00
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      email: 'carlos@email.com',
      telefone: '(11) 77777-7777',
      cpf: '456.789.123-00',
      status: 'inativo',
      pedidosAtivos: 0,
      totalGasto: 850.00
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

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
          {filteredClientes.length === 0 ? (
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
                    <span className="stat-value">{cliente.pedidosAtivos} pedidos ativos</span>
                    <span className="stat-label">Total: R$ {cliente.totalGasto.toFixed(2).replace('.', ',')}</span>
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
