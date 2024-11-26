CREATE TABLE folders (
    folder_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    parent_folder_id INT REFERENCES folders(folder_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)