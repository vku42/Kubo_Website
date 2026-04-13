"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2, MessageSquare, LifeBuoy, Zap, Sparkles, Loader2, Mail, User, Info } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "general", label: "General Inquiry", icon: MessageSquare },
  { id: "tech", label: "Technical Support", icon: Zap },
  { id: "order", label: "Order Status", icon: LifeBuoy },
  { id: "feature", label: "Feature Suggestion", icon: Sparkles },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: categories.find(c => c.id === formData.subject)?.label || formData.subject
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "general", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] selection:bg-black/10 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ 
             backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", 
             backgroundSize: "40px 40px" 
           }} 
      />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] font-bold text-sm uppercase tracking-widest mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Overview
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/40">Support & Feedback</span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-[#1d1d1f]">
                How can we <br/> help you?
              </h1>
              <p className="text-xl md:text-2xl text-[#86868b] font-medium tracking-tight max-w-md leading-relaxed">
                Whether it's a bug report, a hardware question, or just a feature idea — we're all ears.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-[#d2d2d7]/30 shadow-sm hover:shadow-md transition-shadow">
                <Mail className="w-6 h-6 text-black/20 mb-4" />
                <h3 className="font-bold text-[#1d1d1f] mb-1">Email Us</h3>
                <p className="text-sm text-[#86868b] font-medium">hello@kubobot.com</p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#d2d2d7]/30 shadow-sm hover:shadow-md transition-shadow">
                <MessageSquare className="w-6 h-6 text-black/20 mb-4" />
                <h3 className="font-bold text-[#1d1d1f] mb-1">Community</h3>
                <p className="text-sm text-[#86868b] font-medium">Join our Discord</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#d2d2d7]/30 rounded-[3rem] p-10 md:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.06)] flex flex-col items-center gap-6"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Ticket Received.</h2>
                  <p className="text-lg text-[#86868b] font-medium max-w-xs mx-auto">
                    We've sent a confirmation to your email. Our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-8 py-3 bg-[#1d1d1f] text-white rounded-full font-bold hover:bg-black/80 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-white border border-[#d2d2d7]/30 rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.06)] space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#1d1d1f] ml-1 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3" /> Full Name
                      </label>
                      <input 
                        required
                        type="text"
                        placeholder="e.g. Satoshi"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-black/20 focus:bg-white transition-all outline-none font-medium text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-[#1d1d1f] ml-1 uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-3 h-3" /> Email Address
                      </label>
                      <input 
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-black/20 focus:bg-white transition-all outline-none font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-bold text-[#1d1d1f] ml-1 uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-3 h-3" /> Select Topic
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setFormData({...formData, subject: cat.id})}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all ${
                              formData.subject === cat.id 
                                ? "bg-black border-black text-white shadow-lg shadow-black/10" 
                                : "bg-white border-[#d2d2d7]/40 text-[#1d1d1f] hover:border-black/10"
                            }`}
                          >
                            <cat.icon className="w-4 h-4" />
                            <span className="text-xs font-bold leading-none">{cat.label}</span>
                          </button>
                        ))}
                      </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#1d1d1f] ml-1 uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Message
                    </label>
                    <textarea 
                      required
                      placeholder="Tell us everything..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-5 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-black/20 focus:bg-white transition-all outline-none font-medium text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#1d1d1f] text-white text-base font-bold py-5 rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-center text-red-500 text-xs font-bold animate-pulse uppercase tracking-widest mt-4">
                      Failed to send. Please try again later.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
