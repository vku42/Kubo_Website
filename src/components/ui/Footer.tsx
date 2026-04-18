"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ArrowRight, CheckCircle2, ChevronUp, Camera, X } from "lucide-react";

function BackToTop() {
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-[#1d1d1f] hover:border-[#1d1d1f] hover:text-white text-[#86868b] transition-all duration-300 group shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
    >
      <ChevronUp className="w-4 h-4 group-hover:text-white transition-colors" />
    </button>
  );
}

export default function Footer() {
  const subscribe = useMutation(api.newsletter.subscribe);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    
    try {
      await subscribe({ email });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("idle");
    }
  };

  return (
    <footer className="w-full bg-[#fcfcfc] border-t border-[#d2d2d7]/30 pt-24 pb-12 flex flex-col items-center relative">
      <div className="w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4">Stay in the loop.</h3>
          <p className="text-[#86868b] mb-8 max-w-sm">Get notified about firmware updates, new expressions, and production batches for Kubo.</p>
          
          <form onSubmit={handleSubscribe} className="relative max-w-sm">
            <input 
              type="email" 
              placeholder="Enter your email" 
              aria-label="Newsletter Subscription Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status !== "idle"}
              className="w-full bg-[#f5f5f7] border border-black/5 rounded-full px-6 py-4 outline-none focus:ring-2 ring-black/10 transition-all text-[#1d1d1f]"
              required
            />
            <button 
              type="submit" 
              aria-label="Subscribe to newsletter"
              disabled={status !== "idle"}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1d1d1f] text-white rounded-full flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50"
            >
              {status === "success" ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
          {status === "success" && <p className="text-green-600 text-sm mt-3 font-medium">Thanks for subscribing!</p>}

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-8">
            <a
              href="https://www.instagram.com/thekubobot/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kubo Bot on Instagram"
              className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] hover:border-black/20 hover:bg-black/[0.03] transition-all"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/thekubobot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kubo Bot on Twitter / X"
              className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] hover:border-black/20 hover:bg-black/[0.03] transition-all"
            >
              <X className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@kubobot.com"
              aria-label="Email Kubo Bot"
              className="text-[11px] font-semibold text-[#86868b] hover:text-[#1d1d1f] transition-colors tracking-wide ml-1"
            >
              hello@kubobot.com
            </a>
          </div>
        </div>

        <div className="flex gap-16 md:justify-end">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#1d1d1f]">Product</h4>
            <Link href="/" className="text-[#86868b] hover:text-[#1d1d1f] transition">Overview</Link>
            <Link href="#features" className="text-[#86868b] hover:text-[#1d1d1f] transition">Features</Link>
            <Link href="/support" className="text-[#86868b] hover:text-[#1d1d1f] transition">Support & Feedback</Link>
            <Link href="/buy" className="text-[#86868b] hover:text-[#1d1d1f] transition">Pre-Order</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#1d1d1f]">Legal</h4>
            <Link href="/terms" className="text-[#86868b] hover:text-[#1d1d1f] transition">Terms</Link>
            <Link href="/privacy" className="text-[#86868b] hover:text-[#1d1d1f] transition">Privacy</Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl px-6 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-black/5">
        <span className="font-bold text-xl tracking-tighter text-[#1d1d1f]">Kubo.</span>
        <span className="text-sm text-[#86868b] font-medium text-center">
          © {new Date().getFullYear()} Vehon Infotech. All rights reserved. · Built with ❤️ in India 🇮🇳
        </span>
        <BackToTop />
      </div>
    </footer>
  );
}
