"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import DemoForm from "./DemoForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DemoModal({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(6,8,26,0.88)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Book a Demo"
              className="relative w-full max-w-xl pointer-events-auto rounded-3xl overflow-hidden"
              style={{
                background: "#07091c",
                border: "1.5px solid rgba(255,255,255,0.1)",
                boxShadow: "0 48px 120px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent bar */}
              <div
                className="h-[3px] w-full"
                style={{ background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #06b6d4 100%)" }}
              />

              {/* Header */}
              <div className="flex items-start justify-between px-8 pt-7 pb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(37,99,235,0.14)",
                      border: "1px solid rgba(37,99,235,0.28)",
                    }}
                  >
                    <Calendar size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">Book a Demo</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Our team responds within 24 hours</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150 shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Separator */}
              <div className="mx-8 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Form body */}
              <div className="px-8 py-7 overflow-y-auto max-h-[72vh]">
                <DemoForm />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
