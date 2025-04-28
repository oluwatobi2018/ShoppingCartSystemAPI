const Cart = require('../../src/models/cart.model');

describe('Cart Model', () => {
  it('should create a cart', async () => {
    const cart = new Cart({ userId: 'userId', items: [] });
    expect(cart.userId).toBe('userId');
  });
});
