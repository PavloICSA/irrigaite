import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { activateLicenseKey, getUserProfile } from '../utils/supabaseOperations';
import { Key, CheckCircle, AlertCircle, Loader2, Gift, Zap, Star, ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/formatters';

const LicenseActivation = () => {
  const { t } = useTranslation('calculations');
  const { user } = useAuth();
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      setProfileLoading(true);
      const { data, error } = await getUserProfile(user.id);
      
      if (error) {
        console.error('Error fetching user profile:', error);
      } else {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleActivateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !licenseKey.trim()) {
      setError(t('licenseActivation.errors.pleaseEnterValidKey'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await activateLicenseKey(user.id, licenseKey.trim());
      
      if (error) {
        setError(error.message || t('licenseActivation.errors.failedToActivate'));
      } else {
        setSuccess(true);
        setLicenseKey('');
        // Refresh user profile to show updated evaluations
        await fetchUserProfile();
      }
    } catch (err) {
      setError(t('licenseActivation.errors.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setError(null);
    setLicenseKey('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Key className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('licenseActivation.authenticationRequired')}</h2>
          <p className="text-gray-600">{t('licenseActivation.pleaseSignInToActivate')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Key className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('licenseActivation.title')}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t('licenseActivation.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('licenseActivation.yourCurrentStatus')}</h2>
          
          {profileLoading ? (
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-gray-600">{t('licenseActivation.loadingProfile')}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">{t('licenseActivation.additionalEvaluations')}</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {userProfile?.additional_evaluations || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 rounded-full p-2">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">{t('licenseActivation.accountStatus')}</p>
                    <p className="text-lg font-bold text-green-900">
                      {userProfile?.additional_evaluations > 0 ? t('licenseActivation.premium') : t('licenseActivation.free')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500 rounded-full p-2">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-medium">{t('licenseActivation.memberSince')}</p>
                    <p className="text-lg font-bold text-purple-900">
                      {userProfile?.created_at 
                        ? formatDate(userProfile.created_at, { format: 'short' })
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Activation Form */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">{t('licenseActivation.activateLicenseKey')}</h2>
            <p className="text-purple-100 mt-1">{t('licenseActivation.enterKeyToUnlock')}</p>
          </div>

          <div className="p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('licenseActivation.licenseKeyActivated')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('licenseActivation.keyActivatedSuccessMessage')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetForm}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {t('licenseActivation.activateAnotherKey')}
                  </button>
                  <a
                    href="/pet-evaluation"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                  >
                    <span>{t('licenseActivation.startEvaluation')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleActivateKey} className="space-y-6">
                <div>
                  <label htmlFor="licenseKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('licenseActivation.activateLicenseKey')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="licenseKey"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder={t('licenseActivation.licenseKeyPlaceholder')}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors text-center font-mono text-lg tracking-wider"
                      disabled={loading}
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t('licenseActivation.keyCaseSensitive')}
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{t('licenseActivation.activationFailed')}</h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !licenseKey.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:cursor-not-allowed flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>{t('licenseActivation.activating')}</span>
                    </>
                  ) : (
                    <>
                      <Key className="h-5 w-5" />
                      <span>{t('licenseActivation.activateLicenseKey')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 rounded-full p-2">
                <Gift className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{t('licenseActivation.whatAreLicenseKeys')}</h3>
            </div>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('licenseActivation.whatAreLicenseKeysDescription')}
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {t('licenseActivation.features.instantActivation')}</li>
              <li>• {t('licenseActivation.features.noExpiration')}</li>
              <li>• {t('licenseActivation.features.useAtOwnPace')}</li>
              <li>• {t('licenseActivation.features.supportDevelopment')}</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 rounded-full p-2">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{t('licenseActivation.needLicenseKey')}</h3>
            </div>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('licenseActivation.needLicenseKeyDescription')}
            </p>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('licenseActivation.purchaseInstructions')}
            </p>
            <ul className="text-gray-700 mb-4 list-disc list-inside space-y-1">
              <li>{t('licenseActivation.evaluationPricing.200')}</li>
              <li>{t('licenseActivation.evaluationPricing.1000')}</li>
              <li>{t('licenseActivation.evaluationPricing.2000')}</li>
              <li>{t('licenseActivation.evaluationPricing.5000')}</li>
              <li>{t('licenseActivation.evaluationPricing.10000')}</li>
              <li>{t('licenseActivation.evaluationPricing.20000')}</li>
            </ul>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=FLYXSPK2Z3DKS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Gift className="h-5 w-5" />
              <span>{t('licenseActivation.buyLicenseKey')}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-gray-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('licenseActivation.troubleshooting.title')}</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <strong>{t('licenseActivation.troubleshooting.keyNotWorking.title')}</strong> {t('licenseActivation.troubleshooting.keyNotWorking.description')}
            </div>
            <div>
              <strong>{t('licenseActivation.troubleshooting.alreadyUsed.title')}</strong> {t('licenseActivation.troubleshooting.alreadyUsed.description')}
            </div>
            <div>
              <strong>{t('licenseActivation.troubleshooting.technicalIssues.title')}</strong> {t('licenseActivation.troubleshooting.technicalIssues.description')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseActivation;