CREATE TABLE terms (
    term_id SERIAL PRIMARY KEY,
    module_id INT NOT NULL REFERENCES modules(module_id) ON DELETE CASCADE,
    term VARCHAR(500) NOT NULL,
    definition VARCHAR(1000) NOT NULL
)