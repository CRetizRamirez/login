import bcrypt from 'bcrypt';
import db from '../database/db.js';

export const registrarUsuario = async (req, res) => {

    const { Usuario, Contrasena, Rol } = req.body;
    const callProcedure = `CALL sp_Login(?)`;
    let user;

    // Verificar existencia del usuario
    try {
        const [rows] = await db.query(callProcedure, [Usuario]);
        user = rows[0][0];
    } catch (error) {
        console.error('Error al verificar usuario: ', error);
        return res.status(500).send('Error al verificar usuario');
    }
    
    if (!user) {
        try {
            // Encriptar la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Contrasena, salt);

            // Guardar en la DB
            await db.query('INSERT INTO Usuarios(Usuario, Contrasena, Rol) VALUES(?, ?, ?)', [
                Usuario,
                hashedPassword,
                Rol,
            ]);
            return res.status(201).send('Usuario registrado con éxito')
        } catch (error) {
            console.error('Error en el registro: ', error);
            return res.status(500).send('Error al registrar Usuario')
        }
    }
    return res.status(401).send('Ya existe este nombre de Usuario')
};
