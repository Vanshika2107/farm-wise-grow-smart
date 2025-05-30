
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

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silty', 'Peaty', 'Chalky'];
  const cropTypes = ['Corn', 'Wheat', 'Rice', 'Soybeans', 'Tomatoes', 'Potatoes', 'None (First Time)'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

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
            <SelectContent>
              {cropTypes.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-base font-medium">Budget for Inputs ($)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="e.g. 500"
            className="h-12 text-base"
            value={formData.budget || ''}
            onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value) || 0})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base font-medium">Location (City, State)</Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g. Des Moines, Iowa"
            className="h-12 text-base"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
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
