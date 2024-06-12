exports.successResponse = (message, data) => ({
    status: 'success',
    message,
    data,
  });
  
  exports.errorResponse = (message) => ({
    status: 'error',
    message,
  });
  