/**
 * Translation utilities index
 * Exports all translation-related utilities for easy importing
 */

// Enhanced translation hook
export { default as useEnhancedTranslation } from '../hooks/useEnhancedTranslation';

// Translation validation utilities
export {
  flattenTranslationKeys,
  findEmptyTranslations,
  compareTranslationKeys,
  validateTranslationCompleteness,
  validateAllTranslations,
  generateValidationReport,
  logTranslationValidation
} from './translationValidation';

// Error boundary components
export { default as TranslationErrorBoundary, withTranslationErrorBoundary } from '../components/TranslationErrorBoundary';

// Type definitions for translation utilities
export interface TranslationValidationResult {
  isValid: boolean;
  missingKeys: string[];
  extraKeys: string[];
  emptyValues: string[];
}

export interface ValidationReport {
  [namespace: string]: {
    [language: string]: TranslationValidationResult;
  };
}

export interface EnhancedTranslationOptions {
  fallbackLng?: string;
  logMissing?: boolean;
}