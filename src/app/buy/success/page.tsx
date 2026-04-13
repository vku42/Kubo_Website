"use client";

import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Mail, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "CONFIRMED";

  useEffect(() => {
    localStorage.removeItem("pending_order_id");
    localStorage.removeItem("checkout_step");
    localStorage.removeItem("checkout_form");
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8"
      >
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6 text-[#1d1d1f]"
      >
        Welcome to the Family!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-[#86868b] text-center max-w-xl mb-12 font-medium"
      >
        Your Kubo Bot pre-order has been successfully placed. Your unit is now reserved in Batch 01.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-8 rounded-[2.5rem] border border-white/40 flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-black/40" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#86868b] uppercase tracking-widest">Order ID</p>
              <p className="font-bold text-lg text-[#1d1d1f] break-all">{orderId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#86868b] uppercase tracking-widest">Confirmation Sent</p>
              <p className="font-bold text-lg text-[#1d1d1f]">Check your inbox shortly</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1d1d1f] p-8 rounded-[2.5rem] text-white flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              Next Steps <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            </h3>
            <p className="text-white/60 font-medium text-sm leading-relaxed">
              We'll send you a series of production updates as we assemble Batch 01. Look out for your exclusive "Owner's Guide" PDF arriving next week.
            </p>
          </div>
          
          <Link 
            href="/"
            className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-2xl mt-6 group"
          >
            <span className="font-bold text-sm">Return to Home</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full relative aspect-[21/9] rounded-[3rem] overflow-hidden glass-panel border border-white/40 shadow-2xl"
      >
        <Image 
          src="/Photos/img1.jpg" 
          alt="Kubo Bot" 
          fill 
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover opacity-80"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
          <p className="text-white font-medium text-lg italic italic">"Thanks for picking me up. See you soon!" — Kubo</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold animate-pulse">Loading Success Details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
