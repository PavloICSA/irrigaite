import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Calculator, BookOpen, Info, Heart, FileText, Shield, Book, Home, LogIn, UserPlus, LogOut, User, History, Key, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Base navigation items available to all users
  const publicNavigation: NavigationItem[] = [
    {
      name: t('nav.home'),
      href: '/',
      icon: Home
    },
    {
      name: t('nav.guidelines'),
      href: '/guidelines',
      icon: BookOpen
    },
    {
      name: t('nav.licenseKeys'),
      href: '/license-activation',
      icon: Key
    },
    {
      name: t('nav.referenceBook'),
      href: '/reference-book',
      icon: Book
    },
    {
      name: t('nav.aboutUs'),
      href: '/about',
      icon: Info
    },
    {
      name: t('nav.supportUs'),
      href: '/support',
      icon: Heart
    },
    {
      name: t('nav.contact'),
      href: '/contact',
      icon: Mail
    },
    {
      name: t('nav.termsOfUse'),
      href: '/terms',
      icon: FileText
    },
    {
      name: t('nav.privacyPolicy'),
      href: '/privacy',
      icon: Shield
    }
  ];

  // Protected navigation items for authenticated users
  const protectedNavigation: NavigationItem[] = [
    {
      name: t('nav.petEvaluation'),
      href: '/pet-evaluation',
      icon: Calculator
    },
    {
      name: t('nav.myCalculations'),
      href: '/my-calculations',
      icon: History
    }
  ];

  // Auth navigation items
  const authNavigation: NavigationItem[] = user ? [
    {
      name: t('nav.signOut'),
      href: '#',
      icon: LogOut,
      onClick: () => signOut()
    }
  ] : [
    {
      name: t('nav.signIn'),
      href: '/signin',
      icon: LogIn
    },
    {
      name: t('nav.signUp'),
      href: '/signup',
      icon: UserPlus
    }
  ];

  // Combine navigation based on auth status
  const navigation = [
    ...publicNavigation.slice(0, 1), // Home
    ...(user ? protectedNavigation : []), // PET Evaluation only if authenticated
    ...publicNavigation.slice(1, -2), // Guidelines, Reference Book, About, Support
    ...authNavigation, // Sign In/Up or Sign Out
    ...publicNavigation.slice(-2) // Terms, Privacy
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleItemClick = (item: NavigationItem) => {
    // Handle sign out click
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16 sm:h-18 lg:h-20">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex items-center space-x-1 lg:space-x-2">
                {navigation.map((item) => (
                  item.onClick ? (
                    <button
                      key={item.name}
                      onClick={() => handleItemClick(item)}
                      className={`flex items-center justify-center space-x-1.5 lg:space-x-2 px-2 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300`}
                    >
                      <item.icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                      <span className="hidden lg:inline text-center">{item.name}</span>
                      <span className="lg:hidden text-xs text-center">{item.name.split(' ')[0]}</span>
                    </button>
                  ) : (
                    <Link key={item.name} to={item.href}>
                      <div className={`flex items-center justify-center space-x-1.5 lg:space-x-2 px-2 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}>
                        <item.icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                        <span className="hidden lg:inline text-center">{item.name}</span>
                        <span className="lg:hidden text-xs text-center">{item.name.split(' ')[0]}</span>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* User info for desktop */}
            {user && (
              <div className="hidden md:flex items-center space-x-2 lg:space-x-3 absolute right-4">
                <ThemeToggle />
                <LanguageToggle />
                <div className="h-4 lg:h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex items-center space-x-1.5 lg:space-x-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                  <User className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  <span className="hidden lg:inline">{user?.email}</span>
                  <span className="lg:hidden">{user?.email?.split('@')[0]}</span>
                </div>
              </div>
            )}

            {/* Theme and Language toggles for non-authenticated users on desktop */}
            {!user && (
              <div className="hidden md:flex items-center space-x-2 absolute right-4">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center absolute right-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 py-4 sm:py-6 space-y-1 sm:space-y-2">
              {/* Theme and Language toggles for mobile */}
              <div className="px-3 py-2 sm:py-3 border-b border-gray-100 dark:border-gray-800 mb-3 sm:mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('theme.toggle')}</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('language.selectLanguage')}</span>
                  <LanguageToggle />
                </div>
              </div>
              {/* User info for mobile */}
              {user && (
                <div className="px-3 py-2 sm:py-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              )}

              {navigation.map((item) => {
                const Icon = item.icon;
                return item.onClick ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      handleItemClick(item);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 py-4 sm:py-6 lg:py-8">
        {children}
      </main>

      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">IrrigAIte UA</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed text-justified-container">
                {t('footer.precisionAgriculture')}
              </p>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white uppercase tracking-wide">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {user && (
                  <li><Link to="/pet-evaluation" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.petEvaluation')}</Link></li>
                )}
                <li><Link to="/guidelines" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.guidelines')}</Link></li>
                <li><Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.aboutUs')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white uppercase tracking-wide">{t('footer.support')}</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link to="/support" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.supportUs')}</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.termsOfUse')}</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.privacyPolicy')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white uppercase tracking-wide">{t('footer.account')}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {user ? (
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {t('nav.signOut')}
                    </button>
                  </li>
                ) : (
                  <>
                    <li><Link to="/signin" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.signIn')}</Link></li>
                    <li><Link to="/signup" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.signUp')}</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">&copy; 2025 IrrigAIte UA. {t('footer.allRightsReserved')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;