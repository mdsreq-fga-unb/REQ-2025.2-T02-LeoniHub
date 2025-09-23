---
sidebar_position: 1
---

# Requisitos Funcionais (RF)

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


