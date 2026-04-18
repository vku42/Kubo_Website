import { ArrowLeft, Lock, EyeOff, Brain, Database } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] font-bold text-sm uppercase tracking-widest mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-4">Privacy Policy</h1>
        <p className="text-xl text-[#86868b] font-medium mb-12">Last Updated: April 2026</p>

        <div className="space-y-16">
          <section className="p-10 rounded-[3rem] bg-black/5 border border-black/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#1d1d1f] rounded-2xl flex items-center justify-center text-white">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Our Core Privacy Promise</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-bold text-lg italic">
              "What happens on your desk, stays on your desk."
            </p>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg mt-4">
              Kubo is built on the principle of absolute privacy. Unlike other AI companions, Kubo is designed to function entirely offline for its core emotional expression and interaction logic.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                <Brain className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">1. Local AI Processing</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg">
              Kubo Bot's AI models run locally on its internal ESP32-C3 chip. We do not stream your audio, video, or physical workspace data to any external cloud servers for processing behavior. Kubo is a "dead end" for your data.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">2. Information We Collect</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg mb-6">
              We only collect information that is strictly necessary to fulfill your order and provide support:
            </p>
            <ul className="space-y-4 text-[#86868b] font-medium ml-4">
              <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" /> <strong>Identity & Shipping</strong>: Name, email, phone number, and shipping address.</li>
              <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" /> <strong>Payment Info</strong>: We do not store credit card details. All transactions are handled by secure, PCI-compliant partners (Instamojo / UPI).</li>
              <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" /> <strong>Interaction Data</strong>: Kubo's onboard "memory" of you is stored locally and can be wiped with a physical factory reset button.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                <EyeOff className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">3. Data Sharing</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg">
              We will never sell, lease, or distribute your personal information to third parties. Your data is only used by Vehon Infotech and our essential shipping partners solely to deliver your pre-order.
            </p>
          </section>

          <div className="pt-16 border-t border-black/5 text-center">
            <p className="text-[#86868b] font-medium italic">Privacy Concerns? Data request? Contact <strong>hello@kubobot.com</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
