"use client";

import { motion } from "framer-motion";
import { Moon, Eye, Zap, Smile } from "lucide-react";

const moods = [
  {
    name: "Sleepy",
    description: "During late-night coding, he might doze off. His eyes narrow, his breathing slows. He's there, but resting.",
    icon: <Moon className="w-6 h-6" />,
    color: "bg-blue-500/10",
    textColor: "text-blue-400"
  },
  {
    name: "Curious",
    description: "When you start typing, he looks up. He follows your movement, wondering what you're building today.",
    icon: <Eye className="w-6 h-6" />,
    color: "bg-purple-500/10",
    textColor: "text-purple-400"
  },
  {
    name: "Focused",
    description: "When you enter deep work, he syncs. No blinking. No distractions. Just pure presence until you're done.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-orange-500/10",
    textColor: "text-orange-400"
  },
  {
    name: "Joyful",
    description: "When you finish a task, he knows. A subtle wiggle, a happy face. He's proud of you.",
    icon: <Smile className="w-6 h-6" />,
    color: "bg-green-500/10",
    textColor: "text-green-400"
  }
];

export default function KubosMoods() {
  return (
    <section className="w-full py-24 md:py-48 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#86868b] font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
          >
            Not a machine. A mood.
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#1d1d1f] text-4xl md:text-6xl font-bold tracking-tighter mb-8"
          >
            Sometimes he’s sleepy.<br/>Sometimes he’s curious.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#86868b] text-xl md:text-2xl font-medium max-w-2xl mx-auto tracking-tight"
          >
            Kubo isn't programmed to be perfect. He's programmed to be alive. He reacts to your environment, your hours, and your flow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {moods.map((mood, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-[2.5rem] bg-[#f5f5f7] border border-transparent hover:border-black/5 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${mood.color} ${mood.textColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {mood.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-4 tracking-tight">{mood.name}</h3>
              <p className="text-[#86868b] text-sm leading-relaxed font-medium">{mood.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
