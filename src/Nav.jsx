import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BranchSelector from "./comp/BranchSelector";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      filter: "drop-shadow(0 0 30px rgba(220, 38, 38, 0.8))",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      backgroundColor: "rgba(220, 38, 38, 0.2)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const linkVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      color: "#dc2626",
      textShadow: "0 0 15px rgba(220, 38, 38, 0.8)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <motion.div 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-xl shadow-2xl' 
            : 'bg-black/80 backdrop-blur-md'
        }`}
        initial="hidden"
        animate="visible"
        variants={navVariants}
        style={{
          borderBottom: scrolled ? '2px solid rgba(220, 38, 38, 0.6)' : '2px solid rgba(220, 38, 38, 0.3)'
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <Link to={"/"} className="flex items-center">
              <motion.img 
                src="/assets/bigLogo.png" 
                alt="Eagle Gym Logo" 
                className="h-16 lg:h-20 w-auto"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              />
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Branch Selector for Mobile */}
              <div className="scale-90">
                <BranchSelector />
              </div>

              <motion.button
                className="text-white text-3xl p-2 rounded-lg"
                onClick={() => setOpen(!open)}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {open ? (
                  <motion.i 
                    className="fas fa-times"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.i 
                    className="fas fa-bars"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* MAP - مخفي مؤقتاً */}
              {/* <Link to="map">
                <motion.span
                  className="text-white font-bold text-lg gymfont relative group cursor-pointer"
                  variants={linkVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  MAP
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                </motion.span>
              </Link> */}

              {/* Branch Selector */}
              <BranchSelector />
            </nav>

          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            initial={false}
            animate={{
              height: open ? "auto" : 0,
              opacity: open ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col gap-2 py-4 mt-4 border-t border-red-600/30">
              {/* MAP - مخفي مؤقتاً */}
              {/* <Link
                to="map"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="text-white font-bold text-lg gymfont px-4 py-3 rounded-lg hover:bg-red-600/20 transition-all"
                  whileHover={{ x: 10, backgroundColor: "rgba(220, 38, 38, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Map
                </motion.div>
              </Link> */}

            </nav>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}