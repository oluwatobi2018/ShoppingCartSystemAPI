const rateLimiter = require('../../src/middleware/rateLimiter');

describe('RateLimiter', () => {
  it('should be a function', () => {
    expect(typeof rateLimiter).toBe('function');
  });
});
