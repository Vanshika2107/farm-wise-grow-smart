
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FarmData, Recommendation } from '@/pages/Index';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Leaf, Award } from 'lucide-react';

interface RecommendationDashboardProps {
  recommendations: Recommendation;
  farmData: FarmData;
}

const RecommendationDashboard = ({ recommendations, farmData }: RecommendationDashboardProps) => {
  const cropData = recommendations.crops.map(crop => ({
    name: crop.name,
    yield: crop.yield,
    profit: crop.profit,
  }));

  const fertilizerData = recommendations.fertilizers.map(fert => ({
    name: fert.name,
    effectiveness: fert.effectiveness,
    cost: fert.cost,
  }));

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Farm Summary */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Farm Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-green-100">Soil Type</p>
              <p className="font-bold text-lg">{farmData.soilType}</p>
            </div>
            <div>
              <p className="text-green-100">Previous Crop</p>
              <p className="font-bold text-lg">{farmData.previousCrop}</p>
            </div>
            <div>
              <p className="text-green-100">Budget</p>
              <p className="font-bold text-lg">${farmData.budget}</p>
            </div>
            <div>
              <p className="text-green-100">Location</p>
              <p className="font-bold text-lg">{farmData.location}</p>
            </div>
            <div>
              <p className="text-green-100">Season</p>
              <p className="font-bold text-lg">{farmData.season}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-green-600">${recommendations.totalCost}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Projected Revenue</p>
                <p className="text-2xl font-bold text-blue-600">${recommendations.projectedRevenue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expected Profit</p>
                <p className="text-2xl font-bold text-emerald-600">${recommendations.projectedRevenue - recommendations.totalCost}</p>
              </div>
              <Award className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sustainability Score</p>
                <p className="text-2xl font-bold text-green-600">{recommendations.sustainabilityScore}/100</p>
              </div>
              <Leaf className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Crops */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Recommended Crops
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {recommendations.crops.map((crop, index) => (
              <Card key={crop.name} className="relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{crop.name}</h3>
                    <Badge className={getDifficultyColor(crop.difficulty)}>
                      {crop.difficulty}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expected Yield</span>
                      <span className="font-medium">{crop.yield} tons/acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Profit Potential</span>
                      <span className="font-medium text-green-600">${crop.profit}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sustainability</span>
                        <span className="font-medium">{crop.sustainability}%</span>
                      </div>
                      <Progress value={crop.sustainability} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="h-64">
            <h4 className="font-medium mb-4">Crop Comparison - Profit Potential</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value}`, name === 'profit' ? 'Profit' : 'Yield']} />
                <Bar dataKey="profit" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Fertilizer Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Recommended Fertilizers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {recommendations.fertilizers.map((fertilizer) => (
              <Card key={fertilizer.name}>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{fertilizer.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount Needed</span>
                      <span className="font-medium">{fertilizer.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cost</span>
                      <span className="font-medium text-green-600">${fertilizer.cost}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Effectiveness</span>
                        <span className="font-medium">{fertilizer.effectiveness}%</span>
                      </div>
                      <Progress value={fertilizer.effectiveness} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="h-64">
            <h4 className="font-medium mb-4">Fertilizer Effectiveness vs Cost</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fertilizerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, effectiveness }) => `${name}: ${effectiveness}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="effectiveness"
                >
                  {fertilizerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationDashboard;
