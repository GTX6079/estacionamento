
const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login bem-sucedido!' });
    } else {
      res.json({ success: false, message: 'Usuário ou senha incorretos!' });
    }
  });
});


app.post('/products', (req, res) => {
  const { modelo, placa, andar } = req.body;
  const query = 'INSERT INTO products (modelo, placa, andar) VALUES (?, ?, ?)';
  connection.query(query, [modelo, placa, andar], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao inserir produto.' });
    }
    res.json({ success: true, message: 'Produto inserido com sucesso!', id: result.insertId });
  });
});


app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao buscar produtos.' });
    }
    res.json({ success: true, products: results });
  });
});

app.post('/cadastro-user', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao inserir usuário.' });
    }
    res.json({ success: true, message: 'sucesso ao inserir usuário!', id: result.insertId });
  });
});


app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { modelo, placa, andar } = req.body;
  const query = 'UPDATE products SET modelo = ?, placa = ?, andar = ? WHERE id = ?';
  connection.query(query, [modelo, placa, andar, id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao atualizar carro.' });
    }
    res.json({ success: true, message: 'Carro atualizado com sucesso!' });
  });
});


app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao deletar carro.' });
    }
    res.json({ success: true, message: 'Carro deletado com sucesso!' });
  });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));