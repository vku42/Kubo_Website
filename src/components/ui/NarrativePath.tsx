"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function NarrativePath() {
  const { scrollYProgress } = useScroll();
  const [docHeight, setDocHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateHeight = () => setDocHeight(document.documentElement.scrollHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 1]); // Keep visible for now
  const tipOffset = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  if (!mounted || docHeight === 0) return null;

  const pathD = `M 100 200 
             C 400 600, 800 800, 200 1500 
             S 900 2500, 150 3500 
             S 850 4500, 200 5500 
             S 900 7000, 500 8500 
             L 500 ${docHeight - 200}`;

  return (
    <div className="absolute top-0 left-0 w-full z-[1] pointer-events-none overflow-hidden" style={{ height: docHeight }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 1000 ${docHeight}`}
        preserveAspectRatio="none"
        className="opacity-50"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The Base Path (Very Faint) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(0,0,0,0.03)"
          strokeWidth="1"
        />

        {/* The Bold Narrative Path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#1d1d1f"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength, opacity }}
          className="drop-shadow-sm"
        />

        {/* The Traveling Tip (Solid and Professional) */}
        <motion.circle
          r="10"
          fill="#1d1d1f"
          style={{ 
            offsetPath: `path('${pathD}')`,
            offsetDistance: tipOffset,
            opacity
          }}
          className="shadow-xl"
        />
      </svg>
    </div>
  );
}
