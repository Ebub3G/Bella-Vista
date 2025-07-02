import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Phone, Mail, User } from 'lucide-react';
import { ReservationInfo } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reservation: ReservationInfo) => void;
}

export default function ReservationModal({ isOpen, onClose, onSubmit }: ReservationModalProps) {
  const [reservation, setReservation] = useState<ReservationInfo>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(reservation);
    setIsSubmitting(false);
    
    // Reset form
    setReservation({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      specialRequests: ''
    });
  };

  const handleInputChange = (field: keyof ReservationInfo, value: string | number) => {
    setReservation(prev => ({ ...prev, [field]: value }));
  };

  // Generate time slots
  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-3xl font-serif mb-2">Reserve Your Table</h2>
            <p className="text-amber-200 font-light">Experience fine dining at Bella Vista</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-slate-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-amber-600" />
                Guest Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={reservation.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="email"
                    required
                    value={reservation.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="tel"
                    required
                    value={reservation.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-slate-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                Reservation Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  required
                  min={today}
                  value={reservation.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <select
                    required
                    value={reservation.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <select
                    value={reservation.guests}
                    onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Special Requests (Optional)</label>
            <textarea
              value={reservation.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Dietary restrictions, special occasions, seating preferences..."
            />
          </div>

          {/* Important Notes */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">Reservation Policy</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Reservations are held for 15 minutes past the reserved time</li>
              <li>• Parties of 6 or more require a credit card to hold the reservation</li>
              <li>• 24-hour cancellation notice is appreciated</li>
              <li>• Smart casual dress code is preferred</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-lg font-medium hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}