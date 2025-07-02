import React, { useState } from 'react';
import { Wine, Award, MapPin, Calendar, Star, X } from 'lucide-react';
import { Wine as WineType } from '../types';

interface WineListProps {
  isOpen: boolean;
  onClose: () => void;
  wines: WineType[];
}

export default function WineList({ isOpen, onClose, wines }: WineListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Red', 'White', 'Sparkling', 'Rosé', 'Dessert'];

  const filteredWines = wines.filter(wine => {
    const matchesCategory = selectedCategory === 'All' || wine.category === selectedCategory;
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Wine className="h-8 w-8 text-amber-400" />
              <h2 className="text-4xl font-serif">Wine Cellar</h2>
            </div>
            <p className="text-amber-200 font-light text-lg">Curated Selection of Premium Italian Wines</p>
            <p className="text-white/80 text-sm mt-2">Over 500 bottles from renowned Italian vineyards</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search wines, producers, regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wine List */}
        <div className="overflow-y-auto max-h-[60vh] p-6">
          {filteredWines.length === 0 ? (
            <div className="text-center py-12">
              <Wine className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No wines found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Featured Wines */}
              {selectedCategory === 'All' && (
                <div className="mb-8">
                  <h3 className="text-2xl font-serif text-slate-900 mb-6 flex items-center">
                    <Star className="h-6 w-6 text-amber-500 mr-2" />
                    Sommelier's Selection
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wines.filter(wine => wine.featured).map((wine) => (
                      <WineCard key={wine.id} wine={wine} featured />
                    ))}
                  </div>
                </div>
              )}

              {/* All Wines by Category */}
              {categories.slice(1).map(category => {
                const categoryWines = filteredWines.filter(wine => wine.category === category);
                if (categoryWines.length === 0 || (selectedCategory !== 'All' && selectedCategory !== category)) return null;

                return (
                  <div key={category} className="mb-8">
                    <h3 className="text-2xl font-serif text-slate-900 mb-6 border-b border-slate-200 pb-2">
                      {category} Wines
                    </h3>
                    <div className="space-y-4">
                      {categoryWines.map((wine) => (
                        <WineRow key={wine.id} wine={wine} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-200">
          <div className="text-center text-sm text-slate-600">
            <p className="mb-2">
              <strong>Wine Service:</strong> Our sommelier is available for wine pairings and recommendations
            </p>
            <p>
              <strong>Corkage Fee:</strong> $25 per bottle for wines not on our list
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WineCardProps {
  wine: WineType;
  featured?: boolean;
}

function WineCard({ wine, featured }: WineCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
      featured ? 'ring-2 ring-amber-200' : ''
    }`}>
      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <Wine className="h-16 w-16 text-amber-400" />
        </div>
        {featured && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        {wine.awards && wine.awards.length > 0 && (
          <div className="absolute top-3 right-3 bg-slate-900/80 text-white px-2 py-1 rounded-full text-xs">
            <Award className="h-3 w-3 inline mr-1" />
            Award Winner
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h4 className="font-serif text-lg text-slate-900 mb-1">{wine.name}</h4>
        <p className="text-amber-600 font-medium text-sm mb-2">{wine.producer}</p>
        <div className="flex items-center text-xs text-slate-500 mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{wine.region}</span>
          <Calendar className="h-3 w-3 ml-3 mr-1" />
          <span>{wine.vintage}</span>
        </div>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{wine.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            {wine.priceGlass && (
              <div className="text-sm text-slate-600">
                Glass: <span className="font-medium text-slate-900">${wine.priceGlass}</span>
              </div>
            )}
            <div className="text-sm text-slate-600">
              Bottle: <span className="font-medium text-slate-900">${wine.priceBottle}</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              wine.category === 'Red' ? 'bg-red-100 text-red-800' :
              wine.category === 'White' ? 'bg-yellow-100 text-yellow-800' :
              wine.category === 'Sparkling' ? 'bg-blue-100 text-blue-800' :
              wine.category === 'Rosé' ? 'bg-pink-100 text-pink-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {wine.category}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WineRowProps {
  wine: WineType;
}

function WineRow({ wine }: WineRowProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
              <Wine className="h-6 w-6 text-amber-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-serif text-lg text-slate-900">{wine.name}</h4>
                {wine.featured && (
                  <Star className="h-4 w-4 text-amber-500 fill-current" />
                )}
              </div>
              <p className="text-amber-600 font-medium text-sm mb-1">{wine.producer}</p>
              <div className="flex items-center text-xs text-slate-500 mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{wine.region}</span>
                <Calendar className="h-3 w-3 ml-3 mr-1" />
                <span>{wine.vintage}</span>
              </div>
              <p className="text-slate-600 text-sm">{wine.description}</p>
              
              {wine.awards && wine.awards.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {wine.awards.map((award, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      <Award className="h-3 w-3 mr-1" />
                      {award}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-right ml-4">
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
            wine.category === 'Red' ? 'bg-red-100 text-red-800' :
            wine.category === 'White' ? 'bg-yellow-100 text-yellow-800' :
            wine.category === 'Sparkling' ? 'bg-blue-100 text-blue-800' :
            wine.category === 'Rosé' ? 'bg-pink-100 text-pink-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {wine.category}
          </div>
          
          <div className="space-y-1">
            {wine.priceGlass && (
              <div className="text-sm text-slate-600">
                Glass: <span className="font-medium text-slate-900">${wine.priceGlass}</span>
              </div>
            )}
            <div className="text-sm text-slate-600">
              Bottle: <span className="font-medium text-slate-900">${wine.priceBottle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}