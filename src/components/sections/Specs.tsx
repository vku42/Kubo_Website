"use client";

import { motion } from "framer-motion";
import { Cpu, Wifi, Battery, Maximize } from "lucide-react";

export default function Specs() {
  const specs = [
    {
      category: "Dimensions & Build",
      icon: <Maximize className="w-6 h-6 text-[#1d1d1f]" />,
      items: [
        { label: "Height", value: "142 mm" },
        { label: "Width", value: "98 mm" },
        { label: "Weight", value: "320 grams" },
        { label: "Materials", value: "Recycled Aluminum & Matte Polycarbonate" },
      ]
    },
    {
      category: "Intelligence Core",
      icon: <Cpu className="w-6 h-6 text-[#1d1d1f]" />,
      items: [
        { label: "Processor", value: "Neural ESP-32 Dual Core" },
        { label: "Models", value: "On-device LLM (Local Execution)" },
        { label: "Memory", value: "2GB LPDDR4" },
        { label: "Storage", value: "16GB eMMC" },
      ]
    },
    {
      category: "Connectivity",
      icon: <Wifi className="w-6 h-6 text-[#1d1d1f]" />,
      items: [
        { label: "Wireless", value: "Wi-Fi 6 (802.11ax)" },
        { label: "Bluetooth", value: "Bluetooth 5.3" },
        { label: "Port", value: "USB-C (PD Fast Charging)" },
        { label: "App", value: "iOS 16+ & Android 13+" },
      ]
    },
    {
      category: "Power & Battery",
      icon: <Battery className="w-6 h-6 text-[#1d1d1f]" />,
      items: [
        { label: "Capacity", value: "3200 mAh" },
        { label: "Active Life", value: "Up to 14 hours" },
        { label: "Standby", value: "Up to 32 hours" },
        { label: "Charge Time", value: "0-100% in 45 mins" },
      ]
    }
  ];

  return (
    <section className="w-full py-24 md:py-32 px-6 flex flex-col items-center bg-[#fafafc] relative border-t border-[#d2d2d7]/30">
      <div className="w-full max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mb-16"
        >
          <div className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#86868b] mb-4">Mathematical Precision</div>
          <h2 className="text-4xl md:text-[3.5rem] font-bold tracking-tighter text-[#1d1d1f] leading-tight mb-8">
            Engineered down <br/>to the millimeter.
          </h2>
          <p className="text-lg md:text-xl text-[#86868b] font-medium tracking-tight max-w-xl">
            Kubo isn't just a toy. It's a high-performance companion built with the same rigorous tolerances as aerospace components.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {specs.map((group, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6 border-b border-[#d2d2d7]/50 pb-4">
                {group.icon}
                <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">{group.category}</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {group.items.map((item, j) => (
                  <li key={j} className="flex justify-between items-center text-[1.05rem]">
                    <span className="text-[#86868b] font-medium">{item.label}</span>
                    <span className="text-[#1d1d1f] font-semibold">{item.value}</span>
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
