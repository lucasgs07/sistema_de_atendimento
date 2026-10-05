CREATE TABLE fila (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    atendimento_id INT NOT NULL UNIQUE REFERENCES atendimento (id) ON DELETE CASCADE,
    posicao INT,
    gravidade VARCHAR(20) NOT NULL,
    entrada_em TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'America/Sao_Paulo'),

    CONSTRAINT check_gravidade_fila CHECK (gravidade IN ('verde', 'amarelo', 'vermelho')),
    CONSTRAINT check_posicao_positiva CHECK (posicao IS NULL OR posicao > 0)
);

CREATE INDEX idx_fila_ordem ON fila (gravidade, entrada_em);