import i18n from '../i18n';

/**
 * Utility functions for i18n namespace management and validation
 */

export const REQUIRED_NAMESPACES = ['common', 'calculations', 'pages', 'legal', 'reference'] as const;
export type RequiredNamespace = typeof REQUIRED_NAMESPACES[number];

/**
 * Check if a namespace is loaded for the current language
 */
export const isNamespaceLoaded = (namespace: string, language?: string): boolean => {
  const lng = language || i18n.language;
  return i18n.hasResourceBundle(lng, namespace);
};

/**
 * Check if all required namespaces are loaded for the current language
 */
export const areAllNamespacesLoaded = (language?: string): boolean => {
  const lng = language || i18n.language;
  return REQUIRED_NAMESPACES.every(ns => i18n.hasResourceBundle(lng, ns));
};

/**
 * Load a specific namespace if it's not already loaded
 */
export const ensureNamespaceLoaded = async (namespace: string): Promise<void> => {
  if (!isNamespaceLoaded(namespace)) {
    try {
      await i18n.loadNamespaces(namespace);
    } catch (error) {
      console.error(`Failed to load namespace ${namespace}:`, error);
    }
  }
};

/**
 * Load all required namespaces
 */
export const ensureAllNamespacesLoaded = async (): Promise<void> => {
  const unloadedNamespaces = REQUIRED_NAMESPACES.filter(ns => !isNamespaceLoaded(ns));
  
  if (unloadedNamespaces.length > 0) {
    try {
      await i18n.loadNamespaces(unloadedNamespaces);
    } catch (error) {
      console.error('Failed to load some namespaces:', error);
    }
  }
};

/**
 * Get the status of all namespaces for debugging
 */
export const getNamespaceStatus = (language?: string): Record<string, boolean> => {
  const lng = language || i18n.language;
  const status: Record<string, boolean> = {};
  
  REQUIRED_NAMESPACES.forEach(ns => {
    status[ns] = i18n.hasResourceBundle(lng, ns);
  });
  
  return status;
};

/**
 * Validate that a translation key exists in a specific namespace
 */
export const hasTranslationKey = (key: string, namespace?: string): boolean => {
  try {
    const translation = namespace ? i18n.t(`${namespace}:${key}`) : i18n.t(key);
    // If the translation equals the key, it means the key doesn't exist
    return translation !== key;
  } catch {
    return false;
  }
};

/**
 * Get translation with enhanced error handling and fallback
 */
export const getTranslationSafe = (
  key: string, 
  options?: { 
    namespace?: string; 
    defaultValue?: string; 
    fallbackLng?: string;
  }
): string => {
  try {
    const fullKey = options?.namespace ? `${options.namespace}:${key}` : key;
    const translation = i18n.t(fullKey, {
      defaultValue: options?.defaultValue,
      lng: options?.fallbackLng,
    });
    
    // If translation equals the key and no default value, try English fallback
    if (translation === fullKey && !options?.defaultValue && i18n.language !== 'en') {
      return i18n.t(fullKey, { lng: 'en' });
    }
    
    return translation;
  } catch (error) {
    console.error(`Error getting translation for key "${key}":`, error);
    return options?.defaultValue || key;
  }
};