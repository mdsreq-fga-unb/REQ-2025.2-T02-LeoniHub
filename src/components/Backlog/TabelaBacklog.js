import React, { useMemo, useState } from 'react';
import styles from '../tabela.module.css';  

const todasHistorias = [
  // ... (seu array de histórias completo aqui, sem alterações)
  // F01 - Gestão de Produtos
  {
    id: 'US01',
    nome: 'Cadastrar Produto',
    feature: 'F01',
    mvp: '✅',
    declaracao: 'Como administrador, quero cadastrar produtos, incluindo fotos, código, tamanho, estado e descrição, para poder adicionar novos itens ao sistema.'
  },
  {
    id: 'US02',
    nome: 'Editar Produto',
    feature: 'F01',
    mvp: '✅',
    declaracao: 'Como administrador, quero editar as informações de produtos já cadastrados, para garantir que estejam sempre corretas.'
  },
  {
    id: 'US03',
    nome: 'Consultar Produto',
    feature: 'F01',
    mvp: '✅',
    declaracao: 'Como administrador, quero consultar produtos, com visualização detalhada de suas informações, para ter uma visão clara dos itens disponíveis.'
  },

  // F02 - Gestão de Pedidos
  {
    id: 'US04',
    nome: 'Criar Pedido',
    feature: 'F02',
    mvp: '✅',
    declaracao: 'Como administrador, eu quero criar um novo pedido com todos os dados do cliente, do produto, valores e datas de compromisso, para que o aluguel seja formalizado no eu sistema.'
  },
  {
    id: 'US05',
    nome: 'Editar Pedido',
    feature: 'F02',
    mvp: '✅',
    declaracao: 'Como administrador, eu quero editar um pedido de aluguel existente, para que eu possa alterar dados como datas ou produtos em caso de necessidade do cliente.'
  },
  {
    id: 'US06',
    nome: 'Consultar Pedido',
    feature: 'F02',
    mvp: '✅',
    declaracao: 'Como administrador, eu quero consultar um pedido e ver todos os seus detalhes, para que eu possa rastrear o status e as informações de compromisso do aluguel.'
  },

  // F03 - Gestão de Clientes
  {
    id: 'US07',
    nome: 'Cadastrar Cliente',
    feature: 'F03',
    mvp: '✅',
    declaracao: 'Como administrador, quero cadastrar clientes com nome, CPF/CNPJ, telefone e endereço, para gerenciar a base de clientes.'
  },
  {
    id: 'US08',
    nome: 'Consultar Cliente',
    feature: 'F03',
    mvp: '✅',
    declaracao: 'Como administrador, quero consultar clientes por nome, CPF ou telefone, para localizar rapidamente as informações de um cliente.'
  },
  {
    id: 'US09',
    nome: 'Exibir Histórico do Cliente',
    feature: 'F03',
    mvp: '✅',
    declaracao: 'Como administrador, quero exibir o histórico completo de aluguéis e contratos vinculados a cada cliente, para ter uma visão detalhada do relacionamento.'
  },

  // F04 - Contratos Digitais
  {
    id: 'US10',
    nome: 'Gerar Contrato Digital',
    feature: 'F04',
    mvp: '✅',
    declaracao: 'Como administrador, quero gerar contratos digitais vinculados ao pedido e ao cliente, para formalizar as transações.'
  },
  {
    id: 'US11',
    nome: 'Assinar Contrato Digital',
    feature: 'F04',
    mvp: '✅',
    declaracao: 'Como signatário do contrato, eu quero aplicar minha assinatura digitalmente ao documento, para que eu possa agilizar o processo de formalização e manter o registro seguro.'
  },
  {
    id: 'US12',
    nome: 'Armazenar Contrato',
    feature: 'F04',
    mvp: '✅',
    declaracao: 'Como administrador, quero armazenar contratos de forma segura e organizada, para garantir a integridade e acessibilidade dos documentos.'
  },
  {
    id: 'US13',
    nome: 'Recuperar Contrato',
    feature: 'F04',
    mvp: '✅',
    declaracao: 'Como administrador, quero buscar e recuperar contratos, para acessar documentos específicos quando necessário.'
  },

  // F05 - Agenda Integrada
  {
    id: 'US14',
    nome: 'Consultar Agenda de Compromissos',
    feature: 'F05',
    mvp: '❌',
    declaracao: 'Como administrador, eu quero consultar a agenda/calendário com todos os compromissos de provas, retiradas e devoluções, para que eu possa planejar o dia e gerenciar a disponibilidade do estoque.'
  },
  {
    id: 'US15',
    nome: 'Notificar Compromissos',
    feature: 'F05',
    mvp: '❌',
    declaracao: 'Como administrador, eu quero enviar notificações automáticas aos clientes e atendentes sobre compromissos futuros (provas, retiradas, devoluções), para que a chance de esquecimento seja minimizada.'
  },

  // F06 - Dashboard e Relatórios
  {
    id: 'US16',
    nome: 'Exibir Faturamento Mensal',
    feature: 'F06',
    mvp: '❌',
    declaracao: 'Como administrador, quero exibir o faturamento do mês em formato visual, para acompanhar o desempenho financeiro.'
  },
  {
    id: 'US17',
    nome: 'Exibir Pedidos Ativos',
    feature: 'F06',
    mvp: '❌',
    declaracao: 'Como administrador, quero exibir a quantidade de pedidos ativos, para monitorar a demanda atual.'
  },
  {
    id: 'US18',
    nome: 'Exibir Próximos Agendamentos',
    feature: 'F06',
    mvp: '❌',
    declaracao: 'Como administrador, quero exibir os próximos agendamentos, para planejar as operações futuras.'
  },
  {
    id: 'US19',
    nome: 'Exibir Produtos Mais Alugados',
    feature: 'F06',
    mvp: '❌',
    declaracao: 'Como administrador, quero exibir os produtos mais alugados no período, para identificar tendências e popularidade.'
  },

  // F07 - Autenticação e Perfis
  {
    id: 'US20',
    nome: 'Autenticar Login',
    feature: 'F07',
    mvp: '✅',
    declaracao: 'Como usuário, quero ter uma tela de login para autenticação, para acessar o sistema de forma segura.'
  },
  {
    id: 'US21',
    nome: 'Criar Perfis de Acesso',
    feature: 'F07',
    mvp: '❌',
    declaracao: 'Como administrador, quero criar perfis de acesso diferenciados (ex.: Atendente e Gestor), para gerenciar permissões.'
  }
];

