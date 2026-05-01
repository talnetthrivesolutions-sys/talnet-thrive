"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  Users, Calculator, ShieldCheck, Scale,
  FileSpreadsheet, GraduationCap,
  ArrowRight, Sparkles, ChevronDown,
  CheckCircle2, Play,
} from "lucide-react";
import TopNav      from "@/components/TopNav";
import DemoModal   from "@/components/DemoModal";
import VideoModal  from "@/components/VideoModal";
import TrustBanner from "@/components/TrustBanner";
import ServiceDrawer, { type ServiceData } from "@/components/ServiceDrawer";

// ─── Lazy 3D canvas ───────────────────────────────────────────────────────────
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-44 h-44 rounded-full animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)" }} />
    </div>
  ),
});

// ─── Layout constant ──────────────────────────────────────────────────────────
const W = "max-w-[1400px] mx-auto px-6 md:px-10 lg:px-[160px]";

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES: (ServiceData & { description: string })[] = [
  {
    icon: Users,
    title: "Smart Recruitment",
    tagline: "AI-Powered Hiring",
    description:
      "End-to-end ATS with AI candidate scoring, automated shortlisting, and structured interview pipelines that cut time-to-hire by 60%.",
    detail:
      "Our Smart Recruitment module deploys large language models to evaluate CVs against your job requirements in real time. From intelligent JD generation to digital offer dispatch, every step in your hiring funnel is measurable, auditable, and natively integrated with your Azure AD identity layer.",
    features: [
      "AI candidate scoring with explainable rankings (0–100)",
      "Automated job description generation from role templates",
      "Structured interview kits with evaluation scorecards",
      "Offer letter automation with e-signature workflow",
      "Pipeline analytics — source-of-hire, funnel, time-to-fill",
    ],
    accent: "#60a5fa",
    glow: "rgba(96,165,250,0.22)",
  },
  {
    icon: Calculator,
    title: "Payroll Automation",
    tagline: "Zero-Error Payroll",
    description:
      "Fully automated payroll runs with statutory deductions, tax projections, payslip generation, and direct bank transfer integration.",
    detail:
      "Process payroll for thousands of employees in minutes. Our engine handles every statutory deduction, generates Form 16, ESIC challans, and EPF ECRs — and posts directly to your bank. Every calculation is explainable and audit-ready, fully aligned with the Wages Code 2019.",
    features: [
      "Full TDS computation and Form 16 generation",
      "Bank-transfer-ready payslip delivery",
      "ECR challan auto-filing for EPFO & ESIC portals",
      "Flexible pay component builder (LTA, HRA, allowances)",
      "Salary revision workflows with retroactive adjustments",
    ],
    accent: "#34d399",
    glow: "rgba(52,211,153,0.22)",
  },
  {
    icon: ShieldCheck,
    title: "Background Verification",
    tagline: "Multi-Layer BGV",
    description:
      "Criminal, employment, education, and reference checks powered by real-time verification APIs with a guaranteed 48-hour SLA.",
    detail:
      "Conduct thorough, legally defensible background checks without leaving the platform. Connected to court databases, employment registries, and university credential APIs across India — with a guaranteed 48-hour SLA on standard verification reports.",
    features: [
      "Criminal record checks across 750+ court jurisdictions",
      "Employment history verification (past 7 years)",
      "Education certificate validation via direct registry APIs",
      "Reference check automation with structured scoring",
      "Aadhaar-linked identity verification",
    ],
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.22)",
  },
  {
    icon: Scale,
    title: "Labour Law Compliance",
    tagline: "4 New Labour Codes",
    description:
      "Automated tracking across all four Labour Codes — Wages, Industrial Relations, Social Security, and OSH — with AI risk scoring.",
    detail:
      "Navigate India's Four Labour Code reforms with confidence. Our compliance engine maps your HR policies against each code, flags gaps in real time, generates audit evidence packages, and tracks corrective actions to closure — all in a single dashboard.",
    features: [
      "Wages Code 2019 — minimum wage and floor wage tracker",
      "Industrial Relations Code — standing orders & CIRP readiness",
      "Social Security Code — PF, ESIC, gratuity filing calendar",
      "OSH Code — safety registers and inspection readiness",
      "AI-powered risk scoring with automated alerts",
    ],
    accent: "#fbbf24",
    glow: "rgba(251,191,36,0.22)",
  },
  {
    icon: FileSpreadsheet,
    title: "PF / ESI / PT Support",
    tagline: "Statutory Filings",
    description:
      "Accurate EPF, EPS, EDLI, ESI, and Professional Tax computations with auto-generated challan files for EPFO & ESIC portals.",
    detail:
      "Eliminate manual statutory filing permanently. Our engine computes every EPF, EPS, EDLI, and ESI liability with full audit trails, generates EPFO ECR files and ESIC monthly returns, and manages state-wise Professional Tax slabs across 10 states automatically.",
    features: [
      "EPF ECR challan generation (A/C 1, 2, 10, 21, 22)",
      "ESIC monthly return with online portal submission",
      "State-wise PT computation for 10 states",
      "UAN allotment and maintenance workflow",
      "EDLI and admin charge calculation with audit logs",
    ],
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.22)",
  },
  {
    icon: GraduationCap,
    title: "NATS Apprenticeship",
    tagline: "Regulatory Program",
    description:
      "Full lifecycle management for BOAT/BOPT apprenticeships — registration, contracts, stipend tracking, and compliance dashboards.",
    detail:
      "Meet your statutory apprenticeship obligations under the Apprentices Act 1961 without the administrative overhead. Manage BOAT and BOPT registrations, generate legally compliant contracts, track stipend payments, and maintain inspection-ready records — all in one place.",
    features: [
      "BOAT/BOPT apprentice registration and portal integration",
      "Contract generation with e-signature and archiving",
      "Monthly stipend tracking and disbursement records",
      "Completion certificate generation and submission",
      "Inspection-ready compliance dashboard with audit trail",
    ],
    accent: "#f87171",
    glow: "rgba(248,113,113,0.22)",
  },
];

