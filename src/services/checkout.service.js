const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const mongoose = require('mongoose');

// Perform the checkout process
const checkout = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get the user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId').session(session);
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Initialize total amount for the order
    let totalAmount = 0;

    // Loop through each item in the cart to process the checkout
    for (const item of cart.items) {
      const product = item.productId;
      
      // Ensure product exists and has enough stock
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      // Update product stock
      product.stock -= item.quantity;
      totalAmount += product.price * item.quantity;

      // Save the updated product stock
      await product.save({ session });
    }

    // Create the order
    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        priceAtPurchase: item.productId.price,
      })),
      totalAmount,
      status: 'completed',
    });

    // Save the order
    await order.save({ session });

    // Clear the user's cart
    cart.items = [];
    await cart.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    // Rollback the transaction if something goes wrong
    await session.abortTransaction();
    session.endSession();
    throw new Error('Checkout failed: ' + error.message);
  }
};

module.exports = {
  checkout,
};
