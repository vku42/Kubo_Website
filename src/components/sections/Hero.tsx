"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0.2, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // 3D Perspective Transforms
  const imageRotateX = useTransform(scrollYProgress, [0, 0.4], [35, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-20">
      {/* Background Gradient Orbs - dynamic pulse */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-amberMain/20 rounded-full blur-[120px] opacity-40 pointer-events-none mix-blend-multiply" 
      />

      <div className="z-10 flex flex-col items-center text-center px-6 relative w-full max-w-5xl">
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <span className="w-2 h-2 rounded-full bg-amberMain animate-pulse" />
            <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">Pre-orders now open for Batch 01</span>
          </div>
          
          <h1 className="text-[5rem] md:text-[9rem] font-bold tracking-tighter leading-[0.85] text-[#1d1d1f] pb-4 blur-[0px] hover:blur-[2px] transition-all duration-700 cursor-default">
            Meet Kubo.
          </h1>
          <p className="mt-8 text-2xl md:text-[2rem] leading-[1.2] text-[#86868b] max-w-2xl text-balance font-medium tracking-tight">
            Your desk buddy. Keeps you productive. <br className="hidden md:block"/> Never judges. Always there.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <Magnetic strength={1.5}>
              <Link 
                href="#features" 
                className="group flex items-center justify-center gap-3 bg-[#1d1d1f] text-white px-10 py-5 rounded-full font-bold text-lg overflow-hidden relative shadow-[0_8px_32px_rgba(29,29,31,0.2)] transition-all duration-300"
              >
                <span className="relative z-10 block">Discover Kubo</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-amberMain via-amber-400 to-amberMain opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        <div className="w-full mt-24 md:mt-32 relative z-20" style={{ perspective: "1200px" }}>
          <motion.div
            style={{ 
              opacity: heroOpacity, 
              rotateX: imageRotateX, 
              scale: imageScale,
              y: imageY 
            }}
            initial={{ opacity: 0, rotateX: 45, y: 150, scale: 0.8 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] transform-gpu origin-bottom"
          >
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src="/Photos/hero_img_transparent.png"
                alt="Kubo Bot - Premium Desktop Companion"
                fill
                className="object-contain" // Use object-contain to ensure the full bot is visible without box borders
                priority
                quality={100}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
