const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');

// Get a user's cart
const getCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    return cart || { items: [] };
  } catch (error) {
    throw new Error('Error fetching cart: ' + error.message);
  }
};

// Add an item to the cart
const addToCart = async (userId, productId, quantity) => {
  try {
    // Ensure the product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Not enough stock available');
    }

    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if one does not exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If it's a new item, add it to the cart
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    // Update the product stock
    product.stock -= quantity;
    await product.save();

    return cart;
  } catch (error) {
    throw new Error('Error adding item to cart: ' + error.message);
  }
};

// Remove an item from the cart
const removeFromCart = async (userId, productId) => {
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    // Get the product
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);
    await cart.save();

    // Update product stock (if necessary)
    const item = cart.items[itemIndex];
    product.stock += item.quantity;
    await product.save();

    return cart;
  } catch (error) {
    throw new Error('Error removing item from cart: ' + error.message);
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};
