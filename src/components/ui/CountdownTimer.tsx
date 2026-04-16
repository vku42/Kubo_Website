"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
  label?: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({ targetDate, label = "Batch 01 closes in" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868b]">{label}</p>
      <div className="flex items-center gap-2">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-[#1d1d1f] text-white rounded-2xl flex items-center justify-center text-xl font-bold tracking-tighter tabular-nums shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                {pad(u.value)}
              </div>
              <span className="text-[9px] font-bold text-[#86868b] uppercase tracking-widest mt-1.5">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-[#86868b] font-bold text-lg mb-4 select-none">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
