CREATE TABLE triagem(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    atendimento_id INT NOT NULL UNIQUE REFERENCES atendimento (id),
    enfermeiro_id INT NOT NULL REFERENCES enfermeiros (id) ON DELETE RESTRICT,
    tipo VARCHAR(20) NOT NULL DEFAULT 'Inicial',
    gravidade VARCHAR(20) NOT NULL,
    observacoes TEXT,
    realizada_em TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'America/Sao_Paulo'),

    CONSTRAINT check_tipo_triagem CHECK (tipo IN ('Inicial', 'Reavaliacao')),
    CONSTRAINT check_gravidade_triagem CHECK (gravidade IN ('Verde', 'Amarelo', 'Vermelho'))
);

CREATE UNIQUE INDEX uq_triagem_inicial
ON triagem (atendimento_id) WHERE tipo = 'inicial';

CREATE INDEX idx_triagem_atendimento ON triagem (atendimento_id);
CREATE INDEX idx_triagem_enfermeiro ON triagem (enfermeiro_id);