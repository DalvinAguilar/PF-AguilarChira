import Cart from '../models/carts.model.js';

class CartManager {
	// Obtener todos los carritos
	async getCarts() {
		try {
			return await Cart.find();
		} catch (error) {
			throw new Error('Error al obtener los carritos');
		}
	}

	// Crear un nuevo carrito
	async createCart() {
		try {
			const newCart = new Cart({ products: [] });
			return await newCart.save();
		} catch (error) {
			throw new Error('Error al crear el carrito');
		}
	}

	// Obtener productos de un carrito por ID con populate
	async getCartProducts(cartId) {
		try {
			return await Cart.findById(cartId).populate('products.product');
		} catch (error) {
			throw new Error('Error al obtener los productos del carrito');
		}
	}

	// Agregar un producto al carrito
	async addProductToCart(cartId, productId, quantity = 1) {
		try {
			const cart = await Cart.findById(cartId);
			if (!cart) throw new Error('Carrito no encontrado');

			const productInCart = cart.products.find(
				(p) => p.product.toString() === productId
			);
			if (productInCart) {
				productInCart.quantity += quantity;
			} else {
				cart.products.push({ product: productId, quantity });
			}

			return await cart.save();
		} catch (error) {
			throw new Error('Error al agregar el producto al carrito');
		}
	}

	// Eliminar un producto específico del carrito
	async removeProductFromCart(cartId, productId) {
		try {
			const cart = await Cart.findById(cartId);
			if (!cart) throw new Error('Carrito no encontrado');

			cart.products = cart.products.filter(
				(p) => p.product.toString() !== productId
			);
			return await cart.save();
		} catch (error) {
			throw new Error('Error al eliminar el producto del carrito');
		}
	}

	// Actualizar el carrito con un arreglo de productos
	async updateCart(cartId, products) {
		try {
			const cart = await Cart.findByIdAndUpdate(
				cartId,
				{ products },
				{ new: true }
			);
			if (!cart) throw new Error('Carrito no encontrado');
			return cart;
		} catch (error) {
			throw new Error('Error al actualizar el carrito');
		}
	}

	// Actualizar la cantidad de un producto específico en el carrito
	async updateProductQuantity(cartId, productId, quantity) {
		try {
			const cart = await Cart.findById(cartId);
			if (!cart) throw new Error('Carrito no encontrado');

			const productInCart = cart.products.find(
				(p) => p.product.toString() === productId
			);
			if (productInCart) {
				productInCart.quantity = quantity;
			} else {
				throw new Error('Producto no encontrado en el carrito');
			}

			return await cart.save();
		} catch (error) {
			throw new Error('Error al actualizar la cantidad del producto');
		}
	}

	// Eliminar todos los productos del carrito
	async clearCart(cartId) {
		try {
			const cart = await Cart.findByIdAndUpdate(
				cartId,
				{ products: [] },
				{ new: true }
			);
			if (!cart) throw new Error('Carrito no encontrado');
			return cart;
		} catch (error) {
			throw new Error('Error al vaciar el carrito');
		}
	}
}

export default CartManager;
