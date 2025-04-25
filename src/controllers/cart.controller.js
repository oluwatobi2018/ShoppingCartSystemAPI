const CartService = require('../services/cart.service');

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartService.getCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const updatedCart = await CartService.addToCart(userId, productId, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const updatedCart = await CartService.removeFromCart(userId, productId);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
