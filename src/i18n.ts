import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Loads translations from your server
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    debug: process.env.NODE_ENV === 'development',
    
    // Namespace configuration
    ns: ['common', 'calculations', 'pages', 'legal', 'reference'],
    defaultNS: 'common',
    
    // Fallback namespace configuration
    fallbackNS: 'common',
    
    interpolation: {
      escapeValue: false, // React already escapes from XSS
      format: (value, format, lng) => {
        // Enhanced formatting with better error handling and more options
        if (value instanceof Date) {
          const options: Intl.DateTimeFormatOptions = {};
          
          switch (format) {
            case 'short':
              options.year = 'numeric';
              options.month = 'short';
              options.day = 'numeric';
              break;
            case 'long':
              options.year = 'numeric';
              options.month = 'long';
              options.day = 'numeric';
              options.weekday = 'long';
              break;
            case 'datetime':
              options.year = 'numeric';
              options.month = 'short';
              options.day = 'numeric';
              options.hour = '2-digit';
              options.minute = '2-digit';
              break;
            case 'date':
              options.year = 'numeric';
              options.month = '2-digit';
              options.day = '2-digit';
              break;
            case 'time':
              options.hour = '2-digit';
              options.minute = '2-digit';
              break;
            default:
              // Default format based on locale
              if (lng === 'uk') {
                options.year = 'numeric';
                options.month = '2-digit';
                options.day = '2-digit';
              } else {
                options.year = 'numeric';
                options.month = 'short';
                options.day = 'numeric';
              }
          }
          
          try {
            return new Intl.DateTimeFormat(lng, options).format(value);
          } catch (error) {
            console.error('Error formatting date in i18n:', error);
            return value.toLocaleDateString();
          }
        }
        
        if (typeof value === 'number') {
          try {
            if (format === 'currency') {
              return new Intl.NumberFormat(lng, { 
                style: 'currency', 
                currency: lng === 'uk' ? 'UAH' : 'USD' 
              }).format(value);
            }
            if (format === 'decimal') {
              return new Intl.NumberFormat(lng, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              }).format(value);
            }
            if (format === 'percent') {
              return new Intl.NumberFormat(lng, { 
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
              }).format(value / 100);
            }
            if (format === 'integer') {
              return new Intl.NumberFormat(lng, { 
                maximumFractionDigits: 0 
              }).format(value);
            }
            // General number formatting
            return new Intl.NumberFormat(lng).format(value);
          } catch (error) {
            console.error('Error formatting number in i18n:', error);
            return value.toString();
          }
        }
        
        return value;
      },
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // Add error handling for failed namespace loading
      requestOptions: {
        cache: 'default',
      },
      // Retry failed requests
      reloadInterval: false,
      // Custom error handling
      parse: (data: string, url?: string) => {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error(`Failed to parse translation file: ${url}`, error);
          return {};
        }
      },
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    // Preload all namespaces for better performance
    preload: ['en', 'uk'],
    
    // Load all namespaces by default
    load: 'languageOnly',
    
    // Namespace loading configuration
    partialBundledLanguages: true,
    
    // Error handling configuration
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${ns}:${key} for language: ${lng}`);
      }
    },
    
    // Ensure graceful fallback for missing namespaces
    saveMissing: false,
    updateMissing: false,
  });

// Add event listeners for namespace loading and error handling
i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`Failed to load namespace ${ns} for language ${lng}:`, msg);
});

i18n.on('missingKey', (lng, namespace, key, res) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Missing key "${key}" in namespace "${namespace}" for language "${lng}"`);
  }
});

i18n.on('loaded', (loaded) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Loaded namespaces:', Object.keys(loaded));
  }
});

// Ensure all namespaces are loaded on initialization
i18n.on('initialized', () => {
  const requiredNamespaces = ['common', 'calculations', 'pages', 'legal', 'reference'];
  const currentLanguage = i18n.language;
  
  requiredNamespaces.forEach(ns => {
    if (!i18n.hasResourceBundle(currentLanguage, ns)) {
      console.warn(`Namespace "${ns}" not loaded for language "${currentLanguage}"`);
      // Attempt to load the missing namespace
      i18n.loadNamespaces(ns);
    }
  });
});

export default i18n;