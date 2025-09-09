/**
 * Utility functions for persisting temperature input mode preferences
 */

export type TemperatureInputMode = 'realtime' | 'manual';

const STORAGE_KEY = 'temperatureInputMode';
const DEFAULT_MODE: TemperatureInputMode = 'realtime';

/**
 * Saves the temperature input mode to localStorage
 * @param mode - The temperature input mode to save
 * @returns boolean indicating success
 */
export const saveTemperatureInputMode = (mode: TemperatureInputMode): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
    return true;
  } catch (error) {
    console.warn('Failed to save temperature input mode to localStorage:', error);
    return false;
  }
};

/**
 * Loads the temperature input mode from localStorage
 * @returns The saved temperature input mode or default mode if not found/error
 */
export const loadTemperatureInputMode = (): TemperatureInputMode => {
  try {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    
    // Validate that the saved mode is a valid TemperatureInputMode
    if (savedMode === 'realtime' || savedMode === 'manual') {
      return savedMode;
    }
    
    // If invalid or null, return default
    return DEFAULT_MODE;
  } catch (error) {
    console.warn('Failed to load temperature input mode from localStorage:', error);
    return DEFAULT_MODE;
  }
};

/**
 * Clears the temperature input mode from localStorage
 * @returns boolean indicating success
 */
export const clearTemperatureInputMode = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('Failed to clear temperature input mode from localStorage:', error);
    return false;
  }
};

/**
 * Checks if localStorage is available
 * @returns boolean indicating localStorage availability
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};