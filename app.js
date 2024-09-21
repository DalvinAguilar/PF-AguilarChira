import express from 'express';
import productRouter from './src/routes/products.router.js'; // Router de productos
import cartRouter from './src/routes/cart.router.js'; // Router de carritos

const app = express();
const PORT = 8080;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Usar los routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Ruta raíz para comprobar que el servidor está funcionando
app.get('/', (req, res) => {
	res.send('Servidor en funcionamiento');
});

// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
