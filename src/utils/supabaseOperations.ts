import { supabase } from '../lib/supabaseClient';

export interface UserCalculation {
  id: string;
  user_id: string;
  calculation_type: 'PET' | 'Irrigation';
  region_name: string;
  temperature?: number;
  pet_value?: number;
  crop_name?: string;
  planting_date?: string;
  calculation_date?: string;
  gsm?: number;
  al?: number;
  bd?: number;
  fc?: number;
  watering_threshold?: number;
  irrigation_efficiency?: number;
  etc?: number;
  status?: string;
  days_to_next_irrigation?: number;
  recommended_irrigation_rate?: number;
  created_at: string;
}

export interface PETCalculationData {
  region_name: string;
  temperature: number;
  pet_value: number;
}

export interface IrrigationCalculationData {
  region_name: string;
  temperature: number;
  pet_value: number;
  crop_name: string;
  planting_date: string;
  current_date: string;
  gsm: number;
  al: number;
  bd: number;
  fc: number;
  watering_threshold: number;
  irrigation_efficiency: number;
  etc: number;
  status: string;
  days_to_next_irrigation?: number;
  recommended_irrigation_rate?: number;
}

export const savePETCalculation = async (
  userId: string,
  data: PETCalculationData
) => {
  const { data: result, error } = await supabase
    .from('user_calculations')
    .insert({
      user_id: userId,
      calculation_type: 'PET',
      region_name: data.region_name,
      temperature: data.temperature,
      pet_value: data.pet_value,
    })
    .select()
    .single();

  return { data: result, error };
};

export const saveIrrigationCalculation = async (
  userId: string,
  data: IrrigationCalculationData
) => {
  const { data: result, error } = await supabase
    .from('user_calculations')
    .insert({
      user_id: userId,
      calculation_type: 'Irrigation',
      region_name: data.region_name,
      temperature: data.temperature,
      pet_value: data.pet_value,
      crop_name: data.crop_name,
      planting_date: data.planting_date,
      current_date: data.current_date,
      gsm: data.gsm,
      al: data.al,
      bd: data.bd,
      fc: data.fc,
      watering_threshold: data.watering_threshold,
      irrigation_efficiency: data.irrigation_efficiency,
      etc: data.etc,
      status: data.status,
      days_to_next_irrigation: data.days_to_next_irrigation,
      recommended_irrigation_rate: data.recommended_irrigation_rate,
    })
    .select()
    .single();

  return { data: result, error };
};

export const getUserCalculations = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_calculations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const deleteUserCalculation = async (calculationId: string) => {
  const { error } = await supabase
    .from('user_calculations')
    .delete()
    .eq('id', calculationId);

  return { error };
};

export const activateLicenseKey = async (userId: string, keyString: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('activate-license-key', {
      method: 'POST',
      body: { userId, keyString },
    });

    if (error) {
      console.error('Error invoking activate-license-key function:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error during license key activation:', err);
    return { data: null, error: new Error('An unexpected error occurred during activation.') };
  }
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  return { data, error };
};