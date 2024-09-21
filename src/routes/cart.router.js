import express from 'express';
import CartManager from '../controllers/cartManager.js'; // Corregido el path

const cartManager = new CartManager('./src/data/carts.json');
const router = express.Router();

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
	try {
		const nuevoCarrito = await cartManager.crearCarrito();
		res.json(nuevoCarrito);
	} catch (error) {
		res.status(500).send('Error interno del servidor');
	}
});

// Ruta para obtener los productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
	const carritoId = parseInt(req.params.cid);

	try {
		const carritoBuscado = await cartManager.getCarritoById(carritoId);
		res.json(carritoBuscado.products);
	} catch (error) {
		res.status(500).send('Error interno del servidor');
	}
});

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
	const carritoId = parseInt(req.params.cid);
	const productId = parseInt(req.params.pid);
	const quantity = req.body.quantity || 1;

	try {
		const carritoActualizado = await cartManager.agregarProductoAlCarrito(
			carritoId,
			productId,
			quantity
		);
		res.json(carritoActualizado.products);
	} catch (error) {
		res.status(500).send('Error interno del servidor');
	}
});

export default router;
