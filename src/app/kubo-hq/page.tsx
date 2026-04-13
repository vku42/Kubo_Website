"use client";

import { useState, useEffect, Suspense } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { 
  Package, 
  Users, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Eye, 
  Download,
  ShieldCheck,
  Lock,
  ArrowRight,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// 🔐 Dashboard Security Key
// In a real app, this would be in .env.local and validated on the server.
const DASHBOARD_SECRET = "kubo_admin_2026"; 

function AdminContent() {
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const orders = useQuery(api.orders.getOrders) || [];
  const updateStatus = useMutation(api.orders.updateStatus);

  useEffect(() => {
    if (secret === DASHBOARD_SECRET) {
      setIsAuthorized(true);
    }
  }, [secret]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-12 rounded-[3rem] border border-white max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-amberMain/10 rounded-full flex items-center justify-center mx-auto mb-8 text-amberMain">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 mb-8 mt-8">
            Access Denied
          </div>
          <a href="/" className="text-amberMain font-bold hover:underline flex items-center justify-center gap-2 group">
            Return to Storefront <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    );
  }

  // --- Calculations ---
  const stats = {
    totalOrders: orders.length,
    pendingVerification: orders.filter(o => o.status === "verification_pending" || o.status === "proof_uploaded").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    revenue: orders.filter(o => o.status === "paid" || o.status === "shipped").reduce((acc, curr) => acc + curr.amount, 0) * 299 // Simplified conversion for demo
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o._id.toString().includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700 border-green-200";
      case "shipped": return "bg-blue-100 text-blue-700 border-blue-200";
      case "proof_uploaded": return "bg-amber-100 text-amber-700 border-amber-200";
      case "verification_pending": return "bg-purple-100 text-purple-700 border-purple-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleStatusUpdate = async (id: any, status: string) => {
    try {
      await updateStatus({ orderId: id, newStatus: status });
    } catch (err) {
      alert("Status update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amberMain rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amberMain/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">Kubo HQ</h1>
            </div>
            <p className="text-[#86868b] font-medium">Managing the production and delivery of Batch 01.</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-black/5 focus:border-amberMain/50 outline-none transition-all font-medium text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Orders", value: stats.totalOrders, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Revenue (Est.)", value: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: "text-green-500", bg: "bg-green-50" },
            { label: "Pending Verification", value: stats.pendingVerification, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Shipped", value: stats.shipped, icon: Truck, color: "text-purple-500", bg: "bg-purple-50" },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="glass-panel p-8 rounded-[2rem] border border-white shadow-sm flex items-center gap-6"
            >
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#86868b] mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="glass-panel rounded-[2.5rem] border border-white shadow-xl overflow-hidden bg-white/50 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f5f5f7]/50 border-b border-black/5">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Customer</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Method / Proof</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Date</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/40 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-[#1d1d1f]">{order.customerName}</p>
                      <p className="text-[11px] font-medium text-[#86868b] uppercase tracking-tighter">{order.customerEmail}</p>
                      <p className="text-[11px] font-medium text-[#86868b]">{order.customerPhone}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-black/5 self-start">{order.paymentMethod}</span>
                        {order.paymentProofUrl && (
                          <button 
                            onClick={() => setSelectedProof(order.paymentProofUrl!)}
                            className="flex items-center gap-1.5 text-amberMain hover:underline text-xs font-bold"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Proof
                          </button>
                        )}
                        {order.customerUpiId && (
                           <p className="text-[10px] font-bold text-gray-400">ID: {order.customerUpiId}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[#86868b] text-xs font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {order.status !== "paid" && order.status !== "shipped" && (
                          <button 
                            onClick={() => handleStatusUpdate(order._id, "paid")}
                            className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm"
                            title="Approve Payment"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        )}
                        {order.status === "paid" && (
                           <button 
                            onClick={() => handleStatusUpdate(order._id, "shipped")}
                            className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                            title="Mark Shipped"
                           >
                             <Truck className="w-5 h-5" />
                           </button>
                        )}
                        <button 
                          onClick={() => handleStatusUpdate(order._id, "rejected")}
                          className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          title="Reject / Refund"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="p-24 text-center">
                <p className="text-[#86868b] font-medium">No orders found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Proof Modal */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProof(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white">
                <h3 className="text-xl font-bold text-[#1d1d1f]">Payment Verification Proof</h3>
                <div className="flex gap-4">
                  <a href={selectedProof} target="_blank" download className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5">
                    <Download className="w-4 h-4" />
                  </a>
                  <button onClick={() => setSelectedProof(null)} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="relative aspect-[3/4] w-full bg-black/5 flex items-center justify-center overflow-auto p-8">
                 <img src={selectedProof} alt="Payment Proof" className="max-w-full max-h-[70vh] rounded-xl shadow-2xl object-contain" />
              </div>
              <div className="p-8 bg-[#f5f5f7] text-center">
                  <p className="text-sm font-medium text-[#86868b]">Compare this screenshot with your UPI app statement to verify receipt.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold">Loading Kubo HQ...</div>}>
      <AdminContent />
    </Suspense>
  );
}
