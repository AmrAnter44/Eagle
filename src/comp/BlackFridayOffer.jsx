import React, { useEffect, useState } from 'react';
import { dataService } from '../data/dataService';
import { supabase } from '../lib/supabase';

export default function BlackFridayOffer() {
  const [offers, setOffers] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fetch offers from Supabase - فقط العرض الأول
  useEffect(() => {
    dataService.getSpecialOffers().then(({ data, error }) => {
      if (error) {
        console.error('Error loading offers:', error);
      }
      if (data && data.length > 0) {
        console.log('🎁 Offers data:', data);
        // خد أول offer بس (display_order = 1)
        const firstOffer = data.find(offer => offer.display_order === 1) || data[0];
        console.log('🎁 First offer:', firstOffer);
        setOffers([firstOffer]); // حطه في array عشان الـ map
      }
    });
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2026-02-02T23:59:59');
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

  const handleBook = (offer) => {
    const phone = "201028188900";
    const price = offer.price || offer.metadata?.price || 'N/A';
    const message = `Hello, I would like to book: ${offer.name} for ${price} EGP`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  };

  // Helper function لتحويل relative path لـ full Supabase Storage URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

    const { data } = supabase.storage
      .from('gym-media')
      .getPublicUrl(imagePath);

    return data.publicUrl;
  };

  // لو مفيش offers، السيكشن يختفي تماماً
  if (offers.length === 0) {
    return null;
  }

  return (
    <section className='relative w-full py-8 px-4 overflow-hidden'>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-gray-900/30 to-black/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-4">
        {offers.map((offer, index) => {
          const metadata = typeof offer.metadata === 'string'
            ? JSON.parse(offer.metadata)
            : (offer.metadata || {});

          return (
            <div key={offer.id} className="bg-gradient-to-r from-red-900/40 via-gray-900/50 to-black/60 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">

              {/* Badge */}
              <div>
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full">
                  {offer.discount_percentage ? `${offer.discount_percentage}% OFF` : 'Special Offer'}
                </span>
              </div>

              {/* Offer Title/Description */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white gymfont">
                    {offer.name}
                  </div>
                  {offer.description && (
                    <div className="text-sm text-red-400 mt-1">{offer.description}</div>
                  )}
                </div>
              </div>

              {/* Price - يختفي لو السعر = 0 */}
              {(offer.price && parseFloat(offer.price) !== 0) || (metadata.price && parseFloat(metadata.price) !== 0) ? (
                <div className="flex items-center gap-2">
                  <span className="text-5xl font-bold text-white gymfont">
                    {offer.price || metadata.price || 'N/A'}
                  </span>
                  <span className="text-xl font-bold text-red-400">EGP</span>
                </div>
              ) : null}

              {/* Button */}
              <button
                onClick={() => handleBook(offer)}
                className='px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-400 transition-all duration-300 font-bold transform hover:scale-105 active:scale-95'
              >
                Book Now
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
