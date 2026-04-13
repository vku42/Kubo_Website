"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Smile, Brain, Heart, Zap, Clock, Shield, Sparkles } from "lucide-react";
import { playHoverSound } from "@/lib/audio";

const features = [
  {
    title: "100% Local Intelligence",
    description: "Kubo processes every expression and interaction locally on its ESP32-C3 core. Your privacy is hardware-locked.",
    icon: <Brain className="w-6 h-6 text-[#1d1d1f]" />,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Pure OLED Glass",
    description: "A 1.3\" deep-black display brings subtle kinetic life to your desk.",
    icon: <Sparkles className="w-6 h-6 text-[#1d1d1f]" />,
    span: "col-span-1",
  },
  {
    title: "Focus State Sync",
    description: "Integrated deep-work timers that fight distraction by reacting to your presence.",
    icon: <Zap className="w-6 h-6 text-[#1d1d1f]" />,
    span: "col-span-1",
  },
  {
    title: "Zero-Judgment Core",
    description: "A companion designed to listen and support, built with pure organic PLA+ materials.",
    icon: <Smile className="w-6 h-6 text-[#1d1d1f]" />,
    span: "col-span-1 md:col-span-2",
  },
];

function BentoCard({ feature, delay }: { feature: any; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={playHoverSound}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-10 bento-card flex flex-col group cursor-default overflow-hidden ${feature.span} min-h-[340px] shadow-[0_8px_32px_rgba(0,0,0,0.03)]`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 0, 0, 0.04),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-20 h-full flex flex-col">
        <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-black/5 transition-all duration-500 mb-8">
          <motion.div whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }} transition={{ duration: 0.5 }}>
            {feature.icon}
          </motion.div>
        </div>

        <div className="mt-auto">
          <h3 className="text-2xl font-bold mb-4 tracking-tighter text-[#1d1d1f] leading-tight">{feature.title}</h3>
          <p className="text-[#86868b] font-medium leading-relaxed text-lg max-w-[240px]">{feature.description}</p>
        </div>
      </div>

      {/* Polish: Bottom Corner Gradient */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-transparent to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="w-full py-24 md:py-48 px-6 flex flex-col items-center relative z-10">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col mb-16 md:mb-24 max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#86868b] font-bold tracking-widest text-xs uppercase mb-6"
          >
            Intelligence & Design
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className=""
          >
            Tiny cube. <br /> <span className="text-[#d2d2d7]">Massive personality.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <BentoCard key={i} feature={feature} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
