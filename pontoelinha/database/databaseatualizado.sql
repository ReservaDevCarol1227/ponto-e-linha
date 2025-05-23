CREATE DATABASE IF NOT EXISTS pontoelinha;
USE pontoelinha;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  agulha VARCHAR(50),
  gramas VARCHAR(50),
  tempo_estimado VARCHAR(50),
  uso_estimado VARCHAR(50),
  metros DECIMAL(10,2),
  imagem VARCHAR(255),
  usuario_id INT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
