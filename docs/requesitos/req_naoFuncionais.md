---
sidebar_position: 2
---

# Requisitos Não Funcionais (RNF)

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
