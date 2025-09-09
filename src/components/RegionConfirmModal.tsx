import React from 'react';
import { X, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RegionConfirmModalProps {
  isOpen: boolean;
  regionName: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  isOccupied?: boolean;
  temperatureInputMode?: 'realtime' | 'manual';
  manualTemperature?: number | null;
}

const RegionConfirmModal: React.FC<RegionConfirmModalProps> = ({
  isOpen,
  regionName,
  onConfirm,
  onCancel,
  temperatureInputMode = 'realtime',
  manualTemperature = null
}) => {
  const { t } = useTranslation(['calculations', 'common']);
  
  if (!isOpen || !regionName) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">{t('petEvaluation.confirmRegionSelection')}</h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {t('petEvaluation.youSelected')} <span className="font-medium text-green-600 dark:text-green-400">{t(`common:regionSelector.regions.${regionName}`)}</span>.
          </p>
          
          {/* Temperature Source Information */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">{t('petEvaluation.calculationDetails')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('temperatureInput.modeSelector.title')}:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {temperatureInputMode === 'manual' 
                    ? t('temperatureInput.source.manual')
                    : t('temperatureInput.source.realtime')
                  }
                </span>
              </div>
              {temperatureInputMode === 'manual' && manualTemperature !== null && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('common:common.temperature')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{manualTemperature}°C</span>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            {t('petEvaluation.proceedWithCalculation')}
          </p>
          
          <div className="flex space-x-4">
            <button
              onClick={onConfirm}
              className="flex-1 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 font-medium transition-colors"
            >
              {t('petEvaluation.yesContinue')}
            </button>
            <button
              onClick={onCancel} 
              className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-6 py-3 font-medium transition-colors border border-gray-300 dark:border-gray-500"
            >
              {t('petEvaluation.cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionConfirmModal;