import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SparkleEffect = ({ trigger }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newSparkles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth, // Random X position
        y: Math.random() * window.innerHeight, // Random Y position
        size: Math.random() * 8 + 4, // Random size (4px - 12px)
        delay: Math.random() * 0.5, // Random delay
      }));

      setSparkles(newSparkles);

      // Remove sparkles after animation
      setTimeout(() => setSparkles([]), 2000);
    }
  }, [trigger]);

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 1.8, y: -50 }}
          transition={{
            duration: 1.5,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
          className="absolute bg-yellow-400 rounded-full shadow-md"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
          }}
        />
      ))}
    </>
  );
};

export default SparkleEffect;
