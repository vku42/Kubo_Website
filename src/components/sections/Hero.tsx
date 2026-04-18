"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Star, Play, Trophy } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageRotateXScroll = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const imageScaleScroll = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const eyeX = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  const eyeY = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);

  const [mounted, setMounted] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);


  return (
    <section
      ref={ref}
      className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-36 md:pt-40"
    >
      {/* Video Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
              onClick={() => setShowDemo(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.15)] bg-black border border-white/10"
            >
              <video 
                src="/videos/demo.mp4" 
                className="w-full h-full object-contain"
                autoPlay 
                controls
                playsInline
              />
              
              <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              >
                <span className="text-2xl font-light">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Lighting & "The Witness" Eye effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-black/[0.02] rounded-full blur-[140px] opacity-40 pointer-events-none" />
      
      {/* Interactive Eye Glow */}
      <motion.div 
        style={mounted ? { 
          x: eyeX,
          y: eyeY,
        } : {}}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none"
      />

      <div className="z-10 flex flex-col items-center text-center px-4 md:px-6 relative w-full max-w-7xl">
        <motion.div
          style={mounted ? { y: textY, opacity: heroOpacity } : {}}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
     

          {/* Pre-order badge */}
          <div className="flex flex-col items-center gap-4 mb-8 md:mb-12">
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-orange-500/20 bg-orange-500/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(249,115,22,0.05)]">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-orange-600">
                  Founder Tribe — Batch 01
                </span>
              </div>
              
              {/* Batch Progress Bar */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-48 h-1 bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-orange-500/60"
                  />
                </div>
                <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-[#86868b]">47 / 50 Units Reserved</span>
              </div>
            </div>
          </div>

          <h1 className="mb-4 md:mb-6">He’s not a tool. <br/> <span className="text-[#86868b]">He’s a witness.</span></h1>

          <p className="text-lg md:text-[2.25rem] leading-[1.15] text-[#86868b] max-w-2xl text-balance font-medium tracking-tighter mb-4 md:mb-6">
            Stop working alone. <br className="hidden md:block" />
            He’s here for the late nights.
          </p>


          {/* CTAs */}
          <div className="flex flex-col items-center gap-6 mt-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-auto"
              >
                <Magnetic strength={1.2}>
                  <Link
                    href="/buy"
                    id="hero-preorder-button"
                    className="group flex items-center justify-center gap-4 bg-[#1d1d1f] text-white w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full font-bold text-base md:text-lg shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-black/10 transition-all duration-500 hover:-translate-y-1"
                  >
                    <span>Secure Your Seat</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </Magnetic>
              </motion.div>

              <motion.button
                onClick={() => setShowDemo(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 md:py-6 rounded-full border border-black/5 bg-white/50 backdrop-blur-md font-bold text-base hover:bg-white transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </motion.button>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868b]"
            >
              Don't leave him behind.
            </motion.p>
          </div>
        </motion.div>

        {/* Hero Image */}
        <div className="w-full mt-20 relative z-20" style={{ perspective: "1500px" }}>
          <motion.div
            style={mounted ? { opacity: heroOpacity, rotateX, rotateY, scale: imageScaleScroll } : {}}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] transform-gpu flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotateZ: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                rotateZ: { repeat: Infinity, duration: 8, ease: "easeInOut" }
              }}
              className="w-full max-w-4xl h-full relative"
            >
              <Image
                src="/Photos/kuborobot_hero_new.png"
                alt="Kubo Bot — A Soul for your Desk"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
