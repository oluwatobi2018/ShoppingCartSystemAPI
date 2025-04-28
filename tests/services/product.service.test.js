const ProductService = require('../../src/services/product.service');

describe('ProductService', () => {
  it('should get product by ID', async () => {
    const result = await ProductService.getProductById('productId');
    expect(result).toBeDefined();
  });
});
