---
sidebar_position: 2
---

# Requisitos Não Funcionais (RNF)

---

## Definição das Escalas de Classificação (1 a 5)

Para classificar os requisitos, as seguintes escalas de 1 a 5 foram utilizadas:

**1. Valor de Negócio (VN)**  
Mede o impacto do requisito para o sucesso do projeto e do negócio.

- **5 (Crítico):** Requisito essencial para o Produto Mínimo Viável (MVP). Sua ausência inviabiliza o projeto ou causa falha crítica no funcionamento básico da solução.

- **4 (Alto):** Resolve um problema primário da solução proposta, é altamente recomendado que não hajam atrasos ou impedimentos, considerado como prioritário para a satisfação do cliente.

- **3 (Médio):** Agrega valor significativo as funcionalidades principais do projeto, atrasos no ciclo de vida desenvolvimento devem ser evitados.

- **2 (Baixo):** Sua entrega é recomendada, mas pode ser postergada para o final do sprint ou para uma iteração futura.

- **1 (Desejável):** Requisito de "Nice to have" (aprimoramento estético, pequeno ajuste). Representa escopo para a próxima versão do produto.

**2. Custo Técnico (CT)**  
Estima o esforço da equipe, a complexidade técnica (envolvendo React, Node.js, PostgreSQL) e o risco inerente, dado o cronograma de 3 meses.

- **5 (Muito Alto):** Exige estudo ou envolve a integração complexa de ferramentas que a equipe possui pouca familiaridade. Alto risco de falha ou atraso do sprint.

- **4 (Alto):** Requer múltiplas camadas de desenvolvimento (Front-End, Back-End e Banco de Dados). Deve ser testado e verificado rigorosamente para a aprovação.

- **3 (Médio):** Trabalho de complexidade moderada que tipicamente consome uma fatia significativa da sprint (≈6 dias).

- **2 (Baixo):** Implementação utilizando componentes e padrões já definidos. Permite uso de programação em pares (XP) para ser concluído rapidamente.

- **1 (Muito Baixo):** Correção de bugs mínimos, ajuste de texto ou pequenas alterações de UI/UX que não afetam a lógica de negócios. Ideal para ser encaixado em um sprint com alto esforço.

---

## RNF1 — Usabilidade (U)

| Requisito                                                                                                                | VN  | CT  |
| :----------------------------------------------------------------------------------------------------------------------- | :-: | :-: |
| **RNF-01.1:** A interface deve ser simples e intuitiva, adequada para atendentes com pouca familiaridade com tecnologia. |  3  |  2  |
| **RNF-01.2:** O tempo necessário para treinamento de novos usuários não deve exceder 1 hora.                             |  2  |  2  |

## RNF2 — Confiabilidade (R)

| Requisito                                                                                                                                              | VN  | CT  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------- | :-: | :-: |
| **RNF-02.1:** As operações críticas, como criação de pedidos e atualização de estoque, devem ser transacionais para garantir a consistência dos dados. |  5  |  4  |
| **RNF-02.2:** Devem ser configurados alertas automáticos em caso de falhas críticas ou indisponibilidade.                                              |  4  |  3  |
| **RNF-02.3:** O sistema deve estar disponível 100% do tempo no horário comercial (8h–18h, de segunda a sexta-feira).                                   |  5  |  4  |

## RNF3 — Desempenho (P)

| Requisito                                                                                                                   | VN  | CT  |
| :-------------------------------------------------------------------------------------------------------------------------- | :-: | :-: |
| **RNF-03.1:** A atualização do status de estoque deve ocorrer em tempo real (atraso máximo de 2 segundos após a alteração). |  3  |  4  |
| **RNF-03.2:** O sistema deve registrar métricas básicas de desempenho (número de requisições, latência, taxa de erros).     |  3  |  2  |

## RNF4 — Suportabilidade (S)

| Requisito                                                                                                                      | VN  | CT  |
| :----------------------------------------------------------------------------------------------------------------------------- | :-: | :-: |
| **RNF-04.1:** O código-fonte deve ser modular e bem documentado para facilitar futuras manutenções.                            |  3  |  2  |
| **RNF-04.2:** O sistema deve contar com testes automatizados para unidades críticas.                                           |  4  |  3  |
| **RNF-04.3:** Deve haver um processo de integração contínua (CI) configurado para garantir qualidade e segurança nas entregas. |  3  |  2  |
| **RNF-04.4:** Devem ser gerados logs estruturados para suporte técnico, depuração de problemas e auditorias de segurança.      |  4  |  3  |

## RNF5 — Implementação (+)

| Requisito                                                                                                          | VN  | CT  |
| :----------------------------------------------------------------------------------------------------------------- | :-: | :-: |
| **RNF-05.1:** O sistema será desenvolvido utilizando tecnologias web padrão (React, Node.js, PostgreSQL).          |  3  |  2  |
| **RNF-05.2:** O processo de deploy deve ser configurado em ambientes separados de homologação (testes) e produção. |  4  |  3  |

## RNF6 — Segurança e LGPD

| Requisito                                                                                                                            | VN  | CT  |
| :----------------------------------------------------------------------------------------------------------------------------------- | :-: | :-: |
| **RNF-06.1:** Todos os acessos a dados devem ser controlados e registrados em logs de auditoria, garantindo conformidade com a LGPD. |  5  |  3  |
| **RNF-06.2:** Garantir que os dados de clientes, produtos e pedidos sejam isolados por loja.                                         |  5  |  3  |
