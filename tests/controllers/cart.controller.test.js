const CartController = require('../../src/controllers/cart.controller');

describe('CartController', () => {
  it('should get user cart successfully', async () => {
    const req = { params: { userId: 'testUserId' } };
    const res = { json: jest.fn() };

    await CartController.getCart(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
