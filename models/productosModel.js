import db from '../database/db.js'

const ProductosModel = {
    listarProductos: async () => {
        const [rows] = await db.promise().query('CALL sp_ListarProductos()'); //Para listar debe llevar promise()
        return rows[0];
    },

    insertarProducto: async (producto, color, stock, precio) => {
        await db.promise().query('CALL sp_InsertarProducto(?, ?, ?, ?)', [producto, color, stock, precio]);
    },

    actualizarProducto: async (idProducto, producto, color, stock, precio) => {
        await db.promise().query('CALL sp_ActualizarProducto(?, ?, ?, ?, ?)', [idProducto, producto, color, stock, precio]);
    },

    eliminarProducto: async (idProducto) => {
        await db.promise().query('CALL sp_EliminarProducto(?)', [idProducto]);
    }
};

export default ProductosModel;