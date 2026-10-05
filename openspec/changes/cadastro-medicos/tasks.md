# Implementation Tasks

## 1. Conexão e Serviço Supabase
- [ ] 1.1 Validar inicialização do cliente Supabase usando `SUPABASE_URL` e `SUPABASE_ANON_KEY`
- [ ] 1.2 Criar serviço `medicos.service` com métodos CRUD para a tabela `medicos`[cite: 2]

## 2. Endpoints / Controladores
- [ ] 2.1 Criar endpoint `POST /medicos` (cadastrar médico)[cite: 1]
- [ ] 2.2 Criar endpoint `PATCH /medicos/:id/status` (alterar status)[cite: 1]
- [ ] 2.3 Criar endpoint `GET /medicos` (listar e filtrar)[cite: 1]

## 3. Validação de Autorização
- [ ] 3.1 Garantir que apenas perfis permitidos da tabela `usuario` (`Admin`, `Recepcao`) executem as ações[cite: 1, 3]

## 4. Testes Básicos do Módulo
- [ ] 4.1 Testar criação de médico e geração de RM[cite: 1, 2]
- [ ] 4.2 Testar alteração de status para `'Disponível'` e `'Ocupado'`[cite: 1, 2]
- [ ] 4.3 Testar rejeição de `rm` duplicado ou status inválido[cite: 2]