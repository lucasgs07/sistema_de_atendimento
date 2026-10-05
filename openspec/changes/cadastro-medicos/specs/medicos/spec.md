# Capability: Gestão de Médicos

## ADDED Requirements

### Requirement: Cadastrar Médico
O sistema DEVE permitir a criação de registros na tabela `medicos` informando `nome` e `especialidade`[cite: 2].

#### Scenario: Cadastro com sucesso
- **WHEN** um usuário Admin envia `nome` e `especialidade` válidos
- **THEN** o médico é inserido na tabela `medicos` com `status` inicial `'Disponível'` e `rm` gerado automaticamente[cite: 2].

#### Scenario: Impedir RM duplicado
- **WHEN** uma tentativa de inserção for feita com um `rm` que já existe na tabela `medicos`
- **THEN** a base de dados retorna erro de violação do constraint UNIQUE e a API retorna status 400[cite: 2].

### Requirement: Alterar Status do Médico
O sistema DEVE permitir a atualização da coluna `status` da tabela `medicos`[cite: 2].

#### Scenario: Alteração de status válida
- **WHEN** a Recepção altera o status de um médico para `'Disponível'` ou `'Ocupado'`
- **THEN** o registro na tabela `medicos` é atualizado com sucesso[cite: 2].

#### Scenario: Status inválido
- **WHEN** for enviado um valor fora do check constraint (ex: `'Ausente'`)
- **THEN** o banco rejeita a alteração por conta do `check_status` constraint[cite: 2].