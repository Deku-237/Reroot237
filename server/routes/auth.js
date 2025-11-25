const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const { supabase } = require('../config/supabase');
const { sendEmail } = require('../services/emailService');
const { generateTokens, verifyToken } = require('../services/tokenService');
const { validateAuth } = require('../middleware/auth');
const { translate } = require('../services/i18nService');
const { logActivity } = require('../services/logService');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('INVALID_EMAIL'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('WEAK_PASSWORD'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('INVALID_NAME'),
  body('language')
    .optional()
    .isIn(['en', 'es', 'fr', 'de'])
    .withMessage('UNSUPPORTED_LANGUAGE')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('INVALID_EMAIL'),
  body('password')
    .notEmpty()
    .withMessage('PASSWORD_REQUIRED')
];

// Register endpoint
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: translate(req.language, 'VALIDATION_ERROR'),
        details: errors.array().map(err => ({
          field: err.path,
          message: translate(req.language, err.msg)
        }))
      });
    }

    const { email, password, name, language = 'en' } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      await logActivity('REGISTER_ATTEMPT', { email, status: 'failed', reason: 'email_exists' });
      return res.status(409).json({
        error: translate(req.language, 'EMAIL_ALREADY_EXISTS'),
        code: 'EMAIL_EXISTS'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Generate verification token
    const verificationToken = uuidv4();

    // Create user
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{
        email,
        password_hash: passwordHash,
        name,
        preferred_language: language,
        email_verification_token: verificationToken,
        email_verified: false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (createError) {
      await logActivity('REGISTER_ATTEMPT', { email, status: 'failed', reason: 'database_error' });
      return res.status(500).json({
        error: translate(req.language, 'REGISTRATION_FAILED'),
        code: 'DATABASE_ERROR'
      });
    }

    // Send verification email
    try {
      await sendEmail({
        to: email,
        subject: translate(language, 'EMAIL_VERIFICATION_SUBJECT'),
        template: 'verification',
        data: {
          name,
          verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
          language
        }
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail registration if email fails
    }

    await logActivity('USER_REGISTERED', { userId: newUser.id, email });

    res.status(201).json({
      message: translate(req.language, 'REGISTRATION_SUCCESS'),
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        emailVerified: newUser.email_verified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    await logActivity('REGISTER_ERROR', { email: req.body.email, error: error.message });
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Login endpoint
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: translate(req.language, 'VALIDATION_ERROR'),
        details: errors.array().map(err => ({
          field: err.path,
          message: translate(req.language, err.msg)
        }))
      });
    }

    const { email, password } = req.body;

    // Find user
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (findError || !user) {
      await logActivity('LOGIN_ATTEMPT', { email, status: 'failed', reason: 'user_not_found' });
      return res.status(401).json({
        error: translate(req.language, 'INVALID_CREDENTIALS'),
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      await logActivity('LOGIN_ATTEMPT', { email, status: 'failed', reason: 'invalid_password' });
      return res.status(401).json({
        error: translate(req.language, 'INVALID_CREDENTIALS'),
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // Update last login
    await supabase
      .from('users')
      .update({ 
        last_login: new Date().toISOString(),
        refresh_token: refreshToken
      })
      .eq('id', user.id);

    await logActivity('USER_LOGIN', { userId: user.id, email });

    res.json({
      message: translate(req.language, 'LOGIN_SUCCESS'),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.email_verified,
        profilePicture: user.profile_picture,
        preferredLanguage: user.preferred_language
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    await logActivity('LOGIN_ERROR', { email: req.body.email, error: error.message });
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Google OAuth login
router.post('/google', async (req, res) => {
  try {
    const { googleToken } = req.body;

    if (!googleToken) {
      return res.status(400).json({
        error: translate(req.language, 'GOOGLE_TOKEN_REQUIRED'),
        code: 'MISSING_TOKEN'
      });
    }

    // Verify Google token (you'd use Google's API here)
    // For demo purposes, we'll simulate this
    const googleUser = await verifyGoogleToken(googleToken);
    
    if (!googleUser) {
      return res.status(401).json({
        error: translate(req.language, 'INVALID_GOOGLE_TOKEN'),
        code: 'INVALID_TOKEN'
      });
    }

    // Check if user exists
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', googleUser.email)
      .single();

    if (!user) {
      // Create new user from Google data
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          email: googleUser.email,
          name: googleUser.name,
          profile_picture: googleUser.picture,
          email_verified: true,
          google_id: googleUser.id,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (createError) {
        return res.status(500).json({
          error: translate(req.language, 'REGISTRATION_FAILED'),
          code: 'DATABASE_ERROR'
        });
      }

      user = newUser;
      await logActivity('USER_REGISTERED_GOOGLE', { userId: user.id, email: user.email });
    } else {
      // Update last login
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    await logActivity('USER_LOGIN_GOOGLE', { userId: user.id, email: user.email });

    res.json({
      message: translate(req.language, 'LOGIN_SUCCESS'),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.email_verified,
        profilePicture: user.profile_picture,
        preferredLanguage: user.preferred_language
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Password reset request
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('INVALID_EMAIL')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: translate(req.language, 'VALIDATION_ERROR'),
        details: errors.array().map(err => ({
          field: err.path,
          message: translate(req.language, err.msg)
        }))
      });
    }

    const { email } = req.body;

    // Find user
    const { data: user } = await supabase
      .from('users')
      .select('id, name, preferred_language')
      .eq('email', email)
      .single();

    if (!user) {
      // Don't reveal if email exists for security
      return res.json({
        message: translate(req.language, 'PASSWORD_RESET_SENT')
      });
    }

    // Generate reset token
    const resetToken = uuidv4();
    const resetExpires = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    // Save reset token
    await supabase
      .from('users')
      .update({
        password_reset_token: resetToken,
        password_reset_expires: resetExpires
      })
      .eq('id', user.id);

    // Send reset email
    await sendEmail({
      to: email,
      subject: translate(user.preferred_language || req.language, 'PASSWORD_RESET_SUBJECT'),
      template: 'password-reset',
      data: {
        name: user.name,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        language: user.preferred_language || req.language
      }
    });

    await logActivity('PASSWORD_RESET_REQUESTED', { userId: user.id, email });

    res.json({
      message: translate(req.language, 'PASSWORD_RESET_SENT')
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Reset password
router.post('/reset-password', [
  body('token').notEmpty().withMessage('TOKEN_REQUIRED'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('WEAK_PASSWORD')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: translate(req.language, 'VALIDATION_ERROR'),
        details: errors.array().map(err => ({
          field: err.path,
          message: translate(req.language, err.msg)
        }))
      });
    }

    const { token, password } = req.body;

    // Find user with valid reset token
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('password_reset_token', token)
      .gt('password_reset_expires', new Date().toISOString())
      .single();

    if (!user) {
      return res.status(400).json({
        error: translate(req.language, 'INVALID_RESET_TOKEN'),
        code: 'INVALID_TOKEN'
      });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 12);

    // Update password and clear reset token
    await supabase
      .from('users')
      .update({
        password_hash: passwordHash,
        password_reset_token: null,
        password_reset_expires: null
      })
      .eq('id', user.id);

    await logActivity('PASSWORD_RESET_COMPLETED', { userId: user.id, email: user.email });

    res.json({
      message: translate(req.language, 'PASSWORD_RESET_SUCCESS')
    });

  } catch (error) {
    console.error('Password reset completion error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Verify email
router.post('/verify-email', [
  body('token').notEmpty().withMessage('TOKEN_REQUIRED')
], async (req, res) => {
  try {
    const { token } = req.body;

    // Find user with verification token
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email_verification_token', token)
      .single();

    if (!user) {
      return res.status(400).json({
        error: translate(req.language, 'INVALID_VERIFICATION_TOKEN'),
        code: 'INVALID_TOKEN'
      });
    }

    // Update user as verified
    await supabase
      .from('users')
      .update({
        email_verified: true,
        email_verification_token: null
      })
      .eq('id', user.id);

    await logActivity('EMAIL_VERIFIED', { userId: user.id, email: user.email });

    res.json({
      message: translate(req.language, 'EMAIL_VERIFICATION_SUCCESS')
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        error: translate(req.language, 'REFRESH_TOKEN_REQUIRED'),
        code: 'MISSING_TOKEN'
      });
    }

    // Verify refresh token
    const decoded = verifyToken(refreshToken, 'refresh');
    if (!decoded) {
      return res.status(401).json({
        error: translate(req.language, 'INVALID_REFRESH_TOKEN'),
        code: 'INVALID_TOKEN'
      });
    }

    // Check if refresh token exists in database
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .eq('refresh_token', refreshToken)
      .single();

    if (!user) {
      return res.status(401).json({
        error: translate(req.language, 'INVALID_REFRESH_TOKEN'),
        code: 'INVALID_TOKEN'
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id);

    // Update refresh token in database
    await supabase
      .from('users')
      .update({ refresh_token: newRefreshToken })
      .eq('id', user.id);

    res.json({
      tokens: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get current user
router.get('/me', validateAuth, async (req, res) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('id, email, name, profile_picture, email_verified, preferred_language, created_at, last_login')
      .eq('id', req.userId)
      .single();

    if (!user) {
      return res.status(404).json({
        error: translate(req.language, 'USER_NOT_FOUND'),
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.email_verified,
        profilePicture: user.profile_picture,
        preferredLanguage: user.preferred_language,
        createdAt: user.created_at,
        lastLogin: user.last_login
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Update user profile
router.put('/profile', validateAuth, [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('INVALID_NAME'),
  body('preferredLanguage').optional().isIn(['en', 'es', 'fr', 'de']).withMessage('UNSUPPORTED_LANGUAGE')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: translate(req.language, 'VALIDATION_ERROR'),
        details: errors.array().map(err => ({
          field: err.path,
          message: translate(req.language, err.msg)
        }))
      });
    }

    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.preferredLanguage) updates.preferred_language = req.body.preferredLanguage;

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.userId)
      .select('id, email, name, profile_picture, email_verified, preferred_language')
      .single();

    if (error) {
      return res.status(500).json({
        error: translate(req.language, 'UPDATE_FAILED'),
        code: 'DATABASE_ERROR'
      });
    }

    await logActivity('PROFILE_UPDATED', { userId: req.userId, updates: Object.keys(updates) });

    res.json({
      message: translate(req.language, 'PROFILE_UPDATE_SUCCESS'),
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        emailVerified: updatedUser.email_verified,
        profilePicture: updatedUser.profile_picture,
        preferredLanguage: updatedUser.preferred_language
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Logout
router.post('/logout', validateAuth, async (req, res) => {
  try {
    // Clear refresh token
    await supabase
      .from('users')
      .update({ refresh_token: null })
      .eq('id', req.userId);

    await logActivity('USER_LOGOUT', { userId: req.userId });

    res.json({
      message: translate(req.language, 'LOGOUT_SUCCESS')
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: translate(req.language, 'INTERNAL_SERVER_ERROR'),
      code: 'INTERNAL_ERROR'
    });
  }
});

// Simulate Google token verification (replace with actual Google API call)
async function verifyGoogleToken(token) {
  // In production, use Google's tokeninfo endpoint or library
  // This is a simulation for demo purposes
  return {
    id: 'google_' + Math.random().toString(36).substr(2, 9),
    email: 'user@example.com',
    name: 'Google User',
    picture: 'https://via.placeholder.com/150'
  };
}

module.exports = router;