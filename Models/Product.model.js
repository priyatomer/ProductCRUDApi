const mongoose = require('mongoose');
const mongooseIntl = require('mongoose-intl');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
		intl: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true,
		intl: true
	},
	image: {
		type: String,
		required: true
	},
	userId: {
		type: String
	}
});
ProductSchema.plugin(mongooseIntl, {
	languages: [
		'en',
		'fr'
	],
	defaultLanguage: 'en'
});
const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
