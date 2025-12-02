import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Mail, Phone, FileText, Calendar, DollarSign, Trash2 } from 'lucide-react';
import { getClienteById, deleteCliente } from '../../services/clienteService';
import './ClienteDetalhes.css';

export default function ClienteDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadClienteData();
  }, [id]);

  const loadClienteData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getClienteById(id);
      setCliente(response.data);
    } 
    catch (err) {
      console.error('Erro ao carregar cliente:', err);
      setError(err.message || 'Erro ao carregar dados do cliente');
      
      if (err.message.includes('Token')) {
        navigate('/login');
      }
    } 
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) {
      try {
        await deleteCliente(id);
        alert('Cliente excluído com sucesso!');
        navigate('/clientes');
      } 
      catch (err) {
        console.error('Erro ao excluir cliente:', err);
        alert(err.message || 'Erro ao excluir cliente. Tente novamente.');
        
        if (err.message.includes('Token')) {
          navigate('/login');
        }
      }
    }
  };

  const pedidos = [];

  return (
    <div className="cliente-detalhes-page">
      {loading ? (
        <div className="loading-state">
          <p>Carregando dados do cliente...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p className="error-message">{error}</p>
          <button className="btn-primary" onClick={loadClienteData}>
            Tentar Novamente
          </button>
          <button className="btn-back" onClick={() => navigate('/clientes')}>
            Voltar para Clientes
          </button>
        </div>
      ) : cliente ? (
        <>
          <div className="page-header">
            <button 
              className="btn-back"
              onClick={() => navigate('/clientes')}
            >
              <ArrowLeft className="icon" />
              Voltar
            </button>
            <div className="header-actions">
              <button 
                className="btn-delete"
                onClick={handleDelete}
              >
                <Trash2 className="icon" />
                Excluir
              </button>
              <button 
                className="btn-edit"
                onClick={() => navigate(`/clientes/${id}/editar`)}
              >
                <Edit2 className="icon" />
                Editar Cliente
              </button>
            </div>
          </div>

      <div className="detalhes-grid">
        {/* Card de Informações do Cliente */}
        <div className="info-card">
          <div className="card-header">
            <h2>{cliente.nome}</h2>
            <span className={`status-badge ${cliente.status || 'ativo'}`}>
              {cliente.status || 'ativo'}
            </span>
          </div>

          <div className="info-content">
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <span className="info-label">Email</span>
                <span className="info-value">{cliente.email}</span>
              </div>
            </div>

            <div className="info-item">
              <Phone className="info-icon" />
              <div>
                <span className="info-label">Telefone</span>
                <span className="info-value">{cliente.telefone}</span>
              </div>
            </div>

            <div className="info-item">
              <FileText className="info-icon" />
              <div>
                <span className="info-label">CPF/CNPJ</span>
                <span className="info-value">{cliente.cpf_cnpj}</span>
              </div>
            </div>

            {cliente.cep && (
              <div className="info-item">
                <FileText className="info-icon" />
                <div>
                  <span className="info-label">CEP</span>
                  <span className="info-value">{cliente.cep}</span>
                </div>
              </div>
            )}

            {cliente.cidade && (
              <div className="info-item">
                <FileText className="info-icon" />
                <div>
                  <span className="info-label">Cidade</span>
                  <span className="info-value">{cliente.cidade}</span>
                </div>
              </div>
            )}

            {cliente.estado && (
              <div className="info-item">
                <FileText className="info-icon" />
                <div>
                  <span className="info-label">Estado</span>
                  <span className="info-value">{cliente.estado}</span>
                </div>
              </div>
            )}

            {cliente.created_at && (
              <div className="info-item">
                <Calendar className="info-icon" />
                <div>
                  <span className="info-label">Cliente desde</span>
                  <span className="info-value">{new Date(cliente.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            )}

            {cliente.endereco && (
              <div className="info-item full-width">
                <div className="info-label">Endereço</div>
                <div className="info-value">{cliente.endereco}</div>
              </div>
            )}
          </div>
        </div>

        {/* Cards de Estatísticas */}
            {/*
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon pedidos-ativos">
              <FileText />
            </div>
            <div className="stat-info">
              <span className="stat-value">{cliente.pedidosAtivos || 0}</span>
              <span className="stat-label">Pedidos Ativos</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon total-pedidos">
              <Calendar />
            </div>
            <div className="stat-info">
              <span className="stat-value">{cliente.totalPedidos || 0}</span>
              <span className="stat-label">Total de Pedidos</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon total-gasto">
              <DollarSign />
            </div>
            <div className="stat-info">
              <span className="stat-value">R$ {(cliente.totalGasto || 0).toFixed(2).replace('.', ',')}</span>
              <span className="stat-label">Total Gasto</span>
            </div>
            
          </div>
        </div>
        */}
      </div>

      {/* Histórico de Pedidos */}
      {pedidos.length > 0 && (
        <div className="pedidos-card">
          <div className="card-header">
            <h2>Histórico de Pedidos</h2>
          </div>

          <div className="pedidos-table">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Produto</th>
                  <th>Retirada</th>
                  <th>Devolução</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id}>
                    <td>{pedido.data}</td>
                    <td>{pedido.produto}</td>
                    <td>{pedido.dataRetirada}</td>
                    <td>{pedido.dataDevolucao}</td>
                    <td>R$ {pedido.valor.toFixed(2).replace('.', ',')}</td>
                    <td>
                      <span className={`status-badge ${pedido.status}`}>
                        {pedido.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </>
      ) : null}
    </div>
  );
}
