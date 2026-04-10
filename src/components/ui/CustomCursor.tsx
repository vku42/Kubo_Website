"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Apple-like spring configuration for the cursor chase
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device (we only want custom cursors on desktop pointers)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10); // Offset by half width
      cursorY.set(e.clientY - 10); // Offset by half height
    };

    window.addEventListener("mousemove", moveCursor);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
      className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference"
    />
  );
}
