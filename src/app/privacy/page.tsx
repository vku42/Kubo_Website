export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-[#fafafc] pt-40 pb-32 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f] mb-12">
          Privacy Policy
        </h1>
        <div className="prose prose-lg text-[#86868b] leading-relaxed">
          <p className="font-medium text-[#1d1d1f] mb-8">Last Updated: April 2026</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Our Core Privacy Principle</h2>
          <p>Your physical environment, conversations, and emotional state are deeply personal. Kubo was engineered from the ground up to ensure that what happens at your desk, stays at your desk. We fundamentally believe AI companions should not be spy devices.</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Local Processing (100% Offline)</h2>
          <p>Kubo utilizes an onboard Neural ESP-32 coprocessor. All spatial awareness and audio cue processing occurs directly on the silicon. We absolutely never upload audio or video streams to our cloud servers.</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Information We Collect</h2>
          <p>When you purchase Kubo or subscribe to our newsletter, we collect standard e-commerce data (Name, Email, Delivery Address) necessary to fulfill your order. This data is stored securely via our primary database partners.</p>
          
          <h2 className="text-2xl font-bold text-[#1d1d1f] mt-12 mb-4">Your Rights</h2>
          <p>You have the absolute right to request the deletion of any account metadata or shipping history we hold. You can also opt-out of all marketing communications instantly using the links provided in our emails.</p>
        </div>
      </div>
    </div>
  );
}
