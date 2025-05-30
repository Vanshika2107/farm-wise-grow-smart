
import { useState } from 'react';
import FarmInputForm from '@/components/FarmInputForm';
import RecommendationDashboard from '@/components/RecommendationDashboard';
import FertilizerMarketplace from '@/components/FertilizerMarketplace';
import LanguageSelector from '@/components/LanguageSelector';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, ShoppingCart, BarChart3 } from 'lucide-react';
import { Language, getTranslation } from '@/utils/translations';

export interface FarmData {
  soilType: string;
  previousCrop: string;
  budget: number;
  location: string;
  season: string;
}

export interface Recommendation {
  crops: Array<{
    name: string;
    yield: number;
    profit: number;
    sustainability: number;
    difficulty: string;
  }>;
  fertilizers: Array<{
    name: string;
    amount: string;
    cost: number;
    effectiveness: number;
  }>;
  totalCost: number;
  projectedRevenue: number;
  sustainabilityScore: number;
}

const Index = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<Array<{id: string, name: string, price: number, quantity: number}>>([]);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
  };

  const handleFormSubmit = async (data: FarmData) => {
    setIsLoading(true);
    setFarmData(data);
    
    // Simulate ML processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate recommendations based on input - updated for Indian context
    const mockRecommendations: Recommendation = {
      crops: [
        { name: 'Rice', yield: 25, profit: 280000, sustainability: 85, difficulty: 'Medium' },
        { name: 'Wheat', yield: 35, profit: 220000, sustainability: 80, difficulty: 'Easy' },
        { name: 'Sugarcane', yield: 60, profit: 350000, sustainability: 70, difficulty: 'Hard' },
      ],
      fertilizers: [
        { name: 'Organic Compost', amount: '500kg', cost: 12000, effectiveness: 90 },
        { name: 'NPK 10-10-10', amount: '200kg', cost: 6500, effectiveness: 85 },
        { name: 'Urea', amount: '150kg', cost: 4500, effectiveness: 80 },
      ],
      totalCost: 23000,
      projectedRevenue: 350000,
      sustainabilityScore: 82,
    };
    
    setRecommendations(mockRecommendations);
    setIsLoading(false);
  };

  const addToCart = (item: {id: string, name: string, price: number}) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i);
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? {...item, quantity} : item
      ));
    }
  };

  // Show language selector if no language is selected
  if (!language) {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b-2 border-green-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Sprout className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              {getTranslation('appName', language)}
            </h1>
            <span className="text-lg text-green-600 font-medium">
              {getTranslation('tagline', language)}
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            {getTranslation('description', language)}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!farmData ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {getTranslation('tellUsAboutFarm', language)}
                </h2>
                <p className="text-gray-600">
                  {getTranslation('analyzeConditions', language)}
                </p>
              </div>
              <FarmInputForm onSubmit={handleFormSubmit} isLoading={isLoading} language={language} />
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="recommendations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                {getTranslation('analysis', language)}
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                {getTranslation('shop', language)} ({cartItems.length})
              </TabsTrigger>
              <TabsTrigger value="new-analysis" className="flex items-center gap-2">
                <Sprout className="h-4 w-4" />
                {getTranslation('newAnalysis', language)}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations">
              {recommendations && (
                <RecommendationDashboard 
                  recommendations={recommendations} 
                  farmData={farmData}
                />
              )}
            </TabsContent>

            <TabsContent value="marketplace">
              <FertilizerMarketplace 
                recommendations={recommendations}
                cartItems={cartItems}
                onAddToCart={addToCart}
                onUpdateQuantity={updateCartQuantity}
              />
            </TabsContent>

            <TabsContent value="new-analysis">
              <div className="max-w-2xl mx-auto">
                <Card className="p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {getTranslation('newFarmAnalysis', language)}
                    </h2>
                    <p className="text-gray-600">
                      {getTranslation('startFresh', language)}
                    </p>
                  </div>
                  <FarmInputForm onSubmit={handleFormSubmit} isLoading={isLoading} language={language} />
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Index;
