import { promises as fs } from 'fs';

class CartManager {
	constructor(path) {
		this.path = path;
		this.carts = [];
		this.ultId = 0;

		// Cargar los carritos almacenados en el archivo
		this.cargarCarritos();
	}

	async cargarCarritos() {
		try {
			const data = await fs.readFile(this.path, 'utf-8');
			this.carts = JSON.parse(data);
			if (this.carts.length > 0) {
				// Calcular el último ID a partir de los carritos existentes
				this.ultId = Math.max(...this.carts.map((cart) => cart.id));
			}
		} catch (error) {
			console.log('Error al cargar los carritos');
			// Si no existe el archivo, crearlo
			await this.guardarCarritos();
		}
	}

	async guardarCarritos() {
		await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
	}

	// Método para crear un nuevo carrito
	async crearCarrito() {
		const nuevoCarrito = {
			id: ++this.ultId,
			products: [],
		};

		// Agregar el nuevo carrito al array
		this.carts.push(nuevoCarrito);
		// Guardar el array actualizado en el archivo
		await this.guardarCarritos();
		return nuevoCarrito;
	}

	// Método para obtener un carrito por su ID
	async getCarritoById(carritoId) {
		try {
			const carritoBuscado = this.carts.find(
				(carrito) => carrito.id === carritoId
			);

			if (!carritoBuscado) {
				throw new Error('No existe un carrito con ese ID');
			}

			return carritoBuscado;
		} catch (error) {
			throw new Error('Error al obtener el carrito');
		}
	}

	// Método para agregar un producto al carrito
	async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
		const carrito = await this.getCarritoById(carritoId);
		const existeProducto = carrito.products.find(
			(producto) => producto.product === productoId
		);

		// Si el producto ya existe en el carrito, aumentar la cantidad; si no, agregarlo
		if (existeProducto) {
			existeProducto.quantity += quantity;
		} else {
			carrito.products.push({ product: productoId, quantity });
		}

		// Guardar el carrito actualizado en el archivo
		await this.guardarCarritos();
		return carrito;
	}
}

export default CartManager;
