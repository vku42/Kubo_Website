"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun M.",
    role: "Developer",
    avatar: "AM",
    avatarBg: "from-blue-500 to-indigo-600",
    rating: 5,
    text: "Having Kubo on my desk totally changed my late-night coding sessions. It actually feels less lonely.",
  },
  {
    name: "Ananya S.",
    role: "Designer",
    avatar: "AS",
    avatarBg: "from-rose-400 to-pink-600",
    rating: 5,
    text: "The focus feature is incredible. When Kubo looks busy, I know it's time to put my head down.",
  },
  {
    name: "Rohan V.",
    role: "Writer",
    avatar: "RV",
    avatarBg: "from-emerald-400 to-teal-600",
    rating: 5,
    text: "A physical presence without a screen. It's calming and grounding.",
  },
  {
    name: "Ishita K.",
    role: "Student",
    avatar: "IK",
    avatarBg: "from-violet-400 to-purple-600",
    rating: 5,
    text: "I love the zero-judgment aspect. Just having a companion during exams helped tremendously.",
  },
  {
    name: "Priya D.",
    role: "Startup Founder",
    avatar: "PD",
    avatarBg: "from-amber-400 to-orange-500",
    rating: 5,
    text: "This is the desk accessory I didn't know I needed. Kubo keeps me grounded during crazy days.",
  },
  {
    name: "Karan T.",
    role: "Data Scientist",
    avatar: "KT",
    avatarBg: "from-cyan-400 to-sky-600",
    rating: 5,
    text: "The battery life is insane. 32 hours and I barely notice it's there — until I need it.",
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="w-[340px] md:w-[420px] p-9 md:p-10 bento-card select-none flex flex-col justify-between min-h-[260px] flex-shrink-0">
      <div>
        {/* Stars */}
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#1d1d1f] text-[#1d1d1f]" />
          ))}
        </div>
        <p className="text-base md:text-lg font-medium mb-8 leading-relaxed text-[#1d1d1f] tracking-tight">
          &ldquo;{t.text}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-[10px] font-bold text-white tracking-tight">{t.avatar}</span>
        </div>
        <div>
          <p className="font-bold text-[#1d1d1f] tracking-tight text-sm leading-none mb-1">{t.name}</p>
          <p className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const row1 = [...testimonials, ...testimonials, ...testimonials];
  const row2 = [...testimonials.slice(3), ...testimonials, ...testimonials];

  return (
    <section
      className="w-full py-32 md:py-48 bg-transparent flex flex-col items-center overflow-hidden border-t border-[#d2d2d7]/30 relative gap-6"
      aria-label="Customer testimonials"
    >
      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-1.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#1d1d1f] text-[#1d1d1f]" />
            ))}
          </div>
          <h2 className="mb-4">Loved by early adopters.</h2>
         
        </motion.div>
      </div>

      {/* Row 1 — Left to Right */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-5 w-max animate-[marquee_40s_linear_infinite] px-4">
          {row1.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — Right to Left */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-5 w-max animate-[marquee-reverse_45s_linear_infinite] px-4">
          {row2.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        :root { --background: #fbfbfd; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}} />
    </section>
  );
}
