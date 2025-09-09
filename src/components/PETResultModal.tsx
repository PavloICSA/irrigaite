import React from 'react';
import { X, Thermometer, Droplets, Calculator, Save, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { savePETCalculation } from '../utils/supabaseOperations';
import { formatDecimal, formatTemperature } from '../utils/formatters';

interface PETResultModalProps {
  isOpen: boolean;
  regionName: string | null;
  temperature: number | null;
  petValue: number | null;
  temperatureSource?: 'realtime' | 'manual';
  onCalculateIrrigation: () => void;
  onClose: () => void;
}

const PETResultModal: React.FC<PETResultModalProps> = ({
  isOpen,
  regionName,
  temperature,
  petValue,
  temperatureSource = 'realtime',
  onCalculateIrrigation,
  onClose
}) => {
  const { user } = useAuth();
  const { t } = useTranslation(['calculations', 'common']);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSaveResult = async () => {
    if (!user || !regionName || temperature === null || petValue === null) return;

    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const { error } = await savePETCalculation(user.id, {
        region_name: regionName,
        temperature: temperature,
        pet_value: petValue,
      });

      if (error) {
        console.error('Error saving PET calculation:', error);
        setSaveStatus('error');
      } else {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error saving PET calculation:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  if (!isOpen || !regionName || temperature === null || petValue === null) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Calculator className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">{t('calculations:petEvaluation.petCalculationResult')}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('calculations:petEvaluation.currentPetIn', { region: t(`common:regionSelector.regions.${regionName}`) })}
            </h3>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-6">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <Droplets className="h-8 w-8 text-green-600 dark:text-green-400" />
                <span className="text-3xl font-bold text-green-700 dark:text-green-300">
                  {formatDecimal(petValue)} {t('common:units.mmPerDay')}
                </span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">{t('calculations:petEvaluation.potentialEvapotranspiration')}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 mb-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">{t('calculations:petEvaluation.calculationDetails')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('common:common.region')}:</span>
                <span className="font-medium text-gray-900 dark:text-white">{t(`common:regionSelector.regions.${regionName}`)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400 flex items-center">
                  <Thermometer className="h-4 w-4 mr-1" />
                  {t('common:common.temperature')}:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">{formatTemperature(temperature)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('calculations:temperatureInput.modeSelector.title')}:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {temperatureSource === 'manual' 
                    ? t('calculations:temperatureInput.source.manual')
                    : t('calculations:temperatureInput.source.realtime')
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('calculations:petEvaluation.formula')}:</span>
                <span className="font-medium text-gray-900 dark:text-white">{t('calculations:petEvaluation.multipleLinearRegression')}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t('calculations:petEvaluation.calculateIrrigationRatesQuestion')}
            </p>
            <div className="flex flex-col space-y-3">
              {user && (
                <button
                  onClick={handleSaveResult}
                  disabled={isSaving || saveStatus === 'saved'}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 font-medium transition-colors ${
                    saveStatus === 'saved'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                      : saveStatus === 'error'
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
                      : 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white'
                  }`}
                >
                  {saveStatus === 'saving' && (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('common:common.loading')}</span>
                    </>
                  )}
                  {saveStatus === 'saved' && (
                    <>
                      <Check className="h-4 w-4" />
                      <span>{t('common:common.savedSuccessfully')}</span>
                    </>
                  )}
                  {(saveStatus === 'idle' || saveStatus === 'error') && (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{saveStatus === 'error' ? t('common:common.retrySave') : t('common:common.save')}</span>
                    </>
                  )}
                </button>
              )}
              <div className="flex space-x-4">
              <button
                onClick={onCalculateIrrigation}
                className="flex-1 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 font-medium transition-colors"
              >
                {t('calculations:petEvaluation.calculateIrrigationRates')}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-6 py-3 font-medium transition-colors"
              >
                {t('common:common.done')}
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PETResultModal;