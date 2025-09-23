---
title: "Cronograma e Entregas"
sidebar_label: "Cronograma e Entregas"
sidebar_position: 4
---

## 4. Cronograma e Entregas

A partir da estratégia de desenvolvimento de software estabelecida, tem-se a seguinte proposta de cronograma, suas fases e resultados esperados:

| Sprint | Inicio | Fim | Objetivo Principal | Entregas Esperadas | Validação do Cliente |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sprint 1** | 29/09/2025 | 13/10/2025 | Construção do Backlog, Configuração da estrutura inicial do projeto e base mínima funcional. | -Backlog inicial e mapeamento de funcionalidades, com a criação das histórias de usuário.<br/>- Configuração do ambiente de desenvolvimento.<br/>- Estrutura do banco de dados (PostgreSQL).<br/>-Estrutura inicial do banco de dados (clientes e produtos) <br/>Tela de login (estática) + autenticação simples.| Aprovação do backlog inicial. <br/>Acesso ao sistema e teste da tela de login |
| **Sprint 2** | 14/10/2025 | 28/10/2025 | Funcionalidades Básicas| **-Entrega Parcial 1**: <br/> -Cadastro e listagem de clientes. <br/> Cadastro e listagem de produtos (sem estoque ainda).<br/>-Testes iniciais automatizados (TDD nos modelos básicos).<br/>-Deploy em ambiente de homologação simples.| Demonstração do fluxo de abrir e cancelar pedidos. <br/> Aprovação do módulo inicial de pedidos.|
| **Sprint 3** | 29/10/2025 | 12/11/2025 | Gestão de Pedidos e Integração de Dados | **-Entrega Parcial 2**: <br/> - Criação de pedidos (ligando cliente e produto). <br/>-Cancelamento de pedidos. <br/>-Acompanhamento simples do status do pedido. <br/> -Integração contínua + refatoração contínua. | Demonstração do fluxo de abrir e cancelar pedidos. <br/> Aprovação do módulo inicial de pedidos. |
| **Sprint 4** | 13/11/2025 | 27/11/2025 | Controle de estoque e relatórios | **-Entrega Parcial 3**: <br/> - Controle de estoque (disponível, alugado, devolvido).<br/>- Relatórios simples (número total de clientes cadastrados e pedidos criados). <br/>- Ajustes finais de usabilidade e performance. | Teste do fluxo completo (cadastro → pedido → alteração → contrato). <br/> Cliente verifica se os números nos indicadores correspondem à realidade do sistema. <br/> Homologação final do sistema para implantação |

<br/>

## Considerações Importantes

**Data de início e Fim:** Cada sprint tem a duração de duas semanas, começando em 14/04/2025 e finalizando em 27/11/2025, distribuindo duas entregas parciais ao longo do tempo.

Este cronograma representa uma estimativa inicial baseada nas informações e requisitos disponíveis até o momento. Por se tratar de um projeto ágil, ajustes nas datas, entregas e prioridades poderão ser realizados ao longo do desenvolvimento, de acordo com o feedback do cliente, imprevistos técnicos ou novas necessidades identificadas.