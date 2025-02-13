require('dotenv').config();
const mysql = require('mysql2');

// Configuración de la base de datos
const db = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER, // Cambiar según usuario de MySQL
    password: process.env.MYSQL_ADDON_PASSWORD, // Cambiar si hay contraseña
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;


