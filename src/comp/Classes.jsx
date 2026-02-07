import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dataService } from '../data/dataService';
import { useBranch } from '../context/BranchContext';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const { selectedBranch } = useBranch();

  // Load classes when component mounts or branch changes
  useEffect(() => {
    loadClasses();
  }, [selectedBranch]);

  const loadClasses = async () => {
    const { data } = await dataService.getClasses();
    if (data) setClasses(data);
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
      scale: 1.05,
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
    <div className="min-h-screen py-20">
      <div className="w-full max-w-7xl mx-auto px-4 my-8 mt-40">
        
        {/* Title Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h2 className='text-5xl md:text-6xl text-white font-bold gymfont mb-4 gradient-text'>
            OUR CLASSES
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-white mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">Join our professional training sessions</p>
        </motion.div>

        {/* Classes Grid */}
        {classes.length === 0 ? (
          <div className="text-center py-16">
            <motion.i 
              className="text-5xl text-red-600 fa-solid fa-spinner fa-spin"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500 ${
                  classItem.mem 
                    ? "bg-gradient-to-r from-gray-600 to-black" 
                    : classItem.mix === "Ladies" 
                    ? "bg-gradient-to-r from-pink-600 to-red-800" 
                    : "bg-gradient-to-r from-red-600 to-black"
                }`}></div>
                
                {/* Card Content */}
                <div className={`relative backdrop-blur-xl rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  classItem.mem 
                    ? "bg-gray-900/90 border-gray-600/30 group-hover:border-gray-600" 
                    : classItem.mix === "Ladies" 
                    ? "bg-pink-950/90 border-pink-600/30 group-hover:border-pink-600" 
                    : "bg-black/90 border-red-600/30 group-hover:border-red-600"
                }`}>
                  
                  {/* Header with Icon */}
                  <div className={`p-6 relative overflow-hidden ${
                    classItem.mem 
                      ? "bg-gradient-to-r from-gray-700 to-gray-800" 
                      : classItem.mix === "Ladies" 
                      ? "bg-gradient-to-r from-pink-600 to-pink-800" 
                      : "bg-gradient-to-r from-red-600 to-red-800"
                  }`}>
                    <motion.div 
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <h3 className="relative font-bold text-2xl gymfont text-white text-center tracking-wider">
                      <motion.i 
                        className="fa-solid fa-fire pr-2"
                        whileHover={{ scale: 1.3, rotate: 20 }}
                        transition={{ duration: 0.3 }}
                      />
                      {classItem.classname}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className='p-6 space-y-4'>
                    
                    {/* Day */}
                    <motion.div 
                      className='flex items-center gap-3'
                      whileHover={{ x: 5 }}
                    >
                      <i className='fa-solid fa-calendar-days text-red-600 text-xl'></i>
                      <div>
                        <p className="text-gray-400 text-sm">Day</p>
                        <p className="text-white font-bold text-lg">{classItem.day}</p>
                      </div>
                    </motion.div>

                    {/* Coach */}
                    <motion.div 
                      className='flex items-center gap-3'
                      whileHover={{ x: 5 }}
                    >
                      <i className='fa-solid fa-user-tie text-red-600 text-xl'></i>
                      <div>
                        <p className="text-gray-400 text-sm">Coach</p>
                        <p className="text-white font-bold text-lg">{classItem.coachname}</p>
                      </div>
                    </motion.div>

                    {/* Time */}
                    <motion.div 
                      className='flex items-center gap-3'
                      whileHover={{ x: 5 }}
                    >
                      <i className='fa-solid fa-clock text-red-600 text-xl'></i>
                      <div>
                        <p className="text-gray-400 text-sm">Time</p>
                        <p className="text-white font-bold text-lg">{classItem.time1} PM</p>
                      </div>
                    </motion.div>

                    {/* Type Badge */}
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                      classItem.mix === "Ladies" 
                        ? "bg-pink-600/20 text-pink-400 border border-pink-600/30" 
                        : classItem.mix === "Mixed"
                        ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                        : "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                    }`}>
                      <i className={`fa-solid ${
                        classItem.mix === "Ladies" 
                          ? "fa-venus" 
                          : classItem.mix === "Mixed"
                          ? "fa-venus-mars"
                          : "fa-mars"
                      } pr-2`}></i>
                      {classItem.mix}
                    </div>

                    {/* Membership Badge */}
                    {classItem.mem && (
                      <motion.div 
                        className="inline-block px-4 py-2 rounded-full bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 text-sm font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <i className="fa-solid fa-star pr-2"></i>
                        Out of Membership
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}