---
sidebar_position: 2
---

# Requisitos Não Funcionais (RNF)

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

## RNF1 - Usabilidade e Design

**RNF1.1:** A interface deve ser simples e intuitiva, adequada para atendentes com pouca familiaridade com tecnologia. **(VN: 3 / CT: 2)**

**RNF1.2:** O tempo necessário para treinamento de novos usuários não deve exceder 1 hora. **(VN: 2 / CT: 2)**

## RNF2 - Desempenho

**RNF2.1:** A atualização do status de estoque deve ocorrer em tempo real (atraso máximo de 2 segundos após a alteração). **(VN: 3 / CT: 4)**

## RNF3 - Disponibilidade

**RNF3.1:** O sistema deve estar disponível em, no mínimo, 98,5% do tempo durante o horário comercial (8h–18h, de segunda a sexta-feira). **(VN: 5 / CT: 4)**

## RNF4 - Segurança e LGPD

**RNF4.1:** Todos os acessos a dados devem ser controlados e registrados em logs de auditoria, garantindo conformidade com a LGPD. **(VN: 5 / CT: 3)**

**RNF4.2:** Garantir que os dados de clientes, produtos e pedidos sejam isolados por loja. **(VN: 5 / CT: 3)**

## RNF5 - Confiabilidade

**RNF5.1:** As operações críticas, como criação de pedidos e atualização de estoque, devem ser transacionais para garantir a consistência dos dados. **(VN: 5 / CT: 4)**

## RNF6 - Manutenibilidade

**RNF6.1:** O código-fonte deve ser modular e bem documentado para facilitar futuras manutenções. **(VN: 3 / CT: 2)**

**RNF6.2:** O sistema deve contar com testes automatizados para unidades críticas. **(VN: 4 / CT: 3)**

**RNF6.3:** Deve haver um processo de integração contínua (CI) configurado para garantir qualidade e segurança nas entregas. **(VN: 3 / CT: 2)**

## RNF7 - Portabilidade

**RNF7.1:** O sistema será desenvolvido utilizando tecnologias web padrão (React, Node.js, PostgreSQL). **(VN: 3 / CT: 2)**

**RNF7.2:** O processo de deploy deve ser configurado em ambientes separados de homologação (testes) e produção. **(VN: 4 / CT: 3)**

## RNF8 - Observabilidade

**RNF8.1:** O sistema deve registrar métricas básicas de desempenho (número de requisições, latência, taxa de erros). **(VN: 3 / CT: 2)**

**RNF8.2:** Devem ser gerados logs estruturados para suporte técnico, depuração de problemas e auditorias de segurança. **(VN: 4 / CT: 3)**

**RNF8.3:** Devem ser configurados alertas automáticos em caso de falhas críticas ou indisponibilidade. **(VN: 4 / CT: 3)**
