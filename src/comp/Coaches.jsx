import React, { useState, useEffect } from 'react';
import Trans from '../comp/Trans';
import { dataService } from '../data/dataService';

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dataService.getCoaches().then(({ data }) => {
      if (data) setCoaches(data);
    });
  }, []);

  useEffect(() => {
    if (coaches.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % coaches.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [coaches.length]);

  return (
    <section className="py-16 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Layout - Coaches & Transformations جنب بعض */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* قسم الكوتشيز - على اليسار */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-white gymfont inline-block">
                OUR <span className="text-red-600">COACHES</span>
              </h2>
              <div className="h-1 w-20 bg-red-600 mt-2"></div>
            </div>

            {coaches.length === 0 ? (
              <div className="text-center py-12">
                <i className="text-4xl text-red-600 fa-solid fa-spinner fa-spin" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 border border-red-600/20">
                
                {/* Coach Info - في الأعلى */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white gymfont">
                      {coaches[current].name}
                    </h3>
                    <p className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                      {coaches[current].title}
                    </p>
                  </div>
                </div>

                {/* Coach Image - في النص */}
                <div className="relative mb-6 h-72 flex items-center justify-center">
                  <div className="absolute inset-0 bg-red-600/20 blur-2xl"></div>
                  <img
                    className="relative w-64 object-cover rounded-xl"
                    src={coaches[current].img}
                    alt={`Coach ${coaches[current].name}`}
                  />
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2">
                  {coaches.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-1 rounded-full transition-all ${
                        index === current ? 'bg-red-600 w-8' : 'bg-zinc-700 w-4'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* قسم التحولات - على اليمين */}
          <div className="order-1 lg:order-2">
            <Trans />
          </div>

        </div>
      </div>
    </section>
  );
}