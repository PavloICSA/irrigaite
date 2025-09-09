# API Documentation

## Overview

IrrigAIte UA uses Supabase as its backend-as-a-service platform, providing authentication, database operations, and serverless functions. This document outlines the API structure, database schema, and integration patterns.

## Backend Architecture

### Supabase Services
- **Authentication**: User registration, login, and session management
- **Database**: PostgreSQL with real-time capabilities
- **Edge Functions**: Serverless functions for license key operations
- **Row Level Security (RLS)**: Data access control and user isolation

### Environment Configuration
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

### Users Table (Managed by Supabase Auth)
```sql
-- Supabase auth.users table (system managed)
auth.users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  created_at TIMESTAMP,
  email_confirmed_at TIMESTAMP,
  -- Additional Supabase auth fields
)
```

### User Profiles Table
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  additional_evaluations INTEGER DEFAULT 0,
  total_evaluations_used INTEGER DEFAULT 0
);

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

### PET Calculations Table
```sql
CREATE TABLE pet_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  region_name VARCHAR NOT NULL,
  temperature DECIMAL(5,2) NOT NULL,
  pet_value DECIMAL(8,4) NOT NULL,
  temperature_source VARCHAR DEFAULT 'realtime',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE pet_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calculations" ON pet_calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calculations" ON pet_calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations" ON pet_calculations
  FOR DELETE USING (auth.uid() = user_id);
```

### Irrigation Calculations Table
```sql
CREATE TABLE irrigation_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pet_calculation_id UUID REFERENCES pet_calculations(id) ON DELETE CASCADE,
  region_name VARCHAR NOT NULL,
  crop_type VARCHAR NOT NULL,
  planting_date DATE NOT NULL,
  current_date DATE NOT NULL,
  climate_type VARCHAR NOT NULL,
  gravimetric_soil_moisture DECIMAL(5,2) NOT NULL,
  active_soil_layer INTEGER NOT NULL,
  soil_bulk_density DECIMAL(4,2) NOT NULL,
  field_capacity DECIMAL(5,2) NOT NULL,
  watering_threshold DECIMAL(5,2) NOT NULL,
  irrigation_efficiency DECIMAL(5,2) NOT NULL,
  etc_value DECIMAL(8,4),
  irrigation_required BOOLEAN,
  days_to_next_irrigation INTEGER,
  recommended_irrigation_rate DECIMAL(8,4),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE irrigation_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own irrigation calculations" ON irrigation_calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own irrigation calculations" ON irrigation_calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own irrigation calculations" ON irrigation_calculations
  FOR DELETE USING (auth.uid() = user_id);
```

### License Keys Table
```sql
CREATE TABLE license_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_code VARCHAR UNIQUE NOT NULL,
  evaluations INTEGER NOT NULL,
  is_activated BOOLEAN DEFAULT FALSE,
  activated_by UUID REFERENCES auth.users(id),
  activated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE license_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view activated keys" ON license_keys
  FOR SELECT USING (auth.uid() = activated_by);
```

## Authentication API

### User Registration
```typescript
import { supabase } from '../lib/supabaseClient';

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};
```

### User Login
```typescript
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};
```

### User Logout
```typescript
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
```

### Session Management
```typescript
// Get current session
const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // Handle sign in
  } else if (event === 'SIGNED_OUT') {
    // Handle sign out
  }
});
```

## Database Operations

### User Profile Operations

#### Get User Profile
```typescript
const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data;
};
```

#### Create User Profile
```typescript
const createUserProfile = async (userId: string, email: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      id: userId,
      email,
      additional_evaluations: 0,
      total_evaluations_used: 0
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
```

#### Update User Profile
```typescript
const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
```

### PET Calculation Operations

#### Save PET Calculation
```typescript
interface PETCalculationData {
  region_name: string;
  temperature: number;
  pet_value: number;
  temperature_source?: 'realtime' | 'manual';
}

const savePETCalculation = async (userId: string, data: PETCalculationData) => {
  const { data: result, error } = await supabase
    .from('pet_calculations')
    .insert({
      user_id: userId,
      ...data
    })
    .select()
    .single();
    
  if (error) throw error;
  return result;
};
```

#### Get User PET Calculations
```typescript
const getUserPETCalculations = async (userId: string) => {
  const { data, error } = await supabase
    .from('pet_calculations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};
```

#### Delete PET Calculation
```typescript
const deletePETCalculation = async (calculationId: string) => {
  const { error } = await supabase
    .from('pet_calculations')
    .delete()
    .eq('id', calculationId);
    
  if (error) throw error;
};
```

