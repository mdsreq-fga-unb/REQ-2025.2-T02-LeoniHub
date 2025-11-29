---
title: "Solução Proposta"
sidebar_label: "Solução Proposta"
sidebar_position: 2
---

# 2. SOLUÇÃO PROPOSTA

## 2.1 Objetivos do Produto

### Objetivo Geral

Desenvolver uma plataforma para a marca Leoni que substitua o sistema legado, eliminando gargalos operacionais através de um controle de estoque em tempo real e garantindo a escalabilidade e eficiência no atendimento.

### Objetivos Específicos e Indicadores

| Código  | Objetivo Específico                                                                     | Indicador de Sucesso                                                                  |
| :------ | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **OE1** | Aumentar a eficiência operacional no fluxo de atendimento e locação.                    | Redução do tempo para fechamento dos contratos em 20%.                                |
| **OE2** | Aumentar a precisão do controle do estoque em tempo real.                               | Redução em ≥ 80% dos erros de disponibilidade ou falhas no registro de estoque.       |
| **OE3** | Apoiar a tomada de decisão com dados estratégicos e financeiros confiáveis.             | Satisfação ≥ 70% dos gestores e eliminação de divergências no fechamento de caixa.    |
| **OE4** | Garantir a segurança dos dados dos clientes e garantir a conformidade com a LGPD.       | Ausência de vazamentos de dados e conformidade com auditorias de segurança.           |
| **OE5** | Assegurar o controle de acesso às informações e agilizar a administração de permissões. | Redução de incidentes de acesso indevido e otimização do tempo de gestão de usuários. |

## 2.2 Características da Solução

A solução será uma **plataforma web**, acessada pelos funcionários, que trará ferramentas para deixar a operação mais prática e organizada.

Entre as principais características estão:

- **Cadastro de produtos** (vestidos, ternos e acessórios), com informações completas e atualizadas de disponibilidade.
- **Gestão de clientes** de forma rápida e simples, permitindo consultas e acesso ao histórico de aluguéis.
- **Contratos digitais**, que podem ser assinados de maneira fácil, com registro de provas, retiradas e devoluções.
- **Gestão de Pedidos**, permitindo a abertura, o cancelamento e o acompanhamento de cada aluguel, exibindo detalhes como foto e código do produto no momento da consulta.
- **Agenda integrada**, que mostra todos os compromissos da loja em um calendário ou lista organizada.
- **Financeiro**, com relatórios detalhados sobre as formas de pagamento (PIX, cartão e dinheiro), controle de valores a receber e a pagar.
- **Dashboard**, um painel em tempo real que exibe os principais indicadores do negócio, como faturamento do mês, pedidos ativos, agendamentos do dia, pedidos recentes, próximos agendamentos e gráficos.
- **Isolamento de dados:** informações de clientes, produtos e pedidos não são compartilhadas entre as lojas.
- **Autonomia operacional:** cada loja pode gerir seus relatórios, cadastros e controles financeiros de maneira independente.
- **Perfis de acesso diferenciados**, garantindo que cada funcionário use apenas as funções necessárias para sua rotina.

### Mapeamento de Problemas x Soluções

A tabela a seguir apresenta o mapeamento entre os problemas identificados no cenário atual e as características da solução proposta:

| Problema Identificado (Cenário Atual)                                                                | Característica da Solução Mapeada                                                                                                                                                  |
| :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Falta de controle de estoque:** Inconsistências sobre o que está disponível, alugado ou devolvido. | **Gestão de Estoque em Tempo Real:** Controle rigoroso de status do item (disponível, alugado, em manutenção) para evitar conflitos de agenda. **[OE2]**                           |
| **Gargalo Operacional:** Sistema atual não suporta o volume e a complexidade de duas marcas.         | **Arquitetura Multi-loja (Isolamento de Dados):** Plataforma única que gerencia Closet Chic e Leoni separadamente, garantindo autonomia operacional. **[OE1]** **[OE3]** **[OE5]** |
| **Retrabalho Manual:** Necessidade de conferências físicas e processos manuais repetitivos.          | **Contratos Digitais e Automação:** Geração automática de contratos e registro digital de provas, retiradas e devoluções. **[OE2]**                                                |
| **Falta de Visão Estratégica:** Relatórios limitados e insegurança no fechamento de caixa.           | **Dashboards e Relatórios Financeiros:** Painéis com indicadores em tempo real (faturamento, pedidos ativos) para apoio à decisão. **[OE3]** **[OE5]**                             |
| **Usabilidade Ruim:** Sistema pouco intuitivo que gera lentidão no atendimento.                      | **Interface Intuitiva e Agenda Integrada:** Design focado na experiência do usuário (UX) para agilizar o fluxo de atendimento e consulta. **[OE1]**                                |

