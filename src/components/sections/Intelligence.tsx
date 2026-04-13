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
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-20 md:py-48 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Glowing Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(245,158,11,0.2)_10%,transparent_30%,rgba(245,158,11,0.4)_50%,transparent_60%)] rounded-full blur-3xl opacity-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square bg-amberMain rounded-full blur-[80px] opacity-60" />
      </div>

      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ y, opacity }} className="max-w-3xl">
          <div className="text-xs md:text-sm font-bold tracking-widest uppercase text-amberMain mb-4 md:mb-6">Neural Core Architecture</div>
          <h2 className="text-[10vw] sm:text-4xl md:text-[5.5rem] font-bold tracking-tighter leading-[1] text-white mb-6 md:mb-8">
            A brain that understands your silence.
          </h2>
          <p className="text-lg md:text-2xl text-white/50 font-medium tracking-tight text-balance max-w-[95%] mx-auto">
            Powered by a localized, privacy-first emotional engine. It processes your physical cues without ever sending audio or video to the cloud. Complete intelligence, perfectly isolated.
          </p>
        </motion.div>

        {/* Orbiting Tech Specs */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {[
            { label: "Processing", value: "Xiao ESP-32 C3" },
            { label: "Privacy", value: "100% Offline" },
            { label: "Sensors", value: "Touch Sensor" },
            { label: "Battery", value: "32hr Standby" },
          ].map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col items-center hover:bg-white/[0.06] hover:-translate-y-2 transition-all duration-300"
            >
              <span className="text-white/40 font-medium text-sm mb-2">{spec.label}</span>
              <span className="text-white font-bold text-xl tracking-tight">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Top/Bottom Fade */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
    </section>
  );
}
