const request = require('supertest');
const app = require('../../src/app');

describe('Cart Routes', () => {
  it('should get user cart', async () => {
    const res = await request(app).get('/api/carts/testUserId');
    expect(res.statusCode).toBe(200);
  });
});
