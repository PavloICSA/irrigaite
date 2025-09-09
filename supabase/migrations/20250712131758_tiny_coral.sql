/*
  # License Key System Setup

  1. New Tables
    - `license_keys`
      - `id` (uuid, primary key)
      - `key_string` (text, unique) - The actual license key
      - `plan_evaluations` (integer) - Number of evaluations this key grants
      - `is_used` (boolean) - Whether the key has been activated
      - `used_by` (uuid, foreign key to auth.users) - Who activated the key
      - `used_at` (timestamp) - When the key was activated
      - `created_at` (timestamp)

    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `additional_evaluations` (integer) - Number of additional evaluations user has
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for secure access
    - Create trigger to auto-create user profiles

  3. Functions
    - Function to create user profile on signup
    - Trigger to automatically call the function
*/

-- Create license_keys table
CREATE TABLE IF NOT EXISTS license_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_string text UNIQUE NOT NULL,
  plan_evaluations integer NOT NULL,
  is_used boolean DEFAULT false,
  used_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  additional_evaluations integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for license_keys
-- Only allow reading of unused keys (for validation purposes)
CREATE POLICY "Anyone can check if unused key exists"
  ON license_keys
  FOR SELECT
  TO authenticated
  USING (is_used = false);

-- Only allow updating keys to mark them as used
CREATE POLICY "Users can activate unused keys"
  ON license_keys
  FOR UPDATE
  TO authenticated
  USING (is_used = false AND used_by IS NULL)
  WITH CHECK (is_used = true AND used_by = auth.uid());

-- RLS Policies for user_profiles
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, additional_evaluations)
  VALUES (new.id, 0);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on user_profiles
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();