const { translate } = require('../services/i18nService');

function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Default error response
  let status = 500;
  let message = translate(req.language || 'en', 'INTERNAL_SERVER_ERROR');
  let code = 'INTERNAL_ERROR';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    status = 400;
    message = translate(req.language || 'en', 'VALIDATION_ERROR');
    code = 'VALIDATION_ERROR';
  } else if (err.name === 'UnauthorizedError') {
    status = 401;
    message = translate(req.language || 'en', 'UNAUTHORIZED');
    code = 'UNAUTHORIZED';
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    status = 413;
    message = translate(req.language || 'en', 'FILE_TOO_LARGE');
    code = 'FILE_TOO_LARGE';
  }

  res.status(status).json({
    error: message,
    code,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = { errorHandler };