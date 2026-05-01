"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, Maximize } from "lucide-react";

type Phase = "loading" | "ready" | "playing";

function LoadingDots({ count }: { count: number }) {
  return <span className="inline-block w-8 text-left">{".".repeat(count)}</span>;
}

export default function WatchDemo() {
  const [phase,    setPhase]    = useState<Phase>("loading");
  const [dotCount, setDotCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playTime, setPlayTime] = useState(0);

  /* Animate loading bar + dots for 3 s, then show ready state */
  useEffect(() => {
    let dotTimer: ReturnType<typeof setInterval>;
    let progressTimer: ReturnType<typeof setInterval>;
    const readyTimer = setTimeout(() => {
      setPhase("ready");
      clearInterval(dotTimer);
      clearInterval(progressTimer);
    }, 3000);

    dotTimer = setInterval(() => setDotCount((d) => (d + 1) % 4), 450);
    progressTimer = setInterval(() => setProgress((p) => Math.min(p + 1.4, 100)), 42);

    return () => {
      clearTimeout(readyTimer);
      clearInterval(dotTimer);
      clearInterval(progressTimer);
    };
  }, []);

  /* Fake playback timer when playing */
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setPlayTime((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section id="watch-demo" className="py-32" style={{ background: "#0c1128" }}>
      <div className="max-w-7xl mx-auto px-12 xl:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full text-blue-300 mb-6"
            style={{
              background: "rgba(37,99,235,0.14)",
              border: "1px solid rgba(37,99,235,0.24)",
            }}
          >
            Platform Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            See TalentTrive{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              in Action
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Watch enterprise teams cut hiring time by 60% and automate full
            Labour Code compliance — inside one connected workspace.
          </p>
        </motion.div>

        {/* Video frame */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Ambient glow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none blur-3xl"
            style={{ background: "rgba(37,99,235,0.22)" }}
          />

          {/* 16:9 container */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              paddingTop: "56.25%",
              background: "linear-gradient(145deg, #060c20 0%, #08102e 100%)",
              border: "1.5px solid rgba(255,255,255,0.08)",
              boxShadow: "0 48px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(rgba(99,102,241,0.5) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />

            {/* Centre content */}
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
              <AnimatePresence mode="wait">

                {/* ── Loading phase ── */}
                {phase === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-6"
                  >
                    {/* Spinner ring */}
                    <div className="relative w-16 h-16">
                      <svg className="absolute inset-0 animate-spin" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="28" stroke="rgba(37,99,235,0.18)" strokeWidth="3" />
                        <path
                          d="M 32 4 A 28 28 0 0 1 60 32"
                          stroke="url(#spin-grad)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="spin-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="text-center">
                      <p className="text-blue-300 font-bold text-lg tracking-wide">
                        Loading Digital Twin<LoadingDots count={dotCount} />
                      </p>
                      <p className="text-slate-500 text-sm mt-1">Rendering enterprise workspace</p>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="w-52 h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="h-full rounded-full shimmer-bar"
                        style={{ width: `${progress}%`, transition: "width 0.04s linear" }}
                      />
                    </div>
                    <span className="text-slate-600 text-xs font-mono">{Math.round(progress)}%</span>
                  </motion.div>
                )}

                {/* ── Ready phase ── */}
                {phase === "ready" && (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1    }}
                    exit={{   opacity: 0, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="flex flex-col items-center gap-5"
                  >
                    <motion.button
                      onClick={() => setPhase("playing")}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative w-20 h-20 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                        boxShadow: "0 0 0 10px rgba(37,99,235,0.14), 0 12px 40px rgba(37,99,235,0.48)",
                      }}
                    >
                      {/* Pulse rings */}
                      <span
                        className="absolute inset-0 rounded-full animate-ring-pulse"
                        style={{ background: "rgba(37,99,235,0.28)" }}
                      />
                      <Play size={28} className="text-white ml-1.5" fill="white" />
                    </motion.button>
                    <p className="text-slate-400 text-sm font-medium text-center">
                      Click to watch the 3-minute platform tour
                    </p>
                  </motion.div>
                )}

                {/* ── Playing phase ── */}
                {phase === "playing" && (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 w-full px-12"
                  >
                    {/* Equalizer bars */}
                    <div className="flex items-end gap-1 h-10">
                      {[3, 5, 7, 6, 8, 7, 5, 4, 6, 8, 7, 5, 3].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 rounded-sm"
                          style={{ background: `hsl(${220 + i * 5}, 80%, 65%)` }}
                          animate={{ height: [`${h * 3}px`, `${h * 6}px`, `${h * 3}px`] }}
                          transition={{
                            repeat: Infinity, duration: 0.7 + i * 0.06,
                            delay: i * 0.08, ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>

                    <p className="text-white font-semibold text-sm">
                      TalentTrive Platform Tour · 3:24
                    </p>

                    {/* Fake progress bar */}
                    <div className="w-full flex items-center gap-3">
                      <span className="text-slate-500 text-xs font-mono shrink-0">
                        {formatTime(playTime)}
                      </span>
                      <div
                        className="flex-1 h-1 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.min((playTime / 204) * 100, 100)}%`,
                            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                          }}
                        />
                      </div>
                      <span className="text-slate-500 text-xs font-mono shrink-0">3:24</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 mt-1">
                      <button
                        onClick={() => setPhase("ready")}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150"
                      >
                        <Pause size={16} />
                      </button>
                      <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150">
                        <Volume2 size={16} />
                      </button>
                      <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150">
                        <Maximize size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Top cinematic vignette */}
            <div
              className="absolute inset-x-0 top-0 h-24 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(6,12,32,0.55), transparent)" }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(6,12,32,0.55), transparent)" }}
            />
          </div>

          {/* Stats below video */}
          <div className="grid grid-cols-3 mt-6 gap-4">
            {[
              { value: "3 min",  label: "Full platform tour"     },
              { value: "HD",     label: "Enterprise walkthrough"  },
              { value: "Live",   label: "Personalised sessions"   },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 py-4 rounded-xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="text-lg font-black"
                  style={{
                    background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </span>
                <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
