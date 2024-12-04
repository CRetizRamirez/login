import bcrypt from 'bcrypt';
import db from '../database/db.js';

export const registrarUsuario = async (req, res) => {
    const { Usuario, Contrasena, Rol } = req.body;

    try {
        // Generar un salt
        const salt = await bcrypt.genSalt(10);
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(Contrasena, salt);

        // Guardar en la base de datos
        await db.query('INSERT INTO Usuarios (Usuario, Contrasena, Rol) VALUES (?, ?, ?)', [
            Usuario,
            hashedPassword,
            Rol,
        ]);

        res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
        console.error('Error en el registro:', error); // Agrega esta línea
        res.status(500).send('Error al registrar el usuario');
    }
};
