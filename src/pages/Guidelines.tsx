import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Info, MapPin, Calculator, Sprout, CheckCircle } from 'lucide-react';

const Guidelines = () => {
  const { t } = useTranslation(['pages', 'common']);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('pages:guidelines.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('pages:guidelines.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Info className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:guidelines.about.title')}</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-justified-container leading-relaxed">
              {t('pages:guidelines.about.description')}
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('pages:guidelines.about.features.scientificModels')}
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('pages:guidelines.about.features.realTimeWeather')}
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('pages:guidelines.about.features.localAdjustments')}
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('pages:guidelines.about.features.internationalStandards')}
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:guidelines.howItWorks.title')}</h2>
          </div>
          
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <div className="w-8 h-8 bg-green-600 dark:bg-green-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {t('pages:guidelines.howItWorks.step1.number')}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('pages:guidelines.howItWorks.step1.title')}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justified-container leading-relaxed">
                  {t('pages:guidelines.howItWorks.step1.description')}
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step1.details.search')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step1.details.browse')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step1.details.select')}
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-8 h-8 bg-green-600 dark:bg-green-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {t('pages:guidelines.howItWorks.step2.number')}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Calculator className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('pages:guidelines.howItWorks.step2.title')}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justified-container leading-relaxed">
                  {t('pages:guidelines.howItWorks.step2.description')}
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step2.details.fetchWeather')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step2.details.applyAdjustments')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step2.details.calculatePET')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step2.details.displayResults')}
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-8 h-8 bg-green-600 dark:bg-green-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {t('pages:guidelines.howItWorks.step3.number')}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('pages:guidelines.howItWorks.step3.title')}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-justified-container leading-relaxed">
                  {t('pages:guidelines.howItWorks.step3.description')}
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step3.details.cropInfo')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step3.details.soilMoisture')}
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {t('pages:guidelines.howItWorks.step3.details.climateClass')}
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 text-justified-container">
                  {t('pages:guidelines.howItWorks.step3.note')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Workflow */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:guidelines.workflow.title')}</h2>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">{t('pages:guidelines.workflow.irrigationAssessment.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{t('pages:guidelines.workflow.irrigationAssessment.steps.selectCrop')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{t('pages:guidelines.workflow.irrigationAssessment.steps.enterDates')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{t('pages:guidelines.workflow.irrigationAssessment.steps.provideSoil')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{t('pages:guidelines.workflow.irrigationAssessment.steps.reviewRecommendations')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{t('pages:guidelines.workflow.irrigationAssessment.steps.applyRecommendations')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Requirements */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:guidelines.inputRequirements.title')}</h2>
          </div>
          
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 border-l-4 border-green-600 dark:border-green-400">
            <p className="text-gray-700 dark:text-gray-300">
              {t('pages:guidelines.inputRequirements.referenceNote')}
              <Link 
                to="/reference-book" 
                className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline ml-1"
              >
                {t('pages:guidelines.inputRequirements.referenceLink')}
              </Link> 
              {" "}{t('pages:guidelines.inputRequirements.referenceLinkText')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.inputRequirements.requiredForPET.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.requiredForPET.oblastSelection')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.requiredForPET.weatherData')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.inputRequirements.additionalForIrrigation.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.additionalForIrrigation.cropType')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.additionalForIrrigation.plantingDate')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.additionalForIrrigation.climateType')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.inputRequirements.soilParameters.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.soilParameters.soilMoisture')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.soilParameters.activeLayer')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.soilParameters.bulkDensity')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.soilParameters.fieldCapacity')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.inputRequirements.soilParameters.irrigationEfficiency')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:guidelines.bestPractices.title')}</h2>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.bestPractices.accurateResults.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.accurateResults.currentMeasurements')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.accurateResults.selectVariety')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.accurateResults.considerMicroclimate')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.accurateResults.validateExpertise')}
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.bestPractices.irrigationPlanning.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.irrigationPlanning.checkRegularly')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.irrigationPlanning.adjustRainfall')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.irrigationPlanning.considerSoil')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.irrigationPlanning.monitorStress')}
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.bestPractices.dataQuality.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.dataQuality.accurateDates')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.dataQuality.representativeSamples')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.dataQuality.systemEfficiency')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.bestPractices.dataQuality.keepRecords')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scientific Foundation */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('pages:guidelines.scientificFoundation.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.scientificFoundation.methodology.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.methodology.internationalStandards')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.methodology.regionalData')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.methodology.cropModels')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.methodology.ukrainianValidation')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('pages:guidelines.scientificFoundation.dataSources.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.dataSources.meteorologicalData')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.dataSources.cropCoefficients')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.dataSources.ukrainianResearch')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('pages:guidelines.scientificFoundation.dataSources.climateClassification')}
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-sm text-justified-container">
              <strong>{t('common:note')}:</strong> {t('pages:guidelines.scientificFoundation.note')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;