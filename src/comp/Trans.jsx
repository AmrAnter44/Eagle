import React, { useState, useEffect } from "react";

export default function Trans() {
  const [current, setCurrent] = useState(0);

  const images = [
    "/trans/1.png",
    "/trans/2.png",
    "/trans/3.png",
    "/trans/4.png",
    "/trans/5.png",
    "/trans/6.png",
    "/trans/7.png",
    "/trans/8.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full h-full flex flex-col">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white gymfont inline-block">
          <span className="text-red-600">TRANSFORMATIONS</span>
        </h2>
        <div className="h-1 w-20 bg-red-600 mt-2"></div>
      </div>

      {/* Main Image Container - بشكل مختلف */}
      <div className="relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-black/50 blur-3xl"></div>
        
        <div className="relative bg-black rounded-2xl overflow-hidden border-2 border-red-600/30 h-full">
          
          {/* Image */}
          <div className="relative h-96 md:h-[500px]">
            <img
              src={images[current]}
              alt={`transformation-${current + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            {/* Counter في الزاوية */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {current + 1}/{images.length}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          {/* Dots - في الأسفل داخل الصورة */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1 rounded-full transition-all ${
                  index === current ? 'bg-red-600 w-8' : 'bg-white/50 w-4'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Text Below */}
      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm uppercase tracking-widest">
          Real Results • Real People
        </p>
      </div>
    </div>
  );
}