const STATS = [
  { value: "1,200+", label: "Enterprise Clients"  },
  { value: "98.6%",  label: "Payroll Accuracy"    },
  { value: "60%",    label: "Faster Hiring"        },
  { value: "4",      label: "Labour Codes Ready"   },
];

const DEMO_BENEFITS = [
  "Live demo tailored to your industry and headcount",
  "Compliance readiness assessment included at no cost",
  "Dedicated onboarding specialist from day one",
  "Azure AD single sign-on configured in under 30 minutes",
];

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger: Variants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.1 } },
};

// ─── Orbit keyframe helper ────────────────────────────────────────────────────
function makeOrbit(radius: number, startDeg = 0, steps = 24) {
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const rad = ((i / steps) * 360 + startDeg) * (Math.PI / 180);
    x.push(+(Math.cos(rad) * radius).toFixed(2));
    y.push(+(Math.sin(rad) * radius).toFixed(2));
  }
  return { x, y };
}

// ─── Module animated visuals ──────────────────────────────────────────────────

function RecruitmentVisual() {
  const o1 = makeOrbit(46, 0);
  const o2 = makeOrbit(46, 120);
  const o3 = makeOrbit(46, 240);
  return (
    <div className="relative w-40 h-40">
      {/* Orbit ring */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(96,165,250,0.18)" }} />
      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.14, 1], boxShadow: ["0 0 18px rgba(96,165,250,0.4)", "0 0 36px rgba(96,165,250,0.7)", "0 0 18px rgba(96,165,250,0.4)"] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(96,165,250,0.15)", border: "2px solid rgba(96,165,250,0.7)" }}
        >
          <Users size={26} style={{ color: "#60a5fa" }} />
        </motion.div>
      </div>
      {/* Orbiting nodes */}
      {[o1, o2, o3].map((o, i) => (
        <motion.div key={i}
          className="absolute top-1/2 left-1/2"
          style={{ width: 22, height: 22, marginLeft: -11, marginTop: -11 }}
          animate={{ x: o.x, y: o.y }}
          transition={{ repeat: Infinity, duration: 5 + i * 1.2, ease: "linear" }}
        >
          <div className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "rgba(96,165,250,0.2)", border: "1.5px solid rgba(96,165,250,0.65)" }}>
            <Users size={8} style={{ color: "#60a5fa" }} />
          </div>
        </motion.div>
      ))}
      {/* Connection line pulses */}
      <div className="absolute inset-0 rounded-full pointer-events-none">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ opacity: [0, 0.18, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.3), transparent 60%)" }}
        />
      </div>
    </div>
  );
}

