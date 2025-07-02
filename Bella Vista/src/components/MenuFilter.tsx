import React from 'react';
import { Search, Utensils } from 'lucide-react';

interface MenuFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function MenuFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange 
}: MenuFilterProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 mb-12 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Elegant Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search our culinary creations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-light text-slate-700 placeholder-slate-400"
          />
        </div>
        
        {/* Luxury Category Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105'
            }`}
          >
            All Dishes
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-3 rounded-full text-sm font-light tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105'
              }`}
            >
              {category === 'Main Courses' && <Utensils className="h-4 w-4" />}
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}