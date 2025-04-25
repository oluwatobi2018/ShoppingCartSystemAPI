// src/config/rateLimitConfig.js

const rateLimit = require('express-rate-limit');

// Create a rate limiter for the application
const createRateLimiter = (windowMs, maxRequests, message) => {
  return rateLimit({
    windowMs,  // Time window for which to count requests (in milliseconds)
    max: maxRequests,  // Maximum number of requests in the time window
    message,  // Message to show when rate limit is exceeded
    standardHeaders: true,  // Include rate limit info in response headers
    legacyHeaders: false,  // Disable the X-RateLimit-* headers
  });
};

// Configuration for rate limiting
const rateLimitConfig = {
  // Global rate limiter for all routes (example: 100 requests per 15 minutes)
  globalRateLimiter: createRateLimiter(15 * 60 * 1000, 100, 'Too many requests, please try again later.'),
  
  // Specific rate limiter for login or sensitive routes (example: 5 requests per 5 minutes)
  loginRateLimiter: createRateLimiter(5 * 60 * 1000, 5, 'Too many login attempts, please try again later.'),
};

module.exports = rateLimitConfig;
