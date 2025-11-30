---
title: "Estratégias de Engenharia"
sidebar_label: "Estratégias de Engenharia"
sidebar_position: 3
---

# 3. Estratégias de Engenharia

## 3.1 Estratégia Priorizada Abordagem de Desenvolvimento de Software:

**Abordagem:** Ágil

**Ciclo de Vida:** Iterativo e Incremental

**Processo:** Scrum XP

## 3.2 Quadro Comparativo

O quadro, a seguir, apresenta algumas características que podem ser relacionadas ao FDD e ao Scrum/XP, comparando-os em diferentes aspectos:

| Características | FDD | Scrum Xp |
| :--- | :--- | :--- |
| **Abordagem Geral** | Iterativo e incremental, focado no desenvolvimento de funcionalidades e em uma arquitetura robusta. | Iterativo e incremental, focado em ciclos de sprint e nas práticas de engenharia do XP para entregas rápidas e contínuas. |
| **Foco em Arquitetura** | Forte foco em modelagem inicial e arquitetura bem definida. | A arquitetura não é rigidamente definida no início, mas vai evoluindo de forma incremental ao longo do projeto. |
| **Estrutura de Processos** | Processo mais estruturado e formal, com cinco etapas bem definidas (desenvolver modelo, lista de funcionalidades, planejar, projetar, construir) | Estrutura leve e flexível, baseada em sprints, reuniões diárias, planejamento e revisões.As práticas de desenvolvimento do XP são integradas a esses ciclos. |
| **Flexibilidade de Requisitos** | Flexibilidade moderada. A lista inicial de funcionalidades pode ser alterada, mas o foco inicial na arquitetura e no plano geral tende a estabilizar os requisitos. Mudanças significativas podem exigir mais replanejamento | Alta flexibilidade. O modelo é projetado para acomodar mudanças. Novos requisitos e alterações podem ser incluídos no backlog e priorizados para os próximos sprints. |
| **Colaboração com Cliente** | O cliente participa ativamente na definição inicial do modelo de domínio e na priorização das funcionalidades, mas a interação diária pode ser menos intensa do que no Scrum. | Colaboração intensa e contínua, o cliente participa diretamente durante todo o processo. |
| **Complexidade do Processo** | Complexidade moderada. A estrutura mais definida e os papéis claros podem ser mais fáceis de adotar para equipes que precisam de um guia mais formal | Complexidade baixa. Estrutura simplificada,leve e ágil , mas a aplicação das práticas de engenharia do XP (como TDD e programação em pares) exige disciplina e maturidade da equipe |
| **Qualidade Técnica** | O foco no design e na arquitetura desde o início, junto com a construção por funcionalidade, tende a produzir um código robusto e de alta qualidade. | As práticas do XP (como Test-Driven Development - TDD, programação em pares e refatoração contínua) são a base para garantir a qualidade técnica do código |
| **Práticas de Desenvolvimento** | Menor ênfase em práticas específicas de programação, foco no processo e modelagem. | Uso de práticas ágeis de engenharia (TDD, pair programming, integração contínua). |
| **Adaptação ao Projeto da Leoni** | Ideal para projetos que requerem uma arquitetura bem planejada desde o início, combinando a disciplina de design com a agilidade de entregas incrementais | Mais adequado ao Leoni Hub, pois o prazo é curto, os requisitos tendem a evoluir (duas lojas distintas) e há necessidade de entregas rápidas e feedback contínuo. |
| **Documentação** | A documentação é orientada pelo modelo de domínio e pela lista de funcionalidades. A documentação do design é parte do processo de desenvolvimento. | A documentação é geralmente mínima, focada em histórias de usuário e no backlog do produto, favorecendo a comunicação direta. |
| **Escalabilidade** | A abordagem baseada em funcionalidades e a arquitetura inicial facilitam a divisão do trabalho entre grandes equipes, com cada equipe focada em um conjunto específico de funcionalidades. | Funciona de forma mais natural em equipes pequenas ou médias , exige adaptações para grandes escalas. |
| **Suporte a Equipes de Desenvolvimento** | Os papéis são bem definidos (chefe de programador, proprietário de classe) e a estrutura do processo fornece um guia claro para as equipes. | A equipe é auto-organizada e os papéis são claros (Scrum Master, Product Owner). O suporte se concentra em remover impedimentos e em dar autonomia à equipe para tomar decisões. |

## 3.3 Justificativa

1.  **Abordagem Geral Iterativa e Incremental com Entregas Rápidas:**

    O Scrum XP é "iterativo e incremental, focado em ciclos de sprint e nas práticas de engenharia do XP para entregas rápidas e contínuas".

    **Justificativa para o Leoni Hub:** O projeto tem um prazo estimado de "três meses" e será dividido em "sprints quinzenais". Essa abordagem permite que o cliente comece a ver o valor e a testar as funcionalidades mais cedo, o que é crucial para resolver o "gargalo operacional" e as "falhas do sistema" do software atual "Clariai" rapidamente. As entregas contínuas também facilitam a transição do sistema sem prejudicar o funcionamento da loja.

2.  **Alta Flexibilidade para Requisitos em Evolução:**

    O Scrum XP oferece "alta flexibilidade". O modelo é projetado para acomodar mudanças. Novos requisitos e alterações podem ser incluídos no backlog e priorizados para os próximos sprints".

    **Justificativa para o Leoni Hub:** Dado que a equipe "nunca confeccionou um sistema de gerenciamento de estoque", é provável que os requisitos evoluam à medida que a equipe e os stakeholders entendam melhor as necessidades complexas. A flexibilidade do Scrum XP permite incorporar essas mudanças de forma eficiente, garantindo que o sistema se adapte perfeitamente ao crescimento e às particularidades de ambas as marcas.

3.  **Colaboração Intensa e Contínua com o Cliente:**

    O processo enfatiza a "colaboração intensa e contínua"; o cliente participa diretamente durante todo o processo".

    **Justificativa para o Leoni Hub:** O sistema precisa ser "intuitivo e simples" para os "Atendentes" com "pouca familiaridade com tecnologia" e fornecer "relatórios e dashboards claros" para os "Gestores". A participação constante do cliente é essencial para validar se a solução está realmente facilitando o dia a dia das lojas e garantindo a "facilidade de uso", além de garantir que os objetivos de produto, como a "redução do tempo para fechamento das compras em 20%" e a "satisfação ≥ 70% dos gestores com os relatórios gerados", sejam alcançados.