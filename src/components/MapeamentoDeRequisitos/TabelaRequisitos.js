import React, { useMemo, useState } from 'react';
import styles from '../tabela.module.css'; 

const todosRequisitos = [
  // RF-01 - Gestão de Produtos (OE2: Integridade do Estoque)
  { id: 'RF-1.1', nome: 'Cadastro de Produtos (cód, tamanho, estado)', objetivo: 'OE2',rnf: 'RNF-2.1, RNF-3.1' },
  { id: 'RF-1.2', nome: 'Edição de Produtos', objetivo: 'OE2', rnf: 'RNF-2.1' },
  { id: 'RF-1.3', nome: 'Consulta Detalhada de Produtos', objetivo: 'OE2', rnf: 'RNF-3.1' },

  // RF-02 - Gestão de Pedidos (OE1: Simplificação do Fluxo)
  { id: 'RF-2.1', nome: 'Criação de Pedidos (Preço, Datas, Cliente)', objetivo: 'OE1', rnf: 'RNF-1.1, RNF-2.1' },
  { id: 'RF-2.2', nome: 'Edição de Pedidos', objetivo: 'OE1', rnf: 'RNF-1.1, RNF-2.1' },
  { id: 'RF-2.3', nome: 'Consulta Detalhada de Pedidos', objetivo: 'OE1', rnf: 'RNF-1.1' },

  // RF-03 - Gestão de Clientes (OE4/OE5: LGPD e Segurança)
  { id: 'RF-3.1', nome: 'Cadastro de Clientes (com CPF/CNPJ)', objetivo: 'OE4', rnf: 'RNF-6.1' },
  { id: 'RF-3.3', nome: 'Histórico de Aluguéis do Cliente', objetivo: 'OE5', rnf: 'RNF-6.1, RNF-6.2' },

  // RF-04 - Agenda Integrada (OE1: Simplificação do Fluxo)
  { id: 'RF-4.1', nome: 'Consulta de Agenda (Provas, Retiradas, Devoluções)', objetivo: 'OE1', rnf: 'RNF-1.1, RNF-3.1' },
  { id: 'RF-4.2', nome: 'Notificações de Compromissos Futuros', objetivo: 'OE1', rnf: 'RNF-1.1' },

  // RF-05 - Dashboard/Relatórios (OE3: Decisões Estratégicas)
  { id: 'RF-5.1', nome: 'Consulta de Faturamento (Dashboard)', objetivo: 'OE3', rnf: 'RNF-3.2, RNF-1.1' },
  { id: 'RF-5.4', nome: 'Consulta de Produtos Mais Alugados', objetivo: 'OE3', rnf: 'RNF-3.2' },

  // RF-06 - Autenticação (OE5: Segurança e Acesso)
  { id: 'RF-6.1', nome: 'Tela de Login e Registro', objetivo: 'OE5', rnf: 'RNF-6.1' },
  { id: 'RF-6.2', nome: 'Criação de Perfis de Acesso (Cargos)', objetivo: 'OE5', rnf: 'RNF-6.1, RNF-6.2' },
];

const objetivosEspecificos = {
  'OE1': 'Aumentar a eficiência operacional no fluxo de atendimento e locação.',
  'OE2': 'Aumentar a precisão do controle do estoque em tempo real.',
  'OE3': 'Apoiar a tomada de decisão com dados estratégicos e financeiros confiáveis.',
  'OE4': 'Garantir a segurança dos dados dos clientes e garantir a conformidade com a LGPD.',
  'OE5': 'Assegurar o controle de acesso às informações e agilizar a administração de permissões. '
};

export default function TabelaRequisitos() {
  
  const [filtroObjetivo, setFiltroObjetivo] = useState('Todos');

  const requisitosFiltrados = useMemo(() => {
    
    return todosRequisitos.filter(req => {
      return filtroObjetivo === 'Todos' || req.objetivo === filtroObjetivo;
    });
  }, [filtroObjetivo]); 


  return (
    <div>
        
        {/*Inicio da Tabela de Requisitos*/}

        <div>
          <strong>Filtrar por Objetivo Específico (OE):</strong>

          {/*Botões para Seleção dos OEs*/}

          <div className={styles['layout-buttons-map']}>
            {['Todos', 'OE1', 'OE2', 'OE3', 'OE4', 'OE5'].map(objetivo => (
              <button
              className={styles['button-map']} 
              key={objetivo} 
              onClick={() => setFiltroObjetivo(objetivo)}>
              {objetivo}
              </button>
            ))}
          </div>

          {/* Exibe a descrição do OE selecionado */}
          {filtroObjetivo !== 'Todos' && (
            <div style={{ marginTop: 12 }}>
              <strong>Descrição do {filtroObjetivo}:</strong>
              <p style={{ marginTop: 6 }}>{objetivosEspecificos[filtroObjetivo] || 'Descrição não disponível.'}</p>
            </div>
          )}
        </div>

      {/* --- Tabela de Rastreabilidade --- */}
      <table className={styles['tabela-customizada']}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Requisito</th>
            <th>Objetivo Específico (OE)</th>
            <th>RNFs Relacionados</th>
          </tr>
        </thead>
        <tbody>
          {requisitosFiltrados.map((requisito) => (
            <tr key={requisito.id}>
              <td><strong>{requisito.id}</strong></td>
              <td>{requisito.nome}</td>
              <td><strong>{requisito.objetivo}</strong></td>
              <td>{requisito.rnf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}