import express from 'express';
import ProductManager from '../controllers/productManager.js';

const router = express.Router();
const manager = new ProductManager('./src/data/products.json');

// GET / - Listar todos los productos (opcionalmente con limit)
router.get('/', async (req, res) => {
	const limit = parseInt(req.query.limit) || 0;
	try {
		const arrayProductos = await manager.getProducts();
		res.send(limit > 0 ? arrayProductos.slice(0, limit) : arrayProductos);
	} catch (error) {
		res.status(500).send('Error del servidor');
	}
});

// GET /:pid - Traer producto por ID
router.get('/:pid', async (req, res) => {
	const id = parseInt(req.params.pid);
	try {
		const productoBuscado = await manager.getProductById(id);
		productoBuscado
			? res.send(productoBuscado)
			: res.status(404).send('Producto no encontrado');
	} catch (error) {
		res.status(500).send('Error del servidor');
	}
});

// POST / - Agregar un nuevo producto
router.post('/', async (req, res) => {
	const nuevoProducto = req.body;
	try {
		await manager.addProduct(nuevoProducto);
		res.status(201).send('Producto agregado exitosamente');
	} catch (error) {
		res.status(400).send('Error al agregar el producto. Verifica los datos.');
	}
});

// PUT /:pid - Actualizar un producto por ID
router.put('/:pid', async (req, res) => {
	const id = parseInt(req.params.pid);
	const productoActualizado = req.body;
	try {
		await manager.updateProduct(id, productoActualizado);
		res.send('Producto actualizado exitosamente');
	} catch (error) {
		res.status(400).send('Error al actualizar el producto. Verifica los datos.');
	}
});

// DELETE /:pid - Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
	const id = parseInt(req.params.pid);
	try {
		await manager.deleteProduct(id);
		res.send('Producto eliminado exitosamente');
	} catch (error) {
		res.status(404).send('Error al eliminar el producto. Puede que no exista.');
	}
});

export default router;
