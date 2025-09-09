import React from 'react';
import { FileText, AlertTriangle, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utils/formatters';

const Terms = () => {
  const { t } = useTranslation('legal');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('terms.title')}</h1>
              <p className="text-gray-600">{t('terms.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">{t('terms.importantNotice.title')}</h3>
              <p className="text-yellow-700 text-justified-container">
                {t('terms.importantNotice.content')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.acceptance.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.acceptance.paragraph1')}
            </p>
            <p className="text-gray-700 text-justified-container">
              {t('terms.sections.acceptance.paragraph2')}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.services.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.services.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.services.features.pet')}</li>
              <li>{t('terms.sections.services.features.etc')}</li>
              <li>{t('terms.sections.services.features.irrigation')}</li>
              <li>{t('terms.sections.services.features.map')}</li>
              <li>{t('terms.sections.services.features.auth')}</li>
              <li>{t('terms.sections.services.features.history')}</li>
              <li>{t('terms.sections.services.features.license')}</li>
              <li>{t('terms.sections.services.features.education')}</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.usage.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.usage.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.usage.rules.accuracy')}</li>
              <li>{t('terms.sections.usage.rules.purpose')}</li>
              <li>{t('terms.sections.usage.rules.security')}</li>
              <li>{t('terms.sections.usage.rules.license')}</li>
              <li>{t('terms.sections.usage.rules.interference')}</li>
              <li>{t('terms.sections.usage.rules.legal')}</li>
              <li>{t('terms.sections.usage.rules.ip')}</li>
              <li>{t('terms.sections.usage.rules.reverse')}</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.userAccounts.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.userAccounts.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.userAccounts.responsibilities.confidentiality')}</li>
              <li>{t('terms.sections.userAccounts.responsibilities.activities')}</li>
              <li>{t('terms.sections.userAccounts.responsibilities.unauthorized')}</li>
              <li>{t('terms.sections.userAccounts.responsibilities.accuracy')}</li>
            </ul>
            <p className="text-gray-700 mt-4 text-justified-container">
              {t('terms.sections.userAccounts.paragraph2')}
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.licenseKeys.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.licenseKeys.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.licenseKeys.terms.activation')}</li>
              <li>{t('terms.sections.licenseKeys.terms.individual')}</li>
              <li>{t('terms.sections.licenseKeys.terms.expiration')}</li>
              <li>{t('terms.sections.licenseKeys.terms.fraud')}</li>
              <li>{t('terms.sections.licenseKeys.terms.refunds')}</li>
              <li>{t('terms.sections.licenseKeys.terms.support')}</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.disclaimer.title')}</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-semibold mb-2">{t('terms.sections.disclaimer.importantDisclaimer.title')}</p>
              <p className="text-red-700 text-justified-container">
                {t('terms.sections.disclaimer.importantDisclaimer.content')}
              </p>
            </div>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.disclaimer.paragraph1')}
            </p>
            <p className="text-gray-700 text-justified-container">
              {t('terms.sections.disclaimer.paragraph2')}
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.liability.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.liability.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.liability.damages.profits')}</li>
              <li>{t('terms.sections.liability.damages.crops')}</li>
              <li>{t('terms.sections.liability.damages.business')}</li>
              <li>{t('terms.sections.liability.damages.data')}</li>
              <li>{t('terms.sections.liability.damages.substitute')}</li>
              <li>{t('terms.sections.liability.damages.access')}</li>
            </ul>
            <p className="text-gray-700 mt-4 text-justified-container">
              {t('terms.sections.liability.paragraph2')}
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.privacy.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.privacy.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.privacy.points.accounts')}</li>
              <li>{t('terms.sections.privacy.points.storage')}</li>
              <li>{t('terms.sections.privacy.points.security')}</li>
              <li>{t('terms.sections.privacy.points.access')}</li>
              <li>{t('terms.sections.privacy.points.selling')}</li>
            </ul>
            <p className="text-gray-700 mt-4 text-justified-container">
              {t('terms.sections.privacy.paragraph2')} {' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">{t('terms.sections.privacy.privacyLink')}</a>.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.scientific.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.scientific.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.scientific.limitations.models')}</li>
              <li>{t('terms.sections.scientific.limitations.weather')}</li>
              <li>{t('terms.sections.scientific.limitations.coefficients')}</li>
              <li>{t('terms.sections.scientific.limitations.soil')}</li>
              <li>{t('terms.sections.scientific.limitations.validation')}</li>
              <li>{t('terms.sections.scientific.limitations.regional')}</li>
            </ul>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.intellectualProperty.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.intellectualProperty.paragraph1')}
            </p>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.intellectualProperty.paragraph2')}
            </p>
            <p className="text-gray-700 text-justified-container">
              {t('terms.sections.intellectualProperty.paragraph3')}
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.availability.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.availability.paragraph1')}
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>{t('terms.sections.availability.conditions.maintenance')}</li>
              <li>{t('terms.sections.availability.conditions.dependencies')}</li>
              <li>{t('terms.sections.availability.conditions.notice')}</li>
              <li>{t('terms.sections.availability.conditions.security')}</li>
            </ul>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.termination.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.termination.paragraph1')}
            </p>
            <p className="text-gray-700 text-justified-container">
              {t('terms.sections.termination.paragraph2')}
            </p>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.governingLaw.title')}</h2>
            <p className="text-gray-700 text-justified-container">
              {t('terms.sections.governingLaw.content')}
            </p>
          </div>

          {/* Section 14 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.sections.contact.title')}</h2>
            <p className="text-gray-700 mb-4 text-justified-container">
              {t('terms.sections.contact.paragraph1')}
            </p>
            <p className="text-gray-700 text-sm italic">
              {t('terms.sections.contact.lastUpdated', { date: formatDate(new Date(), { format: 'long' }) })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;