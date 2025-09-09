export interface SoilType {
  type: string;
  fieldCapacity: string;
  notes: string;
}

export interface IrrigationMethod {
  method: string;
  efficiency: string;
  notes: string;
}

export interface CropData {
  crop: string;
  category: 'vegetables' | 'cereals' | 'legumes' | 'orchards' | 'industrial';
  effectiveRootDepth: string;
  wateringThreshold: string;
  notes: string;
}

export const soilTypes: SoilType[] = [
  {
    type: 'Podzolized soils',
    fieldCapacity: '10–15%',
    notes: 'Sandy texture, low organic matter, lower water retention'
  },
  {
    type: 'Chernozems',
    fieldCapacity: '30–40%',
    notes: 'Loamy, high organic matter, excellent water retention'
  },
  {
    type: 'Chestnut soils',
    fieldCapacity: '25–35%',
    notes: 'Moderate humus, good retention'
  },
  {
    type: 'Salinized soils',
    fieldCapacity: '20–30%',
    notes: 'Variable due to salinity, generally lower available water'
  }
];

export const irrigationMethods: IrrigationMethod[] = [
  {
    method: 'Surface irrigation',
    efficiency: '60%',
    notes: 'Prone to runoff and evaporation losses'
  },
  {
    method: 'Sprinkler irrigation',
    efficiency: '75%',
    notes: 'More uniform, but wind and evaporation cause some losses'
  },
  {
    method: 'Drip irrigation',
    efficiency: '90%',
    notes: 'Most efficient; delivers water directly to root zone'
  }
];

