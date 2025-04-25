const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

// Route to get all products
router.get('/', ProductController.getAllProducts);

// Route to create a new product
router.post('/', ProductController.createProduct);

// Route to update an existing product
router.patch('/:id', ProductController.updateProduct);

module.exports = router;
