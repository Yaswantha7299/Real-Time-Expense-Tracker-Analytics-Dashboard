/**
 * Central error-handling middleware.
 * Always returns JSON so the frontend can reliably parse responses.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('Server Error:', err.message);

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error' : err.message,
  });
};

module.exports = errorHandler;
