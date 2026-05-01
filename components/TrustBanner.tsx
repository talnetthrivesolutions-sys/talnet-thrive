"use client";

import { useState } from "react";

const LOGOS: { name: string; color: string }[] = [
  { name: "Tata Group",         color: "#60a5fa" },
  { name: "Infosys",            color: "#34d399" },
  { name: "Wipro",              color: "#a78bfa" },
  { name: "HCL Technologies",   color: "#38bdf8" },
  { name: "Mahindra",           color: "#f87171" },
  { name: "Bajaj Finserv",      color: "#60a5fa" },
  { name: "Larsen & Toubro",    color: "#34d399" },
  { name: "Asian Paints",       color: "#fb923c" },
  { name: "Godrej Group",       color: "#a78bfa" },
  { name: "Reliance",           color: "#38bdf8" },
  { name: "Adani Enterprises",  color: "#fbbf24" },
  { name: "JSW Group",          color: "#f87171" },
];

function LogoTile({ logo }: { logo: typeof LOGOS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center px-10 py-1 cursor-default select-none shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="text-[13px] font-black tracking-tight whitespace-nowrap transition-all duration-300"
        style={{
          color:   hovered ? logo.color : "rgba(148,163,184,0.45)",
          opacity: hovered ? 1 : 0.8,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          display: "inline-block",
          textShadow: hovered ? `0 0 16px ${logo.color}70` : "none",
        }}
      >
        {logo.name}
      </span>
    </div>
  );
}

export default function TrustBanner() {
  const [paused, setPaused] = useState(false);
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section
      className="py-12 border-y"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <p className="text-center text-[9px] font-black uppercase tracking-[0.22em] mb-8"
        style={{ color: "rgba(148,163,184,0.5)" }}>
        Trusted by 1,200+ enterprise teams across India
      </p>

      <div
        className="overflow-hidden relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges — match dark page bg */}
        <div className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #05071a, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, #05071a, transparent)" }} />

        <div
          className="animate-marquee flex"
          style={{
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {doubled.map((logo, i) => (
            <LogoTile key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
