import React from 'react';
import { X, Minus, Plus, ShoppingBasket, Trash2, Utensils } from 'lucide-react';
import { BasketItem } from '../types';

interface BasketProps {
  isOpen: boolean;
  onClose: () => void;
  items: BasketItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Basket({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: BasketProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 50 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-gradient-to-b from-amber-50 to-white w-full sm:max-w-md h-full overflow-y-auto shadow-2xl border-l-4 border-amber-200">
        {/* Basket Header with Wicker Pattern */}
        <div className="relative p-4 sm:p-6 border-b border-amber-200 bg-gradient-to-r from-amber-100 to-orange-50">
          {/* Subtle wicker pattern background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern id="wicker" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#D97706" opacity="0.1"/>
                  <path d="M0 10h20M10 0v20" stroke="#D97706" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wicker)"/>
            </svg>
          </div>
          
          <div className="relative flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
              <div className="relative mr-2 sm:mr-3">
                <ShoppingBasket className="h-6 w-6 sm:h-7 sm:w-7 text-amber-700" />
                <Utensils className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 absolute -top-1 -right-1" />
              </div>
              <span className="hidden sm:inline">Your Meal Basket</span>
              <span className="sm:hidden">Basket</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </button>
          </div>
          {items.length > 0 && (
            <p className="text-xs sm:text-sm text-amber-700 mt-2 font-medium">
              {items.length} delicious item{items.length !== 1 ? 's' : ''} ready for delivery
            </p>
          )}
        </div>

        <div className="flex-1 p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="relative mb-4 sm:mb-6">
                <ShoppingBasket className="h-16 w-16 sm:h-20 sm:w-20 text-amber-300 mx-auto" />
                {/* Empty basket illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-6 sm:w-12 sm:h-8 border-2 border-dashed border-amber-400 rounded-lg opacity-50"></div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Your basket is empty</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">
                Fill your basket with our delicious Italian dishes!<br/>
                Fresh ingredients, authentic flavors, delivered to your door.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {items.map((item) => (
                  <div key={item.id} className="group relative bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-all duration-300">
                    {/* Subtle basket weave border */}
                    <div className="absolute inset-0 rounded-xl border border-amber-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg shadow-sm"
                        />
                        {/* Food item glow */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-orange-400/20 to-transparent"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base truncate">{item.name}</h3>
                        <p className="text-orange-600 font-bold text-base sm:text-lg">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <div className="flex items-center space-x-1 sm:space-x-2 bg-amber-50 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 hover:bg-amber-100 rounded-full transition-colors"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-amber-700" />
                          </button>
                          <span className="w-6 sm:w-8 text-center font-semibold text-gray-800 text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-amber-100 rounded-full transition-colors"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-amber-700" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 sm:p-2 hover:bg-red-50 rounded-full transition-colors group"
                          title="Remove from basket"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 group-hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary with Basket Theme */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 sm:p-5 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                  <Utensils className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-orange-600" />
                  Basket Summary
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {subtotal < 50 && (
                    <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-orange-700 font-medium">
                        🎯 Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t border-amber-300 pt-3 mt-3">
                    <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-orange-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg mt-4 sm:mt-6 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingBasket className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Proceed to Checkout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
