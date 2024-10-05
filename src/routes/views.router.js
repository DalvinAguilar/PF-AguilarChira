import { Router } from 'express';
import ProductManager from '../controllers/productManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json'); // Asegúrate de que la ruta sea correcta

// Ruta para la vista principal
router.get('/', async (req, res) => {
	try {
		const products = await productManager.getProducts();
		res.render('home', { products }); // Pasa los productos a la plantilla
	} catch (error) {
		console.log('Error al obtener productos', error);
		res.status(500).send('Error del servidor');
	}
});

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts'); // Renderizar la plantilla realTimeProducts.handlebars
});

export default router;
