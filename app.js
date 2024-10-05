// import express from 'express';
// import { engine } from 'express-handlebars';
// import productRouter from './src/routes/products.router.js';
// import cartRouter from './src/routes/cart.router.js';
// import viewsRouter from './src/routes/views.router.js';
// import http from 'http';
// import { Server } from 'socket.io';
// import ProductManager from './src/controllers/productManager.js'; // Asegúrate de importar el ProductManager

// const app = express();
// const PORT = 8080;

// // Middleware para parsear el cuerpo de las solicitudes como JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('./src/public'));

// // Express Handlebars
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './src/views');

// // Crear una instancia de ProductManager
// const productManager = new ProductManager('./src/data/products.json');

// // Rutas
// app.use('/', viewsRouter);
// app.use('/api/products', productRouter);
// app.use('/api/carts', cartRouter);

// // Crear el servidor HTTP y el servidor Socket.IO
// const server = http.createServer(app);
// const io = new Server(server);

// // Manejar la conexión de WebSocket
// io.on('connection', (socket) => {
// 	console.log('Nuevo cliente conectado:', socket.id);

// 	// Emitir la lista de productos al nuevo cliente
// 	const emitProducts = async () => {
// 		const products = await productManager.getProducts();
// 		io.emit('updateProducts', products); // Emitir a todos los clientes conectados
// 	};

// 	// Emitir la lista inicial de productos
// 	emitProducts();

// 	// Escuchar el evento para agregar un producto
// 	socket.on('addProduct', async (product) => {
// 		await productManager.addProduct(product);
// 		emitProducts(); // Emitir la lista actualizada de productos
// 	});

// 	// Escuchar el evento para eliminar un producto
// 	socket.on('deleteProduct', async (id) => {
// 		await productManager.deleteProduct(id);
// 		emitProducts(); // Emitir la lista actualizada de productos
// 	});

// 	// Manejar desconexiones
// 	socket.on('disconnect', () => {
// 		console.log('Cliente desconectado:', socket.id);
// 	});
// });

// // Iniciar el servidor
// server.listen(PORT, () => {
// 	console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

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

// Middleware para parsear el cuerpo de las solicitudes como JSON
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
app.use('/', viewsRouter); // Asegúrate de usar viewsRouter aquí
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Crear el servidor HTTP y el servidor Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Manejar la conexión de WebSocket
io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado:', socket.id);

	const emitProducts = async () => {
		const products = await productManager.getProducts();
		io.emit('updateProducts', products); // Emitir a todos los clientes conectados
	};

	emitProducts(); // Emitir la lista inicial de productos

	socket.on('addProduct', async (product) => {
		await productManager.addProduct(product);
		emitProducts(); // Emitir la lista actualizada de productos
	});

	socket.on('deleteProduct', async (id) => {
		await productManager.deleteProduct(id);
		emitProducts(); // Emitir la lista actualizada de productos
	});

	socket.on('disconnect', () => {
		console.log('Cliente desconectado:', socket.id);
	});
});

// Iniciar el servidor
server.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
