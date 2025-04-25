const CheckoutService = require('../services/checkout.service');

exports.checkout = async (req, res) => {
  const { userId } = req.params;

  try {
    const order = await CheckoutService.processCheckout(userId);
    res.status(200).json({
      message: 'Checkout successful',
      order,
    });
  } catch (error) {
    console.error('Checkout failed:', error);
    res.status(400).json({
      error: error.message || 'Checkout failed',
    });
  }
};
