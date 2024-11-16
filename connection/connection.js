const mysql = require('mysql2');

const server = '127.0.0.1';
const username = 'root';
const password = 'carlos04';
const dbname = 'AWS';

const connection = mysql.createConnection({
    host: server,
    user: username,
    password: password,
    database: dbname,
    charset: 'utf8'
});

connection.connect(err => {
    if (err) {
        console.error('Connection failed: ' + err.message);
        return;
    }
    console.log('Connected to the database!');
});
