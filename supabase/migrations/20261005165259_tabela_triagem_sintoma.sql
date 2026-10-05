CREATE TABLE triagem_sintoma (
    triagem_id INT NOT NULL REFERENCES triagem (id) ON DELETE CASCADE,
    sintoma_id INT NOT NULL REFERENCES sintoma (id) ON DELETE RESTRICT,
    PRIMARY KEY (triagem_id, sintoma_id)
);

CREATE INDEX idx_triagem_sintoma_sintoma ON triagem_sintoma (sintoma_id);