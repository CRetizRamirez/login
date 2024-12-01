import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;