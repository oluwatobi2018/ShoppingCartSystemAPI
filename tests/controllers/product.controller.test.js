const ProductController = require('../../src/controllers/product.controller');

describe('ProductController', () => {
  it('should get all products', async () => {
    const req = {};
    const res = { json: jest.fn() };

    await ProductController.getAllProducts(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
