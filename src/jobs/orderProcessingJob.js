const Queue = require('bull');
const { sendEmail } = require('./emailJob');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const logger = require('../utils/logger');

// Create a new Bull queue for order processing
const orderProcessingQueue = new Queue('orderProcessingQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Function to process the order
const processOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate('items.productId');
    if (!order) throw new Error('Order not found');

    // Check if the stock is sufficient for all items in the order
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }
    }

    // Update inventory: reduce stock for each ordered item
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      product.stock -= item.quantity;
      await product.save();
    }

    // Update order status to 'processed'
    order.status = 'processed';
    await order.save();

    // Send confirmation email to the customer
    const emailData = {
      to: order.userId.email,
      subject: 'Order Confirmation',
      text: `Your order ${order._id} has been processed successfully!`,
      html: `<p>Your order <strong>${order._id}</strong> has been processed successfully!</p>`,
    };

    // Send email asynchronously
    await sendEmail(emailData);

    logger.info(`Order ${order._id} processed successfully.`);
  } catch (error) {
    logger.error(`Error processing order: ${error.message}`);
    throw error;
  }
};

// Define the order processing job handler
orderProcessingQueue.process(async (job) => {
  const { orderId } = job.data;
  await processOrder(orderId);
});

// Function to add an order processing job to the queue
const addOrderProcessingJob = (orderId) => {
  orderProcessingQueue.add({ orderId });
};

module.exports = {
  addOrderProcessingJob,
};
