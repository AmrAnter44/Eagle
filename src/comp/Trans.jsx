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

  // Auto slide كل 3 ثواني
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full">
      {/* العنوان */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white gymfont mb-2">
          <span className="text-red-600">Transformations</span>
        </h2>
        <div className="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
      </div>

      {/* السلايدر */}
      <div className="max-w-sm mx-auto mb-6">
        <div className="glass rounded-2xl p-4">
          <div className="bg-black/50 rounded-xl p-2">
            <img
              src={images[current]}
              alt={`transformation-${current + 1}`}
              className="w-full h-62 object-cover rounded-lg"
            />
          </div>

          {/* Dots للتنقل */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'bg-red-600 w-4' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}