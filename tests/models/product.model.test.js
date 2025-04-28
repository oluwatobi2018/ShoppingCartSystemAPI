const Product = require('../../src/models/product.model');

describe('Product Model', () => {
  it('should create a product', async () => {
    const product = new Product({ name: 'Test Product', price: 10, stock: 5 });
    expect(product.name).toBe('Test Product');
  });
});
