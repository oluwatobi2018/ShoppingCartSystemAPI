const redis = require('redis');
const { promisify } = require('util');

// Create a Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// Promisify Redis commands
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);

// Lock a resource (e.g., a product) with a unique lock key
const lock = async (lockKey, ttl = 300) => {
  const isLocked = await getAsync(lockKey);
  if (isLocked) {
    throw new Error('Resource is already locked');
  }

  // Set a lock with TTL (time-to-live) to automatically release the lock after a certain period
  const result = await setAsync(lockKey, 'locked', 'EX', ttl);
  if (result !== 'OK') {
    throw new Error('Failed to acquire lock');
  }
};

// Release a lock on a resource
const unlock = async (lockKey) => {
  await delAsync(lockKey);
};

// Attempt to acquire a lock before checking out a cart or updating stock
const processCheckoutWithLock = async (productId, userId, action) => {
  const lockKey = `product:${productId}:lock`;
  const lockTTL = 300; // Set lock TTL to 5 minutes

  try {
    // Lock the product before proceeding
    await lock(lockKey, lockTTL);

    // Process the checkout or cart update here (based on the action)
    // Assuming we have checkoutService or cartService that handles the logic
    if (action === 'checkout') {
      // Perform the checkout logic (you can use your checkout service)
      // e.g., await checkoutService.checkout(userId);
    } else {
      // Handle other actions like adding/removing items to/from cart
      // e.g., await cartService.updateCart(userId, productId, action);
    }

  } catch (error) {
    throw new Error(`Error processing action for product ${productId}: ${error.message}`);
  } finally {
    // Always release the lock after the operation is done
    await unlock(lockKey);
  }
};

module.exports = {
  lock,
  unlock,
  processCheckoutWithLock,
};
