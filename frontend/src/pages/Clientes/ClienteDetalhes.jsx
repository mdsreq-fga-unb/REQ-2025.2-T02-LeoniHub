import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Mail, Phone, FileText, Calendar, DollarSign } from 'lucide-react';
import './ClienteDetalhes.css';

export default function ClienteDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dados mockados - substituir por chamada de API
  const cliente = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    endereco: 'Rua Exemplo, 123 - Centro, São Paulo - SP',
    status: 'ativo',
    dataCadastro: '15/01/2024',
    pedidosAtivos: 2,
    totalPedidos: 15,
    totalGasto: 2450.00
  };

  const pedidos = [
    {
      id: 1,
      data: '10/11/2024',
      produto: 'Terno Preto Slim',
      dataRetirada: '15/11/2024',
      dataDevolucao: '17/11/2024',
      valor: 350.00,
      status: 'ativo'
    },
    {
      id: 2,
      data: '05/11/2024',
      produto: 'Smoking Azul Marinho',
      dataRetirada: '08/11/2024',
      dataDevolucao: '10/11/2024',
      valor: 450.00,
      status: 'ativo'
    },
    {
      id: 3,
      data: '20/10/2024',
      produto: 'Terno Cinza + Gravata',
      dataRetirada: '25/10/2024',
      dataDevolucao: '27/10/2024',
      valor: 380.00,
      status: 'concluído'
    },
    {
      id: 4,
      data: '10/10/2024',
      produto: 'Blazer Azul',
      dataRetirada: '12/10/2024',
      dataDevolucao: '14/10/2024',
      valor: 280.00,
      status: 'concluído'
    }
  ];

  return (
    <div className="cliente-detalhes-page">
      <div className="page-header">
        <button 
          className="btn-back"
          onClick={() => navigate('/clientes')}
        >
          <ArrowLeft className="icon" />
          Voltar
        </button>
        <button 
          className="btn-edit"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          <Edit2 className="icon" />
          Editar Cliente
        </button>
      </div>

      <div className="detalhes-grid">
        {/* Card de Informações do Cliente */}
        <div className="info-card">
          <div className="card-header">
            <h2>{cliente.nome}</h2>
            <span className={`status-badge ${cliente.status}`}>
              {cliente.status}
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
                <span className="info-label">CPF</span>
                <span className="info-value">{cliente.cpf}</span>
              </div>
            </div>

            <div className="info-item">
              <Calendar className="info-icon" />
              <div>
                <span className="info-label">Cliente desde</span>
                <span className="info-value">{cliente.dataCadastro}</span>
              </div>
            </div>

            <div className="info-item full-width">
              <div className="info-label">Endereço</div>
              <div className="info-value">{cliente.endereco}</div>
            </div>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon pedidos-ativos">
              <FileText />
            </div>
            <div className="stat-info">
              <span className="stat-value">{cliente.pedidosAtivos}</span>
              <span className="stat-label">Pedidos Ativos</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon total-pedidos">
              <Calendar />
            </div>
            <div className="stat-info">
              <span className="stat-value">{cliente.totalPedidos}</span>
              <span className="stat-label">Total de Pedidos</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon total-gasto">
              <DollarSign />
            </div>
            <div className="stat-info">
              <span className="stat-value">R$ {cliente.totalGasto.toFixed(2).replace('.', ',')}</span>
              <span className="stat-label">Total Gasto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Histórico de Pedidos */}
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
    </div>
  );
}
