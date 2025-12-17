import React from 'react';
import { BookingData } from '../types';
import { Lock, ShieldCheck, ChevronLeft, User, Euro, AlertCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface PaymentFormProps {
  bookingData: BookingData;
  onComplete: () => void;
  onBack: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ bookingData, onBack }) => {
  if (!bookingData.therapist) return null;

  const stripeBuyButtonHtml = `
    <stripe-buy-button
      buy-button-id="buy_btn_1SfOMuRx2rJZ4HevKsxLSomH"
      publishable-key="pk_live_51QkMQWRx2rJZ4HevywLrQ861bIrtGndlnq2AWKohTYucLNT5D8a3oM7nzc1FlShVGDx0v0Z8gSruobunAKHYEDrb00KykEQmCM"
    >
    </stripe-buy-button>
  `;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <button 
        onClick={onBack}
        className="group flex items-center text-slate-400 hover:text-emerald-600 transition-all font-bold text-sm uppercase tracking-widest mb-10"
      >
        <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Practitioners
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Order Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full -mr-20 -mt-20 opacity-10 blur-3xl"></div>
            <h3 className="text-2xl font-black mb-8 tracking-tight">Step 1: Secure Credit</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4 text-emerald-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-0.5">Practitioner Selected</p>
                  <p className="font-bold text-white">{bookingData.therapist.name}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-emerald-400 uppercase font-black tracking-widest mb-2 flex items-center">
                   <ArrowRight className="w-3 h-3 mr-2" /> Next Step
                </p>
                <p className="text-sm font-medium text-white/70">
                  After payment, you will choose your preferred time slot on the calendar.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-6 border-t border-white/10">
              <span className="text-white/60 font-bold uppercase tracking-widest text-xs">Total to Pay</span>
              <span className="text-4xl font-black flex items-center">
                <Euro className="w-6 h-6 mr-1 text-emerald-400" />
                20.00
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex items-start">
            <div className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center text-white mr-4 shadow-lg flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider mb-1">Pre-payment Required</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                To guarantee our student's time and your session slot, we process payment first. You'll access the live calendar immediately after.
              </p>
            </div>
          </div>
        </div>

        {/* Stripe Buy Button Integration */}
        <div className="lg:col-span-7 bg-white/80 glass p-12 rounded-[3rem] border border-white shadow-sm">
          <div className="mb-10 text-left">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Initiate Payment</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Complete the payment to unlock the scheduling calendar for <strong>{bookingData.therapist.name}</strong>.
            </p>
          </div>

          <div className="bg-slate-50 p-10 rounded-[2rem] border-2 border-slate-100 shadow-inner flex flex-col items-center justify-center min-h-[300px]">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Secure Payment Portal</p>
              <p className="text-[10px] text-slate-400 max-w-[200px] leading-tight">
                Click below to pay via Stripe. You will return here to pick your date.
              </p>
            </div>

            <div 
              className="stripe-container w-full"
              dangerouslySetInnerHTML={{ __html: stripeBuyButtonHtml }} 
            />
            
            <div className="mt-8 flex items-center text-emerald-600 font-bold text-xs uppercase tracking-widest">
              <ExternalLink className="w-3.5 h-3.5 mr-2" /> Opens in a secure window
            </div>
          </div>

          <div className="mt-12">
             <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start">
               <AlertCircle className="w-4 h-4 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
               <p className="text-[10px] text-orange-800 font-bold leading-normal uppercase tracking-wider">
                 Important: Your booking session is only validated once payment is successful. If you exit before scheduling, your credit remains valid for this practitioner.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};