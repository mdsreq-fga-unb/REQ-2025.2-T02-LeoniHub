import React, { useState, useMemo } from 'react';

// ======================================================================
// 1. FONTE ÚNICA DE DADOS
// ======================================================================

export const todasHistorias = [
  // F01: Gestão de Produtos e Estoque
  {
    id: 'US01',
    declaracao: 'Como administrador, quero cadastrar produtos, incluindo fotos, código, tamanho, estado e descrição, para poder adicionar novos itens ao sistema.',
    feature: 'F01',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'O administrador deve conseguir cadastrar o produto sem inconsistências.',
      'A visualização do produto cadastrado deve estar disponível.'
    ],
    regrasDeNegocio: [
      'O produto deve ser cadastrado apenas após o preenchimento dos campos: código, tamanho, estado e descrição.',
      'Um produto NUNCA deve ter o mesmo código que outro.'
    ]
  },
  {
    id: 'US02',
    declaracao: 'Como administrador, quero editar as informações de produtos já cadastrados, para garantir que estejam sempre corretas.',
    feature: 'F01',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'Deve ser possível editar os produtos sem nenhuma instabilidade.'
    ],
    regrasDeNegocio: [
      'O campo "código" NÃO pode ser editado em nenhuma circunstância.',
      'O produto NÃO pode ser editado se ele não estiver no estoque da loja, estado(emprestado).'
    ]
  },
  {
    id: 'US03',
    declaracao: 'Como administrador, quero consultar produtos, com visualização detalhada de suas informações, para ter uma visão clara dos itens disponíveis.',
    feature: 'F01',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'Todos os produtos devem poder ser consultados sem erros ou inconsistência (Aparecem 100% das vezes).'
    ],
    regrasDeNegocio: [
      'Deve existir um botão e campos que aplicam filtros na consulta (código, tamanho e estado).',
      'Deve existir um botão ("EDITAR") para editar o produto.'
    ]
  },

  // F02: Gestão de Pedidos
  {
    id: 'US04',
    declaracao: 'Como administrador, eu quero criar um novo pedido com todos os dados do cliente e o seu código, dados do produto (incluindo o código), valores e datas de compromisso, para que o aluguel seja formalizado no eu sistema.',
    feature: 'F02',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'A criação do pedido só deve ocorrer após todos os campos serem preenchidos.',
      'As informações do pedido devem ser totalmente personalizáveis.',
      'Os dados do cliente devem ser verificados no Banco de Dados (Garantia que o cliente está cadastrado).'
    ],
    regrasDeNegocio: [
      'Deve ser inseridos os códigos OU os nomes do Cliente e do Produto.',
      'Os dados do Cliente e do Produto devem ser inseridos automaticamente quando o código OU nome forem inseridos.',
      'Os dados do Cliente e do Produto devem estar em campos de "View-Only" (Exceto o código e o nome).'
    ]
  },
  {
    id: 'US05',
    declaracao: 'Como administrador, eu quero editar um pedido de aluguel existente, para que eu possa alterar dados como datas ou produtos em caso de necessidade do cliente.',
    feature: 'F02',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'Não deve haver inconsistências na consulta de Pedidos nem no Banco de Dados após a edição.',
      'Devem ser mudadas as datas na Agenda Integrada referente ao pedido, garantindo consistência no fluxo e organização da loja.'
    ],
    regrasDeNegocio: [
      'A data do pedido só pode ser alterada caso o produto alugado esteja disponível para a nova data.',
      'A edição do pedido NÃO deve ser permitida caso o cliente tenha realizado a coleta do produto.'
    ]
  },
  {
    id: 'US06',
    declaracao: 'Como administrador, eu quero consultar um pedido e ver todos os seus detalhes, para que eu possa rastrear o status e as informações de compromisso do aluguel.',
    feature: 'F02',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'Todos os pedidos registrados devem aparecer sem inconsistências.'
    ],
    regrasDeNegocio: [
      'Deve existir um botão e campos que aplicam filtros na consulta (código, cliente, produto(s), data e valor).',
      'Deve existir um botão ("EDITAR") para editar o pedido.'
    ]
  },

  // F03: Gestão de Clientes e Histórico
  {
    id: 'US07',
    declaracao: 'Como administrador, quero cadastrar clientes com nome, CPF/CNPJ, telefone, CEP, estado, cidade e endereço, para gerenciar a base de clientes.',
    feature: 'F03',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
        'O cadastro só deve ser realizado quando TODOS os campos forem preenchidos',
        'Não deve ser permitido nenhum cadastro duplicado (Mesmo cliente -> Mesmo "nome" ou "CPF/CNPJ")'
    ],
    regrasDeNegocio: [
      'Os campos CPF, CNPJ e Telefone devem ser validados por uma função que verifica se são corretos (Correspondem ao padrão Brasileiro).',
      'Uma mensagem deve aparecer ("Cadastro realizado com sucesso!") após o cadastro do cliente.',
      'Uma mensagem ("Cadastro cancelado. Cliente já cadastrado!") caso já exista um registro do cliente.'
    ]
  },
  {
    id: 'US08',
    declaracao: 'Como administrador, quero consultar clientes por nome, CPF ou telefone, para localizar rapidamente as informações de um cliente.',
    feature: 'F03',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'Todos os clientes devem ser consultados sem erros ou inconsistência (Aparecem 100% das vezes).'
    ],
    regrasDeNegocio: [
      'Deve existir um botão e campos que aplicam filtros na consulta (nome , CPF/CNPJ, estado e cidade).',
      'Deve existir um botão ("EDITAR") para editar as informações do cliente.'
    ]
  },
  {
    id: 'US09',
    declaracao: 'Como administrador, quero exibir o histórico completo de aluguéis vinculados a cada cliente, para ter uma visão detalhada do relacionamento.',
    feature: 'F03',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [
      'TODOS os aluguéis referentes ao cliente devem aparecer na consulta 100% das vezes.'
    ],
    regrasDeNegocio: [
      'Deve existir campos ( Nome ou CPF do cliente ) para a busca.',
      'Deve existir um botão ("BUSCAR") para realizar a busca.',
      'O histórico deve ser organizado por tempo ( Mais recente mais em cima, mais antigo mais embaixo ).',
      'Deve existir um botão ("CONSULTAR") ao lado dos pedidos/aluguéis, para acessar detalhadamente o pedido/aluguel realizado.'
    ]
  },

  // F04: Agenda Integrada e Notificações
  {
    id: 'US14',
    declaracao: 'Como administrador, eu quero consultar a agenda/calendário com todos os compromissos de provas, retiradas e devoluções, para que eu possa planejar o dia e gerenciar a disponibilidade do estoque.',
    feature: 'F04',
    moscow: 'Could Have',
    mvp: '❌',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },
  {
    id: 'US15',
    declaracao: 'Como administrador, eu quero enviar notificações automáticas aos clientes e atendentes sobre compromissos futuros (provas, retiradas, devoluções), para que a chance de esquecimento seja minimizada.',
    feature: 'F04',
    moscow: 'Could Have',
    mvp: '❌',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },

  // F05: Dashboard e Relatórios
  {
    id: 'US16',
    declaracao: 'Como administrador, quero exibir o faturamento do mês em formato visual, para acompanhar o desempenho financeiro.',
    feature: 'F05',
    moscow: 'Could Have',
    mvp: '❌',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },
  {
    id: 'US17',
    declaracao: 'Como administrador, quero exibir a quantidade de pedidos ativos, para monitorar a demanda atual.',
    feature: 'F05',
    moscow: 'Should Have',
    mvp: '❌',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },
  {
    id: 'US18',
    declaracao: 'Como administrador, quero exibir os próximos agendamentos, para planejar as operações futuras.',
    feature: 'F05',
    moscow: 'Could Have',
    mvp: '❌',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },
  {
    id: 'US19',
    declaracao: 'Como administrador, quero exibir os produtos mais alugados no período, para identificar tendências e popularidade.',
    feature: 'F05',
    moscow: 'Could Have',
    mvp: '❌',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },

  // F06: Autenticação e Controle de Acesso
  {
    id: 'US20',
    declaracao: 'Como usuário, quero ter uma tela de login para autenticação, para acessar o sistema de forma segura.',
    feature: 'F06',
    moscow: 'Must Have',
    mvp: '✅',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },
  {
    id: 'US21',
    declaracao: 'Como administrador, quero criar perfis de acesso diferenciados (ex.: Atendente e Gestor), para gerenciar permissões.',
    feature: 'F06',
    moscow: 'Must Have',
    mvp: '❌',
    criteriosDeAceitacao: [],
    regrasDeNegocio: []
  },
];

