"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

function StatItem({ label, value, suffix = "", prefix = "", delay = 0 }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      let totalMiliseconds = 1500;
      let incrementTime = totalMiliseconds / end;

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, Math.max(incrementTime, 16));

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay }}
        className="text-2xl md:text-3xl font-bold tracking-tighter text-[#1d1d1f]"
      >
        {prefix}{count}{suffix}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-[10px] font-bold uppercase tracking-widest mt-1"
      >
        {label}
      </motion.span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-24 py-6 md:py-8 border-y border-black/5 w-full max-w-2xl mx-auto mt-8 md:mt-12 mb-4 md:mb-6">
      <StatItem label="Pre-orders" value={47} suffix="+" delay={0.1} />
      <StatItem label="Early Rating" value={4} suffix=".9" prefix="⭐" delay={0.2} />
      <StatItem label="Days Left" value={14} delay={0.3} />
    </div>
  );
}
