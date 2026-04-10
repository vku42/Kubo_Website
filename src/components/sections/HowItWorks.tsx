"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HowItWorks() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full bg-transparent">
      {/* Scroll Hint for Mobile */}
      <div className="absolute top-[12vh] left-1/2 -translate-x-1/2 z-20 md:hidden flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs font-bold tracking-[0.2em] uppercase">Scroll to learn</span>
        <div className="w-[1px] h-8 bg-black/20" />
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
          
          {/* Step 1 */}
          <div className="w-screen h-full flex flex-col items-center justify-center px-12 md:px-24 pt-24 pb-12">
            <h2 className="text-4xl md:text-[4rem] font-bold tracking-tighter text-[#1d1d1f] mb-8 text-center leading-[1.1]">
              Plug it in. <br/><span className="text-[#86868b]">Say Hello.</span>
            </h2>
            <div className="w-full max-w-4xl max-h-[55vh] aspect-video relative rounded-[2.5rem] overflow-hidden glass-panel flex items-center justify-center">
                 <p className="text-amberMain font-bold text-2xl tracking-widest uppercase">Step 1</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="w-screen h-full flex flex-col items-center justify-center px-12 md:px-24 pt-24 pb-12">
            <h2 className="text-4xl md:text-[4rem] font-bold tracking-tighter text-[#1d1d1f] mb-8 text-center leading-[1.1]">
              Focus mode. <br/><span className="text-[#86868b]">Zero Distractions.</span>
            </h2>
            <div className="w-full max-w-4xl max-h-[55vh] aspect-video relative rounded-[2.5rem] overflow-hidden glass-panel flex items-center justify-center">
                 <p className="text-black/30 font-bold text-2xl tracking-widest uppercase">Step 2</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="w-screen h-full flex flex-col items-center justify-center px-12 md:px-24 pt-24 pb-12">
            <h2 className="text-4xl md:text-[4rem] font-bold tracking-tighter text-[#1d1d1f] mb-8 text-center leading-[1.1]">
              Grow together. <br/><span className="text-[#86868b]">Every single day.</span>
            </h2>
            <div className="w-full max-w-4xl max-h-[55vh] aspect-video relative rounded-[2.5rem] overflow-hidden glass-panel flex items-center justify-center bg-[#f5f5f7]">
                 <p className="text-amberMain font-bold text-2xl tracking-widest uppercase absolute z-10">Step 3</p>
               <Image src="/Photos/img2.jpg" alt="Kubo" fill className="object-cover opacity-90 scale-[1.02]" />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
