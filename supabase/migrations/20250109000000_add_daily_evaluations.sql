-- Create daily_evaluations table to track daily free evaluations
CREATE TABLE IF NOT EXISTS daily_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  evaluation_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure one free evaluation per user per day
  UNIQUE(user_id, evaluation_date)
);

-- Add RLS policies
ALTER TABLE daily_evaluations ENABLE ROW LEVEL SECURITY;

-- Users can only see their own daily evaluation records
CREATE POLICY "Users can view own daily evaluations" ON daily_evaluations
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own daily evaluation records
CREATE POLICY "Users can insert own daily evaluations" ON daily_evaluations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_daily_evaluations_user_date 
ON daily_evaluations(user_id, evaluation_date);

-- Add comment
COMMENT ON TABLE daily_evaluations IS 'Tracks daily free evaluations used by users';