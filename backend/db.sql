CREATE DATABASE estacionamento_carros;

USE estacionamento_carros;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Modelo VARCHAR(255) NOT NULL,
    Placa INT NOT NULL,
    Andar DECIMAL(10, 2) NOT NULL
);