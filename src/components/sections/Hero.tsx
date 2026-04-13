"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll Transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageRotateXScroll = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const imageScaleScroll = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);

  // 🛠️ Kinetic Mouse Perspective
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-36 md:pt-40">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-amberMain/5 rounded-full blur-[140px] opacity-40 pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center px-6 relative w-full max-w-7xl">
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.03)] border-white/40">
            <span className="w-2 h-2 rounded-full bg-amberMain animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1d1d1f]">Limited Batch 01 Available</span>
          </div>
          
          <h1 className="mb-8">
            Meet Kubo.
          </h1>
          <p className="text-xl md:text-[2.25rem] leading-[1.1] text-[#86868b] max-w-2xl text-balance font-medium tracking-tighter mb-12">
            The companion your desk has been waiting for. <br className="hidden md:block"/> Quietly productive. Deeply emotional.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic strength={1.2}>
              <Link 
                href="/buy" 
                className="group flex items-center justify-center gap-4 bg-[#1d1d1f] text-white px-10 md:px-12 py-5 md:py-6 rounded-full font-bold text-base md:text-lg shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-amberMain/20 transition-all duration-500 hover:-translate-y-1"
              >
                <span>Pre-Order Batch 01</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        <div className="w-full mt-24 relative z-20" style={{ perspective: "1500px" }}>
          <motion.div
            style={{ 
              opacity: heroOpacity, 
              rotateX: rotateX,
              rotateY: rotateY,
              scale: imageScaleScroll,
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] transform-gpu flex items-center justify-center"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full max-w-4xl h-full relative"
            >
              <Image
                src="/Photos/heroimg.png"
                alt="Kubo Bot"
                fill
                priority
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)] scale-110 md:scale-100"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
