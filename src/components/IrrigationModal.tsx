import React, { useState } from 'react';
import { X, Sprout, Calendar, Droplets, Calculator, Save, Check } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { saveIrrigationCalculation } from '../utils/supabaseOperations';

interface IrrigationModalProps {
  isOpen: boolean;
  regionName: string | null;
  petValue: number | null;
  onClose: () => void;
}

const IrrigationModal: React.FC<IrrigationModalProps> = ({
  isOpen,
  regionName,
  petValue,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedRegionType, setSelectedRegionType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [gsm, setGsm] = useState('');
  const [al, setAl] = useState('');
  const [bd, setBd] = useState('');
  const [fc, setFc] = useState('');
  const [wateringThreshold, setWateringThreshold] = useState('');
  const [irrigationEfficiency, setIrrigationEfficiency] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation(['calculations', 'common']);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // FAO Crop data with growth periods (days) - comprehensive table
  const crops = [
    // Vegetables
    { name: 'Broccoli (Sept, Calif. Desert, USA)', initial: 35, development: 45, midSeason: 40, late: 15 },
    { name: 'Cabbage (Sept, Calif. Desert, USA)', initial: 40, development: 60, midSeason: 50, late: 15 },
    { name: 'Carrots (Oct/Jan, Arid climate)', initial: 20, development: 30, midSeason: 50, late: 20 },
    { name: 'Carrots (Feb/Mar, Mediterranean)', initial: 30, development: 40, midSeason: 60, late: 20 },
    { name: 'Carrots (Oct, Calif. Desert, USA)', initial: 30, development: 50, midSeason: 90, late: 30 },
    { name: 'Cauliflower (Sept, Calif. Desert, USA)', initial: 35, development: 50, midSeason: 40, late: 15 },
    { name: 'Celery (Oct, (Semi) Arid)', initial: 25, development: 40, midSeason: 95, late: 20 },
    { name: 'Celery (April, Mediterranean)', initial: 25, development: 40, midSeason: 45, late: 15 },
    { name: 'Celery (Jan, (Semi) Arid)', initial: 30, development: 55, midSeason: 105, late: 20 },
    { name: 'Lettuce (April, Mediterranean)', initial: 20, development: 30, midSeason: 15, late: 10 },
    { name: 'Lettuce (Nov/Jan, Mediterranean)', initial: 30, development: 40, midSeason: 25, late: 10 },
    { name: 'Lettuce (Oct/Nov, Arid Region)', initial: 25, development: 35, midSeason: 30, late: 10 },
    { name: 'Lettuce (Feb, Mediterranean)', initial: 35, development: 50, midSeason: 45, late: 10 },
    { name: 'Onion (dry) (April, Mediterranean)', initial: 15, development: 25, midSeason: 70, late: 40 },
    { name: 'Onion (dry) (Oct; Jan., Arid Region; Calif.)', initial: 20, development: 35, midSeason: 110, late: 45 },
    { name: 'Onion (green) (April/May, Mediterranean)', initial: 25, development: 30, midSeason: 10, late: 5 },
    { name: 'Onion (green) (October, Arid Region)', initial: 20, development: 45, midSeason: 20, late: 10 },
    { name: 'Onion (green) (March, Calif., USA)', initial: 30, development: 55, midSeason: 55, late: 40 },
    { name: 'Onion (seed) (Sept, Calif. Desert, USA)', initial: 20, development: 45, midSeason: 165, late: 45 },
    { name: 'Spinach (Apr; Sep/Oct, Mediterranean)', initial: 20, development: 20, midSeason: 25, late: 5 },
    { name: 'Spinach (November, Arid Region)', initial: 20, development: 30, midSeason: 40, late: 10 },
    { name: 'Radish (Mar/Apr, Medit.; Europe)', initial: 5, development: 10, midSeason: 15, late: 5 },
    { name: 'Radish (Winter, Arid Region)', initial: 10, development: 10, midSeason: 15, late: 5 },
    { name: 'Egg plant (October, Arid Region)', initial: 30, development: 40, midSeason: 40, late: 20 },
    { name: 'Egg plant (May/June, Mediterranean)', initial: 30, development: 45, midSeason: 40, late: 25 },
    { name: 'Sweet peppers (bell) (April/June, Europe and Medit.)', initial: 25, development: 35, midSeason: 40, late: 20 },
    { name: 'Sweet peppers (bell) (October, Arid Region)', initial: 30, development: 40, midSeason: 110, late: 30 },
    { name: 'Tomato (January, Arid Region)', initial: 30, development: 40, midSeason: 40, late: 25 },
    { name: 'Tomato (Apr/May, Calif., USA)', initial: 35, development: 40, midSeason: 50, late: 30 },
    { name: 'Tomato (Jan, Calif. Desert, USA)', initial: 25, development: 40, midSeason: 60, late: 30 },
    { name: 'Tomato (Oct/Nov, Arid Region)', initial: 35, development: 45, midSeason: 70, late: 30 },
    { name: 'Tomato (April/May, Mediterranean)', initial: 30, development: 40, midSeason: 45, late: 30 },
    
    // Melons and Squash
    { name: 'Cantaloupe (Jan, Calif., USA)', initial: 30, development: 45, midSeason: 35, late: 10 },
    { name: 'Cantaloupe (Aug, Calif., USA)', initial: 10, development: 60, midSeason: 25, late: 25 },
    { name: 'Cucumber (June/Aug, Arid Region)', initial: 20, development: 30, midSeason: 40, late: 15 },
    { name: 'Cucumber (Nov; Feb, Arid Region)', initial: 25, development: 35, midSeason: 50, late: 20 },
    { name: 'Pumpkin, Winter squash (Mar, Aug, Mediterranean)', initial: 20, development: 30, midSeason: 30, late: 20 },
    { name: 'Pumpkin, Winter squash (June, Europe)', initial: 25, development: 35, midSeason: 35, late: 25 },
    { name: 'Squash, Zucchini (Apr; Dec., Medit.; Arid Reg.)', initial: 25, development: 35, midSeason: 25, late: 15 },
    { name: 'Squash, Zucchini (May/June, Medit.; Europe)', initial: 20, development: 30, midSeason: 25, late: 15 },
    { name: 'Sweet melons (May, Mediterranean)', initial: 25, development: 35, midSeason: 40, late: 20 },
    { name: 'Sweet melons (March, Calif., USA)', initial: 30, development: 30, midSeason: 50, late: 30 },
    { name: 'Sweet melons (Aug, Calif. Desert, USA)', initial: 15, development: 40, midSeason: 65, late: 15 },
    { name: 'Sweet melons (Dec/Jan, Arid Region)', initial: 30, development: 45, midSeason: 65, late: 20 },
    { name: 'Water melons (April, Italy)', initial: 20, development: 30, midSeason: 30, late: 30 },
    { name: 'Water melons (Mat/Aug, Near East (desert))', initial: 10, development: 20, midSeason: 20, late: 30 },
    
    // Root Crops
    { name: 'Beets, table (Apr/May, Mediterranean)', initial: 15, development: 25, midSeason: 20, late: 10 },
    { name: 'Beets, table (Feb/Mar, Mediterranean & Arid)', initial: 25, development: 30, midSeason: 25, late: 10 },
    { name: 'Potato (Jan/Nov, (Semi) Arid Climate)', initial: 25, development: 30, midSeason: 45, late: 30 },
    { name: 'Potato (May, Continental Climate)', initial: 25, development: 30, midSeason: 45, late: 30 },
    { name: 'Potato (April, Europe)', initial: 30, development: 35, midSeason: 50, late: 30 },
    { name: 'Potato (Apr/May, Idaho, USA)', initial: 45, development: 30, midSeason: 70, late: 20 },
    { name: 'Potato (Dec, Calif. Desert, USA)', initial: 30, development: 35, midSeason: 50, late: 25 },
    { name: 'Sweet potato (April, Mediterranean)', initial: 20, development: 30, midSeason: 60, late: 40 },
    { name: 'Sweet potato (Rainy seas., Tropical regions)', initial: 15, development: 30, midSeason: 50, late: 30 },
    { name: 'Sugarbeet (March, Calif., USA)', initial: 30, development: 45, midSeason: 90, late: 15 },
    { name: 'Sugarbeet (June, Calif., USA)', initial: 25, development: 30, midSeason: 90, late: 10 },
    { name: 'Sugarbeet (Sept, Calif. Desert, USA)', initial: 25, development: 65, midSeason: 100, late: 65 },
    { name: 'Sugarbeet (April, Idaho, USA)', initial: 50, development: 40, midSeason: 50, late: 40 },
    { name: 'Sugarbeet (May, Mediterranean)', initial: 25, development: 35, midSeason: 50, late: 50 },
    { name: 'Sugarbeet (November, Mediterranean)', initial: 45, development: 75, midSeason: 80, late: 30 },
    { name: 'Sugarbeet (November, Arid Regions)', initial: 35, development: 60, midSeason: 70, late: 40 },
    
    // Legumes
    { name: 'Beans (green) (Feb/Mar, Calif., Mediterranean)', initial: 20, development: 30, midSeason: 30, late: 10 },
    { name: 'Beans (green) (Aug/Sep, Calif., Egypt, Lebanon)', initial: 15, development: 25, midSeason: 25, late: 10 },
    { name: 'Beans (dry) (May/June, Continental Climates)', initial: 20, development: 30, midSeason: 40, late: 20 },
    { name: 'Beans (dry) (June, Pakistan, Calif.)', initial: 15, development: 25, midSeason: 35, late: 20 },
    { name: 'Beans (dry) (June, Idaho, USA)', initial: 25, development: 25, midSeason: 30, late: 20 },
    { name: 'Faba bean, broad bean (May, Europe)', initial: 15, development: 25, midSeason: 35, late: 15 },
    { name: 'Faba bean, broad bean (Mar/Apr, Mediterranean)', initial: 20, development: 30, midSeason: 35, late: 15 },
    { name: 'Groundnut (Dry, West Africa)', initial: 25, development: 35, midSeason: 45, late: 25 },
    { name: 'Groundnut (season, High Latitudes)', initial: 35, development: 35, midSeason: 35, late: 35 },
    { name: 'Groundnut (May May/June, Mediterranean)', initial: 35, development: 45, midSeason: 35, late: 25 },
    { name: 'Lentil (April, Europe)', initial: 20, development: 30, midSeason: 60, late: 40 },
    { name: 'Lentil (Oct/Nov, Arid Region)', initial: 25, development: 35, midSeason: 70, late: 40 },
    { name: 'Peas (May, Europe)', initial: 15, development: 25, midSeason: 35, late: 15 },
    { name: 'Peas (Mar/Apr, Mediterranean)', initial: 20, development: 30, midSeason: 35, late: 15 },
    { name: 'Peas (April, Idaho, USA)', initial: 35, development: 25, midSeason: 30, late: 20 },
    { name: 'Soybeans (Dec, Tropics)', initial: 15, development: 15, midSeason: 40, late: 15 },
    { name: 'Soybeans (May, Central USA)', initial: 20, development: 35, midSeason: 60, late: 25 },
    { name: 'Soybeans (June, Japan)', initial: 20, development: 25, midSeason: 75, late: 30 },
    
    // Grains
    { name: 'Barley/Oats/Wheat (November, Central India)', initial: 15, development: 25, midSeason: 50, late: 30 },
    { name: 'Barley/Oats/Wheat (March/Apr, 35-45 °L)', initial: 20, development: 25, midSeason: 60, late: 30 },
    { name: 'Barley/Oats/Wheat (July, East Africa)', initial: 15, development: 30, midSeason: 65, late: 40 },
    { name: 'Barley/Oats/Wheat (Apr)', initial: 40, development: 30, midSeason: 40, late: 20 },
    { name: 'Barley/Oats/Wheat (Nov)', initial: 40, development: 60, midSeason: 60, late: 40 },
    { name: 'Barley/Oats/Wheat (Dec, Calif. Desert, USA)', initial: 20, development: 50, midSeason: 60, late: 30 },
    { name: 'Winter Wheat (December, Calif., USA)', initial: 20, development: 60, midSeason: 70, late: 30 },
    { name: 'Winter Wheat (November, Mediterranean)', initial: 30, development: 140, midSeason: 40, late: 30 },
    { name: 'Winter Wheat (October, Idaho, USA)', initial: 160, development: 75, midSeason: 75, late: 25 },
    { name: 'Grains (small) (April, Mediterranean)', initial: 20, development: 30, midSeason: 60, late: 40 },
    { name: 'Grains (small) (Oct/Nov, Pakistan; Arid Reg.)', initial: 25, development: 35, midSeason: 65, late: 40 },
    { name: 'Maize (grain) (April, East Africa (alt.))', initial: 30, development: 50, midSeason: 60, late: 40 },
    { name: 'Maize (grain) (Dec/Jan, Arid Climate)', initial: 25, development: 40, midSeason: 45, late: 30 },
    { name: 'Maize (grain) (June, Nigeria (humid))', initial: 20, development: 35, midSeason: 40, late: 30 },
    { name: 'Maize (grain) (October, India (dry, cool))', initial: 20, development: 35, midSeason: 40, late: 30 },
    { name: 'Maize (grain) (April, Spain (spr, sum.); Calif.)', initial: 30, development: 40, midSeason: 50, late: 30 },
    { name: 'Maize (grain) (April, Idaho, USA)', initial: 30, development: 40, midSeason: 50, late: 50 },
    { name: 'Maize (sweet) (March, Philippines)', initial: 20, development: 20, midSeason: 30, late: 10 },
    { name: 'Maize (sweet) (May/June, Mediterranean)', initial: 20, development: 25, midSeason: 25, late: 10 },
    { name: 'Maize (sweet) (Oct/Dec, Arid Climate)', initial: 20, development: 30, midSeason: 50, late: 10 },
    { name: 'Maize (sweet) (April, Idaho, USA)', initial: 30, development: 30, midSeason: 30, late: 10 },
    { name: 'Maize (sweet) (Jan, Calif. Desert, USA)', initial: 20, development: 40, midSeason: 70, late: 10 },
    { name: 'Millet (June, Pakistan)', initial: 15, development: 25, midSeason: 40, late: 25 },
    { name: 'Millet (April, Central USA)', initial: 20, development: 30, midSeason: 55, late: 35 },
    { name: 'Sorghum (May/June, USA, Pakis., Med.)', initial: 20, development: 35, midSeason: 40, late: 30 },
    { name: 'Sorghum (Mar/April, Arid Region)', initial: 20, development: 35, midSeason: 45, late: 30 },
    { name: 'Rice (Dec; May, Tropics; Mediterranean)', initial: 30, development: 30, midSeason: 60, late: 30 },
    { name: 'Rice (May, Tropics)', initial: 30, development: 30, midSeason: 80, late: 40 },
    
    // Industrial Crops
    { name: 'Cotton (Mar-May, Egypt; Pakistan; Calif.)', initial: 30, development: 50, midSeason: 60, late: 55 },
    { name: 'Cotton (Mar, Calif. Desert, USA)', initial: 45, development: 90, midSeason: 45, late: 45 },
    { name: 'Cotton (Sept, Yemen)', initial: 30, development: 50, midSeason: 60, late: 55 },
    { name: 'Cotton (April, Texas)', initial: 30, development: 50, midSeason: 55, late: 45 },
    { name: 'Flax (April, Europe)', initial: 25, development: 35, midSeason: 50, late: 40 },
    { name: 'Flax (October, Arizona)', initial: 30, development: 40, midSeason: 100, late: 50 },
    { name: 'Safflower (April, California, USA)', initial: 20, development: 35, midSeason: 45, late: 25 },
    { name: 'Safflower (Mar, High Latitudes)', initial: 25, development: 35, midSeason: 55, late: 30 },
    { name: 'Safflower (Oct/Nov, Arid Region)', initial: 35, development: 55, midSeason: 60, late: 40 },
    { name: 'Sesame (June, China)', initial: 20, development: 30, midSeason: 40, late: 20 },
    { name: 'Sunflower (April/May, Medit.; California)', initial: 25, development: 35, midSeason: 45, late: 25 },
    
    // Fruits
    { name: 'Grapes (April, Low Latitudes)', initial: 20, development: 40, midSeason: 120, late: 60 },
    { name: 'Grapes (Mar, Calif., USA)', initial: 20, development: 50, midSeason: 75, late: 60 },
    { name: 'Grapes (May, High Latitudes)', initial: 20, development: 50, midSeason: 90, late: 20 },
    { name: 'Grapes (April, Mid Latitudes (wine))', initial: 30, development: 60, midSeason: 40, late: 80 },
    { name: 'Citrus (Jan, Mediterranean)', initial: 60, development: 90, midSeason: 120, late: 95 },
    { name: 'Deciduous Orchard (March, High Latitudes)', initial: 20, development: 70, midSeason: 90, late: 30 },
    { name: 'Deciduous Orchard (March, Low Latitudes)', initial: 20, development: 70, midSeason: 120, late: 60 },
    { name: 'Deciduous Orchard (March, Calif., USA)', initial: 30, development: 50, midSeason: 130, late: 30 },
    { name: 'Olives (March, Mediterranean)', initial: 30, development: 90, midSeason: 60, late: 90 },
    { name: 'Pistachios (Feb, Mediterranean)', initial: 20, development: 60, midSeason: 30, late: 40 },
    { name: 'Walnuts (April, Utah, USA)', initial: 20, development: 10, midSeason: 130, late: 30 },
  ];

  const regionTypes = ['Humid', 'Semi-humid', 'Semi-arid', 'Arid'];

  // FAO Crop coefficients (Kc) for each crop type
  const cropKcValues = {
    'Broccoli': { initial: 0.7, development: 1.05, midSeason: 0.95, late: 0.75 },
    'Cabbage': { initial: 0.7, development: 1.05, midSeason: 0.95, late: 0.9 },
    'Carrots': { initial: 0.7, development: 1.05, midSeason: 1.05, late: 0.95 },
    'Cauliflower': { initial: 0.7, development: 1.05, midSeason: 0.95, late: 0.75 },
    'Celery': { initial: 0.7, development: 1.05, midSeason: 1.05, late: 1.0 },
    'Lettuce': { initial: 0.7, development: 1.0, midSeason: 1.0, late: 0.95 },
    'Onion': { initial: 0.7, development: 1.05, midSeason: 1.05, late: 0.85 },
    'Spinach': { initial: 0.7, development: 1.0, midSeason: 1.0, late: 0.95 },
    'Radish': { initial: 0.7, development: 0.9, midSeason: 0.95, late: 0.9 },
    'Egg plant': { initial: 0.6, development: 1.05, midSeason: 1.05, late: 0.9 },
    'Sweet peppers': { initial: 0.6, development: 1.05, midSeason: 1.05, late: 0.9 },
    'Tomato': { initial: 0.6, development: 1.15, midSeason: 1.15, late: 0.8 },
    'Cantaloupe': { initial: 0.5, development: 0.75, midSeason: 1.0, late: 0.75 },
    'Cucumber': { initial: 0.6, development: 1.0, midSeason: 1.0, late: 0.75 },
    'Pumpkin': { initial: 0.5, development: 0.8, midSeason: 1.0, late: 0.8 },
    'Squash': { initial: 0.5, development: 0.8, midSeason: 0.95, late: 0.75 },
    'Sweet melons': { initial: 0.5, development: 0.75, midSeason: 1.0, late: 0.75 },
    'Water melons': { initial: 0.4, development: 0.8, midSeason: 1.0, late: 0.75 },
    'Beets': { initial: 0.5, development: 0.75, midSeason: 1.05, late: 0.95 },
    'Potato': { initial: 0.5, development: 0.75, midSeason: 1.15, late: 0.85 },
    'Sweet potato': { initial: 0.5, development: 0.65, midSeason: 1.15, late: 0.65 },
    'Sugarbeet': { initial: 0.35, development: 0.75, midSeason: 1.2, late: 0.7 },
    'Beans': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.55 },
    'Faba bean': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.35 },
    'Groundnut': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.6 },
    'Lentil': { initial: 0.4, development: 0.7, midSeason: 1.1, late: 0.3 },
    'Peas': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.35 },
    'Soybeans': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.5 },
    'Barley': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.4 },
    'Oats': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.4 },
    'Wheat': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.4 },
    'Winter Wheat': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.4 },
    'Grains': { initial: 0.4, development: 0.7, midSeason: 1.15, late: 0.4 },
    'Maize': { initial: 0.3, development: 0.7, midSeason: 1.2, late: 0.6 },
    'Millet': { initial: 0.3, development: 0.7, midSeason: 1.05, late: 0.3 },
    'Sorghum': { initial: 0.3, development: 0.7, midSeason: 1.05, late: 0.55 },
    'Rice': { initial: 1.05, development: 1.2, midSeason: 1.2, late: 0.9 },
    'Cotton': { initial: 0.35, development: 0.7, midSeason: 1.15, late: 0.5 },
    'Flax': { initial: 0.35, development: 0.7, midSeason: 1.1, late: 0.25 },
    'Safflower': { initial: 0.35, development: 0.7, midSeason: 1.15, late: 0.25 },
    'Sesame': { initial: 0.35, development: 0.7, midSeason: 1.1, late: 0.25 },
    'Sunflower': { initial: 0.35, development: 0.7, midSeason: 1.15, late: 0.35 },
    'Grapes': { initial: 0.3, development: 0.7, midSeason: 0.85, late: 0.45 },
    'Citrus': { initial: 0.7, development: 0.65, midSeason: 0.7, late: 0.75 },
    'Deciduous Orchard': { initial: 0.45, development: 0.6, midSeason: 1.15, late: 0.8 },
    'Olives': { initial: 0.65, development: 0.45, midSeason: 0.7, late: 0.65 },
    'Pistachios': { initial: 0.4, development: 0.7, midSeason: 1.0, late: 0.4 },
    'Walnuts': { initial: 0.5, development: 0.6, midSeason: 1.1, late: 0.65 },
  };

  const resetModal = () => {
    setStep(1);
    setSelectedCrop('');
    setSelectedRegionType('');
    setPlantingDate('');
    setCurrentDate(format(new Date(), 'yyyy-MM-dd'));
    setGsm('');
    setAl('');
    setBd('');
    setFc('');
    setWateringThreshold('');
    setIrrigationEfficiency('');
    setResult(null);
    setSaveStatus('idle');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const calculateIrrigation = () => {
    if (!selectedCrop || !plantingDate || !currentDate || !gsm || !al || !bd || !fc || !wateringThreshold || !irrigationEfficiency || !petValue) {
      return;
    }

    const crop = crops.find(c => c.name === selectedCrop);
    if (!crop) return;

    // Extract general crop name for Kc lookup
    const generalCropName = selectedCrop.split(' ')[0];
    const cropKc = cropKcValues[generalCropName as keyof typeof cropKcValues];
    
    if (!cropKc) {
      setResult(t('irrigation.errors.cropCoefficientNotFound'));
      return;
    }

    // Calculate crop stage
    const plantDate = parseISO(plantingDate);
    const currentDay = parseISO(currentDate);
    const actualSeasonLength = differenceInDays(currentDay, plantDate);

    // Determine growth stage based on days since planting
    let stage: 'initial' | 'development' | 'midSeason' | 'late';
    
    if (actualSeasonLength <= crop.initial) {
      stage = 'initial';
    } else if (actualSeasonLength <= crop.initial + crop.development) {
      stage = 'development';
    } else if (actualSeasonLength <= crop.initial + crop.development + crop.midSeason) {
      stage = 'midSeason';
    } else {
      stage = 'late';
    }

    // Calculate ETc
    const kc = cropKc[stage];
    const etc = kc * petValue;

    // Parse input values
    const gsmNum = parseFloat(gsm);
    const alNum = parseFloat(al);
    const bdNum = parseFloat(bd);
    const fcNum = parseFloat(fc);
    const wateringThresholdNum = parseFloat(wateringThreshold);
    const irrigationEfficiencyNum = parseFloat(irrigationEfficiency);

    // Calculate current soil water volume (W_actual)
    const wActual = (gsmNum / 100) * alNum * bdNum;

    // Calculate threshold water volume (W_threshold)
    const wThreshold = (wateringThresholdNum / 100) * (fcNum / 100) * alNum * bdNum;

    let status = '';
    let daysToNextIrrigation = null;
    let recommendedIrrigationRate = null;

    if (wActual >= wThreshold) {
      // Irrigation not required
      status = t('irrigation.status.irrigationNotRequired');
      daysToNextIrrigation = (wActual - wThreshold) / etc;
    } else {
      // Irrigation required
      status = t('irrigation.status.irrigationRequired');
      
      // Calculate irrigation rate needed to replenish soil moisture to Field Capacity
      const ir = ((fcNum - gsmNum) / 100) * alNum * bdNum;
      
      // Correct for irrigation efficiency
      recommendedIrrigationRate = ir / (irrigationEfficiencyNum / 100);
    }

    // Format result
    let resultText = `${t('irrigation.selectCrop')} ${t(`irrigation.crops.${selectedCrop}`)}
${t('irrigation.cropEtc', { etc: etc.toFixed(2) })}

${t('irrigation.statusIrrigation', { status })}`;

    if (daysToNextIrrigation !== null) {
      resultText += `
${t('irrigation.daysToNextIrrigation', { days: daysToNextIrrigation.toFixed(2) })}`;
    }

    if (recommendedIrrigationRate !== null) {
      resultText += `
${t('irrigation.recommendedIrrigationRate', { rate: recommendedIrrigationRate.toFixed(2) })}`;
    }

    setResult(resultText);
  };

  const handleSaveResult = async () => {
    if (!user || !selectedCrop || !plantingDate || !currentDate || !gsm || !al || !bd || !fc || !wateringThreshold || !irrigationEfficiency || !petValue || !result) return;

    setIsSaving(true);
    setSaveStatus('saving');

    try {
      const crop = crops.find(c => c.name === selectedCrop);
      if (!crop) return;

      // Extract general crop name for Kc lookup
      const generalCropName = selectedCrop.split(' ')[0];
      const cropKc = cropKcValues[generalCropName as keyof typeof cropKcValues];
      
      if (!cropKc) return;

      // Calculate crop stage and ETc
      const plantDate = parseISO(plantingDate);
      const currentDay = parseISO(currentDate);
      const actualSeasonLength = differenceInDays(currentDay, plantDate);

      let stage: 'initial' | 'development' | 'midSeason' | 'late';
      
      if (actualSeasonLength <= crop.initial) {
        stage = 'initial';
      } else if (actualSeasonLength <= crop.initial + crop.development) {
        stage = 'development';
      } else if (actualSeasonLength <= crop.initial + crop.development + crop.midSeason) {
        stage = 'midSeason';
      } else {
        stage = 'late';
      }

      const kc = cropKc[stage];
      const etc = kc * petValue;

      // Parse input values
      const gsmNum = parseFloat(gsm);
      const alNum = parseFloat(al);
      const bdNum = parseFloat(bd);
      const fcNum = parseFloat(fc);
      const wateringThresholdNum = parseFloat(wateringThreshold);
      const irrigationEfficiencyNum = parseFloat(irrigationEfficiency);

      // Calculate current soil water volume (W_actual)
      const wActual = (gsmNum / 100) * alNum * bdNum;

      // Calculate threshold water volume (W_threshold)
      const wThreshold = (wateringThresholdNum / 100) * (fcNum / 100) * alNum * bdNum;

      let status = '';
      let daysToNextIrrigation = null;
      let recommendedIrrigationRate = null;

      if (wActual >= wThreshold) {
        status = t('irrigation.status.irrigationNotRequired');
        daysToNextIrrigation = (wActual - wThreshold) / etc;
      } else {
        status = t('irrigation.status.irrigationRequired');
        const ir = ((fcNum - gsmNum) / 100) * alNum * bdNum;
        recommendedIrrigationRate = ir / (irrigationEfficiencyNum / 100);
      }

      const { error } = await saveIrrigationCalculation(user.id, {
        region_name: regionName!,
        temperature: 0, // We don't have temperature in this modal, but it's required
        pet_value: petValue,
        crop_name: selectedCrop,
        planting_date: plantingDate,
        calculation_date: currentDate,
        gsm: gsmNum,
        al: alNum,
        bd: bdNum,
        fc: fcNum,
        watering_threshold: wateringThresholdNum,
        irrigation_efficiency: irrigationEfficiencyNum,
        etc: etc,
        status: status,
        days_to_next_irrigation: daysToNextIrrigation,
        recommended_irrigation_rate: recommendedIrrigationRate,
      });

      if (error) {
        console.error('Error saving irrigation calculation:', error);
        setSaveStatus('error');
      } else {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error saving irrigation calculation:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Sprout className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">{t('irrigation.title')}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('irrigation.step1Title')}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.selectCrop')}
                  </label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('irrigation.chooseCrop')}</option>
                    {crops.map(crop => (
                      <option key={crop.name} value={crop.name}>{t(`irrigation.crops.${crop.name}`)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.regionalClimateType')}
                  </label>
                  <select
                    value={selectedRegionType}
                    onChange={(e) => setSelectedRegionType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t('irrigation.chooseClimateType')}</option>
                    {regionTypes.map(type => (
                      <option key={type} value={type}>{t(`irrigation.climateTypes.${type}`)}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedCrop || !selectedRegionType}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('irrigation.nextSetDates')}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('irrigation.step2Title')}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {t('irrigation.plantingDate')}
                  </label>
                  <input
                    type="date"
                    value={plantingDate}
                    onChange={(e) => setPlantingDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {t('irrigation.currentDate')}
                  </label>
                  <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {t('irrigation.buttons.back')}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!plantingDate || !currentDate}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {t('irrigation.nextSoilData')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('irrigation.step3Title')}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.gravimetricSoilMoisture')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={gsm}
                    onChange={(e) => setGsm(e.target.value)}
                    placeholder={t('irrigation.placeholders.gsm')}
                    title={t('irrigation.tooltips.gsm')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.activeSoilLayer')}
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={al}
                    onChange={(e) => setAl(e.target.value)}
                    placeholder={t('irrigation.placeholders.al')}
                    title={t('irrigation.tooltips.al')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.soilBulkDensity')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={bd}
                    onChange={(e) => setBd(e.target.value)}
                    placeholder={t('irrigation.placeholders.bd')}
                    title={t('irrigation.tooltips.bd')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.fieldCapacity')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={fc}
                    onChange={(e) => setFc(e.target.value)}
                    placeholder={t('irrigation.placeholders.fc')}
                    title={t('irrigation.tooltips.fc')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.wateringThreshold')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={wateringThreshold}
                    onChange={(e) => setWateringThreshold(e.target.value)}
                    placeholder={t('irrigation.placeholders.wateringThreshold')}
                    title={t('irrigation.tooltips.wateringThreshold')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('irrigation.irrigationEfficiency')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={irrigationEfficiency}
                    onChange={(e) => setIrrigationEfficiency(e.target.value)}
                    placeholder={t('irrigation.placeholders.irrigationEfficiency')}
                    title={t('irrigation.tooltips.irrigationEfficiency')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {t('irrigation.buttons.back')}
                  </button>
                  <button
                    onClick={() => {
                      calculateIrrigation();
                      setStep(4);
                    }}
                    disabled={!gsm || !al || !bd || !fc || !wateringThreshold || !irrigationEfficiency}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Calculator className="inline h-4 w-4 mr-1" />
                    {t('irrigation.buttons.calculate')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && result && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t('irrigation.irrigationRecommendation')}</h3>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Droplets className="h-6 w-6 text-green-600" />
                  <span className="font-semibold text-green-800">{t('irrigation.resultsFor', { region: t(`common:regionSelector.regions.${regionName}`) })}</span>
                </div>
                <pre className="text-sm text-green-700 whitespace-pre-wrap font-mono">
                  {result}
                </pre>
              </div>

              {user && (
                <button
                  onClick={handleSaveResult}
                  disabled={isSaving || saveStatus === 'saved'}
                  className={`w-full mb-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    saveStatus === 'saved'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : saveStatus === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {saveStatus === 'saving' && (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('irrigation.status.saving')}</span>
                    </>
                  )}
                  {saveStatus === 'saved' && (
                    <>
                      <Check className="h-4 w-4" />
                      <span>{t('irrigation.status.savedSuccessfully')}</span>
                    </>
                  )}
                  {(saveStatus === 'idle' || saveStatus === 'error') && (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{saveStatus === 'error' ? t('irrigation.status.retrySave') : t('irrigation.status.saveResult')}</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {t('irrigation.buttons.done')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IrrigationModal;