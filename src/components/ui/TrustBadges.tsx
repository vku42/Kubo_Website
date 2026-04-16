"use client";

import { Shield, Truck, RotateCcw, Lock, Award } from "lucide-react";

const badges = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "14-Day Returns" },
  { icon: Lock, label: "Privacy First" },
  { icon: Award, label: "Made in India" },
];

export default function TrustBadges({ theme = "light" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      {badges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <div
            key={i}
            className={`flex items-center gap-2 text-[11px] font-semibold tracking-wide ${
              isDark ? "text-white/40" : "text-[#86868b]"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${isDark ? "text-white/20" : "text-black/20"}`}
              strokeWidth={2.5}
            />
            <span>{badge.label}</span>
          </div>
        );
      })}
    </div>
  );
}
