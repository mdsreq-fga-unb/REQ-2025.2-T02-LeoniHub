---
sidebar_position: 1
---

# Requisitos Funcionais (RF)

---

## Definição das Escalas de Classificação (1 a 5)

Para classificar os requisitos, as seguintes escalas de 1 a 5 foram utilizadas:

**Valor de Negócio (VN)**  
Mede o impacto do requisito para o sucesso do projeto e do negócio.

- **5 (Crítico):** Essencial para o lançamento. Sem ele, o sistema falha completamente em seu propósito de negócio e o lançamento é impossível.
- **4 (Alto):** Primário. Sem ele, a operação principal é inviável ou a funcionalidade central do produto é comprometida.
- **3 (Médio):** Relevante. Agrega valor legal, financeiro ou de segurança, ou melhora significativamente a experiência do usuário.
- **2 (Baixo):** Melhora Operacional. Melhora a eficiência ou a experiência do usuário, mas o negócio pode operar sem ele no início.
- **1 (Desejável):** "Nice to have". Melhoria de qualidade de vida ou requisito futuro. Sua ausência não impacta a operação ou o valor central.

**Custo Técnico (CT)**  
Estima a complexidade, o tempo e o esforço necessários para a implementação.

- **5 (Muito Alto):** Altamente Complexo. Exige P&D, nova arquitetura, integração crítica com terceiros, ou um alto risco de implementação.
- **4 (Alto):** Complexo. Requer muito tempo, envolve múltiplas equipes ou uso de tecnologias não triviais (ex: tempo real, segurança avançada).
- **3 (Médio):** Moderado. Requer trabalho padrão, mas com várias etapas de desenvolvimento, design de UI/UX dedicado e testes rigorosos.
- **2 (Baixo):** Simples. Implementação direta, uso de componentes já existentes no sistema.
- **1 (Muito Baixo):** Trivial. Rápido de implementar, ajuste ou correção menor.

---

## RF-01 — Cadastro e Gestão de Produtos (estoque)

**RF-01.1:** Permitir o cadastro de produtos, incluindo fotos, código, tamanho, estado e descrição. - **( VN: 5 / CT: 4 )**

**RF-01.2:** Permitir a edição das informações de produtos já cadastrados. - **( VN: 5 / CT: 3 )**

**RF-01.3:** Permitir a consulta de produtos, com visualização detalhada de suas informações. - **( VN: 5 / CT: 2 )**

**RF-01.4:** Realizar controle de estoque  atualizando quantidades disponíveis. - **( VN: 5 / CT: 3 )**

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

**RF-07.1:** Disponibilizar tela de login para autenticação de usuários. - **( VN: 5 / CT: 3 )**

**RF-07.2:** Criar perfis de acesso diferenciados (ex.: Atendente e Gestor). - **( VN: 4 / CT: 4 )**

**RF-07.3:** Restringir funcionalidades de acordo com o perfil de acesso. - **( VN: 4 / CT: 5 )**