import React from 'react';
import { useTranslation } from 'react-i18next';

export type TemperatureInputMode = 'realtime' | 'manual';

interface TemperatureInputModeSelectorProps {
  selectedMode: TemperatureInputMode;
  onModeChange: (mode: TemperatureInputMode) => void;
}

export const TemperatureInputModeSelector: React.FC<TemperatureInputModeSelectorProps> = ({
  selectedMode,
  onModeChange,
}) => {
  const { t } = useTranslation('calculations');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('temperatureInput.modeSelector.title')}
      </h3>
      
      <div className="space-y-4">
        {/* Real-time Mode Option */}
        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            type="radio"
            name="temperatureMode"
            value="realtime"
            checked={selectedMode === 'realtime'}
            onChange={() => onModeChange('realtime')}
            className="mt-1 h-4 w-4 text-green-600 border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:ring-2"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {t('temperatureInput.modeSelector.realtime')}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('temperatureInput.modeSelector.realtimeDescription')}
            </div>
          </div>
        </label>

        {/* Manual Mode Option */}
        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            type="radio"
            name="temperatureMode"
            value="manual"
            checked={selectedMode === 'manual'}
            onChange={() => onModeChange('manual')}
            className="mt-1 h-4 w-4 text-green-600 border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:ring-2"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {t('temperatureInput.modeSelector.manual')}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('temperatureInput.modeSelector.manualDescription')}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};