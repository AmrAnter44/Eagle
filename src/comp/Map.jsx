import React, { useState } from "react";
import { motion } from "framer-motion";
import gymMap from "../../public/map.png";
import { Link } from "react-router-dom";

function Map() {
  const [hoveredArea, setHoveredArea] = useState(null);

const areas = [
  // LADIES ROOM (العمود الرفيع الشمال فوق)
  { 
    id: "Ladies", 
    name: "Ladies Room", 
    style: "top-0 left-0 w-[25%] h-[40%]", 
    route: "/ladies" 
  },

  // CARDIO AREA (اليسار تحت)
  { 
    id: "Cardio", 
    name: "Cardio Area", 
    style: "top-[40%] left-0 w-[25%] h-[60%]", 
    route: "/cardio" 
  },

  // MACHINES (المربع الكبير في النص)
  { 
    id: "Machines", 
    name: "Machines", 
    style: "top-0 left-[27%] w-[45%] h-[65%]", 
    route: "/machines" 
  },

  // BAR (شريط صغير نص تحت)
  { 
    id: "Bar", 
    name: "Bar", 
    style: "top-[66%] left-[27%] w-[45%] h-[8%]", 
    route: "/bar" 
  },

  // MEN ROOM (تحت النص)
  { 
    id: "Men", 
    name: "Men Room", 
    style: "top-[75%] left-[26%] w-[45%] h-[25%]", 
    route: "/men" 
  },

  // FREE WEIGHT (العمود الكبير يمين)
  { 
    id: "Free", 
    name: "Free Weight", 
    style: "top-0 right-0 w-[30%] h-full", 
    route: "/free" 
  }
];


  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mapContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const mapImageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.5
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { duration: 0.3 }
    }
  };

  const areaVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      backgroundColor: "red",
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="text-2xl font-bold text-center mt-40"
        variants={titleVariants}
      >
        Tap any section on the map to discover more details!
      </motion.h3>

      <motion.div 
        className="relative w-full max-w-[768px] mx-auto p-6 m-12"
        variants={mapContainerVariants}
      >
        {/* الخريطة */}
        <motion.img 
          src={gymMap} 
          alt="Gym Map" 
          className="w-full opacity-80" 
          variants={mapImageVariants}
        />

        {/* اللوجو فوق الخريطة */}
        <motion.img
          src="./logo.png"
          alt="Map Logo"
          className="absolute center top-24 left-1/2 transform -translate-x-1/2 -z-20"
          variants={logoVariants}
          whileHover="hover"
        />

        {/* المناطق التفاعلية */}
        {areas.map((area, index) => (
          <motion.div
            key={area.id}
            className={`absolute ${area.style} z-10 cursor-pointer`}
            variants={areaVariants}
            custom={index}
            whileHover="hover"
            onHoverStart={() => setHoveredArea(area)}
            onHoverEnd={() => setHoveredArea(null)}
          >
            <Link
              to={area.route}
              className="w-full h-full block"
            >
              {/* Overlay للتفاعل البصري */}
              <motion.div
                className="w-full h-full rounded-lg border-2 border-transparent"

                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        ))}

        {/* Tooltip عند الـ hover */}
        {hoveredArea && (
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg z-20 pointer-events-none"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p className="font-bold text-center">{hoveredArea.name}</p>
            <motion.div
              className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />
          </motion.div>
        )}

        {/* تأثير Pulse على المناطق */}
        {areas.map((area, index) => (
          <motion.div
            key={`pulse-${area.id}`}
            className={`absolute ${area.style} z-5 pointer-events-none`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-red-600 rounded-lg" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Map;