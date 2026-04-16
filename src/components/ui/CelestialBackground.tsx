"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

export default function CelestialBackground({ targetRef }: { targetRef?: React.RefObject<HTMLDivElement | HTMLElement | null> }) {
  const internalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
    }));
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef || internalRef,
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
    <div ref={internalRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars Layer */}
      <div className="absolute inset-0 opacity-20">
        {mounted && stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: star.duration, repeat: Infinity }}
          />
        ))}
      </div>

      {/* The Sun / Moon Transit */}
      <motion.div
        style={mounted ? { left: x, top: y, opacity, scale } : { opacity: 0 }}
        className="absolute w-24 h-24 md:w-32 md:h-32"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-white/5 blur-[50px] rounded-full" />
        
        {/* Core Body */}
        <div className="absolute inset-0 bg-white/90 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
            {/* Lunar Craters (Stylized) */}
            <div className="absolute top-[20%] left-[30%] w-[15%] h-[15%] bg-black/[0.03] rounded-full" />
            <div className="absolute top-[50%] left-[15%] w-[25%] h-[25%] bg-black/[0.05] rounded-full" />
            <div className="absolute top-[60%] left-[60%] w-[20%] h-[20%] bg-black/[0.04] rounded-full" />
            
            {/* Inner details for "Tech Moon" look */}
            <div className="w-[85%] h-[85%] border border-black/[0.03] rounded-full" />
            <div className="w-[50%] h-[50%] border border-black/[0.05] rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
