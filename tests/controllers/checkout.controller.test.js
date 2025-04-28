const CheckoutController = require('../../src/controllers/checkout.controller');

describe('CheckoutController', () => {
  it('should process checkout', async () => {
    const req = { params: { userId: 'testUserId' } };
    const res = { json: jest.fn() };

    await CheckoutController.checkout(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
