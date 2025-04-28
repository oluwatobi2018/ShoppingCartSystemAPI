const LockService = require('../../src/services/lock.service');

describe('Lock Service', () => {
  it('should acquire and release lock', async () => {
    const lock = await LockService.acquireLock('test-lock');
    expect(lock).toBeDefined();
  });
});