export default function TabelaUS() {
  const [filtroFeature, setFiltroFeature] = useState('Todos');
  const [filtroMVP, setFiltroMVP] = useState('Todos');

  const historiasFiltradas = useMemo(() => {

    return todasHistorias.filter(historia => {
     
      const matchFeature = filtroFeature === 'Todos' || historia.feature === filtroFeature;

      const mvpSymbol = filtroMVP === 'Sim' ? '✅' : '❌';
      const matchMVP = filtroMVP === 'Todos' || historia.mvp === mvpSymbol;

      return matchFeature && matchMVP;
    });

  }, [filtroFeature, filtroMVP]); 

  return (
    <div>
      
      {/* Container para os filtros */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', alignItems: 'center', marginBottom: '20px' }}>

        <div>
          <strong>Filtrar por Feature:</strong>
          <div className={styles['layout-buttons-map']}>
            {['Todos', 'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07'].map(feature => (
              <button
                className={styles['button-map']}  
                key={feature}
                onClick={() => setFiltroFeature(feature)}>
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div>
          <strong>Filtrar por MVP:</strong>

          <div className={styles['layout-buttons-map']}>

            {['Todos', 'Sim', 'Não'].map(mvp => (
              <button
                className={styles['button-map']}
                key={mvp}
                onClick={() => setFiltroMVP(mvp)}>
                {mvp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de Rastreabilidade */}
      <table className={styles['tabela-customizada']}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Declaração</th>
            <th>Feature Associada</th>
            <th>MVP</th>
          </tr>
        </thead>
        <tbody>
          {/* O map agora usa a lista que já passou pelos dois filtros */}
          {historiasFiltradas.map((historia) => (
            <tr key={historia.id}>
              <td><strong>{historia.id}</strong></td>
              <td>{historia.declaracao}</td>
              <td><strong>{historia.feature}</strong></td>
              <td>{historia.mvp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}