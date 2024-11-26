CREATE TABLE modules (
    module_id SERIAL PRIMARY_KEY,
    folder_id INT REFERENCES folders(folder_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)