const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || 'Error del servidor'
    });
  };
  
  module.exports = errorHandler;