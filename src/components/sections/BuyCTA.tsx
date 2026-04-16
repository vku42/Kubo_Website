"use client";

import Link from "next/link";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";
import { playHoverSound } from "@/lib/audio";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useCurrency from "@/hooks/useCurrency";
import CountdownTimer from "@/components/ui/CountdownTimer";
import TrustBadges from "@/components/ui/TrustBadges";
import { Eye } from "lucide-react";

// Batch closes end of July 2026
const BATCH_CLOSE_DATE = new Date("2026-07-31T23:59:59+05:30");

export default function BuyCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stock = useQuery(api.inventory.getStock) ?? 47;
  const { price, shipping } = useCurrency();

  // Simulated live viewer count (random between 8–22 in production you'd use a real-time source)
  const [viewers, setViewers] = useState(12);
  useEffect(() => {
    const randomize = () => setViewers(Math.floor(Math.random() * 15) + 8);
    const id = setInterval(randomize, 8000);
    return () => clearInterval(id);
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [2, -2]);
  const x = useTransform(scrollY, [0, 5000], [0, -1000]);

  return (
    <section
      ref={containerRef}
      className="w-full py-24 md:py-36 px-6 flex flex-col items-center bg-transparent relative overflow-hidden"
    >
      {/* Massive Velocity Marquee */}
      <motion.div
        style={mounted ? { skew, x } : { opacity: 0 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none select-none flex"
      >
        <span className="text-[20rem] font-bold tracking-tighter leading-none block">
          PRE-ORDER BATCH ONE PRE-ORDER BATCH ONE
        </span>
      </motion.div>

      <div className="w-full max-w-4xl bg-white border border-[#d2d2d7]/30 shadow-[0_40px_100px_rgba(0,0,0,0.06)] rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          {/* Live FOMO Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/5 bg-black/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#86868b] uppercase">
                Batch 01 — {stock} units left
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/5 bg-black/[0.02]">
              <Eye className="w-3.5 h-3.5 text-[#86868b]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#86868b] uppercase">
                {viewers} viewing now
              </span>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-balance">
              Ready for your <br /> true companion?
            </h2>
            <p className="text-xl md:text-[1.75rem] leading-tight text-[#86868b] font-medium tracking-tighter max-w-xl text-balance">
              Pre-order Kubo today.{" "}
              <br className="hidden md:block" />
              {shipping}.
            </p>
          </div>

          {/* Countdown */}
          <CountdownTimer targetDate={BATCH_CLOSE_DATE} label="Batch 01 closes in" />

          {/* CTA Button */}
          <Magnetic strength={1.2}>
            <Link
              href="/buy"
              id="cta-preorder-button"
              onMouseEnter={playHoverSound}
              className="group flex items-center justify-center gap-3 relative rounded-[2rem] bg-[#1d1d1f] text-white px-10 md:px-14 py-5 md:py-6 text-xl font-bold overflow-hidden shadow-[0_8px_20px_rgba(29,29,31,0.2)] hover:shadow-[0_16px_40px_rgba(29,29,31,0.3)] transition-all duration-300"
            >
              <span className="relative z-10 whitespace-nowrap">Pre-Order Now — {price}</span>
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </Magnetic>

          {/* Trust Badges */}
          <TrustBadges theme="light" />
        </motion.div>
      </div>
    </section>
  );
}
