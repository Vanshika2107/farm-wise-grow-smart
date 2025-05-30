
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Recommendation } from '@/pages/Index';
import { ShoppingCart, Plus, Minus, Star, Truck, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FertilizerMarketplaceProps {
  recommendations: Recommendation | null;
  cartItems: Array<{id: string, name: string, price: number, quantity: number}>;
  onAddToCart: (item: {id: string, name: string, price: number}) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const FertilizerMarketplace = ({ 
  recommendations, 
  cartItems, 
  onAddToCart, 
  onUpdateQuantity 
}: FertilizerMarketplaceProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  // Extended product catalog
  const allProducts = [
    // Recommended products from analysis
    ...(recommendations?.fertilizers.map(fert => ({
      id: fert.name.toLowerCase().replace(/\s+/g, '-'),
      name: fert.name,
      price: fert.cost,
      unit: 'per bag (50kg)',
      rating: 4.5,
      reviews: 128,
      category: 'fertilizer',
      isRecommended: true,
      effectiveness: fert.effectiveness,
      description: `High-quality ${fert.name.toLowerCase()} perfect for your soil conditions.`,
      features: ['Slow Release', 'Weather Resistant', 'Organic Certified'],
      inStock: true,
      fastShipping: true,
    })) || []),
    
    // Additional products
    {
      id: 'premium-compost',
      name: 'Premium Organic Compost',
      price: 180,
      unit: 'per cubic yard',
      rating: 4.8,
      reviews: 89,
      category: 'organic',
      isRecommended: false,
      effectiveness: 95,
      description: 'Rich, aged compost that improves soil structure and fertility.',
      features: ['100% Organic', 'Aged 12 Months', 'Pathogen Free'],
      inStock: true,
      fastShipping: false,
    },
    {
      id: 'soil-ph-tester',
      name: 'Digital Soil pH Tester',
      price: 35,
      unit: 'per device',
      rating: 4.3,
      reviews: 234,
      category: 'equipment',
      isRecommended: false,
      effectiveness: null,
      description: 'Accurate digital pH meter for soil testing.',
      features: ['Digital Display', 'Waterproof', '2 Year Warranty'],
      inStock: true,
      fastShipping: true,
    },
    {
      id: 'drip-irrigation-kit',
      name: 'Drip Irrigation Starter Kit',
      price: 125,
      unit: 'per kit (covers 100 sq ft)',
      rating: 4.6,
      reviews: 156,
      category: 'equipment',
      isRecommended: false,
      effectiveness: null,
      description: 'Complete drip irrigation system for efficient water usage.',
      features: ['Easy Install', 'Timer Included', 'Adjustable Flow'],
      inStock: true,
      fastShipping: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fertilizer', name: 'Fertilizers' },
    { id: 'organic', name: 'Organic' },
    { id: 'equipment', name: 'Equipment' },
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
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    toast({
      title: "Order Placed!",
      description: `Your order of ${cartQuantity} items totaling $${cartTotal.toFixed(2)} has been placed. Expected delivery: 3-5 business days.`,
    });
    
    // Clear cart after successful order
    cartItems.forEach(item => onUpdateQuantity(item.id, 0));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Fertilizer Marketplace</h2>
          <p className="text-gray-600">Get the best products for your farm delivered to your door</p>
        </div>
        
        {cartItems.length > 0 && (
          <Card className="md:w-80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Cart ({cartQuantity} items)</span>
                <span className="font-bold text-green-600">${cartTotal.toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Checkout Now
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
                  Recommended
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
                  {product.features.map(feature => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Effectiveness (for fertilizers) */}
                {product.effectiveness && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Effectiveness:</span>
                    <span className="font-medium text-green-600">{product.effectiveness}%</span>
                  </div>
                )}

                {/* Shipping Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {product.fastShipping && (
                    <div className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      <span>Fast Ship</span>
                    </div>
                  )}
                  {product.inStock && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>In Stock</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price and Actions */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-gray-600 ml-1">{product.unit}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  {cartQuantity === 0 ? (
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!product.inStock}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
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
                        ${(product.price * cartQuantity).toFixed(2)}
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
                <p className="font-medium">Shopping Cart</p>
                <p className="text-sm text-gray-600">{cartQuantity} items • Total: ${cartTotal.toFixed(2)}</p>
              </div>
              <Button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FertilizerMarketplace;
