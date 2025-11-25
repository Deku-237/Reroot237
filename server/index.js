const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { errorHandler } = require('./middleware/errorHandler');
const { initializeI18n } = require('./config/i18n');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize i18n
initializeI18n();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  }
});

app.use(limiter);
app.use('/api/auth', authLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Language detection middleware
app.use((req, res, next) => {
  const lang = req.headers['accept-language'] || req.query.lang || 'en';
  req.language = lang.split(',')[0].split('-')[0]; // Extract primary language
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ReRoot Authentication API server running on port ${PORT}`);
  console.log(`📚 Multi-language support enabled`);
  console.log(`🔒 Security middleware active`);
});

module.exports = app;