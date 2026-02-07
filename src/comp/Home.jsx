import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Coaches from './Coaches';
import { Link } from 'react-router-dom';
import Nav2 from '../Nav2';
import { dataService } from '../data/dataService';
import BlackFridayOffer from './BlackFridayOffer';
import CompetitionSection from './CompetitionSection';
import { useBranch } from '../context/BranchContext';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);
  const { selectedBranch } = useBranch();

  // Load data when component mounts or branch changes
  useEffect(() => {
    loadData();
  }, [selectedBranch]);

  const loadData = async () => {
    const offersResult = await dataService.getOffers();
    if (offersResult.data) setOffers(offersResult.data);

    const ptPackagesResult = await dataService.getPtPackages();
    if (ptPackagesResult.data) setPtPackages(ptPackagesResult.data);
  };

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

        {/* ==================== Offers - Grid Layout ==================== */}
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

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
            {offers.length === 0 ? (
              <div className="w-full text-center py-12 col-span-full">
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
                  className="w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Eagle Wing Shape Container */}
                  <div className="relative h-full">
                    {/* Wing Shape Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-black transform -skew-y-2 rounded-tl-[100px] rounded-br-[100px] opacity-90"></div>
                    
                    {/* Inner Wing Shape */}
                    <div className="relative bg-zinc-900/95 h-full transform -skew-y-2 rounded-tl-[100px] rounded-br-[100px] border-2 border-red-600/40 hover:border-red-600 transition-all duration-300 overflow-hidden">
                      
                      <div className="transform skew-y-2 p-6 h-full flex flex-col">
                        
                        {/* Duration Header */}
                        <div className="text-center mb-4 pb-4 border-b-2 border-red-600/30">
                          <h3 className="text-3xl font-black text-white gymfont tracking-wider">
                            {offer.duration}
                          </h3>
                        </div>

                        {/* Price Section */}
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

                        {/* Features - عرض كل الـ features من الداتابيس */}
                        <div className="space-y-3 mb-6 flex-1">
                          {offer.features && Array.isArray(offer.features) && offer.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-white/90 bg-black/30 p-2 rounded-lg">
                              <i className="fa-solid fa-check text-red-600 text-sm w-5"></i>
                              <span className="text-sm font-medium">{feature}</span>
                            </div>
                          ))}
                          {(!offer.features || !Array.isArray(offer.features) || offer.features.length === 0) && (
                            <div className="text-white/50 text-sm text-center">No features available</div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Wing Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-transparent blur-xl -z-10 transform -skew-y-2 rounded-tl-[100px] rounded-br-[100px]"></div>
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