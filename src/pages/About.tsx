import React from 'react';
import { Info, Users, Target, Award, Droplets, Map, Cloud, ExternalLink, Mail, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(['pages', 'common']);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Info className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('pages:about.header.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('pages:about.header.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Target className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:about.mission.title')}</h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p className="text-justified-container mb-6">
              {t('pages:about.mission.paragraph1')}
            </p>
            <p className="text-justified-container">
              {t('pages:about.mission.paragraph2')}
            </p>
          </div>
        </div>

        {/* The Science Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Award className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:about.science.title')}</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.science.mlApproach.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.science.mlApproach.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.science.faoGuidelines.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.science.faoGuidelines.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.science.realTimeWeather.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.science.realTimeWeather.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.science.soilMoisture.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.science.soilMoisture.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Users className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:about.commitment.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.commitment.scientificAccuracy.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.commitment.scientificAccuracy.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.commitment.userFriendlyDesign.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.commitment.userFriendlyDesign.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.commitment.continuousImprovement.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.commitment.continuousImprovement.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('pages:about.commitment.openAccess.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('pages:about.commitment.openAccess.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:about.technical.title')}</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:about.technical.dataSources.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.dataSources.items.realTimeWeather')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.dataSources.items.faoCropCoefficients')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.dataSources.items.ukrainianResearch')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.dataSources.items.soilParameters')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:about.technical.calculationMethodology.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.calculationMethodology.items.regionalModels')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.calculationMethodology.items.growthStage')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.calculationMethodology.items.cropCoefficient')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.calculationMethodology.items.soilMoisture')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.calculationMethodology.items.irrigationRecommendations')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:about.technical.qualityAssurance.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.qualityAssurance.items.continuousValidation')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.qualityAssurance.items.regularCalibration')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.qualityAssurance.items.errorHandling')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:about.technical.qualityAssurance.items.userFeedback')}
                </li>
              </ul>
            </div>
          </div>
        </div>

         {/* The Other Apps Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-16 mb-16">
          <div className="text-center mb-8">
            <Award className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:about.otherApps.title')}</h2>
          </div>
          
          <div className="space-y-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('pages:about.otherApps.waterqAi.title')}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed mb-6">
                {t('pages:about.otherApps.waterqAi.description')}
              </p>
              <a
                href="https://papaya-kleicha-cf2ce8.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <span>{t('pages:about.otherApps.waterqAi.button')}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Map className="h-6 w-6 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('pages:about.otherApps.cropMap.title')}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed mb-6">
                {t('pages:about.otherApps.cropMap.description')}
              </p>
              <a
                href="https://ukr-crop-map.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
              >
                <span>{t('pages:about.otherApps.cropMap.button')}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Cloud className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('pages:about.otherApps.soilClimateDb.title')}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed mb-6">
                {t('pages:about.otherApps.soilClimateDb.description')}
              </p>
              <a
                href="https://ukr-soil-clim-database.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
              >
                <span>{t('pages:about.otherApps.soilClimateDb.button')}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>

        {/* Dr. Pavlo Lykhovyd Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-16">
          <div className="text-center mb-8">
            <User className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Доктор Павло Лиховид</h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justified-container mb-8">
              Доктор Павло Лиховид - інженер-агроном та дослідник, що спеціалізується на управлінні зрошенням та точному землеробстві. Маючи великий досвід як в аграрній науці, так і в розробці програмного забезпечення, він створив IrrigAIte UA, щоб допомогти українським фермерам оптимізувати свої практики зрошення, використовуючи підходи, засновані на даних.
            </p>
            
            <div className="text-center">
              <a
                href="mailto:pavel.likhovid@gmail.com"
                className="inline-flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>Надіслати повідомлення</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;