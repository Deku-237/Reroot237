# ReRoot Authentication API Documentation

## Overview
Comprehensive RESTful authentication API with multi-language support for the ReRoot heritage reconnection platform.

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Rate Limiting
- General endpoints: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes per IP

## Multi-language Support
Include the `Accept-Language` header or `lang` query parameter:
- Supported languages: `en`, `es`, `fr`, `de`
- Default: `en`

## Endpoints

### 1. User Registration
**POST** `/auth/register`

Register a new user account with email verification.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "language": "en"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

**Response (201):**
```json
{
  "message": "Registration successful! Please check your email to verify your account.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "emailVerified": false
  }
}
```

### 2. User Login
**POST** `/auth/login`

Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful! Welcome back to CamLingo.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "emailVerified": true,
    "profilePicture": null,
    "preferredLanguage": "en"
  },
  "tokens": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

### 3. Google OAuth Login
**POST** `/auth/google`

Authenticate user with Google OAuth token.

**Request Body:**
```json
{
  "googleToken": "google_oauth_token"
}
```

**Response (200):**
```json
{
  "message": "Login successful! Welcome back to CamLingo.",
  "user": {
    "id": "uuid",
    "email": "user@gmail.com",
    "name": "Google User",
    "emailVerified": true,
    "profilePicture": "https://lh3.googleusercontent.com/...",
    "preferredLanguage": "en"
  },
  "tokens": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

### 4. Password Reset Request
**POST** `/auth/forgot-password`

Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "If an account with that email exists, we've sent password reset instructions."
}
```

### 5. Password Reset Completion
**POST** `/auth/reset-password`

Complete password reset with token.

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "password": "NewSecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Your password has been successfully reset. You can now log in with your new password."
}
```

### 6. Email Verification
**POST** `/auth/verify-email`

Verify user email address.

**Request Body:**
```json
{
  "token": "verification_token_from_email"
}
```

**Response (200):**
```json
{
  "message": "Your email has been successfully verified! You can now access all features."
}
```

### 7. Token Refresh
**POST** `/auth/refresh`

Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "tokens": {
    "accessToken": "new_jwt_access_token",
    "refreshToken": "new_jwt_refresh_token"
  }
}
```

### 8. Get Current User
**GET** `/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "emailVerified": true,
    "profilePicture": null,
    "preferredLanguage": "en",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "lastLogin": "2025-01-01T12:00:00.000Z"
  }
}
```

### 9. Update User Profile
**PUT** `/auth/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "preferredLanguage": "fr"
}
```

**Response (200):**
```json
{
  "message": "Your profile has been successfully updated.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Updated Name",
    "emailVerified": true,
    "profilePicture": null,
    "preferredLanguage": "fr"
  }
}
```

### 10. Logout
**POST** `/auth/logout`

Logout user and invalidate refresh token.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "message": "You have been successfully logged out."
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": "Human-readable error message in requested language",
  "code": "ERROR_CODE",
  "details": [
    {
      "field": "email",
      "message": "Please enter a valid email address."
    }
  ]
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400) - Input validation failed
- `EMAIL_EXISTS` (409) - Email already registered
- `INVALID_CREDENTIALS` (401) - Wrong email/password
- `INVALID_TOKEN` (401) - Invalid or expired token
- `MISSING_TOKEN` (401) - Authorization token required
- `RATE_LIMIT_EXCEEDED` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error

## Security Features

### Password Security
- Bcrypt hashing with 12 salt rounds
- Strong password requirements enforced
- Secure password reset flow with expiring tokens

### Token Security
- JWT access tokens (15-minute expiry)
- JWT refresh tokens (7-day expiry)
- Secure token rotation on refresh

### Rate Limiting
- IP-based rate limiting
- Stricter limits on authentication endpoints
- Configurable limits via environment variables

### Input Validation
- Email format validation and normalization
- Password strength requirements
- Input sanitization and length limits
- SQL injection prevention

### Logging & Monitoring
- Comprehensive activity logging
- Failed authentication attempt tracking
- Error logging with context
- User action audit trail

## Database Schema

### Users Table
```sql
users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password_hash text,
  name text NOT NULL,
  profile_picture text,
  email_verified boolean DEFAULT false,
  email_verification_token text,
  password_reset_token text,
  password_reset_expires timestamptz,
  google_id text UNIQUE,
  preferred_language text DEFAULT 'en',
  refresh_token text,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
)
```

### OAuth Providers Table
```sql
oauth_providers (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  provider text NOT NULL,
  provider_user_id text NOT NULL,
  access_token text,
  refresh_token text,
  created_at timestamptz DEFAULT now()
)
```

### Activity Logs Table
```sql
activity_logs (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  data jsonb,
  ip_address text,
  user_agent text,
  timestamp timestamptz DEFAULT now()
)
```

## Setup Instructions

1. **Environment Variables:**
   Copy `.env.example` to `.env` and configure all variables.

2. **Database Setup:**
   Run the migration file to create all necessary tables and security policies.

3. **Email Configuration:**
   Configure SMTP settings for email verification and password reset.

4. **Google OAuth Setup:**
   Configure Google OAuth credentials in Google Cloud Console.

5. **Start Server:**
   ```bash
   npm install
   npm run dev
   ```

## Production Considerations

- Use strong, unique JWT secrets
- Configure proper CORS origins
- Set up SSL/TLS certificates
- Use environment-specific configuration
- Implement proper logging and monitoring
- Set up database backups
- Configure email service (SendGrid, AWS SES, etc.)
- Implement additional security headers
- Set up health checks and monitoring