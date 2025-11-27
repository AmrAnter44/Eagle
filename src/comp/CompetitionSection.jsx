import React from 'react';

export default function CompetitionSection() {
  const handleRegister = () => {
    const phone = "201507817517";
    const message = "Hello, I would like to register for the Competition on December 1st";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=700,height=700,top=100,left=200");
  };

  return (
    <section className='relative w-full py-12 px-4 overflow-hidden'>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-700/20 via-gray-900/30 to-black/50"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-bold rounded-full mb-4">
            COMPETITION EVENT
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white gymfont mb-2">
            Show Your Strength
          </h2>
          <p className="text-xl text-red-400 font-semibold">
            Monday, December 1st 2025
          </p>
        </div>

        {/* Sponsors */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-sm text-red-400 font-semibold mb-3">SPONSORED BY</p>
            <div className="flex items-center gap-6">
              {/* Gym Logo */}
              <div className="bg-white/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 min-w-4px  flex items-center justify-center">
                <img src="./logo.png" alt="" className='w-20'/>
              </div>

              {/* Second Sponsor Logo */}
              <div className="bg-white/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 min-w-4px  flex items-center justify-center">
                <img src="./e.png" alt="" className='w-20'/>
              </div>

            </div>
          </div>
        </div>

        {/* Prizes Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* First Place */}
          <div className="bg-gradient-to-br from-yellow-600/40 via-gray-900/50 to-black/60 backdrop-blur-sm border-2 border-yellow-500/50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="mb-4">
              <i className="fas fa-trophy text-6xl text-yellow-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-yellow-400 gymfont mb-2">1ST PLACE</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mb-4"></div>
            <div className="space-y-2">
              <p className="text-white font-semibold text-lg">Pre-Workout</p>
              <p className="text-yellow-300 text-sm">Premium Supplement</p>
            </div>
          </div>

          {/* Second Place */}
          <div className="bg-gradient-to-br from-gray-400/40 via-gray-900/50 to-black/60 backdrop-blur-sm border-2 border-gray-400/50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="mb-4">
              <i className="fas fa-medal text-6xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 gymfont mb-2">2ND PLACE</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-4"></div>
            <div className="space-y-2">
              <p className="text-white font-semibold">Oversized T-Shirt</p>
              <p className="text-gray-300">+</p>
              <p className="text-white font-semibold">Tank Top</p>
            </div>
          </div>

          {/* Third Place */}
          <div className="bg-gradient-to-br from-orange-600/40 via-gray-900/50 to-black/60 backdrop-blur-sm border-2 border-orange-500/50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="mb-4">
              <i className="fas fa-award text-6xl text-orange-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-orange-400 gymfont mb-2">3RD PLACE</h3>
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-4"></div>
            <div className="space-y-2">
              <p className="text-white font-semibold">Gym Pants</p>
              <p className="text-orange-300">+</p>
              <p className="text-white font-semibold">Tank Top</p>
            </div>
          </div>

        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={handleRegister}
            className='px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg rounded-xl hover:from-red-500 hover:to-red-400 transition-all duration-300 font-bold transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/50'
          >
            Register Now
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Limited spots available - Register today!
          </p>
        </div>

      </div>
    </section>
  );
}
