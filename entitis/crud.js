const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); 

app.get('/getUsers', (req, res) => {
  const query = 'SELECT id, nombre, telefono, puesto, fechadecontratacion FROM usuarios';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/addUser', (req, res) => {
  const { nombre, telefono, puesto, fechadecontratacion } = req.body;
  const query = 'INSERT INTO usuarios (nombre, telefono, puesto, fechadecontratacion) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, telefono, puesto, fechadecontratacion], (err, results) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(201);
  });
});

// Ruta para eliminar usuario
app.post('/deleteUser', (req, res) => {
  const { id } = req.body;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM data';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/data', (req, res) => {
  const { value } = req.body;
  const sql = 'INSERT INTO data (value) VALUES (?)';
  db.query(sql, [value], (err, result) => {
    if (err) throw err;
    res.send('Data added');
  });
});

app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM data WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Data deleted');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
