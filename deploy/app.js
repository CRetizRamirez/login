import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/Routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://api2.retizdev.com', 'https://api2.retizdev.com', 'http://34.29.48.251:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use('/api', routes); 
//app.use('/',(req, res) => res.send('Bienvenido a la API de la app de tareas!'));

// ***** Para que pueda trabajar con la carpeta dist de React *****
const __filename = fileURLToPath(import.meta.url);  // npm i path
const __dirname = path.dirname(__filename);  // npm i path
app.use(express.static(path.join(__dirname, 'dist')));  // Middleware para servir los archivos estáticos de React
app.get('*', (req, res) => {  // Redirigir todas las demás rutas al frontend de React y no se salga al refrescar la pagina
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

// Iniciar el servidor
const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.listen(SERVER_PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${SERVER_PORT}`);
});