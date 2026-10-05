CREATE TABLE atendimento(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    paciente_id INT REFERENCES paciente (id),
    medico_id INT REFERENCES medicos (id),
    senha VARCHAR(20) NOT NULL UNIQUE DEFAULT LPAD(FLOOR(RANDOM() * 100000)::TEXT, 3, '0'),
    status VARCHAR(50) NOT NULL DEFAULT 'Aguardando triagem',
    chegada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    inicio_em TIMESTAMP,
    fim_em TIMESTAMP,
     CONSTRAINT check_status_atendimento CHECK (
        status IN ('Aguardando triagem', 'Aguardando atendimento', 'Em atendimento', 'Finalizado')
    ),
    CONSTRAINT check_ordem_datas CHECK (
        (inicio_em IS NULL OR inicio_em >= chegada_em)
        AND (fim_em IS NULL OR (inicio_em IS NOT NULL AND fim_em >= inicio_em))
    )
);