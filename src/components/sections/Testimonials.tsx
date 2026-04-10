"use client";

import { motion } from "framer-motion";

const testimonials = [
  { name: "Alex P.", role: "Developer", text: "Having Kubo on my desk totally changed my late-night coding sessions. It actually feels less lonely." },
  { name: "Sarah K.", role: "Designer", text: "The focus feature is incredible. When Kubo looks busy, I know it's time to put my head down." },
  { name: "James T.", role: "Writer", text: "A physical presence without a screen. It's calming and grounding." },
  { name: "Mia L.", role: "Student", text: "I love the zero-judgment aspect. Just having a companion during exams helped tremendously." }
];

export default function Testimonials() {
  return (
    <section className="w-full py-32 bg-transparent flex flex-col items-center overflow-hidden border-t border-[#d2d2d7]/30">
      <div className="text-center mb-16">
        <h2 className="text-[3rem] font-bold tracking-tighter mb-4 text-[#1d1d1f]">Loved by early adopters.</h2>
        <p className="text-xl text-[#86868b] font-medium tracking-tight">Don't just take our word for it.</p>
      </div>

      <div className="relative w-full max-w-7xl flex flex-col items-center">
        {/* Marquee row 1 */}
        <div className="flex gap-8 w-max animate-[marquee_30s_linear_infinite] px-4">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[380px] p-10 bento-card select-none">
              <p className="text-[1.1rem] font-medium mb-8 leading-relaxed text-[#1d1d1f]">"{t.text}"</p>
              <div>
                <p className="font-bold text-[#1d1d1f] tracking-tight">{t.name}</p>
                <p className="text-sm text-[#86868b] font-medium">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add custom CSS animation for the marquee in a style block or tailwind */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
