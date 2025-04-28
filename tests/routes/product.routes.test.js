const request = require('supertest');
const app = require('../../src/app');

describe('Product Routes', () => {
  it('should list products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
  });
});
