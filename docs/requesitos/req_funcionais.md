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

Permitir que o sistema realize as seguintes ações com os produtos:

- Cadastrar, editar e consultar.
- Incluir informações como fotos, código, tamanho, estado e status de disponibilidade.

## RF-02 — Controle de Status de Inventário em Tempo Real

O sistema deve atualizar o status de um produto (disponível, alugado, devolvido) imediatamente após uma operação de aluguel ou devolução. Isso deve garantir consistência mesmo com usuários acessando o sistema simultaneamente.

## RF-03 — Gestão de Clientes e Histórico de Aluguéis

Permitir o cadastro de clientes e a consulta por nome, CPF ou telefone. O sistema deve exibir o histórico completo de aluguéis e contratos vinculados ao cliente.

## RF-04 — Contratos Digitais e Assinaturas

O sistema deve ser capaz de gerar contratos digitais vinculados ao pedido e ao cliente. Deve permitir a assinatura digital, o armazenamento seguro e a recuperação fácil dos contratos através de uma busca.

## RF-05 — Agenda Integrada / Calendário de Provas e Retiradas

Disponibilizar uma agenda que exiba os compromissos (provas, retiradas e devoluções) de forma organizada, com filtros por loja e por atendente.

## RF-06 — Dashboard e Relatórios para Gestores

Exibir um dashboard visual com os principais indicadores de negócio, incluindo:

- Faturamento do mês
- Pedidos ativos
- Próximos agendamentos
- Principais produtos alugados

## RF-07 — Isolamento de Dados entre Lojas

Garantir que os dados de clientes, produtos e pedidos sejam isolados por loja. Funcionários de uma loja não devem ter permissão para visualizar ou acessar dados de outra.

## RF-08 — Autenticação e Perfis de Acesso

O sistema deve possuir uma tela de login para autenticação de usuários. Devem existir perfis de acesso (ex: Atendente, Gestor) que restrinjam o acesso a funcionalidades específicas conforme o cargo do funcionário.
