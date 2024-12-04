import jwt from 'jsonwebtoken';
import { loginUsuario } from '../models/LoginModel.js';

export const login = async (req, res) => {
    const { Usuario, Contrasena } = req.body;

    if (!Usuario || !Contrasena) {
        return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos' });
    }

    try {
        // Llamamos al modelo para verificar las credenciales
        const result = await loginUsuario(Usuario, Contrasena);
        const { IsValid, UsuarioId, Rol, UsuarioOutput } = result;

        if (IsValid === 0) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { UsuarioId, Rol, UsuarioOutput },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        res.json({ token, mensaje: 'Autenticación exitosa' });

    } catch (error) {
        //console.error('Error al autenticar:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};




