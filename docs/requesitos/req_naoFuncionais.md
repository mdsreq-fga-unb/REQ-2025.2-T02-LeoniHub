---
sidebar_position: 2
---

# Requisitos Não Funcionais (RNF)

## Usabilidade
- RNF01: A interface deve ser simples e intuitiva, adequada para atendentes com pouca familiaridade com tecnologia.
- RNF02: O tempo necessário para treinamento de novos usuários não deve exceder 2 horas.

## Desempenho
- RNF03: A atualização do status de estoque deve ocorrer em tempo quase real.
**Tempo de resposta (percentil 95):**
    - Consultas: ≤ 1 segundo.
    - Criação/cancelamento de pedidos: ≤ 2 segundos.

## Disponibilidade
- RNF04: O sistema deve estar disponível em, no mínimo, 98,5% do tempo durante o horário comercial.

## Segurança e LGPD
- RNF05: Os dados sensíveis dos clientes devem ser protegidos com criptografia, tanto em trânsito (HTTPS) quanto em repouso (no banco de dados).
- RNF06: Todos os acessos a dados devem ser controlados e registrados, garantindo a conformidade com a Lei Geral de Proteção de Dados (LGPD).

## Confiabilidade
- RNF07: As operações críticas, como a criação de pedidos e a atualização de estoque, devem ser transacionais para garantir a consistência dos dados (ou tudo funciona, ou nada é alterado).

## Manutenibilidade
- RNF08: O código-fonte deve ser modular e bem documentado para facilitar futuras manutenções e evoluções.
- RNF09: O sistema deve contar com testes automatizados para unidades críticas e um processo de integração contínua (CI).

## Portabilidade
- RNF10: O sistema será desenvolvido utilizando tecnologias web padrão (React, Node.js, PostgreSQL), permitindo sua execução em diferentes servidores.
- RNF11: O processo de deploy deve ser configurado para ambientes separados de homologação (testes) и produção.

## Observabilidade
- RNF12: A plataforma deve registrar métricas básicas de desempenho, como número de requisições, latência e taxa de erros.
- RNF13: Devem ser gerados logs estruturados para facilitar o suporte técnico, a depuração de problemas e auditorias de segurança.