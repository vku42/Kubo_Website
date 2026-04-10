export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-[#fafafc] pt-40 pb-32 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f] mb-12">
          Terms of Service
        </h1>
        <div className="prose prose-lg text-[#86868b] leading-relaxed">
          <p className="font-medium text-[#1d1d1f] mb-8">Last Updated: April 2026</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>By purchasing or using Kubo Bot, you agree to these terms. Kubo Robotics provides a companion hardware device and associated software services. We reserve the right to update these terms at any time.</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">2. Hardware Warranty</h2>
          <p>Kubo comes with a standard 1-year limited warranty covering manufacturing defects. Damage caused by user negligence, water exposure, or third-party modifications voids this warranty immediately.</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">3. Data & Privacy</h2>
          <p>Kubo calculates emotional states locally on the ESP-32 chip. We do not store or transmit raw audio/video data. Your focus data belongs entirely to you. Please read our Privacy Policy for more detailed information.</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">4. Refunds and Pre-orders</h2>
          <p>Pre-orders are fully refundable until the unit ships. Once shipped, you have a 14-day window to return the product in its original, undamaged packaging for a full refund minus shipping costs.</p>
        </div>
      </div>
    </div>
  );
}
