import React from 'react';
import { motion } from 'framer-motion';

export default function BranchHome() {
  const branches = [
    {
      slug: 'boolaq',
      name_en: 'Boolaq',
      name_ar: 'بولاق',
      route: '/boolaq',
      icon: 'fa-location-dot',
      gradient: 'from-red-600 via-red-700 to-red-900',
      description_en: 'Your transformation starts here',
      description_ar: 'رحلتك تبدأ من هنا'
    },
    {
      slug: 'qoopa',
      name_en: 'Hadayek El Qobba',
      name_ar: 'حدائق القبة',
      route: '/qoopa',
      icon: 'fa-location-dot',
      gradient: 'from-gray-700 via-gray-800 to-black',
      description_en: 'Elevate your fitness journey',
      description_ar: 'ارتقِ برحلتك الرياضية'
    },
    {
      slug: 'fostat',
      name_en: 'Fostat',
      name_ar: 'فسطاط',
      route: '/fostat',
      icon: 'fa-location-dot',
      gradient: 'from-zinc-700 via-zinc-800 to-zinc-900',
      description_en: 'Where champions are made',
      description_ar: 'حيث يُصنع الأبطال'
    }
  ];

  const handleBranchClick = (branch) => {
    window.location.href = branch.route;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-y-auto">
      {/* Video Background - Fixed Position */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/0910.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay - Fixed Position */}
      <div className="fixed inset-0 bg-black/70 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-red-950/20 via-black/40 to-black/60 z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-5xl w-full">
        <motion.div
          className="text-center mb-4 md:mb-6"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <img
            src="/assets/bigLogo.png"
            alt="Eagle Gym Logo"
            className="h-16 sm:h-20 md:h-24 lg:h-28 mx-auto mb-3 md:mb-4 drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="text-center mb-8 md:mb-10"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white gymfont mb-2 md:mb-3">
            EAGLE <span className="text-red-600">GYM</span>
          </h1>
          <div className="flex items-center justify-center gap-2 md:gap-3 text-white/60 text-xs md:text-sm mb-3 md:mb-4">
            <span className="uppercase tracking-widest">Transform</span>
            <div className="w-1.5 h-1.5 bg-red-600 rotate-45"></div>
            <span className="uppercase tracking-widest">Dominate</span>
            <div className="w-1.5 h-1.5 bg-red-600 rotate-45"></div>
            <span className="uppercase tracking-widest">Conquer</span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-bold gymfont">
            Choose Your Branch
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/60 mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
            اختر فرعك
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {branches.map((branch) => (
            <motion.div
              key={branch.slug}
              className="relative cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleBranchClick(branch)}
            >
              <div className="relative h-64 sm:h-72 md:h-80 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${branch.gradient} transform -skew-y-2 rounded-2xl opacity-90 group-hover:opacity-100 transition-all duration-300`}></div>

                <div className="relative bg-zinc-900/95 h-full transform -skew-y-2 rounded-2xl border-2 border-red-600/40 group-hover:border-red-600 transition-all duration-300 overflow-hidden">
                  <div className="transform skew-y-2 p-4 sm:p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                    <motion.div
                      className="mb-3 sm:mb-4 md:mb-5"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`fa-solid ${branch.icon} text-4xl sm:text-5xl md:text-6xl text-red-600 drop-shadow-lg`}></i>
                    </motion.div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white gymfont mb-2 tracking-wider">
                      {branch.name_en.toUpperCase()}
                    </h2>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white/80 mb-3 sm:mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {branch.name_ar}
                    </h3>

                    <p className="text-white/70 text-xs sm:text-sm mb-1 hidden sm:block">{branch.description_en}</p>
                    <p className="text-white/60 text-xs sm:text-sm hidden sm:block" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {branch.description_ar}
                    </p>

                    <motion.div
                      className="mt-4 sm:mt-6 md:mt-8"
                      initial={{ x: 0 }}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <i className="fa-solid fa-arrow-right text-lg sm:text-xl md:text-2xl text-red-600"></i>
                    </motion.div>
                  </div>
                </div>

                <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-transparent blur-xl -z-10 transform -skew-y-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8 md:mt-12 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-widest">
            No Pain • No Gain • No Limits
          </p>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
