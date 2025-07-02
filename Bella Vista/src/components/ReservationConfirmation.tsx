import React from 'react';
import { CheckCircle, Calendar, Clock, Users, Phone, Mail } from 'lucide-react';
import { ReservationInfo } from '../types';

interface ReservationConfirmationProps {
  isOpen: boolean;
  reservation: ReservationInfo | null;
  onClose: () => void;
}

export default function ReservationConfirmation({ isOpen, reservation, onClose }: ReservationConfirmationProps) {
  if (!isOpen || !reservation) return null;

  const confirmationNumber = Math.random().toString(36).substr(2, 8).toUpperCase();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-slate-900 mb-2">Reservation Confirmed!</h2>
            <p className="text-slate-600">We look forward to serving you at Bella Vista</p>
          </div>

          {/* Confirmation Details */}
          <div className="bg-slate-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-medium text-slate-900 mb-4 text-center">
              Confirmation #{confirmationNumber}
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-slate-700">
                <Calendar className="h-4 w-4 mr-3 text-amber-600" />
                <span>{new Date(reservation.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center text-slate-700">
                <Clock className="h-4 w-4 mr-3 text-amber-600" />
                <span>{reservation.time}</span>
              </div>
              
              <div className="flex items-center text-slate-700">
                <Users className="h-4 w-4 mr-3 text-amber-600" />
                <span>{reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              
              <div className="flex items-center text-slate-700">
                <Phone className="h-4 w-4 mr-3 text-amber-600" />
                <span>{reservation.phone}</span>
              </div>
              
              <div className="flex items-center text-slate-700">
                <Mail className="h-4 w-4 mr-3 text-amber-600" />
                <span>{reservation.email}</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800 mb-2">
              <strong>What to Expect:</strong>
            </p>
            <p className="text-xs text-amber-700">
              A confirmation email has been sent to {reservation.email}. 
              Please arrive 10 minutes early. We can't wait to provide you with an exceptional dining experience!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Continue Browsing
            </button>
            
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Need to modify your reservation? Call us at (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}