import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBranch } from '../context/BranchContext';

export default function BranchSelector() {
  const { branches, selectedBranch, getCurrentBranch } = useBranch();
  const [isOpen, setIsOpen] = useState(false);

  const currentBranch = getCurrentBranch();

  if (!branches || branches.length <= 1) {
    // Don't show selector if there's only one or no branches
    return null;
  }

  const handleBranchChange = (branch) => {
    setIsOpen(false);
    // Full page reload to ensure fresh data
    window.location.href = `/${branch.slug}`;
  };

  return (
    <div className="relative">
      {/* Selector Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="fa-solid fa-location-dot"></i>
        <span className="font-semibold text-sm">
          {currentBranch ? currentBranch.name_en : 'Select Branch'}
        </span>
        <motion.i
          className="fa-solid fa-chevron-down text-xs"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        ></motion.i>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Dropdown */}
            <motion.div
              className="absolute top-full right-0 mt-2 w-64 bg-zinc-900 border-2 border-red-600/30 rounded-lg shadow-2xl overflow-hidden z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 space-y-1">
                {branches.map((branch) => (
                  <motion.button
                    key={branch.id}
                    onClick={() => handleBranchChange(branch)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      branch.slug === selectedBranch
                        ? 'bg-red-600 text-white'
                        : 'text-white/80 hover:bg-red-600/20 hover:text-white'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start gap-3">
                      <i className={`fa-solid fa-building text-lg mt-1 ${
                        branch.slug === selectedBranch ? 'text-white' : 'text-red-600'
                      }`}></i>
                      <div>
                        <div className="font-semibold">{branch.name_en}</div>
                        <div className="text-xs opacity-70">{branch.name_ar}</div>
                        {branch.address_en && (
                          <div className="text-xs opacity-60 mt-1">
                            <i className="fa-solid fa-location-dot mr-1"></i>
                            {branch.address_en}
                          </div>
                        )}
                      </div>
                      {branch.slug === selectedBranch && (
                        <i className="fa-solid fa-check ml-auto text-white"></i>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
