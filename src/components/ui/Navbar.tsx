"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl"
      >
        <div className={`rounded-full px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5" 
            : "glass-panel border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
        }`}>
          <Link 
            href="/" 
            className="select-none"
          >
            <span 
              className="font-bold text-[22px] tracking-tight hover:opacity-70 transition-opacity cursor-pointer"
            >
              Kubo.
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-black/70">
            <Link href="/" className="hover:text-black transition-colors">
              Overview
            </Link>
            <Link href="#features" className="hover:text-black transition-colors">
              Features
            </Link>
            <Link href="/about" className="hover:text-black transition-colors">
              Story
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/buy"
              className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black/80 transition-colors flex items-center gap-2"
            >
              {pathname === "/buy" ? "Checkout" : "Buy Now"}
              {pathname !== "/buy" && <ShoppingCart size={16} />}
            </Link>
          </div>
        </div>
      </motion.header>
    </>
  );
}
