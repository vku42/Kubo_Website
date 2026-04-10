"use client";

import { motion } from "framer-motion";
import CelestialBackground from "@/components/ui/CelestialBackground";
import { Coffee, Brain, Timer } from "lucide-react";

export default function FocusShowcase() {
  const personas = [
    { name: "Freelancer", code: "F", focus: "20m", coach: "INTR Building streak" },
    { name: "Founder", code: "Fo", focus: "25m", coach: "DESR Build flow" },
    { name: "Creator", code: "C", focus: "20m", coach: "ACTN Finish strong" },
  ];

  return (
    <section className="w-full py-32 md:py-48 px-6 bg-[#0a0a0b] relative overflow-hidden border-b border-white/5">
      <CelestialBackground />

      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-amberMain mb-6 block">Deep Productivity</span>
          <h2 className="text-5xl md:text-[5rem] font-bold tracking-tighter text-white leading-none mb-8">
            Focus Mode.<br/>Celestial Efficiency.
          </h2>
          <p className="text-xl md:text-2xl text-white/40 font-medium tracking-tight max-w-2xl mx-auto">
            Inspired by space and time, Kubo uses the movement of the stars to guide your focus sprints.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 flex flex-col items-center group hover:bg-white/10 transition duration-500"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                <span className="text-2xl font-bold text-amberMain">{p.code}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
              <div className="flex items-center gap-2 mb-8 uppercase text-[10px] font-bold tracking-widest text-white/30">
                <Timer className="w-3 h-3" />
                {p.focus} Sprint
              </div>
              
              <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/5 text-center">
                 <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2 block">AIDA Coach</span>
                 <p className="text-white/80 font-medium italic tracking-tight">{p.coach}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Demo Trigger */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 flex flex-col items-center gap-6"
        >
          <div className="p-4 bg-white/5 rounded-full border border-white/10 flex items-center gap-3">
             <div className="w-2 h-2 bg-amberMain rounded-full animate-pulse shadow-[0_0_8px_#F59E0B]" />
             <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Live Focus Session Active</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