function PayrollVisual() {
  const [tick, setTick] = useState(0);
  const coinOrbit = makeOrbit(48, 0);
  // Tick the counter
  useState(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 1000), 85);
    return () => clearInterval(id);
  });

  return (
    <div className="relative w-40 h-40">
      {/* Rotating gear teeth ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full"
            style={{
              background: "rgba(52,211,153,0.45)",
              top: "50%", left: "50%",
              transform: `rotate(${i * 30}deg) translateX(66px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>
      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ boxShadow: ["0 0 18px rgba(52,211,153,0.4)", "0 0 36px rgba(52,211,153,0.7)", "0 0 18px rgba(52,211,153,0.4)"] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-0.5"
          style={{ background: "rgba(52,211,153,0.15)", border: "2px solid rgba(52,211,153,0.7)" }}
        >
          <span className="text-lg font-black leading-none" style={{ color: "#34d399" }}>₹</span>
          <span className="text-[10px] font-black font-mono leading-none" style={{ color: "#6ee7b7" }}>
            {tick.toString().padStart(3, "0")}
          </span>
        </motion.div>
      </div>
      {/* Orbiting coin */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{ width: 22, height: 22, marginLeft: -11, marginTop: -11 }}
        animate={{ x: coinOrbit.x, y: coinOrbit.y }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      >
        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
          style={{ background: "rgba(52,211,153,0.25)", border: "1.5px solid rgba(52,211,153,0.7)", color: "#34d399" }}>
          ₹
        </div>
      </motion.div>
    </div>
  );
}

