import React from 'react';
import { ShoppingBasket, Flame, Leaf, Star, Award } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {item.popular && (
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              <span>Chef's Choice</span>
            </div>
          )}
          {item.category === 'Main Courses' && (
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-lg">
              <Award className="h-3 w-3" />
              <span>Signature</span>
            </div>
          )}
        </div>
        
        {/* Dietary Icons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {item.spicy && (
            <div className="bg-red-500/90 backdrop-blur-sm text-white p-2 rounded-full shadow-lg">
              <Flame className="h-3 w-3" />
            </div>
          )}
          {item.vegetarian && (
            <div className="bg-green-500/90 backdrop-blur-sm text-white p-2 rounded-full shadow-lg">
              <Leaf className="h-3 w-3" />
            </div>
          )}
        </div>

        {/* Hover Add Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => onAddToCart(item)}
            className="bg-white/90 backdrop-blur-sm text-slate-900 p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300"
          >
            <ShoppingBasket className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-serif text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
            {item.name}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            {item.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-serif text-slate-900 font-medium">
              ${item.price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 font-light">per serving</span>
          </div>
          
          <button
            onClick={() => onAddToCart(item)}
            className="group/btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-medium text-sm"
          >
            <ShoppingBasket className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            <span>Add to Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}