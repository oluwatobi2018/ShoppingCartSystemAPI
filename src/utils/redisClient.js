const redis = require('redis');
const logger = require('./logger');  // Assuming you have a logger utility to handle logging

// Create a Redis client
let client;

const connectRedis = () => {
  try {
    // Create a Redis client
    client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379', // Default to local Redis server
    });

    // Connect to Redis
    client.connect();

    client.on('connect', () => {
      logger.info('Connected to Redis');
    });

    client.on('error', (err) => {
      logger.error('Redis connection error: ' + err);
      process.exit(1);  // Exit process if Redis connection fails
    });
  } catch (error) {
    logger.error('Error connecting to Redis:', error);
    process.exit(1);  // Exit the process if the Redis connection setup fails
  }
};

// Cache a value in Redis with an expiration time
const cacheSet = async (key, value, expiration = 3600) => { // Default expiration time is 1 hour
  try {
    await client.setEx(key, expiration, JSON.stringify(value)); // Store value as a JSON string
    logger.info(`Cached value for key: ${key}`);
  } catch (error) {
    logger.error(`Error setting cache for key ${key}: `, error);
  }
};

// Retrieve a cached value from Redis
const cacheGet = async (key) => {
  try {
    const cachedValue = await client.get(key);
    if (cachedValue) {
      logger.info(`Cache hit for key: ${key}`);
      return JSON.parse(cachedValue); // Parse the JSON string back to object
    } else {
      logger.info(`Cache miss for key: ${key}`);
      return null;
    }
  } catch (error) {
    logger.error(`Error getting cache for key ${key}: `, error);
    return null;
  }
};

// Delete a key from the cache
const cacheDelete = async (key) => {
  try {
    await client.del(key);
    logger.info(`Deleted cache for key: ${key}`);
  } catch (error) {
    logger.error(`Error deleting cache for key ${key}: `, error);
  }
};

// Disconnect the Redis client when the app shuts down
const disconnectRedis = async () => {
  try {
    await client.quit();
    logger.info('Disconnected from Redis');
  } catch (error) {
    logger.error('Error disconnecting from Redis:', error);
  }
};

module.exports = {
  connectRedis,
  cacheSet,
  cacheGet,
  cacheDelete,
  disconnectRedis,
};
