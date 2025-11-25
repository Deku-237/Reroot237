const request = require('supertest');
const app = require('../index');

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        language: 'en'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user.emailVerified).toBe(false);
    });

    it('should reject weak passwords', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'weak',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'password',
            message: expect.any(String)
          })
        ])
      );
    });

    it('should reject duplicate email addresses', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'SecurePass123!',
        name: 'Test User'
      };

      // First registration
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Second registration with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.code).toBe('EMAIL_EXISTS');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Register a test user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'login@example.com',
          password: 'SecurePass123!',
          name: 'Login Test'
        });
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'SecurePass123!'
        })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('tokens');
      expect(response.body.tokens).toHaveProperty('accessToken');
      expect(response.body.tokens).toHaveProperty('refreshToken');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword123!'
        })
        .expect(401);

      expect(response.body.code).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken;

    beforeEach(async () => {
      // Register and login to get refresh token
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'refresh@example.com',
          password: 'SecurePass123!',
          name: 'Refresh Test'
        });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'refresh@example.com',
          password: 'SecurePass123!'
        });

      refreshToken = loginResponse.body.tokens.refreshToken;
    });

    it('should refresh tokens successfully', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(response.body).toHaveProperty('tokens');
      expect(response.body.tokens).toHaveProperty('accessToken');
      expect(response.body.tokens).toHaveProperty('refreshToken');
    });

    it('should reject invalid refresh tokens', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid_token' })
        .expect(401);

      expect(response.body.code).toBe('INVALID_TOKEN');
    });
  });

  describe('GET /api/auth/me', () => {
    let accessToken;

    beforeEach(async () => {
      // Register and login to get access token
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'me@example.com',
          password: 'SecurePass123!',
          name: 'Me Test'
        });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'me@example.com',
          password: 'SecurePass123!'
        });

      accessToken = loginResponse.body.tokens.accessToken;
    });

    it('should return user data for valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('me@example.com');
      expect(response.body.user.name).toBe('Me Test');
    });

    it('should reject requests without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.code).toBe('MISSING_TOKEN');
    });
  });

  describe('Multi-language Support', () => {
    it('should return Spanish error messages', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Accept-Language', 'es')
        .send({
          email: 'invalid-email',
          password: 'test'
        })
        .expect(400);

      // Should contain Spanish error message
      expect(response.body.error).toContain('validación');
    });

    it('should return French error messages', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .set('Accept-Language', 'fr')
        .send({
          email: 'test@example.com',
          password: 'weak',
          name: 'Test'
        })
        .expect(400);

      // Should contain French error message
      expect(response.body.details[0].message).toContain('mot de passe');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits on auth endpoints', async () => {
      const userData = {
        email: 'rate@example.com',
        password: 'WrongPass123!'
      };

      // Make 6 requests (limit is 5)
      for (let i = 0; i < 6; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send(userData);

        if (i < 5) {
          expect(response.status).toBe(401); // Invalid credentials
        } else {
          expect(response.status).toBe(429); // Rate limited
          expect(response.body.code).toBe('AUTH_RATE_LIMIT_EXCEEDED');
        }
      }
    });
  });
});