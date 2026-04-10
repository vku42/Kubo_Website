"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Smile, Brain, Heart, Zap, Clock, Shield } from "lucide-react";
import { playHoverSound } from "@/lib/audio";

const features = [
  {
    title: "Overcome Aloneness",
    description: "Kubo is always there, providing a comforting presence during long work sessions.",
    icon: <Heart className="w-6 h-6 text-amberMain" />,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Boost Productivity",
    description: "Built-in focus timers and gentle nudges keep you in the flow state.",
    icon: <Zap className="w-6 h-6 text-amberMain" />,
    span: "col-span-1",
  },
  {
    title: "Zero Judgment",
    description: "Express your struggles. Kubo listens and supports without any conditions.",
    icon: <Shield className="w-6 h-6 text-amberMain" />,
    span: "col-span-1",
  },
  {
    title: "Your Desk Alive",
    description: "Interactive micro-movements and expressions make your workspace feel organic and warm.",
    icon: <Smile className="w-6 h-6 text-amberMain" />,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Grow Together",
    description: "Adapts to your work habits and learns how to best assist you over time.",
    icon: <Brain className="w-6 h-6 text-amberMain" />,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Always Present",
    description: "Sitting quietly on your desk, waiting for when you need a moment of interaction.",
    icon: <Clock className="w-6 h-6 text-amberMain" />,
    span: "col-span-1",
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
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-10 bento-card flex flex-col justify-between group cursor-default overflow-hidden ${feature.span}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 158, 11, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-overlay z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.8),
              transparent 40%
            )
          `,
        }}
      />
      <div className="w-14 h-14 rounded-[1.25rem] bg-[#f5f5f7] flex items-center justify-center group-hover:scale-105 group-hover:bg-amberMain/10 transition-all duration-300 relative z-20 shadow-[inset_0_1px_rgba(255,255,255,1)]">
        <motion.div whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }} transition={{ duration: 0.5 }}>
          {feature.icon}
        </motion.div>
      </div>
      <div className="relative z-20 mt-12">
        <h3 className="text-[1.35rem] font-bold mb-3 tracking-tight text-[#1d1d1f]">{feature.title}</h3>
        <p className="text-[#86868b] font-medium leading-relaxed text-[1.05rem] md:max-w-md">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="w-full py-24 md:py-40 px-6 flex flex-col items-center relative z-10 bg-transparent">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-[4rem] font-bold tracking-tighter leading-[1.1] text-[#1d1d1f]">
            More than just plastics.
            <br /> <span className="text-[#86868b]">A true companion.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {features.map((feature, i) => (
            <BentoCard key={i} feature={feature} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
