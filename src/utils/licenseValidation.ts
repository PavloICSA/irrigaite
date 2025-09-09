import { supabase } from '../lib/supabaseClient';

export interface LicenseValidationResult {
  canProceed: boolean;
  remainingEvaluations: number;
  error?: string;
}

/**
 * Checks if user has used their daily free evaluation
 * @param userId - The user's ID
 * @returns Promise<boolean> - True if daily free evaluation is available
 */
const checkDailyFreeEvaluation = async (userId: string): Promise<boolean> => {
  // Temporarily disable daily free evaluation to ensure paid evaluations decrement properly
  return false;
  
  /* Original implementation - commented out for now
  try {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    const { data: dailyUsage, error } = await supabase
      .from('daily_evaluations')
      .select('*')
      .eq('user_id', userId)
      .eq('evaluation_date', today)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Error checking daily free evaluation:', error);
      return false;
    }

    // If no record exists, daily free evaluation is available
    return !dailyUsage;
  } catch (error) {
    console.error('Unexpected error checking daily free evaluation:', error);
    return false;
  }
  */
};

/**
 * Validates if a user can perform a PET calculation based on their license status
 * @param userId - The user's ID
 * @param temperatureInputMode - The temperature input mode ('realtime' or 'manual')
 * @returns Promise<LicenseValidationResult>
 */
export const validateLicenseForCalculation = async (
  userId: string,
  temperatureInputMode: 'realtime' | 'manual'
): Promise<LicenseValidationResult> => {
  try {
    // Manual temperature calculations bypass license validation
    if (temperatureInputMode === 'manual') {
      return {
        canProceed: true,
        remainingEvaluations: -1, // -1 indicates unlimited for manual mode
      };
    }

    // For real-time mode, check license status and daily free evaluation
    const { data: userProfile, error } = await supabase
      .from('user_profiles')
      .select('additional_evaluations')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile for license validation:', error);
      return {
        canProceed: false,
        remainingEvaluations: 0,
        error: 'Failed to validate license status',
      };
    }

    const remainingEvaluations = userProfile?.additional_evaluations || 0;
    
    // Check if user has daily free evaluation available
    const hasDailyFree = await checkDailyFreeEvaluation(userId);
    
    // User can proceed if they have paid evaluations OR daily free evaluation
    const canProceed = remainingEvaluations > 0 || hasDailyFree;

    return {
      canProceed,
      remainingEvaluations,
    };
  } catch (error) {
    console.error('Unexpected error during license validation:', error);
    return {
      canProceed: false,
      remainingEvaluations: 0,
      error: 'An unexpected error occurred during license validation',
    };
  }
};



/**
 * Decrements the user's evaluation count after a successful calculation
 * Only applies to real-time mode calculations
 * @param userId - The user's ID
 * @param temperatureInputMode - The temperature input mode ('realtime' or 'manual')
 * @returns Promise<{success: boolean, remainingEvaluations?: number, usedDailyFree?: boolean}> - Success status and remaining count
 */
export const decrementEvaluationCount = async (
  userId: string,
  temperatureInputMode: 'realtime' | 'manual'
): Promise<{success: boolean, remainingEvaluations?: number, usedDailyFree?: boolean}> => {
  try {
    // Manual temperature calculations don't consume evaluations
    if (temperatureInputMode === 'manual') {
      return { success: true };
    }

    console.log('🔄 Starting evaluation count decrement');
    console.log('User ID:', userId);

    // Get current evaluation count
    const { data: currentProfile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('additional_evaluations')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError) {
      console.error('❌ Error fetching current profile:', fetchError);
      return { success: false };
    }

    if (!currentProfile) {
      console.error('❌ User profile not found');
      return { success: false };
    }

    const currentEvaluations = currentProfile.additional_evaluations || 0;
    console.log('📊 Current evaluations:', currentEvaluations);

    // Check if user has evaluations to decrement
    if (currentEvaluations <= 0) {
      console.log('❌ No evaluations remaining to decrement');
      return { success: false };
    }

    // Decrement evaluation count directly
    const newCount = currentEvaluations - 1;
    console.log('📉 Decrementing from', currentEvaluations, 'to', newCount);

    const { data: updatedProfile, error: updateError } = await supabase
      .from('user_profiles')
      .update({
        additional_evaluations: newCount,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select('additional_evaluations')
      .single();

    if (updateError) {
      console.error('❌ Error updating evaluation count:', updateError);
      return { success: false };
    }

    console.log('✅ Successfully decremented evaluation count');
    console.log('📊 New count:', updatedProfile.additional_evaluations);

    return {
      success: true,
      remainingEvaluations: updatedProfile.additional_evaluations,
      usedDailyFree: false
    };
  } catch (error) {
    console.error('❌ Unexpected error during evaluation count decrement:', error);
    return { success: false };
  }
};

/**
 * Gets the current evaluation count for a user
 * @param userId - The user's ID
 * @returns Promise<number> - Current evaluation count
 */
export const getCurrentEvaluationCount = async (userId: string): Promise<number> => {
  try {
    const { data: userProfile, error } = await supabase
      .from('user_profiles')
      .select('additional_evaluations')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching evaluation count:', error);
      return 0;
    }

    return userProfile?.additional_evaluations || 0;
  } catch (error) {
    console.error('Unexpected error fetching evaluation count:', error);
    return 0;
  }
};