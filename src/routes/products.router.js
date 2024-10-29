import express from 'express';
import Product from '../models/products.model.js';

const router = express.Router();

// GET /api/products - Listar productos con paginación, filtros y ordenamiento
router.get('/', async (req, res) => {
	const { limit = 10, page = 1, sort, category, available } = req.query;

	// Configuración de opciones de paginación y ordenamiento
	const options = {
		limit: parseInt(limit),
		page: parseInt(page),
		sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}, // Ordenar por precio
	};

	// Configuración de filtros dinámicos
	const filters = {};
	if (category) filters.category = category;
	if (available) filters.stock = available === 'true' ? { $gt: 0 } : 0;

	try {
		const result = await Product.paginate(filters, options);

		// Construir los links de paginación
		const buildLink = (pageNum) =>
			`/api/products?limit=${limit}&page=${pageNum}${
				sort ? `&sort=${sort}` : ''
			}${category ? `&category=${category}` : ''}${
				available ? `&available=${available}` : ''
			}`;

		res.send({
			status: 'success',
			payload: result.docs,
			totalPages: result.totalPages,
			prevPage: result.hasPrevPage ? result.prevPage : null,
			nextPage: result.hasNextPage ? result.nextPage : null,
			page: result.page,
			hasPrevPage: result.hasPrevPage,
			hasNextPage: result.hasNextPage,
			prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
			nextLink: result.hasNextPage ? buildLink(result.nextPage) : null,
		});
	} catch (error) {
		console.error('Error al obtener productos:', error);
		res.status(500).send('Error del servidor');
	}
});

// GET /api/products/:pid - Traer producto por ID
router.get('/:pid', async (req, res) => {
	const id = req.params.pid;
	try {
		const productoBuscado = await Product.findById(id);
		productoBuscado
			? res.send(productoBuscado)
			: res.status(404).send('Producto no encontrado');
	} catch (error) {
		res.status(500).send('Error del servidor');
	}
});

// POST /api/products - Agregar un nuevo producto
router.post('/', async (req, res) => {
	const nuevoProducto = req.body;
	try {
		const product = new Product(nuevoProducto);
		await product.save();
		res.status(201).send('Producto agregado exitosamente');
	} catch (error) {
		res.status(400).send('Error al agregar el producto. Verifica los datos.');
	}
});

// PUT /api/products/:pid - Actualizar un producto por ID
router.put('/:pid', async (req, res) => {
	const id = req.params.pid;
	const productoActualizado = req.body;
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			productoActualizado,
			{ new: true }
		);
		updatedProduct
			? res.send('Producto actualizado exitosamente')
			: res.status(404).send('Producto no encontrado');
	} catch (error) {
		res.status(400).send('Error al actualizar el producto. Verifica los datos.');
	}
});

// DELETE /api/products/:pid - Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
	const id = req.params.pid;
	try {
		const deletedProduct = await Product.findByIdAndDelete(id);
		deletedProduct
			? res.send('Producto eliminado exitosamente')
			: res
					.status(404)
					.send('Error al eliminar el producto. Puede que no exista.');
	} catch (error) {
		res.status(500).send('Error del servidor');
	}
});

// Ruta para agregar un producto específico al carrito
router.post('/api/carts/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params;

	try {
		const cart = await cartManager.addProductToCart(cid, pid);

		res.status(200).json({ message: 'Producto agregado al carrito', cart });
	} catch (error) {
		console.error('Error al agregar producto al carrito:', error);
		res.status(500).json({ message: 'Error al agregar producto al carrito' });
	}
});

export default router;
