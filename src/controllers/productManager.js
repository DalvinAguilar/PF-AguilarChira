import Product from '../models/products.model.js';

class ProductManager {
	// Obtener todos los productos
	async getProducts() {
		try {
			const products = await Product.find();
			return products;
		} catch (error) {
			throw new Error('Error al obtener los productos');
		}
	}

	// Agregar un nuevo producto
	async addProduct(newProductData) {
		try {
			const product = new Product(newProductData);
			const savedProduct = await product.save();
			return savedProduct;
		} catch (error) {
			throw new Error('Error al agregar el producto');
		}
	}

	// Actualizar un producto por ID
	async updateProduct(id, updatedProductData) {
		try {
			const updatedProduct = await Product.findByIdAndUpdate(
				id,
				updatedProductData,
				{ new: true }
			);
			if (!updatedProduct) {
				throw new Error('Producto no encontrado');
			}
			return updatedProduct;
		} catch (error) {
			throw new Error('Error al actualizar el producto');
		}
	}

	// Eliminar un producto por ID
	async deleteProduct(id) {
		try {
			const deletedProduct = await Product.findByIdAndDelete(id);
			if (!deletedProduct) {
				throw new Error('Producto no encontrado');
			}
			return deletedProduct;
		} catch (error) {
			throw new Error('Error al eliminar el producto');
		}
	}
}

export default ProductManager;
