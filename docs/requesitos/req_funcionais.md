---
sidebar_position: 1
---

# Requisitos Funcionais (RF)

---

## Definição das Escalas de Classificação (1 a 5)

Para classificar os requisitos, as seguintes escalas de 1 a 5 foram utilizadas:

**1. Valor de Negócio (VN)**  
Mede o impacto do requisito para o sucesso do projeto e do negócio.

- **5 (Crítico):** Requisito essencial para o Produto Mínimo Viável (MVP). Sua ausência inviabiliza o projeto ou causa falha crítica no funcionamento básico da solução.

- **4 (Alto):** Resolve um problema primário da solução proposta, é altamente recomendado que não hajam atrasos ou impedimentos, considerado como prioritário para a satisfação do cliente.

- **3 (Médio):** Agrega valor significativo as funcionalidades principais do projeto, atrasos no ciclo de vida desenvolvimento devem ser evitados.

- **2 (Baixo):** Sua entrega é recomendada, mas pode ser postergada para o final do sprint ou para uma iteração futura.

- **1 (Desejável):** Requisito de "Nice to have" (aprimoramento estético, pequeno ajuste). Representa escopo para a próxima versão do produto.

**2. Custo Técnico (CT)**  
Estima o esforço da equipe, a complexidade técnica (envolvendo React, Node.js, PostgreSQL) e o risco inerente, dado o cronograma de 3 meses.

- **5 (Muito Alto):** Exige estudo ou envolve a integração complexa de ferramentas que a equipe possui pouca familiaridade. Alto risco de falha ou atraso do sprint.

- **4 (Alto):** Requer múltiplas camadas de desenvolvimento (Front-End/React, Back-End/Node.js e Banco de Dados/PostgreSQL). Deve ser testado e verificado rigorosamente para a aprovação.

- **3 (Médio):** Trabalho padrão que consome no mínimo 4 dias da sprint. Poderá envolver testes rigorosos (TDD/XP) e lógica de negócios moderada.

- **2 (Baixo):** Implementação utilizando componentes e padrões já definidos. Permite uso de programação em pares (XP) para ser concluído rapidamente.

- **1 (Muito Baixo):** Correção de bugs mínimos, ajuste de texto ou pequenas alterações de UI/UX que não afetam a lógica de negócios. Ideal para ser encaixado em um sprint com alto esforço.

---

# Requisitos Funcionais do Sistema

## RF-01 — Cadastro e Gestão de Produtos (estoque)

| Requisito | VN | CT |
| :--- | :-: | :-: |
| **RF-01.1:** Permitir o cadastro de produtos, incluindo fotos, código, tamanho, estado e descrição. | 5 | 4 |
| **RF-01.2:** Permitir a edição das informações de produtos já cadastrados. | 5 | 3 |
| **RF-01.3:** Permitir a consulta de produtos, com visualização detalhada de suas informações. | 5 | 2 |

## RF-02 — Criação e Gestão de Pedidos

| Requisito | VN | CT |
| :--- | :-: | :-: |
| **RF-02.1:** Permitir a criação dos pedidos com código, preço e data do pedido, nome e CPF/CNPJ do cliente; código, tamanho e foto do produto; contrato digital do pedido; data da prova, coleta e devolução. | 5 | 4 |
| **RF-02.2:** Permitir a edição das informações dos pedidos já cadastrados. | 5 | 3 |
| **RF-02.3:** Permitir a consulta de pedidos, com visualização detalhada de suas informações. | 5 | 2 |

## RF-03 — Gestão de Clientes e Histórico de Aluguéis

| Requisito | VN | CT |
| :--- | :-: | :-: |
| **RF-03.1:** Permitir o cadastro de clientes com nome, CPF/CNPJ, telefone e endereço. | 5 | 3 |
| **RF-03.2:** Consultar clientes por nome, CPF ou telefone. | 5 | 2 |
| **RF-03.3:** Exibir o histórico completo de aluguéis e contratos vinculados a cada cliente. | 5 | 4 |

## RF-04 — Contratos Digitais e Assinaturas

| Requisito | VN | CT |
| :--- | :-: | :-: |
| **RF-04.1:** Gerar contratos digitais vinculados ao pedido e ao cliente. | 5 | 4 |
| **RF-04.2:** Permitir assinatura digital dos contratos. | 4 | 4 |
| **RF-04.3:** Disponibilizar busca e recuperação de contratos. | 5 | 3 |

## RF-05 — Agenda Integrada / Calendário de Provas e Retiradas

| Requisito | VN | CT |
| :--- | :-: | :-: |
| **RF-05.1:** Consultar agenda com compromissos de provas, retiradas e devoluções. | 4 | 4 |
| **RF-05.2:** Notificar clientes e atendentes sobre compromissos futuros. | 3 | 2 |

## RF-06 — Dashboard e Relatórios para Gestores

| Requisito | VN | CT |
| :--- | :-: | :-: |
| **RF-06.1:** Consultar faturamento do mês em formato visual. | 4 | 4 |
| **RF-06.2:** Consultar a quantidade de pedidos ativos. | 3 | 2 |
| **RF-06.3:** Consultar os próximos agendamentos. | 4 | 3 |
| **RF-06.4:** Consultar os produtos mais alugados no período. | 4 | 2 |

## RF-07 — Autenticação e Perfis de Acesso

| Requisito | VN | CT |
| :--- | :-: | :-: |
| **RF-07.1:** Disponibilizar tela de login e registro para autenticação de usuários. | 5 | 3 |
| **RF-07.2:** Criar perfis de acesso diferenciados (ex.: Atendente e Gestor). | 4 | 4 |