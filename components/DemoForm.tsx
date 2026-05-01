"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";


const SERVICES = [
  "Smart Recruitment",
  "Payroll Automation",
  "Background Verification",
  "Labour Law Compliance",
  "PF / ESI / PT Support",
  "NATS Apprenticeship",
  "Full Platform Suite",
];

type Status = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string; company: string; email: string;
  phone: string; service: string; message: string;
}

// ─── Text input — label above, native placeholder inside ─────────────────────
// Native placeholder disappears the instant the user starts typing —
// no floating animation, no overlap with entered text.
function InputField({
  label, name, type, value, onChange, required,
}: {
  label: string; name: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[10px] font-bold uppercase tracking-[0.1em] pl-1 text-slate-400"
      >
        {label}
        {required && <span className="text-indigo-400 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        autoComplete="off"
        className="w-full px-4 py-3 rounded-xl text-[15px] text-white
                   bg-slate-900 border border-white/[0.14]
                   focus:outline-none focus:border-indigo-500/75
                   focus:ring-2 focus:ring-indigo-500/[0.14]
                   placeholder:text-slate-500
                   transition-[border-color,box-shadow] duration-200"
        style={{ WebkitTextFillColor: "#ffffff", caretColor: "#ffffff" }}
      />
    </div>
  );
}

// ─── Service select ───────────────────────────────────────────────────────────
function ServiceSelect({
  value, onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.1em] pl-1 text-slate-400">
        Service Interest
      </label>
      <select
        name="service"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl text-[15px] bg-slate-900
                   border border-white/[0.14]
                   focus:outline-none focus:border-indigo-500/75
                   focus:ring-2 focus:ring-indigo-500/[0.14]
                   appearance-none cursor-pointer
                   transition-[border-color,box-shadow] duration-200"
        style={{ color: value ? "#ffffff" : "rgba(148,163,184,0.55)" }}
      >
        <option value="" disabled style={{ background: "#0f172a", color: "rgba(148,163,184,0.6)" }}>
          Select a service…
        </option>
        {SERVICES.map((s) => (
          <option key={s} value={s} style={{ background: "#1e293b", color: "#fff" }}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Message textarea ─────────────────────────────────────────────────────────
function MessageArea({
  value, onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.1em] pl-1 text-slate-400">
        Message
      </label>
      <textarea
        name="message"
        value={value}
        onChange={onChange}
        placeholder="Tell us about your team size, hiring volume, or compliance challenges…"
        rows={3}
        className="w-full px-4 py-3.5 rounded-xl text-[15px] text-white
                   bg-slate-900 border border-white/[0.14] resize-none
                   focus:outline-none focus:border-indigo-500/75
                   focus:ring-2 focus:ring-indigo-500/[0.14]
                   placeholder:text-slate-500
                   transition-[border-color,box-shadow] duration-200"
      />
    </div>
  );
}

// ─── Success panel ────────────────────────────────────────────────────────────
function SuccessPanel({ requestId }: { requestId: string }) {
  return (
    <motion.div
      key="success-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="flex flex-col items-center text-center py-12 px-4 gap-7"
    >
      {/* ── Glowing green checkmark ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="relative flex items-center justify-center"
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 100, height: 100,
            background: "radial-gradient(circle, rgba(52,211,153,0.4), transparent 70%)",
          }}
          animate={{ scale: [1, 1.75, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        />
        {/* Icon ring */}
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
          style={{
            background: "rgba(52,211,153,0.10)",
            border: "2px solid rgba(52,211,153,0.55)",
            boxShadow:
              "0 0 0 8px rgba(52,211,153,0.07), 0 0 40px rgba(52,211,153,0.28)",
          }}
        >
          <CheckCircle size={34} style={{ color: "#34d399" }} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* ── Message ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.45, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        <h3 className="text-[22px] font-black text-white tracking-tight">
          Thank you!
        </h3>
        <p
          className="text-[14px] font-medium leading-relaxed max-w-[280px] mx-auto"
          style={{ color: "rgba(148,163,184,0.85)" }}
        >
          Your request has been logged. Our team will reach out within 24 hours.
        </p>
      </motion.div>

      {/* ── Request ID card ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46, duration: 0.45, ease: "easeOut" }}
        className="flex flex-col items-center gap-2 w-full max-w-[280px] py-5 px-6 rounded-2xl"
        style={{
          background: "rgba(52,211,153,0.05)",
          border: "1px solid rgba(52,211,153,0.22)",
          boxShadow: "inset 0 1px 0 rgba(52,211,153,0.08)",
        }}
      >
        <span
          className="text-[9px] font-black uppercase tracking-[0.22em]"
          style={{ color: "rgba(100,116,139,0.7)" }}
        >
          Your Request ID
        </span>
        {/* Large liquid-flow ID */}
        <span className="text-[26px] font-black tracking-wider animate-liquid-flow">
          {requestId}
        </span>
        <span
          className="text-[11px] font-medium"
          style={{ color: "rgba(100,116,139,0.65)" }}
        >
          Quote this ID when contacting our team
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── Main form component ──────────────────────────────────────────────────────
export default function DemoForm() {
  const [status,    setStatus]    = useState<Status>("idle");
  const [errorMsg,  setErrorMsg]  = useState("");
  const [requestId, setRequestId] = useState("");
  const [form, setForm] = useState<FormValues>({
    name: "", company: "", email: "", phone: "", service: "", message: "",
  });

  const updateText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const updateOther = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const attempt = async () => {
    const res = await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Submission failed");
    return data as { requestId: string };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      let data: { requestId: string };
      try {
        data = await attempt();
      } catch {
        // Single automatic retry on transient failure
        data = await attempt();
      }
      setRequestId(data.requestId);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    // mode="wait" → form fully exits before success panel enters
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <SuccessPanel key="success" requestId={requestId} />
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Full Name"  name="name"    type="text"  value={form.name}    onChange={updateText} required />
            <InputField label="Company"    name="company" type="text"  value={form.company} onChange={updateText} required />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Work Email" name="email" type="email" value={form.email} onChange={updateText} required />
            <InputField label="Phone"      name="phone" type="tel"   value={form.phone} onChange={updateText} />
          </div>

          <ServiceSelect value={form.service} onChange={updateOther} />
          <MessageArea   value={form.message} onChange={updateOther} />

          {/* Error banner */}
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-medium text-red-300"
                style={{
                  background: "rgba(239,68,68,0.10)",
                  border: "1px solid rgba(239,68,68,0.26)",
                }}
              >
                <AlertCircle size={16} className="shrink-0" />
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-base text-white disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              boxShadow: "0 4px 28px rgba(37,99,235,0.42)",
            }}
          >
            {status === "submitting" ? (
              <><Loader2 size={18} className="animate-spin" /> Sending request…</>
            ) : (
              <><Send size={18} /> Request Your Free Demo</>
            )}
          </motion.button>

          <p className="text-center text-xs" style={{ color: "rgba(100,116,139,0.7)" }}>
            No spam. Your information is never shared with third parties.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