function BGVVisual() {
  return (
    <div className="relative w-32 h-36 flex items-center justify-center">
      {/* Pulse glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.5), transparent 70%)" }}
      />
      <div className="relative">
        {/* Shield SVG */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <svg width="88" height="104" viewBox="0 0 88 104" fill="none">
            <path d="M44 4L8 18v30c0 22 15.5 41.5 36 48 20.5-6.5 36-26 36-48V18L44 4z"
              fill="rgba(167,139,250,0.15)"
              stroke="rgba(167,139,250,0.75)"
              strokeWidth="2"
            />
            <path d="M44 14L18 26v22c0 17 11.5 30.5 26 36 14.5-5.5 26-19 26-36V26L44 14z"
              fill="rgba(167,139,250,0.08)"
            />
          </svg>
        </motion.div>

        {/* Scan line inside shield */}
        <motion.div
          className="absolute left-5 right-5 h-px rounded-full pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.9), transparent)" }}
          animate={{ top: ["22%", "68%", "22%"] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />

        {/* Checkmark fade */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, times: [0, 0.5, 0.7, 1], ease: "easeInOut", delay: 0.8 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M7 14l5 5 9-11" stroke="#c4b5fd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function LabourLawVisual() {
  return (
    <div className="relative w-44 h-36 flex items-end justify-center pb-3">
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Fulcrum pole */}
        <div className="w-px h-7" style={{ background: "rgba(251,191,36,0.6)" }} />

        {/* Rocking beam */}
        <motion.div
          className="relative w-40"
          style={{ transformOrigin: "center" }}
          animate={{ rotate: [-11, 11, -11] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        >
          <div className="h-px w-full" style={{ background: "rgba(251,191,36,0.7)" }} />

          {/* Left pan */}
          <motion.div
            className="absolute -left-1 -top-px"
            animate={{ y: [9, -9, 9] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          >
            <div className="w-9 h-6 rounded-lg flex items-center justify-center -translate-x-1/2"
              style={{ background: "rgba(251,191,36,0.18)", border: "1.5px solid rgba(251,191,36,0.6)" }}>
              <Scale size={12} style={{ color: "#fbbf24" }} />
            </div>
          </motion.div>

          {/* Right pan */}
          <motion.div
            className="absolute -right-1 -top-px"
            animate={{ y: [-9, 9, -9] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          >
            <div className="w-9 h-6 rounded-lg flex items-center justify-center translate-x-1/2"
              style={{ background: "rgba(251,191,36,0.18)", border: "1.5px solid rgba(251,191,36,0.6)" }}>
              <Scale size={12} style={{ color: "#fbbf24" }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Base */}
        <div className="w-20 h-1.5 rounded-full mt-0.5" style={{ background: "rgba(251,191,36,0.45)" }} />
      </div>

      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.25), transparent 70%)" }}
      />
    </div>
  );
}

function PFESIVisual() {
  const bars = [65, 40, 78, 55, 88];
  return (
    <div className="relative w-44 h-36 flex items-end justify-center pb-2">
      {/* Bars */}
      <div className="flex items-end gap-3 h-28">
        {bars.map((pct, i) => (
          <div key={i} className="relative flex flex-col items-center gap-1.5" style={{ width: 20 }}>
            {/* Pulse dot at top */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#38bdf8" }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.22, ease: "easeInOut" }}
            />
            {/* Bar */}
            <div className="w-full rounded-t-lg overflow-hidden"
              style={{ height: `${Math.max(pct * 0.9, 24)}px`, background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.25)" }}>
              <motion.div
                className="w-full rounded-t-lg"
                style={{ background: "linear-gradient(to top, rgba(56,189,248,0.7), rgba(56,189,248,0.25))" }}
                animate={{ height: ["20%", "100%", "55%", "100%", "20%"] }}
                transition={{
                  repeat: Infinity, duration: 3.5,
                  delay: i * 0.28, ease: "easeInOut",
                  times: [0, 0.3, 0.55, 0.75, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Baseline */}
      <div className="absolute bottom-2 left-4 right-4 h-px" style={{ background: "rgba(56,189,248,0.25)" }} />
      {/* Glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 80%, rgba(56,189,248,0.14), transparent 65%)" }} />
    </div>
  );
}

function NATSVisual() {
  const o1 = makeOrbit(38, 0);
  const o2 = makeOrbit(58, 45);
  return (
    <div className="relative w-44 h-44">
      {/* Orbit rings */}
      {[38, 58].map((r) => (
        <div key={r}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: r * 2, height: r * 2,
            top: "50%", left: "50%",
            marginLeft: -r, marginTop: -r,
            border: "1px solid rgba(248,113,113,0.14)",
          }}
        />
      ))}
      {/* Center cap */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.12, 1], boxShadow: ["0 0 16px rgba(248,113,113,0.4)", "0 0 32px rgba(248,113,113,0.7)", "0 0 16px rgba(248,113,113,0.4)"] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(248,113,113,0.15)", border: "2px solid rgba(248,113,113,0.7)" }}
        >
          <GraduationCap size={26} style={{ color: "#f87171" }} />
        </motion.div>
      </div>
      {/* Inner sparkles */}
      {[o1].map((o, orbitIdx) =>
        [0, 1, 2].map((nodeIdx) => {
          const seg = Math.floor((nodeIdx / 3) * 24);
          return (
            <motion.div key={`${orbitIdx}-${nodeIdx}`}
              className="absolute top-1/2 left-1/2"
              style={{ width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
              animate={{ x: o.x.slice(seg).concat(o.x.slice(0, seg + 1)), y: o.y.slice(seg).concat(o.y.slice(0, seg + 1)) }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
            >
              <div className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#f87171", boxShadow: "0 0 6px rgba(248,113,113,0.8)" }} />
            </motion.div>
          );
        })
      )}
      {/* Outer sparkles */}
      {[o2].map((o, orbitIdx) =>
        [0, 1].map((nodeIdx) => {
          const seg = Math.floor((nodeIdx / 2) * 24);
          return (
            <motion.div key={`outer-${orbitIdx}-${nodeIdx}`}
              className="absolute top-1/2 left-1/2"
              style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
              animate={{ x: o.x.slice(seg).concat(o.x.slice(0, seg + 1)), y: o.y.slice(seg).concat(o.y.slice(0, seg + 1)) }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <div className="w-2 h-2 rounded-full"
                style={{ background: "#fca5a5", boxShadow: "0 0 4px rgba(248,113,113,0.6)" }} />
            </motion.div>
          );
        })
      )}
    </div>
  );
}

// ─── Anchor IDs matching mega-menu hrefs ─────────────────────────────────────
const SERVICE_IDS = [
  "recruitment", "payroll", "verification",
  "compliance",  "statutory", "apprenticeship",
] as const;

// ─── Module configs ────────────────────────────────────────────────────────────
const MODULE_CONFIGS: { gradient: string; glow: string; Visual: () => React.ReactElement }[] = [
  { gradient: "linear-gradient(145deg, #04112e 0%, #081840 60%, #040e26 100%)", glow: "rgba(96,165,250,0.35)",   Visual: RecruitmentVisual },
  { gradient: "linear-gradient(145deg, #031a0d 0%, #062e17 60%, #021408 100%)", glow: "rgba(52,211,153,0.35)",   Visual: PayrollVisual    },
  { gradient: "linear-gradient(145deg, #100824 0%, #1c1040 60%, #0c061c 100%)", glow: "rgba(167,139,250,0.35)",  Visual: BGVVisual        },
  { gradient: "linear-gradient(145deg, #1a0f02 0%, #2d1c04 60%, #150c02 100%)", glow: "rgba(251,191,36,0.35)",   Visual: LabourLawVisual  },
  { gradient: "linear-gradient(145deg, #02121e 0%, #062032 60%, #010d18 100%)", glow: "rgba(56,189,248,0.35)",   Visual: PFESIVisual      },
  { gradient: "linear-gradient(145deg, #180408 0%, #2c0912 60%, #120305 100%)", glow: "rgba(248,113,113,0.35)",  Visual: NATSVisual       },
];

// ─── Interactive Action Module ────────────────────────────────────────────────
function ActionModule({
  service,
  config,
  index,
  id,
  onLearnMore,
}: {
  service:    (typeof SERVICES)[0];
  config:     (typeof MODULE_CONFIGS)[0];
  index:      number;
  id?:        string;
  onLearnMore: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onLearnMore}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        scrollMarginTop: "80px",
        height: 360,
        background: config.gradient,
        border: `1px solid ${hovered ? service.accent + "50" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? `0 28px 72px ${config.glow}, 0 0 0 1px ${service.accent}28`
          : "0 4px 24px rgba(0,0,0,0.45)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Top ambient radial glow */}
      <div
        className="absolute inset-x-0 top-0 h-44 pointer-events-none transition-opacity duration-400"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${config.glow}, transparent 70%)`,
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* Iridescent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}dd, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Tagline — always visible top-left, liquid-flow gradient */}
      <div className="absolute top-5 left-6 z-10">
        <span className="text-sm font-extrabold uppercase tracking-widest animate-liquid-flow">
          {service.tagline}
        </span>
      </div>

      {/* Animated visual — lifts and shrinks on hover to reveal text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y:     hovered ? -52 : 0,
          scale: hovered ? 0.62 : 1,
        }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <config.Visual />
      </motion.div>

      {/* Bottom dark gradient for text legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none transition-opacity duration-350"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Hover-revealed content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{   opacity: 0, y: 12  }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-4 z-10 flex flex-col gap-3"
          >
            <h3 className="text-[17px] font-bold text-white leading-snug">
              {service.title}
            </h3>
            <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "rgba(203,213,225,0.75)" }}>
              {service.description}
            </p>
            <span
              className="self-start inline-flex items-center gap-1.5 text-[11px] font-bold"
              style={{ color: service.accent }}
            >
              View capabilities <ArrowRight size={11} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [demoOpen,      setDemoOpen]      = useState(false);
  const [videoOpen,     setVideoOpen]     = useState(false);
  const [activeService, setActiveService] = useState<(typeof SERVICES)[0] | null>(null);
  const featuresRef = useRef<HTMLElement>(null);

  const openDemo         = () => setDemoOpen(true);
  const openVideo        = () => setVideoOpen(true);
  const scrollToFeatures = () =>
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* ── Global overlays ── */}
      <TopNav   onBookDemo={openDemo} />
      <DemoModal  open={demoOpen}  onClose={() => setDemoOpen(false)} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <ServiceDrawer
        service={activeService}
        onClose={() => setActiveService(null)}
        onRequestDemo={() => { setActiveService(null); openDemo(); }}
      />

      {/* ── Fixed aurora background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "#05071a" }}>
        <div className="absolute -top-48 -left-48 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute top-1/3 -right-64 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute -bottom-64 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute top-1/4 left-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 65%)", filter: "blur(80px)" }} />
        {/* Dot grid overlay */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      <main className="relative z-10 overflow-x-hidden">

        {/* ════════════════════════════════════════════════
            HERO  ·  deep space, white text
        ════════════════════════════════════════════════ */}
        <section
          className="relative flex flex-col"
          style={{ minHeight: "100svh", paddingTop: "64px" }}
        >
          <div className="flex-1 flex items-center">
            <div className={`${W} w-full`}>
              <div className="grid grid-cols-12 gap-x-8 gap-y-12 items-center py-20">

                {/* ── Left copy: col 1–6 ── */}
                <motion.div
                  className="col-span-12 lg:col-span-6 flex flex-col gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >
                  {/* Kicker */}
                  <motion.div
                    variants={fadeUp}
                    className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-blue-300"
                    style={{
                      background: "rgba(37,99,235,0.12)",
                      border: "1px solid rgba(96,165,250,0.25)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Enterprise B2B · SOC 2 Compliant · Azure AD
                  </motion.div>

                  {/* H1 */}
                  <motion.h1
                    variants={fadeUp}
                    className="text-5xl md:text-6xl xl:text-[68px] font-black tracking-tight leading-[1.04] text-white"
                  >
                    One Platform.
                    <br />
                    <span
                      style={{
                        background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 45%, #38bdf8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Infinite Talent.
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    variants={fadeUp}
                    className="text-[17px] font-medium leading-relaxed max-w-xl"
                    style={{ color: "rgba(148,163,184,0.9)" }}
                  >
                    Talent Trive Solution unifies smart recruitment, automated
                    payroll, four-Labour-Code compliance, and AI-powered workforce
                    analytics inside one secure, enterprise-grade workspace.
                  </motion.p>

                  {/* Two CTA buttons side by side */}
                  <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
                    {/* Primary */}
                    <motion.button
                      onClick={openDemo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                        boxShadow: "0 0 0 1px rgba(99,102,241,0.35), 0 10px 40px rgba(37,99,235,0.45)",
                      }}
                    >
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }}
                      />
                      Book a Demo
                      <ArrowRight size={17} />
                    </motion.button>

                    {/* Secondary — glass outline */}
                    <motion.button
                      onClick={openVideo}
                      whileHover={{ scale: 1.04, borderColor: "rgba(96,165,250,0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold text-slate-200 transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1.5px solid rgba(255,255,255,0.16)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(37,99,235,0.3)", border: "1px solid rgba(96,165,250,0.4)" }}
                      >
                        <Play size={12} className="text-blue-300 ml-0.5" fill="currentColor" />
                      </div>
                      Watch the Action Video
                    </motion.button>
                  </motion.div>

                  {/* Trust micro-text */}
                  <motion.p variants={fadeUp} className="text-xs font-medium" style={{ color: "rgba(100,116,139,0.9)" }}>
                    Trusted by 1,200+ enterprises across India · No setup fees · &lt;30 min onboarding
                  </motion.p>
                </motion.div>

                {/* ── Right canvas: col 7–12 ── */}
                <motion.div
                  className="col-span-12 lg:col-span-6 relative"
                  style={{ height: "clamp(340px, 46vw, 580px)" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
                >
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.07) 50%, transparent 75%)",
                    }}
                  />
                  <HeroCanvas />
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── Explore button — always visible above fold ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.22em]"
              style={{ color: "rgba(100,116,139,0.7)" }}>
              Explore
            </span>
            <motion.button
              onClick={scrollToFeatures}
              whileHover={{ scale: 1.14 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Scroll to features"
              className="relative w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                boxShadow: "0 0 0 10px rgba(37,99,235,0.10), 0 10px 32px rgba(37,99,235,0.48)",
              }}
            >
              <span
                className="absolute inset-0 rounded-full animate-ring-pulse pointer-events-none"
                style={{ background: "rgba(37,99,235,0.3)" }}
              />
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
              >
                <ChevronDown size={22} className="text-white" strokeWidth={2.8} />
              </motion.div>
            </motion.button>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════
            TRUST BANNER
        ════════════════════════════════════════════════ */}
        <TrustBanner />

        {/* ════════════════════════════════════════════════
            STATS
        ════════════════════════════════════════════════ */}
        <section className="py-20">
          <div className={W}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col items-center justify-center gap-2 py-10 px-4 text-center"
                  style={{
                    borderRight:
                      i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                  }}
                >
                  <span
                    className="text-4xl font-black tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(100,116,139,0.8)" }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            INTERACTIVE ACTION MODULES
        ════════════════════════════════════════════════ */}
        <section ref={featuresRef} id="features" className="py-32">
          <div className={W}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="text-center mb-20 flex flex-col items-center gap-5"
            >
              <span
                className="inline-block text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full"
                style={{
                  color: "#a78bfa",
                  background: "rgba(167,139,250,0.1)",
                  border: "1px solid rgba(167,139,250,0.22)",
                }}
              >
                Interactive Action Modules
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-2xl leading-tight">
                Everything your people team needs
              </h2>
              <p className="font-medium text-lg leading-relaxed max-w-lg"
                style={{ color: "rgba(148,163,184,0.8)" }}>
                Six enterprise services. One connected platform.
                Hover each module to explore its AI capabilities.
              </p>
            </motion.div>

            {/* 3 × 2 modules grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <ActionModule
                  key={s.title}
                  service={s}
                  config={MODULE_CONFIGS[i]}
                  index={i}
                  id={SERVICE_IDS[i]}
                  onLearnMore={() => setActiveService(s)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            DEMO BENEFITS  ·  glass two-column
        ════════════════════════════════════════════════ */}
        <section className="py-32" id="industries">
          <div className={W}>
            <div className="grid grid-cols-12 gap-x-16 gap-y-12 items-center">

              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="col-span-12 lg:col-span-5 flex flex-col gap-7"
              >
                <span
                  className="inline-flex items-center gap-2 w-fit text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full"
                  style={{
                    color: "#34d399",
                    background: "rgba(52,211,153,0.08)",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  <Sparkles size={11} />
                  Free Personalised Session
                </span>

                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  What to expect
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #34d399, #38bdf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    from your demo
                  </span>
                </h2>

                <p className="font-medium text-[15px] leading-relaxed"
                  style={{ color: "rgba(148,163,184,0.85)" }}>
                  A focused, no-pressure walkthrough of the modules most relevant
                  to your business — with a live compliance readiness check included.
                </p>

                <motion.button
                  onClick={openDemo}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="self-start inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    boxShadow: "0 8px 28px rgba(37,99,235,0.4)",
                  }}
                >
                  Book Your Free Session
                  <ArrowRight size={15} />
                </motion.button>
              </motion.div>

              {/* Right — benefit card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                className="col-span-12 lg:col-span-7"
              >
                <div
                  className="rounded-3xl p-10"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1.5px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <ul className="flex flex-col gap-5">
                    {DEMO_BENEFITS.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div
                          className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(52,211,153,0.12)" }}
                        >
                          <CheckCircle2 size={13} style={{ color: "#34d399" }} />
                        </div>
                        <span className="text-[14px] font-medium leading-snug"
                          style={{ color: "rgba(203,213,225,0.85)" }}>
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div
                    className="mt-8 pt-6 flex items-center gap-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex -space-x-2">
                      {["rgba(37,99,235,0.3)", "rgba(124,58,237,0.3)", "rgba(5,150,105,0.3)"].map((bg, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                          style={{ background: bg, borderColor: "rgba(255,255,255,0.1)" }}>
                          <Users size={11} className="text-slate-300" />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: "rgba(100,116,139,0.9)" }}>
                      <span className="text-slate-300 font-bold">1,200+ teams</span>{" "}
                      already onboarded across India
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CTA STRIP
        ════════════════════════════════════════════════ */}
        <section
          className="py-28"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,80,0.6) 0%, rgba(30,12,80,0.6) 50%, rgba(15,23,80,0.6) 100%)",
          }}
          id="company"
        >
          <div className={`${W} text-center`}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-7"
            >
              <div className="w-px h-12"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(167,139,250,0.6), transparent)" }} />

              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-2xl leading-tight">
                Ready to Transform
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Your Workforce?
                </span>
              </h2>

              <p className="font-medium text-lg max-w-xl leading-relaxed"
                style={{ color: "rgba(148,163,184,0.8)" }}>
                Join 1,200+ enterprise teams who run recruitment, payroll, and
                compliance on a single AI-powered platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.button
                  onClick={openDemo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    boxShadow: "0 0 0 1px rgba(99,102,241,0.35), 0 12px 48px rgba(37,99,235,0.52)",
                  }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)" }} />
                  Book a Demo — It&apos;s Free
                  <ArrowRight size={17} />
                </motion.button>
                <span className="text-xs font-medium" style={{ color: "rgba(100,116,139,0.9)" }}>
                  No commitment · Personalised walkthrough
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            FOOTER  ·  3-column corporate
        ════════════════════════════════════════════════ */}
        <footer
          id="resources"
          style={{
            background: "#0a192f",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className={W}>
            {/* Top section — 3 columns */}
            <div className="grid grid-cols-12 gap-x-12 gap-y-12 py-20">

              {/* ── Column 1: Identity ── */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                  >
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <span className="text-[15px] font-extrabold tracking-tight text-white">
                    Talent<span className="text-blue-400">Trive</span>
                  </span>
                </div>

                {/* Legal name + tagline */}
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] font-bold text-slate-300">
                    Talnet Thrive Solutions Private Limited
                  </p>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em]"
                    style={{ color: "rgba(148,163,184,0.45)" }}>
                    Enterprise B2B Excellence
                  </p>
                </div>

                {/* Short description */}
                <p className="text-[13px] font-medium leading-relaxed"
                  style={{ color: "rgba(148,163,184,0.65)" }}>
                  One platform unifying smart recruitment, automated payroll,
                  statutory compliance, and workforce analytics for India&apos;s
                  enterprise teams.
                </p>

                {/* Copyright */}
                <p className="text-[11px] font-medium"
                  style={{ color: "rgba(71,85,105,0.7)" }}>
                  © 2026 Talnet Thrive Solutions Pvt. Ltd. · All rights reserved.
                </p>
              </div>

              {/* ── Column 2: Connect ── */}
              <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
                <p className="text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{ color: "rgba(148,163,184,0.45)" }}>
                  Connect
                </p>

                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(100,116,139,0.6)" }}>
                      Email
                    </span>
                    <a
                      href="mailto:connect@talnetthrive.com"
                      className="footer-link text-[13px] font-semibold text-slate-300"
                    >
                      connect@talnetthrive.com
                    </a>
                  </div>

                  {/* WhatsApp numbers */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "rgba(100,116,139,0.6)" }}>
                      WhatsApp
                    </span>
                    <a
                      href="https://wa.me/919535183723"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link text-[13px] font-semibold text-slate-300"
                    >
                      +91 95351 83723
                    </a>
                    <a
                      href="https://wa.me/918105681476"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link text-[13px] font-semibold text-slate-300"
                    >
                      +91 81056 81476
                    </a>
                  </div>
                </div>

                {/* Policy links */}
                <div className="flex flex-col gap-2 pt-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Privacy Policy", "Terms of Service", "Security"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="footer-link text-[12px] font-medium"
                      style={{ color: "rgba(100,116,139,0.75)" }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Column 3: Location + Map ── */}
              <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
                <p className="text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{ color: "rgba(148,163,184,0.45)" }}>
                  Our Office
                </p>

                <div className="flex flex-col gap-1.5">
                  <p className="text-[13px] font-semibold text-slate-300 leading-relaxed">
                    #34 5th Main Gowthampura
                  </p>
                  <p className="text-[13px] font-semibold text-slate-300">
                    Ulsoor, Bangalore – 560008
                  </p>
                  <p className="text-[13px] font-medium" style={{ color: "rgba(148,163,184,0.55)" }}>
                    Karnataka, India
                  </p>
                </div>

                {/* Google Maps iframe */}
                <div className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <iframe
                    title="TalentTrive Office Location"
                    className="map-frame w-full"
                    src="https://maps.google.com/maps?q=Ulsoor+Bangalore+560008+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[11px] font-medium" style={{ color: "rgba(71,85,105,0.65)" }}>
                SOC 2 Compliant · Azure AD · Enterprise-Grade Security
              </p>
              <div className="flex items-center gap-5">
                {["Features", "Industries", "Company", "Resources"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="footer-link text-[11px] font-medium"
                    style={{ color: "rgba(71,85,105,0.65)" }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
