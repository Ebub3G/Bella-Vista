import React from 'react';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { OrderSummary } from '../types';

interface OrderConfirmationProps {
  isOpen: boolean;
  order: OrderSummary | null;
  onClose: () => void;
}

export default function OrderConfirmation({ isOpen, order, onClose }: OrderConfirmationProps) {
  if (!isOpen || !order) return null;

  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl p-6 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600">Thank you for your order. We're preparing your delicious meal!</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Order #{orderNumber}</h3>
          <div className="flex items-center justify-center text-sm text-gray-600 mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>Estimated delivery: 35-45 minutes</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{order.deliveryInfo.address}, {order.deliveryInfo.city}</span>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <span>{order.deliveryInfo.phone}</span>
            </div>
          </div>
        </div>

        <div className="text-left mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Basket Items:</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} ×{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p>A confirmation email has been sent to {order.deliveryInfo.email}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
