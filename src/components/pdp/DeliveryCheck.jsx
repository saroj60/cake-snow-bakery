import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Truck, ShieldCheck, Award } from 'lucide-react';

const LOCATIONS = ['Kathmandu', 'Lalitpur', 'Bhaktapur'];
const TIME_SLOTS = [
  '9 AM - 11 AM',
  '11 AM - 1 PM',
  '1 PM - 3 PM',
  '3 PM - 5 PM',
  '5 PM - 7 PM',
  '7 PM - 9 PM'
];

const DeliveryCheck = () => {
  const [location, setLocation] = useState('Lalitpur');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(TIME_SLOTS[0]);

  // Get today's date formatted for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Delivery Card */}
      <div className="bg-surface-container-lowest rounded-[20px] p-6 shadow-sm border border-outline-variant/30">
        <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" /> Delivery Details
        </h3>
        
        <div className="flex flex-col gap-4">
          
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50" />
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all appearance-none text-sm"
            >
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Date */}
            <div className="relative">
              <input 
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            
            {/* Time */}
            <div className="relative">
              <select 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all appearance-none text-sm"
              >
                {TIME_SLOTS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-primary/10 text-primary px-4 py-3 rounded-xl text-sm font-medium mt-1">
            <p>Order within <span className="font-bold">2 Hours 15 Minutes</span></p>
            <p>Receive Today by <span className="font-bold">5 PM–7 PM</span></p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/20">
          <Award className="w-8 h-8 text-primary shrink-0" />
          <span className="text-xs font-semibold text-on-surface leading-tight">Freshly Baked Daily</span>
        </div>
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/20">
          <Truck className="w-8 h-8 text-secondary shrink-0" />
          <span className="text-xs font-semibold text-on-surface leading-tight">Same Day Delivery</span>
        </div>
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/20">
          <ShieldCheck className="w-8 h-8 text-tertiary shrink-0" />
          <span className="text-xs font-semibold text-on-surface leading-tight">Secure Payment</span>
        </div>
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/20">
          <Clock className="w-8 h-8 text-blue-500 shrink-0" />
          <span className="text-xs font-semibold text-on-surface leading-tight">100% Customizable</span>
        </div>
      </div>

    </div>
  );
};

export default DeliveryCheck;
