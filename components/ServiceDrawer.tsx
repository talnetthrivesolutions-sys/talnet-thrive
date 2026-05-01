"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, type LucideIcon } from "lucide-react";

export interface ServiceData {
  icon: LucideIcon;
  title: string;
  tagline: string;
  detail: string;
  features: string[];
  accent: string;
  glow: string;
}

interface Props {
  service: ServiceData | null;
  onClose: () => void;
  onRequestDemo: () => void;
}

export default function ServiceDrawer({ service, onClose, onRequestDemo }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = service ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  // Escape key closes drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(5px)" }}
            aria-hidden="true"
          />

          {/* ── Panel ── */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${service.title} details`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 290, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-[500px] z-50 flex flex-col overflow-hidden"
            style={{
              background: "#07091a",
              borderLeft: `1px solid ${service.accent}30`,
            }}
          >
            {/* Top accent stripe */}
            <div
              className="h-[3px] w-full shrink-0"
              style={{
                background: `linear-gradient(90deg, ${service.accent} 0%, transparent 100%)`,
              }}
            />

            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4 px-8 pt-7 pb-5 shrink-0">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}1a, ${service.accent}08)`,
                    border: `1px solid ${service.accent}38`,
                  }}
                >
                  <service.icon size={26} style={{ color: service.accent }} />
                </div>
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1"
                    style={{ color: service.accent }}
                  >
                    {service.tagline}
                  </p>
                  <h2 className="text-xl font-bold text-white leading-tight">{service.title}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-gray-400 hover:text-white transition-all duration-150"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X size={17} />
              </button>
            </div>

            <div className="mx-8 h-px shrink-0" style={{ background: "rgba(255,255,255,0.07)" }} />

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-8">
              <p className="text-gray-300 text-[15px] leading-[1.75]">{service.detail}</p>

              {/* Feature list */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-5">
                  Key Capabilities
                </p>
                <ul className="flex flex-col gap-3.5">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3.5">
                      <div
                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${service.accent}15` }}
                      >
                        <svg viewBox="0 0 12 12" width="9" height="9" fill="none">
                          <path
                            d="M2 6l3 3 5-5"
                            stroke={service.accent}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300 leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Sticky CTA footer ── */}
            <div
              className="px-8 py-6 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <button
                onClick={() => { onClose(); onRequestDemo(); }}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${service.accent} 0%, #7c3aed 100%)`,
                  boxShadow: `0 4px 24px ${service.glow}`,
                }}
              >
                Request a Demo
                <ArrowRight size={17} />
              </button>
              <p className="text-center text-xs text-gray-600 mt-3">
                No commitment · Personalised walkthrough
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
