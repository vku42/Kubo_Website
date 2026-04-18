"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1800;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayed(end);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

const SPECS = [
  { label: "Computing Fabric", displayValue: "ESP32-C3 RISC-V", numericValue: null },
  { label: "Local Intelligence", displayValue: null, numericValue: 100, suffix: "%" },
  { label: "Tactile Response", displayValue: "Kinetic Nudge", numericValue: null },
  { label: "Active Endurance", displayValue: null, numericValue: 32, suffix: "hr" },
];

// CSS-only neural network SVG nodes
const NODES = [
  { cx: 80, cy: 80 }, { cx: 80, cy: 200 }, { cx: 80, cy: 320 },
  { cx: 240, cy: 50 }, { cx: 240, cy: 160 }, { cx: 240, cy: 280 }, { cx: 240, cy: 380 },
  { cx: 400, cy: 120 }, { cx: 400, cy: 240 }, { cx: 400, cy: 340 },
  { cx: 540, cy: 200 },
];

const EDGES = [
  [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6],
  [3, 7], [3, 8], [4, 7], [4, 8], [4, 9], [5, 8], [5, 9], [6, 9],
  [7, 10], [8, 10], [9, 10],
];

export default function Intelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0, 1, 1, 0]);
  const networkOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-20 md:py-40 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Glowing Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.03)_15%,transparent_40%,rgba(255,255,255,0.08)_60%,transparent_80%)] rounded-full blur-[100px] opacity-20"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] aspect-square bg-white/10 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* CSS-only Neural Network Visualization */}
      <motion.div
        style={mounted ? { opacity: networkOpacity } : { opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <svg
          viewBox="0 0 620 430"
          className="w-full max-w-3xl opacity-[0.08]"
          aria-hidden="true"
        >
          {EDGES.map(([from, to], i) => (
            <line
              key={i}
              x1={NODES[from].cx}
              y1={NODES[from].cy}
              x2={NODES[to].cx}
              y2={NODES[to].cy}
              stroke="white"
              strokeWidth="1"
              style={{
                animation: `pulse-glow ${2 + (i % 3) * 0.7}s ease-in-out infinite`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
          {NODES.map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={i === 10 ? 12 : 7}
              fill="white"
              style={{
                animation: `pulse-glow ${1.8 + (i % 4) * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </svg>
      </motion.div>

      <div className="w-full max-w-6xl relative z-10 flex flex-col items-center text-center">
        <motion.div style={mounted ? { y, opacity } : { opacity: 0 }} className="max-w-4xl">
          <div className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-6 md:mb-10">Neural Architecture</div>
          <h2 className="mb-6 md:mb-10">
            Intelligence <br/>beyond the cloud.
          </h2>
          <p className="text-base md:text-[2rem] leading-tight text-white/40 font-medium tracking-tighter text-balance max-w-2xl mx-auto mb-10 md:mb-12 px-4 md:px-0">
            Privacy-first emotional engine. Every neuron resides locally, protecting your physical world while enriching your digital one.
          </p>
        </motion.div>

        {/* Animated Spec Cards */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-12">
          {SPECS.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col items-center md:items-start hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group"
            >
              <span className="text-white/30 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-3 md:mb-4 group-hover:text-white/50 transition-colors">{spec.label}</span>
              <span className="text-white font-bold text-xl md:text-3xl tracking-tight leading-none text-center md:text-left">
                {spec.numericValue !== null ? (
                  <AnimatedCounter value={spec.numericValue} suffix={spec.suffix} />
                ) : (
                  spec.displayValue
                )}
              </span>
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
