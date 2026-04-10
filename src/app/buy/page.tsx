"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Shield, Truck, RotateCcw, ChevronDown, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useCurrency from "@/hooks/useCurrency";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const faqs = [
  { q: "When will my Kubo ship?", a: "Batch 01 is currently in production. We expect to begin fulfilling pre-orders by late Q3 2026. You will receive an email update when your unit is ready to ship." },
  { q: "Is there a monthly subscription?", a: "No. The AI models run completely locally on the device's ESP-32 chip. You pay once for the hardware, and all core emotional support and productivity features are yours forever." },
  { q: "Do you ship internationally?", a: "Currently, we only ship within India. We are working hard to establish international logistics and will announce global availability soon." }
];

export default function BuyPage() {
  const [step, setStep] = useState(0); // 0: Product, 1: Form, 2: Redirecting
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const stock = useQuery(api.inventory.getStock) ?? 47;
  const { price, shipping } = useCurrency();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Trigger Checkout API with lead data
      const res = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           name: formData.name,
           email: formData.email,
           phone: formData.phone,
           address: formData.address // Capturing address as well
        })
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.url === "") {
        // Mock success for development
        alert("Development Mode: Payment gateway keys not set. Data captured successfully!\n\nName: " + formData.name + "\nEmail: " + formData.email);
        setLoading(false);
        setStep(0);
      } else {
        alert("Payment gateway redirect failed: " + (data.error || "Unknown error"));
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Product Gallery (Stays visible or adapts) */}
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full aspect-square relative rounded-[3rem] overflow-hidden glass-panel border border-white/40 shadow-[0_32px_80px_rgba(0,0,0,0.06)]"
          >
            <Image src="/Photos/img1.jpg" alt="Kubo Bot Main" fill className="object-cover" priority />
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden glass-panel border border-white/40">
              <Image src="/Photos/img2.jpg" alt="Kubo Bot Detail" fill className="object-cover" />
            </div>
            <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden glass-panel bg-amberMain/5 flex items-center justify-center border border-amberMain/20">
              <p className="font-bold text-amberMain tracking-widest text-xs uppercase text-center px-4">Limited Edition <br/>Batch 01</p>
            </div>
          </div>
        </div>

        {/* Right: Steps Container */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div 
                key="product"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col pt-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 mb-4 self-start">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    <span className="text-xs font-bold tracking-widest text-red-600 uppercase">Only {stock} units left</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-[#1d1d1f]">Kubo Bot</h1>
                <p className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                  {price} <span className="text-sm font-medium text-[#86868b] ml-2">incl. all taxes</span>
                </p>

                <p className="text-xl text-balance mb-8 font-medium text-[#86868b] leading-relaxed">
                  Your premium desktop companion. Keeps you focused, fights loneliness, and makes your workspace feel truly alive. Pre-order Batch 01 today.
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3"><Check className="text-amberMain h-5 w-5" /> <span className="font-medium text-[#515154]">Emotional AI & Productivity Core</span></div>
                  <div className="flex items-center gap-3"><Check className="text-amberMain h-5 w-5" /> <span className="font-medium text-[#515154]">Pure-Black OLED Expression Glass</span></div>
                  <div className="flex items-center gap-3"><Check className="text-amberMain h-5 w-5" /> <span className="font-medium text-[#515154]">14-Hour Internal Battery Life</span></div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full bg-[#1d1d1f] text-white text-xl font-bold py-6 rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Pre-Order Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-black/5 text-center text-xs text-[#86868b] font-semibold uppercase tracking-widest">
                  <div className="flex flex-col items-center gap-2"><Truck className="h-5 w-5 text-amberMain" /> {shipping}</div>
                  <div className="flex flex-col items-center gap-2"><Shield className="h-5 w-5 text-amberMain" /> 1Y Warranty</div>
                  <div className="flex flex-col items-center gap-2"><RotateCcw className="h-5 w-5 text-amberMain" /> 14D Returns</div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col pt-8"
              >
                <button 
                  onClick={() => setStep(0)}
                  className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] font-bold text-sm uppercase tracking-widest mb-8 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Product
                </button>

                <h2 className="text-4xl font-bold tracking-tight mb-2 text-[#1d1d1f]">Pre-Order Info</h2>
                <p className="text-[#86868b] font-medium mb-10">Where should we ship your Kubo?</p>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1d1d1f] ml-1">FULL NAME</label>
                    <input 
                      required
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-amberMain/50 focus:bg-white transition-all outline-none font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#1d1d1f] ml-1">EMAIL</label>
                      <input 
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-amberMain/50 focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#1d1d1f] ml-1">PHONE</label>
                      <input 
                        required
                        type="tel"
                        placeholder="+91"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-amberMain/50 focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1d1d1f] ml-1">SHIPPING ADDRESS</label>
                    <textarea 
                      required
                      placeholder="House No, Street, Landmark, Pincode"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={3}
                      className="w-full px-6 py-4 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-amberMain/50 focus:bg-white transition-all outline-none font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1d1d1f] text-white text-xl font-bold py-6 rounded-full hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)] transition-all duration-300 flex items-center justify-center gap-3 mt-8 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Redirecting to Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[#86868b] text-[13px] font-medium px-8">
                     Secure checkout via Instamojo. All shipping data is encrypted and used only for fulfilling your order.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 pt-16 border-t border-[#d2d2d7]/50 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-8 text-center uppercase tracking-widest">Questions?</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const [isOpen, setIsOpen] = useState(false);
            return (
              <div key={i} className="border border-[#d2d2d7]/30 rounded-[2rem] bg-white overflow-hidden transition-all hover:border-amberMain/20">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex justify-between items-center p-8 text-left"
                >
                  <span className="font-bold text-lg text-[#1d1d1f] tracking-tight">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#86868b] transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <p className="text-[#86868b] leading-relaxed font-medium text-lg">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
