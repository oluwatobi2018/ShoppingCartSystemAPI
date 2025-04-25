const Joi = require('joi');

// Schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().label('Full Name'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(6).required().label('Password'),
});

// Schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
});

// Schema for updating user profile
const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().label('Full Name'),
  email: Joi.string().email().optional().label('Email'),
  password: Joi.string().min(6).optional().label('Password'),
}).min(1); // Require at least one field to update

// Middleware functions
const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const validateUpdateUser = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateUser,
};
