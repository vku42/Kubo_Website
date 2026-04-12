"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Shield, Truck, RotateCcw, ChevronDown, ArrowRight, ArrowLeft, Loader2, QrCode, Smartphone, Copy, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useCurrency from "@/hooks/useCurrency";
import { useQuery, useMutation } from "convex/react";
import { CldUploadWidget } from "next-cloudinary";
import { api } from "../../../convex/_generated/api";

const faqs = [
  { q: "When will my Kubo ship?", a: "Batch 01 is currently in production. We expect to begin fulfilling pre-orders by late Q3 2026. You will receive an email update when your unit is ready to ship." },
  { q: "Is there a monthly subscription?", a: "No. The AI models run completely locally on the device's ESP-32 chip. You pay once for the hardware, and all core emotional support and productivity features are yours forever." },
  { q: "Do you ship internationally?", a: "Currently, we only ship within India. We are working hard to establish international logistics and will announce global availability soon." }
];

const MERCHANT_UPI = "thekubo@pthdfc";
const MERCHANT_NAME = "Kubo Bot";
const PRODUCT_AMOUNT = "10";

export default function BuyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: Product, 1: Form, 2: Payment Display
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"manual_upi" | "instamojo">("manual_upi");
  
  const attachProof = useMutation(api.orders.attachPaymentProof);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    customerUpiId: "",
    website_url: ""
  });

  // 🛡️ Reliability: Persistent Session Tracking
  useEffect(() => {
    const savedOrderId = localStorage.getItem("pending_order_id");
    const savedStep = localStorage.getItem("checkout_step");
    const savedData = localStorage.getItem("checkout_form");

    if (savedOrderId) setCurrentOrderId(savedOrderId);
    if (savedStep) setStep(Number(savedStep));
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  // Save progress on change
  useEffect(() => {
    if (currentOrderId) localStorage.setItem("pending_order_id", currentOrderId);
    localStorage.setItem("checkout_step", step.toString());
    localStorage.setItem("checkout_form", JSON.stringify(formData));
  }, [currentOrderId, step, formData]);
  
  const stock = useQuery(api.inventory.getStock) ?? 47;
  const { price, shipping } = useCurrency();

  // Generate UPI Deep Link
  const upiLink = `upi://pay?pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${PRODUCT_AMOUNT}&cu=INR&tn=${encodeURIComponent("Kubo Bot Pre-Order")}`;
  // Generate QR Code URL via public API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.website_url) {
      return;
    }

    setLoading(true);
    
    try {
      // Trigger Checkout API with lead data
      const res = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           ...formData,
           paymentMethod
        })
      });

      const data = await res.json();
      
      if (paymentMethod === "instamojo") {
        if (data.url) {
          window.location.href = data.url;
        } else if (data.url === "") {
          alert("Development Mode: Instamojo keys not set. Data captured!");
          setLoading(false);
          setStep(0);
        } else {
          alert("Checkout failed: " + (data.error || "Unknown error"));
          setLoading(false);
        }
      } else {
        // Manual UPI Flow: Move to the Payment Display step
        if (data.orderId) {
          setCurrentOrderId(data.orderId);
        }
        setLoading(false);
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const onUploadSuccess = async (result: any) => {
    if (result.event === "success" && currentOrderId) {
      const url = result.info.secure_url;
      try {
        await attachProof({
          orderId: currentOrderId as any,
          proofUrl: url
        });
        setProofUploaded(true);
        // Automatic redirection after binding the proof
        router.push(`/buy/success?id=${currentOrderId}`);
      } catch (err) {
        console.error("Proof link failed:", err);
        alert("Failed to link screenshot. Please try again.");
      }
    }
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(MERCHANT_UPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Product Gallery */}
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full aspect-square relative rounded-[3rem] overflow-hidden glass-panel border border-white/40 shadow-[0_32px_80px_rgba(0,0,0,0.06)]"
          >
            <Image 
              src="/Photos/img1.jpg" 
              alt="Kubo Bot Main" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover" 
              priority 
              loading="eager"
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden glass-panel border border-white/40">
              <Image 
                src="/Photos/img2.jpg" 
                alt="Kubo Bot Detail" 
                fill 
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover" 
              />
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

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#1d1d1f] text-center md:text-left">Kubo Bot</h1>
                <p className="text-2xl md:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-8 text-center md:text-left">
                  {price} <span className="text-sm font-medium text-[#86868b] ml-1">incl. all taxes</span>
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
            ) : step === 1 ? (
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

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-[#1d1d1f] text-center md:text-left">Pre-Order Info</h2>
                <p className="text-[#86868b] font-medium mb-10 text-center md:text-left">Where should we ship your Kubo?</p>

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

                  {/* Payment Method Selection Removed - Hardcoded to Manual UPI */}
                  <div className="pt-4 space-y-4">
                    <label className="text-sm font-bold text-[#1d1d1f] ml-1 uppercase tracking-widest">Payment Method</label>
                    <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-amberMain bg-amberMain/5 transition-all">
                        <div className="flex items-center gap-3 font-bold text-[#1d1d1f]">
                          <QrCode className="w-6 h-6" />
                          <div className="text-left leading-none">
                            <p>UPI Transfer</p>
                            <p className="text-[10px] text-[#86868b] mt-1">GPay, PhonePe, Paytm, etc.</p>
                          </div>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-amberMain" />
                    </div>
                  </div>

                  <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2 pt-2"
                  >
                      <label className="text-sm font-bold text-amber-600 ml-1">YOUR UPI ID (FOR TRACKING)</label>
                      <input 
                        required
                        type="text"
                        placeholder="yourname@upi"
                        value={formData.customerUpiId}
                        onChange={(e) => setFormData({...formData, customerUpiId: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-amber-50 border border-amber-200 focus:border-amberMain focus:bg-white transition-all outline-none font-medium"
                      />
                  </motion.div>

                  {/* Honeypot field for bot protection */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <input 
                      type="text" 
                      name="website_url" 
                      tabIndex={-1} 
                      autoComplete="off"
                      value={formData.website_url}
                      onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1d1d1f] text-white text-xl font-bold py-6 rounded-full hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)] transition-all duration-300 flex items-center justify-center gap-3 mt-8 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <span>Confirm & Go to Payment</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[#86868b] text-[13px] font-medium px-8">
                     Secure checkout via Instamojo. All shipping data is encrypted and used only for fulfilling your order.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center pt-8 text-center"
              >
                <div className="w-16 h-16 bg-amberMain/10 rounded-full flex items-center justify-center mb-6">
                  <QrCode className="w-8 h-8 text-amberMain" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-2 text-[#1d1d1f]">Complete Payment</h2>
                <p className="text-[#86868b] font-medium mb-8">Scan to pay exactly <span className="text-[#1d1d1f] font-bold">{price}</span></p>

                <div className="relative glass-panel p-6 rounded-[2.5rem] border-2 border-amberMain/20 mb-8 bg-white shadow-xl">
                    <img src={qrCodeUrl} alt="UPI QR Code" className="w-[200px] h-[200px] rounded-2xl" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amberMain text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        Scan with any app
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full px-4 mb-8">
                    <a 
                      href={upiLink}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#000] text-white font-bold hover:scale-[1.02] transition-transform active:scale-95"
                    >
                        <Smartphone className="w-5 h-5" /> Pay via App
                    </a>
                    <button 
                      onClick={copyUpi}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-black/10 font-bold hover:bg-black/5 transition-colors relative"
                    >
                        {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        <span>{copied ? "Copied UPI ID" : MERCHANT_UPI}</span>
                    </button>
                </div>

                {/* Proof of Payment Upload */}
                <div className="w-full px-4 pt-8 border-t border-black/5">
                   {proofUploaded ? (
                     <motion.div 
                       initial={{ scale: 0.9, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="flex flex-col items-center gap-3 p-8 rounded-[2rem] bg-green-50 border border-green-200"
                     >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                           <Check className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-green-800">Screenshot Uploaded!</p>
                        <p className="text-xs text-green-700 font-medium">Your order is now in verification.</p>
                     </motion.div>
                   ) : (
                     <div className="space-y-4">
                        <p className="text-sm font-bold text-[#1d1d1f] uppercase tracking-widest">Done paying? Upload proof:</p>
                        <CldUploadWidget 
                          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "du1btd5bw"}
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "Unsigned_UPLOAD"}
                          options={{
                            sources: ['local', 'camera'],
                            resourceType: 'image',
                            clientAllowedFormats: ['png', 'jpeg', 'jpg', 'webp'],
                            maxFileSize: 5000000, // 5MB limit
                            multiple: false,
                            maxImageFileSize: 5000000,
                            validateBeforeUpload: true
                          }}
                          onSuccess={onUploadSuccess}
                        >
                          {({ open }) => (
                            <button
                              onClick={() => open()}
                              className="w-full py-5 rounded-2xl border-2 border-dashed border-amberMain/40 bg-amberMain/5 flex flex-col items-center gap-2 hover:bg-amberMain/10 transition-colors group"
                            >
                               <QrCode className="w-8 h-8 text-amberMain group-hover:scale-110 transition-transform" />
                               <span className="font-bold text-amberMain text-sm">Select Payment Screenshot</span>
                            </button>
                          )}
                        </CldUploadWidget>
                     </div>
                   )}
                </div>

                <div className="mt-8 p-6 rounded-3xl bg-amber-50 border border-amber-200 text-left">
                    <h4 className="font-bold text-amber-900 text-sm mb-2 uppercase tracking-tight">Instructions:</h4>
                    <ul className="text-xs text-amber-800 space-y-2 font-medium leading-relaxed">
                        <li>1. Use GPay, PhonePe, or any UPI app.</li>
                        <li>2. Ensure the payer matches: <span className="font-bold">{MERCHANT_NAME}</span></li>
                        <li>3. After payment, take a screenshot and upload it above for faster verification.</li>
                    </ul>
                </div>

                {!proofUploaded && (
                  <Link 
                    href={`/buy/success?id=manual_${Date.now()}`}
                    className="w-full mt-6 py-4 rounded-2xl border border-black/10 text-[#1d1d1f] font-bold text-sm hover:bg-black/5 transition-colors flex items-center justify-center gap-2 group"
                  >
                    I've already paid, take me to Success <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
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
