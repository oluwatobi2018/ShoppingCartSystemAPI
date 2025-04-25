const crypto = require('crypto');

// Use a secure 32-byte encryption key from your .env file
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; // 32 bytes
const IV_LENGTH = 16; // AES block size

/**
 * Encrypts a plaintext string using AES-256-CBC.
 */
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8');

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts a string encrypted with `encrypt()`.
 */
function decrypt(text) {
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString('utf8');
}

/**
 * Middleware to decrypt incoming request body if `req.body.encrypted` is present.
 */
const decryptMiddleware = (req, res, next) => {
  if (req.body?.encrypted) {
    try {
      const decryptedText = decrypt(req.body.encrypted);
      req.body = JSON.parse(decryptedText);
    } catch (err) {
      console.error('Decryption failed:', err.message);
      return res.status(400).json({ message: 'Failed to decrypt request body' });
    }
  }
  next();
};

/**
 * Middleware to encrypt response using `res.encrypt(data)` instead of `res.json(data)`
 */
const encryptResponseMiddleware = (req, res, next) => {
  res.encrypt = (data) => {
    try {
      const encrypted = encrypt(JSON.stringify(data));
      res.json({ encrypted });
    } catch (err) {
      console.error('Encryption failed:', err.message);
      res.status(500).json({ message: 'Encryption error' });
    }
  };
  next();
};

module.exports = {
  encrypt,
  decrypt,
  decryptMiddleware,
  encryptResponseMiddleware,
};
