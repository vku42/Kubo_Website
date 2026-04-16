"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/#features", label: "Features" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={mounted ? { y: 0 } : { y: -100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl"
      >
        <div
          className={`rounded-full px-5 py-3 flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-black/5"
              : "glass-panel border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="select-none flex-shrink-0">
            <span className="font-bold text-[21px] tracking-tighter hover:opacity-70 transition-opacity">
              Kubo.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-black/60">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors hover:text-black group py-1 ${
                    isActive ? "text-black" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-black transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/buy"
              id="navbar-buy-button"
              className="hidden sm:flex bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black/80 transition-all items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            >
              {pathname === "/buy" ? "Checkout" : "Buy Now"}
              {pathname !== "/buy" && <ShoppingCart size={14} />}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-black/5 shadow-[0_32px_80px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between py-3 px-4 rounded-2xl hover:bg-black/[0.04] transition-colors font-semibold text-[#1d1d1f] text-lg"
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 text-black/30" />
                  </Link>
                ))}
                <Link
                  href="/buy"
                  className="flex items-center justify-center gap-2 bg-[#1d1d1f] text-white py-4 rounded-2xl font-bold text-base mt-2"
                >
                  Pre-Order Kubo
                  <ShoppingCart size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
