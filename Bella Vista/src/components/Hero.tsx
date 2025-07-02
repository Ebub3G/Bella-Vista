import React from 'react';
import { ArrowRight, Star, Award, Clock } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onReserveTable: () => void;
}

export default function Hero({ onOrderNow, onReserveTable }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1600)'
        }}
      ></div>
      
      {/* Elegant Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Awards & Recognition */}
        <div className="flex items-center justify-center space-x-8 mb-8 opacity-90">
          <div className="flex items-center space-x-2 text-amber-300">
            <Award className="h-5 w-5" />
            <span className="text-sm font-light tracking-wide">Michelin Recommended</span>
          </div>
          <div className="flex items-center space-x-1 text-amber-300">
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-2 text-sm font-light">5-Star Dining</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 tracking-tight leading-none">
          <span className="block opacity-95">Bella</span>
          <span className="block text-amber-300 -mt-4">Vista</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-amber-100/90 font-light tracking-wide mb-4 max-w-3xl mx-auto leading-relaxed">
          Authentic Italian Fine Dining Experience
        </p>
        
        <p className="text-lg text-white/80 font-light tracking-wide mb-12 max-w-2xl mx-auto italic">
          "Where every dish tells a story of tradition, passion, and culinary excellence"
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <button
            onClick={onOrderNow}
            className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 px-8 py-4 rounded-full text-lg font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 flex items-center space-x-3"
          >
            <span>Order Fine Dining</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={onReserveTable}
            className="group bg-transparent border-2 border-white/30 hover:border-amber-300 text-white hover:text-amber-300 px-8 py-4 rounded-full text-lg font-light tracking-wide transition-all duration-500 hover:scale-105 backdrop-blur-sm"
          >
            Reserve Table
          </button>
        </div>

        {/* Restaurant Hours & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <Clock className="h-8 w-8 text-amber-300 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Dinner Service</h3>
            <p className="text-white/80 text-sm font-light">Tuesday - Sunday</p>
            <p className="text-amber-200 text-sm">5:00 PM - 11:00 PM</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-2xl mb-3">🍷</div>
            <h3 className="text-white font-medium mb-2">Wine Cellar</h3>
            <p className="text-white/80 text-sm font-light">Curated Selection</p>
            <p className="text-amber-200 text-sm">500+ Premium Wines</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-2xl mb-3">👨‍🍳</div>
            <h3 className="text-white font-medium mb-2">Chef's Table</h3>
            <p className="text-white/80 text-sm font-light">Exclusive Experience</p>
            <p className="text-amber-200 text-sm">By Reservation Only</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/40"></div>
          <div className="text-xs font-light tracking-wider uppercase">Scroll</div>
        </div>
      </div>
    </div>
  );
}