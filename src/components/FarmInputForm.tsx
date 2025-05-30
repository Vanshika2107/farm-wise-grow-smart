
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FarmData } from '@/pages/Index';
import { Sprout } from 'lucide-react';

interface FarmInputFormProps {
  onSubmit: (data: FarmData) => void;
  isLoading: boolean;
}

const FarmInputForm = ({ onSubmit, isLoading }: FarmInputFormProps) => {
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
          <Label htmlFor="soilType" className="text-base font-medium">Soil Type</Label>
          <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your soil type" />
            </SelectTrigger>
            <SelectContent>
              {soilTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="previousCrop" className="text-base font-medium">Previous Crop</Label>
          <Select value={formData.previousCrop} onValueChange={(value) => setFormData({...formData, previousCrop: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="What did you grow last?" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {cropTypes.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-medium">Budget for Inputs (₹)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="e.g. 50000"
            className="h-12 text-base"
            value={formData.budget || ''}
            onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base font-medium">State</Label>
          <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {indianStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="season" className="text-base font-medium">Growing Season</Label>
          <Select value={formData.season} onValueChange={(value) => setFormData({...formData, season: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select growing season" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map(season => (
                <SelectItem key={season} value={season}>{season}</SelectItem>
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
            Analyzing Farm Conditions...
          </div>
        ) : (
          'Get Smart Recommendations'
        )}
      </Button>
    </form>
  );
};

export default FarmInputForm;
