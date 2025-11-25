# ReRoot Authentication API - Security Guide

## 🔒 Security Overview

This guide outlines the comprehensive security measures implemented in the ReRoot Authentication API and best practices for maintaining security in production.

## 🛡️ Security Architecture

### 1. Authentication Security

#### Password Security
```javascript
// Bcrypt with 12 salt rounds (industry standard)
const saltRounds = 12;
const passwordHash = await bcrypt.hash(password, saltRounds);

// Password strength requirements
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
```

**Password Policy:**
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one digit (0-9)
- At least one special character (@$!%*?&)

#### JWT Token Security
```javascript
// Short-lived access tokens
const accessToken = jwt.sign(
  { userId, type: 'access' },
  JWT_SECRET,
  { expiresIn: '15m' }
);

// Longer-lived refresh tokens
const refreshToken = jwt.sign(
  { userId, type: 'refresh' },
  JWT_REFRESH_SECRET,
  { expiresIn: '7d' }
);
```

**Token Strategy:**
- **Access tokens**: 15-minute expiry for minimal exposure
- **Refresh tokens**: 7-day expiry with rotation
- **Separate secrets** for access and refresh tokens
- **Token type validation** to prevent misuse

### 2. Input Validation & Sanitization

#### Email Validation
```javascript
body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('INVALID_EMAIL')
```

#### SQL Injection Prevention
- **Parameterized queries** via Supabase client
- **Input sanitization** with express-validator
- **Type checking** for all database operations

#### XSS Prevention
```javascript
// Helmet security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
```

### 3. Rate Limiting

#### Multi-tier Rate Limiting
```javascript
// General API rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    error: 'Too many requests, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Stricter auth endpoint limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 auth attempts per window
  message: {
    error: 'Too many authentication attempts.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  }
});
```

### 4. Database Security

#### Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
```

#### Data Encryption
- **Password hashing** with bcrypt (12 rounds)
- **Token encryption** with strong JWT secrets
- **Database encryption** at rest (Supabase default)
- **TLS encryption** in transit

### 5. CORS Configuration

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language']
}));
```

## 🔍 Security Monitoring

### 1. Activity Logging

#### Comprehensive Audit Trail
```javascript
// Log all authentication events
await logActivity('USER_LOGIN', { 
  userId: user.id, 
  email: user.email,
  ip: req.ip,
  userAgent: req.get('User-Agent')
});

// Log failed attempts
await logActivity('LOGIN_ATTEMPT', { 
  email, 
  status: 'failed', 
  reason: 'invalid_password',
  ip: req.ip
});
```

#### Logged Events
- User registration and verification
- Login attempts (successful and failed)
- Password reset requests and completions
- Token refresh operations
- Profile updates
- OAuth authentication events

### 2. Error Handling

#### Secure Error Messages
```javascript
// Don't reveal sensitive information
if (findError || !user) {
  return res.status(401).json({
    error: 'Invalid email or password',
    code: 'INVALID_CREDENTIALS'
  });
}
```

**Security Principles:**
- **No information leakage** in error messages
- **Consistent response times** to prevent timing attacks
- **Generic messages** for authentication failures
- **Detailed logging** without exposing to users

### 3. Session Management

#### Secure Session Handling
```javascript
// Invalidate refresh token on logout
await supabase
  .from('users')
  .update({ refresh_token: null })
  .eq('id', req.userId);

// Token rotation on refresh
const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id);
```

## 🚨 Threat Mitigation

### 1. Common Attack Vectors

#### Brute Force Protection
- **Rate limiting** on authentication endpoints
- **Account lockout** after multiple failed attempts
- **Progressive delays** for repeated failures
- **IP-based blocking** for suspicious activity

#### Session Hijacking Prevention
- **Short token expiry** (15 minutes for access tokens)
- **Token rotation** on refresh
- **Secure token storage** (httpOnly cookies recommended for web)
- **Token invalidation** on logout

#### CSRF Protection
```javascript
// CSRF token validation for state-changing operations
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});
```

### 2. Data Protection

#### Personal Data Handling
- **Minimal data collection** - only necessary fields
- **Data encryption** at rest and in transit
- **Secure deletion** of sensitive data
- **GDPR compliance** considerations

