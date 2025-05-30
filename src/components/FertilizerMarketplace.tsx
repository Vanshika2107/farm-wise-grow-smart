import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Recommendation } from '@/pages/Index';
import { ShoppingCart, Plus, Minus, Star, Truck, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Language, getTranslation, getFertilizerName, getProductName } from '@/utils/translations';

interface FertilizerMarketplaceProps {
  recommendations: Recommendation | null;
  cartItems: Array<{id: string, name: string, price: number, quantity: number}>;
  onAddToCart: (item: {id: string, name: string, price: number}) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  language: Language;
}

const FertilizerMarketplace = ({ 
  recommendations, 
  cartItems, 
  onAddToCart, 
  onUpdateQuantity,
  language 
}: FertilizerMarketplaceProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  // Extended product catalog
  const allProducts = [
    // Recommended products from analysis
    ...(recommendations?.fertilizers.map(fert => ({
      id: fert.name.toLowerCase().replace(/\s+/g, '-'),
      name: getFertilizerName(fert.name, language),
      originalName: fert.name,
      price: fert.cost,
      unit: getTranslation('perBag', language),
      rating: 4.5,
      reviews: 128,
      category: 'fertilizer',
      isRecommended: true,
      effectiveness: fert.effectiveness,
      description: `High-quality ${fert.name.toLowerCase()} perfect for your soil conditions.`,
      features: [getTranslation('slowRelease', language), getTranslation('weatherResistant', language), getTranslation('organicCertified', language)],
      inStock: true,
      fastShipping: true,
    })) || []),
    
    // Additional products
    {
      id: 'premium-compost',
      name: getTranslation('premiumOrganicCompost', language),
      originalName: 'Premium Organic Compost',
      price: 180,
      unit: getTranslation('perCubicYard', language),
      rating: 4.8,
      reviews: 89,
      category: 'organic',
      isRecommended: false,
      effectiveness: 95,
      description: 'Rich, aged compost that improves soil structure and fertility.',
      features: [getTranslation('hundredPercent', language), getTranslation('aged12Months', language), getTranslation('pathogenFree', language)],
      inStock: true,
      fastShipping: false,
    },
    {
      id: 'soil-ph-tester',
      name: getTranslation('digitalSoilPhTester', language),
      originalName: 'Digital Soil pH Tester',
      price: 35,
      unit: getTranslation('perDevice', language),
      rating: 4.3,
      reviews: 234,
      category: 'equipment',
      isRecommended: false,
      effectiveness: null,
      description: 'Accurate digital pH meter for soil testing.',
      features: [getTranslation('digitalDisplay', language), getTranslation('waterproof', language), getTranslation('twoYearWarranty', language)],
      inStock: true,
      fastShipping: true,
    },
    {
      id: 'drip-irrigation-kit',
      name: getTranslation('dripIrrigationStarterKit', language),
      originalName: 'Drip Irrigation Starter Kit',
      price: 125,
      unit: getTranslation('perKit', language),
      rating: 4.6,
      reviews: 156,
      category: 'equipment',
      isRecommended: false,
      effectiveness: null,
      description: 'Complete drip irrigation system for efficient water usage.',
      features: [getTranslation('easyInstall', language), getTranslation('timerIncluded', language), getTranslation('adjustableFlow', language)],
      inStock: true,
      fastShipping: true,
    },
  ];

  const categories = [
    { id: 'all', name: getTranslation('allProducts', language) },
    { id: 'fertilizer', name: getTranslation('fertilizers', language) },
    { id: 'organic', name: getTranslation('organic', language) },
    { id: 'equipment', name: getTranslation('equipment', language) },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCartItemQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: any) => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    toast({
      title: getTranslation('addedToCart', language),
      description: `${product.name} ${getTranslation('addedToCartDesc', language)}`,
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    toast({
      title: getTranslation('orderPlaced', language),
      description: `${getTranslation('total', language)}: ${cartQuantity} ${getTranslation('items', language)} ₹${cartTotal.toFixed(2)} ${getTranslation('orderPlacedDesc', language)}`,
    });
    
    // Clear cart after successful order
    cartItems.forEach(item => onUpdateQuantity(item.id, 0));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{getTranslation('fertilizerMarketplace', language)}</h2>
          <p className="text-gray-600">{getTranslation('marketplaceDesc', language)}</p>
        </div>
        
        {cartItems.length > 0 && (
          <Card className="md:w-80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{getTranslation('cart', language)} ({cartQuantity} {getTranslation('items', language)})</span>
                <span className="font-bold text-green-600">₹{cartTotal.toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {getTranslation('checkoutNow', language)}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const cartQuantity = getCartItemQuantity(product.id);
          
          return (
            <Card key={product.id} className={`relative ${product.isRecommended ? 'ring-2 ring-green-500' : ''}`}>
              {product.isRecommended && (
                <Badge className="absolute -top-2 -right-2 bg-green-600 text-white">
                  {getTranslation('recommended', language)}
                </Badge>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{product.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {product.features.map((feature: string) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Effectiveness (for fertilizers) */}
                {product.effectiveness && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{getTranslation('effectiveness', language)}:</span>
                    <span className="font-medium text-green-600">{product.effectiveness}%</span>
                  </div>
                )}

                {/* Shipping Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {product.fastShipping && (
                    <div className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      <span>{getTranslation('fastShip', language)}</span>
                    </div>
                  )}
                  {product.inStock && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>{getTranslation('inStock', language)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price and Actions */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                      <span className="text-sm text-gray-600 ml-1">{product.unit}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} {getTranslation('reviews', language)})</span>
                  </div>

                  {cartQuantity === 0 ? (
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!product.inStock}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {getTranslation('addToCart', language)}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={cartQuantity}
                        onChange={(e) => onUpdateQuantity(product.id, parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min="0"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm text-gray-600 ml-2">
                        ₹{(product.price * cartQuantity).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <Card className="sticky bottom-4 bg-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{getTranslation('shoppingCart', language)}</p>
                <p className="text-sm text-gray-600">{cartQuantity} {getTranslation('items', language)} • {getTranslation('total', language)}: ₹{cartTotal.toFixed(2)}</p>
              </div>
              <Button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {getTranslation('checkout', language)}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FertilizerMarketplace;
