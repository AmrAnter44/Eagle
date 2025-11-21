import React, { useState, useEffect } from 'react';

export default function BlackFridayOffer() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2025-11-29T23:59:59');
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
  }, []);

  const handleBook = () => {
    const phone = "201028188900";  
    const message = "Hello, I would like to book the Black Friday offer: 3 months + 2 free months for 1800 EGP";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=700,height=700,top=100,left=200");
  };

  if (!isVisible) return null;

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
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-bold rounded-full">
              BLACK FRIDAY
            </span>
          </div>

          {/* Offer */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-white gymfont">3</div>
              <div className="text-xs text-red-400 font-semibold">Months</div>
            </div>

            <div className="text-3xl text-red-400 font-bold">+</div>

            <div className="text-center">
              <div className="text-5xl font-bold text-red-400 gymfont">2</div>
              <div className="text-xs text-white font-semibold">Free</div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-white gymfont">2000</span>
            <span className="text-xl font-bold text-red-400">EGP</span>
          </div>

          {/* Button */}

        </div>
      </div>
    </section>
  );
}