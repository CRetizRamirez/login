import bcrypt from 'bcrypt';
import db from '../database/db.js';

export const loginUsuario = async (usuario, contrasena) => {

    const callProcedure = `CALL sp_Login(?)`;

    const [results] = await db.query(callProcedure, [usuario]);

    // Verificar si se encontraron resultados
    const output = results[0][0]; // Acceder a la primera fila del primer conjunto de resultados
    if (!output) {
        console.log('Usuario no encontrado en la base de datos.');
        return { IsValid: 0, message: 'Usuario no encontrado' };
    }

    //console.log('Resultados del procedimiento almacenado:', output);

    // Validar la contraseña usando bcrypt
    const isPasswordValid = await bcrypt.compare(contrasena, output.Contrasena);
    if (!isPasswordValid) {
        console.log('Contraseña incorrecta.');
        return { IsValid: 0, message: 'Contraseña incorrecta' };
    }

    // Si la contraseña es válida, devolvemos los datos
    return {
        IsValid: 1,
        UsuarioId: output.UsuarioId,
        Rol: output.Rol,
        UsuarioOutput: output.Usuario,
    };
};




