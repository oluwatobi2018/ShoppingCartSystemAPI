const mongoose = require('mongoose');
const logger = require('../utils/logger');  // Assuming you have a logger utility to handle logging

const connectDB = async () => {
  try {
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/shopping_cart'; // Default to local MongoDB URI
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection failed', error);
    process.exit(1);  // Exit the process with an error code if DB connection fails
  }
};

module.exports = connectDB;
