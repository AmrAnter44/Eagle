import React, { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';
import { useBranch } from '../context/BranchContext';

export default function BlackFridayOffer() {
  const [isVisible, setIsVisible] = useState(true);
  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { selectedBranch, getCurrentBranch } = useBranch();

  // Load special offers when component mounts or branch changes
  useEffect(() => {
    loadOffers();
  }, [selectedBranch]);

  const loadOffers = async () => {
    const { data } = await dataService.getSpecialOffers();
    if (data && data.length > 0) {
      setOffers(data);
      // Get first active offer
      const activeOffer = data.find(offer => {
        if (!offer.valid_until) return true;
        return new Date(offer.valid_until) > new Date();
      });
      setCurrentOffer(activeOffer || data[0]);
    }
  };

  useEffect(() => {
    if (!currentOffer || !currentOffer.valid_until) return;

    const calculateTimeLeft = () => {
      const endDate = new Date(currentOffer.valid_until);
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [currentOffer]);

  // Don't show if no offer or not visible
  if (!isVisible || !currentOffer) return null;

  // Extract duration numbers from features if available
  const extractNumbers = (features) => {
    if (!features || !Array.isArray(features)) return { months: 3, free: 2 };

    // Try to find months in features
    const monthsFeature = features.find(f => f.toLowerCase().includes('month'));
    const freeFeature = features.find(f => f.toLowerCase().includes('free'));

    const monthsMatch = monthsFeature?.match(/(\d+)/);
    const freeMatch = freeFeature?.match(/(\d+)/);

    return {
      months: monthsMatch ? parseInt(monthsMatch[1]) : 3,
      free: freeMatch ? parseInt(freeMatch[1]) : 2
    };
  };

  const { months, free } = extractNumbers(currentOffer.features);

  return (
    <section className='relative w-full py-8 px-4 overflow-hidden'>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-700/20 via-gray-900/30 to-black/50"></div>
      
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-20 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <i className="fas fa-times text-white text-xs"></i>
      </button>

      <div className="relative z-10 max-w-5xl mx-auto space-y-4">
        
        {/* Timer */}
        <div className="flex justify-center gap-3">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-red-900/60 to-black/60 backdrop-blur-sm border border-red-500/30 rounded-lg p-3 min-w-[70px] text-center">
              <div className="text-2xl font-bold text-white gymfont">{String(item.value).padStart(2, '0')}</div>
              <div className="text-[10px] text-red-400 font-semibold uppercase">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-900/40 via-gray-900/50 to-black/60 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Badge */}
          <div>
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-bold rounded-full uppercase">
              {currentOffer.offer_type?.replace('_', ' ') || 'SPECIAL OFFER'}
            </span>
          </div>

          {/* Offer */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-white gymfont">{months}</div>
              <div className="text-xs text-red-400 font-semibold">Months</div>
            </div>

            {free > 0 && (
              <>
                <div className="text-3xl text-red-400 font-bold">+</div>

                <div className="text-center">
                  <div className="text-5xl font-bold text-red-400 gymfont">{free}</div>
                  <div className="text-xs text-white font-semibold">Free</div>
                </div>
              </>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col items-center">
            {currentOffer.original_price && currentOffer.original_price > currentOffer.price && (
              <span className="text-2xl text-gray-400 line-through gymfont">
                {currentOffer.original_price}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-5xl font-bold text-white gymfont">{currentOffer.price}</span>
              <span className="text-xl font-bold text-red-400">EGP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}