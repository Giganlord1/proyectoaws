const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

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

app.post('/addUser', (req, res) => {
    const { usuario, telefono, posicion, fechaContratacion } = req.body;
    const query = 'INSERT INTO aws.users (username, telefono, puesto, fechadecontratacion) VALUES (?, ?, ?, ?)';

    connection.query(query, [usuario, telefono, posicion, fechaContratacion], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('User added successfully:', result);
        res.redirect('/pantalla.html'); 
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
