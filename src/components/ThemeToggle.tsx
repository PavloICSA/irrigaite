import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('common');

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const Icon = theme === 'light' ? Sun : Moon;
  const label = theme === 'light' ? t('theme.light') : t('theme.dark');

  return (
    <button
      type="button"
      onClick={handleThemeChange}
      className={`
        inline-flex items-center justify-center
        w-9 h-9 rounded-md
        bg-white dark:bg-gray-800
        text-gray-700 dark:text-gray-200
        border border-gray-200 dark:border-gray-600
        hover:bg-gray-50 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
        transition-all duration-200 ease-in-out
        shadow-subtle
      `}
      aria-label={t('theme.toggle')}
      title={label}
    >
      <Icon className="h-4 w-4 transition-transform duration-200" />
    </button>
  );
};

export default ThemeToggle;