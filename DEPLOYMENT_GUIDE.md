# ReRoot Authentication API - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+ installed
- Supabase project set up
- Domain name configured
- SSL certificate ready

### 1. Server Setup

#### Option A: Traditional VPS/Server
```bash
# Clone repository
git clone <your-repo-url>
cd reroot-auth-api

# Install dependencies
cd server
npm install --production

# Set up environment
cp .env.example .env
# Configure production environment variables

# Install PM2 for process management
npm install -g pm2

# Start application
pm2 start index.js --name "reroot-auth"
pm2 startup
pm2 save
```

#### Option B: Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm install --production

COPY server/ ./

EXPOSE 3001

CMD ["node", "index.js"]
```

```bash
# Build and run
docker build -t reroot-auth .
docker run -p 3001:3001 --env-file .env reroot-auth
```

### 2. Environment Configuration

#### Production Environment Variables
```env
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# JWT Secrets (Generate strong secrets!)
JWT_SECRET=your-super-strong-production-jwt-secret-256-bits
JWT_REFRESH_SECRET=your-super-strong-production-refresh-secret-256-bits

# Email Service (Production SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
SMTP_FROM=noreply@yourdomain.com

# Google OAuth (Production credentials)
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret

# Application
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX=5
```

### 3. Database Setup

#### Supabase Configuration
1. Create production Supabase project
2. Run migration files in order
3. Configure Row Level Security policies
4. Set up database backups
5. Configure connection pooling

#### Database Optimization
```sql
-- Additional production indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_last_login ON users(last_login);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_activity_logs_timestamp_desc ON activity_logs(timestamp DESC);

-- Analyze tables for query optimization
ANALYZE users;
ANALYZE oauth_providers;
ANALYZE activity_logs;
```

### 4. Security Hardening

#### SSL/TLS Setup
```nginx
# Nginx configuration
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Security Headers
```javascript
// Additional security configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### 5. Monitoring & Logging

#### Production Logging
```javascript
// Winston logger configuration
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

#### Health Checks
```javascript
// Enhanced health check
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) throw error;

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});
```

### 6. Performance Optimization

#### Caching Strategy
```javascript
// Redis caching for rate limiting and sessions
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

// Cache user sessions
const cacheUser = async (userId, userData) => {
  await client.setex(`user:${userId}`, 900, JSON.stringify(userData));
};
```

#### Database Connection Pooling
```javascript
// Supabase with connection pooling
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
});
```

### 7. Backup & Recovery

#### Database Backups
```bash
# Automated daily backups
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
```

#### Disaster Recovery Plan
1. **Database Recovery**: Restore from latest backup
2. **Application Recovery**: Deploy from Git repository
3. **Configuration Recovery**: Restore environment variables
4. **DNS Failover**: Configure backup servers

### 8. Monitoring & Alerts

#### Application Monitoring
```javascript
// Error tracking with Sentry
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

#### Performance Monitoring
- Set up APM (Application Performance Monitoring)
- Monitor response times and error rates
- Track database query performance
- Set up alerts for critical issues

### 9. Scaling Considerations

#### Horizontal Scaling
```yaml
# Docker Compose for multiple instances
version: '3.8'
services:
  auth-api:
    build: .
    ports:
      - "3001-3003:3001"
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
```

#### Load Balancing
```nginx
# Nginx load balancer
upstream auth_backend {
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
}

server {
    location / {
        proxy_pass http://auth_backend;
    }
}
```

### 10. Security Checklist

- [ ] Strong JWT secrets (256-bit minimum)
- [ ] HTTPS enforced with HSTS headers
- [ ] Rate limiting configured appropriately
- [ ] Input validation on all endpoints
- [ ] SQL injection protection verified
- [ ] CORS configured for production domains
- [ ] Security headers implemented
- [ ] Error messages don't leak sensitive info
- [ ] Logging excludes sensitive data
- [ ] Database access restricted to API only
- [ ] Regular security updates scheduled
- [ ] Penetration testing completed

### 11. Maintenance

#### Regular Tasks
- **Weekly**: Review error logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Security audit and penetration testing
- **Annually**: Full system architecture review

#### Monitoring Dashboards
Set up dashboards to monitor:
- API response times
- Error rates by endpoint
- Authentication success/failure rates
- Database performance metrics
- User registration and login trends

This deployment guide ensures your authentication API is production-ready with proper security, monitoring, and scalability considerations.