"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Intelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-20 md:py-40 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Glowing Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(245,158,11,0.1)_15%,transparent_40%,rgba(245,158,11,0.25)_60%,transparent_80%)] rounded-full blur-[100px] opacity-40"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] aspect-square bg-amberMain rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="w-full max-w-6xl relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ y, opacity }} className="max-w-4xl">
          <div className="text-xs font-bold tracking-[0.3em] uppercase text-amberMain mb-8 md:mb-10">Neural Architecture</div>
          <h2 className="mb-8 md:mb-10">
            Intelligence <br/>beyond the cloud.
          </h2>
          <p className="text-lg md:text-[2rem] leading-tight text-white/40 font-medium tracking-tighter text-balance max-w-2xl mx-auto mb-12 px-4 md:px-0">
            Privacy-first emotional engine. Every neuron resides locally, protecting your physical world while enriching your digital one.
          </p>
        </motion.div>

        {/* Orbiting Tech Specs */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Fabric", value: "ESP-32 C3" },
            { label: "State", value: "100% Offline" },
            { label: "Haptics", value: "Kinetic Nudge" },
            { label: "Endurance", value: "32hr Standby" },
          ].map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col items-center md:items-start hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group"
            >
              <span className="text-white/30 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 group-hover:text-amberMain transition-colors">{spec.label}</span>
              <span className="text-white font-bold text-xl md:text-2xl tracking-tight leading-none text-center md:text-left">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Top/Bottom Fade */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#050505] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] to-transparent z-10" />
    </section>
  );
}
