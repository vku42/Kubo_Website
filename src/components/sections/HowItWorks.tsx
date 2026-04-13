"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Instant Connection.",
    accent: "Say Hello.",
    image: "/Photos/test1.jpeg",
    desc: "Seamless setup. Plug into power and Kubo wakes up instantly to meet its new owner."
  },
  {
    number: "02",
    title: "Deep Focus.",
    accent: "Zero Distractions.",
    image: "/Photos/test2.jpeg",
    desc: "Activate focus mode with a single tap. Kubo manages your environment, blocking distractions."
  },
  {
    number: "03",
    title: "Emotional Synergy.",
    accent: "Grow Daily.",
    image: "/Photos/test3.jpeg",
    desc: "The more you interact, the more Kubo learns your rhythms, becoming a true partner in your desk life."
  }
];

export default function HowItWorks() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full bg-transparent overflow-clip">
      {/* Visual Depth: Moving Light Leak */}
      <motion.div 
        style={{ translateX: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-transparent via-amberMain/5 to-transparent pointer-events-none z-0"
      />

      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
          {steps.map((step, i) => (
            <div key={i} className="w-screen h-full flex flex-col items-center justify-center px-6 md:px-24 pt-20 md:pt-32 pb-12 relative">
              <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 md:gap-24">
                
                {/* Text Content */}
                <div className="flex-1 flex flex-col text-center md:text-left">
                  <div className="flex items-center gap-4 mb-6 md:mb-8 justify-center md:justify-start">
                     <span className="text-amberMain font-bold text-lg tracking-[0.2em]">{step.number}</span>
                     <div className="w-12 h-px bg-black/10" />
                  </div>
                  <h2 className="mb-6 md:mb-8">
                    {step.title} <br/><span className="text-[#d2d2d7]">{step.accent}</span>
                  </h2>
                  <p className="text-lg md:text-2xl text-[#86868b] font-medium tracking-tighter leading-tight max-w-md mx-auto md:mx-0">
                    {step.desc}
                  </p>
                </div>

                {/* Image Showcase */}
                <div className="flex-1 w-full max-w-2xl">
                  <div className="w-full aspect-[4/3] relative rounded-[3rem] overflow-hidden glass-panel shadow-[0_40px_100px_rgba(0,0,0,0.1)] group">
                    <Image 
                      src={step.image} 
                      alt={step.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
