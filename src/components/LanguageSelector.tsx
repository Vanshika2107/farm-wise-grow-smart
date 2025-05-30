
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import { Language, getTranslation } from '@/utils/translations';

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
}

const LanguageSelector = ({ onLanguageSelect }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' }
  ];

  const handleContinue = () => {
    onLanguageSelect(selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {getTranslation('selectLanguage', selectedLanguage)}
          </h1>
          <p className="text-gray-600">
            {getTranslation('selectLanguageDesc', selectedLanguage)}
          </p>
        </div>

        <RadioGroup
          value={selectedLanguage}
          onValueChange={(value) => setSelectedLanguage(value as Language)}
          className="space-y-4 mb-8"
        >
          {languages.map((language) => (
            <div key={language.code} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
              <RadioGroupItem value={language.code} id={language.code} />
              <Label 
                htmlFor={language.code} 
                className="flex-1 cursor-pointer text-base font-medium"
              >
                <div className="flex items-center justify-between">
                  <span>{language.name}</span>
                  <span className="text-lg">{language.nativeName}</span>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Button 
          onClick={handleContinue}
          className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
        >
          {getTranslation('continue', selectedLanguage)}
        </Button>
      </Card>
    </div>
  );
};

export default LanguageSelector;
