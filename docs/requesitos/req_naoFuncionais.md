---
sidebar_position: 2
---

# Requisitos Não Funcionais (RNF)

---

## Definição das Escalas de Classificação (1 a 5)

Para classificar os requisitos, as seguintes escalas de 1 a 5 foram utilizadas:

**1. Valor de Negócio (VN)**  
Mede o impacto do requisito para o sucesso do projeto e do negócio.

- **5 (Crítico):** Requisito essencial para o Valor Mínimo Viável (MVP). Sua ausência inviabiliza o projeto ou causa falha crítica no controle de estoque (OE2) ou viola a LGPD (OE4).

- **4 (Alto):** Resolve um problema primário ou contribui diretamente para a eficiência operacional (OE1) ou para a autonomia das duas marcas. É prioritário para a satisfação do stakeholder.

- **3 (Médio):** Agrega valor significativo à facilidade de uso ou melhora um módulo de relatório (OE3) crucial para a tomada de decisão.

- **2 (Baixo):** Otimiza um fluxo já funcional ou uma característica existente. Sua entrega é recomendada, mas pode ser postergada para o final do sprint ou para uma iteração futura.

- **1 (Desejável):** Requisito de "Nice to have" (aprimoramento estético, pequeno ajuste). Representa escopo para a próxima versão do produto.

**2. Custo Técnico (CT)**  
Estima o esforço da equipe, a complexidade técnica (envolvendo React, Node.js, PostgreSQL) e o risco inerente, dado o cronograma de 3 meses.

- **5 (Muito Alto):** Exige estudo ou envolve a integração complexa de estoque (área de pouca experiência da equipe). Alto risco de falha ou atraso do sprint.

- **4 (Alto):** Requer múltiplas camadas de desenvolvimento (Front-End/React, Back-End/Node.js e Banco de Dados/PostgreSQL). Envolve funcionalidades de segurança (OE4/OE5) ou arquitetura não trivial.

- **3 (Médio):** Trabalho padrão que consome uma fatia significativa do sprint quinzenal. Poderá envolver testes rigorosos (TDD/XP) e lógica de negócios moderada.

- **2 (Baixo):** Implementação direta no Front-End ou Back-End, utilizando componentes e padrões já definidos. Permite uso de programação em pares (XP) para ser concluído rapidamente.

- **1 (Muito Baixo):** Correção de bugs mínimos, ajuste de texto ou pequenas alterações de UI/UX que não afetam a lógica de negócios. Ideal para ser encaixado em um sprint com alto esforço.

---

## RNF1 - Usabilidade (U)

**RNF1.1:** A interface deve ser simples e intuitiva, adequada para atendentes com pouca familiaridade com tecnologia. **(VN: 3 / CT: 2)**

**RNF1.2:** O tempo necessário para treinamento de novos usuários não deve exceder 1 hora. **(VN: 2 / CT: 2)**

## RNF2 - Confiabilidade (R)

**RNF2.1:** As operações críticas, como criação de pedidos e atualização de estoque, devem ser transacionais para garantir a consistência dos dados. **(VN: 5 / CT: 4)**

**RNF2.2:** Devem ser configurados alertas automáticos em caso de falhas críticas ou indisponibilidade. **(VN: 4 / CT: 3)**

**RNF2.3:** O sistema deve estar disponível 100% do tempo no horário comercial (8h–18h, de segunda a sexta-feira). **(VN: 5 / CT: 4)**


## RNF3 - Desempenho (P)

**RNF3.1:** A atualização do status de estoque deve ocorrer em tempo real (atraso máximo de 2 segundos após a alteração). **(VN: 3 / CT: 4)**

**RNF3.2:** O sistema deve registrar métricas básicas de desempenho (número de requisições, latência, taxa de erros). **(VN: 3 / CT: 2)**

## RNF4 - Suportabilidade (S)

**RNF4.1:** O código-fonte deve ser modular e bem documentado para facilitar futuras manutenções. **(VN: 3 / CT: 2)**

**RNF4.2:** O sistema deve contar com testes automatizados para unidades críticas. **(VN: 4 / CT: 3)**

**RNF4.3:** Deve haver um processo de integração contínua (CI) configurado para garantir qualidade e segurança nas entregas. **(VN: 3 / CT: 2)**

**RNF4.4:** Devem ser gerados logs estruturados para suporte técnico, depuração de problemas e auditorias de segurança. **(VN: 4 / CT: 3)**

## RNF5 - Implementação (+)

**RNF5.1:** O sistema será desenvolvido utilizando tecnologias web padrão (React, Node.js, PostgreSQL). **(VN: 3 / CT: 2)**

**RNF5.2:** O processo de deploy deve ser configurado em ambientes separados de homologação (testes) e produção. **(VN: 4 / CT: 3)**


## RNF6 - Segurança e LGPD

**RNF6.1:** Todos os acessos a dados devem ser controlados e registrados em logs de auditoria, garantindo conformidade com a LGPD. **(VN: 5 / CT: 3)**

**RNF6.2:** Garantir que os dados de clientes, produtos e pedidos sejam isolados por loja. **(VN: 5 / CT: 3)**
