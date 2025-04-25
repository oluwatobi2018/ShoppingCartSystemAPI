module.exports = (schema) => {
    return (req, res, next) => {
      const validationOptions = {
        abortEarly: false, // Include all errors
        allowUnknown: true, // Allow unknown keys
        stripUnknown: true, // Remove unknown keys from the request
      };
  
      const { error, value } = schema.validate(req.body, validationOptions);
  
      if (error) {
        const messages = error.details.map((detail) => detail.message);
        return res.status(400).json({ message: 'Validation Error', errors: messages });
      }
  
      req.body = value; // Replace body with validated & sanitized value
      next();
    };
  };
  