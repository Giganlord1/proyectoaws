const mysql = require('mysql');

class User {
    constructor(id, username, password, telefono, puesto, fechadecontratacion) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.telefono = telefono;
        this.puesto = puesto;
        this.fechadecontratacion = fechadecontratacion;
    }
}

function getAll() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'carlos04',
            database: 'AWS'
        });

        connection.connect(err => {
            if (err) {
                reject(err);
            } else {
                console.log('MySQL Connected...');
            }
        });

        const query = "SELECT id, username, password, telefono, puesto, fechadecontratacion FROM aws.users";
        
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const listaUser = result.map(row => new User(
                    row.id,
                    row.username,
                    row.password,
                    row.telefono,
                    row.puesto,
                    row.fechadecontratacion
                ));
                resolve(listaUser);
            }
            connection.end();
        });
    });
}

// Ejemplo de uso:
getAll().then(users => {
    console.log(users);
}).catch(err => {
    console.error(err);
});