export const cropData: CropData[] = [
  // Vegetables
  { crop: 'Broccoli', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '70-75%', notes: 'Sensitive to water stress, similar to cauliflower.' },
  { crop: 'Cabbage', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '70-75%', notes: 'Similar to broccoli.' },
  { crop: 'Carrots', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Moderate tolerance, root crop.' },
  { crop: 'Cauliflower', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '70-75%', notes: 'Sensitive to water stress.' },
  { crop: 'Celery', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '70-75%', notes: 'Similar to leafy greens.' },
  { crop: 'Lettuce', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '70-75%', notes: 'Shallow roots, sensitive to water stress.' },
  { crop: 'Onion (dry)', category: 'vegetables', effectiveRootDepth: '250-350', wateringThreshold: '60-70%', notes: 'Similar to table beet.' },
  { crop: 'Onion (green)', category: 'vegetables', effectiveRootDepth: '250-350', wateringThreshold: '60-70%', notes: 'Similar to dry onion.' },
  { crop: 'Onion (seed)', category: 'vegetables', effectiveRootDepth: '250-350', wateringThreshold: '60-70%', notes: 'Similar to dry onion.' },
  { crop: 'Spinach', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '70-75%', notes: 'Shallow roots, sensitive to water stress.' },
  { crop: 'Radish', category: 'vegetables', effectiveRootDepth: '250-350', wateringThreshold: '60-70%', notes: 'Similar to table beet.' },
  { crop: 'Eggplant', category: 'vegetables', effectiveRootDepth: '550-650', wateringThreshold: '70-80%', notes: 'Similar to tomato.' },
  { crop: 'Sweet peppers (bell)', category: 'vegetables', effectiveRootDepth: '550-650', wateringThreshold: '70-80%', notes: 'Similar to cucumber.' },
  { crop: 'Tomato', category: 'vegetables', effectiveRootDepth: '550-650', wateringThreshold: '80-85%', notes: 'Moderate tolerance to depletion, per query example.' },
  { crop: 'Cantaloupe', category: 'vegetables', effectiveRootDepth: '850-950', wateringThreshold: '60-70%', notes: 'Similar to winter squash.' },
  { crop: 'Cucumber', category: 'vegetables', effectiveRootDepth: '550-650', wateringThreshold: '70-80%', notes: 'Moderate tolerance to depletion.' },
  { crop: 'Pumpkin, Winter squash', category: 'vegetables', effectiveRootDepth: '850-950', wateringThreshold: '60-70%', notes: 'Higher tolerance due to deeper roots.' },
  { crop: 'Squash, Zucchini', category: 'vegetables', effectiveRootDepth: '550-650', wateringThreshold: '70-80%', notes: 'Similar to cucumber.' },
  { crop: 'Sweet melons', category: 'vegetables', effectiveRootDepth: '850-950', wateringThreshold: '60-70%', notes: 'Similar to cantaloupe.' },
  { crop: 'Watermelons', category: 'vegetables', effectiveRootDepth: '850-950', wateringThreshold: '60-70%', notes: 'Similar to winter squash.' },
  { crop: 'Beets (table)', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Moderate tolerance to depletion.' },
  { crop: 'Potato', category: 'vegetables', effectiveRootDepth: '750-850', wateringThreshold: '70-80%', notes: 'Sensitive to water stress.' },
  { crop: 'Sweet potato', category: 'vegetables', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Similar to carrots.' },
  { crop: 'Sugarbeet', category: 'industrial', effectiveRootDepth: '550-650', wateringThreshold: '60-70%', notes: 'Similar to table beet.' },

  // Legumes
  { crop: 'Beans (green)', category: 'legumes', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Moderate tolerance to depletion.' },
  { crop: 'Beans (dry)', category: 'legumes', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Similar to green beans.' },
  { crop: 'Faba bean, broad bean', category: 'legumes', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Similar to beans.' },
  { crop: 'Groundnut', category: 'legumes', effectiveRootDepth: '550-650', wateringThreshold: '70-80%', notes: 'Similar to peanuts, sensitive to water stress.' },
  { crop: 'Lentil', category: 'legumes', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Similar to beans.' },
  { crop: 'Peas', category: 'legumes', effectiveRootDepth: '400-500', wateringThreshold: '60-70%', notes: 'Similar to beans.' },
  { crop: 'Soybeans', category: 'legumes', effectiveRootDepth: '550-650', wateringThreshold: '60-70%', notes: 'Moderate tolerance to depletion.' },

  // Cereals
  { crop: 'Barley/Oats/Wheat', category: 'cereals', effectiveRootDepth: '550-950', wateringThreshold: '50-60%', notes: 'Typical for cereals, range reflects variability.' },
  { crop: 'Winter Wheat', category: 'cereals', effectiveRootDepth: '550-950', wateringThreshold: '50-60%', notes: 'Similar to wheat.' },
  { crop: 'Grains (small)', category: 'cereals', effectiveRootDepth: '550-950', wateringThreshold: '50-60%', notes: 'Similar to barley/oats/wheat.' },
  { crop: 'Maize (grain)', category: 'cereals', effectiveRootDepth: '550-650', wateringThreshold: '70-75%', notes: 'Moderate tolerance to depletion, per query example.' },
  { crop: 'Maize (sweet)', category: 'cereals', effectiveRootDepth: '550-650', wateringThreshold: '70-75%', notes: 'Similar to grain maize.' },
  { crop: 'Millet', category: 'cereals', effectiveRootDepth: '550-650', wateringThreshold: '50-60%', notes: 'Similar to grains.' },
  { crop: 'Sorghum', category: 'cereals', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'Similar to maize.' },
  { crop: 'Rice', category: 'cereals', effectiveRootDepth: '250-350', wateringThreshold: '80-90%', notes: 'Requires high soil moisture due to flooded conditions.' },

  // Industrial Crops
  { crop: 'Cotton', category: 'industrial', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'High tolerance due to deep roots.' },
  { crop: 'Flax', category: 'industrial', effectiveRootDepth: '550-650', wateringThreshold: '50-60%', notes: 'Similar to grains.' },
  { crop: 'Safflower', category: 'industrial', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'Similar to sunflower.' },
  { crop: 'Sesame', category: 'industrial', effectiveRootDepth: '550-650', wateringThreshold: '50-60%', notes: 'Similar to grains.' },
  { crop: 'Sunflower', category: 'industrial', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'Moderate tolerance to depletion.' },

  // Orchards
  { crop: 'Grapes', category: 'orchards', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'High tolerance due to deep roots.' },
  { crop: 'Citrus', category: 'orchards', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'High tolerance due to deep roots.' },
  { crop: 'Deciduous Orchard', category: 'orchards', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'High tolerance due to deep roots.' },
  { crop: 'Olives', category: 'orchards', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'High tolerance due to deep roots.' },
  { crop: 'Pistachios', category: 'orchards', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'High tolerance due to deep roots.' },
  { crop: 'Walnuts', category: 'orchards', effectiveRootDepth: '850-950', wateringThreshold: '50-60%', notes: 'High tolerance due to deep roots.' }
];

export const cropCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'cereals', label: 'Cereals' },
  { value: 'legumes', label: 'Legumes' },
  { value: 'orchards', label: 'Orchards' },
  { value: 'industrial', label: 'Industrial Crops' }
];