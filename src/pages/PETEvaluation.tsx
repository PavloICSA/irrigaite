import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import ukraineGeoJSON from '../data/ukraine-oblasts.json';
import RegionSelector from '../components/RegionSelector';
import RegionConfirmModal from '../components/RegionConfirmModal';
import PETResultModal from '../components/PETResultModal';
import IrrigationModal from '../components/IrrigationModal';
import { TemperatureInputModeSelector, TemperatureInputMode } from '../components/TemperatureInputModeSelector';
import { ManualTemperatureInput } from '../components/ManualTemperatureInput';
import { Calculator, Thermometer, AlertTriangle, Lock } from 'lucide-react';
import { 
  saveTemperatureInputMode, 
  loadTemperatureInputMode,
  isLocalStorageAvailable 
} from '../utils/temperatureInputPersistence';
import { 
  validateLicenseForCalculation, 
  decrementEvaluationCount,
  getCurrentEvaluationCount 
} from '../utils/licenseValidation';
import { supabase } from '../lib/supabaseClient';


const OPENWEATHER_API_KEY = '5e90c4838ae536a3fe58d58936ca1fec';

// Define occupied regions
const OCCUPIED_REGIONS = ['Donetsk', 'Luhansk'];

const PETEvaluation = () => {
  const { t } = useTranslation('calculations');
  const { user } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPETModal, setShowPETModal] = useState(false);
  const [showIrrigationModal, setShowIrrigationModal] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
  const [petValue, setPetValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Temperature input mode state
  const [temperatureInputMode, setTemperatureInputMode] = useState<TemperatureInputMode>('realtime');
  const [manualTemperature, setManualTemperature] = useState<number | null>(null);
  const [temperatureSource, setTemperatureSource] = useState<'realtime' | 'manual'>('realtime');
  
  // License state
  const [remainingEvaluations, setRemainingEvaluations] = useState<number>(0);
  const [licenseCheckLoading, setLicenseCheckLoading] = useState(false);

  // Load saved temperature input mode on component mount
  useEffect(() => {
    const savedMode = loadTemperatureInputMode();
    setTemperatureInputMode(savedMode);
  }, []);

  // Save temperature input mode whenever it changes
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      saveTemperatureInputMode(temperatureInputMode);
    }
  }, [temperatureInputMode]);

  // Load current evaluation count when user is authenticated
  useEffect(() => {
    const loadEvaluationCount = async () => {
      if (user) {
        console.log('🔍 Loading evaluation count for user:', user.id);
        
        // Direct database query to verify the actual count
        try {
          const { data: profile, error } = await supabase
            .from('user_profiles')
            .select('additional_evaluations, created_at, updated_at')
            .eq('id', user.id)
            .maybeSingle();
            
          console.log('📊 Direct database query result:');
          console.log('  - Profile data:', profile);
          console.log('  - Error:', error);
          
          if (profile) {
            console.log('  - Additional evaluations:', profile.additional_evaluations);
            console.log('  - Profile created:', profile.created_at);
            console.log('  - Profile updated:', profile.updated_at);
          }
        } catch (dbError) {
          console.error('Database query error:', dbError);
        }
        
        const count = await getCurrentEvaluationCount(user.id);
        console.log('📈 Final evaluation count loaded:', count);
        setRemainingEvaluations(count);
      }
    };

    loadEvaluationCount();
  }, [user]);

  const handleRegionClick = async (regionName: string) => {
    // Prevent selection of occupied regions
    if (OCCUPIED_REGIONS.includes(regionName)) {
      setError(t('petEvaluation.occupiedRegionError', { region: regionName }));
      return;
    }
    
    // Validate manual temperature if in manual mode
    if (temperatureInputMode === 'manual' && manualTemperature === null) {
      setError(t('temperatureInput.validation.required'));
      return;
    }
    
    // Check license for real-time mode (manual mode bypasses license check)
    if (user && temperatureInputMode === 'realtime') {
      setLicenseCheckLoading(true);
      try {
        console.log('🔐 Validating license for real-time calculation');
        console.log('User ID:', user.id);
        console.log('Current UI count:', remainingEvaluations);
        
        const licenseResult = await validateLicenseForCalculation(user.id, temperatureInputMode);
        console.log('🔐 License validation result:', licenseResult);
        
        if (!licenseResult.canProceed) {
          console.log('❌ License validation failed - cannot proceed');
          setError(licenseResult.error || t('petEvaluation.noEvaluationsRemaining'));
          setLicenseCheckLoading(false);
          return;
        }
        
        console.log('✅ License validation passed - can proceed');
        setRemainingEvaluations(licenseResult.remainingEvaluations);
      } catch (error) {
        console.error('❌ License validation error:', error);
        setError(t('petEvaluation.licenseValidationError'));
        setLicenseCheckLoading(false);
        return;
      }
      setLicenseCheckLoading(false);
    }
    
    setSelectedRegion(regionName);
    setShowConfirmModal(true);
  };

  const handleConfirmRegion = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    setError(null);

    try {
      let temperatureToUse: number;

      if (temperatureInputMode === 'manual') {
        // Use manual temperature
        if (manualTemperature === null) {
          throw new Error('Manual temperature is required');
        }
        temperatureToUse = manualTemperature;
        setTemperatureSource('manual');
      } else {
        // Fetch real-time weather data from OpenWeatherMap
        const selectedRegionData = ukraineGeoJSON.features.find(
          (feature) => feature.properties.name === selectedRegion
        );

        if (!selectedRegionData) {
          throw new Error('Selected region data not found.');
        }

        const { latitude, longitude } = selectedRegionData.properties;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
        }

        const weatherData = await response.json();
        temperatureToUse = Math.round(weatherData.main.temp * 100) / 100; // Round to 2 decimal places
        setTemperatureSource('realtime');
      }

      setCurrentTemperature(temperatureToUse);
      
      // Calculate PET using the temperature (manual or real-time)
      const pet = calculatePET(selectedRegion!, temperatureToUse);
      setPetValue(pet);
      
      // Decrement evaluation count for real-time mode (manual mode is unlimited)
      if (user && temperatureInputMode === 'realtime') {
        console.log('=== STARTING EVALUATION DECREMENT ===');
        console.log('User ID:', user.id);
        console.log('Current remaining evaluations before decrement:', remainingEvaluations);
        console.log('Temperature input mode:', temperatureInputMode);
        
        const decrementResult = await decrementEvaluationCount(user.id, temperatureInputMode);
        console.log('Decrement function result:', decrementResult);
        
        if (!decrementResult.success) {
          console.error('❌ DECREMENT FAILED');
          // Refresh count from database to ensure accuracy
          const refreshedCount = await getCurrentEvaluationCount(user.id);
          console.log('Refreshed count after failed decrement:', refreshedCount);
          setRemainingEvaluations(refreshedCount);
        } else {
          console.log('✅ DECREMENT SUCCESSFUL');
          // Update remaining evaluations count with the value returned from the server
          if (decrementResult.remainingEvaluations !== undefined) {
            console.log('New count from server:', decrementResult.remainingEvaluations);
            console.log('Count decreased by:', remainingEvaluations - decrementResult.remainingEvaluations);
            setRemainingEvaluations(decrementResult.remainingEvaluations);
          } else {
            // Fallback: refresh from database to ensure accuracy
            console.log('Server did not return count, refreshing from database');
            const refreshedCount = await getCurrentEvaluationCount(user.id);
            console.log('Refreshed count from database:', refreshedCount);
            setRemainingEvaluations(refreshedCount);
          }
        }
        console.log('=== EVALUATION DECREMENT COMPLETE ===');
      }
      
      setIsLoading(false);
      setShowPETModal(true);
    } catch (error) {
      console.error('Error in temperature processing:', error);
      setError(error instanceof Error ? error.message : 'Failed to process temperature data');
      setIsLoading(false);
      // Keep the confirm modal closed but don't show PET modal
    }
  };

  const calculatePET = (region: string, temperature: number): number => {
    const baseFormula = 0.5640 + 0.2156 * temperature;
    
    const regionCoefficients: { [key: string]: number } = {
      'Cherkasy': 0.0000,
      'Chernihiv': 0.1059,
      'Chernivtsi': 0.1587,
      'Dnipro': 0.3972,
      'Ivano-Frankivsk': 0.0430,
      'Kharkiv': -0.0007,
      'Kherson': 0.0938,
      'Khmelnytskyi': 0.2132,
      'Kropyvnytskyi': 0.3891,
      'Kyiv': -0.2334,
      'Lutsk': -0.2800,
      'Lviv': -0.0113,
      'Mykolaiv': 0.0745,
      'Odesa': -0.3740,
      'Poltava': -0.0193,
      'Rivne': 0.2647,
      'Simferopol': 0.4412,
      'Sumy': 0.1402,
      'Ternopil': 0.1584,
      'Uzhgorod': -0.3121,
      'Vinnytsia': 0.1819,
      'Zaporizhzhia': 0.0017,
      'Zhytomyr': -0.1487,
    };

    const regionCoeff = regionCoefficients[region] || 0; // Cherkasy baseline
    return Math.round((baseFormula + regionCoeff) * 100) / 100;
  };

  const handleCalculateIrrigation = () => {
    setShowPETModal(false);
    setShowIrrigationModal(true);
  };

  const handleCloseModals = () => {
    setShowConfirmModal(false);
    setShowPETModal(false);
    setShowIrrigationModal(false);
    setSelectedRegion(null);
    setCurrentTemperature(null);
    setPetValue(null);
    setError(null);
    // Note: We don't reset temperatureInputMode and manualTemperature to preserve user's input
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t('petEvaluation.title')}</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{t('petEvaluation.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* How to Use Section */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                {t('petEvaluation.howToUse')}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-2">{t('petEvaluation.searchForRegion')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t('petEvaluation.searchForRegionDescription')}</p>
                </div>
                
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-2">{t('petEvaluation.selectARegion')}</h4>
                  <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm space-y-1">
                    <p>{t('petEvaluation.selectARegionDescription1')}</p>
                    <p>{t('petEvaluation.selectARegionDescription2')}</p>
                    <p>{t('petEvaluation.selectARegionDescription3')}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-2">{t('petEvaluation.confirmSelection')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t('petEvaluation.confirmSelectionDescription')}</p>
                </div>
                
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-2">{t('petEvaluation.viewResults')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t('petEvaluation.viewResultsDescription')}</p>
                </div>
              </div>
            </div>
            
            {/* Region Selection Tips */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                {t('petEvaluation.regionSelectionTips')}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t('petEvaluation.tip1')}</p>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t('petEvaluation.tip2')}</p>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t('petEvaluation.tip3')}</p>
                </div>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{t('petEvaluation.tip4')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Display */}
        {isLoading && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-start">
              <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 dark:text-yellow-400 mr-2 sm:mr-3 animate-pulse flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-yellow-800 dark:text-yellow-200">{t('petEvaluation.processing')}</h3>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                  {temperatureInputMode === 'manual' 
                    ? t('petEvaluation.processingManualTemperature', { region: selectedRegion })
                    : t('petEvaluation.fetchingWeatherData', { region: selectedRegion })
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 dark:text-red-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200">{t('petEvaluation.errorFetchingWeatherData')}</h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 underline"
                >
                  {t('petEvaluation.trySelectingAgain')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Temperature Input Mode Selection */}
        <div className="mb-4 sm:mb-6">
          <TemperatureInputModeSelector
            selectedMode={temperatureInputMode}
            onModeChange={setTemperatureInputMode}
          />
          
          {/* Manual Temperature Input - Only show when manual mode is selected */}
          {temperatureInputMode === 'manual' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
              <ManualTemperatureInput
                temperature={manualTemperature}
                onTemperatureChange={setManualTemperature}
              />
            </div>
          )}
        </div>

        {/* License Status Display */}
        {user && (
          <div className="mb-4 sm:mb-6">
            <div className={`rounded-lg border p-3 sm:p-4 ${
              temperatureInputMode === 'manual' 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : remainingEvaluations > 0 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className={`rounded-full p-1.5 sm:p-2 ${
                  temperatureInputMode === 'manual' 
                    ? 'bg-green-100 dark:bg-green-800' 
                    : remainingEvaluations > 0 
                      ? 'bg-blue-100 dark:bg-blue-800' 
                      : 'bg-red-100 dark:bg-red-800'
                }`}>
                  {temperatureInputMode === 'manual' ? (
                    <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                  ) : remainingEvaluations > 0 ? (
                    <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className={`text-xs sm:text-sm font-medium ${
                    temperatureInputMode === 'manual' 
                      ? 'text-green-800 dark:text-green-200' 
                      : remainingEvaluations > 0 
                        ? 'text-blue-800 dark:text-blue-200' 
                        : 'text-red-800 dark:text-red-200'
                  }`}>
                    {temperatureInputMode === 'manual' 
                      ? t('petEvaluation.unlimitedCalculations')
                      : remainingEvaluations > 0 
                        ? t('petEvaluation.evaluationsRemaining', { count: remainingEvaluations })
                        : t('petEvaluation.noEvaluationsRemaining')
                    }
                  </h3>
                  <p className={`text-xs sm:text-sm ${
                    temperatureInputMode === 'manual' 
                      ? 'text-green-700 dark:text-green-300' 
                      : remainingEvaluations > 0 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : 'text-red-700 dark:text-red-300'
                  }`}>
                    {temperatureInputMode === 'manual' 
                      ? t('petEvaluation.manualModeUnlimited')
                      : remainingEvaluations > 0 
                        ? t('petEvaluation.realtimeModeWithEvaluations')
                        : t('petEvaluation.needLicenseKey')
                    }
                  </p>

                </div>
              </div>
              
              {temperatureInputMode === 'realtime' && remainingEvaluations === 0 && (
                <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-700">
                  <a
                    href="/license-activation"
                    className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                  >
                    <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{t('petEvaluation.activateLicense')}</span>
                  </a>
                </div>
              )}
              


            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">{t('petEvaluation.selectRegion')}</h2>
          <RegionSelector onSelectRegion={handleRegionClick} selectedRegionName={selectedRegion} />
        </div>
      </div>

      {/* Limited Data Warning */}

      {/* Modals */}
      <RegionConfirmModal
        isOpen={showConfirmModal}
        regionName={selectedRegion}
        onConfirm={handleConfirmRegion}
        onCancel={handleCloseModals}
        isOccupied={OCCUPIED_REGIONS.includes(selectedRegion || '')}
        temperatureInputMode={temperatureInputMode}
        manualTemperature={manualTemperature}
       />

      <PETResultModal
        isOpen={showPETModal}
        regionName={selectedRegion}
        temperature={currentTemperature}
        petValue={petValue}
        temperatureSource={temperatureSource}
        onCalculateIrrigation={handleCalculateIrrigation}
        onClose={handleCloseModals}
      />

      <IrrigationModal
        isOpen={showIrrigationModal}
        regionName={selectedRegion}
        petValue={petValue}
        onClose={handleCloseModals}
      />
    </div>
  );
};

export default PETEvaluation;