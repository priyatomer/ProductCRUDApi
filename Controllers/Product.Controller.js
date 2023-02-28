const createError = require('http-errors');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const Product = require('../Models/Product.model');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

const uploadImg = multer({ storage: storage }).single('image');

module.exports = {
	getAllProducts: async (req, res) => {
		try {
			const results = await Product.find({}, { __v: 0 }); //query projection
			//const results = await Product.find({}, { name: 1, _id: 0, price: 1 });//for including price and name field and excluding id field
			res.send(results);
		} catch (error) {
			console.log(error.message);
		}
	},

	findProductById: async (req, res, next) => {
		try {
			const id = req.params.id;
			const product = await Product.findById(id); //findById Method
			// const product = await Product.findOne({ _id: id });
			if (!product) {
				throw createError(404, 'Product does not exist.');
			}
			res.send(product);
		} catch (error) {
			console.log(error.message, 'error');
			if (error instanceof mongoose.CastError) {
				next(createError(400, 'Invalid product Id'));
				return;
			}
			next(error);
		}
	},

	createAProduct: async (req, res, next) => {
		try {
			const product = new Product({
				name: req.body.name,
				image: req.file.path,
				description: req.body.description,
				price: req.body.price
			});
			const result = await product.save();
			res.send(result);
		} catch (error) {
			console.log(error.message);
			if (error.name == 'ValidationError') {
				next(createError(422, error.message));
				return;
			}
			next(error);
		}
	},

	updateAProduct: async (req, res, next) => {
		try {
			const id = req.params.id;
			const updates = {
				name: req.body.name,
				image: req.file.path,
				description: req.body.description,
				price: req.body.price
			};
			const options = { new: true };
			const updatedProduct = await Product.findByIdAndUpdate(id, updates, options);
			if (!updatedProduct) {
				throw createError(404, 'Product does not exist.');
			}
			res.send(updatedProduct);
		} catch (error) {
			console.log(error);
			if (error instanceof mongoose.CastError) {
				next(createError(400, 'Invalid product Id'));
				return;
			}
			next(error);
		}
	},

	deleteAProduct: async (req, res, next) => {
		try {
			const id = req.params.id;
			const deletedProduct = await Product.findByIdAndDelete(id);
			if (!deletedProduct) {
				throw createError(404, 'Product does not exist.');
			}
			res.send(deletedProduct);
		} catch (error) {
			console.log(error.message);
			if (error instanceof mongoose.CastError) {
				next(createError(400, 'Invalid product Id'));
				return;
			}
			next(error);
		}
	},
	uploadImg
};
