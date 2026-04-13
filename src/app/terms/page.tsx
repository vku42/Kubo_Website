import { ArrowLeft, Scale, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] font-bold text-sm uppercase tracking-widest mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-4">Terms of Service</h1>
        <p className="text-xl text-[#86868b] font-medium mb-12">Last Updated: April 2026</p>

        <div className="space-y-16">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black/40">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">1. Agreement to Terms</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg">
              By purchasing Kubo Bot, you agree to these terms. Kubo is a community-driven project and a unique desktop companion. By ordering, you support Batch 01 production.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">2. Shipping & Pre-Order</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg">
              Batch 01 is estimated to ship in <strong>late Q3 2026</strong>. Shipping timelines are estimates based on production capacity. You will be notified via email when your unit is ready.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">3. No Warranty (Sold As-Is)</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg">
              Kubo Bot is provided <strong>"as-is" without any express or implied warranties</strong>. As a limited-run specialized companion, we cannot offer formal long-term hardware warranties. We build with care, but all sales are final upon delivery.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">4. Refund Policy</h2>
            </div>
            <p className="text-[#86868b] leading-relaxed font-medium text-lg">
              Refunds are not standard for pre-order batches. However, we may consider refund requests on a case-by-case basis at our sole discretion if a reasonable request is made prior to shipping. Once shipped, all sales are considered final.
            </p>
          </section>

          <div className="pt-16 border-t border-black/5 text-center">
            <p className="text-[#86868b] font-medium italic">General Inquiries: <strong>hello@kubobot.com</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