// ======================================================================
// 2. COMPONENTE TabelaUS (TABELA DE RASTREABILIDADE)
// ======================================================================
function TabelaUS() {
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
          <div className="layout-buttons-map">
            {['Todos', 'F01', 'F02', 'F03', 'F04', 'F05', 'F06'].map(feature => (
              <button
                className="button-map"
                key={feature}
                onClick={() => setFiltroFeature(feature)}>
                {feature}
              </button>
            ))}
          </div>
        </div>
        <div>
          <strong>Filtrar por MVP:</strong>
          <div className="layout-buttons-map">
            {['Todos', 'Sim', 'Não'].map(mvp => (
              <button
                className="button-map"
                key={mvp}
                onClick={() => setFiltroMVP(mvp)}>
                {mvp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de Rastreabilidade */}
      <table className="tabela-customizada">
        <thead>
          <tr>
            <th>Código</th>
            <th>Declaração</th>
            <th>Feature Associada</th>
            <th>MoSCoW</th>
            <th>MVP</th>
          </tr>
        </thead>
        <tbody>
          {historiasFiltradas.map((historia) => (
            <tr key={historia.id}>
              <td><strong>{historia.id}</strong></td>
              <td>{historia.declaracao}</td>
              <td><strong>{historia.feature}</strong></td>
              <td><strong>{historia.moscow}</strong></td>
              <td>{historia.mvp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ======================================================================
// 3. COMPONENTE TabelaCriterios (TABELA DE DETALHES)
// ======================================================================
function TabelaCriterios() {
  return (
    <div style={{ marginTop: '40px' }}>

      {/* Tabela de Critérios de Aceitação e Regras de Negócio */}
      <table className="tabela-customizada">
        <thead>
          <tr>
            <th>Código</th>
            <th>Critérios de Aceitação</th>
            <th>Regras de Negócio</th>
          </tr>
        </thead>
        <tbody>
          {todasHistorias.map((historia) => (
            <tr key={historia.id}>
              <td style={{ verticalAlign: 'top', minWidth: '200px' }}>
                <strong>{historia.id}</strong>
                <p><em>{historia.declaracao}</em></p>
              </td>
              <td>
                {/* Renderiza a lista de Critérios */}
                {historia.criteriosDeAceitacao.length > 0 ? (
                  <ul>
                    {historia.criteriosDeAceitacao.map((criterio, index) => (
                      <li key={index}>{criterio}</li>
                    ))}
                  </ul>
                ) : (
                  <em>(Não definidos)</em>
                )}
              </td>
              <td>
                {/* Renderiza a lista de Regras */}
                {historia.regrasDeNegocio.length > 0 ? (
                  <ul>
                    {historia.regrasDeNegocio.map((regra, index) => (
                      <li key={index}>{regra}</li>
                    ))}
                  </ul>
                ) : (
                  <em>(Não definidas)</em>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ======================================================================
// 4. ESTILOS CSS (Substitui o .module.css)
// ======================================================================
const styles = `
.tabela-customizada {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.tabela-customizada th,
.tabela-customizada td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  vertical-align: top;
}

.tabela-customizada th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.tabela-customizada tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tabela-customizada td ul {
  padding-left: 20px;
  margin: 0;
}

.layout-buttons-map {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.button-map {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
}

.button-map:hover {
  background-color: #f0f0f0;
}
`;

// ======================================================================
// 5. COMPONENTE PRINCIPAL APP
// ======================================================================
export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <style>{styles}</style>
      <TabelaUS />
      <h2 style={{paddingTop: '30px'}}>Detalhes: Critérios de Aceitação e Regras de Negócio</h2>
      <TabelaCriterios />
    </div>
  );
}