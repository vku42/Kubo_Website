"use client";

import { motion } from "framer-motion";
import { Cpu, Wifi, Battery, Maximize } from "lucide-react";

export default function Specs() {
  const specs = [
    {
      category: "Dimensions & Build",
      icon: <Maximize className="w-5 h-5 text-[#1d1d1f]" />,
      items: [
        { label: "Precision Case", value: "50x50x50 mm" },
        { label: "Net Weight", value: "320g" },
        { label: "Structural Material", value: "Organic PLA+" },
        { label: "Finish", value: "Matte Slate / Pearl" },
      ]
    },
    {
      category: "Intelligence Core",
      icon: <Cpu className="w-5 h-5 text-[#1d1d1f]" />,
      items: [
        { label: "Neural Engine", value: "Xiao ESP32 C3" },
        { label: "Vision Processing", value: "Edge-only" },
        { label: "Interface", value: "1.3\" Deep OLED" },
        { label: "Flash Fabric", value: "4 MB Onboard" },
      ]
    },
    {
      category: "Connectivity",
      icon: <Wifi className="w-5 h-5 text-[#1d1d1f]" />,
      items: [
        { label: "Banded Wi-Fi", value: "2.4GHz / 802.11" },
        { label: "Sync Protocol", value: "Bluetooth 5.0" },
        { label: "Interface Port", value: "USB-C High Speed" },
        { label: "OS Support", value: "iOS 16+ / Android 13+" },
      ]
    },
    {
      category: "Power Profile",
      icon: <Battery className="w-5 h-5 text-[#1d1d1f]" />,
      items: [
        { label: "Energy Cell", value: "500 mAh" },
        { label: "Active Cycle", value: "5 Hours" },
        { label: "Idling State", value: "32 Hours" },
        { label: "Rapid Charge", value: "45 Mins to 100%" },
      ]
    }
  ];

  return (
    <section className="w-full py-24 md:py-48 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Visual Depth: Subtle Background Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-amberMain/5 rounded-full blur-[160px] pointer-events-none opacity-50" />
      
      <div className="w-full max-w-6xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-amberMain mb-6">Technical Specifications</div>
            <h2 className="mb-4">
              Precision meets <br/>personality.
            </h2>
          </div>
          <p className="text-lg md:text-xl text-[#86868b] font-medium tracking-tight max-w-xs leading-relaxed">
            Every millimeter is optimized for emotional intelligence and tactile delight.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 md:gap-y-16">
          {specs.map((group, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8 border-b border-black/5 pb-4">
                <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                  {group.icon}
                </div>
                <h3 className="text-sm font-bold text-[#1d1d1f] tracking-widest uppercase">{group.category}</h3>
              </div>
              <ul className="flex flex-col gap-5">
                {group.items.map((item, j) => (
                  <li key={j} className="flex flex-col">
                    <span className="text-[#86868b] text-xs font-bold uppercase tracking-widest mb-1">{item.label}</span>
                    <span className="text-[#1d1d1f] text-lg font-bold tracking-tight">{item.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
