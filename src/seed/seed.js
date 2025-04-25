const mongoose = require('mongoose');
const Product = require('./models/product.model');
const Cart = require('./models/cart.model');
const Order = require('./models/order.model');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Seed products
const seedProducts = async () => {
  try {
    await Product.deleteMany({}); // Clear existing products

    const products = [
      { name: 'Product 1', price: 100, stock: 50 },
      { name: 'Product 2', price: 200, stock: 30 },
      { name: 'Product 3', price: 300, stock: 20 },
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Seed carts
const seedCarts = async () => {
  try {
    await Cart.deleteMany({}); // Clear existing carts

    const carts = [
      { userId: 'user1', items: [{ productId: 'productId1', quantity: 2 }] },
      { userId: 'user2', items: [{ productId: 'productId2', quantity: 1 }] },
    ];

    await Cart.insertMany(carts);
    console.log('Carts seeded successfully');
  } catch (error) {
    console.error('Error seeding carts:', error);
  }
};

// Seed orders
const seedOrders = async () => {
  try {
    await Order.deleteMany({}); // Clear existing orders

    const orders = [
      { userId: 'user1', items: [{ productId: 'productId1', quantity: 2, priceAtPurchase: 100 }], totalAmount: 200, status: 'completed' },
      { userId: 'user2', items: [{ productId: 'productId2', quantity: 1, priceAtPurchase: 200 }], totalAmount: 200, status: 'completed' },
    ];

    await Order.insertMany(orders);
    console.log('Orders seeded successfully');
  } catch (error) {
    console.error('Error seeding orders:', error);
  }
};

// Execute all seeding functions
const seedDatabase = async () => {
  await seedProducts();
  await seedCarts();
  await seedOrders();
  mongoose.disconnect();
};

seedDatabase();
