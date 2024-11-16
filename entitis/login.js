const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: "carlos04", 
  database: "AWS" 
});

// Conectar a la base de datos MySQL
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL.");
});

// Función 'entrar' 
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).send("Error interno del servidor.");
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Conexión exitosa" });
    } else {
      res.status(401).json({ message: "Usuario o contraseña incorrectos." });
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
