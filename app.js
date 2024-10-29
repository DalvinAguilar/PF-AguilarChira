import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/cart.router.js';
import viewsRouter from './src/routes/views.router.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = 8080;
const MONGO_URI =
	'mongodb+srv://torodev:toro1991@cluster0.mdl8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; //

// Configuración de Mongoose
mongoose
	.connect(MONGO_URI)
	.then(() => console.log('Conectado a MongoDB'))
	.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Express Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Servidor HTTP y el servidor Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Conexión de WebSocket
io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado:', socket.id);

	socket.on('disconnect', () => {
		console.log('Cliente desconectado:', socket.id);
	});
});

// Iniciar el servidor
server.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
