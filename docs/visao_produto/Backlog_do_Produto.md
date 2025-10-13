---
title: "Backlog do Produto"
sidebar_label: "Backlog do Produto"
sidebar_position: 7
---

## Features

---


| ID    | Título                                | Descrição                                                                                                                                     |
| ------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **F01** | **Gestão de Produtos e Estoque**      | Permite o cadastro, edição, consulta e controle de produtos, mantendo o estoque sempre atualizado e sincronizado com as operações do sistema. |
| **F02** | **Gestão de Pedidos**      | Possibilita a criação, edição e consulta de pedidos, integrando informações de produtos, clientes e contratos digitais.                       |
| **F03** | **Gestão de Clientes e Histórico**    | Permite o cadastro e consulta de clientes, exibindo o histórico de aluguéis e contratos associados.                                           |
| **F04** | **Contratos Digitais e Assinaturas**  | Gera contratos digitais vinculados a pedidos e clientes, com possibilidade de assinatura e armazenamento seguro.                              |
| **F05** | **Agenda Integrada e Notificações**   | Fornece uma agenda unificada para compromissos de provas, retiradas e devoluções, com filtros e notificações automáticas.                     |
| **F06** | **Dashboard e Relatórios**            | Oferece visualizações gráficas e métricas de desempenho, como faturamento, pedidos ativos, agendamentos e produtos mais alugados.             |
| **F07** | **Autenticação e Controle de Acesso** | Garante login seguro e controle de permissões por perfil (Gestor, Atendente, Cliente), protegendo as informações do sistema.                  |

---
## Histórias de Usuário

| Código   | Feature Associada | Requisito Funcional Relacionado | Declaração                                                                                                                                                                                  |
| -------- | ----------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **US01** | F01               | RF-01.1                         | Como administrador, quero cadastrar produtos, incluindo fotos, código, tamanho, estado e descrição, para poder adicionar novos itens ao sistema.                                            |
| **US02** | F01               | RF-01.2                         | Como administrador, quero editar as informações de produtos já cadastrados, para garantir que estejam sempre corretas.                                                            
| **US03** | F01               | RF-01.3                         | Como administrador, quero consultar produtos, com visualização detalhada de suas informações, para ter uma visão clara dos itens disponíveis.                                                         
| **US04** | F02               | RF-02.1                         | Como administrador, eu quero criar um novo pedido com todos os dados do cliente, do produto, valores e datas de compromisso, para que o aluguel seja formalizado no eu sistema.                   
| **US05** | F02               | RF-02.2                         | Como administrador, eu quero editar um pedido de aluguel existente, para que eu possa eu possa alterar dados como datas ou produtos em caso de necessidade do cliente.                                   
| **US06** | F02               | RF-02.3                         | Como administrador, eu quero consultar um pedido e ver todos os seus detalhes, para que eu possa rastrear o status e as informações de compromisso do aluguel.                                   
| **US07** | F03               | RF-03.1                         | Como administrador, quero cadastrar clientes com nome, CPF/CNPJ, telefone e endereço, para gerenciar a base de clientes.                                                                            
| **US08** | F03               | RF-03.2                         | Como administrador, quero consultar clientes por nome, CPF ou telefone, para localizar rapidamente as informações de um cliente.                                                                  
| **US09** | F03               | RF-03.3                         | Como administrador, quero exibir o histórico completo de aluguéis e contratos vinculados a cada cliente, para ter uma visão detalhada do relacionamento.                                         
| **US10** | F04               | RF-04.1                         | Como administrador, quero gerar contratos digitais vinculados ao pedido e ao cliente, para formalizar as transações.                                                                              
| **US11** | F04               | RF-04.2                         | Como signatário do contrato, eu quero aplicar minha assinatura digitalmente ao documento, para que eu possa agilizar o processo de formalização e manter o registro seguro.                       
| **US12** | F04               | RF-04.1, RF-04.3                | Como administrador, quero armazenar contratos de forma segura e organizada, para garantir a integridade e acessibilidade dos documentos.                                                          
| **US13** | F04               | RF-04.3                         | Como administrador, quero buscar e recuperar contratos, para acessar documentos específicos quando necessário.                                                                                   
| **US14** | F05               | RF-05.1                         | Como administrador, eu quero consultar a agenda/calendário com todos os compromissos de provas, retiradas e devoluções, para que eu possa planejar o dia e gerenciar a disponibilidade do estoque. |
| **US15** | F05               | RF-05.2                         | Como administrador, eu quero enviar notificações automáticas aos clientes e atendentes sobre compromissos futuros (provas, retiradas, devoluções), para que a chance de esquecimento seja minimizada. |
| **US16** | F06               | RF-06.1                         | Como administrador, quero exibir o faturamento do mês em formato visual, para acompanhar o desempenho financeiro.                                                                               
| **US17** | F06               | RF-06.2                         | Como administrador, quero exibir a quantidade de pedidos ativos, para monitorar a demanda atual.                                                                                                
| **US18** | F06               | RF-06.3                         | Como administrador, quero exibir os próximos agendamentos, para planejar as operações futuras.                                                                                                  
| **US19** | F06               | RF-06.4                         | Como administrador, quero exibir os produtos mais alugados no período, para identificar tendências e popularidade.                                                                               
| **US20** | F07               | RF-07.1                         | Como usuário, quero ter uma tela de login para autenticação, para acessar o sistema de forma segura.                                                                                            
| **US21** | F07               | RF-07.2                         | Como administrador, quero criar perfis de acesso diferenciados (ex.: Atendente e Gestor), para gerenciar permissões.                                                                             