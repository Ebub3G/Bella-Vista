import React, { useState, useEffect } from 'react';
import { ShoppingBasket, Phone, MapPin, Clock, Star, Wine, ChefHat } from 'lucide-react';
import { BasketItem } from '../types';

interface HeaderProps {
  basketItems: BasketItem[];
  onBasketClick: () => void;
  onReserveTable: () => void;
  onWineList: () => void;
  heroRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  footerRef: React.RefObject<HTMLDivElement>;
}

export default function Header({ basketItems, onBasketClick, onReserveTable, onWineList, heroRef, menuRef, footerRef }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const itemCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);
  const basketTotal = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroRef.current) {
      heroRef.current.setAttribute('data-section', 'home');
      observer.observe(heroRef.current);
    }
    if (menuRef.current) {
      menuRef.current.setAttribute('data-section', 'menu');
      observer.observe(menuRef.current);
    }
    if (footerRef.current) {
      footerRef.current.setAttribute('data-section', 'contact');
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [heroRef, menuRef, footerRef]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out
      ${isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-amber-200/20' 
        : 'bg-gradient-to-b from-slate-900/90 to-transparent backdrop-blur-sm'
      }
    `}>
      {/* Elegant Top Bar */}
      <div className="border-b border-amber-200/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm">
            {/* Contact Information */}
            <div className="hidden md:flex items-center space-x-8 text-amber-100/80">
              <div className="flex items-center space-x-2 group cursor-pointer hover:text-amber-200 transition-colors">
                <Phone className="h-3 w-3" />
                <span className="font-light tracking-wide">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3" />
                <span className="font-light tracking-wide">123 Via Roma, Little Italy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-emerald-400" />
                <span className="font-light tracking-wide">Open Until 11 PM</span>
              </div>
            </div>

            {/* Reservation & Hours */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-amber-200">
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <span className="ml-2 text-xs font-light text-amber-100/80">Michelin Recommended</span>
              </div>
              <button 
                onClick={onReserveTable}
                className="text-amber-200 hover:text-white transition-colors text-xs font-light tracking-wider uppercase"
              >
                Reservations
              </button>
            </div>

            {/* Mobile Contact */}
            <div className="md:hidden text-amber-100/80 text-xs">
              <span>Call: (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={scrollToTop}>
            <div className="relative">
              {/* Elegant Logo Background */}
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-amber-500/25 transition-all duration-500 group-hover:scale-110">
                <ChefHat className="h-7 w-7 text-slate-900 group-hover:rotate-12 transition-transform duration-500" />
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-amber-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl"></div>
            </div>
            
            <div className="group-hover:scale-105 transition-transform duration-500">
              <h1 className="text-3xl font-serif text-white tracking-tight group-hover:text-amber-200 transition-colors duration-500">
                Bella Vista
              </h1>
              <p className="text-xs font-light text-amber-200/80 tracking-[0.2em] uppercase">
                Ristorante Italiano
              </p>
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <button
              onClick={scrollToTop}
              className={`
                relative py-2 px-1 text-sm font-light tracking-wider uppercase transition-all duration-300
                ${activeSection === 'home' 
                  ? 'text-amber-300' 
                  : 'text-white/90 hover:text-amber-200'
                }
              `}
            >
              Home
              {activeSection === 'home' && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              )}
            </button>

            <button
              onClick={() => scrollToSection(menuRef)}
              className={`
                relative py-2 px-1 text-sm font-light tracking-wider uppercase transition-all duration-300
                ${activeSection === 'menu' 
                  ? 'text-amber-300' 
                  : 'text-white/90 hover:text-amber-200'
                }
              `}
            >
              Menu
              {activeSection === 'menu' && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              )}
            </button>

            <button
              onClick={onWineList}
              className="flex items-center space-x-2 text-white/90 hover:text-amber-200 py-2 px-1 text-sm font-light tracking-wider uppercase transition-all duration-300"
            >
              <Wine className="h-4 w-4" />
              <span>Wine List</span>
            </button>

            <button
              onClick={() => scrollToSection(footerRef)}
              className={`
                relative py-2 px-1 text-sm font-light tracking-wider uppercase transition-all duration-300
                ${activeSection === 'contact' 
                  ? 'text-amber-300' 
                  : 'text-white/90 hover:text-amber-200'
                }
              `}
            >
              Contact
              {activeSection === 'contact' && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              )}
            </button>
          </nav>

          {/* Basket & CTA */}
          <div className="flex items-center space-x-6">
            {/* Elegant Basket Button */}
            <button
              onClick={onBasketClick}
              className="relative group"
            >
              <div className="flex items-center space-x-3 bg-gradient-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-3 hover:from-amber-500/30 hover:to-amber-400/30 hover:border-amber-300/50 transition-all duration-500 hover:scale-105">
                <div className="relative">
                  <ShoppingBasket className="h-5 w-5 text-amber-200 group-hover:text-white transition-colors duration-300" />
                  {itemCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-slate-900 text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {itemCount}
                    </div>
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-light text-white/90 group-hover:text-white transition-colors">
                    {itemCount > 0 ? `${itemCount} Items` : 'Basket'}
                  </div>
                  {basketTotal > 0 && (
                    <div className="text-xs text-amber-200 font-light">
                      ${basketTotal.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </button>

            {/* Reservation Button - Desktop */}
            <button 
              onClick={onReserveTable}
              className="hidden lg:block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-amber-200/10 bg-slate-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={scrollToTop}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                activeSection === 'home' ? 'text-amber-300' : 'text-white/70 hover:text-amber-200'
              }`}
            >
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <span className="text-xs font-light tracking-wider uppercase">Home</span>
            </button>

            <button
              onClick={() => scrollToSection(menuRef)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                activeSection === 'menu' ? 'text-amber-300' : 'text-white/70 hover:text-amber-200'
              }`}
            >
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <span className="text-xs font-light tracking-wider uppercase">Menu</span>
            </button>

            <button 
              onClick={onWineList}
              className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg text-white/70 hover:text-amber-200 transition-all duration-300"
            >
              <Wine className="h-4 w-4" />
              <span className="text-xs font-light tracking-wider uppercase">Wines</span>
            </button>

            <button 
              onClick={onReserveTable}
              className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg text-white/70 hover:text-amber-200 transition-all duration-300"
            >
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <span className="text-xs font-light tracking-wider uppercase">Reserve</span>
            </button>

            <button
              onClick={() => scrollToSection(footerRef)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                activeSection === 'contact' ? 'text-amber-300' : 'text-white/70 hover:text-amber-200'
              }`}
            >
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <span className="text-xs font-light tracking-wider uppercase">Contact</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}