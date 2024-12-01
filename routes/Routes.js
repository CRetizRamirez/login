import express from "express";
import { login } from "../controllers/LoginController.js";
import ProductosController from "../controllers/productosController.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { refreshToken } from "../middlewares/refreshToken.js";

const router = express.Router();

router.post("/login", login);  // Ruta de login
router.post("/refresh-token", refreshToken);  //Refresca el Token
router.get("/protected", verifyToken, (req, res) => {  // Esto proteje todas las rutas
    res.json({
        mensaje: "Ruta protegida accesible",
        usuario: req.user,
    });
});
router.get('/productos/leer', ProductosController.obtenerTodos);  // Listar productos
router.post('/productos/crear', ProductosController.crear);  // Insertar producto
router.post('/productos/actualizar/:id', ProductosController.actualizar);  // Actualizar producto
router.get('/productos/eliminar/:id', ProductosController.eliminar);  // Eliminar producto



// ******************* Ejemplo de rutas protegidas ****************
router.get("/protected/reportes", verifyToken, (req, res) => {
    // Aquí puedes definir la lógica para obtener los reportes
    // Ejemplo de datos simulados
    const reportes = [
        { id: 1, nombre: "Reporte A", fecha: "2024-11-01" },
        { id: 2, nombre: "Reporte B", fecha: "2024-11-02" },
    ];

    res.json({
        mensaje: "Reportes obtenidos exitosamente",
        usuario: req.user, // Información del usuario autenticado
        data: reportes,
    });
});

export default router;

