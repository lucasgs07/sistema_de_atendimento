# Change: Cadastro e Gestão de Médicos (Admin & Recepção)

## Why
Permitir que o perfil Admin cadastre médicos no sistema de atendimento e que a Recepção consulte e altere o status de disponibilidade do médico em tempo real.

## What Changes
- Implementar o cadastro de médicos vinculados à tabela existente `medicos` (Campos: `nome`, `especialidade`, com `rm` autogerado via Postgres)[cite: 2].
- Implementar a alteração do status do médico (`'Disponível'` / `'Ocupado'`)[cite: 2].
- Adicionar validação de perfil de usuário utilizando a tabela `usuario` (`perfil = 'Admin'` ou `'Recepcao'`)[cite: 3].
- Adicionar cobertura de testes unitários e de integração para o módulo.

## Impact
- **Tabelas afetadas:** `medicos`, `usuario`[cite: 2, 3]
- **Serviços/Módulos:** `medicos.service`, `medicos.controller`, rotas de API e suíte de testes.