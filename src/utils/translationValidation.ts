/**
 * Translation validation utilities for development
 * Helps ensure translation completeness and consistency
 */

interface TranslationValidationResult {
  isValid: boolean;
  missingKeys: string[];
  extraKeys: string[];
  emptyValues: string[];
}

interface ValidationReport {
  [namespace: string]: {
    [language: string]: TranslationValidationResult;
  };
}

/**
 * Flatten nested translation object into dot-notation keys
 * @param obj - Translation object
 * @param prefix - Key prefix for recursion
 * @returns Array of flattened keys
 */
export const flattenTranslationKeys = (obj: any, prefix = ''): string[] => {
  const keys: string[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...flattenTranslationKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  
  return keys;
};

/**
 * Find empty or missing translation values
 * @param obj - Translation object
 * @param prefix - Key prefix for recursion
 * @returns Array of keys with empty values
 */
export const findEmptyTranslations = (obj: any, prefix = ''): string[] => {
  const emptyKeys: string[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        emptyKeys.push(...findEmptyTranslations(obj[key], fullKey));
      } else if (!obj[key] || (typeof obj[key] === 'string' && obj[key].trim() === '')) {
        emptyKeys.push(fullKey);
      }
    }
  }
  
  return emptyKeys;
};

/**
 * Compare two sets of translation keys and find differences
 * @param baseKeys - Base set of keys (usually English)
 * @param compareKeys - Keys to compare against base
 * @returns Validation result with missing and extra keys
 */
export const compareTranslationKeys = (
  baseKeys: string[],
  compareKeys: string[]
): { missingKeys: string[]; extraKeys: string[] } => {
  const missingKeys = baseKeys.filter(key => !compareKeys.includes(key));
  const extraKeys = compareKeys.filter(key => !baseKeys.includes(key));
  
  return { missingKeys, extraKeys };
};

/**
 * Validate translation completeness between languages
 * @param baseTranslations - Base translations (usually English)
 * @param targetTranslations - Target translations to validate
 * @returns Validation result
 */
export const validateTranslationCompleteness = (
  baseTranslations: any,
  targetTranslations: any
): TranslationValidationResult => {
  const baseKeys = flattenTranslationKeys(baseTranslations);
  const targetKeys = flattenTranslationKeys(targetTranslations);
  const emptyValues = findEmptyTranslations(targetTranslations);
  
  const { missingKeys, extraKeys } = compareTranslationKeys(baseKeys, targetKeys);
  
  return {
    isValid: missingKeys.length === 0 && emptyValues.length === 0,
    missingKeys,
    extraKeys,
    emptyValues
  };
};

/**
 * Load and validate all translation files (for development use)
 * This function would typically be used in development scripts or tests
 */
export const validateAllTranslations = async (): Promise<ValidationReport> => {
  const namespaces = ['common', 'calculations', 'pages', 'legal', 'reference'];
  const languages = ['en', 'uk'];
  const report: ValidationReport = {};
  
  for (const namespace of namespaces) {
    report[namespace] = {};
    
    try {
      // Load English translations as base
      const enResponse = await fetch(`/locales/en/${namespace}.json`);
      const enTranslations = await enResponse.json();
      
      for (const language of languages) {
        if (language === 'en') {
          // Validate English for empty values
          const emptyValues = findEmptyTranslations(enTranslations);
          report[namespace][language] = {
            isValid: emptyValues.length === 0,
            missingKeys: [],
            extraKeys: [],
            emptyValues
          };
        } else {
          // Validate other languages against English
          try {
            const response = await fetch(`/locales/${language}/${namespace}.json`);
            const translations = await response.json();
            
            report[namespace][language] = validateTranslationCompleteness(
              enTranslations,
              translations
            );
          } catch (error) {
            console.error(`Failed to load ${language}/${namespace}.json:`, error);
            report[namespace][language] = {
              isValid: false,
              missingKeys: flattenTranslationKeys(enTranslations),
              extraKeys: [],
              emptyValues: []
            };
          }
        }
      }
    } catch (error) {
      console.error(`Failed to load base translations for ${namespace}:`, error);
    }
  }
  
  return report;
};

/**
 * Generate a human-readable validation report
 * @param report - Validation report from validateAllTranslations
 * @returns Formatted report string
 */
export const generateValidationReport = (report: ValidationReport): string => {
  let output = '=== Translation Validation Report ===\n\n';
  
  for (const [namespace, languages] of Object.entries(report)) {
    output += `Namespace: ${namespace}\n`;
    output += '─'.repeat(50) + '\n';
    
    for (const [language, result] of Object.entries(languages)) {
      output += `  ${language.toUpperCase()}: ${result.isValid ? '✅ Valid' : '❌ Issues Found'}\n`;
      
      if (result.missingKeys.length > 0) {
        output += `    Missing keys (${result.missingKeys.length}):\n`;
        result.missingKeys.slice(0, 5).forEach(key => {
          output += `      - ${key}\n`;
        });
        if (result.missingKeys.length > 5) {
          output += `      ... and ${result.missingKeys.length - 5} more\n`;
        }
      }
      
      if (result.extraKeys.length > 0) {
        output += `    Extra keys (${result.extraKeys.length}):\n`;
        result.extraKeys.slice(0, 3).forEach(key => {
          output += `      + ${key}\n`;
        });
        if (result.extraKeys.length > 3) {
          output += `      ... and ${result.extraKeys.length - 3} more\n`;
        }
      }
      
      if (result.emptyValues.length > 0) {
        output += `    Empty values (${result.emptyValues.length}):\n`;
        result.emptyValues.slice(0, 3).forEach(key => {
          output += `      ∅ ${key}\n`;
        });
        if (result.emptyValues.length > 3) {
          output += `      ... and ${result.emptyValues.length - 3} more\n`;
        }
      }
      
      output += '\n';
    }
    
    output += '\n';
  }
  
  return output;
};

/**
 * Development helper to log translation validation results
 * Only runs in development mode
 */
export const logTranslationValidation = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  
  try {
    const report = await validateAllTranslations();
    const formattedReport = generateValidationReport(report);
    
    console.group('🌐 Translation Validation');
    console.log(formattedReport);
    console.groupEnd();
    
    // Check if there are any issues
    const hasIssues = Object.values(report).some(namespace =>
      Object.values(namespace).some(result => !result.isValid)
    );
    
    if (hasIssues) {
      console.warn('⚠️ Translation issues detected. Check the report above.');
    } else {
      console.log('✅ All translations are valid!');
    }
  } catch (error) {
    console.error('Failed to validate translations:', error);
  }
};