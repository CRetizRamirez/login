import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el archivo .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verificar variables de entorno
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);


// Configuración de la conexión a MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// // Código de prueba de conexión
// const testConnection = async () => {
//     try {
//         // Conexión al pool de la base de datos
//         const connection = await db.getConnection();
//         console.log('Conexión exitosa');
//         connection.release(); // Liberamos la conexión después de la prueba
//     } catch (err) {
//         console.error('Error al conectar a la base de datos:', err);
//     }
// };
// // Llamar a la prueba de conexión
// testConnection();


export default db;