### Irrigation Calculation Operations

#### Save Irrigation Calculation
```typescript
interface IrrigationCalculationData {
  pet_calculation_id: string;
  region_name: string;
  crop_type: string;
  planting_date: string;
  current_date: string;
  climate_type: string;
  gravimetric_soil_moisture: number;
  active_soil_layer: number;
  soil_bulk_density: number;
  field_capacity: number;
  watering_threshold: number;
  irrigation_efficiency: number;
  etc_value?: number;
  irrigation_required?: boolean;
  days_to_next_irrigation?: number;
  recommended_irrigation_rate?: number;
}

const saveIrrigationCalculation = async (userId: string, data: IrrigationCalculationData) => {
  const { data: result, error } = await supabase
    .from('irrigation_calculations')
    .insert({
      user_id: userId,
      ...data
    })
    .select()
    .single();
    
  if (error) throw error;
  return result;
};
```

#### Get User Irrigation Calculations
```typescript
const getUserIrrigationCalculations = async (userId: string) => {
  const { data, error } = await supabase
    .from('irrigation_calculations')
    .select(`
      *,
      pet_calculations (
        region_name,
        temperature,
        pet_value,
        temperature_source
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};
```

## Edge Functions

### License Key Activation Function

#### Function Deployment
```typescript
// supabase/functions/decrement-evaluations/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { userId } = await req.json();

    // Decrement user evaluations
    const { data, error } = await supabaseClient
      .from('user_profiles')
      .update({
        additional_evaluations: supabaseClient.raw('additional_evaluations - 1'),
        total_evaluations_used: supabaseClient.raw('total_evaluations_used + 1')
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
```

#### Function Invocation
```typescript
const decrementUserEvaluations = async (userId: string) => {
  const { data, error } = await supabase.functions.invoke('decrement-evaluations', {
    body: { userId }
  });
  
  if (error) throw error;
  return data;
};
```

### License Key Validation

#### Activate License Key
```typescript
const activateLicenseKey = async (keyCode: string, userId: string) => {
  // First, validate the key exists and is not activated
  const { data: keyData, error: keyError } = await supabase
    .from('license_keys')
    .select('*')
    .eq('key_code', keyCode)
    .eq('is_activated', false)
    .single();
    
  if (keyError || !keyData) {
    throw new Error('Invalid or already activated license key');
  }
  
  // Activate the key and update user profile in a transaction
  const { data, error } = await supabase.rpc('activate_license_key', {
    p_key_code: keyCode,
    p_user_id: userId
  });
  
  if (error) throw error;
  return data;
};
```

#### Database Function for License Activation
```sql
CREATE OR REPLACE FUNCTION activate_license_key(
  p_key_code VARCHAR,
  p_user_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_key_record license_keys%ROWTYPE;
  v_result JSON;
BEGIN
  -- Get and lock the license key
  SELECT * INTO v_key_record
  FROM license_keys
  WHERE key_code = p_key_code AND is_activated = FALSE
  FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Invalid or already activated key');
  END IF;
  
  -- Activate the key
  UPDATE license_keys
  SET is_activated = TRUE,
      activated_by = p_user_id,
      activated_at = NOW()
  WHERE key_code = p_key_code;
  
  -- Update user profile
  UPDATE user_profiles
  SET additional_evaluations = additional_evaluations + v_key_record.evaluations
  WHERE id = p_user_id;
  
  -- Return success
  RETURN json_build_object(
    'success', true,
    'evaluations_added', v_key_record.evaluations
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;
```

## External API Integration

### OpenWeatherMap API

#### Weather Data Fetching
```typescript
const OPENWEATHER_API_KEY = 'your_api_key';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
}

const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  
  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed
  };
};
```

#### Regional Coordinates Mapping
```typescript
const REGION_COORDINATES: Record<string, { lat: number; lon: number }> = {
  'Kyiv': { lat: 50.4501, lon: 30.5234 },
  'Kharkiv': { lat: 49.9935, lon: 36.2304 },
  'Odesa': { lat: 46.4825, lon: 30.7233 },
  // ... other regions
};

const getWeatherForRegion = async (regionName: string): Promise<WeatherData> => {
  const coordinates = REGION_COORDINATES[regionName];
  if (!coordinates) {
    throw new Error(`Coordinates not found for region: ${regionName}`);
  }
  
  return fetchWeatherData(coordinates.lat, coordinates.lon);
};
```

## Error Handling

### Database Error Handling
```typescript
interface DatabaseError {
  message: string;
  code?: string;
  details?: string;
}

const handleDatabaseError = (error: any): DatabaseError => {
  // Supabase error handling
  if (error.code) {
    switch (error.code) {
      case '23505': // Unique violation
        return { message: 'Record already exists', code: error.code };
      case '23503': // Foreign key violation
        return { message: 'Referenced record not found', code: error.code };
      case 'PGRST116': // No rows returned
        return { message: 'Record not found', code: error.code };
      default:
        return { message: error.message, code: error.code };
    }
  }
  
  return { message: error.message || 'Unknown database error' };
};
```

### API Error Responses
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data
});

const createErrorResponse = (error: string, code?: string): ApiResponse<never> => ({
  success: false,
  error,
  code
});
```

## Performance Optimization

### Query Optimization
```typescript
// Use select() to limit returned columns
const getCalculationSummary = async (userId: string) => {
  const { data, error } = await supabase
    .from('pet_calculations')
    .select('id, region_name, pet_value, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);
    
  if (error) throw error;
  return data;
};

// Use single() for single record queries
const getLatestCalculation = async (userId: string) => {
  const { data, error } = await supabase
    .from('pet_calculations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
    
  if (error) throw error;
  return data;
};
```

### Caching Strategies
```typescript
// Simple in-memory cache for user profiles
const profileCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedUserProfile = async (userId: string) => {
  const cached = profileCache.get(userId);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const profile = await getUserProfile(userId);
  profileCache.set(userId, { data: profile, timestamp: Date.now() });
  
  return profile;
};
```

## Security Considerations

### Row Level Security (RLS)
- All user data tables have RLS enabled
- Users can only access their own data
- Service role key used for administrative operations

### Input Validation
```typescript
const validatePETCalculationData = (data: any): PETCalculationData => {
  if (!data.region_name || typeof data.region_name !== 'string') {
    throw new Error('Invalid region name');
  }
  
  if (!data.temperature || typeof data.temperature !== 'number') {
    throw new Error('Invalid temperature');
  }
  
  if (data.temperature < -50 || data.temperature > 60) {
    throw new Error('Temperature out of valid range');
  }
  
  return data as PETCalculationData;
};
```

### API Rate Limiting
```typescript
// Simple rate limiting implementation
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (userId: string, maxRequests: number = 100, windowMs: number = 60000) => {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userLimit.count >= maxRequests) {
    return false;
  }
  
  userLimit.count++;
  return true;
};
```

## Testing

### Database Testing
```typescript
// Test database operations
describe('PET Calculations', () => {
  test('should save PET calculation', async () => {
    const testData = {
      region_name: 'Kyiv',
      temperature: 25.5,
      pet_value: 4.2,
      temperature_source: 'manual' as const
    };
    
    const result = await savePETCalculation('test-user-id', testData);
    
    expect(result).toMatchObject(testData);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeDefined();
  });
});
```

### API Integration Testing
```typescript
// Test external API integration
describe('Weather API', () => {
  test('should fetch weather data', async () => {
    const weatherData = await getWeatherForRegion('Kyiv');
    
    expect(weatherData.temperature).toBeGreaterThan(-50);
    expect(weatherData.temperature).toBeLessThan(60);
    expect(weatherData.humidity).toBeGreaterThan(0);
    expect(weatherData.humidity).toBeLessThan(100);
  });
});
```

## Deployment and Monitoring

### Environment Setup
```bash
# Supabase CLI setup
npx supabase init
npx supabase start
npx supabase db push

# Deploy edge functions
npx supabase functions deploy decrement-evaluations
```

### Monitoring and Logging
```typescript
// Custom logging for API operations
const logApiOperation = (operation: string, userId: string, data?: any) => {
  console.log(`[API] ${operation}`, {
    userId,
    timestamp: new Date().toISOString(),
    data: data ? JSON.stringify(data) : undefined
  });
};

// Usage in API functions
const savePETCalculationWithLogging = async (userId: string, data: PETCalculationData) => {
  logApiOperation('SAVE_PET_CALCULATION', userId, data);
  
  try {
    const result = await savePETCalculation(userId, data);
    logApiOperation('SAVE_PET_CALCULATION_SUCCESS', userId);
    return result;
  } catch (error) {
    logApiOperation('SAVE_PET_CALCULATION_ERROR', userId, { error: error.message });
    throw error;
  }
};
```

This API documentation provides comprehensive coverage of the backend integration, database operations, and external API usage in the IrrigAIte UA application.