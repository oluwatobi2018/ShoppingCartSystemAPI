const CartService = require('../../src/services/cart.service');

describe('CartService', () => {
  it('should add item to cart', async () => {
    const result = await CartService.addToCart('userId', 'productId', 1);
    expect(result).toBeDefined();
  });
});
