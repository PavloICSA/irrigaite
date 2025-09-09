import i18n from '../i18n';

/**
 * Enhanced locale-specific formatting utilities for dates, numbers, and currency
 */

export interface DateFormatOptions {
  format?: 'short' | 'long' | 'datetime' | 'date' | 'time' | 'relative';
  locale?: string;
}

export interface NumberFormatOptions {
  format?: 'decimal' | 'currency' | 'percent' | 'integer';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currency?: string;
  locale?: string;
}

/**
 * Format dates according to the current locale with enhanced options
 */
export const formatDate = (date: Date | string, options: DateFormatOptions = {}): string => {
  if (!date) {
    return '';
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const locale = options.locale || (i18n && i18n.language) || 'en';
  
  if (!dateObj || isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatDate:', date);
    return '';
  }

  const formatOptions: Intl.DateTimeFormatOptions = {};

  switch (options.format) {
    case 'short':
      formatOptions.year = 'numeric';
      formatOptions.month = 'short';
      formatOptions.day = 'numeric';
      break;
    case 'long':
      formatOptions.year = 'numeric';
      formatOptions.month = 'long';
      formatOptions.day = 'numeric';
      formatOptions.weekday = 'long';
      break;
    case 'datetime':
      formatOptions.year = 'numeric';
      formatOptions.month = 'short';
      formatOptions.day = 'numeric';
      formatOptions.hour = '2-digit';
      formatOptions.minute = '2-digit';
      break;
    case 'date':
      formatOptions.year = 'numeric';
      formatOptions.month = '2-digit';
      formatOptions.day = '2-digit';
      break;
    case 'time':
      formatOptions.hour = '2-digit';
      formatOptions.minute = '2-digit';
      break;
    case 'relative':
      return formatRelativeDate(dateObj, locale);
    default:
      // Default format based on locale
      if (locale === 'uk') {
        formatOptions.year = 'numeric';
        formatOptions.month = '2-digit';
        formatOptions.day = '2-digit';
      } else {
        formatOptions.year = 'numeric';
        formatOptions.month = 'short';
        formatOptions.day = 'numeric';
      }
  }

  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateObj.toLocaleDateString();
  }
};

/**
 * Format relative dates (e.g., "2 days ago", "in 3 hours")
 */
