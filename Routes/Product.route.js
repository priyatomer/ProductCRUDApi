const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.Controller');

//Creating A new Product
//promises
// router.post('/', (req, res) => {
// 	console.log(req.body);

// 	const product = new Product({
// 		name: req.body.name,
// 		price: req.body.price
// 	});
// 	product
// 		.save()
// 		.then((result) => {
// 			console.log(result);
// 			res.send(result);
// 		})
// 		.catch((err) => {
// 			console.log(err.message);
// 		});
// });

//Getting All Products
router.get('/', ProductController.getAllProducts);

//Creating a new Product
router.post('/', ProductController.uploadImg, ProductController.createAProduct);

//Getting a single product by Id
router.get('/:id', ProductController.findProductById);

//Updating a single Product by Id
router.patch('/:id', ProductController.uploadImg, ProductController.updateAProduct);

//Deleting a single product by Id
router.delete('/:id', ProductController.deleteAProduct);

module.exports = router;
