const Joi = require('joi');

// Schema for creating a product
const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().label('Product Name'),
  price: Joi.number().positive().required().label('Price'),
  stock: Joi.number().integer().min(0).required().label('Stock Quantity'),
  description: Joi.string().max(500).optional().label('Description'),
});

// Schema for updating a product
const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().label('Product Name'),
  price: Joi.number().positive().optional().label('Price'),
  stock: Joi.number().integer().min(0).optional().label('Stock Quantity'),
  description: Joi.string().max(500).optional().label('Description'),
}).min(1); // At least one field must be present

// Middleware to validate creation
const validateCreateProduct = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware to validate updates
const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};
