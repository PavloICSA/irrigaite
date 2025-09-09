import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation('common');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'uk', name: t('language.ukrainian'), flag: '🇺🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const nextLanguage = languages.find(lang => lang.code !== i18n.language) || languages[1];

  const toggleLanguage = async () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Smooth transition with subtle feedback
    await new Promise(resolve => setTimeout(resolve, 150));
    
    i18n.changeLanguage(nextLanguage.code);
    
    // Complete transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      disabled={isTransitioning}
      className={`
        inline-flex items-center justify-center
        px-2 sm:px-3 py-1.5 sm:py-2 rounded-md
        text-xs sm:text-sm font-medium
        bg-white dark:bg-gray-800
        text-gray-700 dark:text-gray-200
        border border-gray-200 dark:border-gray-600
        hover:bg-gray-50 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
        transition-all duration-200 ease-in-out
        disabled:opacity-75
        ${isTransitioning ? 'scale-95' : 'scale-100'}
      `}
      aria-label={t('language.switchTo', { language: nextLanguage.name })}
      title={t('language.switchTo', { language: nextLanguage.name })}
    >
      <span className="text-sm sm:text-base mr-1.5 sm:mr-2 transition-transform duration-200">
        {currentLanguage.flag}
      </span>
      <span className="transition-opacity duration-200">
        {currentLanguage.code.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageToggle;