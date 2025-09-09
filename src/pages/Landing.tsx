import { Link } from 'react-router-dom';
import { Calculator, MapPin, Droplets, TrendingUp, ArrowRight, CheckCircle, Bookmark, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();
  const { t } = useTranslation('pages');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">
              {t('landing.hero.title')}
              <span className="block text-green-600 dark:text-green-400 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mt-2 sm:mt-4">{t('landing.hero.subtitle')}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
              {t('landing.hero.description')}
            </p>
            {user ? (
              <Link
                to="/pet-evaluation"
                className="inline-flex items-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200"
              >
                <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t('landing.hero.cta.startEvaluation')}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200"
                >
                  <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('landing.hero.cta.getStarted')}</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center space-x-2 sm:space-x-3 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200"
                >
                  <span>{t('landing.hero.cta.signIn')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t('landing.features.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed text-justified-container">
              {t('landing.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6">
                <MapPin className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.features.regionalPrecision.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.features.regionalPrecision.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6">
                <Droplets className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.features.realTimeWeather.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.features.realTimeWeather.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6">
                <Calculator className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.features.scientificFormula.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.features.scientificFormula.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6">
                <TrendingUp className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.features.irrigationGuidance.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.features.irrigationGuidance.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6">
                <Shield className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.features.sustainability.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.features.sustainability.description')}
              </p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6">
                <Bookmark className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.features.saveResults.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.features.saveResults.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed text-justified-container">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 rounded-full">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.howItWorks.step1.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.howItWorks.step1.description')}
              </p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 rounded-full">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.howItWorks.step2.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.howItWorks.step2.description')}
              </p>
            </div>
            
            <div className="text-center sm:col-start-2 lg:col-start-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 rounded-full">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">{t('landing.howItWorks.step3.title')}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
                {t('landing.howItWorks.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t('landing.benefits.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('landing.benefits.scientificallyAccurate.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">{t('landing.benefits.scientificallyAccurate.description')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('landing.benefits.realTimeData.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">{t('landing.benefits.realTimeData.description')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('landing.benefits.comprehensiveCoverage.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">{t('landing.benefits.comprehensiveCoverage.description')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('landing.benefits.easyToUse.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">{t('landing.benefits.easyToUse.description')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('landing.benefits.costEffective.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">{t('landing.benefits.costEffective.description')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('landing.benefits.multilingual.title')}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">{t('landing.benefits.multilingual.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            {t('landing.cta.title')}
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed text-justified-container">
            {t('landing.cta.subtitle')}
          </p>
          {user ? (
            <Link
              to="/pet-evaluation"
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200"
            >
              <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{t('landing.hero.cta.startEvaluation')}</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200"
              >
                <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t('landing.hero.cta.getStarted')}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/signin"
                className="inline-flex items-center justify-center space-x-2 sm:space-x-3 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200"
              >
                <span>{t('landing.hero.cta.signIn')}</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;