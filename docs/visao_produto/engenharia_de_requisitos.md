---
title: "Engenharia de Requisitos"
sidebar_label: "Engenharia de Requisitos"
sidebar_position: 4
---

# 4. Engenharia de Requisitos

## 4.1 Atividades e Técnicas de ER

## Elicitação e Descoberta

- **Reuniões com cliente:** Serão realizadas reuniões com os gestores da Closet Chic e da futura Leoni. O objetivo é entender em profundidade os gargalos operacionais (ex: controle de status do inventário, retrabalho) e a visão estratégica para o novo sistema unificado.

- **Brainstorming:** Sessões colaborativas com a equipe para gerar ideias sobre como resolver os problemas centrais. Por exemplo: "Qual a melhor forma de visualizar o calendário de disponibilidade de uma peça?" ou "Como podemos simplificar o processo de fechamento de caixa para evitar erros?". Isso estimula a criatividade e o alinhamento na busca pela melhor solução técnica e de usabilidade.

## Análise e Consenso

- **Refinamento do Backlog (Backlog Refinement):** Em vez de um único grande workshop, nossa equipe adotará a prática de refinamento contínuo do backlog. Regularmente, o Product Owner, o time de desenvolvimento e stakeholders relevantes se reunirão para revisar, priorizar e detalhar os itens do backlog. O objetivo é garantir que as Histórias de Usuário que estão no topo da lista estejam claras, testáveis e prontas (Definition of Ready) para serem puxadas para uma Sprint.

- **Priorização MoSCoW:** A priorização MoSCoW é uma técnica utilizada para classificar requisitos ou funcionalidades com base em sua importância para o sucesso do projeto. Suas iniciais representam as categorias "Must have", "Should have", "Could have" e "Won't have". O projeto da Closet Chic apresenta uma complexidade clara: substituir um sistema legado com múltiplas falhas (Clariai) e, ao mesmo tempo, suportar a expansão do negócio. Considerando que nosso objetivo principal é resolver os gargalos operacionais atuais para garantir a estabilidade, é essencial aplicar uma técnica de priorização que nos permita distinguir as funcionalidades indispensáveis daquelas que podem ser planejadas para o futuro.

- **Planning Game (XP):** Prática central do XP que será usada no início de cada sprint. A equipe usará estimativas relativas (como Story Points) para avaliar o esforço necessário para cada história. Isso ajuda a equilibrar o que os stakeholders da Closet Chic desejam com a capacidade real de entrega da equipe dentro de uma iteração.


## Declaração de Requisitos

- **User Story (História de Usuário):** Os Requisitos Funcionais (RFs) listados servirão como base para a criação das Histórias de Usuário, que são a forma como o trabalho será descrito no Product Backlog. Este formato simples e centrado no usuário facilita o entendimento e o planejamento dentro de cada Sprint. Por exemplo, o requisito RF-03.3 (Exibir o histórico de aluguéis) se tornará uma história como:

"Como um(a) Atendente, eu quero consultar o histórico completo de aluguéis de um cliente para que eu possa oferecer um atendimento personalizado e verificar rapidamente informações de contratos passados."

## Representação de Requisitos

- **Storyboards:** Para funcionalidades mais complexas, como o fluxo completo de aluguel, serão criados storyboards. Eles desenharão a sequência de telas e interações do usuário, desde a busca por um terno no sistema, passando pela reserva para o cliente, até o registro da devolução. Isso é vital para validar o fluxo de trabalho com a equipe da Closet Chic antes do desenvolvimento.

## Verificação e Validação de Requisitos

- **Critérios de Aceitação:** Cada história de usuário terá critérios claros que definem quando ela está concluída. Para a história de exemplo acima, os critérios poderiam ser:

  - A busca deve funcionar pelo nome ou código da peça.
  - O sistema deve exibir claramente um dos três status: "Disponível", "Alugado" ou "Em Manutenção".

- **Definition of Done (DoD):** É o nosso checklist de qualidade global. Para o sistema da Closet Chic, uma história só será considerada "Pronta" (Done) quando os testes automatizados passarem, o código for revisado e a funcionalidade estiver implantada no ambiente de homologação, pronta para a validação do cliente, conforme previsto no cronograma.

- **Definition of Ready (DoR):** Define quando uma história está pronta para entrar na sprint. Para nossa equipe, uma história só está "Pronta para Desenvolvimento" (Ready) se tiver uma descrição clara, critérios de aceitação definidos e o time entender o que precisa ser feito, evitando ambiguidades durante a sprint.

## Revisão e Feedback

- **Revisão (Sprint Review):** Ao final de cada sprint (conforme a coluna "Validação do Cliente" no cronograma), haverá uma reunião com os gestores da Closet Chic para demonstrar o que foi construído. Por exemplo, ao final da Sprint 3, a equipe demonstrará o fluxo completo de criação e cancelamento de pedidos.

- **Feedback do Cliente:** Esta é a principal saída da Sprint Review. O feedback direto dos gestores da loja sobre as entregas parciais ("A listagem de clientes está ótima, mas precisamos de um campo de busca") será usado para orientar e repriorizar o backlog para as próximas sprints, garantindo que o produto final realmente resolva os problemas do dia a dia.

## Organização e Atualização de Requisitos

- **Backlog de Requisitos (Product Backlog):** Será a fonte única e central de todos os trabalhos a serem feitos. Manteremos uma lista dinâmica e priorizada de todas as funcionalidades, melhorias e correções para o novo sistema da Closet Chic e Leoni. O backlog será constantemente refinado e atualizado com base no feedback das Sprints e nas novas necessidades do negócio.
