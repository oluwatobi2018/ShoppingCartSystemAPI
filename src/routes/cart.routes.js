const express = require('express');
const router = express.Router();
const CartController = require('./controllers/cart.controller');

// Route to get the user's cart
router.get('/:userId', CartController.getCart);

// Route to add an item to the user's cart
router.post('/:userId/items', CartController.addToCart);

// Route to remove an item from the user's cart
router.delete('/:userId/items', CartController.removeFromCart);

module.exports = router;
