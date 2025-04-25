const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if you have a User model
    required: true,
    unique: true, // 1 cart per user
  },
  items: [CartItemSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Cart', CartSchema);
