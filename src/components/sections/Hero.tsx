"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Star, Play, Trophy } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import StatsBar from "@/components/ui/StatsBar";

const TICKER_ITEMS = [
  "47 Pre-orders placed",
  "⭐ 4.9 Early Rating",
  "🇮🇳 Made in India",
  "100% Offline AI",
  "Batch 01 — Limited to 50 units",
  "Ships Q3 2026",
  "₹2,999 — No subscription",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageRotateXScroll = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const imageScaleScroll = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Duplicate items for seamless loop
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-36 md:pt-40"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-black/[0.02] rounded-full blur-[140px] opacity-40 pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center px-4 md:px-6 relative w-full max-w-7xl">
        <motion.div
          style={mounted ? { y: textY, opacity: heroOpacity } : {}}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
     

          {/* Pre-order badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl mb-8 md:mb-10 shadow-[0_8px_32px_rgba(0,0,0,0.03)] border-white/40">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-[#1d1d1f]">
              Limited Batch 01 — Pre-Order Open
            </span>
          </div>

          <h1 className="mb-4 md:mb-6">Tiny cube. <br/> <span className="text-[#86868b]">Massive personality.</span></h1>

          <p className="text-lg md:text-[2.25rem] leading-[1.15] text-[#86868b] max-w-2xl text-balance font-medium tracking-tighter mb-4 md:mb-6">
            The companion your desk has been waiting for. <br className="hidden md:block" />
            Built in India. 100% Offline. Zero judgment.
          </p>

          <StatsBar />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-6">
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
                  <span>Pre-Order Batch 01</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </Magnetic>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 rounded-full border border-black/5 bg-white/50 backdrop-blur-md font-bold text-base hover:bg-white transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <Play className="w-3 h-3 ml-0.5" />
              </div>
              <span>Watch 60s Demo</span>
            </motion.button>
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
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full max-w-4xl h-full relative"
            >
              <Image
                src="/Photos/heroimg.png"
                alt="Kubo Bot — AI Desktop Companion Robot with OLED display"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)] scale-110 md:scale-100"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <motion.div
        style={mounted ? { opacity: heroOpacity } : { opacity: 1 }}
        className="w-full mt-10 overflow-hidden border-t border-b border-black/5 py-4 relative"
      >
        <div className="flex gap-12 w-max animate-[ticker_25s_linear_infinite]">
          {tickerContent.map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868b] whitespace-nowrap flex-shrink-0"
            >
              {item}
              <span className="ml-12 text-black/10">◆</span>
            </span>
          ))}
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
