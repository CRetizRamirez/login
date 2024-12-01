import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database/db.js'  // SE USA PARA PROBAR LA CONEXION A LA DB
import routes from './routes/Routes.js'
import { verifyToken } from "./middlewares/authMiddleware.js";

// Determina qué archivo de configuración cargar
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

// Define __dirname en modo ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const corsOptions = {
//     origin: 'https://login.retizdev.com', // Dominio de tu front-end
//     credentials: true, // Si usas cookies o sesiones
// };


dotenv.config();

const app = express();

//app.use(cors(corsOptions));
app.use(cors());
app.use(express.json())
app.use("/api/protected", verifyToken); // Todas las rutas bajo /api/protected usarán este middleware
app.use('/api', routes); // Todas las rutas que haya en Routes.js

// Middleware para servir los archivos estáticos de React
app.use(express.static(path.join(__dirname, 'dist')));
// Ruta genérica para redirigir a React en caso de rutas no manejadas por el backend
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//   });  

// Probar la conexión a la base de datos, solo en desarrollo
/*db.getConnection((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err.message);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});*/


// Iniciar el servidor
const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.listen(SERVER_PORT, () => {
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});