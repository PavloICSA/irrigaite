import React, { useState } from 'react';
import { Heart, Coffee, Star, Users, Share2, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const { t } = useTranslation('pages');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');

  const handleShare = async () => {
    const shareData = {
      title: t('support.shareData.title'),
      text: t('support.shareData.text'),
      url: window.location.origin
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 3000);
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(window.location.origin);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 3000);
      }
    } catch (error) {
      // If both methods fail, try the older clipboard method
      try {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.origin;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 3000);
      } catch (fallbackError) {
        console.error('Failed to share or copy link:', fallbackError);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Heart className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('support.header.title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('support.header.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('support.hero.title')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed text-justified-container">
            {t('support.hero.description')}
          </p>
        </div>

        {/* Ways to Support */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('support.waysToSupport.title')}</h2>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('support.waysToSupport.spreadTheWord.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('support.waysToSupport.spreadTheWord.description')}
              </p>
            </div>

            <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('support.waysToSupport.provideFeedback.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('support.waysToSupport.provideFeedback.description')}
              </p>
            </div>

            <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('support.waysToSupport.contributeData.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('support.waysToSupport.contributeData.description')}
              </p>
            </div>

            <div className="border-l-4 border-green-600 dark:border-green-400 pl-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t('support.waysToSupport.financialSupport.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justified-container leading-relaxed">
                {t('support.waysToSupport.financialSupport.description')}
              </p>
            </div>
          </div>
        </div>

        {/* How Funds Are Used */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('support.howFundsAreUsed.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('support.howFundsAreUsed.technicalInfrastructure.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.technicalInfrastructure.items.serverHosting')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.technicalInfrastructure.items.apiSubscriptions')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.technicalInfrastructure.items.databaseManagement')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.technicalInfrastructure.items.securityBackup')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('support.howFundsAreUsed.developmentResearch.title')}</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.developmentResearch.items.newFeatures')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.developmentResearch.items.mlImprovements')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.developmentResearch.items.scientificCollaboration')}
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('support.howFundsAreUsed.developmentResearch.items.uiEnhancements')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('support.callToAction.title')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed text-justified-container">
            {t('support.callToAction.subtitle')}
          </p>
          <div className="flex justify-center">
            <button 
              onClick={handleShare}
              className="inline-flex items-center space-x-2 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-8 py-3 font-medium transition-colors min-h-[48px]"
            >
              {shareStatus === 'idle' && (
                <>
                  <Share2 className="h-5 w-5" />
                  <span>{t('support.callToAction.shareButton.idle')}</span>
                </>
              )}
              {shareStatus === 'copied' && (
                <>
                  <Copy className="h-5 w-5" />
                  <span>{t('support.callToAction.shareButton.copied')}</span>
                </>
              )}
              {shareStatus === 'shared' && (
                <>
                  <Check className="h-5 w-5" />
                  <span>{t('support.callToAction.shareButton.shared')}</span>
                </>
              )}
            </button>
          </div>
          
          {/* Share Instructions */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              {shareStatus === 'copied' 
                ? t('support.callToAction.shareInstructions.copied')
                : t('support.callToAction.shareInstructions.default')
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;