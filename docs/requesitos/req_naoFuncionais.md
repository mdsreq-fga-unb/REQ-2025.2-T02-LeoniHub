---
sidebar_position: 2
---

# Requisitos Não Funcionais (RNF)

## RNF01 – Usabilidade
- A interface deve ser simples e intuitiva, adequada para atendentes com pouca familiaridade com tecnologia.
- O tempo necessário para treinamento de novos usuários não deve exceder 2 horas.

## RNF02 – Desempenho
- A atualização do status de estoque deve ocorrer em tempo quase real.
- **Tempo de resposta (percentil 95):**
    - Consultas: ≤ 1 segundo.
    - Criação/cancelamento de pedidos: ≤ 2 segundos.

## RNF03 – Disponibilidade
- O sistema deve estar disponível em, no mínimo, 98,5% do tempo durante o horário comercial.

## RNF04 – Segurança e LGPD
- Os dados sensíveis dos clientes devem ser protegidos com criptografia, tanto em trânsito (HTTPS) quanto em repouso (no banco de dados).
- Todos os acessos a dados devem ser controlados e registrados, garantindo a conformidade com a Lei Geral de Proteção de Dados (LGPD).

## RNF05 – Confiabilidade
- As operações críticas, como a criação de pedidos e a atualização de estoque, devem ser transacionais para garantir a consistência dos dados (ou tudo funciona, ou nada é alterado).

## RNF06 – Manutenibilidade
- O código-fonte deve ser modular e bem documentado para facilitar futuras manutenções e evoluções.
- O sistema deve contar com testes automatizados para unidades críticas e um processo de integração contínua (CI).

## RNF07 – Portabilidade
- O sistema será desenvolvido utilizando tecnologias web padrão (React, Node.js, PostgreSQL), permitindo sua execução em diferentes servidores.
- O processo de deploy deve ser configurado para ambientes separados de homologação (testes) и produção.

## RNF08 – Observabilidade
- A plataforma deve registrar métricas básicas de desempenho, como número de requisições, latência e taxa de erros.
- Devem ser gerados logs estruturados para facilitar o suporte técnico, a depuração de problemas e auditorias de segurança.