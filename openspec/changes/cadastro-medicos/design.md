# Design: Módulo de Cadastro de Médicos

## Arquitetura
Integração direta com o Supabase Client utilizando a estrutura de tabelas PostgreSQL pré-existente.

## Esquema das Tabelas Utilizadas

### `medicos`
- `id` (INT, Primary Key, Identity)[cite: 2]
- `nome` (VARCHAR(50), NOT NULL)[cite: 2]
- `rm` (VARCHAR(10), UNIQUE, DEFAULT LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0'))[cite: 2]
- `especialidade` (VARCHAR(50), NOT NULL)[cite: 2]
- `status` (VARCHAR(20), CHECK IN ('Disponível', 'Ocupado'))[cite: 2]
- `data_cadastro` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)[cite: 2]

### `usuario`
- `id` (INT, Primary Key, Identity)[cite: 3]
- `nome` (VARCHAR(50), NOT NULL)[cite: 3]
- `perfil` (VARCHAR(50), NOT NULL)[cite: 3]

## Estrutura de Métodos
- `createMedico(nome, especialidade, rm?)`: chama `supabase.from('medicos').insert(...)`
- `updateStatus(id, status)`: chama `supabase.from('medicos').update({ status }).eq('id', id)`
- `listMedicos(filters)`: chama `supabase.from('medicos').select('*')`