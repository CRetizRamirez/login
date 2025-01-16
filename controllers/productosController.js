import ProductosModel from "../models/productosModel.js";

const ProductosController = {
    obtenerTodos: async (req, res) => {
        try {
            const productos = await ProductosModel.listarProductos();
            res.json(productos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    },

    crear: async (req, res) => {
        const { Producto, Color, Stock, Precio } = req.body;
        try {
            await ProductosModel.insertarProducto(Producto, Color, Stock, Precio);
            res.status(201).json({ message: 'Producto creado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    },

    actualizar: async (req, res) => {
        const { id } = req.params;
        const { Producto, Color, Stock, Precio } = req.body;
        try {
            await ProductosModel.actualizarProducto(id, Producto, Color, Stock, Precio);
            res.json({ message: 'Producto actualizado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },

    eliminar: async (req, res) => {
        const { id } = req.params;
        try {
            await ProductosModel.eliminarProducto(id);
            res.json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
};

export default ProductosController;