import { useTranslation } from 'react-i18next';

interface EnhancedTranslationOptions {
  fallbackLng?: string;
  logMissing?: boolean;
}

/**
 * Enhanced translation hook with fallback mechanisms and error handling
 * Provides graceful fallbacks when translations are missing
 */
export const useEnhancedTranslation = (
  namespaces: string | string[],
  options: EnhancedTranslationOptions = {}
) => {
  const { t, i18n, ready } = useTranslation(namespaces);
  const { fallbackLng = 'en', logMissing = process.env.NODE_ENV === 'development' } = options;

  /**
   * Enhanced translation function with fallback mechanisms
   * @param key - Translation key
   * @param defaultText - Default text to show if translation is missing
   * @param interpolationOptions - i18next interpolation options
   * @returns Translated text or fallback
   */
  const tWithFallback = (
    key: string,
    defaultText?: string,
    interpolationOptions?: any
  ): string => {
    try {
      // First attempt: Get translation in current language
      const translation = t(key, interpolationOptions);
      
      // Check if translation is missing (i18next returns the key when translation is not found)
      if (translation === key) {
        if (logMissing) {
          console.warn(`Missing translation for key: "${key}" in language: "${i18n.language}"`);
        }
        
        // Second attempt: Try fallback language if current language is not the fallback
        if (i18n.language !== fallbackLng) {
          const fallbackTranslation = t(key, { ...interpolationOptions, lng: fallbackLng });
          
          if (fallbackTranslation !== key) {
            if (logMissing) {
              console.info(`Using fallback translation for key: "${key}" from language: "${fallbackLng}"`);
            }
            return fallbackTranslation;
          }
        }
        
        // Third attempt: Use provided default text
        if (defaultText) {
          if (logMissing) {
            console.info(`Using default text for key: "${key}"`);
          }
          return defaultText;
        }
        
        // Final fallback: Return the key itself (better than empty string)
        if (logMissing) {
          console.error(`No translation or fallback available for key: "${key}"`);
        }
        return key;
      }
      
      return translation;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return defaultText || key;
    }
  };

  /**
   * Check if a translation key exists in the current language
   * @param key - Translation key to check
   * @returns boolean indicating if translation exists
   */
  const hasTranslation = (key: string): boolean => {
    try {
      const translation = t(key);
      return translation !== key;
    } catch {
      return false;
    }
  };

  /**
   * Get translation with type safety for interpolation
   * @param key - Translation key
   * @param values - Interpolation values
   * @param defaultText - Default text if translation missing
   * @returns Translated text
   */
  const tSafe = <T extends Record<string, any>>(
    key: string,
    values?: T,
    defaultText?: string
  ): string => {
    return tWithFallback(key, defaultText, values);
  };

  return {
    t: tWithFallback,
    tSafe,
    hasTranslation,
    i18n,
    ready,
    currentLanguage: i18n.language,
    isLoading: !ready
  };
};

export default useEnhancedTranslation;