const { verifyToken } = require('../services/tokenService');
const { translate } = require('../services/i18nService');

function validateAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: translate(req.language, 'AUTHORIZATION_REQUIRED'),
        code: 'MISSING_TOKEN'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(token, 'access');

    if (!decoded) {
      return res.status(401).json({
        error: translate(req.language, 'INVALID_ACCESS_TOKEN'),
        code: 'INVALID_TOKEN'
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth validation error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
}

module.exports = { validateAuth };