const express = require('express');
const router = express.Router();
const CheckoutController = require('../controllers/checkout.controller');

// Route to process checkout for a user
router.post('/:userId', CheckoutController.checkout);

module.exports = router;