export const formatRelativeDate = (date: Date | string, locale?: string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const currentLocale = locale || (i18n && i18n.language) || 'en';
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  try {
    const rtf = new Intl.RelativeTimeFormat(currentLocale, { numeric: 'auto' });
    
    if (Math.abs(diffInSeconds) < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (Math.abs(diffInSeconds) < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (Math.abs(diffInSeconds) < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (Math.abs(diffInSeconds) < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (Math.abs(diffInSeconds) < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return formatDate(dateObj, { format: 'short', locale: currentLocale });
  }
};

/**
 * Format numbers according to the current locale with enhanced options
 */
export const formatNumber = (value: number, options: NumberFormatOptions = {}): string => {
  const locale = options.locale || (i18n && i18n.language) || 'en';
  
  if (typeof value !== 'number' || isNaN(value)) {
    console.warn('Invalid number provided to formatNumber:', value);
    return '0';
  }

  const formatOptions: Intl.NumberFormatOptions = {};

  switch (options.format) {
    case 'currency':
      formatOptions.style = 'currency';
      formatOptions.currency = options.currency || (locale === 'uk' ? 'UAH' : 'USD');
      break;
    case 'percent':
      formatOptions.style = 'percent';
      formatOptions.minimumFractionDigits = options.minimumFractionDigits ?? 1;
      formatOptions.maximumFractionDigits = options.maximumFractionDigits ?? 1;
      // Convert to percentage (divide by 100 since Intl.NumberFormat multiplies by 100)
      value = value / 100;
      break;
    case 'decimal':
      formatOptions.minimumFractionDigits = options.minimumFractionDigits ?? 2;
      formatOptions.maximumFractionDigits = options.maximumFractionDigits ?? 2;
      break;
    case 'integer':
      formatOptions.maximumFractionDigits = 0;
      break;
    default:
      // Use provided fraction digits or defaults
      if (options.minimumFractionDigits !== undefined) {
        formatOptions.minimumFractionDigits = options.minimumFractionDigits;
      }
      if (options.maximumFractionDigits !== undefined) {
        formatOptions.maximumFractionDigits = options.maximumFractionDigits;
      }
  }

  try {
    return new Intl.NumberFormat(locale, formatOptions).format(value);
  } catch (error) {
    console.error('Error formatting number:', error);
    return value.toString();
  }
};

/**
 * Format currency with locale-specific currency codes
 */
export const formatCurrency = (value: number, currency?: string, locale?: string): string => {
  const currentLocale = locale || (i18n && i18n.language) || 'en';
  const currencyCode = currency || (currentLocale === 'uk' ? 'UAH' : 'USD');
  
  return formatNumber(value, {
    format: 'currency',
    currency: currencyCode,
    locale: currentLocale
  });
};

/**
 * Format percentage values
 */
export const formatPercentage = (value: number, fractionDigits: number = 1, locale?: string): string => {
  return formatNumber(value, {
    format: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    locale
  });
};

/**
 * Format decimal numbers with specified precision
 */
export const formatDecimal = (value: number, fractionDigits: number = 2, locale?: string): string => {
  return formatNumber(value, {
    format: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    locale
  });
};

/**
 * Format integers (no decimal places)
 */
export const formatInteger = (value: number, locale?: string): string => {
  return formatNumber(value, {
    format: 'integer',
    locale
  });
};

/**
 * Format file sizes in bytes to human-readable format
 */
export const formatFileSize = (bytes: number, locale?: string): string => {
  const currentLocale = locale || (i18n && i18n.language) || 'en';
  
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  const value = bytes / Math.pow(k, i);
  const formattedValue = formatDecimal(value, i === 0 ? 0 : 1, currentLocale);
  
  return `${formattedValue} ${sizes[i]}`;
};

/**
 * Format temperature with locale-specific units
 */
export const formatTemperature = (celsius: number, locale?: string): string => {
  const currentLocale = locale || (i18n && i18n.language) || 'en';
  const formattedValue = formatDecimal(celsius, 1, currentLocale);
  
  // Use Celsius for both locales as it's standard in Ukraine and scientific contexts
  return `${formattedValue}°C`;
};

/**
 * Format agricultural measurements (mm, mm/day, etc.)
 */
export const formatAgriculturalMeasurement = (
  value: number, 
  unit: 'mm' | 'mm/day' | 'cm' | 'm' | 'l/m²' | '%',
  fractionDigits: number = 2,
  locale?: string
): string => {
  const currentLocale = locale || (i18n && i18n.language) || 'en';
  const formattedValue = formatDecimal(value, fractionDigits, currentLocale);
  
  // Get unit translation from i18n
  const unitKey = `common:units.${unit.replace('/', 'Per')}`;
  const translatedUnit = i18n && i18n.t ? i18n.t(unitKey) : unit;
  
  // If translation not found, use the original unit
  const displayUnit = translatedUnit !== unitKey ? translatedUnit : unit;
  
  return `${formattedValue} ${displayUnit}`;
};

/**
 * Format coordinates (latitude/longitude)
 */
export const formatCoordinate = (value: number, type: 'lat' | 'lng', locale?: string): string => {
  const currentLocale = locale || (i18n && i18n.language) || 'en';
  const formattedValue = formatDecimal(Math.abs(value), 6, currentLocale);
  
  let direction = '';
  if (type === 'lat') {
    direction = value >= 0 ? 'N' : 'S';
  } else {
    direction = value >= 0 ? 'E' : 'W';
  }
  
  return `${formattedValue}° ${direction}`;
};

/**
 * Enhanced date formatting for Ukrainian locale with proper month names
 */
export const formatDateUkrainian = (date: Date | string, format: 'short' | 'long' | 'datetime' = 'short'): string => {
  return formatDate(date, { format, locale: 'uk' });
};

/**
 * Enhanced date formatting for English locale
 */
export const formatDateEnglish = (date: Date | string, format: 'short' | 'long' | 'datetime' = 'short'): string => {
  return formatDate(date, { format, locale: 'en' });
};