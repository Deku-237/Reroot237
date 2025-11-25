/*
  # Fix Remaining Security Issues

  1. Unindexed Foreign Keys
    - Add indexes for foreign keys to prevent N+1 query problems
    - Affects: activity_logs.user_id, lesson_completions.user_id, oauth_providers.user_id
    - Improves performance for joins and cascading operations

  2. Deduplicate OAuth Policies
    - Remove duplicate SELECT policy "Users can manage own oauth data"
    - Keep single consolidated policy for all operations

  3. Password Security
    - Note: Must be enabled in Supabase Auth dashboard
    - See instructions below
*/

-- ============================================================================
-- Step 1: Add indexes for unindexed foreign keys
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_user_id ON lesson_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_providers_user_id ON oauth_providers(user_id);

-- ============================================================================
-- Step 2: Fix oauth_providers policies - remove duplicate SELECT policy
-- ============================================================================

DROP POLICY IF EXISTS "Users can manage own oauth data" ON oauth_providers;
DROP POLICY IF EXISTS "Users can manage own oauth data (insert update delete)" ON oauth_providers;

-- Single consolidated policy for all operations
CREATE POLICY "Users can manage own oauth data"
  ON oauth_providers
  FOR ALL
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

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
