const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model('Product', ProductSchema);
