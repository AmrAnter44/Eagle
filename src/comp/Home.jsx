import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Coaches from './Coaches';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2';
import { dataService } from '../data/dataService';
import BlackFridayOffer from './BlackFridayOffer'; // حط المسار الصح
export default function Home() {
  const [offers, setOffers] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);

  useEffect(() => {
    dataService.getOffers().then(({ data }) => {
      if (data) setOffers(data);
    });

    dataService.getPtPackages().then(({ data }) => {
      if (data) setPtPackages(data);
    });
  }, []);

  function handlebook(offer) {
    const phone = "201122010294";
    const message = `Hello, I would like to book the ${offer.duration} offer.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }

  function handlePTBook(ptPackage) {
    const phone = "201028188900";
    const message = `Hello, I would like to book ${ptPackage.sessions} PT Sessions.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "whatsappWindow", "width=600,height=600,top=100,left=200");
  }

  const calculatePricePerSession = (price, sessions) => {
    return Math.round(price / sessions);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <Nav2 />

      <div className="min-h-screen">
            <BlackFridayOffer />
        {/* ==================== Membership Offers Section ==================== */}
        <motion.div 
          className='w-full py-16 bg-gradient-to-b from-black via-red-950/20 to-black'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4">
            
            <motion.div 
              className="text-center mb-12"
              variants={titleVariants}
            >
              <h2 className='text-4xl md:text-5xl text-white font-bold gymfont mb-4 gradient-text'>
                MEMBERSHIP OFFERS
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-white mx-auto rounded-full"></div>
            </motion.div>

            <motion.div 
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              variants={containerVariants}
            >
              {offers.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <motion.i 
                    className="text-4xl text-red-600 fa-solid fa-spinner fa-spin"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ) : (
                offers.map((offer, index) => (
                  <motion.div 
                    key={offer.id} 
                    className="relative group"
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-black rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    
                    {/* Card Content */}
                    <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-red-600/30 group-hover:border-red-600 transition-all duration-300">
                      
                      {/* Header */}
                      <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 relative overflow-hidden">
                        <motion.div 
                          className="absolute inset-0 bg-white/10"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <h3 className='relative font-bold text-3xl gymfont text-white text-center tracking-wider'>
                          <i className="fa-solid fa-dumbbell pr-2"></i>
                          {offer.duration}
                        </h3>
                      </div>

                      {/* Body */}
                      <div className='p-6 space-y-6'>
                        
                        {/* Price Section */}
                        <div className='flex justify-center items-center gap-4'>
                          {offer.price_new && offer.price_new !== "0" ? (
                            <>
                              <motion.h3 
                                className="font-bold text-xl line-through text-gray-500 gymfont"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                {offer.price} EGP
                              </motion.h3>
                              <motion.h3 
                                className="font-bold text-4xl text-red-600 gymfont"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                              >
                                {offer.price_new} EGP
                              </motion.h3>
                            </>
                          ) : (
                            <motion.h3 
                              className="font-bold text-4xl text-white gymfont"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3, type: "spring" }}
                            >
                              {offer.price} EGP
                            </motion.h3>
                          )}
                        </div>

                        {/* Features List */}
                        <ul className='space-y-3 text-white'>
                          <motion.li 
                            className='flex items-center gap-3 font-semibold text-lg'
                            whileHover={{ x: 5 }}
                          >
                            <i className='fa-solid fa-check text-red-600 text-xl'></i>
                            <span>{offer.private} PT Sessions</span>
                          </motion.li>
                          <motion.li 
                            className='flex items-center gap-3 font-semibold text-lg'
                            whileHover={{ x: 5 }}
                          >
                            <i className='fa-solid fa-check text-red-600 text-xl'></i>
                            <span>{offer.inbody} InBody Scans</span>
                          </motion.li>
                          <motion.li 
                            className='flex items-center gap-3 font-semibold text-lg'
                            whileHover={{ x: 5 }}
                          >
                            <i className='fa-solid fa-check text-red-600 text-xl'></i>
                            <span>{offer.invite} Invitations</span>
                          </motion.li>

                        </ul>

                        {/* Book Button */}
                        <motion.button
                          onClick={() => handlebook(offer)}
                          className='relative w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg gymfont overflow-hidden group/btn'
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative z-10">BOOK NOW</span>
                          <motion.div 
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* ==================== Marquee Section ==================== */}
        <motion.div 
          className="marquee"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="gymfont">
            <span># BELIEVE IN YOURSELF</span> &nbsp; &nbsp;
            <span># EAGLE GYM</span> &nbsp; &nbsp;
            <span># NO PAIN NO GAIN</span> &nbsp; &nbsp;
            <span># TRANSFORM YOUR BODY</span> &nbsp; &nbsp;
          </p>
        </motion.div>

        {/* ==================== Coaches Section ====================
        <Coaches /> */}

        {/* ==================== Features Section ==================== */}
        <motion.div 
          className='flex justify-center gap-8 lg:gap-16 py-16 bg-black'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="glass rounded-2xl p-8 text-center min-w-[200px]"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.i 
              className="fas fa-clock text-5xl text-red-600 mb-4"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <p className="text-white font-bold text-2xl gymfont mb-2">24/7</p>
            <p className="text-gray-400 text-lg">OPEN</p>
          </motion.div>

          <motion.div 
            className="glass rounded-2xl p-8 text-center min-w-[200px]"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.i 
              className="fas fa-wifi text-5xl text-red-600 mb-4"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
            <p className="text-white font-bold text-2xl gymfont mb-2">FREE</p>
            <p className="text-gray-400 text-lg">WI-FI</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}