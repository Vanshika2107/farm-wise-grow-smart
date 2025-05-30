
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import { Language, getTranslation } from '@/utils/translations';
import { useToast } from '@/hooks/use-toast';

interface LanguageSettingsProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSettings = ({ currentLanguage, onLanguageChange }: LanguageSettingsProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLanguage);
  const { toast } = useToast();

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' }
  ];

  const handleSaveLanguage = () => {
    onLanguageChange(selectedLanguage);
    toast({
      title: getTranslation('languageUpdated', selectedLanguage),
      description: getTranslation('languageUpdatedDesc', selectedLanguage),
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-green-600" />
            <CardTitle className="text-2xl">
              {getTranslation('languageSettings', currentLanguage)}
            </CardTitle>
          </div>
          <p className="text-gray-600">
            {getTranslation('languageSettingsDesc', currentLanguage)}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value as Language)}
            className="space-y-4"
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
            onClick={handleSaveLanguage}
            className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
            disabled={selectedLanguage === currentLanguage}
          >
            {getTranslation('saveLanguage', currentLanguage)}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSettings;
