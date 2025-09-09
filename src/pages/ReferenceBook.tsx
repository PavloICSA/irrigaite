import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Filter, ArrowUpDown, Info, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { soilTypes, irrigationMethods, cropData, cropCategories, CropData } from '../data/referenceData';

const ReferenceBook = () => {
  const { t } = useTranslation(['reference', 'common']);
  const [activeTab, setActiveTab] = useState('soil');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortField, setSortField] = useState<'crop' | 'effectiveRootDepth' | 'wateringThreshold'>('crop');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Helper function to get translated soil type
  const getTranslatedSoilType = (type: string) => {
    const soilMap: { [key: string]: string } = {
      'Podzolized soils': 'podzolized',
      'Chernozems': 'chernozems',
      'Chestnut soils': 'chestnut',
      'Salinized soils': 'salinized'
    };
    const key = soilMap[type];
    return key ? t(`reference:data.soilTypes.${key}`, type) : type;
  };

  // Helper function to get translated soil notes
  const getTranslatedSoilNotes = (type: string) => {
    const soilMap: { [key: string]: string } = {
      'Podzolized soils': 'podzolized',
      'Chernozems': 'chernozems', 
      'Chestnut soils': 'chestnut',
      'Salinized soils': 'salinized'
    };
    const key = soilMap[type];
    return key ? t(`reference:data.soilNotes.${key}`, soilTypes.find(s => s.type === type)?.notes || '') : soilTypes.find(s => s.type === type)?.notes || '';
  };

  // Helper function to get translated irrigation method
  const getTranslatedIrrigationMethod = (method: string) => {
    const methodMap: { [key: string]: string } = {
      'Surface irrigation': 'surface',
      'Sprinkler irrigation': 'sprinkler', 
      'Drip irrigation': 'drip'
    };
    const key = methodMap[method];
    return key ? t(`reference:data.irrigationMethods.${key}`, method) : method;
  };

  // Helper function to get translated irrigation notes
  const getTranslatedIrrigationNotes = (method: string) => {
    const methodMap: { [key: string]: string } = {
      'Surface irrigation': 'surface',
      'Sprinkler irrigation': 'sprinkler',
      'Drip irrigation': 'drip'
    };
    const key = methodMap[method];
    return key ? t(`reference:data.irrigationNotes.${key}`, irrigationMethods.find(m => m.method === method)?.notes || '') : irrigationMethods.find(m => m.method === method)?.notes || '';
  };

  // Helper function to get translated crop notes
  const getTranslatedCropNotes = (crop: string, notes: string) => {
    // Create a key from crop name
    const key = crop.toLowerCase().replace(/[^a-z0-9]/g, '');
    return t(`reference:data.cropNotes.${key}`, notes);
  };

  // Helper function to get translated crop name
  const getTranslatedCropName = (crop: string) => {
    // Create a key from crop name
    const key = crop.toLowerCase().replace(/[^a-z0-9]/g, '');
    return t(`reference:data.cropNames.${key}`, crop);
  };

  // Filter and sort crop data
  const filteredAndSortedCrops = useMemo(() => {
    let filtered = cropData.filter(crop => {
      const matchesSearch = crop.crop.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      // For numeric fields, extract the first number for sorting
      if (sortField === 'effectiveRootDepth' || sortField === 'wateringThreshold') {
        aValue = parseFloat(aValue.toString().match(/\d+/)?.[0] || '0');
        bValue = parseFloat(bValue.toString().match(/\d+/)?.[0] || '0');
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortField, sortDirection]);

  const handleSort = (field: 'crop' | 'effectiveRootDepth' | 'wateringThreshold') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const tabs = [
    { id: 'soil', label: t('reference:tabs.soil'), icon: '🌱' },
    { id: 'irrigation', label: t('reference:tabs.irrigation'), icon: '💧' },
    { id: 'crops', label: t('reference:tabs.crops'), icon: '🌾' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('reference:title')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('reference:subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 dark:border-green-400 p-6 mb-16">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">{t('reference:about.title')}</h3>
              <p className="text-green-700 dark:text-green-300 mb-4 leading-relaxed">
                {t('reference:about.description')}
              </p>
              <div className="text-sm text-green-600 dark:text-green-400">
                <p><strong>{t('reference:about.dataSources')}</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label={t('common:navigation.tabs', 'Tabs')}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-600 dark:border-green-400 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{t(`reference:tabsMobile.${tab.id}`)}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Soil Water-Holding Capacity Tab */}
            {activeTab === 'soil' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">{t('reference:soil.title')}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <HelpCircle className="h-4 w-4" />
                    <span>{t('reference:soil.helpText')}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-help"
                          title={t('reference:soil.tooltips.soilType')}
                        >
                          {t('reference:soil.headers.soilType')}
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-help"
                          title={t('reference:soil.tooltips.fieldCapacity')}
                        >
                          {t('reference:soil.headers.fieldCapacity')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('reference:soil.headers.notes')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {soilTypes.map((soil, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {getTranslatedSoilType(soil.type)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-blue-600">
                            {soil.fieldCapacity}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {getTranslatedSoilNotes(soil.type)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>{t('reference:soil.tip.title')}</strong> {t('reference:soil.tip.text')}
                  </p>
                </div>
              </div>
            )}

            {/* Irrigation Efficiency Tab */}
            {activeTab === 'irrigation' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">{t('reference:irrigation.title')}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <HelpCircle className="h-4 w-4" />
                    <span>{t('reference:irrigation.helpText')}</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('reference:irrigation.headers.method')}
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-help"
                          title={t('reference:irrigation.tooltips.efficiency')}
                        >
                          {t('reference:irrigation.headers.efficiency')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('reference:irrigation.headers.notes')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {irrigationMethods.map((method, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {getTranslatedIrrigationMethod(method.method)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              parseInt(method.efficiency) >= 85 ? 'bg-green-100 text-green-800' :
                              parseInt(method.efficiency) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {method.efficiency}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {getTranslatedIrrigationNotes(method.method)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>{t('reference:irrigation.note.title')}</strong> {t('reference:irrigation.note.text')}
                  </p>
                </div>
              </div>
            )}

            {/* Crop Root Depth & Thresholds Tab */}
            {activeTab === 'crops' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">{t('reference:crops.title')}</h2>
                  <div className="text-sm text-gray-500">
                    {t('reference:crops.resultsCount', { count: filteredAndSortedCrops.length, total: cropData.length })}
                  </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('reference:crops.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none"
                    >
                      {cropCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {t(`reference:crops.categories.${category.value}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('crop')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{t('reference:crops.headers.crop')}</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('effectiveRootDepth')}
                          title={t('reference:crops.tooltips.effectiveRootDepth')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{t('reference:crops.headers.effectiveRootDepth')}</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('wateringThreshold')}
                          title={t('reference:crops.tooltips.wateringThreshold')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{t('reference:crops.headers.wateringThreshold')}</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t('reference:crops.headers.notes')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAndSortedCrops.map((crop, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center space-x-2">
                              <span>{getTranslatedCropName(crop.crop)}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                crop.category === 'vegetables' ? 'bg-green-100 text-green-800' :
                                crop.category === 'cereals' ? 'bg-yellow-100 text-yellow-800' :
                                crop.category === 'legumes' ? 'bg-purple-100 text-purple-800' :
                                crop.category === 'orchards' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {t(`reference:crops.categories.${crop.category}`)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-blue-600">
                            {crop.effectiveRootDepth}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-green-600">
                            {crop.wateringThreshold}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {getTranslatedCropNotes(crop.crop, crop.notes)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredAndSortedCrops.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">{t('reference:crops.noResults.text')}</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="mt-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {t('reference:crops.noResults.clearFilters')}
                    </button>
                  </div>
                )}

                {/* Explanatory Footnotes */}
                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{t('reference:crops.importantNotes.title')}</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>{t('reference:crops.importantNotes.rootDepthRanges')}</strong></li>
                      <li>• <strong>{t('reference:crops.importantNotes.wateringThreshold')}</strong></li>
                      <li>• <strong>{t('reference:crops.importantNotes.valuesSources')}</strong></li>
                      <li>• <strong>{t('reference:crops.importantNotes.siteSpecific')}</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceBook;