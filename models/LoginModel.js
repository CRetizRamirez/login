import db from '../database/db.js';

export const loginUsuario = async (usuario, contrasena) => {
    return new Promise((resolve, reject) => {
        const callProcedure = `CALL sp_Login(?, ?, @IsValid, @UsuarioId, @Rol, @UsuarioOutput)`;
        const getOutput = `SELECT @IsValid AS IsValid, @UsuarioId AS UsuarioId, @Rol AS Rol, @UsuarioOutput AS UsuarioOutput`;

        // Ejecutar el procedimiento almacenado
        db.query(callProcedure, [usuario, contrasena], (err) => {
            if (err) {
                return reject(err);
            }

            // Obtener los valores de salida
            db.query(getOutput, (err, results) => {
                if (err) {
                    return reject(err);
                }
                const output = results[0]; // El resultado será un array, tomamos el primer elemento
                resolve(output); // Devolvemos los valores al controlador 
                //console.log(output) // { IsValid: 1, UsuarioId: 1, Rol: 'admin', UsuarioOutput: 'cesar' }
            });
        });
    });
};


