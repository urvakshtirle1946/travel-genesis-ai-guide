
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Navigation } from 'lucide-react';

interface ShoppingRecommendationsProps {
  destination: string;
}

interface ShoppingOption {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reviews: number;
  description: string;
  bestFor: string[];
  location: string;
}

const ShoppingRecommendations: React.FC<ShoppingRecommendationsProps> = ({ destination }) => {
  const [options, setOptions] = React.useState<ShoppingOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<'all' | 'affordable' | 'luxury'>('affordable');

  React.useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockOptions = generateMockShoppingOptions(destination);
      setOptions(mockOptions);
      setLoading(false);
    }, 800);
  }, [destination]);

  const generateMockShoppingOptions = (location: string): ShoppingOption[] => {
    const dest = location.toLowerCase().split(',')[0];
    const options: ShoppingOption[] = [];
    
    // Generic shopping options based on destination
    if (dest.includes('bali')) {
      options.push(
        {
          id: 'shop-1',
          name: 'Ubud Art Market',
          category: 'Local Crafts',
          priceRange: 'Budget',
          rating: 4.5,
          reviews: 1245,
          description: 'Traditional art crafts, clothing and souvenirs at negotiable prices.',
          bestFor: ['Handcrafts', 'Souvenirs', 'Textiles'],
          location: 'Ubud, Central Bali'
        },
        {
          id: 'shop-2',
          name: 'Seminyak Village',
          category: 'Modern Mall',
          priceRange: 'Moderate',
          rating: 4.2,
          reviews: 876,
          description: 'Upscale shopping center with local designer boutiques and international brands.',
          bestFor: ['Fashion', 'Design', 'Accessories'],
          location: 'Seminyak, South Bali'
        },
        {
          id: 'shop-3',
          name: 'Sukawati Art Market',
          category: 'Local Crafts',
          priceRange: 'Budget',
          rating: 4.3,
          reviews: 950,
          description: 'Wholesale market with the lowest prices for Balinese crafts and souvenirs.',
          bestFor: ['Bargain Hunting', 'Bulk Buying', 'Local Art'],
          location: 'Sukawati, Gianyar'
        }
      );
    } else if (dest.includes('paris')) {
      options.push(
        {
          id: 'shop-1',
          name: 'Le Marais Vintage Shops',
          category: 'Vintage & Second-hand',
          priceRange: 'Budget to Moderate',
          rating: 4.6,
          reviews: 1890,
          description: 'District filled with vintage and second-hand shops with unique finds at reasonable prices.',
          bestFor: ['Vintage Fashion', 'Unique Items', 'Sustainable Shopping'],
          location: 'Le Marais District'
        },
        {
          id: 'shop-2',
          name: 'Galeries Lafayette',
          category: 'Department Store',
          priceRange: 'Moderate to Luxury',
          rating: 4.4,
          reviews: 3250,
          description: 'Famous department store with a wide range of products and amazing architecture.',
          bestFor: ['Fashion', 'Beauty', 'Souvenirs'],
          location: 'Boulevard Haussmann'
        },
        {
          id: 'shop-3',
          name: 'Saint-Ouen Flea Market',
          category: 'Flea Market',
          priceRange: 'Budget',
          rating: 4.7,
          reviews: 2100,
          description: 'One of the largest flea markets in the world with amazing antiques and bargains.',
          bestFor: ['Antiques', 'Collectibles', 'Bargain Hunting'],
          location: 'Saint-Ouen, North Paris'
        }
      );
    } else if (dest.includes('tokyo')) {
      options.push(
        {
          id: 'shop-1',
          name: 'Don Quijote Shibuya',
          category: 'Discount Store',
          priceRange: 'Budget',
          rating: 4.5,
          reviews: 2340,
          description: 'Multi-level discount store with everything from snacks to electronics at low prices.',
          bestFor: ['Souvenirs', 'Snacks', 'Daily Necessities'],
          location: 'Shibuya'
        },
        {
          id: 'shop-2',
          name: 'Nakamise Shopping Street',
          category: 'Traditional Market',
          priceRange: 'Budget to Moderate',
          rating: 4.3,
          reviews: 1870,
          description: 'Historic shopping street with traditional Japanese souvenirs and street food.',
          bestFor: ['Traditional Crafts', 'Japanese Snacks', 'Cultural Gifts'],
          location: 'Asakusa'
        },
        {
          id: 'shop-3',
          name: 'Shimokitazawa Thrift Stores',
          category: 'Second-hand & Vintage',
          priceRange: 'Budget',
          rating: 4.8,
          reviews: 1560,
          description: 'Hip neighborhood filled with affordable vintage and second-hand clothing stores.',
          bestFor: ['Vintage Fashion', 'Records', 'Unique Finds'],
          location: 'Shimokitazawa'
        }
      );
    } else if (dest.includes('new york')) {
      options.push(
        {
          id: 'shop-1',
          name: 'Chelsea Market',
          category: 'Indoor Market',
          priceRange: 'Moderate',
          rating: 4.6,
          reviews: 3100,
          description: 'Food hall and shopping mall with unique independent retailers.',
          bestFor: ['Food', 'Gifts', 'Artisanal Products'],
          location: 'Chelsea, Manhattan'
        },
        {
          id: 'shop-2',
          name: 'Century 21',
          category: 'Discount Department Store',
          priceRange: 'Budget to Moderate',
          rating: 4.4,
          reviews: 2950,
          description: 'Designer goods at discounted prices - a NYC shopping institution.',
          bestFor: ['Designer Discounts', 'Fashion', 'Accessories'],
          location: 'Financial District, Manhattan'
        },
        {
          id: 'shop-3',
          name: 'Brooklyn Flea',
          category: 'Flea Market',
          priceRange: 'Budget',
          rating: 4.7,
          reviews: 1870,
          description: 'Weekend market featuring vintage items, crafts, and local food vendors.',
          bestFor: ['Vintage', 'Handmade Items', 'Local Products'],
          location: 'Various Locations in Brooklyn'
        }
      );
    } else {
      // Generic options for any destination
      options.push(
        {
          id: 'shop-1',
          name: `${dest} Central Market`,
          category: 'Local Market',
          priceRange: 'Budget',
          rating: 4.3,
          reviews: Math.floor(Math.random() * 1000) + 500,
          description: 'The main local market with authentic goods and local specialties.',
          bestFor: ['Local Products', 'Souvenirs', 'Food Items'],
          location: `Central ${dest}`
        },
        {
          id: 'shop-2',
          name: `${dest} Shopping District`,
          category: 'Shopping Area',
          priceRange: 'Moderate',
          rating: 4.1,
          reviews: Math.floor(Math.random() * 1000) + 300,
          description: 'Main shopping area with a variety of stores and boutiques.',
          bestFor: ['Fashion', 'Gifts', 'Local Designs'],
          location: `Downtown ${dest}`
        },
        {
          id: 'shop-3',
          name: `${dest} Outlet Mall`,
          category: 'Outlet Shopping',
          priceRange: 'Budget to Moderate',
          rating: 4.4,
          reviews: Math.floor(Math.random() * 1000) + 200,
          description: 'Outlet stores with discounted prices on major brands.',
          bestFor: ['Discounts', 'Brand Names', 'Value Shopping'],
          location: `Outside ${dest} center`
        }
      );
    }
    
    return options.filter(option => 
      filter === 'all' || 
      (filter === 'affordable' && (option.priceRange.includes('Budget'))) ||
      (filter === 'luxury' && option.priceRange.includes('Luxury'))
    );
  };

  const filteredOptions = options.filter(option => {
    if (filter === 'all') return true;
    if (filter === 'affordable') return option.priceRange.includes('Budget');
    if (filter === 'luxury') return option.priceRange.includes('Luxury');
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Shopping Recommendations
        </CardTitle>
        <div className="flex gap-2 mt-2">
          <Badge 
            onClick={() => setFilter('all')} 
            className={`cursor-pointer ${filter === 'all' ? 'bg-travel-blue' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            All
          </Badge>
          <Badge 
            onClick={() => setFilter('affordable')} 
            className={`cursor-pointer ${filter === 'affordable' ? 'bg-travel-teal' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Best Value
          </Badge>
          <Badge 
            onClick={() => setFilter('luxury')} 
            className={`cursor-pointer ${filter === 'luxury' ? 'bg-travel-navy' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Luxury
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-travel-blue"></div>
            <p className="mt-2 text-gray-500">Finding the best shopping spots...</p>
          </div>
        ) : filteredOptions.length > 0 ? (
          <div className="space-y-4">
            {filteredOptions.map((option) => (
              <div key={option.id} className="border rounded-lg p-4 hover:border-travel-teal hover:bg-travel-teal/5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{option.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`h-3 w-3 ${star <= Math.floor(option.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        {option.rating.toFixed(1)} ({option.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-travel-blue/10 text-travel-blue hover:bg-travel-blue/20 border-none">
                      {option.category}
                    </Badge>
                    <div className="text-sm text-gray-500 mt-1 text-right">{option.priceRange}</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">{option.description}</p>
                
                <div className="mt-3">
                  <div className="text-xs text-gray-500">Best for:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {option.bestFor.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <Navigation className="h-4 w-4 mr-1" />
                  {option.location}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No shopping recommendations found for {destination}.</p>
            <p className="mt-2">Try adjusting your filters or destination.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingRecommendations;
