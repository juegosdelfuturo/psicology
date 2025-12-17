import React, { useState } from 'react';
import { BookingData } from '../types';
import { Button } from './Button';
import { Lock, CreditCard, CheckCircle, ChevronLeft } from 'lucide-react';

interface PaymentFormProps {
  bookingData: BookingData;
  onComplete: () => void;
  onBack: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ bookingData, onComplete, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 1500);
  };

  if (!bookingData.therapist) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <Button onClick={onBack} variant="secondary" className="mb-8 flex items-center text-sm px-4 py-2">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Scheduling
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Order Summary */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200 h-fit">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Summary</h3>
          
          <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Therapist</span>
              <span className="font-medium text-slate-900">{bookingData.therapist.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-slate-900">{bookingData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium text-slate-900">{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Session Type</span>
              <span className="font-medium text-slate-900">1 Hour Video Call</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xl font-bold text-slate-900">
            <span>Total</span>
            <span>20.00€</span>
          </div>
          
          <div className="mt-6 bg-blue-50 p-3 rounded-lg flex items-start">
            <div className="text-blue-600 mr-3 mt-1"><CheckCircle size={16} /></div>
            <p className="text-xs text-blue-800 leading-snug">
              Note: This session is conducted by a supervised student. By proceeding, you acknowledge this context.
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Payment Details</h3>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
              <div className="w-8 h-5 bg-gray-200 rounded"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input 
                type="text" 
                required
                placeholder="Jane Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
                <CreditCard className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input 
                  type="text" 
                  required
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input 
                  type="text" 
                  required
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                fullWidth 
                disabled={isProcessing}
                className="flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" /> Pay 20.00€
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Payments are securely processed. No real money will be charged (Mock).
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};