---
title: "Atas de Reunião"
sidebar_label: "Atas de Reunião"
sidebar_position: 2
---

# Atas de Reunião

Esta seção contém o registro de todas as reuniões realizadas com o cliente durante o desenvolvimento do projeto.

---

## Reunião 01 - Introdução ao Projeto
**Data:** 29/09/2025  
**Horário:** 19h00 - 20h30  
**Local:** Online - Google Meet  
**Participantes:**
- Equipe de Desenvolvimento
- Cliente (Proprietário da Leonni e Closet Chic)

### Pauta
1. Apresentação da equipe e metodologia de trabalho
2. Levantamento inicial de requisitos e expectativas
3. Definição do escopo do MVP
4. Alinhamento sobre cronograma e entregas

### Discussões
- Cliente apresentou os principais problemas do sistema atual (Clariai): lentidão, falta de controle de estoque em tempo real, relatórios limitados
- Cliente possui duas lojas: Closet Chic (foco feminino) e Leonni (foco masculino)
- Escopo inicial: atender ambas as lojas com arquitetura multi-loja
- Priorização: gestão de produtos, clientes, pedidos e contratos digitais como funcionalidades essenciais
- Cliente solicitou interface simples e intuitiva para facilitar o uso pela equipe
- Contratos digitais são importantes para formalização dos aluguéis

### Decisões
- Projeto utilizará arquitetura multi-loja (isolamento de dados entre Closet Chic e Leonni)
- Sprints quinzenais com validações ao final de cada sprint
- Ambiente de homologação será disponibilizado a partir da Sprint 2
- Reuniões de validação ocorrerão online via Google Meet

### Próximos Passos
- Equipe: elaborar backlog detalhado e protótipos iniciais
- Cliente: disponibilizar acesso ao sistema atual para análise
- Próxima reunião: 13/10/2025 para aprovação do backlog

---

## Reunião 02 - Validação Sprint 1
**Data:** 13/10/2025  
**Horário:** 21h00 - 22h30  
**Local:** Online - Google Meet  
**Participantes:**
- Equipe de Desenvolvimento
- Cliente (Proprietário da Leonni e Closet Chic)

### Pauta
1. Apresentação do backlog inicial e histórias de usuário
2. Demonstração da estrutura do projeto e banco de dados
3. Validação da tela de login
4. Aprovação das prioridades definidas

### Discussões
- Cliente aprovou o backlog proposto e as histórias de usuário mapeadas
- Validada a estrutura inicial do banco de dados (tabelas clientes e produtos)
- Cliente testou a tela de login e aprovou a interface
- Sugestão de adicionar campos CEP, cidade e estado no cadastro de clientes (implementado posteriormente)
- Cliente confirmou que notificações automáticas e agenda não são prioridade para o MVP

### Decisões
- Backlog aprovado com histórias de usuário incluindo contratos digitais (F04)
- Features priorizadas: F01 (Produtos), F02 (Pedidos), F03 (Clientes), F04 (Contratos), F07 (Autenticação)
- Arquitetura multi-loja confirmada para atender Closet Chic e Leonni
- Acordado que dashboard e relatórios serão implementados se houver tempo na Sprint 4

### Próximos Passos
- Equipe: iniciar desenvolvimento das funcionalidades de cadastro
- Próxima reunião: 28/10/2025 para demonstração dos cadastros

---
## Reunião 03 - Validação Sprint 2
**Data:** 28/10/2025  
**Horário:** 19h00 - 20h30  
**Local:** Online - Google Meet  
**Participantes:**
- Equipe de Desenvolvimento
- Cliente (Proprietário da Leonni e Closet Chic)

### Pauta
1. Demonstração do cadastro e listagem de clientes
2. Demonstração do cadastro e listagem de produtos

### Discussões
- Cliente testou o cadastro de clientes e aprovou a interface simples e direta
- Validação do CPF/CNPJ funcionando corretamente
- Cadastro de produtos aprovado, incluindo upload de fotos
- Cliente solicitou ajuste na exibição da lista de produtos (adicionar filtro por tamanho)

### Decisões
- Adicionar campo de busca rápida por código do produto
- Manter campos obrigatórios conforme definido (evitar cadastros incompletos)
- Cliente aprovou seguir para implementação do módulo de pedidos

### Próximos Passos
- Equipe: implementar ajustes solicitados e iniciar módulo de pedidos
- Próxima reunião: 12/11/2025 para validação do fluxo de pedidos

---

## Reunião 04 - Validação Sprint 3
**Data:** 12/11/2025  
**Horário:** 21h00 - 22h30  
**Local:** Online - Google Meet  
**Participantes:**
- Equipe de Desenvolvimento
- Cliente (Proprietário da Leonni)

### Pauta
1. Demonstração da criação de pedidos
2. Teste do cancelamento de pedidos
3. Validação do acompanhamento de status

### Discussões
- Cliente aprovou o fluxo de criação de pedidos, considerando intuitivo e rápido
- Validação da vinculação automática entre cliente, produto e pedido funcionando corretamente
- Cancelamento de pedidos testado e aprovado
- Cliente solicitou melhorias na exibição do histórico de pedidos do cliente
- Discussão sobre a necessidade de registrar datas de prova, coleta e devolução 

### Decisões
- Melhorar visualização do histórico de pedidos (organizar por data decrescente)
- Adicionar indicador visual de pedidos ativos vs. finalizados
- Confirmar que o controle de estoque está atualizando corretamente o status dos produtos
- Cliente aprovou seguir para a sprint final com foco em estoque e relatórios básicos

### Próximos Passos
- Equipe: implementar melhorias no histórico e finalizar controle de estoque
- Próxima reunião: 27/11/2025 para homologação final do sistema

---

## Reunião 05 - Homologação Final (Sprint 4)
**Data:** 27/11/2025  
**Horário:** 19h00 - 20h30  
**Local:** Online - Google Meet  
**Participantes:**
- Equipe de Desenvolvimento
- Cliente (Proprietário da Leonni)

### Pauta
1. Demonstração do controle de estoque completo
2. Apresentação dos relatórios básicos implementados
3. Teste do fluxo completo do sistema
4. Validação final para implantação

### Discussões
- Cliente validou o controle de estoque em tempo real, destacando como principal melhoria
- Relatórios básicos (total de clientes, pedidos ativos) aprovados
- Equipe testou fluxo completo: cadastro → pedido → alteração de status → consulta
- Cliente relatou satisfação com a performance e usabilidade geral
- Discussão sobre próximas funcionalidades desejadas (dashboard completo, agenda integrada)

### Decisões
- Sistema homologado e aprovado para uso em produção
- Acordado que funcionalidades adicionais (dashboard, agenda) serão escopo da versão 2.0

### Próximos Passos
- Equipe: preparar ambiente de produção e realizar deploy final
- Cliente: migrar dados do sistema antigo para o novo sistema

### Conclusão
Cliente expressou satisfação com o resultado final do MVP, destacando a melhoria significativa na operação da loja. Projeto concluído dentro do prazo e escopo acordado.
