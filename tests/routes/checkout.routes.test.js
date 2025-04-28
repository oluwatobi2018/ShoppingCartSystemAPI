const request = require('supertest');
const app = require('../../src/app');

describe('Checkout Routes', () => {
  it('should checkout user cart', async () => {
    const res = await request(app).post('/api/checkout/testUserId');
    expect(res.statusCode).toBe(200);
  });
});
