import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/Routes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api', routes); 

// ***** Para que pueda trabajar con la carpeta dist de React *****
const __filename = fileURLToPath(import.meta.url);  // mpm i url
const __dirname = path.dirname(__filename);  // npm i path
app.use(express.static(path.join(__dirname, 'dist')));  // Middleware para servir los archivos estáticos de React
app.get('*', (req, res) => {  // Redirigir todas las demás rutas al frontend de React y no se salga al refrescar la pagina
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

// Iniciar el servidor
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const DB_HOST = process.env.DB_HOST;

app.listen(SERVER_PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${SERVER_PORT}`);
    //console.log(`Host de la DB: ${DB_HOST}`);
});