## 2.3 Tecnologias a Serem Utilizadas

- PostgreSQL
- Node.js
- HTML
- CSS
- React
- TypeScript (TS)
- JavaScript (JS)

## 2.4 Pesquisa de Mercado e Análise Competitiva

- **Contra Azul:** Pouco foco no estoque, custo elevado para gestão e baixa flexibilidade. Módulo de estoque secundário, otimizado para um fluxo padrão de venda, dificultando o uso em outros contextos de compra.
- **Zoho Inventory:** Pouca adaptabilidade a fiscalização brasileira, alta complexidade e alto custo. Sistema não intuitivo e difícil de se utilizar, escassez de ferramentas para lidar com a fiscalização monetária brasileira e custos elevados devido ao dólar.

A solução da Leoni Hub vai se diferenciar por:

- **Foco no estoque em tempo real:** O sistema será integrado ao estoque da loja, evitando compras com produtos sem disponibilidade e otimizando o rastreio dos produtos, reduzindo o tempo do fluxo de compra e venda.
- **Gestão de Contratos:** A solução irá armazenar contratos de vendas e informações dos produtos de forma organizada e intuitiva, facilitando a busca de informações e a administração de produtos e clientes.
- **Fluxo de compra intuitivo:** O processo de compra será intuitivo e simples de usar, facilitando o uso no dia a dia e aumentando a quantidade de contratos e vendas realizadas por dia.

## 2.5 Análise de Viabilidade

A viabilidade técnica do projeto é mediana, considerando que a equipe tem conhecimento médio das ferramentas a serem utilizadas e pouca experiência com integração de estoque. O prazo estimado para o desenvolvimento é de três meses; o projeto será dividido em sprints quinzenais. Cada sprint terá 15 dias, será seguido pelo ciclo de vida iterativa e incremental, visando a entrega incremental de funcionalidades, facilitando o alinhamento do produto com o cliente. O cronograma é considerado viável, dado que a equipe possui experiência em projetos semelhantes e conta com o tempo necessário para confeccionar o produto no tempo estipulado. Logo, é importante ressaltar que a equipe nunca confeccionou um sistema de gerenciamento de estoque, sendo um projeto novo para os integrantes, pode haver complicações no projeto.

## 2.6 Impacto da Solução

A plataforma Leoni Hub vai otimizar o fluxo de compra e gestão de estoque da Closet Chic e da Leoni, impactando de forma positiva o cotidiano da loja.

1.  **Aumento nas Vendas**
    A plataforma irá introduzir um método intuitivo e rápido de vendas, aumentando a quantidade de contratos fechados por dia, resultando em um aumento geral no faturamento da empresa.

2.  **Gestão de estoque confiável e simples**
    A administração dos produtos será intuitiva e fácil de realizar, oferecendo uma simplicidade de uso para os funcionários, aumentando a produtividade da equipe.

3.  **Maior segurança no armazenamento de contratos**
    A solução realiza a segurança dos contratos da loja, com criptografias e sistemas de login, diminui o risco de vazamento de dados, obedecendo também a LGPD.

4.  **Integração de Sistemas**
    O website irá atender tanto a Closet Chic Compartilhada quanto a loja Leonni, oferecendo maior velocidade de acesso pelos gerentes, facilitando a análise financeira das lojas.

5.  **Maior velocidade no fechamento de contratos**
    A plataforma vai ser intuitiva e simples de se usar, facilitando o fluxo dos funcionários para o fechamento de compras, aumentando a velocidade geral da operação.
