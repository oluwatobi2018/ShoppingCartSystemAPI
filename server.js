const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const redisClient = require('./utils/redisClient'); // Redis client
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const checkoutRoutes = require('./routes/checkout.routes');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse incoming JSON requests

// Set up routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Redis client connection
redisClient.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch(err => {
    console.error('Redis connection error:', err);
  });

// Default route to check if the server is running
app.get('/', (req, res) => {
  res.send('Shopping Cart API is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
