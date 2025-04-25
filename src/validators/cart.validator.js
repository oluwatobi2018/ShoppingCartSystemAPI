const Joi = require('joi');

// Schema for adding an item to cart
const addToCartSchema = Joi.object({
  productId: Joi.string().length(24).required().label('Product ID'),
  quantity: Joi.number().min(1).required().label('Quantity'),
});

// Schema for removing an item from cart
const removeFromCartSchema = Joi.object({
  productId: Joi.string().length(24).required().label('Product ID'),
});

// Middleware to validate request body
const validateAddToCart = (req, res, next) => {
  const { error } = addToCartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateRemoveFromCart = (req, res, next) => {
  const { error } = removeFromCartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateAddToCart,
  validateRemoveFromCart,
};
