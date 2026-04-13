"use client";

import { motion } from "framer-motion";

const testimonials = [
  { name: "Arjun M.", role: "Developer", text: "Having Kubo on my desk totally changed my late-night coding sessions. It actually feels less lonely." },
  { name: "Ananya S.", role: "Designer", text: "The focus feature is incredible. When Kubo looks busy, I know it's time to put my head down." },
  { name: "Rohan V.", role: "Writer", text: "A physical presence without a screen. It's calming and grounding." },
  { name: "Ishita K.", role: "Student", text: "I love the zero-judgment aspect. Just having a companion during exams helped tremendously." }
];

export default function Testimonials() {
  return (
    <section className="w-full py-32 md:py-48 bg-transparent flex flex-col items-center overflow-hidden border-t border-[#d2d2d7]/30 relative">
      <div className="text-center mb-24 px-6">
        <h2 className="mb-4">Loved by early adopters.</h2>
        <p className="text-xl md:text-2xl text-[#86868b] font-medium tracking-tight">Don't just take our word for it.</p>
      </div>

      <div className="relative w-full max-w-7xl flex flex-col items-center">
        {/* Masking Gradient for Premium Fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee row 1 */}
        <div className="flex gap-6 w-max animate-[marquee_40s_linear_infinite] px-4">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[320px] md:w-[420px] p-10 md:p-12 bento-card select-none flex flex-col justify-between min-h-[280px]">
              <p className="text-lg md:text-xl font-medium mb-12 leading-relaxed text-[#1d1d1f] tracking-tight italic">"{t.text}"</p>
              <div>
                <p className="font-bold text-[#1d1d1f] tracking-tight uppercase text-xs mb-1 tracking-[0.1em]">{t.role}</p>
                <p className="text-xl font-bold text-[#1d1d1f] tracking-tighter">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --background: #fbfbfd; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </section>
  );
}
