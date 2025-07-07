import React, { useState } from 'react';
import { X, Search, Wine, Star, Award, Filter } from 'lucide-react';
import { wines, wineCategories } from '../data/wineData';

interface WineListProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WineList({ isOpen, onClose }: WineListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'featured' | 'list'>('featured');

  const filteredWines = wines.filter(wine => {
    const matchesCategory = selectedCategory === 'All' || wine.category === selectedCategory;
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wine.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredWines = filteredWines.filter(wine => wine.featured);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Wine className="h-6 w-6 sm:h-8 sm:w-8 text-amber-300" />
              <div>
                <h2 className="text-xl sm:text-3xl font-serif">Bella Vista Wine Cellar</h2>
                <p className="text-amber-200 text-sm sm:text-base font-light">Curated Italian Excellence</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search wines, producers, regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-12 pr-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              >
                <option value="All">All Wines</option>
                {wineCategories.map(category => (
                  <option key={category} value={category} className="text-gray-900">{category}</option>
                ))}
              </select>
              
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('featured')}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm transition-colors ${
                    viewMode === 'featured' ? 'bg-amber-500 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm transition-colors ${
                    viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wine Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)] p-4 sm:p-6">
          {viewMode === 'featured' ? (
            // Featured Cards View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(featuredWines.length > 0 ? featuredWines : filteredWines.slice(0, 6)).map((wine) => (
                <div key={wine.id} className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-lg sm:text-xl text-slate-900 mb-1 leading-tight">{wine.name}</h3>
                        <p className="text-slate-600 text-sm font-light">{wine.producer}</p>
                        <p className="text-slate-500 text-xs sm:text-sm">{wine.region} • {wine.vintage}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        wine.category === 'Red' ? 'bg-red-100 text-red-700' :
                        wine.category === 'White' ? 'bg-yellow-100 text-yellow-700' :
                        wine.category === 'Sparkling' ? 'bg-blue-100 text-blue-700' :
                        wine.category === 'Rosé' ? 'bg-pink-100 text-pink-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {wine.category}
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{wine.description}</p>
                    
                    {wine.awards && (
                      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                        <Award className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                        <span className="text-xs sm:text-sm text-amber-600 font-medium">{wine.awards}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-slate-900 font-semibold text-sm sm:text-base">
                          Glass: ${wine.priceGlass} • Bottle: ${wine.priceBottle}
                        </div>
                      </div>
                      {wine.featured && (
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                          <span className="text-xs font-medium">Sommelier's Choice</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-3 sm:space-y-4">
              {filteredWines.map((wine) => (
                <div key={wine.id} className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="font-serif text-base sm:text-lg text-slate-900">{wine.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            wine.category === 'Red' ? 'bg-red-100 text-red-700' :
                            wine.category === 'White' ? 'bg-yellow-100 text-yellow-700' :
                            wine.category === 'Sparkling' ? 'bg-blue-100 text-blue-700' :
                            wine.category === 'Rosé' ? 'bg-pink-100 text-pink-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {wine.category}
                          </span>
                          {wine.featured && (
                            <div className="flex items-center space-x-1 text-amber-500">
                              <Star className="h-3 w-3 fill-current" />
                              <span className="text-xs font-medium">Featured</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-1">{wine.producer} • {wine.region} • {wine.vintage}</p>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{wine.description}</p>
                      {wine.awards && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Award className="h-3 w-3 text-amber-500" />
                          <span className="text-xs text-amber-600 font-medium">{wine.awards}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-slate-900 font-semibold text-sm sm:text-base">
                        Glass: ${wine.priceGlass}
                      </div>
                      <div className="text-slate-900 font-semibold text-sm sm:text-base">
                        Bottle: ${wine.priceBottle}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredWines.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Wine className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">No wines found</h3>
              <p className="text-slate-500 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-amber-600 hover:text-amber-700 font-medium text-sm sm:text-base"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 sm:p-6 bg-slate-50">
          <div className="text-center text-slate-600 text-xs sm:text-sm">
            <p className="mb-2">
              <strong>Wine Service:</strong> Our sommelier is available for personalized pairings and recommendations.
            </p>
            <p>
              <strong>Corkage Policy:</strong> $25 fee for outside wines. Limit 2 bottles per table.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
