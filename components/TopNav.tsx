"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, ChevronDown, Users, Calculator, ShieldCheck,
  Scale, FileSpreadsheet, GraduationCap, ArrowUpRight,
} from "lucide-react";

const PRODUCTS = [
  { icon: Users,           title: "Smart Recruitment",      tagline: "AI-Powered ATS",     color: "#60a5fa", href: "#recruitment"    },
  { icon: Calculator,      title: "Payroll Automation",      tagline: "Zero-Error Payroll", color: "#34d399", href: "#payroll"        },
  { icon: ShieldCheck,     title: "Background Verification", tagline: "Multi-Layer BGV",    color: "#a78bfa", href: "#verification"   },
  { icon: Scale,           title: "Labour Law Compliance",   tagline: "4 Labour Codes",     color: "#fbbf24", href: "#compliance"     },
  { icon: FileSpreadsheet, title: "PF / ESI / PT Support",  tagline: "Statutory Filings",  color: "#38bdf8", href: "#statutory"      },
  { icon: GraduationCap,   title: "NATS Apprenticeship",    tagline: "Regulatory Program", color: "#f87171", href: "#apprenticeship" },
];

const NAV_LINKS = [
  { label: "Features",   href: "#features"   },
  { label: "Industries", href: "#industries" },
  { label: "Company",    href: "#company"    },
  { label: "Resources",  href: "#resources"  },
];

interface Props {
  onBookDemo: () => void;
}

export default function TopNav({ onBookDemo }: Props) {
  const [scrolled,     setScrolled]     = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openMenu  = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); setProductsOpen(true);  };
  const closeMenu = () => { leaveTimer.current = setTimeout(() => setProductsOpen(false), 130); };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-400"
      style={{
        background: scrolled
          ? "rgba(5,7,26,0.94)"
          : "rgba(5,7,26,0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: scrolled
          ? "0 4px 32px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.04)"
          : "none",
      }}
    >
      {/* Iridescent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 30%, rgba(6,182,212,0.6) 60%, transparent 100%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-[160px]">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 6 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
            >
              <Sparkles size={15} className="text-white" />
            </motion.div>
            <span className="text-[15px] font-extrabold tracking-tight text-white">
              Talent<span className="text-blue-400">Trive</span>
            </span>
          </a>

          {/* ── Center nav ── */}
          <nav className="hidden lg:flex items-center gap-x-10">
            <a
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              Home
            </a>

            {/* Products mega-menu trigger */}
            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
                aria-haspopup="true"
                aria-expanded={productsOpen}
              >
                Products
                <ChevronDown
                  size={13}
                  className="mt-px transition-transform duration-200"
                  style={{ transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{   opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseEnter={openMenu}
                    onMouseLeave={closeMenu}
                    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[580px] rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(8,12,36,0.97)",
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow:
                        "0 28px 72px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Iridescent accent at top of menu */}
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(99,102,241,0.7) 30%, rgba(6,182,212,0.7) 70%, transparent)",
                      }}
                    />

                    <div className="p-4">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] px-2 pt-1 pb-3"
                        style={{ color: "rgba(148,163,184,0.55)" }}>
                        Core B2B Services
                      </p>

                      <div className="grid grid-cols-2 gap-1">
                        {PRODUCTS.map((p) => (
                          <a
                            key={p.title}
                            href={p.href}
                            className="group/item flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 hover:bg-white/5"
                            onClick={() => setProductsOpen(false)}
                          >
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-150 group-hover/item:scale-110"
                              style={{
                                background: p.color + "15",
                                border: `1px solid ${p.color}28`,
                              }}
                            >
                              <p.icon size={15} style={{ color: p.color }} />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-white leading-tight">
                                {p.title}
                              </p>
                              <p className="text-[11px] font-medium mt-0.5" style={{ color: "rgba(148,163,184,0.7)" }}>
                                {p.tagline}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Footer CTA */}
                      <div
                        className="group/cta mt-3 mx-1 p-3.5 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 hover:border-indigo-500/40"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.08) 100%)",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        <div>
                          <p className="text-[12px] font-bold text-white">
                            Explore the full platform suite
                          </p>
                          <p className="text-[11px] mt-0.5" style={{ color: "rgba(148,163,184,0.6)" }}>
                            All 6 services in one connected workspace
                          </p>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="text-indigo-400 shrink-0 transition-transform duration-150 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Book a Demo CTA ── */}
          <motion.button
            onClick={onBookDemo}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              boxShadow: "0 2px 16px rgba(37,99,235,0.45)",
            }}
          >
            Book a Demo
          </motion.button>
        </div>
      </div>
    </header>
  );
}
