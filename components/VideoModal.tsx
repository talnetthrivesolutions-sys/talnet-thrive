"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, Maximize2 } from "lucide-react";

type Phase = "loading" | "ready" | "playing";

function LoadingDots({ count }: { count: number }) {
  return <span className="inline-block w-7">{".".repeat(count)}</span>;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function VideoModal({ open, onClose }: Props) {
  const [phase,    setPhase]    = useState<Phase>("loading");
  const [dotCount, setDotCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playTime, setPlayTime] = useState(0);

  /* Reset state each time modal opens */
  useEffect(() => {
    if (!open) return;
    setPhase("loading");
    setDotCount(0);
    setProgress(0);
    setPlayTime(0);

    let dotTimer: ReturnType<typeof setInterval>;
    let progressTimer: ReturnType<typeof setInterval>;
    const readyTimer = setTimeout(() => {
      setPhase("ready");
      clearInterval(dotTimer);
      clearInterval(progressTimer);
    }, 3000);

    dotTimer    = setInterval(() => setDotCount((d) => (d + 1) % 4), 450);
    progressTimer = setInterval(() => setProgress((p) => Math.min(p + 1.4, 100)), 42);

    return () => {
      clearTimeout(readyTimer);
      clearInterval(dotTimer);
      clearInterval(progressTimer);
    };
  }, [open]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setPlayTime((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="vbg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[70]"
            style={{ background: "rgba(2,4,18,0.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="vpanel"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="w-full max-w-3xl pointer-events-auto rounded-2xl overflow-hidden"
              style={{
                background: "#060c20",
                border: "1.5px solid rgba(255,255,255,0.09)",
                boxShadow: "0 48px 120px rgba(0,0,0,0.8)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-400">Platform Demo</p>
                  <p className="text-sm font-bold text-white mt-0.5">TalentTrive Platform Tour</p>
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <X size={15} />
                </button>
              </div>

              {/* 16:9 video frame */}
              <div className="relative w-full" style={{ paddingTop: "56.25%", background: "#030815" }}>
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(99,102,241,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }} />

                <div className="absolute inset-0 flex items-center justify-center flex-col gap-5">
                  <AnimatePresence mode="wait">
                    {phase === "loading" && (
                      <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-5">
                        <svg className="animate-spin" width="52" height="52" viewBox="0 0 52 52" fill="none">
                          <circle cx="26" cy="26" r="22" stroke="rgba(37,99,235,0.2)" strokeWidth="3" />
                          <path d="M 26 4 A 22 22 0 0 1 48 26" stroke="url(#vg)" strokeWidth="3" strokeLinecap="round" />
                          <defs>
                            <linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#2563eb" />
                              <stop offset="100%" stopColor="#7c3aed" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <p className="text-blue-300 font-bold text-base tracking-wide">
                          Loading Digital Twin<LoadingDots count={dotCount} />
                        </p>
                        <div className="w-44 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                          <div className="h-full rounded-full shimmer-bar"
                            style={{ width: `${progress}%`, transition: "width 0.04s linear" }} />
                        </div>
                      </motion.div>
                    )}

                    {phase === "ready" && (
                      <motion.div key="ready" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4">
                        <motion.button onClick={() => setPhase("playing")}
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                          className="relative w-18 h-18 w-[72px] h-[72px] rounded-full flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                            boxShadow: "0 0 0 10px rgba(37,99,235,0.12), 0 12px 40px rgba(37,99,235,0.48)",
                          }}>
                          <span className="absolute inset-0 rounded-full animate-ring-pulse"
                            style={{ background: "rgba(37,99,235,0.28)" }} />
                          <Play size={26} className="text-white ml-1.5" fill="white" />
                        </motion.button>
                        <p className="text-slate-400 text-sm font-medium">Click to start the platform tour</p>
                      </motion.div>
                    )}

                    {phase === "playing" && (
                      <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-4 w-full px-10">
                        <div className="flex items-end gap-1 h-9">
                          {[3,5,7,6,8,7,5,4,6,8,7,5,3].map((h, i) => (
                            <motion.div key={i} className="w-1.5 rounded-sm"
                              style={{ background: `hsl(${220 + i * 6}, 80%, 65%)` }}
                              animate={{ height: [`${h*3}px`, `${h*6}px`, `${h*3}px`] }}
                              transition={{ repeat: Infinity, duration: 0.65 + i * 0.06, delay: i * 0.07, ease: "easeInOut" }} />
                          ))}
                        </div>
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-slate-500 text-xs font-mono shrink-0">{fmt(playTime)}</span>
                          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                            <div className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${Math.min((playTime/204)*100,100)}%`, background: "linear-gradient(90deg,#2563eb,#7c3aed)" }} />
                          </div>
                          <span className="text-slate-500 text-xs font-mono shrink-0">3:24</span>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setPhase("ready")}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all">
                            <Pause size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all">
                            <Volume2 size={14} />
                          </button>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all">
                            <Maximize2 size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Vignette */}
                <div className="absolute inset-x-0 top-0 h-20 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(6,12,32,0.5), transparent)" }} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
