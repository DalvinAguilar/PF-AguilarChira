import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	stock: {
		type: Number,
		required: true,
	},
});

// Agregar el plugin de paginación al esquema
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;
