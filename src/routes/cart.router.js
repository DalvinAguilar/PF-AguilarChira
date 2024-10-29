import express from 'express';
import CartManager from '../controllers/cartManager.js';

const router = express.Router();
const cartManager = new CartManager();

// GET /api/carts - Obtener todos los carritos
router.get('/', async (req, res) => {
	try {
		const carts = await cartManager.getCarts();
		res.send(carts);
	} catch (error) {
		res.status(500).send('Error al obtener los carritos');
	}
});

// POST /api/carts - Crear un nuevo carrito
router.post('/', async (req, res) => {
	try {
		const newCart = await cartManager.createCart();
		res.status(201).send(newCart);
	} catch (error) {
		res.status(500).send('Error al crear el carrito');
	}
});

// GET /api/carts/:cid - Obtener los productos de un carrito por ID
router.get('/:cid', async (req, res) => {
	const cartId = req.params.cid;
	try {
		const cart = await cartManager.getCartProducts(cartId);
		cart ? res.send(cart) : res.status(404).send('Carrito no encontrado');
	} catch (error) {
		res.status(500).send('Error al obtener el carrito');
	}
});

// POST /api/carts/:cid/products/:pid - Agregar un producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	const { quantity } = req.body;
	try {
		const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
		res.send(updatedCart);
	} catch (error) {
		res.status(500).send('Error al agregar el producto al carrito');
	}
});

// DELETE /api/carts/:cid/products/:pid - Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	try {
		const updatedCart = await cartManager.removeProductFromCart(cid, pid);
		res.send(updatedCart);
	} catch (error) {
		res.status(500).send('Error al eliminar el producto del carrito');
	}
});

// PUT /api/carts/:cid - Actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
	const cartId = req.params.cid;
	const products = req.body.products;
	try {
		const updatedCart = await cartManager.updateCart(cartId, products);
		res.send(updatedCart);
	} catch (error) {
		res.status(500).send('Error al actualizar el carrito');
	}
});

// PUT /api/carts/:cid/products/:pid - Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;
	const { quantity } = req.body;
	try {
		const updatedCart = await cartManager.updateProductQuantity(
			cid,
			pid,
			quantity
		);
		res.send(updatedCart);
	} catch (error) {
		res.status(500).send(
			'Error al actualizar la cantidad del producto en el carrito'
		);
	}
});

// DELETE /api/carts/:cid - Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
	const cartId = req.params.cid;
	try {
		const updatedCart = await cartManager.clearCart(cartId);
		res.send(updatedCart);
	} catch (error) {
		res.status(500).send('Error al vaciar el carrito');
	}
});

export default router;
