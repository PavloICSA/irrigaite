import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ManualTemperatureInputProps {
  temperature: number | null;
  onTemperatureChange: (temperature: number | null) => void;
  error?: string;
}

export const ManualTemperatureInput: React.FC<ManualTemperatureInputProps> = ({
  temperature,
  onTemperatureChange,
  error
}) => {
  const { t } = useTranslation('calculations');
  const [inputValue, setInputValue] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Sync input value with prop
  useEffect(() => {
    if (temperature !== null) {
      setInputValue(temperature.toString());
    } else {
      setInputValue('');
    }
  }, [temperature]);

  const validateTemperature = (value: string): string => {
    if (!value.trim()) {
      return t('temperatureInput.validation.required');
    }

    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      return t('temperatureInput.validation.invalidFormat');
    }

    if (numValue < 0 || numValue > 60) {
      return t('temperatureInput.validation.invalidRange');
    }

    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Real-time validation
    const errorMessage = validateTemperature(value);
    setValidationError(errorMessage);

    if (!errorMessage && value.trim()) {
      const numValue = parseFloat(value);
      onTemperatureChange(numValue);
    } else {
      onTemperatureChange(null);
    }
  };

  const handleBlur = () => {
    // Additional validation on blur
    if (inputValue.trim()) {
      const errorMessage = validateTemperature(inputValue);
      setValidationError(errorMessage);
    }
  };

  const displayError = error || validationError;

  return (
    <div className="space-y-3">
      <label 
        htmlFor="manual-temperature"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {t('temperatureInput.manualInput.label')}
      </label>
      
      <div className="relative">
        <input
          id="manual-temperature"
          type="number"
          min="0"
          max="60"
          step="0.1"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={t('temperatureInput.manualInput.placeholder')}
          className={`
            w-full px-3 py-3 pr-12 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            ${displayError 
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
            }
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            transition-colors
          `}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? 'temperature-error' : undefined}
        />
        
        {/* Celsius unit display */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {t('temperatureInput.manualInput.unit')}
          </span>
        </div>
      </div>

      {/* Error message display */}
      {displayError && (
        <p 
          id="temperature-error"
          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2"
          role="alert"
        >
          <svg 
            className="w-4 h-4 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          {displayError}
        </p>
      )}

      {/* Helper text when no error */}
      {!displayError && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t('temperatureInput.manualInput.helperText', 'Enter temperature between 0°C and 60°C')}
        </p>
      )}
    </div>
  );
};