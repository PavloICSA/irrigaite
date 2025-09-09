/*
  # Create user calculations table

  1. New Tables
    - `user_calculations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `calculation_type` (text, either 'PET' or 'Irrigation')
      - `region_name` (text, name of Ukrainian region)
      - `temperature` (numeric, temperature in Celsius)
      - `pet_value` (numeric, calculated PET value)
      - `crop_name` (text, name of crop for irrigation calculations)
      - `planting_date` (date, when crop was planted)
      - `calculation_date` (date, date of calculation)
      - `gsm` (numeric, gravimetric soil moisture)
      - `al` (numeric, active layer depth)
      - `bd` (numeric, bulk density)
      - `fc` (numeric, field capacity)
      - `watering_threshold` (numeric, watering threshold percentage)
      - `irrigation_efficiency` (numeric, irrigation efficiency percentage)
      - `etc` (numeric, crop evapotranspiration)
      - `status` (text, irrigation status)
      - `days_to_next_irrigation` (numeric, days until next irrigation needed)
      - `recommended_irrigation_rate` (numeric, recommended irrigation amount)
      - `created_at` (timestamptz, when record was created)

  2. Security
    - Enable RLS on `user_calculations` table
    - Add policies for users to read, insert, and delete their own calculations
*/

CREATE TABLE IF NOT EXISTS user_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  calculation_type text NOT NULL CHECK (calculation_type IN ('PET', 'Irrigation')),
  region_name text NOT NULL,
  temperature numeric,
  pet_value numeric,
  crop_name text,
  planting_date date,
  calculation_date date,
  gsm numeric,
  al numeric,
  bd numeric,
  fc numeric,
  watering_threshold numeric,
  irrigation_efficiency numeric,
  etc numeric,
  status text,
  days_to_next_irrigation numeric,
  recommended_irrigation_rate numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_calculations ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own calculations
CREATE POLICY "Users can read own calculations"
  ON user_calculations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own calculations
CREATE POLICY "Users can insert own calculations"
  ON user_calculations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own calculations
CREATE POLICY "Users can delete own calculations"
  ON user_calculations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);