/*
  # User Profiles and Learning Progress

  ## Overview
  This migration creates tables to track user learning progress for the ReRoot language learning app.
  It integrates with Supabase's built-in auth.users table.

  ## New Tables

  ### 1. user_profiles
  Extends auth.users with additional profile information:
  - `id` (uuid, foreign key to auth.users)
  - `preferred_language` (text) - User's preferred UI language
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. user_progress
  Tracks overall user learning progress:
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `total_xp` (integer) - Total experience points earned
  - `streak` (integer) - Current learning streak in days
  - `current_level` (integer) - Overall user level
  - `lessons_completed` (integer) - Total lessons completed
  - `correct_answers` (integer) - Total correct answers
  - `total_answers` (integer) - Total answers given
  - `last_learned` (timestamptz) - Last learning activity timestamp
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. language_progress
  Tracks progress per language:
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `language_id` (text) - Language identifier
  - `total_xp` (integer) - XP earned in this language
  - `level` (integer) - Level in this language
  - `current_unit` (integer) - Current learning unit
  - `accuracy` (numeric) - Answer accuracy percentage
  - `streak` (integer) - Streak in this language
  - `completed_lessons` (text[]) - Array of completed lesson IDs
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. lesson_completions
  Records individual lesson completions:
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `lesson_id` (text) - Lesson identifier
  - `language_id` (text) - Language identifier
  - `score` (numeric) - Lesson score percentage
  - `xp_earned` (integer) - XP earned from lesson
  - `time_spent` (integer) - Time spent in seconds
  - `completed_at` (timestamptz) - Completion timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only read/write their own data
  - Policies restrict access to authenticated users only

  ## Indexes
  - Performance indexes on foreign keys and commonly queried columns
*/

-- Drop existing tables if they exist (from old schema)
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS oauth_providers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_preferred_language CHECK (preferred_language IN ('en', 'es', 'fr', 'de', 'yo', 'sw', 'ha'))
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp integer DEFAULT 0,
  streak integer DEFAULT 0,
  current_level integer DEFAULT 1,
  lessons_completed integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  total_answers integer DEFAULT 0,
  last_learned timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_xp CHECK (total_xp >= 0),
  CONSTRAINT valid_streak CHECK (streak >= 0),
  CONSTRAINT valid_level CHECK (current_level >= 1),
  CONSTRAINT valid_answers CHECK (correct_answers >= 0 AND total_answers >= 0 AND correct_answers <= total_answers)
);

-- Language progress table
CREATE TABLE IF NOT EXISTS language_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_id text NOT NULL,
  total_xp integer DEFAULT 0,
  level integer DEFAULT 1,
  current_unit integer DEFAULT 0,
  accuracy numeric(5,2) DEFAULT 0,
  streak integer DEFAULT 0,
  completed_lessons text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, language_id),
  CONSTRAINT valid_language_xp CHECK (total_xp >= 0),
  CONSTRAINT valid_language_level CHECK (level >= 1),
  CONSTRAINT valid_accuracy CHECK (accuracy >= 0 AND accuracy <= 100)
);

-- Lesson completions table
CREATE TABLE IF NOT EXISTS lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  language_id text NOT NULL,
  score numeric(5,2) DEFAULT 0,
  xp_earned integer DEFAULT 0,
  time_spent integer DEFAULT 0,
  completed_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_score CHECK (score >= 0 AND score <= 100),
  CONSTRAINT valid_xp_earned CHECK (xp_earned >= 0),
  CONSTRAINT valid_time CHECK (time_spent >= 0)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON user_profiles(id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_language_progress_user_id ON language_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_language_progress_language ON language_progress(language_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_user_id ON lesson_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_lesson_id ON lesson_completions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_completed_at ON lesson_completions(completed_at);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE language_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_completions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_progress
CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for language_progress
CREATE POLICY "Users can read own language progress"
  ON language_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own language progress"
  ON language_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own language progress"
  ON language_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own language progress"
  ON language_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for lesson_completions
CREATE POLICY "Users can read own lesson completions"
  ON lesson_completions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson completions"
  ON lesson_completions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
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
