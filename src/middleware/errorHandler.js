const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err.message);
  
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      // Optionally include stack in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  };
  
  module.exports = errorHandler;
  