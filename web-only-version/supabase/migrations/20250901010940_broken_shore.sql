/*
  # Authentication System Database Schema

  1. New Tables
    - `users` - Main user accounts with authentication data
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `password_hash` (text, nullable for OAuth users)
      - `name` (text, not null)
      - `profile_picture` (text, nullable)
      - `email_verified` (boolean, default false)
      - `email_verification_token` (text, nullable)
      - `password_reset_token` (text, nullable)
      - `password_reset_expires` (timestamptz, nullable)
      - `google_id` (text, nullable, unique)
      - `preferred_language` (text, default 'en')
      - `refresh_token` (text, nullable)
      - `created_at` (timestamptz, default now())
      - `last_login` (timestamptz, nullable)

    - `oauth_providers` - OAuth provider information
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `provider` (text, not null)
      - `provider_user_id` (text, not null)
      - `access_token` (text, nullable)
      - `refresh_token` (text, nullable)
      - `created_at` (timestamptz, default now())

    - `activity_logs` - User activity logging
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable, foreign key to users)
      - `action` (text, not null)
      - `data` (jsonb, nullable)
      - `ip_address` (text, nullable)
      - `user_agent` (text, nullable)
      - `timestamp` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add indexes for performance optimization

  3. Constraints
    - Unique constraints on email and google_id
    - Foreign key relationships
    - Check constraints for data validation
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  last_login timestamptz,
  
  CONSTRAINT valid_language CHECK (preferred_language IN ('en', 'es', 'fr', 'de')),
  CONSTRAINT email_or_google CHECK (password_hash IS NOT NULL OR google_id IS NOT NULL)
);

-- OAuth providers table
CREATE TABLE IF NOT EXISTS oauth_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  provider_user_id text NOT NULL,
  access_token text,
  refresh_token text,
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(provider, provider_user_id)
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  data jsonb,
  ip_address text,
  user_agent text,
  timestamp timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(email_verification_token);
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(password_reset_token);
CREATE INDEX IF NOT EXISTS idx_oauth_providers_user_id ON oauth_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_providers_provider ON oauth_providers(provider, provider_user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for oauth_providers table
CREATE POLICY "Users can read own oauth data"
  ON oauth_providers
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own oauth data"
  ON oauth_providers
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for activity_logs table
CREATE POLICY "Users can read own activity logs"
  ON activity_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Service role policies for authentication operations
CREATE POLICY "Service role can manage users"
  ON users
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage oauth providers"
  ON oauth_providers
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage activity logs"
  ON activity_logs
  FOR ALL
  TO service_role
  USING (true);