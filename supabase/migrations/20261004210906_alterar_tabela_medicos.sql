ALTER TABLE medicos
ADD COLUMN usuario_id INT UNIQUE REFERENCES usuario (id);