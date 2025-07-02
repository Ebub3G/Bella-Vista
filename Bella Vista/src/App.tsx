import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuFilter from './components/MenuFilter';
import MenuCard from './components/MenuCard';
import Basket from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import ReservationModal from './components/ReservationModal';
import ReservationConfirmation from './components/ReservationConfirmation';
import WineList from './components/WineList';
import ScrollToTop from './components/ScrollToTop';
import { menuItems, menuCategories } from './data/menuData';
import { wines } from './data/wineData';
import { MenuItem, BasketItem, DeliveryInfo, OrderSummary, ReservationInfo } from './types';

function App() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isReservationConfirmationOpen, setIsReservationConfirmationOpen] = useState(false);
  const [isWineListOpen, setIsWineListOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderSummary | null>(null);
  const [completedReservation, setCompletedReservation] = useState<ReservationInfo | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const addToBasket = (item: MenuItem) => {
    setBasketItems(prev => {
      const existingItem = prev.find(basketItem => basketItem.id === item.id);
      if (existingItem) {
        return prev.map(basketItem =>
          basketItem.id === item.id
            ? { ...basketItem, quantity: basketItem.quantity + 1 }
            : basketItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromBasket(id);
      return;
    }
    setBasketItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromBasket = (id: string) => {
    setBasketItems(prev => prev.filter(item => item.id !== id));
  };

  const handleOrderNow = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReserveTable = () => {
    setIsReservationModalOpen(true);
  };

  const handleWineList = () => {
    setIsWineListOpen(true);
  };

  const handleCheckout = () => {
    setIsBasketOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBackToBasket = () => {
    setIsCheckoutOpen(false);
    setIsBasketOpen(true);
  };

  const handlePlaceOrder = (deliveryInfo: DeliveryInfo) => {
    const subtotal = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 50 ? 0 : 8.99; // Higher threshold for fine dining
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;

    const order: OrderSummary = {
      items: basketItems,
      subtotal,
      deliveryFee,
      tax,
      total,
      deliveryInfo
    };

    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setIsOrderConfirmationOpen(true);
    setBasketItems([]);
  };

  const handleReservationSubmit = (reservation: ReservationInfo) => {
    setCompletedReservation(reservation);
    setIsReservationModalOpen(false);
    setIsReservationConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsOrderConfirmationOpen(false);
    setCompletedOrder(null);
  };

  const handleCloseReservationConfirmation = () => {
    setIsReservationConfirmationOpen(false);
    setCompletedReservation(null);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        basketItems={basketItems} 
        onBasketClick={() => setIsBasketOpen(true)}
        onReserveTable={handleReserveTable}
        onWineList={handleWineList}
        heroRef={heroRef}
        menuRef={menuRef}
        footerRef={footerRef}
      />
      
      <div ref={heroRef}>
        <Hero onOrderNow={handleOrderNow} onReserveTable={handleReserveTable} />
      </div>
      
      {/* Menu Section with Luxury Design */}
      <div ref={menuRef} className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Elegant Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <div className="text-amber-600 text-sm font-light tracking-[0.3em] uppercase">Menu</div>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6 tracking-tight">
              Culinary Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Each dish is a masterpiece, crafted with the finest ingredients and generations of Italian tradition. 
              Experience flavors that transport you to the heart of Italy.
            </p>
          </div>

          <MenuFilter
            categories={menuCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={addToBasket}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-600 text-lg font-light mb-4">No dishes found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Luxury Footer */}
      <footer ref={footerRef} className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Restaurant Info */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-serif text-amber-300 mb-6">Bella Vista</h3>
              <p className="text-slate-300 leading-relaxed mb-6 font-light">
                For over three generations, Bella Vista has been serving authentic Italian cuisine 
                with an unwavering commitment to excellence. Our passion for culinary artistry 
                and warm hospitality creates unforgettable dining experiences.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1 text-amber-300">
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl">⭐</span>
                </div>
                <span className="text-slate-400 text-sm font-light">Michelin Recommended</span>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-medium mb-6 text-amber-200">Contact</h4>
              <div className="space-y-4 text-slate-300 font-light">
                <div className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">📍</span>
                  <div>
                    <p>123 Via Roma</p>
                    <p>Little Italy, NY 10013</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-amber-400">📞</span>
                  <p>(555) 123-4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-amber-400">✉️</span>
                  <p>reservations@bellavista.com</p>
                </div>
              </div>
            </div>

            {/* Hours & Services */}
            <div>
              <h4 className="text-lg font-medium mb-6 text-amber-200">Hours & Services</h4>
              <div className="space-y-4 text-slate-300 font-light">
                <div>
                  <p className="text-white font-medium">Dinner Service</p>
                  <p className="text-sm">Tuesday - Sunday</p>
                  <p className="text-sm text-amber-300">5:00 PM - 11:00 PM</p>
                </div>
                <div>
                  <p className="text-white font-medium">Private Events</p>
                  <p className="text-sm">Available by appointment</p>
                </div>
                <div>
                  <p className="text-white font-medium">Wine Tastings</p>
                  <p className="text-sm">Fridays & Saturdays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm font-light">
              &copy; 2025 Bella Vista Ristorante. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <button className="text-slate-400 hover:text-amber-300 text-sm font-light transition-colors">
                Privacy Policy
              </button>
              <button className="text-slate-400 hover:text-amber-300 text-sm font-light transition-colors">
                Terms of Service
              </button>
              <button className="text-slate-400 hover:text-amber-300 text-sm font-light transition-colors">
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </footer>

      <Basket
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        items={basketItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromBasket}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBack={handleBackToBasket}
        items={basketItems}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderConfirmation
        isOpen={isOrderConfirmationOpen}
        order={completedOrder}
        onClose={handleCloseConfirmation}
      />

      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onSubmit={handleReservationSubmit}
      />

      <ReservationConfirmation
        isOpen={isReservationConfirmationOpen}
        reservation={completedReservation}
        onClose={handleCloseReservationConfirmation}
      />

      <WineList
        isOpen={isWineListOpen}
        onClose={() => setIsWineListOpen(false)}
        wines={wines}
      />

      <ScrollToTop />
    </div>
  );
}

export default App;