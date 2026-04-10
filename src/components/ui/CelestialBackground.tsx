"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CelestialBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transit path (Sine wave arc)
  // X: 10% to 90%
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "90%"]);
  // Y: High (start) -> Low (middle) -> High (end) - inverted for screen coords
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["80%", "20%", "80%"]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars Layer */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* The Sun / Moon Transit */}
      <motion.div
        style={{ left: x, top: y, opacity, scale }}
        className="absolute w-24 h-24 md:w-32 md:h-32"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-amberMain/20 blur-[60px] rounded-full" />
        
        {/* Core Body */}
        <div className="absolute inset-0 bg-amberMain rounded-full shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-center">
            {/* Inner details for "Tech Sun" look */}
            <div className="w-[70%] h-[70%] border border-white/20 rounded-full" />
            <div className="w-[40%] h-[40%] border border-white/40 rounded-full" />
        </div>

        {/* Rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-[2px] bg-amberMain/30 origin-left"
            style={{ transform: `rotate(${i * 45}deg) translateX(50%)` }}
          />
        ))}
      </motion.div>
    </div>
  );
}
