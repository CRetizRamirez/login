import jwt from 'jsonwebtoken';
import { loginUsuario } from '../models/LoginModel.js';

export const login = async (req, res) => {
    const { Usuario, Contrasena } = req.body;

    if (!Usuario || !Contrasena) {
        return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos, LoginController' });
    }

    try {
        // Llamar al modelo para poder ejecutar el procedimiento almacenado
        const result = await loginUsuario(Usuario, Contrasena);

        // Desestructurar los valores de salida
        const { IsValid, UsuarioId, Rol, UsuarioOutput } = result;

        if (IsValid === 1) {
            // Generar token con JWT
            const token = jwt.sign(
                { UsuarioId, Rol, UsuarioOutput },
                process.env.SECRET_KEY,
                { expiresIn: '1h' } // Duración del token
            );
            res.json({ token, mensaje: 'Autenticación exitosa' });

        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al autenticar:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
