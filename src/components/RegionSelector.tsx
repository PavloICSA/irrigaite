import React, { useState } from 'react';
import { MapPin, Search, X, Info, AlertTriangle, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ukraineGeoJSON from '../data/ukraine-oblasts.json';

interface RegionSelectorProps {
  onSelectRegion: (regionName: string) => void;
  selectedRegionName?: string | null;
}

// Define occupied regions
const OCCUPIED_REGIONS = ['Donetsk', 'Luhansk'];

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelectRegion, selectedRegionName }) => {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Oblast name mapping to full oblast designation
  const oblastMapping: { [key: string]: string } = {
    'Kyiv': t('regionSelector.oblasts.Kyivska Oblast'),
    'Kharkiv': t('regionSelector.oblasts.Kharkivska Oblast'),
    'Odesa': t('regionSelector.oblasts.Odeska Oblast'),
    'Dnipro': t('regionSelector.oblasts.Dnipropetrovska Oblast'),
    'Lviv': t('regionSelector.oblasts.Lvivska Oblast'),
    'Zaporizhzhia': t('regionSelector.oblasts.Zaporizka Oblast'),
    'Kherson': t('regionSelector.oblasts.Khersonska Oblast'),
    'Poltava': t('regionSelector.oblasts.Poltavska Oblast'),
    'Chernihiv': t('regionSelector.oblasts.Chernihivska Oblast'),
    'Chernivtsi': t('regionSelector.oblasts.Chernivetska Oblast'),
    'Sumy': t('regionSelector.oblasts.Sumska Oblast'),
    'Zhytomyr': t('regionSelector.oblasts.Zhytomyrska Oblast'),
    'Vinnytsia': t('regionSelector.oblasts.Vinnytska Oblast'),
    'Mykolaiv': t('regionSelector.oblasts.Mykolaivska Oblast'),
    'Ternopil': t('regionSelector.oblasts.Ternopilska Oblast'),
    'Ivano-Frankivsk': t('regionSelector.oblasts.Ivano-Frankivska Oblast'),
    'Rivne': t('regionSelector.oblasts.Rivnenska Oblast'),
    'Khmelnytskyi': t('regionSelector.oblasts.Khmelnytska Oblast'),
    'Kropyvnytskyi': t('regionSelector.oblasts.Kirovohradska Oblast'),
    'Lutsk': t('regionSelector.oblasts.Volynska Oblast'),
    'Uzhgorod': t('regionSelector.oblasts.Zakarpatska Oblast'),
    'Simferopol': t('regionSelector.oblasts.Autonomous Republic of Crimea'),
    'Cherkasy': t('regionSelector.oblasts.Cherkaska Oblast')
  };



  // Extract region names from the GeoJSON data
  const regions = ukraineGeoJSON.features.map(feature => feature.properties.name).sort();

  // Filter regions based on search term
  const filteredRegions = regions.filter((region) => {
    const cityName = region.toLowerCase();
    const oblastName = oblastMapping[region]?.toLowerCase() || '';
    const searchLower = searchTerm.toLowerCase();
    return cityName.includes(searchLower) || oblastName.includes(searchLower);
  });

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="relative max-w-sm sm:max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder={t('regionSelector.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all duration-200 focus:outline-none text-sm sm:text-base"
            aria-label={t('regionSelector.searchAriaLabel')}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
              aria-label={t('regionSelector.clearSearchAriaLabel')}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {filteredRegions.length === regions.length
            ? `${regions.length} ${t('regionSelector.ukrainianOblasts')}`
            : `${filteredRegions.length} ${t('regionSelector.regionsFound', { total: regions.length })}`
          }
        </p>
      </div>

      {/* Region Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {filteredRegions.map((region) => {
          const isSelected = selectedRegionName === region;
          const isHovered = hoveredRegion === region;
          const isOccupied = OCCUPIED_REGIONS.includes(region);

          return (
            <button
              key={region}
              onClick={() => onSelectRegion(region)}
              onMouseEnter={() => setHoveredRegion(region)}
              onMouseLeave={() => setHoveredRegion(null)}
              disabled={isOccupied}
              aria-label={isOccupied ? t('regionSelector.selectRegionUnavailableAriaLabel', { region: t(`regionSelector.regions.${region}`) }) : t('regionSelector.selectRegionAriaLabel', { region: t(`regionSelector.regions.${region}`) })}
              className={`
                relative group p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 transform min-h-[120px] sm:min-h-[140px] flex flex-col justify-between focus:outline-none
                ${isSelected
                  ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20 scale-105 shadow-lg ring-2 ring-green-200 dark:ring-green-800'
                  : isHovered
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105 shadow-lg'
                    : isOccupied
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20 opacity-75 cursor-not-allowed'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-102 shadow-sm hover:shadow-md'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              `}
            >
              <div className="flex flex-col items-center">
                {/* Region Icon */}
                <div className={`
                  w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center transition-all duration-300
                  ${isSelected
                    ? 'bg-green-500 dark:bg-green-600 text-white shadow-md'
                    : isHovered && !isOccupied
                      ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md'
                      : isOccupied
                        ? 'bg-red-400 dark:bg-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-800 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }
                `}>
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                {/* Region Names */}
                <div className="text-center">
                  <h3 className={`
                    text-sm sm:text-base font-bold mb-1 transition-colors duration-300 leading-tight
                    ${isSelected
                      ? 'text-green-700 dark:text-green-300'
                      : isHovered && !isOccupied
                        ? 'text-blue-700 dark:text-blue-300'
                        : isOccupied
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }
                  `}>
                    {t(`regionSelector.regions.${region}`)}
                  </h3>
                  <p className={`
                    text-xs transition-colors duration-300 leading-tight
                    ${isSelected
                      ? 'text-green-600 dark:text-green-400'
                      : isHovered && !isOccupied
                        ? 'text-blue-600 dark:text-blue-400'
                        : isOccupied
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                    }
                  `}>
                    {oblastMapping[region]}
                  </p>
                </div>
              </div>

              {/* Status indicator */}
              {isOccupied && (
                <div className={`mt-1 sm:mt-2 text-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs flex items-center justify-center space-x-1 mx-auto
                  bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300
                `}>
                  <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="hidden sm:inline">{t('regionSelector.unavailable')}</span>
                  <span className="sm:hidden text-xs">N/A</span>
                </div>
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Hover Effect Overlay */}
              <div className={`
                absolute inset-0 rounded-lg sm:rounded-xl transition-opacity duration-300 pointer-events-none
                ${isSelected
                  ? 'bg-gradient-to-br from-green-400/10 to-green-600/10 opacity-100'
                  : isHovered && !isOccupied
                    ? 'bg-gradient-to-br from-blue-400/10 to-blue-600/10 opacity-100'
                    : 'opacity-0'
                }
              `} />

              {/* Tooltip for occupied regions */}
              {(isHovered && isOccupied) && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 sm:-bottom-16 z-10 w-40 sm:w-48 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg py-2 px-3 shadow-lg">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                  {t('regionSelector.occupationTooltip')}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredRegions.length === 0 && (
        <div className="text-center py-8 sm:py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">{t('regionSelector.noRegionsFound')}</h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
            {t('regionSelector.noRegionsFoundDescription')}
          </p>
          <button
            onClick={clearSearch}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors text-sm sm:text-base"
          >
            {t('regionSelector.clearSearch')}
          </button>
        </div>
      )}

      {/* Static Map Placeholder */}
      <div className="mt-8 sm:mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{t('regionSelector.geographicOverview')}</h3>
          <button
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs sm:text-sm flex items-center"
            onClick={() => window.open('https://en.wikipedia.org/wiki/Administrative_divisions_of_Ukraine', '_blank')}
          >
            <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
            <span>{t('regionSelector.learnMore')}</span>
          </button>
        </div>

        <div className="relative bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
          <img
            src="/MapChart_Map.png"
            alt={t('regionSelector.mapAlt')}
            className="w-full max-w-2xl mx-auto rounded-lg opacity-90 dark:opacity-80"
          />
        </div>

        <div className="mt-3 sm:mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-start">
            <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {t('regionSelector.occupationWarning')}
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 sm:mt-10 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 sm:p-6">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1.5 sm:p-2 flex-shrink-0">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{t('regionSelector.additionalInformation')}</h4>
            <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1.5 sm:space-y-2">
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                <span>{t('regionSelector.info1')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                <span>{t('regionSelector.info2')}</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                <span>{t('regionSelector.info3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Accessibility Note */}
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t('regionSelector.keyboardNavigation')}
        </p>
      </div>
    </div>
  );
};

export default RegionSelector;