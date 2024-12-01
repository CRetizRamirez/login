import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/Routes.js'
import { verifyToken } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/protected", verifyToken);
app.use('/api', routes); 
 // Define __dirname en modo ES Modules, para leer los archivos estaticos de React
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));  // Middleware para servir los archivos estáticos de React

// Iniciar el servidor
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const DB_HOST = process.env.DB_HOST;

app.listen(SERVER_PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${SERVER_PORT}`);
    console.log(`Host de la DB: ${DB_HOST}`);
});