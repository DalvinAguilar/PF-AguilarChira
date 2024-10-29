import express from 'express';
import Product from '../models/products.model.js';
import Cart from '../models/carts.model.js';

const router = express.Router();

// Ruta para visualizar todos los productos con paginación
router.get('/products', async (req, res) => {
	const { limit = 10, page = 1, sort, category, available } = req.query;

	const options = {
		limit: parseInt(limit),
		page: parseInt(page),
		sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
		lean: true, // Usamos lean para evitar errores de acceso en Handlebars
	};

	const filters = {};
	if (category) filters.category = category;
	if (available) filters.stock = available === 'true' ? { $gt: 0 } : 0;

	try {
		const result = await Product.paginate(filters, options);

		// Construir los links de paginación
		const buildLink = (pageNum) =>
			`/products?limit=${limit}&page=${pageNum}${sort ? `&sort=${sort}` : ''}${
				category ? `&category=${category}` : ''
			}${available ? `&available=${available}` : ''}`;

		res.render('index', {
			products: result.docs,
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

router.get('/products/:pid', async (req, res) => {
	const { pid } = req.params;

	try {
		// Busca el producto por su ID
		const product = await Product.findById(pid).lean();

		if (!product) {
			return res.status(404).send('Producto no encontrado');
		}

		// Renderiza la vista de detalles del producto
		res.render('productDetail', { product });
	} catch (error) {
		console.error('Error al obtener el detalle del producto:', error);
		res.status(500).send('Error del servidor');
	}
});

// Ruta para visualizar un carrito específico
router.get('/carts/:cid', async (req, res) => {
	const { cid } = req.params;

	try {
		// Busca el carrito por su id
		const cart = await Cart.findById(cid).populate('products.product').lean();
		if (!cart) {
			console.log('Producto no encontrado');
		}
		res.render('cartDetail', { cart });
	} catch (error) {
		console.error('Error al obtener el carrito', error);
		res.status(500).send('Error del servidor');
	}
});

// Exportar el router
export default router;
