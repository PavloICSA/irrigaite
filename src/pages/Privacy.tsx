import React from 'react';
import { Shield, Eye, Database, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/formatters';

const Privacy = () => {
  const { t } = useTranslation(['legal', 'common']);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('legal:privacy.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('legal:privacy.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Privacy Commitment */}
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 dark:border-green-400 p-6 mb-16">
          <div className="flex items-start">
            <Lock className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">{t('legal:privacy.commitment.title')}</h3>
              <p className="text-green-700 dark:text-green-300 text-justified-container leading-relaxed">
                {t('legal:privacy.commitment.content')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('legal:privacy.sections.informationCollection.title')}</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('legal:privacy.sections.informationCollection.userProvided.title')}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justified-container leading-relaxed">
                  {t('legal:privacy.sections.informationCollection.userProvided.intro')}
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <strong>{t('legal:privacy.sections.informationCollection.userProvided.items.account')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <strong>{t('legal:privacy.sections.informationCollection.userProvided.items.agricultural')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <strong>{t('legal:privacy.sections.informationCollection.userProvided.items.history')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <strong>{t('legal:privacy.sections.informationCollection.userProvided.items.license')}</strong>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-4 text-justified-container leading-relaxed">
                  <strong>{t('legal:privacy.sections.informationCollection.userProvided.important')}</strong>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('legal:privacy.sections.informationCollection.automaticallyCollected.title')}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justified-container leading-relaxed">
                  {t('legal:privacy.sections.informationCollection.automaticallyCollected.intro')}
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationCollection.automaticallyCollected.items.browser')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationCollection.automaticallyCollected.items.os')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationCollection.automaticallyCollected.items.ip')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationCollection.automaticallyCollected.items.usage')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationCollection.automaticallyCollected.items.errors')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationCollection.automaticallyCollected.items.auth')}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('legal:privacy.sections.informationUsage.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('legal:privacy.sections.informationUsage.serviceProvision.title')}</h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceProvision.items.calculate')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceProvision.items.recommendations')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceProvision.items.weather')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceProvision.items.history')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceProvision.items.license')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceProvision.items.personalized')}
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('legal:privacy.sections.informationUsage.serviceImprovement.title')}</h3>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceImprovement.items.patterns')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceImprovement.items.issues')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceImprovement.items.accuracy')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceImprovement.items.experience')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceImprovement.items.features')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('legal:privacy.sections.informationUsage.serviceImprovement.items.validation')}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.dataStorage.title')}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.dataStorage.storage.title')}</h3>
                <p className="text-gray-700 mb-2 text-justified-container">
                  {t('legal:privacy.sections.dataStorage.storage.intro')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>{t('legal:privacy.sections.dataStorage.storage.items.persistent')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.storage.items.passwords')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.storage.items.agricultural')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.storage.items.weather')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.storage.items.analytics')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.dataStorage.security.title')}</h3>
                <p className="text-gray-700 mb-2 text-justified-container">
                  {t('legal:privacy.sections.dataStorage.security.intro')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>{t('legal:privacy.sections.dataStorage.security.items.encryption')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.security.items.infrastructure')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.security.items.rls')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.security.items.updates')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.security.items.access')}</li>
                  <li>{t('legal:privacy.sections.dataStorage.security.items.auth')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.thirdPartyServices.title')}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.thirdPartyServices.supabase.title')}</h3>
                <p className="text-gray-700 mb-2 text-justified-container">
                  {t('legal:privacy.sections.thirdPartyServices.supabase.intro')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>{t('legal:privacy.sections.thirdPartyServices.supabase.items.auth')}</li>
                  <li>{t('legal:privacy.sections.thirdPartyServices.supabase.items.database')}</li>
                  <li>{t('legal:privacy.sections.thirdPartyServices.supabase.items.functions')}</li>
                  <li>{t('legal:privacy.sections.thirdPartyServices.supabase.items.processing')}</li>
                  <li>{t('legal:privacy.sections.thirdPartyServices.supabase.items.compliance')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.thirdPartyServices.weather.title')}</h3>
                <p className="text-gray-700 mb-2 text-justified-container">
                  {t('legal:privacy.sections.thirdPartyServices.weather.intro')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>{t('legal:privacy.sections.thirdPartyServices.weather.items.api')}</li>
                  <li>{t('legal:privacy.sections.thirdPartyServices.weather.items.coordinates')}</li>
                  <li>{t('legal:privacy.sections.thirdPartyServices.weather.items.privacy')}</li>
                  <li>{t('legal:privacy.sections.thirdPartyServices.weather.items.anonymized')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.thirdPartyServices.analytics.title')}</h3>
                <p className="text-gray-700 text-justified-container">
                  {t('legal:privacy.sections.thirdPartyServices.analytics.content')}
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.cookies.title')}</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.cookies.essential.title')}</h3>
              <p className="text-gray-700 mb-2 text-justified-container">
                {t('legal:privacy.sections.cookies.essential.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{t('legal:privacy.sections.cookies.essential.items.auth')}</li>
                <li>{t('legal:privacy.sections.cookies.essential.items.preferences')}</li>
                <li>{t('legal:privacy.sections.cookies.essential.items.calculator')}</li>
                <li>{t('legal:privacy.sections.cookies.essential.items.analytics')}</li>
              </ul>
              <p className="text-gray-700 mt-2 text-justified-container">
                {t('legal:privacy.sections.cookies.essential.note')}
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.dataSharing.title')}</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">{t('legal:privacy.sections.dataSharing.noSelling.title')}</h3>
              <p className="text-red-800 mb-2 text-justified-container">
                {t('legal:privacy.sections.dataSharing.noSelling.intro')}
              </p>
              <p className="text-red-700 text-justified-container">
                {t('legal:privacy.sections.dataSharing.noSelling.limited')}
              </p>
              <ul className="list-disc list-inside text-red-700 space-y-1 ml-4 mt-2">
                <li>{t('legal:privacy.sections.dataSharing.noSelling.items.legal')}</li>
                <li>{t('legal:privacy.sections.dataSharing.noSelling.items.protection')}</li>
                <li>{t('legal:privacy.sections.dataSharing.noSelling.items.emergency')}</li>
                <li>{t('legal:privacy.sections.dataSharing.noSelling.items.providers')}</li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.userRights.title')}</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.userRights.access.title')}</h3>
                <p className="text-gray-700 mb-2 text-justified-container">
                  {t('legal:privacy.sections.userRights.access.intro')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>{t('legal:privacy.sections.userRights.access.items.access')}</strong></li>
                  <li><strong>{t('legal:privacy.sections.userRights.access.items.delete')}</strong></li>
                  <li><strong>{t('legal:privacy.sections.userRights.access.items.correct')}</strong></li>
                  <li><strong>{t('legal:privacy.sections.userRights.access.items.export')}</strong></li>
                  <li><strong>{t('legal:privacy.sections.userRights.access.items.control')}</strong></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('legal:privacy.sections.userRights.portability.title')}</h3>
                <p className="text-gray-700 mb-2 text-justified-container">
                  {t('legal:privacy.sections.userRights.portability.intro')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>{t('legal:privacy.sections.userRights.portability.items.settings')}</li>
                  <li>{t('legal:privacy.sections.userRights.portability.items.individual')}</li>
                  <li>{t('legal:privacy.sections.userRights.portability.items.account')}</li>
                  <li>{t('legal:privacy.sections.userRights.portability.items.support')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.childrenPrivacy.title')}</h2>
            <p className="text-gray-700 text-justified-container">
              {t('legal:privacy.sections.childrenPrivacy.content')}
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.dataRetention.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('legal:privacy.sections.dataRetention.intro')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>{t('legal:privacy.sections.dataRetention.items.account')}</li>
              <li>{t('legal:privacy.sections.dataRetention.items.calculations')}</li>
              <li>{t('legal:privacy.sections.dataRetention.items.license')}</li>
              <li>{t('legal:privacy.sections.dataRetention.items.analytics')}</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.policyChanges.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('legal:privacy.sections.policyChanges.updates')}
            </p>
            <p className="text-gray-700 text-justified-container">
              {t('legal:privacy.sections.policyChanges.notification')}
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal:privacy.sections.contact.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('legal:privacy.sections.contact.content')}
            </p>
            <p className="text-gray-700 text-sm italic">
              {t('legal:privacy.lastUpdated', { date: formatDate(new Date(), { format: 'long' }) })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;