const { encrypt, decrypt } = require('../../src/middleware/encryption');

describe('Encryption Utils', () => {
  it('should encrypt and decrypt text', () => {
    const text = 'HelloWorld';
    const encrypted = encrypt(text);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(text);
  });
});
