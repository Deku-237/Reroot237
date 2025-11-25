const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';

function generateTokens(userId) {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

function verifyToken(token, type = 'access') {
  try {
    const secret = type === 'refresh' ? JWT_REFRESH_SECRET : JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    
    if (decoded.type !== type) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateTokens,
  verifyToken
};