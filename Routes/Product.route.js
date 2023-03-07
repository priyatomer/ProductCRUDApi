const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.Controller');
const UserController = require('../Controllers/User.Controller');
const authenticate = require('../middleware/authenticate');

const User = require('../Models/User.model');

//for registering a user
router.post('/register', UserController.registerUser);

//for login
router.post('/signin', UserController.loginUser);

//Getting All Products
router.get('/', authenticate, ProductController.getAllProducts);

//Creating a new Product
router.post('/', authenticate, ProductController.uploadImg, ProductController.createAProduct);

//Getting a single product by Id
router.get('/:id', authenticate, ProductController.findProductById);

//Updating a single Product by Id
router.put('/:id', authenticate, ProductController.uploadImg, ProductController.updateAProduct);

//Deleting a single product by Id
router.delete('/:id', authenticate, ProductController.deleteAProduct);

module.exports = router;