#### Email Security
```javascript
// Secure email verification
const verificationToken = uuidv4(); // Cryptographically secure
const resetExpires = new Date(Date.now() + 3600000); // 1-hour expiry
```

## 🔧 Security Configuration

### 1. Environment Security

#### Secret Management
```bash
# Generate strong secrets
openssl rand -base64 32  # For JWT_SECRET
openssl rand -base64 32  # For JWT_REFRESH_SECRET

# Use environment variables, never hardcode
export JWT_SECRET="your-generated-secret"
```

#### Environment Isolation
- **Separate environments** for dev/staging/production
- **Different database instances** per environment
- **Isolated API keys** and credentials
- **Environment-specific CORS origins**

### 2. Network Security

#### API Gateway Configuration
```yaml
# API Gateway rate limiting
rate_limit:
  requests_per_minute: 60
  burst_size: 10

# IP whitelisting for admin endpoints
ip_whitelist:
  - "192.168.1.0/24"
  - "10.0.0.0/8"
```

### 3. Dependency Security

#### Regular Security Updates
```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Use npm audit fix for automatic fixes
npm audit fix
```

#### Dependency Monitoring
- **Automated vulnerability scanning**
- **Regular dependency updates**
- **Security advisory monitoring**
- **License compliance checking**

## 📊 Security Metrics

### 1. Key Performance Indicators

#### Authentication Metrics
- **Failed login rate** (should be < 5%)
- **Token refresh frequency** (monitor for abuse)
- **Password reset requests** (watch for spikes)
- **Account verification rate** (should be > 90%)

#### Security Metrics
- **Rate limit violations** per hour
- **Suspicious IP activity** patterns
- **Error rate trends** by endpoint
- **Response time anomalies**

### 2. Alerting Thresholds

#### Critical Alerts
- **Failed login rate > 10%** in 5 minutes
- **Rate limit violations > 100** in 1 hour
- **Database connection failures**
- **Email service failures**

#### Warning Alerts
- **Failed login rate > 5%** in 15 minutes
- **Unusual geographic login patterns**
- **High token refresh frequency**
- **Slow response times > 2 seconds**

## 🔄 Security Maintenance

### 1. Regular Security Tasks

#### Daily
- Review error logs for anomalies
- Monitor authentication failure rates
- Check system health metrics

#### Weekly
- Analyze security logs for patterns
- Review rate limiting effectiveness
- Update security documentation

#### Monthly
- Security dependency updates
- Review and rotate API keys
- Analyze user behavior patterns
- Update security policies

#### Quarterly
- Full security audit
- Penetration testing
- Review access controls
- Update incident response procedures

### 2. Incident Response

#### Security Incident Procedure
1. **Immediate Response**
   - Identify and contain the threat
   - Preserve evidence and logs
   - Notify stakeholders

2. **Investigation**
   - Analyze attack vectors
   - Assess data exposure
   - Document findings

3. **Recovery**
   - Patch vulnerabilities
   - Reset compromised credentials
   - Restore services

4. **Post-Incident**
   - Update security measures
   - Improve monitoring
   - Document lessons learned

## 🎯 Security Best Practices

### 1. Development Security

#### Secure Coding Practices
- **Input validation** on all endpoints
- **Output encoding** to prevent XSS
- **Parameterized queries** for database access
- **Error handling** without information leakage

#### Code Review Checklist
- [ ] All inputs validated and sanitized
- [ ] No hardcoded secrets or credentials
- [ ] Proper error handling implemented
- [ ] Security headers configured
- [ ] Rate limiting applied appropriately
- [ ] Logging excludes sensitive data

### 2. Operational Security

#### Access Control
- **Principle of least privilege**
- **Role-based access control**
- **Regular access reviews**
- **Multi-factor authentication** for admin access

#### Infrastructure Security
- **Network segmentation**
- **Firewall configuration**
- **Regular security updates**
- **Intrusion detection systems**

This security guide provides comprehensive protection for the authentication API while maintaining usability and performance. Regular review and updates of these security measures ensure ongoing protection against evolving threats.