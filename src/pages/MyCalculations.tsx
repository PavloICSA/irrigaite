import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { getUserCalculations, deleteUserCalculation, UserCalculation } from '../utils/supabaseOperations';
import { Calculator, Trash2, Calendar, MapPin, Thermometer, Droplets, Sprout, AlertCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { formatDate, formatDecimal } from '../utils/formatters';

const MyCalculations = () => {
  const { user } = useAuth();
  const [calculations, setCalculations] = useState<UserCalculation[]>([]);
  const { t, i18n } = useTranslation(['calculations', 'common']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchCalculations();
    }
  }, [user]);

  const fetchCalculations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await getUserCalculations(user.id);
      
      if (error) {
        setError(error.message);
      } else {
        setCalculations(data || []);
      }
    } catch (err) {
      setError('Failed to fetch calculations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (calculationId: string) => {
    if (!confirm(t('calculations:myCalculations.deleteCalculationConfirm'))) return;

    try {
      setDeletingId(calculationId);
      const { error } = await deleteUserCalculation(calculationId);
      
      if (error) {
        setError(error.message);
      } else {
        setCalculations(calculations.filter(calc => calc.id !== calculationId));
      }
    } catch (err) {
      setError('Failed to delete calculation');
    } finally {
      setDeletingId(null);
    }
  };

  const formatCalculationDate = (dateString: string) => {
    return formatDate(dateString, { format: 'datetime' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">{t('calculations:myCalculations.loadingCalculations')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('calculations:myCalculations.title')}</h1>
              <p className="text-gray-600">{t('calculations:myCalculations.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {calculations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('calculations:myCalculations.noSavedCalculations')}</h3>
            <p className="text-gray-600 mb-6">
              {t('calculations:myCalculations.noSavedCalculationsDescription')}
            </p>
            <a
              href="/pet-evaluation"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Calculator className="h-5 w-5" />
              <span>{t('calculations:myCalculations.startNewCalculation')}</span>
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('calculations:myCalculations.totalCalculations')}</p>
                    <p className="text-2xl font-bold text-gray-900">{calculations.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-3">
                    <Droplets className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('calculations:myCalculations.petCalculations')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {calculations.filter(calc => calc.calculation_type === 'PET').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Sprout className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('calculations:myCalculations.irrigationCalculations')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {calculations.filter(calc => calc.calculation_type === 'Irrigation').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations List */}
            <div className="space-y-4">
              {calculations.map((calculation) => (
                <div key={calculation.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`rounded-full p-2 ${
                          calculation.calculation_type === 'PET' 
                            ? 'bg-blue-100' 
                            : 'bg-purple-100'
                        }`}>
                          {calculation.calculation_type === 'PET' ? (
                            <Droplets className={`h-5 w-5 ${
                              calculation.calculation_type === 'PET' 
                                ? 'text-blue-600' 
                                : 'text-purple-600'
                            }`} />
                          ) : (
                            <Sprout className="h-5 w-5 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {calculation.calculation_type === 'PET' ? t('calculations:myCalculations.petCalculationType') : t('calculations:myCalculations.irrigationCalculationType')}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{calculation.region_name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatCalculationDate(calculation.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {calculation.temperature && (
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4 text-orange-500" />
                            <span className="text-sm text-gray-700">{t('common:common.temperature')}: {calculation.temperature}{t('common:units.celsius')}
                            </span>
                          </div>
                        )}
                        
                        {calculation.pet_value && (
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-700">PET: {calculation.pet_value} {t('common:units.mmPerDay')}
                            </span>
                          </div>
                        )}

                        {calculation.crop_name && (
                          <div className="flex items-center space-x-2">
                            <Sprout className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">{t('common:common.crop')}: {calculation.crop_name}
                            </span>
                          </div>
                        )}

                        {calculation.etc && (
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-purple-500" />
                            <span className="text-sm text-gray-700">ETc: {formatDecimal(calculation.etc)} {t('common:units.mmPerDay')}
                            </span>
                          </div>
                        )}

                        {calculation.status && (
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              calculation.status.includes('Required') ? 'bg-red-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm text-gray-700">{t('common:common.status')}: {calculation.status}
                            </span>
                          </div>
                        )}

                        {calculation.recommended_irrigation_rate && (
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-700">{t('common:common.rate')}: {formatDecimal(calculation.recommended_irrigation_rate)} {t('common:units.mm')}
                            </span>
                          </div>
                        )}
                      </div>

                      {calculation.calculation_type === 'Irrigation' && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">{t('calculations:myCalculations.soilParameters')}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                            {calculation.gsm && <span>GSM: {calculation.gsm}{t('common:units.percent')}</span>}
                            {calculation.al && <span>AL: {calculation.al}{t('common:units.mm')}</span>}
                            {calculation.bd && <span>BD: {calculation.bd}{t('common:units.tonsPerCubicMeter')}</span>}
                            {calculation.fc && <span>FC: {calculation.fc}{t('common:units.percent')}</span>}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(calculation.id)}
                      disabled={deletingId === calculation.id}
                      className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title={t('common:common.delete')}
                    >
                      {deletingId === calculation.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalculations;