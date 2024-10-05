import express from 'express';
import { engine } from 'express-handlebars';
import productRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/cart.router.js';
import viewsRouter from './src/routes/views.router.js'; // Importar viewsRouter
import http from 'http';
import { Server } from 'socket.io';
import ProductManager from './src/controllers/productManager.js';

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Express Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Crear una instancia de ProductManager
const productManager = new ProductManager('./src/data/products.json');

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

//Servidor HTTP y el servidor Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Conexión de WebSocket
io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado:', socket.id);

	// Actualizar lista de  producto en tiempo real
	const emitProducts = async () => {
		const products = await productManager.getProducts();
		io.emit('updateProducts', products);
	};

	emitProducts(); //

	// Agregar producto
	socket.on('addProduct', async (product) => {
		await productManager.addProduct(product);
		emitProducts();
	});

	// Eliminar producto
	socket.on('deleteProduct', async (id) => {
		await productManager.deleteProduct(id);
		emitProducts();
	});

	socket.on('disconnect', () => {
		console.log('Cliente desconectado:', socket.id);
	});
});

// Iniciar el servidor
server.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
