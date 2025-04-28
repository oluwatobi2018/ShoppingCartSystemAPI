const Order = require('../../src/models/order.model');

describe('Order Model', () => {
  it('should create an order', async () => {
    const order = new Order({ userId: 'userId', items: [] });
    expect(order.userId).toBe('userId');
  });
});
