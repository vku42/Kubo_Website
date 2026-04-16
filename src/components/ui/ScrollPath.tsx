import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollPath() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();
  
  // Smooth out the progress bar for a high-end feel
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!mounted) return null;

  return (
    <div className="fixed left-4 md:left-12 top-0 bottom-0 w-[1px] bg-black/5 z-[40] pointer-events-none">
      {/* Background Line */}
      <div className="absolute inset-0 w-full h-full" />
      
      {/* Animated Progress Line */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute top-0 left-0 w-full h-full bg-[#1d1d1f]/20 shadow-[0_0_10px_rgba(0,0,0,0.05)]"
      />

      {/* Narrative Milestone Dots */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-black/10 bg-white" />
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-black/10 bg-white" />
      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-black/10 bg-white" />
    </div>
  );
}
