
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FarmData } from '@/pages/Index';
import { Sprout } from 'lucide-react';
import { Language, getTranslation, getCropName, getSoilTypeName, getSeasonName } from '@/utils/translations';

interface FarmInputFormProps {
  onSubmit: (data: FarmData) => void;
  isLoading: boolean;
  language: Language;
}

const FarmInputForm = ({ onSubmit, isLoading, language }: FarmInputFormProps) => {
  const [formData, setFormData] = useState<FarmData>({
    soilType: '',
    previousCrop: '',
    budget: 0,
    location: '',
    season: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.soilType && formData.previousCrop && formData.budget && formData.location && formData.season) {
      onSubmit(formData);
    }
  };

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky', 'Black Cotton', 'Red Soil', 'Laterite'];
  
  const cropTypes = [
    'Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton', 'Soybeans', 'Groundnut', 'Sunflower',
    'Mustard', 'Barley', 'Jowar', 'Bajra', 'Ragi', 'Tomatoes', 'Potatoes', 'Onions',
    'Garlic', 'Chili', 'Turmeric', 'Ginger', 'Cardamom', 'Black Pepper', 'Tea', 'Coffee',
    'Coconut', 'Areca Nut', 'Cashew', 'Mango', 'Banana', 'Pomegranate', 'Grapes',
    'Orange', 'Apple', 'Guava', 'Papaya', 'Jackfruit', 'Pulses', 'Chickpea', 'Lentils',
    'Black Gram', 'Green Gram', 'Pigeon Pea', 'None (First Time)'
  ];
  
  const seasons = ['Spring', 'Summer', 'Monsoon (Kharif)', 'Post-Monsoon (Rabi)', 'Winter', 'Rainy Season'];
  
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 
    'Ladakh', 'Puducherry', 'Chandigarh', 'Andaman and Nicobar Islands', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="soilType" className="text-base font-medium">
            {getTranslation('soilType', language)}
          </Label>
          <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={getTranslation('selectSoilType', language)} />
            </SelectTrigger>
            <SelectContent>
              {soilTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {getSoilTypeName(type, language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="previousCrop" className="text-base font-medium">
            {getTranslation('previousCrop', language)}
          </Label>
          <Select value={formData.previousCrop} onValueChange={(value) => setFormData({...formData, previousCrop: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={getTranslation('whatDidYouGrow', language)} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {cropTypes.map(crop => (
                <SelectItem key={crop} value={crop}>
                  {getCropName(crop, language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-medium">
            {getTranslation('budget', language)}
          </Label>
          <Input
            id="budget"
            type="number"
            placeholder={getTranslation('budgetPlaceholder', language)}
            className="h-12 text-base"
            value={formData.budget || ''}
            onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base font-medium">
            {getTranslation('state', language)}
          </Label>
          <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={getTranslation('selectState', language)} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {indianStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="season" className="text-base font-medium">
            {getTranslation('growingSeason', language)}
          </Label>
          <Select value={formData.season} onValueChange={(value) => setFormData({...formData, season: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={getTranslation('selectSeason', language)} />
            </SelectTrigger>
            <SelectContent>
              {seasons.map(season => (
                <SelectItem key={season} value={season}>
                  {getSeasonName(season, language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
        disabled={isLoading || !formData.soilType || !formData.previousCrop || !formData.budget || !formData.location || !formData.season}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Sprout className="h-5 w-5 animate-spin" />
            {getTranslation('analyzing', language)}
          </div>
        ) : (
          getTranslation('getRecommendations', language)
        )}
      </Button>
    </form>
  );
};

export default FarmInputForm;

