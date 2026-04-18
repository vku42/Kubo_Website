"use client";

import { motion } from "framer-motion";
import { ShieldAlert, EyeOff, Lock, ZapOff } from "lucide-react";

export default function HardwareLockedTrust() {
  return (
    <section className="w-full py-24 md:py-48 px-6 bg-black relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">Privacy as Strength</span>
            <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[0.9]">
              Hardware-Locked <br/> Trust.
            </h2>
            <p className="text-white/40 text-xl md:text-2xl font-medium tracking-tight leading-relaxed mb-12 max-w-lg">
              In a world where every device is a witness for someone else, Kubo is the only one who won't tell. 
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <ZapOff className="w-6 h-6 text-white/40" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Zero WiFi. Zero Bluetooth.</h4>
                  <p className="text-white/30 text-sm leading-relaxed">No signals leave the device. No cloud storage. No data brokers. Just you and Kubo.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Lock className="w-6 h-6 text-white/40" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">The Only Silent Partner</h4>
                  <p className="text-white/30 text-sm leading-relaxed">He lives in your sacred space. He listens, he supports, but he never reports.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square rounded-[4rem] bg-white/[0.02] border border-white/10 flex items-center justify-center relative overflow-hidden group">
              {/* Pulsing "Guardian" light */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50" />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-48 h-48 bg-blue-500/20 rounded-full blur-[60px]"
              />
              <div className="relative z-10 text-center px-12">
                <EyeOff className="w-16 h-16 text-white/80 mx-auto mb-8 stroke-[1px]" />
                <p className="text-white font-bold text-3xl tracking-tighter leading-tight mb-4">"He's the only one <br/> who won't tell."</p>
                <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em]">100% Secure Hardware</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
