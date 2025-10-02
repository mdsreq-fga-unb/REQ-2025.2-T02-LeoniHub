---
sidebar_position: 1
---

# Requisitos Funcionais (RF)

---

## Definição das Escalas de Classificação (1 a 5)

Para classificar os requisitos, as seguintes escalas de 1 a 5 foram utilizadas:

**1. Valor de Negócio (VN)**  
Mede o impacto do requisito para o sucesso do projeto e do negócio.

- **5 (Crítico):** Requisito essencial para o Valor Mínimo Viável (MVP). Sua ausência inviabiliza o projeto ou causa falha crítica no controle de estoque (OE2) ou viola a LGPD (OE4).

- **4 (Alto):** Resolve um problema primário ou contribui diretamente para a eficiência operacional (OE1) ou para a autonomia das duas marcas. É prioritário para a satisfação do stakeholder.

- **3 (Médio):** Agrega valor significativo à facilidade de uso ou melhora um módulo de relatório (OE3) crucial para a tomada de decisão.

- **2 (Baixo):** Otimiza um fluxo já funcional ou uma característica existente. Sua entrega é recomendada, mas pode ser postergada para o final do sprint ou para uma iteração futura.

- **1 (Desejável):** Requisito de "Nice to have" (aprimoramento estético, pequeno ajuste). Representa escopo para a próxima versão do produto.

**2. Custo Técnico (CT)**  
Estima o esforço da equipe, a complexidade técnica (envolvendo React, Node.js, PostgreSQL) e o risco inerente, dado o cronograma de 3 meses.

- **5 (Muito Alto):** Exige estudo ou envolve a integração complexa de estoque (área de pouca experiência da equipe). Alto risco de falha ou atraso do sprint.

- **4 (Alto):** Requer múltiplas camadas de desenvolvimento (Front-End/React, Back-End/Node.js e Banco de Dados/PostgreSQL). Envolve funcionalidades de segurança (OE4/OE5) ou arquitetura não trivial.

- **3 (Médio):** Trabalho padrão que consome uma fatia significativa do sprint quinzenal. Poderá envolver testes rigorosos (TDD/XP) e lógica de negócios moderada.

- **2 (Baixo):** Implementação direta no Front-End ou Back-End, utilizando componentes e padrões já definidos. Permite uso de programação em pares (XP) para ser concluído rapidamente.

- **1 (Muito Baixo):** Correção de bugs mínimos, ajuste de texto ou pequenas alterações de UI/UX que não afetam a lógica de negócios. Ideal para ser encaixado em um sprint com alto esforço.

---

## RF-01 — Cadastro e Gestão de Produtos (estoque)

**RF-01.1:** Permitir o cadastro de produtos, incluindo fotos, código, tamanho, estado e descrição. - **( VN: 5 / CT: 4 )**

**RF-01.2:** Permitir a edição das informações de produtos já cadastrados. - **( VN: 5 / CT: 3 )**

**RF-01.3:** Permitir a consulta de produtos, com visualização detalhada de suas informações. - **( VN: 5 / CT: 2 )**

**RF-01.4:** Realizar controle de estoque atualizando quantidades disponíveis. - **( VN: 5 / CT: 3 )**

## RF-02 — Controle de Status de Inventário em Tempo Real

**RF-02.1:** Atualizar automaticamente o status de um produto (disponível, alugado, devolvido) após operações de aluguel ou devolução. - **( VN: 4 / CT: 2 )**

## RF-03 — Gestão de Clientes e Histórico de Aluguéis

**RF-03.1:** Permitir o cadastro de clientes com nome, CPF/CNPJ, telefone e endereço. - **( VN: 5 / CT: 3 )**

**RF-03.2:** Consultar clientes por nome, CPF ou telefone. - **( VN: 5 / CT: 2 )**

**RF-03.3:** Exibir o histórico completo de aluguéis e contratos vinculados a cada cliente. - **( VN: 5 / CT: 4 )**

## RF-04 — Contratos Digitais e Assinaturas

**RF-04.1:** Gerar contratos digitais vinculados ao pedido e ao cliente. - **( VN: 5 / CT: 4 )**

**RF-04.2:** Permitir assinatura digital dos contratos. - **( VN: 4 / CT: 4 )**

**RF-04.3:** Armazenar contratos de forma segura e organizada. - **( VN: 3 / CT: 3 )**

**RF-04.4:** Disponibilizar busca e recuperação de contratos. - **( VN: 5 / CT: 3 )**

## RF-05 — Agenda Integrada / Calendário de Provas e Retiradas

**RF-05.1:** Exibir agenda com compromissos de provas, retiradas e devoluções. - **( VN: 4 / CT: 4 )**

**RF-05.2:** Disponibilizar filtros de agenda por loja e por atendente. - **( VN: 4 / CT: 4 )**

**RF-05.3:** Notificar clientes e atendentes sobre compromissos futuros. - **( VN: 3 / CT: 2 )**

## RF-06 — Dashboard e Relatórios para Gestores

**RF-06.1:** Exibir faturamento do mês em formato visual. - **( VN: 4 / CT: 4 )**

**RF-06.2:** Exibir a quantidade de pedidos ativos. - **( VN: 3 / CT: 2 )**

**RF-06.3:** Exibir os próximos agendamentos. - **( VN: 4 / CT: 3 )**

**RF-06.4:** Exibir os produtos mais alugados no período. - **( VN: 4 / CT: 2 )**

## RF-07 — Autenticação e Perfis de Acesso

**RF-07.1:** Disponibilizar tela de login e registro para autenticação de usuários. - **( VN: 5 / CT: 3 )**

**RF-07.2:** Criar perfis de acesso diferenciados (ex.: Atendente e Gestor). - **( VN: 4 / CT: 4 )**

**RF-07.3:** Restringir funcionalidades de acordo com o perfil de acesso. - **( VN: 4 / CT: 5 )**
