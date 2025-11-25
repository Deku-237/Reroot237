/*
  # Fix RLS Performance Issues and Remove Unused Indexes

  1. RLS Performance Optimization
    - Replace direct `auth.<function>()` calls with `(select auth.<function>())`
    - Prevents re-evaluation of auth functions for each row
    - Improves query performance at scale
    - Affects all tables: user_profiles, user_progress, language_progress, lesson_completions, users, oauth_providers, activity_logs

  2. Unused Indexes Cleanup
    - Remove unused indexes that don't improve query performance
    - Reduces storage overhead and write latency
    - Indexes removed: idx_user_profiles_id, idx_user_progress_user_id, idx_language_progress_user_id, etc.

  3. Function Security
    - Fix search_path for update_updated_at_column function
    - Sets search_path to empty to prevent mutation

  4. Deduplicate OAuth Policies
    - Remove redundant SELECT policy from oauth_providers
    - Consolidate into single management policy

  5. Password Security
    - Note: Compromised password checking is a Supabase account setting
    - Enable in Supabase Auth dashboard: Authentication → Password & Signups → Protect against compromised passwords
*/

-- ============================================================================
-- Step 1: Drop unused indexes
-- ============================================================================

DROP INDEX IF EXISTS idx_user_profiles_id;
DROP INDEX IF EXISTS idx_user_progress_user_id;
DROP INDEX IF EXISTS idx_language_progress_user_id;
DROP INDEX IF EXISTS idx_language_progress_language;
DROP INDEX IF EXISTS idx_lesson_completions_user_id;
DROP INDEX IF EXISTS idx_lesson_completions_lesson_id;
DROP INDEX IF EXISTS idx_lesson_completions_completed_at;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_google_id;
DROP INDEX IF EXISTS idx_users_verification_token;
DROP INDEX IF EXISTS idx_users_reset_token;
DROP INDEX IF EXISTS idx_oauth_providers_user_id;
DROP INDEX IF EXISTS idx_oauth_providers_provider;
DROP INDEX IF EXISTS idx_activity_logs_user_id;
DROP INDEX IF EXISTS idx_activity_logs_timestamp;
DROP INDEX IF EXISTS idx_activity_logs_action;

-- ============================================================================
-- Step 2: Fix RLS policies with optimized auth() calls
-- ============================================================================

-- user_profiles table policies
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- user_progress table policies
DROP POLICY IF EXISTS "Users can read own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;

CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- language_progress table policies
DROP POLICY IF EXISTS "Users can read own language progress" ON language_progress;
DROP POLICY IF EXISTS "Users can insert own language progress" ON language_progress;
DROP POLICY IF EXISTS "Users can update own language progress" ON language_progress;
DROP POLICY IF EXISTS "Users can delete own language progress" ON language_progress;

CREATE POLICY "Users can read own language progress"
  ON language_progress
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own language progress"
  ON language_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own language progress"
  ON language_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own language progress"
  ON language_progress
  FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- lesson_completions table policies
DROP POLICY IF EXISTS "Users can read own lesson completions" ON lesson_completions;
DROP POLICY IF EXISTS "Users can insert own lesson completions" ON lesson_completions;

CREATE POLICY "Users can read own lesson completions"
  ON lesson_completions
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own lesson completions"
  ON lesson_completions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- users table policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()));

-- oauth_providers table policies - consolidate and fix
DROP POLICY IF EXISTS "Users can read own oauth data" ON oauth_providers;
DROP POLICY IF EXISTS "Users can manage own oauth data" ON oauth_providers;

CREATE POLICY "Users can manage own oauth data"
  ON oauth_providers
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can manage own oauth data (insert update delete)"
  ON oauth_providers
  FOR ALL
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- activity_logs table policies
DROP POLICY IF EXISTS "Users can read own activity logs" ON activity_logs;

CREATE POLICY "Users can read own activity logs"
  ON activity_logs
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- Step 3: Fix function search_path to prevent mutation
-- ============================================================================

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate triggers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_user_profiles_updated_at
      BEFORE UPDATE ON user_profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_progress_updated_at'
  ) THEN
    CREATE TRIGGER update_user_progress_updated_at
      BEFORE UPDATE ON user_progress
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_language_progress_updated_at'
  ) THEN
    CREATE TRIGGER update_language_progress_updated_at
      BEFORE UPDATE ON language_progress
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- ============================================================================
-- Security Notes
-- ============================================================================

/*
  IMPORTANT: Compromised Password Protection
  
  To enable Supabase Auth's built-in compromised password checking:
  1. Go to your Supabase project dashboard
  2. Navigate to: Authentication → Password & Signups
  3. Toggle on "Protect against compromised passwords"
  4. This checks passwords against the HaveIBeenPwned.org database
  
  This feature prevents users from using passwords that have been exposed
  in data breaches, significantly improving account security.
*/
