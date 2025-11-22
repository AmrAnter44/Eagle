import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Coaches from './Coaches';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2';
import { dataService } from '../data/dataService';
import BlackFridayOffer from './BlackFridayOffer';

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
    const phone = "201507817517";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <Nav2 />

      <div className="min-h-screen bg-black">
        <BlackFridayOffer />

        {/* ==================== Hero Text Section ==================== */}
        <motion.div 
          className="text-center py-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-white gymfont mb-4">
            EAGLE <span className="text-red-600">GYM</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/80 text-sm md:text-base">
            <span className="uppercase tracking-widest">Transform</span>
            <div className="w-2 h-2 bg-red-600 rotate-45"></div>
            <span className="uppercase tracking-widest">Dominate</span>
            <div className="w-2 h-2 bg-red-600 rotate-45"></div>
            <span className="uppercase tracking-widest">Conquer</span>
          </div>
        </motion.div>

        {/* ==================== Offers - Horizontal Scroll ==================== */}
        <motion.div 
          className="py-12 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="px-4 mb-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-black text-white gymfont inline-block"
              variants={itemVariants}
            >
              MEMBERSHIP 
              <span className="text-red-600 ml-2">OFFERS</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-24 bg-red-600 mt-2"
              variants={itemVariants}
            ></motion.div>
          </div>

          {/* Horizontal Scrollable Cards */}
          <div className="flex overflow-x-auto gap-6 px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
            {offers.length === 0 ? (
              <div className="w-full text-center py-12">
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
                  className="min-w-[320px] md:min-w-[380px] snap-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-red-600/20 hover:border-red-600 transition-all duration-300 h-full">
                    
                    {/* Card Top - Duration */}
                    <div className="relative h-32 bg-gradient-to-br from-red-600 via-red-700 to-black flex items-center justify-center">
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rotate-45"></div>
                        <div className="absolute bottom-4 right-4 w-20 h-20 border-2 border-white rotate-12"></div>
                      </div>
                      <h3 className="relative text-3xl font-black text-white gymfont tracking-wider">
                        {offer.duration}
                      </h3>
                    </div>

                    <div className="p-6">
                      {/* Price */}
                      <div className="mb-6 text-center">
                        {offer.price_new && offer.price_new !== "0" ? (
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-xl text-gray-500 line-through gymfont">
                              {offer.price}
                            </span>
                            <span className="text-4xl font-black text-red-600 gymfont">
                              {offer.price_new}
                            </span>
                            <span className="text-lg text-white/60">EGP</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-4xl font-black text-white gymfont">
                              {offer.price}
                            </span>
                            <span className="text-lg text-white/60">EGP</span>
                          </div>
                        )}
                      </div>

                      {/* Features - Compact */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-white/90">
                          <i className="fa-solid fa-dumbbell text-red-600 text-sm w-4"></i>
                          <span className="text-sm font-medium">{offer.private} PT Sessions</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <i className="fa-solid fa-user-plus text-red-600 text-sm w-4"></i>
                          <span className="text-sm font-medium">{offer.invite} Invitations</span>
                        </div>
                        {offer.freezing && offer.freezing !== "" && offer.freezing !== 0 && (
                          <div className="flex items-center gap-2 text-white/90">
                            <i className="fa-solid fa-snowflake text-red-600 text-sm w-4"></i>
                            <span className="text-sm font-medium">{offer.freezing} Freezing</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-white/90">
                          <i className="fa-solid fa-apple-alt text-red-600 text-sm w-4"></i>
                          <span className="text-sm font-medium">{offer.nutrition} Nutrition</span>
                        </div>
                      </div>

                      {/* Button */}
                      <motion.button
                        onClick={() => handlebook(offer)}
                        className="w-full py-3 bg-red-600 text-white font-bold gymfont rounded-xl hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        BOOK NOW
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* ==================== Coaches Section ==================== */}
        <Coaches />

        {/* ==================== Motivational Banner ==================== */}
        <motion.div 
          className="py-16 px-4 bg-gradient-to-r from-black via-red-950/30 to-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h3 
              className="text-2xl md:text-4xl font-black text-white gymfont mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              YOUR JOURNEY STARTS <span className="text-red-600">HERE</span>
            </motion.h3>
            <motion.p 
              className="text-white/70 text-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              No Pain • No Gain • No Limits
            </motion.p>
          </div>
        </motion.div>

      </div>
    </>
  );
}