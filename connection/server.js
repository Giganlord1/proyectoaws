const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());  // Para manejar solicitudes JSON

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'carlos04',
    database: 'AWS',
    charset: 'utf8'
});

connection.connect(err => {
    if (err) {
        console.error('Connection failed: ' + err.message);
        return;
    }
    console.log('Connected to the database!');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    const query = 'SELECT id, username, telefono, puesto, fechadecontratacion FROM aws.users';
    
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Error querying the database');
            return;
        }
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
